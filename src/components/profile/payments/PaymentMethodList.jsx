'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlinePlus,
	AiOutlineInfoCircle,
	AiOutlineLoading3Quarters,
	AiOutlineSearch,
	AiOutlineFilter,
	AiOutlineSort,
	AiOutlineClose,
} from 'react-icons/ai';
import { FaRegCreditCard } from 'react-icons/fa';
import { RiSortDesc, RiFilterLine } from 'react-icons/ri';
import PaymentMethodCard from './PaymentMethodCard';
import PaymentMethodForm from './PaymentMethodForm';
import ProfileEmptyState from '../utils/ProfileEmptyState';
import ProfileLoadingSkeleton from '../utils/ProfileLoadingSkeleton';
import ProfileMetrics from '../utils/ProfileMetrics';

const PaymentMethodList = ({
	paymentMethods = [],
	loading = false,
	error = null,
	onAddPaymentMethod,
	onUpdatePaymentMethod,
	onDeletePaymentMethod,
	onSetDefaultPaymentMethod,
	showMetrics = false,
	stats,
}) => {
	// Estados para gestionar la interfaz
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [editMethod, setEditMethod] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [filterValue, setFilterValue] = useState('all');
	const [sortValue, setSortValue] = useState('default');
	const [searchQuery, setSearchQuery] = useState('');
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

	// Efecto para cerrar el formulario cuando cambian los métodos de pago
	useEffect(() => {
		if (!loading) {
			setIsSubmitting(false);
		}
	}, [paymentMethods, loading]);

	// Filtrar y ordenar métodos de pago
	const filteredMethods = React.useMemo(() => {
		return paymentMethods
			.filter((method) => {
				// Aplicar filtros
				if (filterValue === 'all') return true;
				if (filterValue === 'credit' && method.type === 'credit_card')
					return true;
				if (filterValue === 'debit' && method.type === 'debit_card')
					return true;
				if (
					filterValue === 'other' &&
					method.type !== 'credit_card' &&
					method.type !== 'debit_card'
				)
					return true;
				return false;
			})
			.filter((method) => {
				// Aplicar búsqueda
				if (!searchQuery) return true;

				const searchLower = searchQuery.toLowerCase();
				return (
					method.brand.toLowerCase().includes(searchLower) ||
					method.holderName.toLowerCase().includes(searchLower) ||
					method.lastFour.includes(searchQuery)
				);
			})
			.sort((a, b) => {
				// Ordenar según criterio seleccionado
				if (sortValue === 'default') {
					// Predeterminados primero, luego por tipo
					if (a.isDefault && !b.isDefault) return -1;
					if (!a.isDefault && b.isDefault) return 1;
					return 0;
				} else if (sortValue === 'expiry') {
					// Ordenar por fecha de expiración (más cercana primero)
					const aExpiry = new Date(
						`20${a.expiryYear}`,
						a.expiryMonth - 1
					);
					const bExpiry = new Date(
						`20${b.expiryYear}`,
						b.expiryMonth - 1
					);
					return aExpiry - bExpiry;
				} else if (sortValue === 'name') {
					// Ordenar alfabéticamente por nombre del titular
					return a.holderName.localeCompare(b.holderName);
				}
				return 0;
			});
	}, [paymentMethods, filterValue, sortValue, searchQuery]);

	// Manejar el envío del formulario
	const handleSubmit = async (formData) => {
		setIsSubmitting(true);

		try {
			if (editMethod) {
				await onUpdatePaymentMethod(formData);
			} else {
				await onAddPaymentMethod(formData);
			}

			// Cerrar el formulario después de guardar
			setIsAddingNew(false);
			setEditMethod(null);
		} catch (error) {
			console.error('Error al guardar el método de pago:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Cancelar la edición o creación
	const handleCancel = () => {
		setIsAddingNew(false);
		setEditMethod(null);
	};

	// Manejar edición de un método de pago
	const handleEdit = (id) => {
		const methodToEdit = paymentMethods.find((method) => method.id === id);
		if (methodToEdit) {
			setEditMethod(methodToEdit);
			setIsAddingNew(true);
		}
	};

	// Manejar eliminación de un método de pago
	const handleDelete = async (id) => {
		try {
			await onDeletePaymentMethod(id);
		} catch (error) {
			console.error('Error al eliminar el método de pago:', error);
		}
	};

	// Establecer método de pago por defecto
	const handleSetDefault = async (id) => {
		try {
			await onSetDefaultPaymentMethod(id);
		} catch (error) {
			console.error(
				'Error al establecer el método de pago por defecto:',
				error
			);
		}
	};

	// Limpiar todos los filtros
	const clearFilters = () => {
		setSearchQuery('');
		setFilterValue('all');
		setSortValue('default');
	};

	// Variantes para animaciones
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	const dropdownVariants = {
		hidden: { opacity: 0, height: 0, overflow: 'hidden' },
		visible: {
			opacity: 1,
			height: 'auto',
			transition: { duration: 0.2 },
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: { duration: 0.2 },
		},
	};

	// Renderizar estado de carga
	if (loading && paymentMethods.length === 0) {
		return <ProfileLoadingSkeleton type='payment' />;
	}

	// Renderizar estado de error
	if (error) {
		return (
			<div className='p-6 bg-dark/40 backdrop-blur-lg border border-error/20 rounded-xl text-center'>
				<AiOutlineInfoCircle className='text-4xl text-error mx-auto mb-3' />
				<h3 className='text-xl font-medium text-light mb-2'>
					Error al cargar los métodos de pago
				</h3>
				<p className='text-light/70 mb-4'>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className='px-4 py-2.5 bg-white/10 hover:bg-white/15 text-light rounded-xl transition-all'>
					Reintentar
				</button>
			</div>
		);
	}

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='space-y-6'>

			{/* Header con búsqueda y filtros */}
			<motion.div
				variants={itemVariants}
				className='flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center'>
				<h2 className='text-xl font-medium text-light flex items-center gap-2'>
					<span className='h-8 w-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center'>
						<AiOutlineCreditCard className='text-primary' />
					</span>
					<span>Métodos de Pago</span>
					<span className='text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full text-light/70'>
						{paymentMethods.length}
					</span>
				</h2>

				<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
					{/* Búsqueda */}
					<div className='relative w-full sm:w-64'>
						<input
							type='text'
							placeholder='Buscar por titular o número...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-light placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition duration-150'
						/>
						<AiOutlineSearch className='absolute left-3.5 top-1/2 transform -translate-y-1/2 text-light/40' />
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-light/40 hover:text-light/70 transition duration-150'
								aria-label='Limpiar búsqueda'>
								<AiOutlineClose className='h-4 w-4' />
							</button>
						)}
					</div>

					{/* Filtros para pantallas más grandes */}
					<div className='hidden sm:flex gap-2'>
						<div className='relative'>
							<select
								value={filterValue}
								onChange={(e) => setFilterValue(e.target.value)}
								className='appearance-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition duration-150 [&>option]:bg-dark cursor-pointer'>
								<option value='all'>Todos los tipos</option>
								<option value='credit'>Crédito</option>
								<option value='debit'>Débito</option>
								<option value='other'>Otros</option>
							</select>
							<RiFilterLine className='absolute left-3.5 top-1/2 transform -translate-y-1/2 text-light/40' />
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-light/40'>
								<svg
									className='h-4 w-4 fill-current'
									viewBox='0 0 20 20'>
									<path
										d='M7 7l3-3 3 3m0 6l-3 3-3-3'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>

						<div className='relative'>
							<select
								value={sortValue}
								onChange={(e) => setSortValue(e.target.value)}
								className='appearance-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition duration-150 [&>option]:bg-dark cursor-pointer'>
								<option value='default'>
									Ordenar por: Predeterminado
								</option>
								<option value='expiry'>
									Ordenar por: Expiración
								</option>
								<option value='name'>
									Ordenar por: Nombre
								</option>
							</select>
							<RiSortDesc className='absolute left-3.5 top-1/2 transform -translate-y-1/2 text-light/40' />
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-light/40'>
								<svg
									className='h-4 w-4 fill-current'
									viewBox='0 0 20 20'>
									<path
										d='M7 7l3-3 3 3m0 6l-3 3-3-3'
										strokeWidth='1.5'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Menú de filtros para móvil */}
					<div className='flex sm:hidden w-full gap-2'>
						<button
							className='flex-1 flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2.5 px-4 text-light focus:outline-none focus:ring-2 focus:ring-primary/20 transition duration-150'
							onClick={() =>
								setIsFilterMenuOpen(!isFilterMenuOpen)
							}
							aria-expanded={isFilterMenuOpen}
							aria-controls='filter-menu'>
							<AiOutlineFilter />
							<span>Filtros y Ordenar</span>
							<svg
								className={`w-4 h-4 transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180' : ''}`}
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M19 9l-7 7-7-7'
								/>
							</svg>
						</button>
					</div>
				</div>
			</motion.div>

			{/* Menú de filtros móvil desplegable */}
			<AnimatePresence>
				{isFilterMenuOpen && (
					<motion.div
						id='filter-menu'
						variants={dropdownVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='sm:hidden space-y-3 bg-dark/40 backdrop-blur-lg border border-white/10 rounded-xl p-4'>
						<div className='space-y-2'>
							<label className='block text-sm text-light/70 mb-1'>
								Tipo de tarjeta
							</label>
							<div className='grid grid-cols-2 gap-2'>
								{[
									{ value: 'all', label: 'Todas' },
									{ value: 'credit', label: 'Crédito' },
									{ value: 'debit', label: 'Débito' },
									{ value: 'other', label: 'Otras' },
								].map((option) => (
									<button
										key={option.value}
										onClick={() =>
											setFilterValue(option.value)
										}
										className={`py-2 px-3 rounded-lg text-sm font-medium transition duration-150 ${
											filterValue === option.value
												? 'bg-primary/20 border border-primary/30 text-light'
												: 'bg-white/5 border border-white/10 text-light/70'
										}`}>
										{option.label}
									</button>
								))}
							</div>
						</div>

						<div className='space-y-2'>
							<label className='block text-sm text-light/70 mb-1'>
								Ordenar por
							</label>
							<div className='grid grid-cols-3 gap-2'>
								{[
									{
										value: 'default',
										label: 'Predeterminado',
									},
									{ value: 'expiry', label: 'Expiración' },
									{ value: 'name', label: 'Nombre' },
								].map((option) => (
									<button
										key={option.value}
										onClick={() =>
											setSortValue(option.value)
										}
										className={`py-2 px-3 rounded-lg text-sm font-medium transition duration-150 ${
											sortValue === option.value
												? 'bg-secondary/20 border border-secondary/30 text-light'
												: 'bg-white/5 border border-white/10 text-light/70'
										}`}>
										{option.label}
									</button>
								))}
							</div>
						</div>

						<div className='pt-2 flex justify-between'>
							<button
								onClick={clearFilters}
								className='text-sm text-accent1 hover:text-accent1/80 transition duration-150 flex items-center gap-1'>
								<AiOutlineClose className='w-3 h-3' />
								Limpiar filtros
							</button>

							<button
								onClick={() => setIsFilterMenuOpen(false)}
								className='text-sm text-primary hover:text-primary/80 transition duration-150 px-3 py-1 bg-primary/10 rounded-lg'>
								Aplicar
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Filtros aplicados (chips) */}
			{(filterValue !== 'all' ||
				sortValue !== 'default' ||
				searchQuery) && (
				<motion.div
					variants={itemVariants}
					className='flex flex-wrap gap-2'>
					{filterValue !== 'all' && (
						<div className='px-3 py-1.5 bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary text-xs font-medium rounded-full flex items-center gap-1 border border-secondary/20'>
							<span>
								{filterValue === 'credit' && 'Crédito'}
								{filterValue === 'debit' && 'Débito'}
								{filterValue === 'other' && 'Otros tipos'}
							</span>
							<button
								onClick={() => setFilterValue('all')}
								className='ml-1 hover:text-accent1 transition duration-150'
								aria-label='Quitar filtro de tipo'>
								<AiOutlineClose className='h-3 w-3' />
							</button>
						</div>
					)}

					{sortValue !== 'default' && (
						<div className='px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium rounded-full flex items-center gap-1 border border-primary/20'>
							<span>
								{sortValue === 'expiry' &&
									'Ordenado por expiración'}
								{sortValue === 'name' && 'Ordenado por nombre'}
							</span>
							<button
								onClick={() => setSortValue('default')}
								className='ml-1 hover:text-accent1 transition duration-150'
								aria-label='Quitar ordenamiento'>
								<AiOutlineClose className='h-3 w-3' />
							</button>
						</div>
					)}

					{searchQuery && (
						<div className='px-3 py-1.5 bg-gradient-to-r from-accent2/10 to-accent2/5 text-accent2 text-xs font-medium rounded-full flex items-center gap-1 border border-accent2/20'>
							<span>Búsqueda: "{searchQuery}"</span>
							<button
								onClick={() => setSearchQuery('')}
								className='ml-1 hover:text-accent1 transition duration-150'
								aria-label='Limpiar búsqueda'>
								<AiOutlineClose className='h-3 w-3' />
							</button>
						</div>
					)}

					{(filterValue !== 'all' ||
						sortValue !== 'default' ||
						searchQuery) && (
						<button
							onClick={clearFilters}
							className='px-3 py-1.5 bg-white/5 text-light/70 hover:text-light text-xs font-medium rounded-full flex items-center gap-1 border border-white/10 transition duration-150'>
							Limpiar todo
						</button>
					)}
				</motion.div>
			)}

			{/* Formulario para agregar/editar método de pago */}
			<AnimatePresence>
				{isAddingNew && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}>
						<PaymentMethodForm
							editMethod={editMethod}
							onSubmit={handleSubmit}
							onCancel={handleCancel}
							isSubmitting={isSubmitting}
							title={
								editMethod
									? 'Editar método de pago'
									: 'Agregar método de pago'
							}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Lista de métodos de pago */}
			<div className='space-y-4'>
				{!isAddingNew && (
					<motion.div variants={itemVariants} className='mb-4'>
						<button
							onClick={() => setIsAddingNew(true)}
							className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl transition-all duration-300 border border-white/10 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20'>
							<AiOutlinePlus size={20} />
							<span>Agregar nuevo método de pago</span>
						</button>
					</motion.div>
				)}

				{paymentMethods.length > 0 ? (
					filteredMethods.length > 0 ? (
						<>
							<div className='grid gap-4'>
								<AnimatePresence mode='wait'>
									{filteredMethods.map((method, index) => (
										<motion.div
											key={method.id}
											variants={itemVariants}
											initial='hidden'
											animate='visible'
											exit='hidden'
											custom={index}
											transition={{ delay: index * 0.05 }}
											layout>
											<PaymentMethodCard
												paymentMethod={method}
												onSetDefault={handleSetDefault}
												onEdit={handleEdit}
												onDelete={handleDelete}
												animated={false}
											/>
										</motion.div>
									))}
								</AnimatePresence>
							</div>

							{/* Contador de resultados */}
							{searchQuery && (
								<motion.p
									variants={itemVariants}
									className='text-sm text-light/60 text-center mt-4'>
									Se{' '}
									{filteredMethods.length === 1
										? 'encontró'
										: 'encontraron'}{' '}
									<span className='text-light font-medium'>
										{filteredMethods.length}
									</span>{' '}
									{filteredMethods.length === 1
										? 'resultado'
										: 'resultados'}
								</motion.p>
							)}
						</>
					) : (
						<motion.div variants={itemVariants}>
							<div className='p-8 bg-dark/40 backdrop-blur-lg border border-white/10 rounded-xl text-center'>
								<div className='w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4'>
									<AiOutlineSearch className='text-3xl text-light/40' />
								</div>
								<h3 className='text-lg font-medium text-light mb-2'>
									No se encontraron resultados
								</h3>
								<p className='text-light/60 mb-4'>
									No hay métodos de pago que coincidan con tu
									búsqueda o filtros.
								</p>
								<button
									onClick={clearFilters}
									className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent2/20 to-accent2/10 hover:from-accent2/30 hover:to-accent2/20 text-light rounded-lg transition-all duration-200 border border-accent2/20'>
									<AiOutlineFilter className='text-accent2' />
									<span>Limpiar filtros</span>
								</button>
							</div>
						</motion.div>
					)
				) : (
					<motion.div variants={itemVariants}>
						<ProfileEmptyState
							title='No tienes métodos de pago guardados'
							description='Agrega tus tarjetas de crédito o débito para realizar compras más rápido y gestionar tus pagos en un solo lugar.'
							customIcon={
								<div className='h-20 w-20 rounded-full bg-gradient-to-br from-secondary/20 to-accent2/20 backdrop-blur-sm flex items-center justify-center border border-white/10'>
									<FaRegCreditCard className='text-4xl text-secondary' />
								</div>
							}
							actionText='Agregar método de pago'
							onActionClick={() => setIsAddingNew(true)}
							animated={false}
						/>
					</motion.div>
				)}
			</div>

			{/* Información adicional */}
			{paymentMethods.length > 0 && (
				<motion.div
					variants={itemVariants}
					className='mt-6 bg-gradient-to-r from-dark/60 to-dark/40 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-sm'>
					<div className='flex items-start gap-3'>
						<div className='mt-0.5 h-9 w-9 rounded-full bg-accent2/10 flex items-center justify-center flex-shrink-0'>
							<AiOutlineInfoCircle className='text-accent2 text-xl' />
						</div>
						<div className='text-sm'>
							<h4 className='font-medium text-light mb-2'>
								Seguridad de tarjetas
							</h4>
							<p className='text-light/70 leading-relaxed'>
								Toda tu información de pago está encriptada y
								protegida. Por tu seguridad, nunca almacenamos
								el número completo ni el CVV de tus tarjetas.
								<span className='hidden sm:inline'>
									{' '}
									Nuestro sistema cumple con los más altos
									estándares de seguridad PCI DSS.
								</span>
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default PaymentMethodList;
