'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineClose,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShoppingCart,
	AiOutlineDelete,
	AiOutlineShop,
	AiOutlineSafety,
	AiOutlineCreditCard,
} from 'react-icons/ai';

function Cart({ isOpen, onClose }) {
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			name: 'Smartwatch Pro X',
			price: 299.99,
			originalPrice: 349.99,
			quantity: 1,
			image: '/products/watch_1.webp',
		},
		{
			id: 2,
			name: 'Auriculares Inalámbricos XSound',
			price: 129.99,
			originalPrice: 149.99,
			quantity: 1,
			image: '/products/headphones_1.webp',
		},
	]);

	// Handle quantity changes
	const updateQuantity = (id, newQuantity) => {
		if (newQuantity < 1) return;
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	// Remove item from cart
	const removeItem = (id) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	// Calculate cart totals
	const subtotal = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const shipping = subtotal > 999 ? 0 : 15.99;
	const tax = subtotal * 0.18; // 18% IGV
	const total = subtotal + shipping + tax;

	// Calculate total savings
	const totalSavings = cartItems.reduce(
		(savings, item) =>
			savings + (item.originalPrice - item.price) * item.quantity,
		0
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className='fixed inset-0 bg-dark/70 backdrop-blur-sm z-40'
					/>

					{/* Cart panel */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{
							type: 'tween',
							duration: 0.3,
							ease: 'easeInOut',
						}}
						className='fixed top-0 right-0 h-screen w-full md:w-[450px] bg-glass-dark backdrop-blur-xl border-l border-glass-border-dark shadow-glass-dark text-light z-50 flex flex-col'>
						{/* Header */}
						<div className='p-5 border-b border-white/10 bg-white/5'>
							<div className='flex justify-between items-center'>
								<div className='flex items-center gap-3'>
									<div className='w-10 h-10 rounded-full bg-gradient-to-r from-accent1 to-accent2 flex items-center justify-center shadow-lg'>
										<AiOutlineShoppingCart className='text-xl text-light' />
									</div>
									<div>
										<h2 className='text-xl font-bold'>
											Tu Carrito
										</h2>
										<p className='text-light/60 text-sm'>
											{cartItems.length}{' '}
											{cartItems.length === 1
												? 'producto'
												: 'productos'}
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className='w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-105'
									aria-label='Cerrar carrito'>
									<AiOutlineClose className='text-lg' />
								</button>
							</div>
						</div>

						{/* Cart items */}
						<div className='flex-1 overflow-y-auto scrollbar-hide py-4 px-5'>
							{cartItems.length > 0 ? (
								<AnimatePresence>
									{cartItems.map((item) => (
										<motion.div
											key={item.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, scale: 0.95 }}
											transition={{ duration: 0.3 }}
											className='mb-4 group'>
											<div className='flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 border border-white/5 transition-all duration-300'>
												{/* Product image with glass effect */}
												<div className='relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent2/10 border border-white/10'>
													<Image
														src={item.image}
														alt={item.name}
														fill
														className='object-cover p-1'
														sizes='96px'
													/>
												</div>

												<div className='flex-1'>
													{/* Product name and price */}
													<div className='flex justify-between'>
														<h3 className='font-medium text-light/90 line-clamp-1'>
															{item.name}
														</h3>
														<button
															onClick={() =>
																removeItem(
																	item.id
																)
															}
															className='text-light/40 hover:text-error transition-colors duration-300 p-1 opacity-0 group-hover:opacity-100'
															aria-label='Eliminar producto'>
															<AiOutlineDelete />
														</button>
													</div>

													{/* Price and savings */}
													<div className='flex items-baseline gap-2 mt-1'>
														<span className='font-bold text-accent1'>
															${item.price}
														</span>
														{item.originalPrice >
															item.price && (
															<span className='text-light/40 text-sm line-through'>
																$
																{
																	item.originalPrice
																}
															</span>
														)}
														{item.originalPrice >
															item.price && (
															<span className='text-xs text-success bg-success/10 px-1.5 py-0.5 rounded'>
																-
																{Math.round(
																	(1 -
																		item.price /
																			item.originalPrice) *
																		100
																)}
																%
															</span>
														)}
													</div>

													{/* Quantity control */}
													<div className='flex items-center gap-4 mt-3'>
														<div className='flex items-center overflow-hidden rounded-lg bg-white/5 border border-white/10'>
															<button
																onClick={() =>
																	updateQuantity(
																		item.id,
																		item.quantity -
																			1
																	)
																}
																className='p-2 hover:bg-white/10 transition-colors'
																aria-label='Decrementar cantidad'>
																<AiOutlineMinus className='w-3.5 h-3.5 text-light/70' />
															</button>
															<span className='w-8 text-center text-sm'>
																{item.quantity}
															</span>
															<button
																onClick={() =>
																	updateQuantity(
																		item.id,
																		item.quantity +
																			1
																	)
																}
																className='p-2 hover:bg-white/10 transition-colors'
																aria-label='Incrementar cantidad'>
																<AiOutlinePlus className='w-3.5 h-3.5 text-light/70' />
															</button>
														</div>
														<span className='text-light/50 text-sm'>
															$
															{(
																item.price *
																item.quantity
															).toFixed(2)}
														</span>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							) : (
								<EmptyCart onClose={onClose} />
							)}
						</div>

						{/* Cart footer */}
						{cartItems.length > 0 && (
							<div className='border-t border-white/10 bg-white/5'>
								{/* Order summary */}
								<div className='px-5 pt-4 pb-2'>
									<div className='space-y-1.5 text-sm'>
										<div className='flex justify-between'>
											<span className='text-light/60'>
												Subtotal
											</span>
											<span>${subtotal.toFixed(2)}</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-light/60'>
												Envío{' '}
												{subtotal > 999 && (
													<span className='text-success'>
														(Gratis)
													</span>
												)}
											</span>
											<span>
												{shipping > 0
													? `$${shipping.toFixed(2)}`
													: 'Gratis'}
											</span>
										</div>
										<div className='flex justify-between'>
											<span className='text-light/60'>
												IGV (18%)
											</span>
											<span>${tax.toFixed(2)}</span>
										</div>
										{totalSavings > 0 && (
											<div className='flex justify-between text-success py-1'>
												<span>Tu ahorro</span>
												<span>
													${totalSavings.toFixed(2)}
												</span>
											</div>
										)}
									</div>

									<div className='flex justify-between font-bold text-lg mt-3 pt-3 border-t border-white/10'>
										<span>Total</span>
										<span className='bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
											${total.toFixed(2)}
										</span>
									</div>
								</div>

								{/* Action buttons */}
								<div className='p-5 space-y-3'>
									<Link href='/checkout' onClick={onClose}>
										<button className='w-full h-12 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-accent1/20 flex items-center justify-center gap-2'>
											<AiOutlineCreditCard className='text-xl' />
											<span>Proceder al Pago</span>
										</button>
									</Link>

									{/* Nuevo botón para ir al carrito completo */}
									<Link href='/cart' onClick={onClose}>
										<button className='w-full h-11 bg-white/10 hover:bg-white/15 text-light/90 rounded-xl transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 mt-3'>
											<AiOutlineShoppingCart className='text-sm' />
											<span>Gestionar Carrito</span>
										</button>
									</Link>

									<button
										onClick={onClose}
										className='w-full h-11 bg-white/5 hover:bg-white/10 text-light/90 rounded-xl transition-all duration-300 border border-white/10 flex items-center justify-center gap-2'>
										<AiOutlineLeft className='text-sm' />
										<span>Continuar Comprando</span>
									</button>
								</div>

								{/* Trust badges */}
								<div className='px-5 pb-6 pt-1'>
									<div className='flex items-center justify-center gap-4 text-light/40 text-xs'>
										<div className='flex items-center gap-1'>
											<AiOutlineSafety className='text-secondary' />
											<span>Pago Seguro</span>
										</div>
										<div className='flex items-center gap-1'>
											<AiOutlineShop className='text-secondary' />
											<span>Envío Rápido</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

// Empty cart component
function EmptyCart({ onClose }) {
	return (
		<div className='flex flex-col items-center justify-center h-full py-12 text-center px-6'>
			<div className='w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4'>
				<AiOutlineShoppingCart className='text-4xl text-light/30' />
			</div>
			<h3 className='text-xl font-medium mb-2'>Tu carrito está vacío</h3>
			<p className='text-light/50 mb-8'>
				Parece que aún no has añadido productos a tu carrito
			</p>
			<Link href='/products' onClick={onClose}>
				<button className='px-6 py-3 bg-gradient-to-r from-secondary to-accent1 text-light rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg'>
					Explorar Productos
				</button>
			</Link>
		</div>
	);
}

export default Cart;
