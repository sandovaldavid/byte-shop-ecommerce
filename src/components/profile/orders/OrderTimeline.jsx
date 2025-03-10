import React from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineCheckCircle,
	AiOutlineSync,
	AiOutlineTruck,
	AiOutlineCloseCircle,
	AiOutlineClockCircle,
	AiOutlineShoppingCart,
	AiOutlineCreditCard,
	AiOutlineBox,
	AiOutlineHome,
} from 'react-icons/ai';

const statusConfig = {
	ordered: {
		icon: <AiOutlineShoppingCart className='text-secondary' />,
		color: 'bg-secondary/20 text-secondary border-secondary/30',
		gradient: 'from-secondary/30 to-secondary/10',
		title: 'Pedido Realizado',
		description: 'Hemos recibido tu pedido correctamente',
	},
	payment: {
		icon: <AiOutlineCreditCard className='text-primary' />,
		color: 'bg-primary/20 text-primary border-primary/30',
		gradient: 'from-primary/30 to-primary/10',
		title: 'Pago Confirmado',
		description: 'Tu pago ha sido procesado exitosamente',
	},
	processing: {
		icon: <AiOutlineSync className='text-accent2 animate-spin-slow' />,
		color: 'bg-accent2/20 text-accent2 border-accent2/30',
		gradient: 'from-accent2/30 to-accent2/10',
		title: 'En Preparación',
		description: 'Estamos preparando tus productos',
	},
	shipped: {
		icon: <AiOutlineTruck className='text-accent1' />,
		color: 'bg-accent1/20 text-accent1 border-accent1/30',
		gradient: 'from-accent1/30 to-accent1/10',
		title: 'Enviado',
		description: 'Tu pedido está en camino',
	},
	delivered: {
		icon: <AiOutlineHome className='text-success' />,
		color: 'bg-success/20 text-success border-success/30',
		gradient: 'from-success/30 to-success/10',
		title: 'Entregado',
		description: 'Tu pedido ha sido entregado',
	},
	cancelled: {
		icon: <AiOutlineCloseCircle className='text-error' />,
		color: 'bg-error/20 text-error border-error/30',
		gradient: 'from-error/30 to-error/10',
		title: 'Cancelado',
		description: 'El pedido ha sido cancelado',
	},
};

// Orden normal del flujo de un pedido
const orderSteps = ['ordered', 'payment', 'processing', 'shipped', 'delivered'];

const OrderTimeline = ({
	events = [],
	currentStatus = 'processing', // Estado actual del pedido
	vertical = false, // Vertical para móvil, horizontal para desktop
	compact = false, // Versión compacta para tarjetas de pedido
	animated = true, // Controla si se muestran animaciones
}) => {
	// Si no hay eventos específicos, usar el flujo estándar
	const timelineEvents =
		events.length > 0
			? events
			: orderSteps.map((step) => ({
					status: step,
					date: '',
					time: '',
					active:
						orderSteps.indexOf(step) <=
						orderSteps.indexOf(currentStatus),
				}));

	const currentStatusIndex = orderSteps.indexOf(currentStatus);

	// Variantes para animaciones
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	// Si es compacto, solo mostrar el estado actual
	if (compact) {
		const status = statusConfig[currentStatus] || statusConfig.processing;

		return (
			<div
				className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${status.color} border`}>
				{status.icon}
				<span className='text-sm font-medium'>{status.title}</span>
			</div>
		);
	}

	return (
		<motion.div
			variants={animated ? containerVariants : {}}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}
			className='w-full'>
			{/* Timeline vertical (móvil) */}
			{vertical && (
				<div className='relative'>
					{/* Línea vertical de progreso */}
					<div className='absolute left-5 top-0 bottom-0 w-0.5 bg-white/10'></div>

					{/* Línea de progreso completada */}
					<div
						className='absolute left-5 top-0 w-0.5 bg-gradient-to-b from-secondary via-accent1 to-success'
						style={{
							height: `calc(100% * ${Math.min(1, (currentStatusIndex + 1) / orderSteps.length)})`,
							transition: 'height 1s ease-in-out',
						}}></div>

					{/* Eventos */}
					<div className='space-y-8'>
						{timelineEvents.map((event, index) => {
							const eventConfig = statusConfig[event.status];
							const isPast =
								orderSteps.indexOf(event.status) <
								currentStatusIndex;
							const isCurrent =
								orderSteps.indexOf(event.status) ===
								currentStatusIndex;
							const isFuture =
								orderSteps.indexOf(event.status) >
								currentStatusIndex;

							if (!eventConfig) return null;

							return (
								<motion.div
									key={`${event.status}-${index}`}
									variants={animated ? itemVariants : {}}
									className={`flex items-start gap-4 ${isFuture ? 'opacity-50' : ''}`}>
									<div
										className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
											isCurrent
												? eventConfig.color
												: isPast
													? 'bg-success/20 text-success border-success/30'
													: 'bg-white/10 border-white/20 text-white/40'
										} border`}>
										{isCurrent ? (
											eventConfig.icon
										) : isPast ? (
											<AiOutlineCheckCircle className='text-success' />
										) : (
											eventConfig.icon
										)}
									</div>

									<div className='pt-1.5 flex-1'>
										<div className='flex items-center justify-between flex-wrap gap-2'>
											<h3
												className={`font-medium ${isCurrent ? 'text-light' : isPast ? 'text-light/80' : 'text-light/50'}`}>
												{eventConfig.title}
											</h3>
											{event.date && (
												<span
													className={`text-xs ${isCurrent ? 'text-light/70' : isPast ? 'text-light/60' : 'text-light/40'}`}>
													{event.date}{' '}
													{event.time &&
														`· ${event.time}`}
												</span>
											)}
										</div>

										<p
											className={`text-sm mt-0.5 ${isCurrent ? 'text-light/70' : isPast ? 'text-light/60' : 'text-light/40'}`}>
											{event.description ||
												eventConfig.description}
										</p>

										{/* Detalles adicionales si existen */}
										{event.details && (
											<div className='mt-2 p-2 rounded-lg bg-white/5 text-xs text-light/60 border border-white/10'>
												{event.details}
											</div>
										)}

										{/* Indicador de estado actual */}
										{isCurrent &&
											currentStatus !== 'delivered' &&
											currentStatus !== 'cancelled' && (
												<div className='mt-2 flex items-center gap-2'>
													<div className='w-1.5 h-1.5 rounded-full bg-accent1 animate-ping'></div>
													<span className='text-xs text-accent1'>
														En proceso
													</span>
												</div>
											)}
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			)}

			{/* Timeline horizontal (desktop) */}
			{!vertical && (
				<div className='w-full'>
					{/* Barra de progreso horizontal */}
					<div className='relative h-1.5 bg-white/10 rounded-full mb-8'>
						<div
							className='absolute left-0 top-0 h-full bg-gradient-to-r from-secondary via-accent1 to-success rounded-full'
							style={{
								width: `${Math.min(100, (currentStatusIndex / (orderSteps.length - 1)) * 100)}%`,
								transition: 'width 1s ease-in-out',
							}}></div>

						{/* Puntos de progreso */}
						<div className='absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between'>
							{orderSteps.map((step, index) => {
								const isPast = index < currentStatusIndex;
								const isCurrent = index === currentStatusIndex;
								const eventConfig = statusConfig[step];

								return (
									<div
										key={step}
										className={`w-5 h-5 rounded-full ${
											isCurrent
												? 'bg-gradient-to-br from-accent1 to-secondary shadow-lg shadow-accent1/20 ring-4 ring-accent1/20'
												: isPast
													? 'bg-success'
													: 'bg-white/20'
										} -ml-2.5 first:ml-0 last:ml-0 transform -translate-x-1/2 first:translate-x-0 last:translate-x-0`}></div>
								);
							})}
						</div>
					</div>

					{/* Etapas del pedido */}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
						{orderSteps.map((step, index) => {
							const eventConfig = statusConfig[step];
							const isPast = index < currentStatusIndex;
							const isCurrent = index === currentStatusIndex;
							const isFuture = index > currentStatusIndex;

							// Buscar si hay un evento con detalles para esta etapa
							const eventDetails = events.find(
								(e) => e.status === step
							);

							return (
								<motion.div
									key={step}
									variants={animated ? itemVariants : {}}
									className={`bg-white/5 backdrop-blur-sm rounded-xl border p-4 ${
										isCurrent
											? 'border-accent1/30 shadow-lg shadow-accent1/5'
											: isPast
												? 'border-success/20'
												: 'border-white/10'
									} ${isFuture ? 'opacity-60' : ''}`}>
									<div className='flex items-center gap-3 mb-3'>
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center ${
												isCurrent
													? eventConfig.color
													: isPast
														? 'bg-success/20 text-success border-success/30'
														: 'bg-white/10 border-white/20 text-white/40'
											} border`}>
											{isCurrent ? (
												eventConfig.icon
											) : isPast ? (
												<AiOutlineCheckCircle className='text-success' />
											) : (
												eventConfig.icon
											)}
										</div>

										<div>
											<h3
												className={`font-medium ${isCurrent ? 'text-light' : isPast ? 'text-light/80' : 'text-light/50'}`}>
												{eventConfig.title}
											</h3>
											{eventDetails?.date && (
												<div className='text-xs text-light/60'>
													{eventDetails.date}{' '}
													{eventDetails.time &&
														`· ${eventDetails.time}`}
												</div>
											)}
										</div>
									</div>

									<p
										className={`text-sm ${isCurrent ? 'text-light/70' : isPast ? 'text-light/60' : 'text-light/40'}`}>
										{eventDetails?.description ||
											eventConfig.description}
									</p>

									{/* Indicador de estado actual */}
									{isCurrent &&
										currentStatus !== 'delivered' &&
										currentStatus !== 'cancelled' && (
											<div className='mt-3 flex items-center gap-2'>
												<div className='w-1.5 h-1.5 rounded-full bg-accent1 animate-ping'></div>
												<span className='text-xs text-accent1'>
													En proceso
												</span>
											</div>
										)}

									{/* Detalles adicionales si existen */}
									{eventDetails?.details && (
										<div className='mt-3 p-2 rounded-lg bg-white/5 text-xs text-light/60 border border-white/10'>
											{eventDetails.details}
										</div>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>
			)}

			{/* Estimación de entrega si el pedido está en proceso */}
			{(currentStatus === 'processing' || currentStatus === 'shipped') &&
				!compact && (
					<motion.div
						variants={animated ? itemVariants : {}}
						className='mt-6 p-4 rounded-xl border border-white/10 bg-white/5'>
						<div className='flex gap-3'>
							<div className='w-10 h-10 rounded-full flex items-center justify-center bg-accent2/20 text-accent2 border border-accent2/30'>
								<AiOutlineClockCircle />
							</div>
							<div>
								<h4 className='font-medium text-light'>
									{currentStatus === 'processing'
										? 'Estimación de envío'
										: 'Estimación de entrega'}
								</h4>
								<p className='text-sm text-light/60 mt-1'>
									{currentStatus === 'processing'
										? 'Tu pedido será enviado en las próximas 24-48 horas'
										: 'La entrega está programada para los próximos 2-3 días hábiles'}
								</p>
							</div>
						</div>
					</motion.div>
				)}
		</motion.div>
	);
};

export default OrderTimeline;
