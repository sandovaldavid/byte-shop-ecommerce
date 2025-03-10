import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineUser,
	AiOutlineInfoCircle,
	AiOutlineCheck,
} from 'react-icons/ai';

const CardHolderInput = ({
	value = '',
	onChange,
	error = '',
	disabled = false,
	autoFocus = false,
	onValidChange = () => {},
	updateCardDisplay = () => {},
	className = '',
}) => {
	// Estados para manejar validación y animaciones
	const [focused, setFocused] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	// Efectos para la validación
	useEffect(() => {
		// Validar que el nombre sea válido (al menos nombre y apellido)
		const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
		const valid = value.trim().length > 5 && namePattern.test(value);
		setIsValid(valid);

		// Notificar al componente padre sobre el cambio de validez
		onValidChange(valid);

		// Actualizar la visualización de la tarjeta
		updateCardDisplay(value);
	}, [value, onValidChange, updateCardDisplay]);

	// Manejar cambios en el input
	const handleChange = (e) => {
		// Permitir solo letras y espacios
		const newValue = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
		onChange(newValue);

		if (!hasInteracted) {
			setHasInteracted(true);
		}
	};

	// Formatear el nombre para mostrar capitalizado
	const formatName = (name) => {
		if (!name) return '';

		return name
			.trim()
			.split(' ')
			.map(
				(part) =>
					part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
			)
			.join(' ');
	};

	// Manejar enfoque en el input
	const handleFocus = () => {
		setFocused(true);
		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 300);
	};

	// Manejar cuando pierde el enfoque
	const handleBlur = () => {
		setFocused(false);
		if (value) {
			onChange(formatName(value));
		}
	};

	return (
		<div className={`relative w-full ${className}`}>
			<label
				htmlFor='cardHolderName'
				className={`block text-sm font-medium mb-1.5 transition-all duration-200 ${
					focused ? 'text-primary' : 'text-light/70'
				}`}>
				Nombre del titular
			</label>

			<div className='relative group'>
				{/* Icono del campo */}
				<div
					className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
						focused
							? 'text-primary'
							: hasInteracted && value
								? isValid
									? 'text-accent2'
									: 'text-light/50'
								: 'text-light/50'
					}`}>
					{isValid && value ? (
						<AiOutlineCheck className='text-accent2' />
					) : (
						<AiOutlineUser />
					)}
				</div>

				{/* Campo de entrada */}
				<motion.input
					id='cardHolderName'
					type='text'
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					autoFocus={autoFocus}
					placeholder='NOMBRE COMPLETO'
					autoComplete='cc-name'
					animate={isAnimating ? { scale: [1, 1.01, 1] } : {}}
					className={`
            w-full bg-white/5 border rounded-lg py-3 pl-10 pr-4 text-light placeholder:text-light/30
            focus:outline-none focus:ring-2 transition-all duration-300
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/[0.07]'}
            ${
				error
					? 'border-error/50 focus:ring-error/20'
					: focused
						? 'border-primary/50 focus:ring-primary/20'
						: isValid && value
							? 'border-accent2/30 focus:ring-accent2/20'
							: 'border-white/10 focus:border-primary/50 focus:ring-primary/20'
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
			{focused && !error && (
				<motion.p
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className='text-xs text-light/50 mt-1.5 flex items-center gap-1'>
					<AiOutlineInfoCircle className='flex-shrink-0 text-primary/70' />
					<span>
						Ingresa el nombre completo como aparece en la tarjeta
					</span>
				</motion.p>
			)}
		</div>
	);
};

export default CardHolderInput;
