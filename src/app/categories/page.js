import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineArrowRight } from 'react-icons/ai';

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
		<div className='min-h-screen bg-dark'>
			{/* Hero Section */}
			<div className='relative overflow-hidden bg-gradient-to-r from-dark via-primary/20 to-dark py-16'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent pb-3'>
						Categorías
					</h1>
					<p className='text-light/70 max-w-2xl mx-auto'>
						Explora nuestra amplia selección de productos
						tecnológicos organizados por categorías
					</p>
				</div>
			</div>

			{/* Categories Grid */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/products?category=${category.id}`}
							className='group relative overflow-hidden rounded-2xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-accent1/10'>
							{/* Efecto de brillo */}
							<div className='absolute -inset-0.5 bg-gradient-to-r from-accent1/0 via-accent1/20 to-accent2/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>

							<div className='relative'>
								{/* Header */}
								<div className='flex items-center gap-3 mb-4'>
									<span className='text-3xl'>
										{category.icon}
									</span>
									<h3 className='text-xl font-medium text-light group-hover:text-secondary transition-colors'>
										{category.name}
									</h3>
								</div>

								{/* Description */}
								<p className='text-light/70 mb-4'>
									{category.description}
								</p>

								{/* Items count */}
								<div className='flex items-center justify-between'>
									<span className='text-sm text-accent1'>
										{category.items}
									</span>
									<AiOutlineArrowRight className='text-light/50 group-hover:text-accent1 transform translate-x-0 group-hover:translate-x-2 transition-all' />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Efectos de luz */}
			<div className='fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full filter blur-[100px] opacity-50'></div>
			<div className='fixed bottom-0 right-0 w-[500px] h-[500px] bg-accent1/10 rounded-full filter blur-[100px] opacity-50'></div>
		</div>
	);
}

export default CategoriesPage;
