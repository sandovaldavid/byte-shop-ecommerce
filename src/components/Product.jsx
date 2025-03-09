import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/client';

function Product({ product }) {
	if (!product) return null;

	const productUrl = product.slug?.current
		? `/products/${product.slug.current}`
		: '#';
	const productImage =
		product?.images && product.images.length > 0
			? urlFor(product.images[0]).url()
			: 'https://placehold.co/600x400.png';

	return (
		<div className='group h-full'>
			<Link
				href={productUrl}
				className='block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-2xl'>
				<article className='relative overflow-hidden rounded-2xl bg-dark/30 dark:bg-dark/40 backdrop-blur-md border border-white/10 dark:border-white/5 h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:shadow-accent1/10 dark:hover:shadow-accent2/5'>
					{/* Imagen y área superior */}
					<div className='relative aspect-square w-full overflow-hidden rounded-t-xl'>
						{/* Badge de descuento */}
						{product.discount && (
							<div className='absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-accent1 to-accent2 px-3 py-1 text-xs font-medium text-light shadow-lg shadow-accent1/20 dark:shadow-accent2/20 flex items-center justify-center'>
								<span className='animate-pulse'>
									-{product.discount}%
								</span>
							</div>
						)}

						{/* Badge de stock */}
						<div
							className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-medium flex items-center justify-center 
              ${
					product.inStock
						? 'bg-success/20 text-success border border-success/30'
						: 'bg-error/20 text-error border border-error/30'
				}`}>
							<span
								className={`w-1.5 h-1.5 rounded-full mr-1 ${product.inStock ? 'bg-success animate-pulse' : 'bg-error'}`}></span>
							{product.inStock ? 'En Stock' : 'Agotado'}
						</div>

						{/* Imagen con degradado base */}
						<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-accent2/5 dark:from-primary/10 dark:to-accent2/10'></div>

						{/* Imagen principal */}
						<Image
							src={productImage}
							alt={product.name || 'Producto no disponible'}
							fill
							sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
							className='object-cover transition-all duration-500 group-hover:scale-105'
						/>

						{/* Overlay en hover */}
						<div className='absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300'></div>

						{/* Efecto shine */}
						<div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500'>
							<div className='absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shine'></div>
						</div>

						{/* Botón "Ver Detalles" */}
						<div className='absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'>
							<div className='bg-gradient-to-r from-accent1/90 to-accent2/90 backdrop-blur-sm text-center py-2.5 rounded-lg text-light text-sm font-medium shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 hover:shadow-accent1/30 dark:hover:shadow-accent2/30 border border-white/10'>
								Ver Detalles
							</div>
						</div>
					</div>

					{/* Contenido de texto */}
					<div className='flex flex-col flex-grow p-4 space-y-3'>
						{/* Título y precio */}
						<div className='flex-grow'>
							<h3 className='font-medium text-lg text-light dark:text-light/90 leading-tight line-clamp-2 group-hover:text-secondary dark:group-hover:text-secondary/90 transition-colors duration-300'>
								{product.name || 'Producto no disponible'}
							</h3>
						</div>

						{/* Parte inferior con precio y rating */}
						<div className='flex items-center justify-between mt-auto pt-2 border-t border-white/5'>
							<div className='flex flex-col'>
								<span className='text-xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
									${product.price || '0.00'}
								</span>
								{product.oldPrice && (
									<span className='text-xs text-light/50 dark:text-light/40 line-through'>
										${product.oldPrice}
									</span>
								)}
							</div>

							{/* Rating más elegante */}
							<div className='flex items-center bg-dark/20 dark:bg-dark/40 rounded-lg px-2 py-1'>
								<div className='flex items-center'>
									{[1, 2, 3, 4, 5].map((star) => (
										<svg
											key={star}
											xmlns='http://www.w3.org/2000/svg'
											className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating || 4.5) ? 'text-secondary' : 'text-light/20'}`}
											fill='currentColor'
											viewBox='0 0 24 24'>
											<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
										</svg>
									))}
								</div>
								<span className='ml-1 text-xs font-medium text-light/70'>
									{product.rating || '4.5'}
								</span>
							</div>
						</div>
					</div>
				</article>
			</Link>
		</div>
	);
}

export default Product;
