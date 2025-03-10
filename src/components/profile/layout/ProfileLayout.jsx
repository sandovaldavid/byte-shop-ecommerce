'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';
import MobileProfileNavigation from './MobileProfileNavigation';
import Loading from '@/components/Loading';

const ProfileLayout = ({
	children,
	user = {
		name: 'Usuario TechStore',
		email: 'usuario@techstore.com',
		avatar: null,
		stats: { orders: 5, wishlist: 3, reviews: 2 },
	},
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const [pageTitle, setPageTitle] = useState('Mi Perfil');
	const [mounted, setMounted] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);

	// Usar useRef para almacenar la ruta anterior para comparación
	const prevPathRef = useRef(pathname);

	// Agregar un key único para forzar la re-renderización del componente hijo
	const [contentKey, setContentKey] = useState(`${pathname}-${Date.now()}`);

	// Handle hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Track scroll position for effects
	useEffect(() => {
		const handleScroll = () => {
			const position = window.scrollY;
			setScrollPosition(position);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Determine page title based on route
	useEffect(() => {
		if (pathname === '/profile') {
			setPageTitle('Mi Perfil');
		} else if (pathname?.includes('/orders')) {
			setPageTitle('Mis Pedidos');
		} else if (pathname?.includes('/wishlist')) {
			setPageTitle('Lista de Deseos');
		} else if (pathname?.includes('/addresses')) {
			setPageTitle('Mis Direcciones');
		} else if (pathname?.includes('/payments')) {
			setPageTitle('Métodos de Pago');
		} else if (pathname?.includes('/notifications')) {
			setPageTitle('Notificaciones');
		} else if (pathname?.includes('/settings')) {
			setPageTitle('Configuración');
		}
	}, [pathname]);

	// Actualizar contentKey cuando cambia la ruta - esto es crítico
	useEffect(() => {
		// Verificar si realmente cambió la ruta
		if (pathname !== prevPathRef.current) {
			prevPathRef.current = pathname;
			// Generar una key única basada en la ruta y un timestamp
			setContentKey(`${pathname}-${Date.now()}`);
		}
	}, [pathname]);

	// Close mobile sidebar on route change
	useEffect(() => {
		setIsMobileSidebarOpen(false);
	}, [pathname]);

	// Handle search
	const handleSearch = (query) => {
		console.log('Búsqueda:', query);
		// Implement search logic
	};

	// Handle notifications click
	const handleNotificationsClick = () => {
		console.log('Notificaciones clickeadas');
		// Implement notifications logic
	};

	// Handle logout
	const handleLogout = () => {
		console.log('Logout');
		// Implement logout logic
	};

	const handleNavigation = useCallback(
		(href) => {
			if (pathname === href) return;
			router.push(href);
		},
		[pathname, router]
	);
	// Animation variants
	const contentVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
			},
		},
	};

	const childVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	// Mostrar un estado de carga inicial antes del montaje
	if (!mounted) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loading />
			</div>
		);
	}

	return (
		<div className='bg-dark text-light relative overflow-hidden flex flex-col'>
			{/* Ambient Background Elements */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none'></div>

			<div className='fixed -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tl from-accent1/5 to-transparent rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed top-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-to-tr from-secondary/5 to-transparent rounded-full filter blur-2xl opacity-40 pointer-events-none'></div>

			{/* Header */}
			<div
				className={`sticky top-0 z-[70] transition-all duration-300 ${scrollPosition > 20 ? 'shadow-lg shadow-dark/10' : ''}`}>
				<ProfileHeader
					user={user}
					pageTitle={pageTitle}
					notifications={3}
					onSearch={handleSearch}
					onNotificationsClick={handleNotificationsClick}
					onMobileMenuToggle={() =>
						setIsMobileSidebarOpen(!isMobileSidebarOpen)
					}
					onNavigate={handleNavigation}
				/>
			</div>

			{/* Main Layout */}
			<div className='flex-1 flex'>
				{/* Desktop Sidebar */}
				<aside className='hidden md:block w-0 md:w-72 lg:w-80 flex-shrink-0 sticky top-[73px] self-start h-[calc(100vh-73px)] z-40'>
					<div className='h-full overflow-hidden hover:overflow-y-auto scrollbar-none pr-2'>
						<ProfileSidebar
							user={user}
							className='h-full'
							onLogout={handleLogout}
							onClose={() => {}}
							onNavigate={handleNavigation}
						/>
					</div>
				</aside>

				{/* Mobile Sidebar Overlay */}
				<AnimatePresence>
					{isMobileSidebarOpen && (
						<>
							<motion.div
								className='fixed inset-0 bg-dark/80 backdrop-blur-sm z-[60] md:hidden'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								onClick={() => setIsMobileSidebarOpen(false)}
							/>

							<motion.div
								className='fixed inset-y-0 left-0 w-72 z-[70] md:hidden'
								initial={{ x: '-100%' }}
								animate={{ x: 0 }}
								exit={{ x: '-100%' }}
								transition={{
									type: 'spring',
									damping: 25,
									stiffness: 300,
								}}>
								<ProfileSidebar
									user={user}
									className='h-full'
									onLogout={handleLogout}
									onClose={() =>
										setIsMobileSidebarOpen(false)
									}
									onNavigate={handleNavigation}
								/>
							</motion.div>
						</>
					)}
				</AnimatePresence>

				{/* Main Content Area */}
				<motion.main
					className='flex-1 px-4 sm:px-6 md:px-8 pb-24 md:pb-10'
					variants={contentVariants}
					initial='hidden'
					animate='visible'
					key={contentKey}>
					{/* Mobile Page Title */}
					<motion.div
						variants={childVariants}
						className='md:hidden py-4 flex items-center justify-between'>
						<div>
							<h1 className='text-2xl font-bold text-light'>
								{pageTitle}
							</h1>
							<div className='h-1 w-16 bg-gradient-to-r from-secondary to-accent1 rounded-full mt-1'></div>
						</div>
						<button
							onClick={() => setIsMobileSidebarOpen(true)}
							className='p-2.5 rounded-xl bg-white/5 border border-white/10 text-light hover:bg-white/10 transition-all hover:border-secondary/40'
							aria-label='Open menu'>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16m-7 6h7'
								/>
							</svg>
						</button>
					</motion.div>

					{/* Main Content Card */}
					<motion.div
						variants={childVariants}
						className='bg-glass-dark backdrop-blur-lg border border-glass-border-dark shadow-glass-dark rounded-2xl overflow-hidden transition-all duration-300'>
						<div className='relative p-0'>
							{/* Content Gradient Overlay */}
							<div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary/30 via-accent1/30 to-accent2/30 opacity-70'></div>

							{/* Actual Content */}
							<div className='h-full'>{children}</div>
						</div>
					</motion.div>

					{/* Footer */}
					<motion.div
						variants={childVariants}
						className='mt-6 text-center text-xs text-light/30 py-4'>
						<p className='mb-1'>
							© 2024 TechStore. Todos los derechos reservados.
						</p>
						<div className='flex justify-center gap-4'>
							<Link
								href='/terms'
								className='hover:text-secondary transition-colors'>
								Términos
							</Link>
							<Link
								href='/privacy'
								className='hover:text-secondary transition-colors'>
								Privacidad
							</Link>
							<Link
								href='/support'
								className='hover:text-secondary transition-colors'>
								Ayuda
							</Link>
						</div>
					</motion.div>
				</motion.main>
			</div>

			{/* Mobile Navigation */}
			<div className='md:hidden z-[70]'>
				<MobileProfileNavigation
					onLogout={handleLogout}
					onNavigate={handleNavigation}
				/>
			</div>

			{/* Quick Action Button */}
			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className={`fixed right-4 bottom-20 md:right-6 md:bottom-6 w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-accent1 text-light flex items-center justify-center shadow-lg shadow-accent1/20 z-[45] transition-all duration-300 transform ${
					scrollPosition > 300
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-10 pointer-events-none'
				}`}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		</div>
	);
};

export default ProfileLayout;
