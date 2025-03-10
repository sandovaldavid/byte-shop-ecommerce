import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	AiOutlineSearch,
	AiOutlineFilter,
	AiOutlineCalendar,
	AiOutlineClose,
	AiOutlineSortAscending,
	AiOutlineInfoCircle,
	AiOutlineShoppingCart,
	AiOutlineTag,
} from 'react-icons/ai';
import OrderCard from '@/components/profile/orders/OrderCard';
import ProfileLoadingSkeleton from '@/components/profile/utils/ProfileLoadingSkeleton';
import ProfileEmptyState from '@/components/profile/utils/ProfileEmptyState';
import ProfileMetrics from '@/components/profile/utils/ProfileMetrics';

const OrderList = ({
	orders = [],
	loading = false,
	error = null,
	stats = { orders: 0, wishlist: 0, reviews: 0 },
	showMetrics = true,
}) => {
	// Estados para filtrado y ordenamiento
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [dateSort, setDateSort] = useState('desc');
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// Filtrar y ordenar pedidos
	const filteredOrders = useMemo(() => {
		return orders
			.filter((order) => {
				// Filtro por búsqueda
				const matchesSearch =
					searchQuery === '' ||
					order.id
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					order.products?.some((product) =>
						product.name
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
					);

				// Filtro por estado
				const matchesStatus =
					statusFilter === 'all' || order.status === statusFilter;

				return matchesSearch && matchesStatus;
			})
			.sort((a, b) => {
				// Ordenar por fecha
				const dateA = new Date(a.date.split(' ').reverse().join('/'));
				const dateB = new Date(b.date.split(' ').reverse().join('/'));
				return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
			});
	}, [orders, searchQuery, statusFilter, dateSort]);

	// Efectos de animación
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
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
	};

	// Mostrar skeleton mientras carga
	if (loading) {
		return <ProfileLoadingSkeleton />;
	}

	// Mostrar error si existe
	if (error) {
		return (
			<ProfileEmptyState
				title='Ha ocurrido un error'
				description={error}
				icon={
					<AiOutlineInfoCircle className='text-4xl text-error/80' />
				}
				actionText='Intentar de nuevo'
				onActionClick={() => window.location.reload()}
			/>
		);
	}

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='space-y-6 w-full'>
			{/* Métricas del usuario - Opcional */}
			{showMetrics && (
				<motion.div variants={itemVariants} className='mb-8'>
					<ProfileMetrics stats={stats} />
				</motion.div>
			)}

			{/* Cabecera y barra de búsqueda */}
			<motion.div
				variants={itemVariants}
				className='flex flex-col sm:flex-row gap-4 justify-between'>
				<div>
					<h2 className='text-xl sm:text-2xl font-bold text-light mb-1'>
						Mis Pedidos
					</h2>
					<p className='text-light/60 text-sm'>
						{orders.length === 0
							? 'Aún no tienes pedidos registrados'
							: `${orders.length} ${orders.length === 1 ? 'pedido realizado' : 'pedidos realizados'}`}
					</p>
				</div>

				<div className='relative w-full sm:max-w-xs'>
					<input
						type='search'
						placeholder='Buscar por ID o producto...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 pl-9 pr-4 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-colors'
					/>
					<AiOutlineSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-light/40' />
					{searchQuery && (
						<button
							onClick={() => setSearchQuery('')}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-light/40 hover:text-light/70 transition-colors'>
							<AiOutlineClose size={16} />
						</button>
					)}
				</div>
			</motion.div>

			{/* Filtros */}
			{orders.length > 0 && (
				<motion.div
					variants={itemVariants}
					className='flex flex-wrap items-center justify-between gap-2'>
					<div className='flex flex-wrap gap-2'>
						{/* Estado del pedido */}
						<div className='relative'>
							<select
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(e.target.value)
								}
								className='appearance-none bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 px-3 pr-8 text-sm text-light focus:outline-none focus:border-secondary/50 transition-colors [&>option]:bg-dark'>
								<option value='all'>Todos los estados</option>
								<option value='completed'>Completados</option>
								<option value='processing'>
									En procesamiento
								</option>
								<option value='shipped'>Enviados</option>
								<option value='cancelled'>Cancelados</option>
								<option value='pending'>Pendientes</option>
							</select>
							<AiOutlineFilter className='absolute right-3 top-1/2 transform -translate-y-1/2 text-light/40 pointer-events-none' />
						</div>

						{/* Ordenar por fecha */}
						<button
							onClick={() =>
								setDateSort(
									dateSort === 'desc' ? 'asc' : 'desc'
								)
							}
							className='flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 px-3 text-sm text-light hover:bg-white/10 transition-colors'>
							<AiOutlineCalendar size={16} />
							<span>
								Fecha:{' '}
								{dateSort === 'desc' ? 'Recientes' : 'Antiguos'}
							</span>
						</button>

						{/* Filtros adicionales en móvil */}
						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className='sm:hidden flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-2 px-3 text-sm text-light hover:bg-white/10 transition-colors'>
							<AiOutlineFilter size={16} />
							<span>Filtros</span>
						</button>
					</div>

					{/* Contador de resultados */}
					<div className='text-light/60 text-sm'>
						{filteredOrders.length}{' '}
						{filteredOrders.length === 1
							? 'resultado'
							: 'resultados'}
					</div>
				</motion.div>
			)}

			{/* Filtros expandibles en móvil */}
			{isFilterOpen && orders.length > 0 && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
					className='sm:hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'>
					<div className='space-y-3'>
						<div>
							<label className='text-sm text-light/70 mb-1 block'>
								Estado del pedido
							</label>
							<select
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(e.target.value)
								}
								className='w-full appearance-none bg-white/10 border border-white/10 rounded-xl py-2 px-3 pr-8 text-sm text-light [&>option]:bg-dark'>
								<option value='all'>Todos los estados</option>
								<option value='completed'>Completados</option>
								<option value='processing'>
									En procesamiento
								</option>
								<option value='shipped'>Enviados</option>
								<option value='cancelled'>Cancelados</option>
								<option value='pending'>Pendientes</option>
							</select>
						</div>

						<div>
							<label className='text-sm text-light/70 mb-1 block'>
								Ordenar por fecha
							</label>
							<div className='flex gap-2'>
								<button
									onClick={() => setDateSort('desc')}
									className={`flex-1 py-2 px-3 rounded-xl text-sm ${
										dateSort === 'desc'
											? 'bg-secondary/20 text-secondary border border-secondary/30'
											: 'bg-white/5 text-light/60 border border-white/10'
									}`}>
									Recientes primero
								</button>
								<button
									onClick={() => setDateSort('asc')}
									className={`flex-1 py-2 px-3 rounded-xl text-sm ${
										dateSort === 'asc'
											? 'bg-secondary/20 text-secondary border border-secondary/30'
											: 'bg-white/5 text-light/60 border border-white/10'
									}`}>
									Antiguos primero
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			)}

			{/* Lista de pedidos */}
			{orders.length > 0 ? (
				<>
					{filteredOrders.length > 0 ? (
						<div className='space-y-4'>
							{filteredOrders.map((order, index) => (
								<motion.div
									key={order.id}
									variants={itemVariants}
									custom={index}
									transition={{ delay: index * 0.05 }}>
									<OrderCard
										order={order}
										showDetails={true}
										animated={false}
									/>
								</motion.div>
							))}
						</div>
					) : (
						<motion.div variants={itemVariants}>
							<div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center'>
								<div className='w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4'>
									<AiOutlineSearch className='text-3xl text-light/40' />
								</div>
								<h3 className='text-xl font-medium text-light mb-2'>
									No se encontraron pedidos
								</h3>
								<p className='text-light/60 mb-6'>
									No hay pedidos que coincidan con tu
									búsqueda. Intenta con otros términos o
									filtros.
								</p>
								<button
									onClick={() => {
										setSearchQuery('');
										setStatusFilter('all');
										setIsFilterOpen(false);
									}}
									className='px-4 py-2 bg-gradient-to-r from-secondary/30 to-accent1/30 hover:from-secondary/40 hover:to-accent1/40 text-light rounded-xl transition-all duration-300 border border-white/10'>
									Limpiar filtros
								</button>
							</div>
						</motion.div>
					)}
				</>
			) : (
				<motion.div variants={itemVariants}>
					<ProfileEmptyState
						title='Aún no has realizado pedidos'
						description='Explora nuestra tienda y encuentra productos increíbles para ti'
						icon={
							<AiOutlineShoppingCart className='text-4xl text-accent1/80' />
						}
						actionText='Ir a la tienda'
						actionLink='/products'
						secondaryText='Ver ofertas'
						secondaryLink='/deals'
						animated={true}
					/>
				</motion.div>
			)}

			{/* Leyenda de estados (solo si hay pedidos) */}
			{filteredOrders.length > 0 && (
				<motion.div
					variants={itemVariants}
					className='mt-6 pt-4 border-t border-white/10'>
					<h3 className='text-sm font-medium text-light mb-3 flex items-center gap-1.5'>
						<AiOutlineTag className='text-secondary' />
						<span>Estados de pedidos</span>
					</h3>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs'>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-success/70'></div>
							<span className='text-light/70'>Completado</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-primary/70'></div>
							<span className='text-light/70'>
								En procesamiento
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-accent2/70'></div>
							<span className='text-light/70'>Enviado</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-error/70'></div>
							<span className='text-light/70'>Cancelado</span>
						</div>
						<div className='flex items-center gap-2'>
							<div className='w-3 h-3 rounded-full bg-secondary/70'></div>
							<span className='text-light/70'>Pendiente</span>
						</div>
					</div>
				</motion.div>
			)}

			{/* Información adicional */}
			{filteredOrders.length > 0 && (
				<motion.div
					variants={itemVariants}
					className='mt-2 flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'>
					<AiOutlineInfoCircle className='text-secondary text-xl flex-shrink-0 mt-0.5' />
					<div className='text-sm text-light/70'>
						<p className='mb-1'>
							¿Necesitas más información sobre tu pedido?
						</p>
						<p>
							Puedes hacer clic en "Detalles" para ver toda la
							información y el estado de tu pedido. Si tienes
							alguna duda, contacta con nuestro{' '}
							<Link
								href='/support'
								className='text-accent1 hover:text-accent2 transition-colors'>
								servicio de atención al cliente
							</Link>
							.
						</p>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default OrderList;
