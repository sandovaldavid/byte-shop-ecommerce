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
		<Link href={productUrl}>
			<div className='group relative overflow-hidden rounded-2xl bg-black/30 p-6 transition-all duration-500 hover:bg-black/20 dark:hover:bg-black/50 hover:shadow-xl hover:shadow-accent1/20 dark:hover:shadow-accent2/10 h-full border border-white/10 dark:border-white/5 backdrop-blur-md'>
				{/* Badge de descuento mejorado */}
				{product.discount && (
					<div className='absolute top-6 left-6 z-10 rounded-full bg-gradient-to-r from-accent1 via-accent2 to-accent1 bg-[length:200%_100%] animate-gradient px-4 py-1.5 text-sm font-medium text-light shadow-lg shadow-accent1/30 dark:shadow-accent2/30'>
						-{product.discount}%
					</div>
				)}

				{/* Contenedor de imagen con efectos mejorados */}
				<div className='relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent2/10 dark:from-primary/20 dark:to-accent2/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500'>
					{/* Efecto de brillo tecnológico mejorado */}
					<div className='absolute inset-0 bg-gradient-to-tr from-secondary/30 via-transparent to-accent1/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

					<Image
						src={productImage}
						alt={product.name || 'Producto no disponible'}
						fill
						className='object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2'
					/>

					{/* Overlay cyberpunk mejorado */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/10 via-black/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100'>
						<div className='absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shine'></div>
					</div>

					{/* Botón con efecto neón mejorado */}
					<button className='absolute bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-6 py-3 bg-gradient-to-r from-accent1 via-accent2 to-accent1 bg-[length:200%_100%] animate-gradient text-sm font-medium text-light opacity-0 transition-all duration-500 hover:shadow-lg           over:shadow-accent1/50 dark:hover:shadow-accent2/50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 border border-white/20'>
						Ver Detalles
					</button>
				</div>

				{/* Contenido de texto mejorado */}
				<div className='space-y-4'>
					<div className='flex items-center justify-between gap-4'>
						<h3 className='text-xl font-medium text-light dark:text-light/90 transition-colors group-hover:text-secondary dark:group-hover:text-secondary/90 line-clamp-2 group-hover:line-clamp-none'>
							{product.name || 'Producto no disponible'}
						</h3>
						<span
							className={`text-xs px-3 py-1.5 rounded-full font-medium ${
								product.inStock
									? 'bg-success/20 text-success dark:bg-success/30 dark:text-success/90'
									: 'bg-error/20 text-error dark:bg-error/30 dark:text-error/90'
							}`}>
							{product.inStock ? 'En Stock' : 'Agotado'}
						</span>
					</div>

					<div className='flex items-center justify-between pt-2'>
						<div className='flex items-center gap-2'>
							<span className='text-2xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent group-hover:from-accent1 group-hover:to-accent2 transition-all duration-500'>
								${product.price || '0.00'}
							</span>
							{product.oldPrice && (
								<span className='text-sm text-light/40 dark:text-light/30 line-through'>
									${product.oldPrice}
								</span>
							)}
						</div>

						{/* Rating con estilo tech mejorado */}
						<div className='flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/20 dark:bg-secondary/30 border border-secondary/20 dark:border-secondary/10'>
							<span className='text-secondary dark:text-secondary/90'>
								★
							</span>
							<span className='text-sm font-medium text-secondary dark:text-secondary/90'>
								{product.rating || '4.5'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Product;
