'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineSearch,
	AiOutlineFilter,
	AiOutlineClose,
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineClear,
} from 'react-icons/ai';

function ProductList({ initialProducts = [] }) {
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [priceRange, setPriceRange] = useState([0, 5000]);
	const [sortBy, setSortBy] = useState('featured');
	const [products, setProducts] = useState(initialProducts || []);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	// Simular efectos de carga cuando cambian los filtros
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [selectedCategory, priceRange, sortBy, searchQuery]);

	const categories = [
		{ id: 'all', name: 'Todos', icon: '🌟' },
		{ id: 'smartphones', name: 'Smartphones', icon: '📱' },
		{ id: 'laptops', name: 'Laptops', icon: '💻' },
		{ id: 'audio', name: 'Audio', icon: '🎧' },
		{ id: 'gaming', name: 'Gaming', icon: '🎮' },
		{ id: 'accessories', name: 'Accesorios', icon: '⚡' },
	];

	const hasProducts = products && products.length > 0;

	// Función para limpiar todos los filtros
	const clearFilters = () => {
		setSelectedCategory('all');
		setPriceRange([0, 5000]);
		setSortBy('featured');
		setSearchQuery('');
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6'>
			{/* Barra superior con búsqueda y filtros */}
			<div className='mb-8 animate-fade-up [animation-delay:200ms]'>
				<div className='flex flex-col md:flex-row gap-4 items-center mb-6'>
					{/* Barra de búsqueda mejorada */}
					<div className='relative flex-1 w-full'>
						<div className='absolute left-4 top-1/2 -translate-y-1/2 text-light/50 text-xl transition-all duration-300 group-focus-within:text-secondary'>
							<AiOutlineSearch className='w-5 h-5' />
						</div>
						<input
							type='text'
							placeholder='Buscar productos...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-white/5 border-2 border-white/10 rounded-xl px-12 py-3 text-light focus:outline-none focus:border-secondary/50 transition-colors duration-300 placeholder:text-light/40 group-focus-within:bg-white/10'
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className='absolute right-4 top-1/2 -translate-y-1/2 text-light/50 hover:text-light transition-colors'
								aria-label='Limpiar búsqueda'>
								<AiOutlineClose className='w-4 h-4' />
							</button>
						)}
					</div>

					{/* Botón de filtro para móvil */}
					<button
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className='md:hidden flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-light rounded-xl transition-all duration-300 transform hover:-translate-y-0.5'
						aria-expanded={isFilterOpen}
						aria-label='Toggle filters'>
						{isFilterOpen ? (
							<>
								<AiOutlineClose className='text-accent1' />
								<span>Cerrar filtros</span>
							</>
						) : (
							<>
								<AiOutlineFilter className='text-secondary' />
								<span>Filtrar</span>
							</>
						)}
					</button>
				</div>

				{/* Categorías con scroll horizontal mejorado */}
				<div className='overflow-auto scrollbar-hide py-2 -mx-2 px-2'>
					<div className='flex gap-2 min-w-max pb-1'>
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
									selectedCategory === category.id
										? 'bg-gradient-to-r from-accent1 to-accent2 text-light shadow-lg shadow-accent1/20 border border-white/20'
										: 'bg-white/5 text-light/80 hover:bg-white/10 border border-transparent hover:border-white/10'
								}`}>
								<span className='text-xl'>{category.icon}</span>
								<span className='font-medium'>
									{category.name}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Área principal con filtros laterales y productos */}
			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Panel de filtros - versión desktop y mobile */}
				<AnimatePresence>
					{isFilterOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							className='lg:hidden overflow-hidden'
							transition={{ duration: 0.3 }}>
							<div className='mb-6 space-y-6'>
								{/* Filtros mobile */}
								<FiltersContent
									priceRange={priceRange}
									setPriceRange={setPriceRange}
									sortBy={sortBy}
									setSortBy={setSortBy}
									clearFilters={clearFilters}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Filtros - versión desktop (siempre visible) */}
				<div className='hidden lg:block lg:w-64 space-y-6 flex-shrink-0'>
					<FiltersContent
						priceRange={priceRange}
						setPriceRange={setPriceRange}
						sortBy={sortBy}
						setSortBy={setSortBy}
						clearFilters={clearFilters}
					/>
				</div>

				{/* Área de productos */}
				<div className='flex-1'>
					{isLoading ? (
						<LoadingState />
					) : hasProducts ? (
						<>
							{/* Contador de resultados */}
							<div className='mb-6 text-light/60 text-sm'>
								Mostrando{' '}
								<span className='text-secondary font-medium'>
									{products.length}
								</span>{' '}
								productos
							</div>

							{/* Grid de productos */}
							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
								{products.map((product) => (
									<motion.div
										key={product.slug?.current}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4 }}>
										<Product product={product} />
									</motion.div>
								))}
							</div>

							{/* Paginación mejorada */}
							<div className='mt-16 flex justify-center'>
								<div className='flex items-center gap-2 bg-white/5 rounded-xl p-1.5 border border-white/10'>
									<button
										onClick={() =>
											setCurrentPage(
												Math.max(1, currentPage - 1)
											)
										}
										disabled={currentPage === 1}
										className='w-9 h-9 flex items-center justify-center rounded-lg text-light/60 hover:text-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
										aria-label='Previous page'>
										<AiOutlineArrowLeft />
									</button>

									{[1, 2, 3].map((page) => (
										<button
											key={page}
											onClick={() => setCurrentPage(page)}
											className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
												page === currentPage
													? 'bg-gradient-to-r from-accent1 to-accent2 text-light shadow-sm shadow-accent1/20'
													: 'text-light/70 hover:bg-white/10 hover:text-light'
											}`}
											aria-label={`Page ${page}`}
											aria-current={
												page === currentPage
													? 'page'
													: undefined
											}>
											{page}
										</button>
									))}

									<button
										onClick={() =>
											setCurrentPage(
												Math.min(3, currentPage + 1)
											)
										}
										disabled={currentPage === 3}
										className='w-9 h-9 flex items-center justify-center rounded-lg text-light/60 hover:text-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
										aria-label='Next page'>
										<AiOutlineArrowRight />
									</button>
								</div>
							</div>
						</>
					) : (
						<EmptyState
							searchQuery={searchQuery}
							onClearFilters={clearFilters}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

// Componente para el contenido de filtros (reutilizable para mobile y desktop)
function FiltersContent({
	priceRange,
	setPriceRange,
	sortBy,
	setSortBy,
	clearFilters,
}) {
	return (
		<>
			{/* Panel de precio */}
			<div className='bg-glass-dark backdrop-blur-md rounded-xl p-5 border border-glass-border-dark shadow-glass-dark'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-secondary font-medium'>
						Rango de Precio
					</h3>
					<span className='text-accent1 text-sm font-medium'>
						${priceRange[1]}
					</span>
				</div>

				<div className='space-y-4'>
					<input
						type='range'
						min='0'
						max='5000'
						step='100'
						value={priceRange[1]}
						onChange={(e) =>
							setPriceRange([0, parseInt(e.target.value)])
						}
						className='w-full h-2 rounded-full appearance-none bg-white/10 cursor-pointer accent-secondary'
						aria-label='Price range'
					/>

					<div className='flex justify-between items-center'>
						<div className='bg-white/10 px-3 py-1.5 rounded-lg text-light/80 text-sm'>
							${priceRange[0]}
						</div>
						<div className='bg-white/10 px-3 py-1.5 rounded-lg text-light/80 text-sm'>
							${priceRange[1]}
						</div>
					</div>
				</div>
			</div>

			{/* Panel de ordenamiento */}
			<div className='bg-glass-dark backdrop-blur-md rounded-xl p-5 border border-glass-border-dark shadow-glass-dark'>
				<h3 className='text-secondary font-medium mb-4'>Ordenar por</h3>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className='w-full bg-white/10 text-light border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary/50 transition-all duration-300 [&>option]:bg-dark appearance-none cursor-pointer'
					aria-label='Sort products'>
					<option value='featured'>Destacados</option>
					<option value='price-low'>Precio: Menor a Mayor</option>
					<option value='price-high'>Precio: Mayor a Menor</option>
					<option value='newest'>Más Nuevos</option>
				</select>
			</div>

			{/* Botón para limpiar filtros */}
			<button
				onClick={clearFilters}
				className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-light/80 hover:text-light rounded-lg transition-all duration-300'>
				<AiOutlineClear />
				<span>Limpiar filtros</span>
			</button>
		</>
	);
}

// Estado de carga
function LoadingState() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
			{[1, 2, 3, 4, 5, 6].map((item) => (
				<div
					key={item}
					className='animate-pulse rounded-2xl bg-white/5 border border-white/10 h-[350px] overflow-hidden'>
					<div className='h-[65%] bg-white/10'></div>
					<div className='p-4 space-y-3'>
						<div className='h-4 bg-white/10 rounded-full w-3/4'></div>
						<div className='h-4 bg-white/10 rounded-full w-1/2'></div>
						<div className='pt-2 flex justify-between items-center'>
							<div className='h-6 bg-white/10 rounded-full w-1/4'></div>
							<div className='h-6 bg-white/10 rounded-full w-1/4'></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

// Estado vacío
function EmptyState({ searchQuery, onClearFilters }) {
	return (
		<div className='flex flex-col items-center justify-center py-16 space-y-6 text-center'>
			<div className='text-6xl animate-bounce-slow'>🔍</div>
			<h3 className='text-2xl font-medium text-light bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent'>
				No se encontraron productos
			</h3>
			<p className='text-light/70 max-w-md'>
				{searchQuery
					? `No encontramos resultados para "${searchQuery}".`
					: 'No hay productos disponibles con los filtros seleccionados.'}
			</p>
			<button
				onClick={onClearFilters}
				className='px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1'>
				Limpiar filtros
			</button>
		</div>
	);
}

export default ProductList;
