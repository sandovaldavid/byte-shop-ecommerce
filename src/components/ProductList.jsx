'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/components';
import {
	AiOutlineSearch,
	AiOutlineFilter,
	AiOutlineClose,
} from 'react-icons/ai';

function ProductList({ initialProducts = [] }) {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [priceRange, setPriceRange] = useState([0, 5000]);
	const [sortBy, setSortBy] = useState('featured');
	const [products, setProducts] = useState(initialProducts || []);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const categories = [
		{ id: 'all', name: 'Todos', icon: '🌟' },
		{ id: 'smartphones', name: 'Smartphones', icon: '📱' },
		{ id: 'laptops', name: 'Laptops', icon: '💻' },
		{ id: 'audio', name: 'Audio', icon: '🎧' },
		{ id: 'gaming', name: 'Gaming', icon: '🎮' },
		{ id: 'accessories', name: 'Accesorios', icon: '⚡' },
	];

	const hasProducts = products && products.length > 0;

	return (
		<div className='max-w-7xl mx-auto'>
			<div className='mb-8'>
				<div className='flex flex-col md:flex-row gap-4 items-center mb-6'>
					<div className='relative flex-1'>
						<input
							type='text'
							placeholder='Buscar productos...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
						/>
						<AiOutlineSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
					</div>
					<button
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className='md:hidden bg-white/5 p-3 rounded-xl text-light hover:bg-white/10 transition-colors'>
						{isFilterOpen ? (
							<AiOutlineClose />
						) : (
							<AiOutlineFilter />
						)}
					</button>
				</div>

				<div className='flex gap-2 overflow-x-auto pb-4 scrollbar-hide'>
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
								selectedCategory === category.id
									? 'bg-gradient-to-r from-accent1 to-accent2 text-light shadow-lg shadow-accent1/20'
									: 'bg-white/5 text-light/70 hover:bg-white/10'
							}`}>
							<span>{category.icon}</span>
							<span>{category.name}</span>
						</button>
					))}
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-8'>
				<div
					className={`lg:w-64 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
					<div className='bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10'>
						<h3 className='text-secondary font-medium mb-4'>
							Rango de Precio
						</h3>
						<div className='space-y-4'>
							<input
								type='range'
								min='0'
								max='5000'
								value={priceRange[1]}
								onChange={(e) =>
									setPriceRange([0, parseInt(e.target.value)])
								}
								className='w-full accent-secondary'
							/>
							<div className='flex justify-between items-center'>
								<div className='bg-white/5 px-3 py-1 rounded-lg text-light/70'>
									${priceRange[0]}
								</div>
								<div className='bg-white/5 px-3 py-1 rounded-lg text-light/70'>
									${priceRange[1]}
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10'>
						<h3 className='text-secondary font-medium mb-4'>
							Ordenar por
						</h3>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className='w-full bg-white/5 text-light border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary [&>option]:bg-dark'>
							<option value='featured'>Destacados</option>
							<option value='price-low'>
								Precio: Menor a Mayor
							</option>
							<option value='price-high'>
								Precio: Mayor a Menor
							</option>
							<option value='newest'>Más Nuevos</option>
						</select>
					</div>
				</div>

				<div className='flex-1'>
					{hasProducts ? (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{' '}
							{products.map((product) => (
								<Product
									key={product.slug?.current}
									product={product}
								/>
							))}
						</div>
					) : (
						<div className='flex flex-col items-center justify-center py-20 space-y-6'>
							<div className='text-6xl'>🔍</div>
							<h3 className='text-2xl font-medium text-light'>
								No se encontraron productos
							</h3>
							<p className='text-light/70 text-center max-w-md'>
								No hay productos disponibles en este momento.
								Intenta ajustar los filtros o realiza una nueva
								búsqueda.
							</p>
						</div>
					)}

					<div className='mt-28 flex justify-center gap-2'>
						{[1, 2, 3].map((page) => (
							<button
								key={page}
								className={`w-10 h-10 rounded-lg transition-all transform hover:scale-105 ${
									page === 1
										? 'bg-gradient-to-r from-accent1 to-accent2 text-light shadow-lg shadow-accent1/20'
										: 'bg-white/5 text-light/70 hover:bg-white/10'
								}`}>
								{page}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductList;
