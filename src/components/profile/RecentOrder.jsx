'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
	AiOutlineArrowRight,
	AiOutlineCalendar,
	AiOutlineClockCircle,
	AiOutlineShoppingCart,
	AiOutlineRight,
	AiOutlineInfoCircle,
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineTruck,
} from 'react-icons/ai';
import ProfileLoadingSkeleton from './utils/ProfileLoadingSkeleton';
import ProfileEmptyState from './utils/ProfileEmptyState';

const RecentOrder = ({
	orders = null,
	loading = false,
	error = null,
	limit = 3,
	showHeader = true,
	animated = true,
}) => {
	// Mock data for development
	const mockRecentOrders = [
		{
			id: 'ORD-94872',
			date: '5 marzo, 2024',
			total: '$349.99',
			items: 2,
			status: 'Entregado',
			statusClass: 'bg-success/20 text-success',
			statusIcon: <AiOutlineCheckCircle className='text-success' />,
			products: [
				{
					id: 'prod-1',
					name: 'Auriculares Bluetooth ANC Pro',
					price: '$129.99',
					image: '/products/headphones.jpg',
				},
				{
					id: 'prod-2',
					name: 'Smartwatch Fitness Plus',
					price: '$219.99',
					image: '/products/smartwatch.jpg',
				},
			],
		},
		{
			id: 'ORD-85693',
			date: '28 febrero, 2024',
			total: '$129.50',
			items: 1,
			status: 'En camino',
			statusClass: 'bg-accent2/20 text-accent2',
			statusIcon: <AiOutlineTruck className='text-accent2' />,
			products: [
				{
					id: 'prod-3',
					name: 'Cargador Rápido USB-C',
					price: '$129.50',
					image: '/products/charger.jpg',
				},
			],
		},
		{
			id: 'ORD-74528',
			date: '12 febrero, 2024',
			total: '$766.00',
			items: 3,
			status: 'Cancelado',
			statusClass: 'bg-error/20 text-error',
			statusIcon: <AiOutlineCloseCircle className='text-error' />,
			products: [
				{
					id: 'prod-4',
					name: 'Laptop UltraBook X1',
					price: '$599.99',
					image: '/products/laptop.jpg',
				},
				{
					id: 'prod-5',
					name: 'Teclado Mecánico RGB',
					price: '$89.99',
					image: '/products/keyboard.jpg',
				},
				{
					id: 'prod-6',
					name: 'Mouse Gamer Pro',
					price: '$76.02',
					image: '/products/mouse.jpg',
				},
			],
		},
	];

	// Use provided orders or fallback to mock data
	const displayOrders = orders || mockRecentOrders;

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
			},
		},
	};

	// If loading, show skeleton
	if (loading) {
		return <ProfileLoadingSkeleton type='recentOrders' />;
	}

	// If error, show error state
	if (error) {
		return (
			<ProfileEmptyState
				title='No se pudieron cargar los pedidos recientes'
				description={
					error || 'Hubo un problema al cargar tus pedidos recientes.'
				}
				icon={<AiOutlineInfoCircle className='text-4xl text-accent1' />}
				actionText='Intentar de nuevo'
				actionLink='/profile'
			/>
		);
	}

	// If no orders, show empty state
	if (!displayOrders || displayOrders.length === 0) {
		return (
			<ProfileEmptyState
				title='No tienes pedidos recientes'
				description='¡Explora nuestra tienda y realiza tu primer compra!'
				icon={
					<AiOutlineShoppingCart className='text-4xl text-secondary' />
				}
				actionText='Ir a la tienda'
				actionLink='/products'
			/>
		);
	}

	return (
		<motion.div
			variants={animated ? containerVariants : null}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}
			className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden'>
			{/* Header Section */}
			{showHeader && (
				<div className='flex justify-between items-center p-5 border-b border-white/10 bg-gradient-to-r from-dark/30 to-transparent'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary'>
							<AiOutlineShoppingCart size={20} />
						</div>
						<h2 className='text-lg md:text-xl font-semibold text-light'>
							Pedidos Recientes
						</h2>
					</div>

					<Link
						href='/profile/orders'
						className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-secondary hover:text-accent1 text-sm font-medium'>
						<span>Ver todos</span>
						<AiOutlineArrowRight size={14} />
					</Link>
				</div>
			)}

			{/* Orders List */}
			<div className='p-4'>
				<AnimatePresence>
					{displayOrders.slice(0, limit).map((order, index) => (
						<motion.div
							key={order.id}
							variants={animated ? itemVariants : null}
							className={`
                bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl overflow-hidden
                transition-all duration-300 mb-4 last:mb-0 hover:border-secondary/20 hover:shadow-lg
                hover:shadow-secondary/5
              `}>
							{/* Order Header */}
							<div className='p-3 md:p-4 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-dark/20 to-transparent'>
								<div className='flex items-center gap-2'>
									<span className='font-medium text-xs md:text-sm text-light'>
										{order.id}
									</span>
									<span
										className={`text-xs px-2 py-0.5 rounded-full ${order.statusClass} flex items-center gap-1`}>
										{order.statusIcon}
										<span className='hidden xs:inline'>
											{order.status}
										</span>
									</span>
								</div>

								<div className='flex items-center gap-2 text-light/60 text-xs'>
									<AiOutlineCalendar className='text-secondary' />
									<span>{order.date}</span>
								</div>
							</div>

							{/* Order Content */}
							<div className='p-3 md:p-4 flex flex-col md:flex-row justify-between gap-4'>
								{/* Products preview */}
								<div className='flex-1'>
									<div className='flex flex-wrap items-center gap-2'>
										{order.products
											.slice(0, 3)
											.map((product, i) => (
												<div
													key={product.id}
													className='relative group'>
													<div className='w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/10 overflow-hidden'>
														<Image
															src={product.image}
															alt={product.name}
															width={56}
															height={56}
															className='w-full h-full object-cover group-hover:scale-110 transition-transform'
														/>
													</div>
													{/* Tooltip on hover */}
													<div className='absolute left-1/2 bottom-full -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity min-w-40'>
														<div className='bg-dark/90 text-light text-xs rounded-lg p-2 shadow-lg'>
															<p className='font-medium'>
																{product.name}
															</p>
															<p className='text-light/70'>
																{product.price}
															</p>
														</div>
														<div className='w-2 h-2 bg-dark/90 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1'></div>
													</div>
												</div>
											))}

										{order.products.length > 3 && (
											<div className='w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-light/50 text-xs'>
												+{order.products.length - 3}
											</div>
										)}
									</div>

									<div className='flex items-center gap-2 mt-3 text-light/60 text-xs'>
										<AiOutlineShoppingCart className='text-accent1' />
										<span>
											{order.items}{' '}
											{order.items === 1
												? 'artículo'
												: 'artículos'}
										</span>
									</div>
								</div>

								{/* Order total and actions */}
								<div className='flex items-center justify-between md:flex-col md:items-end gap-2'>
									<div className='text-right'>
										<p className='text-xs text-light/50'>
											Total
										</p>
										<p className='text-base md:text-lg font-semibold text-light'>
											{order.total}
										</p>
									</div>

									<Link
										href={`/profile/orders/${order.id}`}
										className='
                      px-3 py-1.5 rounded-lg bg-gradient-to-r from-secondary/20 to-secondary/10 hover:from-secondary/30 hover:to-secondary/20
                      border border-secondary/20 hover:border-secondary/30 transition-colors text-secondary
                      flex items-center gap-1.5 text-xs font-medium
                    '>
										<span>Ver detalles</span>
										<AiOutlineRight size={12} />
									</Link>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{/* Footer - show if more than limit */}
			{displayOrders.length > limit && (
				<div className='p-4 border-t border-white/10 flex justify-center'>
					<Link
						href='/profile/orders'
						className='
              px-4 py-2 rounded-lg bg-gradient-to-r from-secondary/10 to-accent1/10 hover:from-secondary/20 hover:to-accent1/20
              border border-white/5 hover:border-white/10 transition-all text-light
              flex items-center gap-2 text-sm
            '>
						<span>
							Ver todos los pedidos ({displayOrders.length})
						</span>
						<AiOutlineArrowRight size={14} />
					</Link>
				</div>
			)}
		</motion.div>
	);
};

export default RecentOrder;
