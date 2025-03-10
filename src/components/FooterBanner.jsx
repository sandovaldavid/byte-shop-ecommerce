import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function FooterBanner({ footerBanner }) {
	return (
		<div className='relative min-h-[500px] w-full overflow-hidden mt-16'>
			{/* Background Effects */}
			<div className='absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-dark/95 z-0'></div>
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none'></div>

			{/* Ambient light effects */}
			<div className='absolute top-0 left-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-secondary/10 rounded-full filter blur-3xl opacity-40 animate-pulse-slow'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-accent1/10 rounded-full filter blur-3xl opacity-40 animate-pulse-slow'></div>

			{/* Main content with better positioning */}
			<div className='relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 md:px-8 py-16 max-w-7xl mx-auto gap-10'>
				{/* Left section with improved typography and spacing */}
				<div className='flex-1 space-y-8 text-center lg:text-left relative'>
					{/* Tech line effect */}
					<div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-secondary via-accent1 to-transparent hidden lg:block'></div>

					{/* Heading with improved gradient */}
					<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 bg-clip-text text-transparent drop-shadow-xl'>
						{footerBanner?.largeText1 || 'Descubre el Futuro'}
					</h2>

					{/* Description with better layout and backdrop */}
					<p className='text-light/90 text-base md:text-lg max-w-xl mx-auto lg:mx-0 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/5 shadow-lg leading-relaxed'>
						{footerBanner?.desc ||
							'Obtén hasta 30% de descuento en productos seleccionados. Tecnología de última generación a precios increíbles.'}
					</p>

					{/* CTA buttons with improved design */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2'>
						<Link
							href={footerBanner?.buttonLink || '/products'}
							className='w-full sm:w-auto'>
							<button className='group relative w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-accent1 via-accent2 to-accent1 bg-[length:200%_100%] animate-gradient text-light rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-accent1/20 overflow-hidden border border-white/10'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{footerBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/contact' className='w-full sm:w-auto'>
							<button className='w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-light font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-secondary/40 hover:-translate-y-1 hover:shadow-lg'>
								Contactar
							</button>
						</Link>
					</div>
				</div>

				{/* Right section - Features with improved card design */}
				<div className='w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0'>
					{[
						{
							title: 'Envío Gratis',
							desc: 'En compras mayores a $999',
							icon: '🚚',
							gradient: 'from-accent2 to-accent1/30',
						},
						{
							title: 'Pago Seguro',
							desc: 'Transacciones 100% seguras',
							icon: '🔒',
							gradient: 'from-accent1 to-accent2',
						},
						{
							title: 'Mejor Precio',
							desc: 'Garantía de precio más bajo',
							icon: '💰',
							gradient: 'from-primary to-secondary',
						},
						{
							title: 'Soporte 24/7',
							desc: 'Asistencia técnica disponible',
							icon: '🎮',
							gradient: 'from-accent2 to-primary',
						},
					].map((feature) => (
						<div
							key={feature.title}
							className='group relative p-4 md:p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/10 h-full'>
							<div className='text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300'>
								{feature.icon}
							</div>
							<h3
								className={`bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent font-medium text-lg mb-1`}>
								{feature.title}
							</h3>
							<p className='text-light/70 text-sm'>
								{feature.desc}
							</p>
							<div className='absolute inset-0 border border-white/5 rounded-xl group-hover:border-secondary/30 transition-colors duration-300'></div>
						</div>
					))}
				</div>
			</div>

			{/* Enhanced overlay effect */}
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]'></div>
		</div>
	);
}

export default FooterBanner;
