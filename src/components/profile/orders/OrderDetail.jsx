import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
	AiOutlineCalendar,
	AiOutlineCreditCard,
	AiOutlineEnvironment,
	AiOutlinePhone,
	AiOutlineUser,
	AiOutlineShoppingCart,
	AiOutlineTruck,
	AiOutlineSync,
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineClockCircle,
	AiOutlineDownload,
	AiOutlineLeft,
	AiOutlineMessage,
	AiOutlineTag,
	AiOutlinePrinter,
	AiOutlineShareAlt,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import OrderStatus from './OrderStatus';
import OrderTimeline from './OrderTimeline';

// Status configuration map
const statusConfig = {
	completed: {
		color: 'bg-success/20 text-success border-success/30',
		icon: <AiOutlineCheckCircle className='text-success' />,
		gradient: 'from-success/30 to-success/10',
		text: 'Completado',
	},
	processing: {
		color: 'bg-primary/20 text-primary border-primary/30',
		icon: <AiOutlineSync className='text-primary animate-spin-slow' />,
		gradient: 'from-primary/30 to-primary/10',
		text: 'En procesamiento',
	},
	shipped: {
		color: 'bg-accent2/20 text-accent2 border-accent2/30',
		icon: <AiOutlineTruck className='text-accent2' />,
		gradient: 'from-accent2/30 to-accent2/10',
		text: 'Enviado',
	},
	cancelled: {
		color: 'bg-error/20 text-error border-error/30',
		icon: <AiOutlineCloseCircle className='text-error' />,
		gradient: 'from-error/30 to-error/10',
		text: 'Cancelado',
	},
	pending: {
		color: 'bg-secondary/20 text-secondary border-secondary/30',
		icon: <AiOutlineClockCircle className='text-secondary' />,
		gradient: 'from-secondary/30 to-secondary/10',
		text: 'Pendiente',
	},
};

const OrderDetail = ({
	order = {
		id: 'ORD-12345',
		date: '15/04/2024',
		status: 'processing',
		items: 3,
		total: '$129.99',
		subtotal: '$119.99',
		shipping: '$10.00',
		taxes: '$0.00',
		paymentMethod: 'Tarjeta terminada en 4242',
		trackingNumber: 'TRACK-123456789',
		shippingAddress: {
			name: 'Juan Pérez',
			address: 'Av. Principal 123',
			city: 'Ciudad de México',
			state: 'CDMX',
			postalCode: '01000',
			country: 'México',
			phone: '+52 55 1234 5678',
		},
		products: [
			{
				id: 'prod-1',
				name: 'Smartphone Galaxy S23',
				price: '$59.99',
				quantity: 1,
				image: '/products/phone.jpg',
				options: 'Color: Negro, Almacenamiento: 128GB',
			},
			{
				id: 'prod-2',
				name: 'Audífonos Bluetooth',
				price: '$29.99',
				quantity: 2,
				image: '/products/headphones.jpg',
				options: 'Color: Blanco',
			},
		],
		timeline: [
			{
				date: '15/04/2024',
				time: '10:30',
				status: 'pending',
				text: 'Pedido recibido',
			},
			{
				date: '15/04/2024',
				time: '14:15',
				status: 'processing',
				text: 'Pago confirmado',
			},
			{
				date: '16/04/2024',
				time: '09:45',
				status: 'processing',
				text: 'En preparación',
			},
		],
	},
	compact = false,
	animated = true,
}) => {
	const status = statusConfig[order.status] || statusConfig.processing;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
	};

	return (
		<motion.div
			className='w-full'
			variants={animated ? containerVariants : {}}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}>
			{/* Efectos decorativos de fondo */}
			<div className='absolute -z-10 top-24 left-4 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-60 pointer-events-none'></div>
			<div className='absolute -z-10 bottom-24 right-4 w-64 h-64 bg-gradient-to-r from-accent1/5 to-accent2/5 rounded-full blur-3xl opacity-60 pointer-events-none'></div>

			{/* Order Header - Cabecera con información principal y acciones */}
			<motion.div
				variants={animated ? itemVariants : {}}
				className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 mb-6'>
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
					{/* Información principal del pedido */}
					<div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
						<div
							className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${status.color}`}>
							{status.icon}
						</div>

						<div>
							<h1 className='text-xl sm:text-2xl font-bold text-light'>
								{order.id}
								<span className='ml-2 text-sm font-normal text-light/60'>
									({order.items}{' '}
									{order.items === 1
										? 'artículo'
										: 'artículos'}
									)
								</span>
							</h1>

							<div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-light/70'>
								<div className='flex items-center gap-1.5'>
									<AiOutlineCalendar className='text-secondary/80' />
									<span>{order.date}</span>
								</div>

								<div className='flex items-center gap-1'>
									<span
										className={`w-2 h-2 rounded-full ${
											order.status === 'completed'
												? 'bg-success'
												: order.status === 'cancelled'
													? 'bg-error'
													: order.status === 'shipped'
														? 'bg-accent2'
														: 'bg-primary animate-pulse'
										}`}></span>
									<span className='font-medium'>
										{status.text}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Acciones principales */}
					<div className='flex flex-wrap gap-2 w-full sm:w-auto'>
						<Link
							href='/profile/orders'
							className='flex-1 sm:flex-initial'>
							<button className='w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-light/90 text-sm'>
								<AiOutlineLeft size={16} />
								<span>Volver a pedidos</span>
							</button>
						</Link>

						<div className='flex-1 sm:flex-initial flex items-center gap-2'>
							<button className='w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-secondary/20 to-primary/20 hover:from-secondary/30 hover:to-primary/30 border border-white/10 transition-all duration-300 text-light text-sm'>
								<AiOutlineDownload size={16} />
								<span>Factura</span>
							</button>

							<div className='hidden sm:flex gap-1'>
								<button className='w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-light/70 hover:text-light'>
									<AiOutlinePrinter size={18} />
								</button>

								<button className='w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-light/70 hover:text-light'>
									<AiOutlineShareAlt size={18} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Order Status - Vista rápida del estado y progreso */}
			<motion.div
				variants={animated ? itemVariants : {}}
				className='mb-6'>
				{/* Usar el componente OrderTimeline para móvil y OrderStatus para desktop */}
				<div className='block md:hidden'>
					<OrderTimeline
						events={order.timeline}
						currentStatus={order.status}
						vertical={true}
						animated={animated}
					/>
				</div>

				<div className='hidden md:block'>
					<OrderStatus
						currentStatus={order.status}
						events={order.timeline}
						showDetails={true}
						animated={animated}
					/>
				</div>
			</motion.div>

			{/* Alerta para pedidos en estados particulares */}
			{(order.status === 'shipped' || order.trackingNumber) && (
				<motion.div
					variants={animated ? itemVariants : {}}
					className={`mb-6 p-4 rounded-xl border ${
						order.status === 'shipped'
							? 'bg-accent2/10 border-accent2/20'
							: order.status === 'cancelled'
								? 'bg-error/10 border-error/20'
								: 'bg-accent1/10 border-accent1/20'
					} flex gap-3 items-center`}>
					<div className='flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-accent2/20 text-accent2 border border-accent2/30'>
						<AiOutlineTruck className='text-xl' />
					</div>

					<div className='flex-1'>
						<h3 className='font-medium text-light mb-0.5'>
							{order.status === 'shipped'
								? 'Tu pedido está en camino'
								: order.status === 'cancelled'
									? 'Pedido cancelado'
									: 'Información de seguimiento'}
						</h3>
						<p className='text-sm text-light/70'>
							{order.trackingNumber
								? `Puedes seguir tu pedido usando el número: ${order.trackingNumber}`
								: order.status === 'cancelled'
									? 'Este pedido ha sido cancelado. Contacta a soporte si crees que es un error.'
									: 'Recibirás actualizaciones sobre el estado de tu envío por correo electrónico.'}
						</p>
					</div>

					{order.trackingNumber && (
						<div className='hidden sm:block'>
							<button className='px-3 py-1.5 rounded-lg bg-accent2/20 hover:bg-accent2/30 text-accent2 text-sm transition-colors flex items-center gap-1.5'>
								<AiOutlineSync size={14} />
								<span>Seguir</span>
							</button>
						</div>
					)}
				</motion.div>
			)}

			{/* Order Content Columns */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Order Products - Takes 2 columns on large screens */}
				<motion.div
					variants={animated ? itemVariants : {}}
					className='lg:col-span-2 space-y-6'>
					{/* Productos */}
					<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden'>
						<div className='p-4 sm:p-6'>
							<h2 className='flex items-center gap-2 text-lg font-semibold text-light mb-4'>
								<AiOutlineShoppingCart />
								<span>Productos Adquiridos</span>
							</h2>

							<div className='divide-y divide-white/10'>
								{order.products.map((product) => (
									<div
										key={product.id}
										className='py-4 first:pt-0 last:pb-0'>
										<div className='flex gap-3'>
											<div className='w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-lg overflow-hidden flex-shrink-0'>
												{product.image ? (
													<Image
														src={product.image}
														alt={product.name}
														width={80}
														height={80}
														className='w-full h-full object-cover'
													/>
												) : (
													<div className='w-full h-full flex items-center justify-center text-light/30'>
														<AiOutlineShoppingCart
															size={24}
														/>
													</div>
												)}
											</div>

											<div className='flex-1 flex flex-col justify-between'>
												<div>
													<div className='flex justify-between'>
														<h3 className='text-light font-medium'>
															{product.name}
														</h3>
														<span className='text-light font-semibold'>
															{product.price}
														</span>
													</div>

													{/* Etiquetas de características del producto */}
													{product.options && (
														<div className='mt-1.5 flex flex-wrap gap-1.5'>
															{product.options
																.split(', ')
																.map(
																	(
																		option,
																		index
																	) => (
																		<span
																			key={
																				index
																			}
																			className='text-xs px-2 py-0.5 rounded-md bg-white/5 text-light/60 border border-white/5'>
																			{
																				option
																			}
																		</span>
																	)
																)}
														</div>
													)}
												</div>

												<div className='flex justify-between items-end mt-2'>
													<div className='flex items-center gap-1 text-light/70 text-sm'>
														<AiOutlineTag className='text-secondary/80' />
														<span>
															Cant:{' '}
															{product.quantity}
														</span>
													</div>
													<div className='text-light/70 text-sm font-medium'>
														Subtotal: $
														{(
															parseFloat(
																product.price.replace(
																	'$',
																	''
																)
															) * product.quantity
														).toFixed(2)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Order Summary - Resumen financiero */}
					<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden'>
						<div className='p-4 sm:p-6'>
							<h2 className='flex items-center gap-2 text-lg font-semibold text-light mb-4'>
								<AiOutlineCreditCard />
								<span>Resumen de Pago</span>
							</h2>

							<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
								{/* Desglose de costos */}
								<div className='space-y-2'>
									<div className='flex justify-between items-center text-sm'>
										<span className='text-light/70'>
											Subtotal
										</span>
										<span className='text-light'>
											{order.subtotal}
										</span>
									</div>

									<div className='flex justify-between items-center text-sm'>
										<span className='text-light/70'>
											Envío
										</span>
										<span className='text-light'>
											{order.shipping}
										</span>
									</div>

									{order.taxes !== '$0.00' && (
										<div className='flex justify-between items-center text-sm'>
											<span className='text-light/70'>
												Impuestos
											</span>
											<span className='text-light'>
												{order.taxes}
											</span>
										</div>
									)}

									<div className='h-px bg-white/10 my-2'></div>

									<div className='flex justify-between items-center'>
										<span className='text-light font-medium'>
											Total
										</span>
										<span className='text-lg font-bold text-light'>
											{order.total}
										</span>
									</div>
								</div>

								{/* Método de pago */}
								<div className='bg-white/5 rounded-xl p-4 flex flex-col justify-between'>
									<div className='flex items-center gap-3 mb-3'>
										<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center'>
											<AiOutlineCreditCard className='text-light text-xl' />
										</div>
										<div>
											<div className='text-sm text-light/60'>
												Método de pago
											</div>
											<div className='text-light font-medium'>
												{order.paymentMethod}
											</div>
										</div>
									</div>

									<div className='flex justify-between items-center mt-auto'>
										<span className='text-sm text-light/70'>
											Estado
										</span>
										<span
											className={`px-2 py-0.5 rounded-full text-xs ${
												order.status === 'cancelled'
													? 'bg-error/20 text-error'
													: 'bg-success/20 text-success'
											}`}>
											{order.status === 'cancelled'
												? 'No pagado'
												: 'Pagado'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Order Side Information - Columna de información adicional */}
				<motion.div
					variants={animated ? itemVariants : {}}
					className='space-y-6'>
					{/* Shipping Address */}
					<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6'>
						<h2 className='flex items-center gap-2 text-lg font-semibold text-light mb-4'>
							<AiOutlineTruck />
							<span>Dirección de Envío</span>
						</h2>

						<div className='p-4 border border-white/10 rounded-lg bg-white/5'>
							<div className='flex flex-col gap-2 text-light'>
								<div className='font-medium'>
									{order.shippingAddress.name}
								</div>
								<div>{order.shippingAddress.address}</div>
								<div>
									{order.shippingAddress.city},{' '}
									{order.shippingAddress.state}{' '}
									{order.shippingAddress.postalCode}
								</div>
								<div>{order.shippingAddress.country}</div>
								<div className='flex items-center gap-2 mt-1 text-light/70'>
									<AiOutlinePhone size={14} />
									<span>{order.shippingAddress.phone}</span>
								</div>
							</div>
						</div>

						{/* Nota del pedido */}
						<div className='mt-4 flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10 text-sm'>
							<AiOutlineInfoCircle className='text-secondary mt-0.5' />
							<div className='text-light/70'>
								Las entregas se realizan en días hábiles entre
								9:00 AM y 7:00 PM.
							</div>
						</div>
					</div>

					{/* Need Help / Support */}
					<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6'>
						<h2 className='flex items-center gap-2 text-lg font-semibold text-light mb-4'>
							<AiOutlineMessage />
							<span>¿Necesitas ayuda?</span>
						</h2>

						<div className='space-y-4'>
							<div className='flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10'>
								<div className='w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20 text-secondary border border-secondary/30'>
									<AiOutlinePhone size={16} />
								</div>
								<div>
									<div className='text-light text-sm font-medium'>
										Atención telefónica
									</div>
									<div className='text-light/60 text-xs'>
										Lun-Vie: 9AM - 6PM
									</div>
								</div>
							</div>

							<Link href='/support' className='block'>
								<button className='w-full py-2.5 px-4 bg-gradient-to-r from-secondary/20 to-accent1/20 hover:from-secondary/30 hover:to-accent1/30 text-light rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/10'>
									<AiOutlineMessage size={16} />
									<span>Contactar soporte</span>
								</button>
							</Link>

							<div className='text-center text-xs text-light/50'>
								ID de Referencia: {order.id}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default OrderDetail;
