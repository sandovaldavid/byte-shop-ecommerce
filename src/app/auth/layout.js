'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
	// Configuración de animaciones
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				duration: 0.6,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
	};

	return (
		<motion.div
			className='min-h-screen bg-dark relative overflow-hidden flex flex-col justify-between'
			initial='hidden'
			animate='visible'
			variants={containerVariants}>

			{/* Navegación mejorada */}
			<motion.nav
				className='relative z-10 px-4 sm:px-6 py-4 sm:py-4'
				variants={itemVariants}>
				<div className='max-w-7xl mx-auto flex flex-wrap justify-between items-center'>
					<Link
						href='/'
						className='flex items-center gap-2 group py-2'>
						<div className='w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent1 flex items-center justify-center text-light shadow-lg shadow-accent1/20'>
							<span className='font-bold text-lg'>T</span>
						</div>
						<span className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent group-hover:from-accent1 group-hover:to-secondary transition-all duration-300'>
							TechStore
						</span>
					</Link>

					<Link
						href='/'
						className='flex items-center gap-2 px-4 py-2 rounded-lg text-light/80 hover:text-light hover:bg-white/5 transition-all duration-200 border border-white/5'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-4 h-4'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
						<span>Volver a la tienda</span>
					</Link>
				</div>
			</motion.nav>

			{/* Main content con mejor espaciado */}
			<motion.main
				className='relative z-10 flex-1 flex flex-col items-center justify-center'
				variants={itemVariants}>
				{children}
			</motion.main>

			{/* Footer mejorado */}
			<motion.footer
				className='relative z-10 text-center py-6 text-light/50 text-sm'
				variants={itemVariants}>
				<div className='max-w-7xl mx-auto px-4 sm:px-6'>
					<div className='h-px w-full bg-gradient-to-r from-transparent via-light/10 to-transparent mb-6'></div>

					<div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6'>
						<span>
							© 2024 TechStore. Todos los derechos reservados.
						</span>
						<div className='flex items-center gap-4'>
							<Link
								href='/terms'
								className='text-light/60 hover:text-secondary transition-colors'>
								Términos
							</Link>
							<Link
								href='/privacy'
								className='text-light/60 hover:text-secondary transition-colors'>
								Privacidad
							</Link>
						</div>
					</div>
				</div>
			</motion.footer>

			{/* Efecto de brillo adicional */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 bg-gradient-to-br from-accent2/5 to-accent1/5 blur-3xl rounded-full pointer-events-none'></div>
		</motion.div>
	);
}
