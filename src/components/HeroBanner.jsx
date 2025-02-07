import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
	return (
		<div className='relative h-[600px] w-full overflow-hidden bg-gradient-to-tr from-dark/95 via-primary/30 to-accent2/20 dark:from-dark/98 dark:via-primary/20 dark:to-accent2/10'>
			{/* Efecto de profundidad base */}
			<div className='absolute inset-0 bg-dark/40 dark:bg-dark/60 backdrop-blur-sm'></div>

			{/* Grid pattern mejorado */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(45,58,254,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>

			{/* Efectos de luz con profundidad */}
			<div className='absolute top-20 right-20 w-72 h-72 bg-secondary/30 dark:bg-secondary/20 rounded-full blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-10 left-10 w-96 h-96 bg-accent1/30 dark:bg-accent1/20 rounded-full blur-3xl animate-pulse-slow'></div>

			<div className='relative z-10 flex h-full items-center justify-between px-10 xl:px-20'>
				{/* Contenido principal con efecto 3D */}
				<div className='space-y-8 max-w-2xl relative transform perspective-1000'>
					<h3 className='text-secondary dark:text-secondary font-medium animate-fade-right tracking-wider bg-dark/30 dark:bg-dark/50 py-2 px-4 rounded-lg inline-block backdrop-blur-md border border-white/20 shadow-lg hover:shadow-secondary/20 transition-all duration-300 transform hover:translate-z-10'>
						{heroBanner?.smallText || 'NUEVA TECNOLOGÍA'}
					</h3>

					<h1 className='text-6xl lg:text-8xl font-bold bg-gradient-to-r from-light via-secondary to-accent1 dark:from-light/90 dark:via-secondary dark:to-accent1 bg-clip-text text-transparent animate-fade-right [animation-delay:200ms] leading-tight drop-shadow-2xl transform hover:translate-z-20 transition-transform duration-300'>
						{heroBanner?.largeText1 || 'El Futuro Es Ahora'}
					</h1>

					<h2 className='text-2xl lg:text-4xl text-accent1 dark:text-accent1 font-semibold animate-fade-right [animation-delay:400ms] tracking-tight drop-shadow-xl transform hover:translate-z-15 transition-transform duration-300'>
						{heroBanner?.midText || 'Descubre lo Último en Tech'}
					</h2>

					<p className='text-light dark:text-light/90 text-lg max-w-lg animate-fade-right [animation-delay:600ms] leading-relaxed bg-dark/20 dark:bg-dark/40 p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-xl hover:shadow-accent1/10 transition-all duration-300'>
						{heroBanner?.desc ||
							'Explora nuestra colección de productos tecnológicos de última generación.'}
					</p>

					{/* Botones con efecto de profundidad */}
					<div className='flex gap-4 animate-fade-right [animation-delay:800ms]'>
						<Link href={`/product/${heroBanner?.product || ''}`}>
							<button className='group relative px-8 py-4 bg-gradient-to-r from-accent1 to-accent2 text-light rounded-xl transition-all duration-300 transform hover:translate-z-10 hover:scale-105 hover:shadow-xl shadow-accent1/30 overflow-hidden border border-white/20'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{heroBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/products'>
							<button className='px-8 py-4 bg-dark/40 hover:bg-dark/60 dark:bg-dark/60 dark:hover:bg-dark/80 text-light font-medium rounded-xl transition-all duration-300 backdrop-blur-md border border-secondary/30 hover:border-secondary/50 shadow-lg hover:shadow-secondary/20 transform hover:translate-z-10'>
								Explorar Más
							</button>
						</Link>
					</div>
				</div>

				{/* Contenedor de imagen con efecto 3D */}
				<div className='hidden lg:block w-1/3 h-full relative perspective-1000'>
					<div className='absolute inset-0 flex items-center justify-center transform hover:translate-z-20 transition-transform duration-500'>
						<div className='relative w-[90%] h-[90%] group'>
							<div className='absolute inset-0 bg-gradient-to-r from-secondary/40 to-accent1/40 dark:from-secondary/30 dark:to-accent1/30 rounded-full blur-3xl animate-pulse-slow'></div>
							<Image
								src={
									urlFor(heroBanner?.image).url() ||
									'https://placehold.co/600x400'
								}
								alt={heroBanner?.smallText || 'Nuevo Producto'}
								fill
								className='object-contain transform group-hover:scale-110 transition-transform duration-700 z-10'
								priority
							/>
							<div className='absolute -inset-4 border border-white/30 dark:border-white/20 rounded-full animate-spin-slow'></div>
							{/* Añadir efecto de brillo */}
							<div className='absolute inset-0 bg-gradient-to-tr from-secondary/10 to-accent1/10 dark:from-secondary/5 dark:to-accent1/5 rounded-full filter blur-md'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
