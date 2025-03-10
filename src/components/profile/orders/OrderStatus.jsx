import React from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineCheckCircle,
	AiOutlineClockCircle,
	AiOutlineSync,
	AiOutlineTruck,
	AiOutlineCloseCircle,
	AiOutlineShoppingCart,
	AiOutlineTag,
} from 'react-icons/ai';

// Configuración de estados con sus estilos visuales
const statusConfig = {
	placed: {
		icon: <AiOutlineShoppingCart className='text-secondary' />,
		color: 'bg-secondary/20 text-secondary border-secondary/30',
		gradient: 'from-secondary/20 to-secondary/5',
		title: 'Pedido Realizado',
		description: 'Tu pedido ha sido recibido correctamente',
	},
	payment_confirmed: {
		icon: <AiOutlineCheckCircle className='text-accent1' />,
		color: 'bg-accent1/20 text-accent1 border-accent1/30',
		gradient: 'from-accent1/20 to-accent1/5',
		title: 'Pago Confirmado',
		description: 'El pago ha sido verificado y procesado',
	},
	processing: {
		icon: <AiOutlineSync className='text-primary animate-spin-slow' />,
		color: 'bg-primary/20 text-primary border-primary/30',
		gradient: 'from-primary/20 to-primary/5',
		title: 'En Procesamiento',
		description: 'Estamos preparando tus productos',
	},
	shipped: {
		icon: <AiOutlineTruck className='text-accent2' />,
		color: 'bg-accent2/20 text-accent2 border-accent2/30',
		gradient: 'from-accent2/20 to-accent2/5',
		title: 'Enviado',
		description: 'Tu pedido está en camino',
	},
	delivered: {
		icon: <AiOutlineCheckCircle className='text-success' />,
		color: 'bg-success/20 text-success border-success/30',
		gradient: 'from-success/20 to-success/5',
		title: 'Entregado',
		description: 'Tu pedido ha sido entregado correctamente',
	},
	cancelled: {
		icon: <AiOutlineCloseCircle className='text-error' />,
		color: 'bg-error/20 text-error border-error/30',
		gradient: 'from-error/20 to-error/5',
		title: 'Cancelado',
		description: 'Este pedido ha sido cancelado',
	},
	pending: {
		icon: <AiOutlineClockCircle className='text-secondary' />,
		color: 'bg-secondary/20 text-secondary border-secondary/30',
		gradient: 'from-secondary/20 to-secondary/5',
		title: 'Pendiente',
		description: 'Esperando confirmación',
	},
};

// Estados ordenados por orden de procesamiento
const statusOrder = [
	'placed',
	'payment_confirmed',
	'processing',
	'shipped',
	'delivered',
];

const OrderStatus = ({
	currentStatus,
	events = [],
	compact = false,
	showDetails = true,
	animated = true,
}) => {
	// Determinar qué estados están completos basados en el estado actual
	const currentStatusIndex = statusOrder.indexOf(currentStatus);

	// Animaciones
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.3 },
		},
	};

	// Si es modo compacto, solo mostramos el estado actual
	if (compact) {
		const status = statusConfig[currentStatus] || statusConfig.pending;

		return (
			<div
				className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.color}`}>
				{status.icon}
				<span className='font-medium text-sm'>{status.title}</span>
			</div>
		);
	}

	return (
		<motion.div
			className='w-full'
			variants={animated ? containerVariants : {}}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}>
			{/* Barra de progreso - Vista móvil y desktop */}
			<div className='mb-6'>
				{/* Vista móvil: progreso vertical con eventos */}
				<div className='block lg:hidden'>
					<div className='relative'>
						{/* Línea de tiempo vertical */}
						<div className='absolute left-5 top-0 bottom-0 w-0.5 bg-white/10 z-0'></div>

						{/* Eventos del pedido */}
						<div className='space-y-6'>
							{events.length > 0
								? events.map((event, index) => {
										const eventStatus =
											statusConfig[event.status] ||
											statusConfig.pending;
										const isActive = index === 0; // El más reciente

										return (
											<motion.div
												key={index}
												variants={
													animated ? itemVariants : {}
												}
												className='relative flex items-start gap-4'>
												<div
													className={`w-10 h-10 rounded-full flex items-center justify-center border z-10 
                        ${
							isActive
								? eventStatus.color
								: 'bg-white/5 text-light/40 border-white/10'
						}`}>
													{eventStatus.icon}
												</div>

												<div className='pt-1 flex-1'>
													<div className='flex items-center justify-between'>
														<h3
															className={`font-medium ${isActive ? 'text-light' : 'text-light/70'}`}>
															{eventStatus.title}
														</h3>
														<span className='text-xs text-light/50'>
															{event.date}
														</span>
													</div>

													<p className='text-sm text-light/60 mt-0.5'>
														{event.description ||
															eventStatus.description}
													</p>

													{event.details && (
														<div className='mt-2 p-2 rounded-lg bg-white/5 text-xs text-light/70'>
															{event.details}
														</div>
													)}
												</div>
											</motion.div>
										);
									})
								: // Si no hay eventos detallados, mostrar los estados genéricos
									statusOrder.map((status, index) => {
										const statusInfo = statusConfig[status];
										const isCompleted =
											index <= currentStatusIndex;
										const isActive =
											index === currentStatusIndex;

										return (
											<motion.div
												key={status}
												variants={
													animated ? itemVariants : {}
												}
												className='relative flex items-start gap-4'>
												<div
													className={`w-10 h-10 rounded-full flex items-center justify-center border z-10 
                        ${
							isCompleted
								? statusInfo.color
								: 'bg-white/5 text-light/40 border-white/10'
						}`}>
													{statusInfo.icon}
												</div>

												<div className='pt-1 flex-1'>
													<h3
														className={`font-medium ${isCompleted ? 'text-light' : 'text-light/50'}`}>
														{statusInfo.title}
													</h3>
													<p
														className={`text-sm ${isCompleted ? 'text-light/60' : 'text-light/40'} mt-0.5`}>
														{statusInfo.description}
													</p>
												</div>
											</motion.div>
										);
									})}
						</div>
					</div>
				</div>

				{/* Vista desktop: progreso horizontal */}
				<div className='hidden lg:block relative'>
					{/* Línea de progreso */}
					<div className='absolute top-5 left-0 right-0 h-0.5 bg-white/10'></div>
					<div
						className={`absolute top-5 left-0 h-0.5 bg-gradient-to-r from-secondary to-accent1`}
						style={{
							width: `${Math.min(100, (currentStatusIndex / (statusOrder.length - 1)) * 100)}%`,
							transition: 'width 1s ease-in-out',
						}}></div>

					{/* Puntos de progreso */}
					<div className='flex justify-between relative'>
						{statusOrder.map((status, index) => {
							const statusInfo = statusConfig[status];
							const isCompleted = index <= currentStatusIndex;
							const isActive = index === currentStatusIndex;

							return (
								<motion.div
									key={status}
									variants={animated ? itemVariants : {}}
									className='flex flex-col items-center'
									style={{
										width: `${100 / statusOrder.length}%`,
									}}>
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center border
                    ${
						isCompleted
							? statusInfo.color
							: 'bg-white/5 text-light/40 border-white/10'
					}`}>
										{statusInfo.icon}
									</div>

									<h4
										className={`mt-3 text-sm font-medium text-center ${isActive ? 'text-light' : isCompleted ? 'text-light/70' : 'text-light/40'}`}>
										{statusInfo.title}
									</h4>

									{showDetails && (
										<p
											className={`text-xs text-center mt-1 max-w-[120px] ${isCompleted ? 'text-light/60' : 'text-light/30'}`}>
											{statusInfo.description}
										</p>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Detalles adicionales de envío (si aplica) */}
			{currentStatus === 'shipped' && showDetails && (
				<motion.div
					variants={animated ? itemVariants : {}}
					className='mt-6 p-4 rounded-xl bg-white/5 border border-white/10'>
					<div className='flex items-start gap-3'>
						<AiOutlineTruck className='text-accent2 text-lg mt-0.5' />
						<div>
							<h3 className='font-medium text-light'>
								Información de envío
							</h3>
							<p className='text-sm text-light/70 mt-1'>
								Tu pedido está en ruta hacia tu dirección de
								entrega.
							</p>
							<div className='mt-3 flex flex-wrap gap-2'>
								<div className='px-3 py-1 bg-white/5 rounded-lg text-xs text-light/80 border border-white/10'>
									<span className='font-medium'>
										Servicio:
									</span>{' '}
									Envío Express
								</div>
								<div className='px-3 py-1 bg-white/5 rounded-lg text-xs text-light/80 border border-white/10'>
									<span className='font-medium'>
										Estimado:
									</span>{' '}
									1-2 días hábiles
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default OrderStatus;
