import React from 'react';
import Link from 'next/link';
import {
	AiOutlineHome,
	AiOutlineLaptop,
	AiOutlineInfoCircle,
	AiOutlineMessage,
	AiOutlineMail,
	AiOutlineTwitter,
	AiOutlineInstagram,
	AiOutlineFacebook,
	AiOutlineYoutube,
	AiOutlineSend,
	AiOutlineRight,
} from 'react-icons/ai';

function Footer() {
	return (
		<footer className='relative bg-gradient-to-b from-dark/80 via-dark/95 to-black/90 text-light overflow-hidden'>
			{/* Ambient effects */}
			<div className='absolute top-0 left-0 w-[400px] h-[400px] bg-accent1/5 rounded-full filter blur-3xl opacity-40 pointer-events-none'></div>
			<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent2/5 rounded-full filter blur-3xl opacity-40 pointer-events-none'></div>
			<div className='absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-secondary/5 rounded-full filter blur-3xl opacity-30 pointer-events-none animate-pulse-slow'></div>

			{/* Grid pattern overlay */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none'></div>

			{/* Main content */}
			<div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
				<div className='grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4'>
					{/* Brand section */}
					<div className='space-y-6'>
						<div>
							<h4 className='text-2xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 bg-clip-text text-transparent'>
								TechStore
							</h4>
							<div className='h-0.5 w-12 bg-gradient-to-r from-secondary to-accent1 mt-2 rounded-full'></div>
						</div>

						<p className='text-light/70 dark:text-light/60 text-sm max-w-xs leading-relaxed'>
							Descubre la última tecnología y los gadgets más
							innovadores para transformar tu vida digital.
						</p>

						{/* Social media icons */}
						<div className='flex space-x-4'>
							{[
								{
									icon: <AiOutlineTwitter />,
									href: '/',
									label: 'Twitter',
								},
								{
									icon: <AiOutlineFacebook />,
									href: '/',
									label: 'Facebook',
								},
								{
									icon: <AiOutlineInstagram />,
									href: '/',
									label: 'Instagram',
								},
								{
									icon: <AiOutlineYoutube />,
									href: '/',
									label: 'YouTube',
								},
							].map((social, index) => (
								<Link
									key={index}
									href={social.href}
									aria-label={social.label}
									className='w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-light/70 hover:text-secondary transition-all duration-300 border border-white/5 hover:border-secondary/30 group'>
									<span className='text-xl group-hover:scale-110 transition-transform duration-300'>
										{social.icon}
									</span>
								</Link>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className='sm:ml-8'>
						<h5 className='text-secondary font-medium mb-5 flex items-center space-x-2 text-lg'>
							<span className='w-1 h-5 bg-secondary rounded-full'></span>
							<span>Enlaces Rápidos</span>
						</h5>

						<ul className='space-y-3'>
							{[
								{
									name: 'Inicio',
									icon: <AiOutlineHome />,
									href: '/',
								},
								{
									name: 'Productos',
									icon: <AiOutlineLaptop />,
									href: '/products',
								},
								{
									name: 'Sobre Nosotros',
									icon: <AiOutlineInfoCircle />,
									href: '/about',
								},
								{
									name: 'Contacto',
									icon: <AiOutlineMessage />,
									href: '/contact',
								},
							].map((item) => (
								<li key={item.name}>
									<Link
										href={item.href}
										className='text-light/70 hover:text-secondary transition-colors duration-200 flex items-center group'>
										<span className='text-secondary/70 mr-2 group-hover:translate-x-1 transition-transform duration-300'>
											{item.icon}
										</span>
										<span className='border-b border-transparent group-hover:border-secondary/30 pb-0.5'>
											{item.name}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h5 className='text-secondary font-medium mb-5 flex items-center space-x-2 text-lg'>
							<span className='w-1 h-5 bg-accent1 rounded-full'></span>
							<span>Categorías</span>
						</h5>

						<div className='flex flex-wrap gap-2'>
							{[
								'Smartphones',
								'Laptops',
								'Audio',
								'Accesorios',
								'Gaming',
								'Monitores',
								'Smart Home',
								'Wearables',
							].map((item) => (
								<Link
									key={item}
									href={`/category/${item.toLowerCase()}`}
									className='px-3 py-1.5 bg-white/5 hover:bg-white/10 text-light/70 hover:text-light rounded-lg text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent1/5 border border-white/5 hover:border-white/10'>
									{item}
								</Link>
							))}
						</div>
					</div>

					{/* Newsletter */}
					<div className='space-y-5'>
						<h5 className='text-secondary font-medium mb-5 flex items-center space-x-2 text-lg'>
							<span className='w-1 h-5 bg-accent2 rounded-full'></span>
							<span>Newsletter</span>
						</h5>

						<p className='text-light/70 text-sm leading-relaxed'>
							Suscríbete para recibir las últimas novedades y
							ofertas exclusivas
						</p>

						<form className='relative group'>
							<input
								type='email'
								placeholder='Tu email'
								className='w-full bg-white/5 rounded-xl px-4 py-3 text-light/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-light/40 border border-white/10 group-hover:border-secondary/30 transition-all duration-300'
							/>
							<button
								type='submit'
								className='absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-r from-secondary to-accent1 rounded-lg flex items-center justify-center shadow-lg shadow-accent1/20 hover:shadow-accent1/40 transition-all duration-300 hover:scale-105'>
								<AiOutlineSend className='text-light' />
							</button>
						</form>

						<p className='text-light/50 text-xs'>
							Al suscribirte, aceptas nuestra{' '}
							<Link
								href='/'
								className='text-secondary hover:underline'>
								Política de Privacidad
							</Link>
						</p>
					</div>
				</div>

				{/* Divider */}
				<div className='h-px bg-gradient-to-r from-transparent via-light/10 to-transparent my-10'></div>

				{/* Footer bottom */}
				<div className='flex flex-col md:flex-row justify-between items-center gap-4 text-light/50 text-sm'>
					<p>
						© {new Date().getFullYear()} TechStore. Todos los
						derechos reservados.
					</p>

					<div className='flex flex-wrap justify-center gap-6'>
						{['Privacidad', 'Términos', 'Cookies', 'Ayuda'].map(
							(item) => (
								<Link
									key={item}
									href='/'
									className='hover:text-secondary transition-colors duration-200 flex items-center gap-1 group'>
									<span>{item}</span>
									<AiOutlineRight className='opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300' />
								</Link>
							)
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
