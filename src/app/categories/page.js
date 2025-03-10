import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineArrowRight, AiOutlineAppstore } from 'react-icons/ai';

const categories = [
	{
		id: 'smartphones',
		name: 'Smartphones',
		icon: '📱',
		description: 'Descubre los últimos smartphones con tecnología de punta',
		image: '/categories/smartphones.jpg',
		items: '45+ productos',
	},
	{
		id: 'laptops',
		name: 'Laptops',
		icon: '💻',
		description: 'Potentes laptops para trabajo y entretenimiento',
		image: '/categories/laptops.jpg',
		items: '30+ productos',
	},
	{
		id: 'audio',
		name: 'Audio',
		icon: '🎧',
		description: 'Experimenta un sonido cristalino y envolvente',
		image: '/categories/audio.jpg',
		items: '25+ productos',
	},
	{
		id: 'gaming',
		name: 'Gaming',
		icon: '🎮',
		description: 'Equipo gaming de alta gama para la mejor experiencia',
		image: '/categories/gaming.jpg',
		items: '35+ productos',
	},
	{
		id: 'wearables',
		name: 'Wearables',
		icon: '⌚',
		description: 'Tecnología que te acompaña a donde vayas',
		image: '/categories/wearables.jpg',
		items: '20+ productos',
	},
	{
		id: 'accessories',
		name: 'Accesorios',
		icon: '⚡',
		description: 'Complementos esenciales para tus dispositivos',
		image: '/categories/accessories.jpg',
		items: '50+ productos',
	},
];

function CategoriesPage() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-dark/95 to-dark/90 dark:from-dark/98 dark:to-dark/95'>
			{/* Background effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

			{/* Hero Section */}
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent2/5 to-accent1/10 opacity-60'></div>

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
					<div className='flex flex-col items-center text-center space-y-6'>
						{/* Icon with glow effect */}
						<div className='relative mb-4'>
							<div className='text-4xl md:text-5xl text-secondary animate-pulse-slow'>
								<AiOutlineAppstore />
							</div>
							<div className='absolute -inset-4 bg-secondary/10 rounded-full blur-xl -z-10'></div>
						</div>

						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 dark:from-secondary dark:via-light dark:to-accent1 bg-clip-text text-transparent pb-3'>
							Categorías
						</h1>

						<p className='max-w-2xl mx-auto text-light/80 dark:text-light/70 text-lg'>
							Explora nuestra amplia selección de productos
							tecnológicos organizados por categorías
						</p>

						<div className='w-24 h-1 bg-gradient-to-r from-secondary to-accent1 rounded-full mt-2'></div>

						{/* Category stats */}
						<div className='flex flex-wrap justify-center gap-4 mt-8'>
							<div className='bg-white/5 dark:bg-dark/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
								<span className='text-secondary font-medium'>
									{categories.length}
								</span>
								<span className='text-light/70 ml-2'>
									categorías disponibles
								</span>
							</div>
							<div className='bg-white/5 dark:bg-dark/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
								<span className='text-accent1 font-medium'>
									205+
								</span>
								<span className='text-light/70 ml-2'>
									productos en total
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Grid */}
			<section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/products?category=${category.id}`}
							className='group h-full'>
							<div className='relative h-full overflow-hidden rounded-2xl bg-glass-dark backdrop-blur-md border border-glass-border-dark shadow-glass-dark transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent1/20 dark:hover:shadow-accent2/10 flex flex-col'>
								{/* Image section */}
								<div className='relative h-48 w-full overflow-hidden'>
									{/* Category image with overlay */}
									<Image
										src={category.image}
										alt={category.name}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										className='object-cover transition-transform duration-700 group-hover:scale-110'
									/>

									{/* Image overlay */}
									<div className='absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent'></div>

									{/* Category icon and badge */}
									<div className='absolute top-4 left-4 flex items-center gap-2'>
										<span className='w-12 h-12 flex items-center justify-center rounded-full bg-glass-dark backdrop-blur-md text-2xl border border-glass-border-dark shadow-lg'>
											{category.icon}
										</span>
										<div className='px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-light/90 text-xs'>
											{category.items}
										</div>
									</div>

									{/* Category name - positioned on the image */}
									<div className='absolute bottom-4 left-0 w-full px-4'>
										<h3 className='text-xl md:text-2xl font-semibold text-light drop-shadow-lg group-hover:text-secondary transition-colors'>
											{category.name}
										</h3>
									</div>
								</div>

								{/* Description section */}
								<div className='p-5 flex-grow flex flex-col justify-between'>
									<p className='text-light/70 mb-4 text-sm md:text-base'>
										{category.description}
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<span className='text-light/50 text-sm'>
											Ver productos
										</span>
										<div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent1/20 transition-all duration-300'>
											<AiOutlineArrowRight className='text-light/50 group-hover:text-accent1 transform group-hover:translate-x-1 transition-all' />
										</div>
									</div>
								</div>

								{/* Hover effect border */}
								<div className='absolute inset-0 border border-transparent rounded-2xl group-hover:border-secondary/30 transition-colors duration-300 pointer-events-none'></div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Feature section */}
			<section className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='relative overflow-hidden rounded-3xl bg-glass-dark backdrop-blur-md border border-glass-border-dark p-6 md:p-10'>
					<div className='absolute -top-40 -right-40 w-80 h-80 bg-accent2/20 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
					<div className='absolute -bottom-40 -left-40 w-80 h-80 bg-accent1/20 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

					<div className='relative flex flex-col md:flex-row gap-8 items-center'>
						<div className='md:w-1/2 space-y-6'>
							<h2 className='text-3xl md:text-4xl font-bold text-light'>
								Encuentra exactamente lo que{' '}
								<span className='bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
									necesitas
								</span>
							</h2>
							<p className='text-light/70'>
								Nuestra tienda cuenta con una amplia variedad de
								productos de alta calidad, organizados en
								categorías para facilitar tu búsqueda. Explora,
								compara y encuentra la tecnología perfecta para
								ti.
							</p>
							<Link href='/products' className='inline-block'>
								<button className='px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-accent1/20'>
									Ver todos los productos
								</button>
							</Link>
						</div>

						<div className='md:w-1/2 grid grid-cols-2 gap-4'>
							{[
								{ title: 'Envíos rápidos', icon: '🚚' },
								{ title: 'Garantía extendida', icon: '🛡️' },
								{ title: 'Soporte técnico', icon: '🛠️' },
								{ title: 'Pagos seguros', icon: '🔒' },
							].map((feature, index) => (
								<div
									key={index}
									className='bg-white/5 p-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1'>
									<div className='text-3xl mb-2'>
										{feature.icon}
									</div>
									<h3 className='text-light font-medium'>
										{feature.title}
									</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default CategoriesPage;
