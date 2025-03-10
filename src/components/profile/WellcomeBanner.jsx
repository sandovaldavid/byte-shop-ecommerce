'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
	AiOutlineEdit,
	AiOutlineShopping,
	AiOutlineHeart,
	AiOutlineStar,
	AiOutlineBarChart,
	AiOutlineLoading3Quarters,
	AiOutlineUser,
	AiOutlineRise,
} from 'react-icons/ai';
import ProfileLoadingSkeleton from './utils/ProfileLoadingSkeleton';
import ProfileEmptyState from './utils/ProfileEmptyState';
import ProfileMetrics from './utils/ProfileMetrics';

const WellcomeBanner = ({ userData = null, loading = false, error = null }) => {
	const [mounted, setMounted] = useState(false);
	const [showStatsDetails, setShowStatsDetails] = useState(false);

	// Simulate loading for demo purposes - remove in production
	useEffect(() => {
		setMounted(true);
	}, []);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: 'spring', stiffness: 300, damping: 24 },
		},
	};

	const cardVariants = {
		hover: {
			y: -5,
			boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
			transition: { duration: 0.2 },
		},
	};

	// Default mock data for fallback
	const defaultData = {
		name: 'Carlos Rodríguez',
		email: 'carlos@example.com',
		avatar: null,
		lastLogin: 'Hoy, 10:30 AM',
		stats: {
			totalOrders: 8,
			wishlistItems: 12,
			reviewsGiven: 5,
			totalSpent: '$1,249.99',
			orderIncrease: '+24%',
			activityLevel: 'Alto',
		},
	};

	// Merge userData with default data, ensuring all required fields exist
	const mockUserData = userData
		? {
				...defaultData,
				...userData,
				stats: {
					...defaultData.stats,
					...(userData?.stats || {}),
				},
			}
		: defaultData;

	// Format metrics data for ProfileMetrics component
	const metricsData = [
		{
			id: 'orders',
			title: 'Pedidos',
			value: mockUserData.stats.totalOrders || 0,
			icon: <AiOutlineShopping className='text-secondary' />,
			change: mockUserData.stats.orderIncrease || null,
			positive: true,
			link: '/profile/orders',
		},
		{
			id: 'wishlist',
			title: 'Favoritos',
			value: mockUserData.stats.wishlistItems || 0,
			icon: <AiOutlineHeart className='text-accent1' />,
			link: '/profile/wishlist',
		},
		{
			id: 'reviews',
			title: 'Reseñas',
			value: mockUserData.stats.reviewsGiven || 0,
			icon: <AiOutlineStar className='text-accent2' />,
			link: '/profile/reviews',
		},
		{
			id: 'spent',
			title: 'Total Gastado',
			value: mockUserData.stats.totalSpent || '$0.00',
			icon: <AiOutlineBarChart className='text-success' />,
			link: '/profile/orders',
		},
	];

	// Loading state
	if (loading) {
		return <ProfileLoadingSkeleton type='welcome-banner' />;
	}

	// Error state
	if (error) {
		return (
			<ProfileEmptyState
				title='No pudimos cargar tus datos'
				description='Ha ocurrido un error al cargar tu información personal. Por favor, intenta de nuevo más tarde.'
				actionText='Intentar de nuevo'
				actionLink='/profile'
			/>
		);
	}

	// Empty data state - removed !userData check since we now have default fallback
	if (!mounted) {
		return (
			<div className='animate-pulse rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/5 border border-white/10 p-4 sm:p-6 mb-4 sm:mb-8'>
				<div className='h-6 sm:h-8 w-32 sm:w-48 bg-white/10 rounded-lg mb-2 sm:mb-4'></div>
				<div className='h-3 sm:h-4 w-24 sm:w-36 bg-white/5 rounded-lg'></div>
			</div>
		);
	}

	// Main component render
	return (
		<div className='w-full px-0'>
			{/* Welcome Banner with Glass Effect */}
			<motion.div
				className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-dark/40 to-secondary/10 border border-white/10 backdrop-blur-sm w-full'
				variants={containerVariants}
				initial='hidden'
				animate='visible'>
				{/* Decorative elements */}
				<div className='absolute -bottom-20 -right-20 w-64 h-64 bg-accent1/10 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
				<div className='absolute -top-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl opacity-30 pointer-events-none'></div>
				<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent1/50 to-transparent'></div>

				{/* Content Container */}
				<div className='p-4 sm:p-6 md:p-8 relative z-10'>
					{/* Header Section */}
					<motion.div
						variants={itemVariants}
						className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8'>
						<div className='flex items-center gap-3 sm:gap-4 w-full sm:w-auto'>
							{/* User Avatar */}
							<div className='relative flex-shrink-0'>
								<div className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-secondary/30 to-accent1/30 flex items-center justify-center overflow-hidden border-2 border-white/20'>
									{mockUserData.avatar ? (
										<img
											src={mockUserData.avatar}
											alt={mockUserData.name}
											className='w-full h-full object-cover'
										/>
									) : (
										<AiOutlineUser
											size={24}
											className='text-light sm:text-3xl'
										/>
									)}
								</div>
								<div className='absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-success rounded-full border-2 border-dark'></div>
							</div>

							{/* User Info - Ensure text doesn't overflow */}
							<div className='min-w-0 flex-1'>
								<h1 className='text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-light via-light to-light/80 bg-clip-text text-transparent truncate'>
									Bienvenido,{' '}
									{mockUserData.name.split(' ')[0]}
								</h1>
								<p className='text-light/60 mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm truncate'>
									<span className='inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent2 rounded-full flex-shrink-0'></span>
									<span className='truncate'>
										Último acceso: {mockUserData.lastLogin}
									</span>
								</p>
							</div>
						</div>

						{/* Actions Button - Full width on mobile */}
						<Link
							href='/profile/settings'
							passHref
							className='w-full sm:w-auto'>
							<motion.button
								className='group flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:py-2.5 bg-white/10 hover:bg-white/15 transition-colors rounded-xl text-sm text-light border border-white/5 w-full sm:w-auto mt-3 sm:mt-0'
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.98 }}>
								<AiOutlineEdit
									size={16}
									className='text-secondary'
								/>
								<span>Editar Perfil</span>
							</motion.button>
						</Link>
					</motion.div>

					{/* Stats Dashboard */}
					<motion.div
						variants={itemVariants}
						className='mb-3 sm:mb-4 overflow-hidden'>
						<AnimatePresence mode='wait'>
							{showStatsDetails ? (
								<motion.div
									key='detailed-stats'
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className='overflow-x-auto scrollbar-hide'>
									<div className='min-w-[600px] sm:min-w-0'>
										<ProfileMetrics metrics={metricsData} />
									</div>
								</motion.div>
							) : (
								<motion.div
									key='simple-stats'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}>
									<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
										{metricsData.map((metric, index) => (
											<Link
												key={metric.id}
												href={metric.link}
												passHref>
												<motion.div
													className='bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5 cursor-pointer transition-all duration-200 transform'
													variants={cardVariants}
													whileHover='hover'>
													<div className='flex items-center justify-between'>
														<div className='min-w-0 flex-1'>
															<p className='text-light/60 text-xs font-medium truncate'>
																{metric.title}
															</p>
															<p className='text-base sm:text-lg md:text-xl font-bold text-light'>
																{metric.value}
															</p>
														</div>
														<div
															className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ml-1 ${
																index === 0
																	? 'bg-secondary/20'
																	: index ===
																		  1
																		? 'bg-accent1/20'
																		: index ===
																			  2
																			? 'bg-accent2/20'
																			: 'bg-success/20'
															}`}>
															{metric.icon}
														</div>
													</div>
												</motion.div>
											</Link>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					{/* Toggle Button for Stats View */}
					<motion.div
						variants={itemVariants}
						className='flex justify-center'>
						<button
							onClick={() => setShowStatsDetails((prev) => !prev)}
							className='text-xs text-light/60 hover:text-light/80 transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full touch-manipulation'
							aria-label={
								showStatsDetails
									? 'Mostrar vista simple'
									: 'Mostrar vista detallada'
							}>
							{showStatsDetails
								? 'Vista Simple'
								: 'Vista Detallada'}
							<span
								className={`transition-transform duration-300 ${showStatsDetails ? 'rotate-180' : ''}`}>
								↓
							</span>
						</button>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default WellcomeBanner;
