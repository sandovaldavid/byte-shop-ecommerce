import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
	return (
		<div className='relative min-h-[500px] md:h-[600px] w-full overflow-hidden bg-gradient-to-tr from-dark/95 via-primary/30 to-accent2/20 dark:from-dark/98 dark:via-primary/20 dark:to-accent2/10'>
			{/* Base effects */}
			<div className='absolute inset-0 bg-dark/30 dark:bg-dark/50 backdrop-blur-sm'></div>

			{/* Grid pattern */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(45,58,254,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>

			{/* Ambient light effects */}
			<div className='absolute top-1/4 -right-20 md:right-20 w-60 md:w-72 h-60 md:h-72 bg-secondary/20 dark:bg-secondary/15 rounded-full blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-10 -left-20 md:left-10 w-72 md:w-96 h-72 md:h-96 bg-accent1/20 dark:bg-accent1/15 rounded-full blur-3xl animate-pulse-slow'></div>

			{/* Main content wrapper */}
			<div className='relative z-10 flex flex-col lg:flex-row h-full items-center justify-between px-6 sm:px-10 xl:px-20 py-12 md:py-0 gap-10 lg:gap-5'>
				{/* Text content */}
				<div className='space-y-4 md:space-y-6 max-w-2xl relative transform perspective-1000 text-center lg:text-left'>
					{/* Category tag */}
					<div className='flex justify-center lg:justify-start'>
						<h3 className='text-secondary dark:text-secondary font-medium animate-fade-up tracking-wider bg-dark/30 dark:bg-dark/50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg inline-block backdrop-blur-md border border-white/20 shadow-lg hover:shadow-secondary/20 transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base'>
							{heroBanner?.smallText || 'NUEVA TECNOLOGÍA'}
						</h3>
					</div>

					{/* Main headline */}
					<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-light via-secondary to-accent1 dark:from-light/90 dark:via-secondary dark:to-accent1 bg-clip-text text-transparent animate-fade-up [animation-delay:100ms] leading-tight drop-shadow-2xl transform hover:-translate-y-1 transition-transform duration-300'>
						{heroBanner?.largeText1 || 'El Futuro Es Ahora'}
					</h1>

					{/* Subheading */}
					<h2 className='text-xl sm:text-2xl lg:text-3xl text-accent1 dark:text-accent1/90 font-semibold animate-fade-up [animation-delay:200ms] tracking-tight drop-shadow-xl transform hover:-translate-y-0.5 transition-transform duration-300'>
						{heroBanner?.midText || 'Descubre lo Último en Tech'}
					</h2>

					{/* Description */}
					<p className='text-light/90 dark:text-light/80 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 animate-fade-up [animation-delay:300ms] leading-relaxed bg-dark/20 dark:bg-dark/30 p-4 sm:p-6 rounded-xl backdrop-blur-md border border-white/10 shadow-xl hover:shadow-accent1/5 transition-all duration-300'>
						{heroBanner?.desc ||
							'Explora nuestra colección de productos tecnológicos de última generación.'}
					</p>

					{/* CTAs */}
					<div className='flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-up [animation-delay:400ms] pt-2'>
						<Link
							href={`/product/${heroBanner?.product || ''}`}
							className='w-full sm:w-auto'>
							<button className='group relative w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-accent1/20 overflow-hidden border border-white/20'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{heroBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/products' className='w-full sm:w-auto'>
							<button className='w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/5 hover:bg-white/10 dark:bg-dark/50 dark:hover:bg-dark/70 text-light font-medium rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-secondary/40 hover:-translate-y-1 hover:shadow-lg'>
								Explorar Más
							</button>
						</Link>
					</div>
				</div>

				{/* Product image */}
				<div className='w-full max-w-xs sm:max-w-sm lg:w-1/3 lg:max-w-none h-60 sm:h-72 md:h-80 lg:h-full relative perspective-1000'>
					<div className='absolute inset-0 flex items-center justify-center transform hover:-translate-y-2 transition-transform duration-500'>
						<div className='relative w-full h-full lg:w-[90%] lg:h-[90%] group'>
							{/* Background glow effect */}
							<div className='absolute inset-0 bg-gradient-to-r from-secondary/30 to-accent1/30 dark:from-secondary/20 dark:to-accent1/20 rounded-full blur-3xl animate-pulse-slow'></div>

							{/* Image container */}
							<div className='relative w-full h-full flex items-center justify-center'>
								<div className='w-full h-full max-w-[280px] max-h-[280px] sm:max-w-[320px] sm:max-h-[320px] md:max-w-none md:max-h-none relative'>
									<Image
										src={
											urlFor(heroBanner?.image).url() ||
											'https://placehold.co/600x400'
										}
										alt={
											heroBanner?.smallText ||
											'Nuevo Producto'
										}
										fill
										className='object-contain transform group-hover:scale-105 transition-transform duration-700 z-10'
										sizes='(max-width: 640px) 280px, (max-width: 768px) 320px, 500px'
										priority
									/>
								</div>
							</div>

							{/* Decorative elements - optimized for performance */}
							<div className='absolute -inset-2 md:-inset-4 border border-white/20 dark:border-white/10 rounded-full animate-spin-slow'></div>
							<div className='absolute inset-0 bg-gradient-to-tr from-secondary/5 to-accent1/5 dark:from-secondary/3 dark:to-accent1/3 rounded-full filter blur-md'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
