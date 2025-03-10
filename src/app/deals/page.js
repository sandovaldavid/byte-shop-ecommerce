'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
	AiOutlineThunderbolt,
	AiOutlineClockCircle,
	AiOutlineFire,
	AiOutlineFilter,
	AiOutlineTag,
	AiOutlineStar,
} from 'react-icons/ai';

const deals = [
	{
		id: 1,
		name: 'Samsung Galaxy S23 Ultra',
		description:
			'El último flagship de Samsung con un increíble sistema de cámaras',
		originalPrice: 1299.99,
		discountPrice: 999.99,
		discount: 23,
		image: '/products/galaxy-s23.jpg',
		endDate: '2024-03-01',
		category: 'smartphones',
		stock: 10,
		featured: true,
		rating: 4.9,
	},
	// Agregar más ofertas aquí
];

function DealsPage() {
	const [timeLeft, setTimeLeft] = useState({});
	const [activeFilter, setActiveFilter] = useState('all');
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// Calcular tiempo restante para las ofertas
	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = new Date();
			const targetDate = new Date('2024-03-01');
			const difference = targetDate - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / (1000 * 60)) % 60),
				});
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 60000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className='min-h-screen bg-gradient-to-b from-dark/95 to-dark/90 dark:from-dark/98 dark:to-dark/95'>
			{/* Background effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

			{/* Hero Section - Enhanced with better visual hierarchy */}
			<div className='relative overflow-hidden py-16 md:py-24 border-b border-white/5'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent2/5 to-accent1/10 opacity-60'></div>

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center max-w-3xl mx-auto'>
						{/* Icon with animated effect */}
						<div className='inline-block relative mb-5'>
							<div className='text-4xl text-accent1 animate-pulse-slow'>
								<AiOutlineFire />
							</div>
							<div className='absolute -inset-4 bg-accent1/10 rounded-full blur-xl -z-10'></div>
						</div>

						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 bg-clip-text text-transparent pb-3'>
							Ofertas Especiales
						</h1>

						<p className='text-light/70 text-lg md:text-xl max-w-2xl mx-auto mt-4'>
							Descubre increíbles descuentos en productos
							tecnológicos seleccionados por tiempo limitado
						</p>

						{/* Stats and info */}
						<div className='flex flex-wrap justify-center gap-4 mt-10'>
							<div className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
								<div className='w-3 h-3 rounded-full bg-secondary'></div>
								<span className='text-light/70'>
									Hasta 50% descuento
								</span>
							</div>

							<div className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
								<div className='w-3 h-3 rounded-full bg-accent1 animate-pulse'></div>
								<span className='text-light/70'>
									{deals.length}+ ofertas activas
								</span>
							</div>

							<div className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
								<div className='w-3 h-3 rounded-full bg-success'></div>
								<span className='text-light/70'>
									Envío gratuito
								</span>
							</div>
						</div>

						{/* CTA Button */}
						<div className='mt-10'>
							<Link
								href='#deals'
								className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent1/20 transform hover:-translate-y-1'>
								<AiOutlineThunderbolt className='text-xl' />
								<span>Ver todas las ofertas</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main content area */}
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Featured deal banner - Enhanced with glassmorphism */}
				<div className='relative overflow-hidden rounded-2xl bg-glass-dark backdrop-blur-md border border-glass-border-dark mb-12'>
					<div className='absolute top-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3'></div>
					<div className='absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3'></div>

					<div className='relative z-10 flex flex-col md:flex-row items-center p-8 md:p-10 gap-8'>
						<div className='md:w-1/2 space-y-6'>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className='text-center lg:text-left space-y-6'>
								<div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10'>
									<AiOutlineFire className='text-accent1 animate-pulse' />
									<span className='text-light/90 font-medium'>
										Oferta destacada
									</span>
								</div>

								<h2 className='text-3xl md:text-4xl font-bold text-light'>
									Ahorra{' '}
									<span className='bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
										hasta 50%
									</span>{' '}
									en productos seleccionados
								</h2>

								<p className='text-light/70'>
									Productos de última tecnología con grandes
									descuentos por tiempo limitado. ¡No te los
									pierdas!
								</p>

								{/* Countdown timer */}
								<div className='inline-flex gap-4 bg-dark/50 backdrop-blur-md p-4 rounded-xl border border-white/5'>
									{timeLeft.days !== undefined && (
										<>
											<div className='text-center'>
												<div className='text-2xl md:text-3xl font-bold text-light'>
													{timeLeft.days}
												</div>
												<div className='text-xs text-light/50'>
													Días
												</div>
											</div>
											<div className='text-2xl font-light text-light/30'>
												:
											</div>
											<div className='text-center'>
												<div className='text-2xl md:text-3xl font-bold text-light'>
													{timeLeft.hours}
												</div>
												<div className='text-xs text-light/50'>
													Horas
												</div>
											</div>
											<div className='text-2xl font-light text-light/30'>
												:
											</div>
											<div className='text-center'>
												<div className='text-2xl md:text-3xl font-bold text-light'>
													{timeLeft.minutes}
												</div>
												<div className='text-xs text-light/50'>
													Minutos
												</div>
											</div>
										</>
									)}
								</div>

								<div>
									<Link
										href='#deals'
										className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent1/20 transform hover:-translate-y-1'>
										<AiOutlineTag />
										<span>Ver oferta</span>
									</Link>
								</div>
							</motion.div>
						</div>

						<div className='md:w-1/2 relative h-52 md:h-80 w-full md:max-w-sm'>
							<div className='absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent1/20 rounded-xl'></div>
							<Image
								src='/products/galaxy-s23.jpg'
								alt='Featured Deal'
								fill
								className='object-contain p-6'
							/>
						</div>
					</div>
				</div>

				{/* Filter and category section */}
				<div id='deals' className='mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					<h2 className='text-2xl md:text-3xl font-bold text-light'>
						Ofertas disponibles{' '}
						<span className='text-secondary'>({deals.length})</span>
					</h2>

					<div className='flex flex-wrap gap-3 relative'>
						{/* Mobile filter button */}
						<button
							className='md:hidden flex items-center gap-2 bg-white/5 hover:bg-white/10 text-light/80 rounded-lg px-4 py-2 transition-all duration-300'
							onClick={() => setIsFilterOpen(!isFilterOpen)}>
							<AiOutlineFilter />
							<span>
								{isFilterOpen ? 'Ocultar filtros' : 'Filtrar'}
							</span>
						</button>

						{/* Filter options - Desktop or mobile expanded */}
						<div
							className={`flex flex-wrap gap-2 ${isFilterOpen ? 'block w-full' : 'hidden md:flex'}`}>
							{[
								'all',
								'smartphones',
								'laptops',
								'audio',
								'gaming',
							].map((filter) => (
								<button
									key={filter}
									onClick={() => setActiveFilter(filter)}
									className={`px-4 py-2 rounded-lg transition-all duration-300 ${
										activeFilter === filter
											? 'bg-secondary text-dark font-medium'
											: 'bg-white/5 text-light/70 hover:bg-white/10'
									}`}>
									{filter === 'all'
										? 'Todos'
										: filter.charAt(0).toUpperCase() +
											filter.slice(1)}
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Grid of deals - Enhanced with animations and better cards */}
				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
					{deals.map((deal, index) => (
						<motion.div
							key={deal.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.1 }}>
							<div className='group h-full'>
								<Link
									href={`/products/${deal.category}/${deal.id}`}
									className='h-full rounded-2xl bg-glass-dark backdrop-blur-md border border-glass-border-dark overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-accent1/10 flex flex-col'>
									{/* Image section */}
									<div className='relative aspect-square w-full overflow-hidden'>
										{/* Discount badge */}
										<div className='absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-accent1 to-accent2 px-3 py-1 text-xs font-medium text-light shadow-lg shadow-accent1/20 flex items-center justify-center'>
											<span className='animate-pulse'>
												-{deal.discount}%
											</span>
										</div>

										{/* Rating badge */}
										<div className='absolute top-3 right-3 z-10 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-light/90 flex items-center gap-1 border border-white/10'>
											<AiOutlineStar className='text-secondary' />
											<span>{deal.rating}</span>
										</div>

										{/* Background gradient */}
										<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-accent2/5'></div>

										{/* Product image */}
										<Image
											src={deal.image}
											alt={deal.name}
											fill
											sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
											className='object-cover transition-all duration-500 group-hover:scale-110 p-6'
										/>

										{/* Hover overlay */}
										<div className='absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'></div>

										{/* View details button */}
										<div className='absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
											<div className='bg-gradient-to-r from-accent1/90 to-accent2/90 backdrop-blur-sm text-center py-2.5 rounded-lg text-light text-sm font-medium shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200'>
												Ver Detalles
											</div>
										</div>
									</div>

									{/* Content section */}
									<div className='p-5 flex-grow flex flex-col'>
										<h3 className='font-medium text-xl text-light group-hover:text-secondary transition-colors duration-300 mb-2'>
											{deal.name}
										</h3>

										<p className='text-light/60 text-sm line-clamp-2 mb-4'>
											{deal.description}
										</p>

										<div className='mt-auto space-y-4'>
											{/* Price section */}
											<div className='flex items-baseline gap-3'>
												<span className='text-xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
													${deal.discountPrice}
												</span>
												<span className='text-light/40 line-through text-sm'>
													${deal.originalPrice}
												</span>
											</div>

											{/* Stock and time info */}
											<div className='flex items-center justify-between text-xs border-t border-white/5 pt-3'>
												<span className='text-light/50'>
													Stock: {deal.stock} unidades
												</span>
												<div className='flex items-center gap-1 text-secondary'>
													<AiOutlineClockCircle />
													<span>
														Termina en{' '}
														{timeLeft.days} días
													</span>
												</div>
											</div>
										</div>
									</div>
								</Link>
							</div>
						</motion.div>
					))}
				</div>

				{/* Newsletter section */}
				<div className='mt-20 pt-10 border-t border-white/5'>
					<div className='bg-glass-dark backdrop-blur-md rounded-2xl border border-glass-border-dark p-8 md:p-10'>
						<div className='max-w-3xl mx-auto text-center'>
							<h3 className='text-2xl md:text-3xl font-bold text-light mb-4'>
								¿Quieres recibir{' '}
								<span className='text-secondary'>
									ofertas exclusivas
								</span>
								?
							</h3>
							<p className='text-light/70 mb-8'>
								Suscríbete a nuestro newsletter y recibe alertas
								de descuentos exclusivos antes que nadie.
							</p>

							<form className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
								<input
									type='email'
									placeholder='Tu email'
									className='flex-grow px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary/50 focus:outline-none text-light placeholder:text-light/30 transition-colors duration-300'
									required
								/>
								<button
									type='submit'
									className='px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent1/20'>
									Suscribirme
								</button>
							</form>

							<p className='text-light/40 text-xs mt-4'>
								Nunca compartiremos tu información. Puedes darte
								de baja en cualquier momento.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DealsPage;
