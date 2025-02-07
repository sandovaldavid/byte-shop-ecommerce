'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineThunderbolt, AiOutlineClockCircle } from 'react-icons/ai';

const deals = [
	{
		id: 1,
		name: 'Samsung Galaxy S23 Ultra',
		description:
			'El último flagship de Samsung con un increíble sistema de cámaras',
		originalPrice: 1299.99,
		discountPrice: 999.99,
		discount: 23,
		image: '/products/galaxy-s23.jpg',
		endDate: '2024-03-01',
		category: 'smartphones',
		stock: 10,
	},
	// Agregar más ofertas aquí
];

function DealsPage() {
	return (
		<div className='min-h-screen bg-dark'>
			{/* Hero Section */}
			<div className='relative overflow-hidden bg-gradient-to-r from-dark via-primary/20 to-dark py-16'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center max-w-2xl mx-auto'>
						<h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent pb-3'>
							Ofertas Especiales
						</h1>
						<p className='text-light/70 text-lg'>
							Descubre increíbles descuentos en productos
							tecnológicos seleccionados
						</p>
					</div>
				</div>
			</div>

			{/* Contenido principal */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{/* Banner de promoción */}
				<div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent1 to-accent2 p-8 mb-12'>
					<div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2'></div>
					<div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-6'>
						<div className='text-light'>
							<h2 className='text-2xl md:text-3xl font-bold mb-2'>
								¡Ofertas por tiempo limitado!
							</h2>
							<p className='text-light/90'>
								Aprovecha descuentos de hasta 50% en productos
								seleccionados
							</p>
						</div>
						<Link
							href='#deals'
							className='px-8 py-3 bg-white/10 hover:bg-white/20 text-light rounded-xl transition-all duration-300 backdrop-blur-sm flex items-center gap-2 scroll-smooth'>
							<AiOutlineThunderbolt className='text-xl' />
							Ver Ofertas
						</Link>
					</div>
				</div>

				{/* Grid de ofertas */}
				<div
					id='deals'
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20'>
					{deals.map((deal) => (
						<Link
							key={deal.id}
							href={`/products/${deal.category}/${deal.id}`}
							className='group relative overflow-hidden rounded-2xl bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-accent1/10'>
							{/* Badge de descuento */}
							<div className='absolute top-6 left-6 z-10 bg-accent1/90 text-light px-3 py-1 rounded-full backdrop-blur-sm'>
								-{deal.discount}%
							</div>

							{/* Imagen */}
							<div className='relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-white/5'>
								<Image
									src={deal.image}
									alt={deal.name}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-110'
								/>
							</div>

							{/* Información */}
							<div className='space-y-4'>
								<h3 className='text-xl font-medium text-light group-hover:text-secondary transition-colors'>
									{deal.name}
								</h3>
								<p className='text-light/70 line-clamp-2'>
									{deal.description}
								</p>

								{/* Precios */}
								<div className='flex items-center gap-3'>
									<span className='text-2xl font-bold text-accent1'>
										${deal.discountPrice}
									</span>
									<span className='text-light/50 line-through'>
										${deal.originalPrice}
									</span>
								</div>

								{/* Stock y tiempo restante */}
								<div className='flex items-center justify-between text-sm'>
									<span className='text-light/70'>
										Stock: {deal.stock} unidades
									</span>
									<div className='flex items-center gap-1 text-secondary'>
										<AiOutlineClockCircle />
										<span>Termina en 2 días</span>
									</div>
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

export default DealsPage;
