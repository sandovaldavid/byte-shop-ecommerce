import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	AiOutlineCalendar,
	AiOutlineClockCircle,
	AiOutlineShoppingCart,
	AiOutlineCreditCard,
	AiOutlineTags,
	AiOutlineRight,
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineSync,
	AiOutlineTruck,
} from 'react-icons/ai';

// Mapa de estados a colores e iconos
const statusConfig = {
	completed: {
		color: 'bg-success/20 text-success border-success/30',
		icon: <AiOutlineCheckCircle className='text-success' />,
		gradient: 'from-success/30 to-success/10',
	},
	processing: {
		color: 'bg-primary/20 text-primary border-primary/30',
		icon: <AiOutlineSync className='text-primary' />,
		gradient: 'from-primary/30 to-primary/10',
	},
	shipped: {
		color: 'bg-accent2/20 text-accent2 border-accent2/30',
		icon: <AiOutlineTruck className='text-accent2' />,
		gradient: 'from-accent2/30 to-accent2/10',
	},
	cancelled: {
		color: 'bg-error/20 text-error border-error/30',
		icon: <AiOutlineCloseCircle className='text-error' />,
		gradient: 'from-error/30 to-error/10',
	},
	pending: {
		color: 'bg-secondary/20 text-secondary border-secondary/30',
		icon: <AiOutlineClockCircle className='text-secondary' />,
		gradient: 'from-secondary/30 to-secondary/10',
	},
};

const OrderCard = ({
	order = {
		id: 'ORD-12345',
		date: '15/04/2024',
		status: 'processing',
		items: 3,
		total: '$129.99',
		paymentMethod: 'Tarjeta terminada en 4242',
		trackingNumber: 'TRACK-123456789',
		products: [
			// Opcional: array de productos en el pedido
		],
	},
	showDetails = true,
	showProducts = false,
	compact = false,
	animated = true,
}) => {
	// Obtener configuración de estado
	const status = statusConfig[order.status] || statusConfig.processing;

	// Variantes de animación
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
	};

	return (
		<motion.div
			className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/8 ${compact ? 'p-3' : 'p-4 sm:p-5'}`}
			variants={animated ? cardVariants : undefined}
			whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
			{/* Header con gradiente sutil indicando el estado */}
			<div
				className={`h-1 w-full bg-gradient-to-r ${status.gradient} mb-4`}></div>

			{/* Contenido principal */}
			<div className='flex flex-col sm:flex-row justify-between gap-4'>
				<div className='flex-1'>
					{/* Información del pedido */}
					<div className='flex items-start sm:items-center gap-3 flex-wrap'>
						<div className='flex items-center'>
							<span className='text-light font-medium'>
								{order.id}
							</span>
						</div>

						<div
							className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 ${status.color} border`}>
							{status.icon}
							<span className='capitalize'>{order.status}</span>
						</div>
					</div>

					<div className='flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-light/60 text-xs'>
						<div className='flex items-center gap-1.5'>
							<AiOutlineCalendar className='text-secondary/80' />
							<span>{order.date}</span>
						</div>

						<div className='flex items-center gap-1.5'>
							<AiOutlineShoppingCart className='text-secondary/80' />
							<span>
								{order.items}{' '}
								{order.items === 1 ? 'artículo' : 'artículos'}
							</span>
						</div>

						{order.paymentMethod && !compact && (
							<div className='flex items-center gap-1.5'>
								<AiOutlineCreditCard className='text-secondary/80' />
								<span className='truncate max-w-[180px]'>
									{order.paymentMethod}
								</span>
							</div>
						)}
					</div>

					{/* Tracking info */}
					{order.trackingNumber && !compact && (
						<div className='mt-3 flex items-center gap-2 text-xs'>
							<span className='bg-white/10 px-2 py-0.5 rounded text-light/70'>
								Tracking: {order.trackingNumber}
							</span>
						</div>
					)}
				</div>

				{/* Precio y botón de acciones */}
				<div className='flex items-center justify-between sm:flex-col sm:items-end gap-2'>
					<div className='text-lg font-semibold text-light'>
						{order.total}
					</div>

					{showDetails && (
						<Link
							href={`/profile/orders/${order.id}`}
							className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-secondary/20 to-accent1/20 hover:from-secondary/30 hover:to-accent1/30 text-light transition-colors border border-white/10 text-sm'>
							<span>Detalles</span>
							<AiOutlineRight size={14} />
						</Link>
					)}
				</div>
			</div>

			{/* Productos en el pedido (opcional) */}
			{showProducts && order.products && order.products.length > 0 && (
				<div className='mt-4 pt-4 border-t border-white/10'>
					<h4 className='text-sm font-medium text-light/80 mb-3 flex items-center gap-1.5'>
						<AiOutlineTags />
						<span>Productos en este pedido</span>
					</h4>

					<div className='grid grid-cols-1 gap-2'>
						{order.products.slice(0, 3).map((product) => (
							<div
								key={product.id}
								className='flex items-center gap-3 bg-white/5 rounded-lg p-2'>
								{product.image && (
									<div className='w-10 h-10 rounded-md bg-white/10 overflow-hidden flex-shrink-0'>
										<img
											src={product.image}
											alt={product.name}
											className='w-full h-full object-cover'
										/>
									</div>
								)}
								<div className='flex-1 min-w-0'>
									<div className='text-sm font-medium text-light truncate'>
										{product.name}
									</div>
									<div className='text-xs text-light/60'>
										{product.price} × {product.quantity}
									</div>
								</div>
							</div>
						))}

						{order.products.length > 3 && (
							<div className='text-xs text-center text-secondary'>
								+{order.products.length - 3} productos más
							</div>
						)}
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default OrderCard;
