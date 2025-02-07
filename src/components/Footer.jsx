import React from 'react';
import Link from 'next/link';

function Footer() {
	return (
		<footer className='relative bg-gradient-to-b from-dark to-primary/90 text-light'>
			{/* Grid de fondo */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]'></div>

			{/* Contenido principal */}
			<div className='relative z-10 mx-auto max-w-7xl px-6 py-12'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Logo y descripción */}
					<div className='space-y-4'>
						<h4 className='text-2xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
							TechStore
						</h4>
						<p className='text-light/80 text-sm max-w-xs'>
							Descubre la última tecnología y los gadgets más
							innovadores para transformar tu vida digital.
						</p>
					</div>

					{/* Enlaces rápidos */}
					<div>
						<h5 className='text-secondary font-medium mb-4'>
							Enlaces Rápidos
						</h5>
						<ul className='space-y-2'>
							{[
								'Inicio',
								'Productos',
								'Sobre Nosotros',
								'Contacto',
							].map((item) => (
								<li key={item}>
									<Link
										href='/'
										className='text-light/70 hover:text-secondary transition-colors duration-200'>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Categorías */}
					<div>
						<h5 className='text-secondary font-medium mb-4'>
							Categorías
						</h5>
						<ul className='space-y-2'>
							{[
								'Smartphones',
								'Laptops',
								'Accesorios',
								'Gaming',
							].map((item) => (
								<li key={item}>
									<Link
										href='/'
										className='text-light/70 hover:text-secondary transition-colors duration-200'>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div className='space-y-4'>
						<h5 className='text-secondary font-medium'>
							Newsletter
						</h5>
						<p className='text-light/70 text-sm'>
							Suscríbete para recibir las últimas novedades
						</p>
						<div className='flex gap-2'>
							<input
								type='email'
								placeholder='Tu email'
								className='bg-white/10 rounded-lg px-4 py-2 text-light/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 flex-1'
							/>
							<button className='bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent1/20'>
								Enviar
							</button>
						</div>
					</div>
				</div>

				{/* Separador */}
				<div className='h-px bg-gradient-to-r from-transparent via-light/20 to-transparent my-8'></div>

				{/* Footer inferior */}
				<div className='flex flex-col md:flex-row justify-between items-center gap-4 text-light/60 text-sm'>
					<p>© 2024 TechStore. Todos los derechos reservados.</p>
					<div className='flex gap-6'>
						<Link
							href='/'
							className='hover:text-secondary transition-colors duration-200'>
							Privacidad
						</Link>
						<Link
							href='/'
							className='hover:text-secondary transition-colors duration-200'>
							Términos
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
