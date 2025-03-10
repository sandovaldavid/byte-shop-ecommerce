'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
	AiOutlineEdit,
	AiOutlineShopping,
	AiOutlineHeart,
	AiOutlineStar,
	AiOutlineUser,
	AiOutlineClockCircle,
	AiOutlineCalendar,
	AiOutlineArrowRight,
	AiOutlineLoading3Quarters,
	AiOutlineInfoCircle,
	AiOutlineWallet,
	AiOutlineShoppingCart,
	AiOutlineCheckCircle,
	AiOutlineEnvironment,
	AiOutlineMail,
	AiOutlinePhone,
} from 'react-icons/ai';
import { RiTimeLine, RiShoppingBag3Line } from 'react-icons/ri';
import { BsShieldCheck } from 'react-icons/bs';
import ProfileLoadingSkeleton from '@/components/profile/utils/ProfileLoadingSkeleton';
import ProfileEmptyState from '@/components/profile/utils/ProfileEmptyState';
import WellcomeBanner from '@/components/profile/WellcomeBanner';
import RecentOrder from '@/components/profile/RecentOrder';
// import WishList from '@/components/profile/WishList';
import RecentActivity from '@/components/profile/RecentActivity';
import { AccountInformation } from '@/components';

// Mock data - Replace with actual API calls in production
const mockUserData = {
	name: 'David Rivera',
	email: 'david.rivera@email.com',
	phone: '+52 55 1234 5678',
	address: 'Calle Tecnológica #404',
	city: 'Ciudad Digital',
	postalCode: '12345',
	country: 'México',
	joinedDate: 'Noviembre 2023',
	avatar: null,
	verified: true,
	lastLogin: 'Hace 2 días',
	accountType: 'Premium',
};

export default function ProfileDashboardPage() {
	const [activeTab, setActiveTab] = useState('overview');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userData, setUserData] = useState(null);
	const [mounted, setMounted] = useState(false);

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
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	// Mock API call to fetch user data
	useEffect(() => {
		const fetchUserData = async () => {
			setIsLoading(true);
			try {
				// In a real app, replace with an actual API call
				await new Promise((resolve) => setTimeout(resolve, 800));
				setUserData(mockUserData);
				setError(null);
			} catch (err) {
				setError(
					'No pudimos cargar tu información. Por favor intenta de nuevo.'
				);
			} finally {
				setIsLoading(false);
				setMounted(true);
			}
		};

		fetchUserData();
	}, []);

	// Handle tab changes
	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	// If loading, show skeleton
	if (isLoading) {
		return <ProfileLoadingSkeleton type='profile' />;
	}

	// If error occurred
	if (error) {
		return (
			<ProfileEmptyState
				title='No se pudo cargar tu información'
				description={error}
				icon={<AiOutlineInfoCircle className='text-4xl text-accent1' />}
				actionText='Intentar de nuevo'
				actionLink='/profile'
			/>
		);
	}

	// If no user data available
	if (!userData && mounted) {
		return (
			<ProfileEmptyState
				title='No hay información disponible'
				description='Parece que aún no has configurado tu perfil o no has iniciado sesión.'
				icon={<AiOutlineUser className='text-4xl text-accent1' />}
				actionText='Iniciar sesión'
				actionLink='/login'
				secondaryText='Ir al inicio'
				secondaryLink='/'
			/>
		);
	}

	return (
		<AnimatePresence mode='wait'>
			{/* Contenedor principal con mejor control de overflow */}
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='px-2 py-4 sm:px-4 sm:py-6 md:p-8 max-w-full sm:max-w-7xl mx-auto overflow-hidden'>
				{/* Welcome Banner */}
				<motion.div variants={itemVariants} className='mb-6 sm:mb-8'>
					<WellcomeBanner userData={userData} />
				</motion.div>

				{/* Tab Navigation - mejor adaptado para móvil */}
				<motion.div variants={itemVariants} className='mb-4 sm:mb-6'>
					<div className='flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2'>
						<button
							onClick={() => handleTabChange('overview')}
							className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl whitespace-nowrap text-sm sm:text-base transition-all duration-300 mr-2 flex-shrink-0 ${
								activeTab === 'overview'
									? 'bg-gradient-to-r from-primary via-primary/90 to-secondary text-white font-medium shadow-md shadow-primary/20'
									: 'bg-white/5 hover:bg-white/10 text-light/70 hover:text-light backdrop-blur-sm'
							}`}>
							General
						</button>
						<button
							onClick={() => handleTabChange('orders')}
							className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl whitespace-nowrap text-sm sm:text-base transition-all duration-300 mr-2 flex-shrink-0 ${
								activeTab === 'orders'
									? 'bg-gradient-to-r from-primary via-primary/90 to-secondary text-white font-medium shadow-md shadow-primary/20'
									: 'bg-white/5 hover:bg-white/10 text-light/70 hover:text-light backdrop-blur-sm'
							}`}>
							Pedidos
						</button>
						<button
							onClick={() => handleTabChange('wishlist')}
							className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl whitespace-nowrap text-sm sm:text-base transition-all duration-300 mr-2 flex-shrink-0 ${
								activeTab === 'wishlist'
									? 'bg-gradient-to-r from-primary via-primary/90 to-secondary text-white font-medium shadow-md shadow-primary/20'
									: 'bg-white/5 hover:bg-white/10 text-light/70 hover:text-light backdrop-blur-sm'
							}`}>
							Deseos
						</button>
						<button
							onClick={() => handleTabChange('activity')}
							className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl whitespace-nowrap text-sm sm:text-base transition-all duration-300 flex-shrink-0 ${
								activeTab === 'activity'
									? 'bg-gradient-to-r from-primary via-primary/90 to-secondary text-white font-medium shadow-md shadow-primary/20'
									: 'bg-white/5 hover:bg-white/10 text-light/70 hover:text-light backdrop-blur-sm'
							}`}>
							Actividad
						</button>
					</div>
				</motion.div>

				{/* Tab Content - con mejor manejo de overflow */}
				<div className='w-full overflow-hidden'>
					<AnimatePresence mode='wait'>
						{activeTab === 'overview' && (
							<motion.div
								key='overview'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className='space-y-4 sm:space-y-6 w-full'>
								<AccountInformation />
							</motion.div>
						)}

						{activeTab === 'orders' && (
							<motion.div
								key='orders'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className='w-full'>
								<RecentOrder
									showHeader={false}
									limit={5}
									animated={true}
								/>
							</motion.div>
						)}

						{activeTab === 'wishlist' && (
							<motion.div
								key='wishlist'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className='w-full'>
								{/* <WishList
									isPreview={false}
									showMetrics={true}
								/> */}
							</motion.div>
						)}

						{activeTab === 'activity' && (
							<motion.div
								key='activity'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className='w-full'>
								<RecentActivity
									limit={10}
									showViewAll={false}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Footer espaciador para evitar que el contenido quede debajo de la navegación móvil */}
				<div className='h-16 md:hidden'></div>
			</motion.div>
		</AnimatePresence>
	);
}
