import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineClose,
	AiOutlineInfoCircle,
	AiOutlineEdit,
} from 'react-icons/ai';
import { RiSecurePaymentLine } from 'react-icons/ri';

const FormHeader = ({
	title = 'Nuevo método de pago',
	subtitle = 'Ingresa la información de tu tarjeta',
	onClose,
	isEditMode = false,
	cardBrand = '',
	className = '',
	animateEntry = true,
}) => {
	const [isHintVisible, setIsHintVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	// Manejador para cierre con animación
	const handleClose = () => {
		setIsClosing(true);
		// Permitir que la animación termine antes de llamar a onClose
		setTimeout(() => {
			onClose && onClose();
		}, 300);
	};

	// Variantes para animaciones
	const headerVariants = {
		hidden: {
			opacity: 0,
			y: -20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.3,
				ease: 'easeIn',
			},
		},
	};

	// Obtener el icono y el nombre de la marca de la tarjeta si está en modo edición
	const getCardBrandInfo = () => {
		switch (cardBrand?.toLowerCase()) {
			case 'visa':
				return { name: 'Visa', color: 'text-[#1434CB]' };
			case 'mastercard':
				return { name: 'Mastercard', color: 'text-[#EB001B]' };
			case 'amex':
				return { name: 'American Express', color: 'text-[#2E77BC]' };
			case 'discover':
				return { name: 'Discover', color: 'text-[#FF6000]' };
			default:
				return { name: cardBrand, color: 'text-light' };
		}
	};

	const cardInfo = getCardBrandInfo();

	return (
		<motion.div
			className={`mb-6 ${className}`}
			initial={animateEntry ? 'hidden' : 'visible'}
			animate='visible'
			exit='exit'
			variants={headerVariants}>
			{/* Encabezado con título y botón de cerrar */}
			<div className='flex justify-between items-center mb-2'>
				<div className='flex items-center gap-3'>
					<div className='h-10 w-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10'>
						{isEditMode ? (
							<AiOutlineEdit className='text-xl text-primary' />
						) : (
							<AiOutlineCreditCard className='text-xl text-primary' />
						)}
					</div>

					<h2 className='text-xl font-medium text-light'>
						{title}
						{isEditMode && cardBrand && (
							<span className={`text-sm ml-2 ${cardInfo.color}`}>
								({cardInfo.name})
							</span>
						)}
					</h2>
				</div>

				<motion.button
					type='button'
					onClick={handleClose}
					className='w-8 h-8 rounded-full flex items-center justify-center text-light/60 hover:text-light bg-white/5 hover:bg-white/10 transition-colors border border-white/10'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					aria-label='Cerrar formulario'>
					<AiOutlineClose />
				</motion.button>
			</div>

			{/* Subtítulo con información adicional */}
			<div className='flex justify-between items-center ml-[52px]'>
				<div className='flex items-start gap-2'>
					<p className='text-sm text-light/60'>{subtitle}</p>

					{/* Botón de información */}
					<motion.button
						type='button'
						onClick={() => setIsHintVisible(!isHintVisible)}
						className='text-light/40 hover:text-light/70 transition-colors text-sm'
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						aria-label='Mostrar más información'>
						<AiOutlineInfoCircle />
					</motion.button>
				</div>

				{/* Indicador de seguridad */}
				<div className='hidden sm:flex items-center gap-1.5 text-xs text-light/40 bg-white/5 rounded-full px-2.5 py-1 border border-white/5'>
					<RiSecurePaymentLine className='text-accent2/70' />
					<span className='hidden sm:inline'>Conexión segura</span>
				</div>
			</div>

			{/* Mensaje de información */}
			<AnimatePresence>
				{isHintVisible && (
					<motion.div
						initial={{ opacity: 0, height: 0, marginTop: 0 }}
						animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
						exit={{ opacity: 0, height: 0, marginTop: 0 }}
						transition={{ duration: 0.3 }}
						className='ml-[52px] text-xs text-light/50 bg-white/5 p-3 rounded-lg border border-white/10'>
						<div className='flex items-start gap-2'>
							<AiOutlineInfoCircle className='text-primary/70 flex-shrink-0 mt-0.5' />
							<p>
								Tu información se transmite de forma segura y
								nunca almacenamos el número completo de tu
								tarjeta. Solo guardamos los últimos 4 dígitos
								para identificarla en el futuro.
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Separador */}
			<div className='mt-5 border-b border-white/5'></div>
		</motion.div>
	);
};

export default FormHeader;
