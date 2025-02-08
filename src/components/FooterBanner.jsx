import React from 'react';
import Link from 'next/link';

function FooterBanner({ footerBanner }) {
	return (
		<div className='relative min-h-[400px] w-full overflow-hidden mt-16'>
			{/* Contenido con efectos mejorados */}
			<div className='relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 py-16 max-w-7xl mx-auto gap-8'>
				{/* Sección izquierda con efectos tech */}
				<div className='flex-1 space-y-6 text-center lg:text-left relative'>
					{/* Efecto de líneas tech */}
					<div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-secondary via-accent1 to-transparent hidden lg:block'></div>

					<h2 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 dark:from-secondary dark:via-accent1 dark:to-accent2 bg-clip-text text-transparent animate-fade-right drop-shadow-2xl'>
						{footerBanner?.largeText1 || 'Descubre el Futuro'}
					</h2>

					<p className='text-light/90 dark:text-light/80 text-lg max-w-xl animate-fade-right [animation-delay:200ms] bg-black/20 dark:bg-black/40 p-4 rounded-lg backdrop-blur-sm'>
						{footerBanner?.desc ||
							'Obtén hasta 30% de descuento en productos seleccionados. Tecnología de última generación a precios increíbles.'}
					</p>

					<div className='flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-right [animation-delay:400ms]'>
						<Link href={footerBanner?.buttonLink || '/products'}>
							<button className='group relative px-8 py-4 bg-gradient-to-r from-accent1 via-accent2 to-accent1 bg-[length:200%_100%] animate-gradient text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/30 overflow-hidden border border-white/20'>
								<span className='absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></span>
								{footerBanner?.buttonText || 'Comprar Ahora'}
							</button>
						</Link>
						<Link href='/contact'>
							<button className='px-8 py-4 bg-white/5 dark:bg-black/60 hover:bg-white/10 dark:hover:bg-black/20 text-light font-medium rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 hover:border-secondary/50'>
								Contactar
							</button>
						</Link>
					</div>
				</div>

				{/* Sección derecha - Características con diseño tech */}
				<div className='grid grid-cols-2 gap-6 lg:gap-8 animate-fade-left perspective-1000'>
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
					].map((feature, index) => (
						<div
							key={feature.title}
							className='group relative p-6 bg-black/10 dark:bg-black/40 backdrop-blur-sm rounded-xl hover:bg-white/10 dark:hover:bg-black/60 transition-all duration-500 transform hover:translate-z-10'>
							<div className='text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300'>
								{feature.icon}
							</div>
							<h3
								className={`bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent font-medium mb-2`}>
								{feature.title}
							</h3>
							<p className='text-light/70 dark:text-light/60 text-sm'>
								{feature.desc}
							</p>
							<div className='absolute inset-0 border border-white/10 dark:border-white/5 rounded-xl group-hover:border-secondary/50 dark:group-hover:border-secondary/30 transition-colors duration-300'></div>
						</div>
					))}
				</div>
			</div>

			{/* Efectos de brillo mejorados */}
			<div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 dark:from-secondary/5 dark:to-primary/5 rounded-full filter blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-accent1/10 to-accent2/10 dark:from-accent1/5 dark:to-accent2/5 rounded-full filter blur-3xl animate-pulse-slow'></div>

			{/* Efectos adicionales */}
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]'></div>
		</div>
	);
}

export default FooterBanner;
