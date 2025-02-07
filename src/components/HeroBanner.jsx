import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
	return (
		<div className='relative h-[600px] w-full overflow-hidden bg-gradient-to-tr from-dark via-primary/80 to-accent2/50'>
			<div className='absolute inset-0 bg-white/[0.02] backdrop-blur-[2px]'></div>

			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.07)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse-slow'></div>

			<div className='absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-10 left-10 w-96 h-96 bg-accent1/20 rounded-full blur-3xl animate-pulse-slow'></div>

			<div className='relative z-10 flex h-full items-center justify-between px-10 xl:px-20'>
				<div className='space-y-8 max-w-2xl'>
					<h3 className='text-secondary text-lg font-medium animate-fade-right tracking-wider'>
						{heroBanner?.smallText || 'NUEVA TECNOLOGÍA'}
					</h3>

					<h1 className='text-6xl lg:text-8xl font-bold bg-gradient-to-r from-light via-secondary to-light bg-clip-text text-transparent animate-fade-right [animation-delay:200ms] leading-tight'>
						{heroBanner?.largeText1 || 'El Futuro Es Ahora'}
					</h1>

					<h2 className='text-2xl lg:text-4xl text-accent1 font-semibold animate-fade-right [animation-delay:400ms] tracking-tight'>
						{heroBanner?.midText || 'Descubre lo Último en Tech'}
					</h2>

					<p className='text-light/90 text-lg max-w-lg animate-fade-right [animation-delay:600ms] leading-relaxed'>
						{heroBanner?.desc ||
							'Explora nuestra colección de productos tecnológicos de última generación.'}
					</p>

					<div className='flex gap-4 animate-fade-right [animation-delay:800ms]'>
						<Link href={`/product/${heroBanner?.product || ''}`}>
							<button className='group relative px-8 py-4 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/20 hover:shadow-accent2/40 overflow-hidden'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{heroBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/products'>
							<button className='px-8 py-4 bg-white/10 hover:bg-white/20 text-light rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-secondary/50'>
								Explorar Más
							</button>
						</Link>
					</div>
				</div>

				<div className='hidden lg:block w-1/3 h-full relative'>
					<div className='absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[70%] bg-gradient-to-b from-transparent via-secondary/50 to-transparent'></div>
				</div>
				<div className='hidden lg:block w-1/3 h-full relative'>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='relative w-[90%] h-[90%]'>
							<div className='absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent1/20 rounded-full blur-3xl animate-pulse-slow'></div>
							<div className='relative h-full w-full'>
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
									className='object-contain transform hover:scale-105 transition-transform duration-700 z-10'
									priority
								/>
							</div>
							<div className='absolute -inset-4 border border-white/10 rounded-full animate-spin-slow'></div>
						</div>
					</div>
					<div className='absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[70%] bg-gradient-to-b from-transparent via-secondary/50 to-transparent'></div>
				</div>
			</div>
		</div>
	);
}

export default HeroBanner;
