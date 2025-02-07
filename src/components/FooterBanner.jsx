import React from 'react';
import Link from 'next/link';

function FooterBanner({ footerBanner }) {
	return (
		<div className='relative min-h-[400px] w-full overflow-hidden mt-16'>
			{/* Fondo con gradiente y efecto de grid */}
			<div className='absolute inset-0 bg-gradient-to-tr from-dark via-primary to-accent2'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]'></div>
			</div>

			{/* Contenido */}
			<div className='relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 py-16 max-w-7xl mx-auto gap-8'>
				{/* Sección izquierda */}
				<div className='flex-1 space-y-6 text-center lg:text-left'>
					<h2 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent animate-fade-right'>
						{footerBanner?.largeText1 || 'Descubre el Futuro'}
					</h2>

					<p className='text-light/90 text-lg max-w-xl animate-fade-right [animation-delay:200ms]'>
						{footerBanner?.desc ||
							'Obtén hasta 30% de descuento en productos seleccionados. Tecnología de última generación a precios increíbles.'}
					</p>

					<div className='flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-right [animation-delay:400ms]'>
						<Link
							href={footerBanner?.buttonLink || '/products'}
							className='px-8 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/20 hover:shadow-accent2/40'>
							{footerBanner?.buttonText || 'Comprar Ahora'}
						</Link>
						<Link
							href='/contact'
							className='px-8 py-3 bg-white/10 hover:bg-white/20 text-light rounded-lg transition-all duration-300 backdrop-blur-sm'>
							Contactar
						</Link>
					</div>
				</div>

				{/* Sección derecha - Características destacadas */}
				<div className='grid grid-cols-2 gap-6 lg:gap-8 animate-fade-left'>
					{[
						{
							title: 'Envío Gratis',
							desc: 'En compras mayores a $999',
							icon: '🚚',
						},
						{
							title: 'Pago Seguro',
							desc: 'Transacciones 100% seguras',
							icon: '🔒',
						},
						{
							title: 'Mejor Precio',
							desc: 'Garantía de precio más bajo',
							icon: '💰',
						},
						{
							title: 'Soporte 24/7',
							desc: 'Asistencia técnica disponible',
							icon: '🎮',
						},
					].map((feature, index) => (
						<div
							key={feature.title}
							className='relative group p-6 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300'>
							<div className='text-3xl mb-3'>{feature.icon}</div>
							<h3 className='text-secondary font-medium mb-2'>
								{feature.title}
							</h3>
							<p className='text-light/70 text-sm'>
								{feature.desc}
							</p>
							<div className='absolute inset-0 border border-white/10 rounded-lg group-hover:border-secondary/50 transition-colors duration-300'></div>
						</div>
					))}
				</div>
			</div>

			{/* Efecto de brillo en las esquinas */}
			<div className='absolute top-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 right-0 w-64 h-64 bg-accent1/20 rounded-full filter blur-3xl'></div>
		</div>
	);
}

export default FooterBanner;
