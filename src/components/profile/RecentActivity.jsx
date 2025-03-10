'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
	AiOutlineClockCircle,
	AiOutlineArrowRight,
	AiOutlineLoading3Quarters,
	AiOutlineInfoCircle,
	AiOutlineHistory,
	AiOutlineLogin,
	AiOutlineShoppingCart,
	AiOutlineCheck,
	AiOutlineLock,
	AiOutlineEnvironment,
} from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import ProfileLoadingSkeleton from './utils/ProfileLoadingSkeleton';
import ProfileEmptyState from './utils/ProfileEmptyState';

const RecentActivity = ({
	activities = null,
	loading = false,
	error = null,
	limit = 5,
	showViewAll = true,
}) => {
	// State for pagination and loading more items
	const [displayLimit, setDisplayLimit] = useState(limit);
	const [loadingMore, setLoadingMore] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Mock data for development
	const mockActivities = [
		{
			id: 'act-1',
			type: 'login',
			title: 'Has iniciado sesión desde un nuevo dispositivo',
			timestamp: 'Hoy, 10:30 AM',
			date: new Date(), // For sorting
			icon: <AiOutlineLogin />,
			color: 'accent1',
			link: null,
			linkText: null,
			details: { device: 'iPhone 14', location: 'Ciudad de México' },
		},
		{
			id: 'act-2',
			type: 'order_created',
			title: 'Nuevo pedido realizado',
			timestamp: 'Ayer, 5:45 PM',
			date: new Date(Date.now() - 24 * 60 * 60 * 1000),
			icon: <AiOutlineShoppingCart />,
			color: 'secondary',
			link: '/profile/orders/ORD-94872',
			linkText: 'ORD-94872',
			details: { total: '$349.99', items: 2 },
		},
		{
			id: 'act-3',
			type: 'order_delivered',
			title: 'Pedido entregado',
			timestamp: 'Ayer, 3:20 PM',
			date: new Date(
				Date.now() - 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000
			),
			icon: <AiOutlineCheck />,
			color: 'success',
			link: '/profile/orders/ORD-85693',
			linkText: 'ORD-85693',
			details: { address: 'Calle Tecnológica #404' },
		},
		{
			id: 'act-4',
			type: 'password_changed',
			title: 'Actualización de contraseña',
			timestamp: '28 Feb, 2:15 PM',
			date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
			icon: <AiOutlineLock />,
			color: 'accent2',
			link: null,
			linkText: null,
			details: { device: 'Windows PC', browser: 'Chrome' },
		},
		{
			id: 'act-5',
			type: 'address_added',
			title: 'Nueva dirección agregada',
			timestamp: '25 Feb, 11:30 AM',
			date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
			icon: <AiOutlineEnvironment />,
			color: 'primary',
			link: '/profile/addresses',
			linkText: 'Ver dirección',
			details: { address: 'Avenida Digital #123' },
		},
		{
			id: 'act-6',
			type: 'login_attempt',
			title: 'Intento de acceso fallido',
			timestamp: '20 Feb, 9:15 PM',
			date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
			icon: <AiOutlineInfoCircle />,
			color: 'error',
			link: null,
			linkText: null,
			details: { location: 'Roma, Italia', device: 'Desconocido' },
		},
	];

	// Use provided activities or fallback to mock data
	const userActivities = activities || mockActivities;

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

	// Simulate loading more activities
	const handleLoadMore = async () => {
		setLoadingMore(true);
		// Simulating API delay
		await new Promise((resolve) => setTimeout(resolve, 800));
		setDisplayLimit((prev) => prev + 3);
		setLoadingMore(false);
	};

	// Set mounted state for client-side effects
	useEffect(() => {
		setMounted(true);
	}, []);

	// If loading, show skeleton
	if (loading) {
		return <ProfileLoadingSkeleton type='activity' />;
	}

	// If error, show error state
	if (error) {
		return (
			<ProfileEmptyState
				title='No se pudo cargar la actividad reciente'
				description={
					error ||
					'Ha ocurrido un problema al cargar tu actividad reciente. Por favor, inténtalo de nuevo más tarde.'
				}
				icon={<AiOutlineInfoCircle className='text-4xl text-accent1' />}
				actionText='Actualizar'
				actionLink='/profile'
			/>
		);
	}

	// If no activities, show empty state
	if (!userActivities || userActivities.length === 0) {
		return (
			<ProfileEmptyState
				title='Sin actividad reciente'
				description='No se ha registrado actividad reciente en tu cuenta'
				icon={<AiOutlineHistory className='text-4xl text-gray' />}
				actionText='Explorar productos'
				actionLink='/products'
			/>
		);
	}

	// Get color class based on activity color name
	const getColorClasses = (color) => {
		const colors = {
			primary: 'bg-primary border-primary/30 text-primary',
			secondary: 'bg-secondary border-secondary/30 text-secondary',
			accent1: 'bg-accent1 border-accent1/30 text-accent1',
			accent2: 'bg-accent2 border-accent2/30 text-accent2',
			success: 'bg-success border-success/30 text-success',
			error: 'bg-error border-error/30 text-error',
			gray: 'bg-gray border-gray/30 text-gray',
		};

		return colors[color] || colors.gray;
	};

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden'>
				{/* Header */}
				<div className='p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-dark/20 to-transparent'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-full bg-accent1/10 flex items-center justify-center text-accent1'>
							<AiOutlineHistory size={18} />
						</div>
						<h2 className='text-lg md:text-xl font-semibold text-light'>
							Actividad Reciente
						</h2>
					</div>

					{showViewAll && (
						<Link
							href='/profile/activity'
							className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-light/70 hover:text-light text-sm font-medium group'>
							<span>Ver todo</span>
							<AiOutlineArrowRight
								size={14}
								className='transform group-hover:translate-x-1 transition-transform duration-300'
							/>
						</Link>
					)}
				</div>

				{/* Activity Timeline */}
				<div className='relative p-4 md:p-6'>
					{/* Background line */}
					<div className='absolute left-7 top-6 bottom-6 w-0.5 bg-white/10'></div>

					{/* Activity items */}
					<div className='space-y-5'>
						{userActivities
							.slice(0, displayLimit)
							.map((activity, index) => (
								<motion.div
									key={activity.id}
									variants={itemVariants}
									className={`relative ml-7 ${
										index !== userActivities.length - 1 &&
										index !== displayLimit - 1
											? 'pb-5'
											: ''
									}`}>
									{/* Timeline dot */}
									<div className='absolute -left-7 top-0 flex items-center justify-center'>
										<div
											className={`w-5 h-5 rounded-full border-2 border-dark flex items-center justify-center ${getColorClasses(activity.color)}`}>
											<span
												className='text-dark'
												style={{ fontSize: '10px' }}>
												{activity.icon}
											</span>
										</div>
									</div>

									{/* Activity card */}
									<div className='bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all duration-300'>
										{/* Timestamp */}
										<div className='flex items-center gap-2 text-xs md:text-sm text-light/60 mb-2'>
											<AiOutlineClockCircle size={14} />
											<span>{activity.timestamp}</span>
										</div>

										{/* Main content */}
										<div>
											<p className='text-sm md:text-base text-light'>
												{activity.title}{' '}
												{activity.linkText && (
													<Link
														href={activity.link}
														className={`font-medium text-${activity.color} hover:underline`}>
														{activity.linkText}
													</Link>
												)}
											</p>

											{/* Optional details */}
											{activity.details &&
												Object.keys(activity.details)
													.length > 0 && (
													<div className='mt-2 text-xs text-light/50 flex flex-wrap gap-x-4 gap-y-1'>
														{Object.entries(
															activity.details
														).map(
															([key, value]) => (
																<span
																	key={key}
																	className='flex items-center gap-1'>
																	<span className='capitalize'>
																		{key}:
																	</span>{' '}
																	{value}
																</span>
															)
														)}
													</div>
												)}
										</div>
									</div>
								</motion.div>
							))}
					</div>

					{/* Load more button */}
					{displayLimit < userActivities.length && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className='mt-6 flex justify-center'>
							<button
								onClick={handleLoadMore}
								disabled={loadingMore}
								className={`
                  inline-flex items-center gap-2 px-5 py-2.5 
                  bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 
                  border border-white/10 hover:border-white/20 
                  rounded-xl text-sm text-light transition-all duration-300
                  ${loadingMore ? 'opacity-70 cursor-not-allowed' : ''}
                `}>
								{loadingMore ? (
									<>
										<AiOutlineLoading3Quarters className='animate-spin' />
										<span>Cargando...</span>
									</>
								) : (
									<>
										<span>Cargar más</span>
										<AiOutlineArrowRight className='transform group-hover:translate-x-1' />
									</>
								)}
							</button>
						</motion.div>
					)}

					{/* Empty state when no more activities */}
					{displayLimit >= userActivities.length &&
						userActivities.length > 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className='mt-6 text-center text-sm text-light/50 py-2'>
								No hay más actividades para mostrar
							</motion.div>
						)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default RecentActivity;
