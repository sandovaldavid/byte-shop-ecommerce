'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BiArrowToTop } from 'react-icons/bi';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
	const pathname = usePathname();
	const isAuthPage = pathname?.startsWith('/auth');
	const isProfile = pathname?.startsWith('/profile');
	const isProductPage =
		pathname?.includes('/products/') && !pathname?.endsWith('/products/');
	const [showScrollTop, setShowScrollTop] = useState(false);

	// Controlar cuándo mostrar el botón de volver arriba
	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 500);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Función para desplazarse suavemente hacia arriba
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='flex flex-col min-h-screen w-full bg-gradient-to-b from-background/95 to-background'>
			{/* Skip to content link for accessibility */}
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-secondary focus:text-dark focus:p-4 focus:m-4 focus:rounded-md'>
				Saltar al contenido
			</a>

			{/* Background patterns and ambient effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

			{/* Header with Navbar */}
			{!isAuthPage && !isProfile && (
				<header className='sticky top-0 z-30 w-full'>
					<Navbar />
				</header>
			)}

			{/* Main content with page transitions */}
			<main
				id='main-content'
				className={`flex-grow w-full ${!isAuthPage && !isProfile ? ' pt-6' : ''} relative z-20`}>
				<AnimatePresence mode='wait'>
					<motion.div
						key={pathname}
						className={`w-full h-full ${isProductPage ? 'min-h-[100vh]' : ''}`}>
						{children}
					</motion.div>
				</AnimatePresence>
			</main>

			{/* Footer */}
			{!isAuthPage && !isProfile && (
				<footer className='relative z-10 w-full mt-auto'>
					<Footer />
				</footer>
			)}

			{/* Back to top button */}
			<AnimatePresence>
				{showScrollTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						onClick={scrollToTop}
						className='fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-accent1 to-accent2 text-light
              shadow-lg shadow-accent1/20 hover:shadow-accent2/30 transition-all duration-300
              transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent1/50'
						aria-label='Volver al inicio'>
						<BiArrowToTop size={24} />
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
}

export default Layout;
