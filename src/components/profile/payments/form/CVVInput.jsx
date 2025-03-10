import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineLock,
	AiOutlineInfoCircle,
	AiOutlineQuestionCircle,
	AiOutlineCheck,
} from 'react-icons/ai';
import { RiShieldCheckLine } from 'react-icons/ri';

const CVVInput = ({
	value = '',
	onChange,
	error = '',
	disabled = false,
	onValidChange = () => {},
	onFocus = () => {},
	onBlur = () => {},
	updateCardDisplay = () => {},
	maxLength = 4,
	className = '',
	cardBrand = '',
}) => {
	// Estados para manejar la interfaz y validación
	const [focused, setFocused] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isHelpVisible, setIsHelpVisible] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// Determinar la longitud esperada del CVV según la marca de la tarjeta
	const getExpectedLength = () => {
		return cardBrand?.toLowerCase() === 'amex' ? 4 : 3;
	};

	// Validar el CVV
	useEffect(() => {
		const expectedLength = getExpectedLength();
		const valid =
			value && value.length === expectedLength && /^\d+$/.test(value);
		setIsValid(valid);
		onValidChange(valid);
		updateCardDisplay(value);
	}, [value, cardBrand, onValidChange, updateCardDisplay]);

	// Manejar cambios en el input
	const handleChange = (e) => {
		const newValue = e.target.value.replace(/\D/g, ''); // Solo permitir dígitos

		if (newValue.length <= maxLength) {
			onChange(newValue);

			if (!hasInteracted) {
				setHasInteracted(true);
			}
		}
	};

	// Manejar el enfoque en el input
	const handleFocus = (e) => {
		setFocused(true);
		setIsAnimating(true);
		onFocus(e);

		// Detener animación después de un tiempo
		setTimeout(() => setIsAnimating(false), 300);
	};

	// Manejar cuando pierde el enfoque
	const handleBlur = (e) => {
		setFocused(false);
		onBlur(e);
		setIsHelpVisible(false);
	};

	// Mostrar/ocultar ayuda visual
	const toggleHelp = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsHelpVisible(!isHelpVisible);
	};

	return (
		<div className={`relative w-full ${className}`}>
			{/* Etiqueta y botón de ayuda */}
			<div className='flex justify-between items-center mb-1.5'>
				<label
					htmlFor='cvvInput'
					className={`text-sm font-medium transition-colors duration-200 ${
						focused ? 'text-primary' : 'text-light/70'
					}`}>
					Código de seguridad (CVV)
				</label>

				<button
					type='button'
					onClick={toggleHelp}
					className='text-light/50 hover:text-light transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20'
					aria-label='Mostrar ayuda sobre el CVV'>
					<AiOutlineQuestionCircle className='text-sm' />
				</button>
			</div>

			{/* Campo de entrada */}
			<div className='relative group'>
				<div
					className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
						focused
							? 'text-primary'
							: hasInteracted && value
								? isValid
									? 'text-accent2'
									: 'text-light/50'
								: 'text-light/50'
					}`}>
					{isValid && value ? (
						<RiShieldCheckLine className='text-accent2' />
					) : (
						<AiOutlineLock />
					)}
				</div>

				<motion.input
					id='cvvInput'
					type='text'
					inputMode='numeric'
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					maxLength={maxLength}
					placeholder={
						cardBrand?.toLowerCase() === 'amex'
							? '4 dígitos'
							: '3 dígitos'
					}
					autoComplete='cc-csc'
					animate={isAnimating ? { scale: [1, 1.01, 1] } : {}}
					className={`
            w-full bg-white/5 border rounded-lg py-3 pl-10 pr-4 text-light placeholder:text-light/30 text-center
            focus:outline-none focus:ring-2 transition-all duration-300
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/[0.07]'}
            ${
				error
					? 'border-error/50 focus:ring-error/20'
					: focused
						? 'border-primary/50 focus:ring-primary/20'
						: isValid && value
							? 'border-accent2/30 focus:ring-accent2/20'
							: 'border-white/10 focus:ring-primary/20'
			}
          `}
				/>

				{/* Indicador de validación en el borde derecho */}
				{hasInteracted && value && (
					<div
						className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-lg transition-all duration-300 ${
							isValid ? 'bg-accent2' : 'bg-light/10'
						}`}
					/>
				)}
			</div>

			{/* Mensaje de error */}
			<AnimatePresence>
				{error && (
					<motion.p
						initial={{ opacity: 0, y: -10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'auto' }}
						exit={{ opacity: 0, y: -10, height: 0 }}
						transition={{ duration: 0.2 }}
						className='text-error text-xs mt-1.5 flex items-center gap-1'>
						<AiOutlineInfoCircle className='flex-shrink-0' />
						<span>{error}</span>
					</motion.p>
				)}
			</AnimatePresence>

			{/* Mensaje de ayuda */}
			{!error && focused && (
				<motion.p
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className='text-xs text-light/50 mt-1.5 flex items-center gap-1'>
					<AiOutlineInfoCircle className='flex-shrink-0 text-primary/70' />
					<span>
						{cardBrand?.toLowerCase() === 'amex'
							? 'Ingresa los 4 dígitos del frente de la tarjeta'
							: 'Ingresa los 3 dígitos del reverso de la tarjeta'}
					</span>
				</motion.p>
			)}

			{/* Ventana emergente de ayuda */}
			<AnimatePresence>
				{isHelpVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -10, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className='absolute z-10 mt-2 p-4 bg-dark/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg w-[280px] right-0'>
						<div className='flex items-start gap-3'>
							<div className='p-2 bg-primary/20 rounded-full'>
								<RiShieldCheckLine className='text-primary text-lg' />
							</div>
							<div>
								<h5 className='text-sm font-medium text-light mb-1'>
									¿Qué es el código CVV?
								</h5>
								<p className='text-xs text-light/70 leading-relaxed mb-2'>
									Es el código de seguridad de tu tarjeta,
									generalmente de 3 dígitos (4 en American
									Express).
								</p>
								<div className='flex items-center gap-2 mt-3'>
									<div className='relative h-8 w-14 bg-gradient-to-r from-gray/30 to-gray/40 rounded-md flex items-center justify-center'>
										<span className='text-[10px] text-light/50 font-mono'>
											***
										</span>
										<div className='absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1'>
											<AiOutlineLock className='text-[8px] text-light/70' />
										</div>
									</div>
									<p className='text-xs text-light/60'>
										{cardBrand?.toLowerCase() === 'amex'
											? 'En la parte frontal de la tarjeta'
											: 'En el reverso de la tarjeta'}
									</p>
								</div>
							</div>
						</div>
						<button
							onClick={toggleHelp}
							className='absolute top-2 right-2 text-light/50 hover:text-light p-1'>
							<AiOutlineClose className='text-xs' />
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CVVInput;
