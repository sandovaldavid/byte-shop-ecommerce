'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import {
	AiOutlinePlus,
	AiOutlineLoading3Quarters,
	AiOutlineEnvironment,
	AiOutlineCreditCard,
	AiOutlineSearch,
	AiOutlineSortAscending,
	AiOutlineClose,
	AiOutlineHome,
} from 'react-icons/ai';

const AddressList = ({
	addresses = [],
	isLoading = false,
	onAddAddress,
	onEditAddress,
	onDeleteAddress,
	onSetDefaultAddress,
}) => {
	// State
	const [filteredAddresses, setFilteredAddresses] = useState(addresses);
	const [filter, setFilter] = useState('all'); // 'all', 'shipping', 'billing'
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('default'); // 'default', 'name', 'newest'
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [editingAddress, setEditingAddress] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Apply filters, search and sort when addresses, filter or search changes
	useEffect(() => {
		let result = [...addresses];

		// Apply type filter
		if (filter !== 'all') {
			result = result.filter((address) => address.type === filter);
		}

		// Apply search
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(address) =>
					address.name?.toLowerCase().includes(query) ||
					address.alias?.toLowerCase().includes(query) ||
					address.street?.toLowerCase().includes(query) ||
					address.city?.toLowerCase().includes(query)
			);
		}

		// Apply sorting
		switch (sortBy) {
			case 'name':
				result.sort((a, b) =>
					(a.name || '').localeCompare(b.name || '')
				);
				break;
			case 'newest':
				result.sort(
					(a, b) =>
						new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
				);
				break;
			default:
				// Default addresses first, then by name
				result.sort((a, b) => {
					if (a.isDefault && !b.isDefault) return -1;
					if (!a.isDefault && b.isDefault) return 1;
					return (a.name || '').localeCompare(b.name || '');
				});
		}

		setFilteredAddresses(result);
	}, [addresses, filter, searchQuery, sortBy]);

	// Handle add address
	const handleAddAddress = (type) => {
		setEditingAddress(null);
		setIsAddingNew(true);
		setFilter(type);
	};

	// Handle submit of new or edited address
	const handleSubmit = async (addressData) => {
		setIsSubmitting(true);
		try {
			if (editingAddress) {
				await onEditAddress(addressData);
			} else {
				await onAddAddress(addressData);
			}
			setIsAddingNew(false);
			setEditingAddress(null);
		} catch (error) {
			console.error('Error saving address:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle edit address
	const handleEditAddress = (addressId) => {
		const address = addresses.find((addr) => addr.id === addressId);
		if (address) {
			setEditingAddress(address);
			setIsAddingNew(true);
		}
	};

	// Cancel add/edit form
	const handleCancelForm = () => {
		setIsAddingNew(false);
		setEditingAddress(null);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	// Define tabs with icons
	const tabs = [
		{ id: 'all', label: 'Todas', icon: <AiOutlineEnvironment /> },
		{ id: 'shipping', label: 'Envío', icon: <AiOutlineHome /> },
		{ id: 'billing', label: 'Facturación', icon: <AiOutlineCreditCard /> },
	];

	return (
		<div className='space-y-6'>
			{isAddingNew ? (
				<AnimatePresence mode='wait'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}>
						<AddressForm
							address={editingAddress}
							type={filter === 'all' ? 'shipping' : filter}
							onSubmit={handleSubmit}
							onCancel={handleCancelForm}
							isSubmitting={isSubmitting}
						/>
					</motion.div>
				</AnimatePresence>
			) : (
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='space-y-6'>
					{/* Header with actions */}
					<motion.div
						variants={itemVariants}
						className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
						<h2 className='text-xl font-bold text-light flex items-center gap-2'>
							<AiOutlineEnvironment className='text-secondary' />
							<span>Mis direcciones</span>
							<span className='ml-2 text-sm bg-white/10 px-2 py-0.5 rounded-full text-light/70'>
								{addresses.length}
							</span>
						</h2>

						<div className='flex flex-wrap gap-2'>
							<button
								onClick={() => handleAddAddress('shipping')}
								className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-accent1/20 font-medium text-sm'>
								<AiOutlinePlus />
								<span>Dirección de envío</span>
							</button>

							<button
								onClick={() => handleAddAddress('billing')}
								className='flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-light rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-white/10 text-sm'>
								<AiOutlinePlus />
								<span>Dirección de facturación</span>
							</button>
						</div>
					</motion.div>

					{/* Filter and search controls */}
					<motion.div
						variants={itemVariants}
						className='flex flex-col sm:flex-row gap-4'>
						{/* Tabs for filtering */}
						<div className='inline-flex bg-white/5 rounded-xl p-1 backdrop-blur-sm border border-white/10'>
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setFilter(tab.id)}
									className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all ${
										filter === tab.id
											? 'bg-white/10 text-secondary font-medium shadow-sm'
											: 'text-light/70 hover:text-light'
									}`}>
									<span>{tab.icon}</span>
									<span>{tab.label}</span>
								</button>
							))}
						</div>

						<div className='flex-1 flex gap-2'>
							{/* Search input */}
							<div className='relative flex-1'>
								<input
									type='text'
									placeholder='Buscar dirección...'
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
									className='w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/40 transition-all'
								/>
								<AiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50' />

								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className='absolute right-2 top-1/2 -translate-y-1/2 text-light/40 hover:text-light p-1'>
										<AiOutlineClose className='text-sm' />
									</button>
								)}
							</div>

							{/* Sort dropdown */}
							<div className='relative'>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className='appearance-none bg-white/5 border border-white/10 rounded-xl px-9 py-2 text-sm text-light focus:outline-none focus:border-secondary/40 transition-all pr-8'>
									<option value='default'>
										Predeterminadas primero
									</option>
									<option value='name'>Alfabético</option>
									<option value='newest'>
										Más recientes
									</option>
								</select>
								<AiOutlineSortAscending className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50' />
								<div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
									<svg
										className='w-4 h-4 text-light/50'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M19 9l-7 7-7-7'
										/>
									</svg>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Address list or loading/empty states */}
					{isLoading ? (
						<div className='flex flex-col items-center justify-center py-16'>
							<AiOutlineLoading3Quarters className='animate-spin text-4xl text-secondary mb-4' />
							<p className='text-light/70'>
								Cargando direcciones...
							</p>
						</div>
					) : filteredAddresses.length === 0 ? (
						<motion.div
							variants={itemVariants}
							className='flex flex-col items-center justify-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10'>
							<div className='w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4'>
								<AiOutlineEnvironment className='text-4xl text-light/30' />
							</div>

							{searchQuery ? (
								<>
									<p className='text-light font-medium'>
										No se encontraron resultados
									</p>
									<p className='text-light/60 text-sm mt-1'>
										Intenta con otra búsqueda
									</p>
									<button
										onClick={() => setSearchQuery('')}
										className='mt-4 px-4 py-2 bg-white/10 hover:bg-white/15 text-light rounded-xl transition-all text-sm'>
										Limpiar búsqueda
									</button>
								</>
							) : filter !== 'all' ? (
								<>
									<p className='text-light font-medium'>
										No tienes direcciones de{' '}
										{filter === 'shipping'
											? 'envío'
											: 'facturación'}
									</p>
									<p className='text-light/60 text-sm mt-1'>
										Agrega una nueva dirección para
										continuar
									</p>
									<button
										onClick={() => handleAddAddress(filter)}
										className='mt-4 px-4 py-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all text-sm flex items-center gap-2'>
										<AiOutlinePlus />
										<span>
											Agregar dirección de{' '}
											{filter === 'shipping'
												? 'envío'
												: 'facturación'}
										</span>
									</button>
								</>
							) : (
								<>
									<p className='text-light font-medium'>
										No tienes direcciones guardadas
									</p>
									<p className='text-light/60 text-sm mt-1'>
										Agrega una nueva dirección para
										continuar
									</p>
									<div className='flex flex-wrap gap-3 mt-4'>
										<button
											onClick={() =>
												handleAddAddress('shipping')
											}
											className='px-4 py-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all text-sm flex items-center gap-2'>
											<AiOutlinePlus />
											<span>Dirección de envío</span>
										</button>
										<button
											onClick={() =>
												handleAddAddress('billing')
											}
											className='px-4 py-2 bg-white/10 hover:bg-white/15 text-light rounded-xl transition-all text-sm flex items-center gap-2'>
											<AiOutlinePlus />
											<span>
												Dirección de facturación
											</span>
										</button>
									</div>
								</>
							)}
						</motion.div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6'>
							<AnimatePresence>
								{filteredAddresses.map((address) => (
									<motion.div
										key={address.id}
										variants={itemVariants}
										layout
										exit={{ opacity: 0, scale: 0.8 }}>
										<AddressCard
											address={address}
											isDefault={address.isDefault}
											type={address.type}
											onEdit={() =>
												handleEditAddress(address.id)
											}
											onDelete={onDeleteAddress}
											onSetDefault={onSetDefaultAddress}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					)}

					{/* Count summary and legend */}
					{filteredAddresses.length > 0 && (
						<motion.div
							variants={itemVariants}
							className='flex flex-col sm:flex-row justify-between items-center text-sm text-light/50 pt-2'>
							<p>
								{filter === 'all'
									? `Mostrando ${filteredAddresses.length} de ${addresses.length} direcciones`
									: `Mostrando ${filteredAddresses.length} direcciones de ${filter === 'shipping' ? 'envío' : 'facturación'}`}
							</p>

							<div className='flex gap-4 mt-2 sm:mt-0'>
								<div className='flex items-center gap-1'>
									<span className='w-3 h-3 rounded-full bg-secondary'></span>
									<span>Envío</span>
								</div>
								<div className='flex items-center gap-1'>
									<span className='w-3 h-3 rounded-full bg-accent1'></span>
									<span>Facturación</span>
								</div>
							</div>
						</motion.div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export default AddressList;
