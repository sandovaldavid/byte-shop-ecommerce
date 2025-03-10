'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineShoppingCart,
	AiOutlineHeart,
	AiOutlineLeft,
	AiOutlineCheck,
	AiOutlineStar,
	AiOutlineShareAlt,
	AiOutlineRight,
} from 'react-icons/ai';
import { client, urlFor } from '@/lib/client';
import { Loading, NotFound } from '@/components';

function ProductDetail({ params }) {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [addedToCart, setAddedToCart] = useState(false);
	const [addedToWishlist, setAddedToWishlist] = useState(false);
	const [currentTab, setCurrentTab] = useState('description');

	const { slug } = React.use(params);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const query = `*[_type == "product" && slug.current == $slug][0]`;
				const productData = await client.fetch(query, { slug });
				setProduct(productData);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching product:', error);
				setLoading(false);
			}
		};

		if (slug) {
			fetchProduct();
		}
	}, [slug]);

	const handleAddToCart = () => {
		setAddedToCart(true);
		setTimeout(() => {
			setAddedToCart(false);
		}, 2000);
		// TODO: Add actual cart functionality here
	};

	const handleAddToWishlist = () => {
		setAddedToWishlist(!addedToWishlist);
		// TODO: Add actual wishlist functionality here
	};

	if (loading) {
		return <Loading />;
	}

	if (!product) {
		return <NotFound />;
	}

	const productImages = product.images || [];
	const currentImage = productImages[selectedImage] || productImages[0];

	// Calculate discount percentage if not provided
	const discountPercentage =
		product.discount ||
		(product.oldPrice
			? Math.round(
					((product.oldPrice - product.price) / product.oldPrice) *
						100
				)
			: 0);

	return (
		<div className='min-h-screen bg-gradient-to-b from-dark/95 to-dark/90 py-8 md:py-12'>
			{/* Background effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-30 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-30 pointer-events-none'></div>

			{/* Main content container */}
			<div className='max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 relative z-10 mt-6'>
				{/* Breadcrumb navigation */}
				<nav className='mb-6'>
					<ol className='flex items-center space-x-2 text-sm text-light/60'>
						<li>
							<Link
								href='/'
								className='hover:text-secondary transition-colors'>
								Inicio
							</Link>
						</li>
						<li className='flex items-center'>
							<span className='mx-2'>/</span>
							<Link
								href='/products'
								className='hover:text-secondary transition-colors'>
								Productos
							</Link>
						</li>
						<li className='flex items-center'>
							<span className='mx-2'>/</span>
							<span className='text-light/80'>
								{product.name}
							</span>
						</li>
					</ol>
				</nav>

				{/* Product display container */}
				<div className='bg-glass-dark backdrop-blur-md border border-glass-border-dark rounded-2xl overflow-hidden shadow-glass-dark'>
					<div className='flex flex-col lg:flex-row'>
						{/* Left column: Product images */}
						<div className='lg:w-1/2 p-6 lg:p-8'>
							{/* Main image with zoom effect */}
							<div className='relative aspect-square rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 group'>
								<div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-accent2/5'></div>

								<AnimatePresence mode='wait'>
									<motion.div
										key={selectedImage}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='absolute inset-0'>
										{currentImage && (
											<Image
												src={urlFor(currentImage).url()}
												alt={product.name}
												fill
												sizes='(max-width: 768px) 100vw, 50vw'
												className='object-contain transform scale-90 group-hover:scale-100 transition-transform duration-500 p-4'
												priority
											/>
										)}
									</motion.div>
								</AnimatePresence>

								{/* Interactive navigation arrows for gallery */}
								{productImages.length > 1 && (
									<>
										<button
											onClick={() =>
												setSelectedImage((prev) =>
													prev === 0
														? productImages.length -
															1
														: prev - 1
												)
											}
											className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark/80 flex items-center justify-center text-light/80 hover:text-light hover:bg-dark/90 transition-all opacity-0 group-hover:opacity-100'
											aria-label='Previous image'>
											<AiOutlineLeft />
										</button>
										<button
											onClick={() =>
												setSelectedImage((prev) =>
													prev ===
													productImages.length - 1
														? 0
														: prev + 1
												)
											}
											className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-dark/80 flex items-center justify-center text-light/80 hover:text-light hover:bg-dark/90 transition-all opacity-0 group-hover:opacity-100'
											aria-label='Next image'>
											<AiOutlineRight />
										</button>
									</>
								)}

								{/* Discount badge */}
								{discountPercentage > 0 && (
									<div className='absolute top-4 left-4 bg-gradient-to-r from-accent1 to-accent2 text-light px-3 py-1.5 rounded-full backdrop-blur-sm text-sm font-medium shadow-lg animate-pulse-slow'>
										-{discountPercentage}% OFF
									</div>
								)}
							</div>

							{/* Thumbnail gallery */}
							{productImages.length > 1 && (
								<div className='grid grid-cols-5 gap-3 mt-4'>
									{productImages.map((image, index) => (
										<button
											key={index}
											onClick={() =>
												setSelectedImage(index)
											}
											className={`relative aspect-square rounded-lg overflow-hidden transition-all transform ${
												selectedImage === index
													? 'ring-2 ring-accent1 scale-105 shadow-lg shadow-accent1/20'
													: 'ring-1 ring-white/10 hover:ring-white/30 hover:-translate-y-1'
											}`}
											aria-label={`View image ${index + 1}`}>
											<Image
												src={urlFor(image).url()}
												alt={`${product.name} ${index + 1}`}
												fill
												sizes='(max-width: 768px) 20vw, 10vw'
												className='object-cover'
											/>
											<div
												className={`absolute inset-0 bg-dark/40 ${selectedImage === index ? 'opacity-0' : 'opacity-50'}`}></div>
										</button>
									))}
								</div>
							)}
						</div>

						{/* Right column: Product info */}
						<div className='lg:w-1/2 p-6 lg:p-8 bg-dark/40'>
							<div className='h-full flex flex-col'>
								{/* Product header */}
								<div className='mb-6'>
									{/* Product category */}
									<div className='text-secondary text-sm font-medium mb-2'>
										{product.category || 'Tecnología'}
									</div>

									{/* Product name */}
									<h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent mb-3'>
										{product.name}
									</h1>

									{/* Product meta info */}
									<div className='flex flex-wrap items-center gap-4 text-sm'>
										{/* Rating */}
										<div className='flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md'>
											<AiOutlineStar className='text-secondary' />
											<span className='font-medium'>
												{product.rating}
											</span>
											<span className='text-light/50'>
												({product.reviews || '24'}{' '}
												reseñas)
											</span>
										</div>

										{/* Stock status */}
										<div
											className={`flex items-center gap-1 px-2 py-1 rounded-md ${
												product.inStock
													? 'bg-success/10 text-success'
													: 'bg-error/10 text-error'
											}`}>
											<span
												className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-success animate-pulse' : 'bg-error'}`}></span>
											<span className='font-medium'>
												{product.inStock
													? 'En Stock'
													: 'Agotado'}
											</span>
										</div>

										{/* SKU */}
										<div className='text-light/50'>
											REF:{' '}
											{product.sku ||
												`TB-${product._id?.substring(0, 6)}`}
										</div>
									</div>
								</div>

								{/* Tabs navigation for content sections */}
								<div className='mb-6 border-b border-white/10'>
									<div className='flex space-x-4'>
										{[
											'description',
											'specs',
											'shipping',
										].map((tab) => (
											<button
												key={tab}
												onClick={() =>
													setCurrentTab(tab)
												}
												className={`pb-2 px-1 transition-all ${
													currentTab === tab
														? 'text-secondary border-b-2 border-secondary font-medium'
														: 'text-light/60 hover:text-light'
												}`}>
												{tab === 'description' &&
													'Descripción'}
												{tab === 'specs' &&
													'Especificaciones'}
												{tab === 'shipping' && 'Envío'}
											</button>
										))}
									</div>
								</div>

								{/* Tab content */}
								<div className='flex-grow overflow-y-auto scrollbar-hide mb-6'>
									<AnimatePresence mode='wait'>
										{currentTab === 'description' && (
											<motion.div
												key='description'
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}>
												<p className='text-light/80 leading-relaxed'>
													{product.description}
												</p>
											</motion.div>
										)}

										{currentTab === 'specs' && (
											<motion.div
												key='specs'
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}>
												<ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
													{product.specs?.map(
														(spec, index) => (
															<li
																key={index}
																className='flex items-start gap-2 text-light/80 bg-white/5 rounded-lg p-2.5 backdrop-blur-sm'>
																<span className='w-2 h-2 rounded-full bg-accent1 mt-1.5'></span>
																<span>
																	{spec}
																</span>
															</li>
														)
													)}
												</ul>
											</motion.div>
										)}

										{currentTab === 'shipping' && (
											<motion.div
												key='shipping'
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}>
												<div className='space-y-4 text-light/80'>
													<div className='flex items-start gap-3'>
														<div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center'>
															<AiOutlineCheck className='text-secondary' />
														</div>
														<div>
															<h4 className='font-medium text-light'>
																Envío gratuito
															</h4>
															<p className='text-sm'>
																En compras
																mayores a $999
															</p>
														</div>
													</div>
													<div className='flex items-start gap-3'>
														<div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center'>
															<AiOutlineCheck className='text-secondary' />
														</div>
														<div>
															<h4 className='font-medium text-light'>
																Entrega rápida
															</h4>
															<p className='text-sm'>
																2-3 días
																laborables
															</p>
														</div>
													</div>
													<div className='flex items-start gap-3'>
														<div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center'>
															<AiOutlineCheck className='text-secondary' />
														</div>
														<div>
															<h4 className='font-medium text-light'>
																Garantía
															</h4>
															<p className='text-sm'>
																12 meses de
																garantía del
																fabricante
															</p>
														</div>
													</div>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								{/* Price section */}
								<div className='mb-6 bg-white/5 p-4 rounded-xl backdrop-blur-sm'>
									<div className='flex items-center gap-4'>
										<span className='text-4xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
											${product.price}
										</span>
										{product.oldPrice && (
											<span className='text-xl text-light/50 line-through'>
												${product.oldPrice}
											</span>
										)}
										{discountPercentage > 0 && (
											<span className='bg-accent1/10 text-accent1 px-2 py-0.5 rounded text-sm font-medium'>
												Ahorras $
												{(
													product.oldPrice -
													product.price
												).toFixed(2)}
											</span>
										)}
									</div>
									<div className='text-sm text-light/50 mt-1'>
										Impuestos incluidos
									</div>
								</div>

								{/* Action section */}
								<div className='mt-auto space-y-4'>
									{/* Quantity selector and wishlist */}
									<div className='flex items-center justify-between flex-wrap gap-4'>
										<div className='flex items-center gap-2 bg-glass-dark rounded-lg border border-glass-border-dark overflow-hidden'>
											<button
												onClick={() =>
													setQuantity(
														Math.max(
															1,
															quantity - 1
														)
													)
												}
												disabled={quantity <= 1}
												className='w-10 h-10 flex items-center justify-center text-light/70 hover:text-accent1 disabled:opacity-50 disabled:cursor-not-allowed transition-all'>
												<AiOutlineMinus />
											</button>
											<span className='text-light min-w-[40px] text-center font-medium'>
												{quantity}
											</span>
											<button
												onClick={() =>
													setQuantity(quantity + 1)
												}
												className='w-10 h-10 flex items-center justify-center text-light/70 hover:text-accent1 transition-colors'>
												<AiOutlinePlus />
											</button>
										</div>

										<button
											onClick={handleAddToWishlist}
											className={`flex items-center gap-2 py-2.5 px-4 rounded-lg transition-all ${
												addedToWishlist
													? 'bg-accent1/20 text-accent1 border border-accent1/30'
													: 'bg-white/5 text-light/80 hover:text-light border border-white/10'
											}`}>
											<AiOutlineHeart
												className={`text-xl ${addedToWishlist ? 'fill-accent1' : ''}`}
											/>
											<span className='hidden sm:inline'>
												{addedToWishlist
													? 'En favoritos'
													: 'Añadir a favoritos'}
											</span>
										</button>

										<button className='flex items-center gap-2 py-2.5 px-4 bg-white/5 text-light/80 hover:text-light rounded-lg border border-white/10 transition-all'>
											<AiOutlineShareAlt className='text-xl' />
											<span className='hidden sm:inline'>
												Compartir
											</span>
										</button>
									</div>

									{/* Add to cart button */}
									<button
										onClick={handleAddToCart}
										disabled={!product.inStock}
										className={`w-full h-14 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group ${
											!product.inStock
												? 'bg-white/10 cursor-not-allowed text-light/50'
												: addedToCart
													? 'bg-success text-dark font-medium'
													: 'bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light font-medium hover:shadow-xl hover:shadow-accent1/20 transform hover:scale-[1.01] active:scale-[0.99]'
										}`}>
										{addedToCart ? (
											<>
												<AiOutlineCheck className='text-xl' />
												<span>
													¡Añadido al carrito!
												</span>
											</>
										) : (
											<>
												<AiOutlineShoppingCart className='text-xl group-hover:scale-110 transition-transform' />
												<span>
													{product.inStock
														? 'Añadir al carrito'
														: 'Producto agotado'}
												</span>
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Related products section could go here */}
			</div>
		</div>
	);
}

export default ProductDetail;
