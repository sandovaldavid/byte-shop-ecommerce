import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineLock,
	AiOutlineDelete,
	AiOutlineStar,
	AiOutlineEdit,
	AiOutlineCheck,
	AiOutlineCloseCircle,
	AiOutlineExclamationCircle,
	AiOutlineCalendar,
	AiOutlineUser,
	AiOutlineSafety,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcAmex,
	FaCcPaypal,
	FaCcApplePay,
} from 'react-icons/fa';
import { RiShieldCheckLine } from 'react-icons/ri';
import ProfileLoadingSkeleton from '../utils/ProfileLoadingSkeleton';

const PaymentMethodCard = ({
	paymentMethod = {
		id: 'card-123',
		type: 'credit_card', // credit_card, debit_card, paypal, etc.
		brand: 'visa', // visa, mastercard, amex, etc.
		lastFour: '4242',
		expiryMonth: '12',
		expiryYear: '28',
		isDefault: true,
		holderName: 'Juan Pérez',
	},
	onSetDefault = () => {},
	onEdit = () => {},
	onDelete = () => {},
	animated = true,
	loading = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
	const [animateNotice, setAnimateNotice] = useState(false);

	// Determinar si la tarjeta está expirada o pronto a expirar
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

	const expiryYear = parseInt(`20${paymentMethod.expiryYear}`);
	const expiryMonth = parseInt(paymentMethod.expiryMonth);

	const isExpired =
		expiryYear < currentYear ||
		(expiryYear === currentYear && expiryMonth < currentMonth);

	const expiresWithinThreeMonths =
		!isExpired &&
		((expiryYear === currentYear && expiryMonth <= currentMonth + 3) ||
			(expiryYear === currentYear + 1 &&
				expiryMonth + 12 <= currentMonth + 3));

	// Activar animación inicial del aviso cuando se expande
	React.useEffect(() => {
		if (isExpanded && expiresWithinThreeMonths && !isExpired) {
			setAnimateNotice(true);
			// Desactivar la animación después de completarla
			const timer = setTimeout(() => {
				setAnimateNotice(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isExpanded, expiresWithinThreeMonths, isExpired]);

	// Obtener icono de la marca de la tarjeta
	const getBrandIcon = () => {
		switch (paymentMethod.brand.toLowerCase()) {
			case 'visa':
				return <FaCcVisa className='text-4xl text-[#1434CB]' />;
			case 'mastercard':
				return <FaCcMastercard className='text-4xl text-[#EB001B]' />;
			case 'amex':
				return <FaCcAmex className='text-4xl text-[#2E77BC]' />;
			case 'paypal':
				return <FaCcPaypal className='text-4xl text-[#003087]' />;
			case 'apple pay':
				return <FaCcApplePay className='text-4xl text-dark' />;
			default:
				return (
					<AiOutlineCreditCard className='text-4xl text-accent2' />
				);
		}
	};

	// Obtener nombre formateado de la tarjeta
	const getFormattedCardName = () => {
		switch (paymentMethod.brand.toLowerCase()) {
			case 'visa':
				return 'Visa';
			case 'mastercard':
				return 'Mastercard';
			case 'amex':
				return 'American Express';
			case 'paypal':
				return 'PayPal';
			default:
				return (
					paymentMethod.brand.charAt(0).toUpperCase() +
					paymentMethod.brand.slice(1)
				);
		}
	};

	// Obtener tipo de método de pago
	const getPaymentMethodType = () => {
		switch (paymentMethod.type) {
			case 'credit_card':
				return 'Tarjeta de crédito';
			case 'debit_card':
				return 'Tarjeta de débito';
			case 'paypal':
				return 'Cuenta PayPal';
			default:
				return 'Método de pago';
		}
	};

	const handleDeleteClick = (e) => {
		e.stopPropagation();
		if (isConfirmingDelete) {
			onDelete(paymentMethod.id);
			setIsConfirmingDelete(false);
		} else {
			setIsConfirmingDelete(true);
		}
	};

	// Animaciones
	const cardVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
		exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
	};

	const expandVariants = {
		collapsed: { height: 0, opacity: 0 },
		expanded: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
	};

	const pulseVariants = {
		pulse: {
			scale: [1, 1.02, 1],
			boxShadow: [
				'0 0 0 rgba(255, 51, 102, 0)',
				'0 0 12px rgba(255, 51, 102, 0.25)',
				'0 0 0 rgba(255, 51, 102, 0)',
			],
			transition: {
				duration: 1.5,
				repeat: 1,
				repeatType: 'reverse',
			},
		},
	};

	if (loading) {
		return <ProfileLoadingSkeleton type='payment' />;
	}

	return (
		<motion.div
			initial={animated ? cardVariants.initial : false}
			animate={animated ? cardVariants.animate : false}
			exit={animated ? cardVariants.exit : false}
			className={`relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300 ${
				isExpired
					? 'bg-gradient-to-br from-error/5 to-error/10 border-error/30 shadow-sm shadow-error/5'
					: paymentMethod.isDefault
						? 'bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 shadow-sm shadow-primary/10'
						: 'bg-gradient-to-br from-dark/40 to-dark/50 border-white/10'
			} ${isExpanded ? 'shadow-lg shadow-primary/10' : ''}`}>
			{/* Badge flotante de estado */}
			<div className='absolute top-[4.5rem] right-3 flex flex-col md:flex-row gap-2 z-10'>
				{paymentMethod.isDefault && (
					<motion.span
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-accent2/20 to-accent2/10 text-accent2 backdrop-blur-sm flex items-center gap-1 border border-accent2/20 whitespace-nowrap shadow-sm'>
						<AiOutlineStar className='text-xs' />
						<span>Predeterminada</span>
					</motion.span>
				)}

				{isExpired ? (
					<motion.span
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-error/20 to-error/10 text-error backdrop-blur-sm flex items-center gap-1 border border-error/20 whitespace-nowrap shadow-sm'>
						<AiOutlineExclamationCircle className='text-xs' />
						<span>Expirada</span>
					</motion.span>
				) : expiresWithinThreeMonths ? (
					<motion.span
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.3 }}
						className='px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-accent1/20 to-accent1/10 text-accent1 backdrop-blur-sm flex items-center gap-1 border border-accent1/20 whitespace-nowrap shadow-sm'>
						<AiOutlineExclamationCircle className='text-xs' />
						<span>Expira pronto</span>
					</motion.span>
				) : null}
			</div>

			{/* Tarjeta principal */}
			<div
				className={`relative p-5 cursor-pointer transition-all duration-300 ${
					isExpired ? 'opacity-80' : 'opacity-100'
				}`}
				onClick={() => setIsExpanded(!isExpanded)}>
				<div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
					{/* Parte izquierda: Icono y detalles de la tarjeta */}
					<div className='flex items-center gap-4'>
						<div
							className={`relative w-16 h-12 flex items-center justify-center rounded-lg overflow-hidden ${
								isExpired
									? 'bg-light/5 border border-error/20'
									: paymentMethod.isDefault
										? 'bg-gradient-to-r from-primary/10 to-secondary/20 border border-primary/20'
										: 'bg-light/5 border border-white/10'
							}`}>
							<div className='absolute inset-0 bg-dark/30 backdrop-blur-sm'></div>
							<div className='relative z-10'>
								{getBrandIcon()}
							</div>
						</div>

						<div>
							<div className='flex items-center gap-2'>
								<h3 className='font-semibold text-light text-lg flex items-center'>
									<span className='font-mono'>••••</span>
									<span className='ml-1 font-mono'>
										{paymentMethod.lastFour}
									</span>
								</h3>
							</div>

							<div className='text-sm text-light/70 mt-1 flex items-center gap-2 flex-wrap'>
								<span className='font-medium text-secondary'>
									{getFormattedCardName()}
								</span>
								<span className='hidden sm:inline-block w-1 h-1 rounded-full bg-light/30'></span>
								<span>{getPaymentMethodType()}</span>
							</div>
						</div>
					</div>

					{/* Parte derecha: Titular y expiración */}
					<div className='flex flex-col items-start sm:items-end gap-1 mt-1 sm:mt-0 w-full sm:w-auto'>
						<div className='text-sm text-light/80 font-medium flex gap-1.5 items-center'>
							<AiOutlineUser className='text-xs opacity-60 sm:hidden' />
							<span className='truncate max-w-[200px]'>
								{paymentMethod.holderName}
							</span>
						</div>
						<div
							className={`text-sm flex items-center gap-1.5 ${
								isExpired
									? 'text-error'
									: expiresWithinThreeMonths
										? 'text-accent1'
										: 'text-light/60'
							}`}>
							<AiOutlineCalendar className='text-xs' />
							<span>
								{isExpired
									? 'Expirada'
									: `Exp. ${paymentMethod.expiryMonth}/${paymentMethod.expiryYear}`}
							</span>
						</div>
					</div>
				</div>

				{/* Indicador visual para expandir/colapsar */}
				<div className='mt-4 flex justify-center'>
					<motion.div
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`w-8 h-8 flex items-center justify-center rounded-full 
                            ${
								isExpanded
									? 'bg-gradient-to-r from-primary/20 to-secondary/20'
									: 'bg-white/5 hover:bg-white/10'
							} 
                            transition-all duration-300 border ${
								isExpanded
									? 'border-primary/30'
									: 'border-white/10'
							}`}>
						<motion.svg
							animate={{ rotate: isExpanded ? 180 : 0 }}
							transition={{ duration: 0.3 }}
							className={`w-4 h-4 ${isExpanded ? 'text-primary' : 'text-light/70'}`}
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 9l-7 7-7-7'
							/>
						</motion.svg>
					</motion.div>
				</div>
			</div>

			{/* Contenido expandido */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						variants={expandVariants}
						initial='collapsed'
						animate='expanded'
						exit='collapsed'
						className='overflow-hidden border-t border-white/10'>
						<div className='px-5 py-4 space-y-4'>
							{/* Detalles en tarjetas */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
								{/* Tarjeta de titular */}
								<div className='flex items-center gap-3 p-3.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group'>
									<div className='w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:border-secondary/30 transition-colors'>
										<AiOutlineUser className='text-xl text-secondary' />
									</div>
									<div>
										<div className='text-xs text-light/50 uppercase tracking-wider'>
											Titular
										</div>
										<div className='text-sm font-medium text-light mt-0.5'>
											{paymentMethod.holderName}
										</div>
									</div>
								</div>

								{/* Tarjeta de fecha de expiración */}
								<div className='flex items-center gap-3 p-3.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group'>
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
											isExpired
												? 'bg-gradient-to-br from-error/20 to-error/10 border-error/20 group-hover:border-error/30'
												: expiresWithinThreeMonths
													? 'bg-gradient-to-br from-accent1/20 to-accent1/10 border-accent1/20 group-hover:border-accent1/30'
													: 'bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/20 group-hover:border-secondary/30'
										}`}>
										<AiOutlineCalendar
											className={`text-xl ${
												isExpired
													? 'text-error'
													: expiresWithinThreeMonths
														? 'text-accent1'
														: 'text-secondary'
											}`}
										/>
									</div>
									<div>
										<div className='text-xs text-light/50 uppercase tracking-wider'>
											Expira
										</div>
										<div
											className={`text-sm font-medium mt-0.5 ${
												isExpired
													? 'text-error'
													: expiresWithinThreeMonths
														? 'text-accent1'
														: 'text-light'
											}`}>
											{paymentMethod.expiryMonth}/
											{paymentMethod.expiryYear}
										</div>
									</div>
								</div>

								{/* Tarjeta de tipo */}
								<div className='flex items-center gap-3 p-3.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group'>
									<div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/30 transition-colors'>
										<AiOutlineCreditCard className='text-xl text-primary' />
									</div>
									<div>
										<div className='text-xs text-light/50 uppercase tracking-wider'>
											Tipo
										</div>
										<div className='text-sm font-medium text-light mt-0.5'>
											{getPaymentMethodType()}
										</div>
									</div>
								</div>

								{/* Tarjeta de seguridad */}
								<div className='flex items-center gap-3 p-3.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group'>
									<div className='w-10 h-10 rounded-full bg-gradient-to-br from-accent2/20 to-accent2/10 flex items-center justify-center border border-accent2/20 group-hover:border-accent2/30 transition-colors'>
										<AiOutlineLock className='text-xl text-accent2' />
									</div>
									<div>
										<div className='text-xs text-light/50 uppercase tracking-wider'>
											Seguridad
										</div>
										<div className='text-sm font-medium text-light mt-0.5'>
											••• Verificada
										</div>
									</div>
								</div>
							</div>

							{/* Mensaje de expiración próxima */}
							{expiresWithinThreeMonths && !isExpired && (
								<motion.div
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									variants={
										animateNotice ? pulseVariants : {}
									}
									animate={animateNotice ? 'pulse' : ''}
									className='p-4 rounded-lg bg-gradient-to-r from-accent1/5 to-accent1/10 border border-accent1/20'>
									<div className='flex items-start gap-3'>
										<AiOutlineExclamationCircle className='text-accent1 text-xl flex-shrink-0 mt-0.5' />
										<div>
											<p className='text-sm font-medium text-accent1 mb-1'>
												Esta tarjeta expirará pronto
											</p>
											<p className='text-xs text-light/70 leading-relaxed'>
												Para evitar problemas con tus
												pagos futuros, te recomendamos
												actualizarla antes de{' '}
												{paymentMethod.expiryMonth}/
												{paymentMethod.expiryYear}.
												<button
													onClick={(e) => {
														e.stopPropagation();
														onEdit(
															paymentMethod.id
														);
													}}
													className='ml-1 text-primary hover:underline focus:outline-none'>
													Actualizar ahora
												</button>
											</p>
										</div>
									</div>
								</motion.div>
							)}

							{/* Mensaje para tarjetas expiradas */}
							{isExpired && (
								<motion.div
									initial={{ opacity: 0, y: 5 }}
									animate={{ opacity: 1, y: 0 }}
									className='p-4 rounded-lg bg-gradient-to-r from-error/5 to-error/10 border border-error/20'>
									<div className='flex items-start gap-3'>
										<AiOutlineExclamationCircle className='text-error text-xl flex-shrink-0 mt-0.5' />
										<div>
											<p className='text-sm font-medium text-error mb-1'>
												Esta tarjeta ha expirado
											</p>
											<p className='text-xs text-light/70 leading-relaxed'>
												Esta tarjeta ya no es válida
												para realizar pagos. Por favor,
												actualiza la información o
												elimina este método de pago.
											</p>
											<div className='mt-2 flex flex-wrap gap-2'>
												<button
													onClick={(e) => {
														e.stopPropagation();
														onEdit(
															paymentMethod.id
														);
													}}
													className='text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-md transition-colors'>
													Actualizar información
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														setIsConfirmingDelete(
															true
														);
													}}
													className='text-xs px-3 py-1.5 bg-light/10 hover:bg-light/20 text-light/70 rounded-md transition-colors'>
													Eliminar tarjeta
												</button>
											</div>
										</div>
									</div>
								</motion.div>
							)}

							{/* Botones de acción */}
							<div className='flex flex-wrap gap-3 pt-3 border-t border-white/10'>
								{!paymentMethod.isDefault && !isExpired && (
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={(e) => {
											e.stopPropagation();
											onSetDefault(paymentMethod.id);
										}}
										className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-accent2/10 to-accent2/20 hover:from-accent2/15 hover:to-accent2/25 text-accent2 text-sm transition-all border border-accent2/30 font-medium shadow-sm'>
										<AiOutlineStar size={16} />
										<span>
											Establecer como predeterminada
										</span>
									</motion.button>
								)}

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={(e) => {
										e.stopPropagation();
										onEdit(paymentMethod.id);
									}}
									className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/20 hover:from-secondary/15 hover:to-secondary/25 text-secondary text-sm transition-all border border-secondary/30 font-medium shadow-sm'>
									<AiOutlineEdit size={16} />
									<span>Editar</span>
								</motion.button>

								{isConfirmingDelete ? (
									<div className='flex items-center gap-2 ml-auto'>
										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={handleDeleteClick}
											className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-error/10 to-error/20 hover:from-error/15 hover:to-error/25 text-error text-sm transition-all border border-error/30 font-medium shadow-sm'>
											<AiOutlineCheck size={16} />
											<span>Confirmar eliminación</span>
										</motion.button>

										<motion.button
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={(e) => {
												e.stopPropagation();
												setIsConfirmingDelete(false);
											}}
											className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-light/80 text-sm transition-all border border-white/10 font-medium'>
											<AiOutlineCloseCircle size={16} />
											<span>Cancelar</span>
										</motion.button>
									</div>
								) : (
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handleDeleteClick}
										className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-error/10 text-light/70 hover:text-error text-sm transition-all border border-white/10 hover:border-error/20 font-medium ml-auto'>
										<AiOutlineDelete size={16} />
										<span>Eliminar</span>
									</motion.button>
								)}
							</div>

							{/* Nota de seguridad */}
							{!isExpired && paymentMethod.isDefault && (
								<div className='mt-1 pt-2 border-t border-white/5'>
									<div className='flex items-start gap-2 text-xs text-light/50'>
										<RiShieldCheckLine className='text-secondary mt-0.5 flex-shrink-0' />
										<span>
											Este método está configurado como
											predeterminado para todos tus pagos
											futuros.
										</span>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default PaymentMethodCard;
