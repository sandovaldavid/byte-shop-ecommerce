import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineLock,
	AiOutlineUser,
	AiOutlineCalendar,
	AiOutlineCheckCircle,
} from 'react-icons/ai';
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcAmex,
	FaCcPaypal,
	FaCcApplePay,
	FaCcDiscover,
} from 'react-icons/fa';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

const CreditCardDisplay = ({
	cardNumber = '',
	holderName = '',
	expiryMonth = '',
	expiryYear = '',
	cvv = '',
	cardBrand = '',
	isCardFlipped = false,
	isValid = false,
	isLoading = false,
	className = '',
}) => {
	// Estado para animaciones y efectos visuales
	const [isHovered, setIsHovered] = useState(false);
	const [chipAnimation, setChipAnimation] = useState(false);
	const [logoAnimation, setLogoAnimation] = useState(false);

	// Activar animaciones en momentos específicos
	useEffect(() => {
		if (cardBrand && !logoAnimation) {
			setLogoAnimation(true);
			setTimeout(() => setLogoAnimation(false), 1500);
		}

		if (cardNumber.replace(/\s/g, '').length > 8 && !chipAnimation) {
			setChipAnimation(true);
			setTimeout(() => setChipAnimation(false), 1000);
		}
	}, [cardBrand, cardNumber, chipAnimation, logoAnimation]);

	// Determinar el estilo de fondo según la marca
	const getCardGradient = () => {
		if (!cardBrand) {
			return 'from-dark/70 to-gray/60 border-white/10';
		}

		switch (cardBrand.toLowerCase()) {
			case 'visa':
				return 'from-[#1434CB]/30 to-[#1434CB]/10 border-[#1434CB]/20';
			case 'mastercard':
				return 'from-[#EB001B]/30 to-[#F79E1B]/20 border-[#EB001B]/20';
			case 'amex':
				return 'from-[#2E77BC]/30 to-[#2E77BC]/10 border-[#2E77BC]/20';
			case 'discover':
				return 'from-[#FF6000]/30 to-[#FF6000]/10 border-[#FF6000]/20';
			case 'paypal':
				return 'from-[#003087]/30 to-[#009cde]/20 border-[#003087]/20';
			default:
				return 'from-primary/30 to-secondary/30 border-primary/20';
		}
	};

	// Obtener el icono de la marca de tarjeta
	const getCardBrandIcon = (size = 'normal') => {
		const sizeClass =
			size === 'large'
				? 'text-4xl'
				: size === 'small'
					? 'text-xl'
					: 'text-2xl';

		switch (cardBrand.toLowerCase()) {
			case 'visa':
				return <FaCcVisa className={`${sizeClass} text-[#1434CB]`} />;
			case 'mastercard':
				return (
					<FaCcMastercard className={`${sizeClass} text-[#EB001B]`} />
				);
			case 'amex':
				return <FaCcAmex className={`${sizeClass} text-[#2E77BC]`} />;
			case 'discover':
				return (
					<FaCcDiscover className={`${sizeClass} text-[#FF6000]`} />
				);
			case 'paypal':
				return <FaCcPaypal className={`${sizeClass} text-[#003087]`} />;
			case 'apple pay':
				return <FaCcApplePay className={`${sizeClass} text-light`} />;
			default:
				return (
					<AiOutlineCreditCard
						className={`${sizeClass} text-light/70`}
					/>
				);
		}
	};

	// Formatear y mostrar el número de tarjeta
	// Formatear y mostrar el número de tarjeta
	const getFormattedCardNumber = () => {
		if (!cardNumber) {
			return '•••• •••• •••• ••••';
		}

		// Si es un número enmascarado (en caso de edición)
		if (cardNumber.includes('•')) {
			return cardNumber;
		}

		// Eliminar espacios existentes para garantizar un formato consistente
		const cleanNumber = cardNumber.replace(/\s/g, '');

		// Formatear según tipo de tarjeta
		if (cardBrand.toLowerCase() === 'amex') {
			// Formato 4-6-5 para American Express
			const formatted = cleanNumber.padEnd(15, '•');
			return `${formatted.substring(0, 4)} ${formatted.substring(4, 10)} ${formatted.substring(10, 15)}`;
		} else {
			// Formato 4-4-4-4 para otras tarjetas
			const formatted = cleanNumber.padEnd(16, '•');
			return `${formatted.substring(0, 4)} ${formatted.substring(4, 8)} ${formatted.substring(8, 12)} ${formatted.substring(12, 16)}`;
		}
	};

	// Variantes para las animaciones
	const cardVariants = {
		front: {
			rotateY: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
		back: {
			rotateY: 180,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
		hover: {
			scale: 1.03,
			boxShadow: '0 20px 30px rgba(0, 0, 0, 0.15)',
			transition: { duration: 0.3 },
		},
		tap: {
			scale: 0.98,
			transition: { duration: 0.1 },
		},
	};

	const chipVariants = {
		idle: { scale: 1 },
		animate: {
			scale: [1, 1.08, 1],
			boxShadow: [
				'0 0 0 rgba(255, 255, 255, 0)',
				'0 0 20px rgba(255, 255, 255, 0.5)',
				'0 0 0 rgba(255, 255, 255, 0)',
			],
			transition: { duration: 1.5 },
		},
	};

	const brandVariants = {
		idle: { scale: 1, opacity: 1 },
		animate: {
			scale: [1, 1.2, 1],
			opacity: [1, 0.8, 1],
			transition: { duration: 1 },
		},
	};

	const magneticStripVariants = {
		idle: { opacity: 0.7 },
		hover: { opacity: 0.9, transition: { duration: 0.3 } },
	};

	const validBadgeVariants = {
		hidden: { opacity: 0, scale: 0.5 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		},
	};

	return (
		<div className={`w-full max-w-md mx-auto ${className}`}>
			{/* Contenedor principal con perspectiva */}
			<div className='relative w-full' style={{ perspective: '1000px' }}>
				{/* Efectos ambientales */}
				<div className='absolute -top-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl opacity-30'></div>
				<div className='absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl opacity-30'></div>

				{/* Tarjeta con efecto Flip */}
				<motion.div
					className='h-[200px] sm:h-[220px] w-full relative'
					style={{ transformStyle: 'preserve-3d' }}
					animate={isCardFlipped ? 'back' : 'front'}
					variants={cardVariants}
					whileHover={!isLoading ? 'hover' : undefined}
					whileTap={!isLoading ? 'tap' : undefined}
					onHoverStart={() => setIsHovered(true)}
					onHoverEnd={() => setIsHovered(false)}>
					{/* Frente de la tarjeta */}
					<motion.div
						className={`absolute inset-0 rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between 
                        bg-gradient-to-br ${getCardGradient()} border shadow-lg backdrop-blur-sm`}
						style={{ backfaceVisibility: 'hidden' }}>
						{/* Fila superior: Chip y logo */}
						<div className='flex justify-between items-start'>
							{/* Chip y señal contactless */}
							<div className='flex items-center gap-2'>
								<motion.div
									className='flex flex-col items-center justify-center'
									variants={chipVariants}
									animate={
										chipAnimation ? 'animate' : 'idle'
									}>
									{/* Chip */}
									<div
										className='w-10 h-7 sm:w-12 sm:h-8 rounded-md bg-gradient-to-br from-yellow-600/80 to-yellow-700/80 
                                        flex items-center justify-center overflow-hidden p-[1px] border border-yellow-500/50'>
										<div
											className='w-full h-full bg-gradient-to-br from-yellow-500/60 to-yellow-600/60 rounded-sm 
                                            flex items-center justify-center'>
											<div className='grid grid-cols-3 grid-rows-2 gap-[1px] w-8 h-4 sm:w-9 sm:h-5 opacity-90'>
												{[...Array(6)].map((_, i) => (
													<div
														key={i}
														className='bg-yellow-900/40 rounded-[1px]'></div>
												))}
											</div>
										</div>
									</div>

									{/* Señal contactless */}
									<div className='flex mt-1'>
										{[...Array(3)].map((_, i) => (
											<div
												key={i}
												className={`
                                                    h-[3px] w-[3px] sm:h-1 sm:w-1 rounded-full bg-light/70
                                                    ${i === 0 ? 'ml-0' : 'ml-1'}
                                                `}></div>
										))}
									</div>
								</motion.div>

								{/* Tipo de tarjeta */}
								<div
									className='text-[8px] sm:text-[10px] uppercase tracking-wider text-light/70 font-medium bg-light/10 
                                px-1 py-0.5 rounded'>
									{cardBrand === 'amex'
										? 'Charge Card'
										: 'Credit Card'}
								</div>
							</div>

							{/* Logo de la marca */}
							<motion.div
								variants={brandVariants}
								animate={logoAnimation ? 'animate' : 'idle'}
								className='flex items-center justify-center'>
								{getCardBrandIcon('large')}
							</motion.div>
						</div>

						{/* Número de la tarjeta */}
						<div className='my-2 sm:my-4'>
							<div className='text-lg sm:text-xl md:text-2xl font-mono tracking-wider text-light font-medium'>
								{getFormattedCardNumber()}
							</div>
						</div>

						{/* Fila inferior: Nombre y expiración */}
						<div className='flex justify-between items-end'>
							<div>
								<div className='text-[9px] sm:text-xs uppercase text-light/50 tracking-wider'>
									Titular
								</div>
								<div className='text-sm sm:text-base text-light mt-1 font-medium truncate max-w-[180px] uppercase tracking-wider'>
									{holderName || 'NOMBRE DEL TITULAR'}
								</div>
							</div>

							<div className='text-right'>
								<div className='text-[9px] sm:text-xs uppercase text-light/50 tracking-wider'>
									Expira
								</div>
								<div className='text-sm sm:text-base text-light mt-1 font-medium tracking-wider'>
									{expiryMonth || 'MM'}/{expiryYear || 'YY'}
								</div>
							</div>
						</div>

						{/* Indicador de tarjeta válida */}
						<AnimatePresence>
							{isValid && (
								<motion.div
									className='absolute -bottom-1 -right-1 bg-accent2 text-dark p-1 rounded-full border-2 border-dark'
									variants={validBadgeVariants}
									initial='hidden'
									animate='visible'
									exit='hidden'>
									<AiOutlineCheckCircle className='text-lg' />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>

					{/* Reverso de la tarjeta (CVV) */}
					<motion.div
						className={`absolute inset-0 rounded-2xl overflow-hidden 
                        bg-gradient-to-br ${getCardGradient()} border shadow-lg backdrop-blur-sm`}
						style={{
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
						}}>
						{/* Banda magnética */}
						<motion.div
							className='h-12 sm:h-14 bg-dark/70 mt-6 w-full'
							variants={magneticStripVariants}
							animate={isHovered ? 'hover' : 'idle'}></motion.div>

						{/* CVV */}
						<div className='px-5 sm:px-6 mt-5'>
							<div className='flex justify-end mb-2'>
								<div className='text-[9px] sm:text-xs uppercase text-light/50 tracking-wider'>
									CVV
								</div>
							</div>

							<div className='bg-white/20 h-8 sm:h-10 rounded-sm flex items-center justify-end p-2 sm:p-3 relative'>
								<div className='text-sm sm:text-base font-mono bg-white/30 px-2 tracking-wider ml-auto'>
									{cvv || '•••'}
								</div>

								<div className='absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60'>
									<RiSecurePaymentFill className='text-light/30' />
								</div>
							</div>

							<div className='flex items-center justify-end mt-4 gap-2'>
								<IoShieldCheckmarkOutline className='text-light/70' />
								<span className='text-xs text-light/60'>
									Código de seguridad
								</span>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Información de la tarjeta */}
			<div className='mt-4 flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					{cardBrand && (
						<div className='flex items-center gap-1'>
							{getCardBrandIcon('small')}
							<span className='text-xs text-light/70 capitalize'>
								{cardBrand}
							</span>
						</div>
					)}
				</div>

				<div className='text-xs text-light/50 flex items-center gap-1'>
					<AiOutlineLock className='text-accent2/70' />
					<span>Conexión segura</span>
				</div>
			</div>

			{/* Instrucciones para flip */}
			<div className='mt-2 text-center'>
				<span className='text-xs text-light/40'>
					{isCardFlipped
						? 'Código de seguridad en el reverso'
						: 'Haz click en el campo CVV para ver el reverso'}
				</span>
			</div>
		</div>
	);
};

export default CreditCardDisplay;
