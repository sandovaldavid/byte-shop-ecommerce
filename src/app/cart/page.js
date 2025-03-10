'use client';
import React from 'react';
import Link from 'next/link';
import { Cart } from '@/components';
import { motion } from 'framer-motion';
import {
	AiOutlineShoppingCart,
	AiOutlineRight,
	AiOutlineArrowLeft,
	AiOutlineCreditCard,
	AiOutlineCheckCircle,
} from 'react-icons/ai';

function CartShop() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-dark/95 to-dark/90 py-8 md:py-16 px-4'>
			{/* Background ambient effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

			<div className='max-w-7xl mx-auto'>
				{/* Breadcrumb navigation */}
				<nav className='mb-8'>
					<ol className='flex items-center text-sm text-light/60'>
						<li>
							<Link
								href='/'
								className='hover:text-secondary transition-colors'>
								Inicio
							</Link>
						</li>
						<li className='flex items-center'>
							<span className='mx-2'>/</span>
							<span className='text-light/80'>
								Carrito de Compras
							</span>
						</li>
					</ol>
				</nav>

				{/* Checkout progress steps */}
				<div className='mb-10'>
					<div className='flex flex-col sm:flex-row items-center justify-center'>
						<div className='relative flex flex-col items-center'>
							<div className='w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-dark shadow-lg'>
								<AiOutlineShoppingCart className='text-xl' />
							</div>
							<span className='mt-2 text-light text-sm font-medium'>
								Carrito
							</span>
							<div className='hidden sm:block absolute top-6 left-full h-0.5 w-full max-w-[100px] bg-gradient-to-r from-secondary to-light/20'></div>
						</div>

						<div className='relative flex flex-col items-center mt-4 sm:mt-0 sm:ml-24'>
							<div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-light/50 border border-white/10'>
								<AiOutlineCreditCard className='text-xl' />
							</div>
							<span className='mt-2 text-light/50 text-sm font-medium'>
								Pago
							</span>
							<div className='hidden sm:block absolute top-6 left-full h-0.5 w-full max-w-[100px] bg-white/10'></div>
						</div>

						<div className='relative flex flex-col items-center mt-4 sm:mt-0 sm:ml-24'>
							<div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-light/50 border border-white/10'>
								<AiOutlineCheckCircle className='text-xl' />
							</div>
							<span className='mt-2 text-light/50 text-sm font-medium'>
								Confirmación
							</span>
						</div>
					</div>
				</div>

				{/* Title section with enhanced typography */}
				<div className='mb-10 text-center'>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent pb-2'>
						Tu Carrito de Compras
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='text-light/70 max-w-xl mx-auto'>
						Revisa y gestiona tus productos seleccionados antes de
						continuar con el proceso de compra
					</motion.p>

					{/* Decorative separator */}
					<div className='w-24 h-1 bg-gradient-to-r from-secondary to-accent1 rounded-full mx-auto mt-4'></div>
				</div>

				{/* Cart container with enhanced glassmorphism */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='bg-glass-dark backdrop-blur-md rounded-2xl border border-glass-border-dark shadow-glass-dark overflow-hidden'>
					{/* Cart component */}
					<div className='p-6 md:p-8'>
						<Cart />
					</div>

					{/* Action buttons */}
					<div className='border-t border-white/10 p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5'>
						<Link
							href='/products'
							className='flex items-center gap-2 text-light/70 hover:text-secondary transition-colors group'>
							<AiOutlineArrowLeft className='transform group-hover:-translate-x-1 transition-transform duration-300' />
							<span>Continuar comprando</span>
						</Link>

						<Link href='/checkout'>
							<button className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent1/20 flex items-center justify-center gap-2 group'>
								<span>Proceder al pago</span>
								<AiOutlineRight className='transform group-hover:translate-x-1 transition-transform duration-300' />
							</button>
						</Link>
					</div>
				</motion.div>

				{/* Additional information */}
				<div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex items-start gap-3'>
						<div className='w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<div>
							<h3 className='text-light font-medium mb-1'>
								Pago Seguro
							</h3>
							<p className='text-light/60 text-sm'>
								Todas las transacciones están protegidas con
								encriptación SSL
							</p>
						</div>
					</div>

					<div className='bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex items-start gap-3'>
						<div className='w-10 h-10 rounded-full bg-accent1/10 flex items-center justify-center text-accent1 flex-shrink-0'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
								<path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1H6V4h7v5h2V5a1 1 0 00-1-1H3zM14 7h1.05a2.5 2.5 0 014.9 0H20a1 1 0 011 1v1h-7V7z' />
							</svg>
						</div>
						<div>
							<h3 className='text-light font-medium mb-1'>
								Envío Gratis
							</h3>
							<p className='text-light/60 text-sm'>
								En pedidos superiores a $999 a todo el país
							</p>
						</div>
					</div>

					<div className='bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 flex items-start gap-3'>
						<div className='w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success flex-shrink-0'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						<div>
							<h3 className='text-light font-medium mb-1'>
								Ayuda 24/7
							</h3>
							<p className='text-light/60 text-sm'>
								Soporte disponible todos los días, en cualquier
								momento
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartShop;
