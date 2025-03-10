import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Add AnimatePresence here
import {
	AiOutlineCheck,
	AiOutlineStar,
	AiOutlineInfoCircle,
} from 'react-icons/ai';

const DefaultCheckbox = ({
	isChecked = false,
	onChange = () => {},
	disabled = false,
	showHint = false,
	label = 'Establecer como método de pago predeterminado',
	className = '',
}) => {
	// Estados locales
	const [isFocused, setIsFocused] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [animateCheckmark, setAnimateCheckmark] = useState(false);

	// Efecto para la animación del checkmark al marcar
	useEffect(() => {
		if (isChecked) {
			setAnimateCheckmark(true);
			const timer = setTimeout(() => setAnimateCheckmark(false), 750);
			return () => clearTimeout(timer);
		}
	}, [isChecked]);

	// Variantes de animación para el checkmark
	const checkmarkVariants = {
		checked: {
			pathLength: 1,
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeOut' },
		},
		unchecked: {
			pathLength: 0,
			opacity: 0,
			transition: { duration: 0.3, ease: 'easeIn' },
		},
	};

	// Variantes para el contenedor del checkbox
	const boxVariants = {
		hover: { scale: 1.05, transition: { duration: 0.2 } },
		tap: { scale: 0.95, transition: { duration: 0.1 } },
		checked: {
			backgroundColor: 'rgba(var(--accent2-rgb), 0.2)',
			borderColor: 'rgba(var(--accent2-rgb), 0.6)',
			transition: { duration: 0.3 },
		},
		unchecked: {
			backgroundColor: 'rgba(255, 255, 255, 0.05)',
			borderColor: 'rgba(255, 255, 255, 0.2)',
			transition: { duration: 0.3 },
		},
		focused: {
			boxShadow: '0 0 0 2px rgba(var(--accent2-rgb), 0.3)',
			transition: { duration: 0.2 },
		},
	};

	// Variantes para el tooltip
	const tooltipVariants = {
		hidden: { opacity: 0, y: 10, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.2 },
		},
	};

	// Handler para cambio de estado
	const handleChange = () => {
		if (!disabled) {
			onChange(!isChecked);
		}
	};

	// Handler para el foco
	const handleFocus = () => {
		setIsFocused(true);
	};

	// Handler para la pérdida de foco
	const handleBlur = () => {
		setIsFocused(false);
	};

	// Mostrar/ocultar tooltip
	const toggleTooltip = () => {
		if (!disabled) {
			setShowTooltip(!showTooltip);
		}
	};

	return (
		<div className={`relative ${className}`}>
			<label className='flex items-start sm:items-center gap-3 select-none cursor-pointer group'>
				{/* Checkbox con animación */}
				<div className='relative'>
					<input
						type='checkbox'
						checked={isChecked}
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						disabled={disabled}
						className='sr-only' // Oculto visualmente pero accesible
						aria-checked={isChecked}
					/>

					<motion.div
						className={`
              flex items-center justify-center w-5 h-5 rounded transition-all 
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              border
            `}
						variants={boxVariants}
						initial={isChecked ? 'checked' : 'unchecked'}
						animate={[
							isChecked ? 'checked' : 'unchecked',
							isFocused ? 'focused' : '',
						]}
						whileHover={!disabled ? 'hover' : ''}
						whileTap={!disabled ? 'tap' : ''}>
						<motion.svg
							className='w-3.5 h-3.5 text-accent2'
							viewBox='0 0 24 24'
							fill='none'
							initial={isChecked ? 'checked' : 'unchecked'}
							animate={isChecked ? 'checked' : 'unchecked'}>
							<motion.path
								d='M5 13l4 4L19 7'
								stroke='currentColor'
								strokeWidth={3}
								strokeLinecap='round'
								strokeLinejoin='round'
								variants={checkmarkVariants}
							/>
						</motion.svg>
					</motion.div>

					{/* Animación de estrella cuando es predeterminado */}
					<AnimatePresence>
						{isChecked && animateCheckmark && (
							<motion.div
								className='absolute -right-1.5 -top-1.5 text-accent2'
								initial={{ scale: 0, rotate: -30 }}
								animate={{ scale: 1, rotate: 0 }}
								exit={{ scale: 0, rotate: 30 }}
								transition={{ type: 'spring', damping: 10 }}>
								<AiOutlineStar className='text-xs' />
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Contenido de la etiqueta */}
				<div className='flex flex-col'>
					<div className='flex items-center gap-1.5'>
						<span
							className={`text-sm ${isChecked ? 'text-light' : 'text-light/70'} transition-colors group-hover:text-light`}>
							{label}
						</span>

						{/* Icono de información con tooltip */}
						{showHint && (
							<div className='relative'>
								<button
									type='button'
									onClick={(e) => {
										e.preventDefault();
										toggleTooltip();
									}}
									className='text-light/50 hover:text-light/80 transition-colors focus:outline-none'
									aria-label='Más información'>
									<AiOutlineInfoCircle className='text-xs' />
								</button>

								<AnimatePresence>
									{showTooltip && (
										<motion.div
											className='absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-64 p-3 text-xs bg-dark/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg text-light/80'
											variants={tooltipVariants}
											initial='hidden'
											animate='visible'
											exit='hidden'>
											<div className='flex items-start gap-2'>
												<AiOutlineStar className='text-accent2 flex-shrink-0 mt-0.5' />
												<p>
													Este método de pago se
													utilizará automáticamente
													para todas tus compras
													futuras.
												</p>
											</div>
											<div className='w-2 h-2 bg-dark/90 border-r border-b border-white/10 absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45'></div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)}
					</div>

					{/* Mensaje adicional cuando está seleccionado */}
					<AnimatePresence>
						{isChecked && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: 'auto', opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.2 }}>
								<p className='text-xs text-accent2/80 mt-1 flex items-center gap-1'>
									<AiOutlineStar className='text-[10px]' />
									<span>
										Método predeterminado para compras
										futuras
									</span>
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</label>
		</div>
	);
};

export default DefaultCheckbox;
