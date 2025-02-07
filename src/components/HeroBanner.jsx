import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
	return (
		<div className='relative h-[600px] w-full overflow-hidden bg-gradient-to-tr from-dark/95 via-primary/30 to-accent2/20 dark:from-dark/98 dark:via-primary/20 dark:to-accent2/10'>
			{/* Capa de efecto cristal - Ajustada para ambos modos */}
			<div className='absolute inset-0 bg-dark/30 dark:bg-dark/50 backdrop-blur-sm'></div>

			{/* Grid pattern con contraste adaptativo */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.07)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>

			{/* Efectos de luz adaptados */}
			<div className='absolute top-20 right-20 w-72 h-72 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-10 left-10 w-96 h-96 bg-accent1/20 dark:bg-accent1/10 rounded-full blur-3xl animate-pulse-slow'></div>

			<div className='relative z-10 flex h-full items-center justify-between px-10 xl:px-20'>
				<div className='space-y-8 max-w-2xl'>
					{/* Título pequeño con contraste mejorado */}
					<h3 className='text-secondary dark:text-secondary/90 font-medium animate-fade-right tracking-wider bg-dark/20 dark:bg-dark/40 py-1 px-3 rounded-lg inline-block backdrop-blur-sm border border-white/10'>
						{heroBanner?.smallText || 'NUEVA TECNOLOGÍA'}
					</h3>

					{/* Título principal con gradiente adaptativo */}
					<h1 className='text-6xl lg:text-8xl font-bold bg-gradient-to-r from-light via-secondary to-accent1 dark:from-light dark:via-secondary dark:to-accent1 bg-clip-text text-transparent animate-fade-right [animation-delay:200ms] leading-tight'>
						{heroBanner?.largeText1 || 'El Futuro Es Ahora'}
					</h1>

					{/* Subtítulo con contraste adaptativo */}
					<h2 className='text-2xl lg:text-4xl text-accent1 dark:text-accent1/90 font-semibold animate-fade-right [animation-delay:400ms] tracking-tight drop-shadow-lg'>
						{heroBanner?.midText || 'Descubre lo Último en Tech'}
					</h2>

					{/* Descripción con legibilidad mejorada */}
					<p className='text-light/90 dark:text-light/80 text-lg max-w-lg animate-fade-right [animation-delay:600ms] leading-relaxed bg-dark/10 dark:bg-dark/30 p-4 rounded-lg backdrop-blur-sm border border-white/10'>
						{heroBanner?.desc ||
							'Explora nuestra colección de productos tecnológicos de última generación.'}
					</p>

					{/* Botones con contraste adaptativo */}
					<div className='flex gap-4 animate-fade-right [animation-delay:800ms]'>
						<Link href={`/product/${heroBanner?.product || ''}`}>
							<button className='group relative px-8 py-4 bg-gradient-to-r from-accent1 to-accent2 dark:from-accent1 dark:to-accent2 text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/20 hover:shadow-accent2/40 overflow-hidden border border-white/10'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{heroBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/products'>
							<button className='px-8 py-4 bg-light/10 hover:bg-light/20 dark:bg-dark/60 dark:hover:bg-dark/80 text-light font-medium rounded-xl transition-all duration-300 backdrop-blur-md border border-secondary/20 hover:border-secondary/50 shadow-lg shadow-dark/5 hover:shadow-dark/10 dark:shadow-black/5 dark:hover:shadow-black/10'>
								Explorar Más
							</button>
						</Link>
					</div>
				</div>

				<div className='hidden lg:block w-1/3 h-full relative'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='relative w-[90%] h-[90%]'>
							<div className='absolute inset-0 bg-gradient-to-r from-secondary/30 to-accent1/30 dark:from-secondary/20 dark:to-accent1/20 rounded-full blur-3xl animate-pulse-slow'></div>
							<Image
								src={
									urlFor(heroBanner?.image).url() ||
									'https://placehold.co/600x400'
								}
								alt={heroBanner?.smallText || 'Nuevo Producto'}
								fill
								className='object-contain transform hover:scale-105 transition-transform duration-700 z-10'
								priority
							/>
							<div className='absolute -inset-4 border border-white/20 dark:border-white/10 rounded-full animate-spin-slow'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
