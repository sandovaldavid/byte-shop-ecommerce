import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineInfoCircle,
	AiOutlineCheck,
} from 'react-icons/ai';
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcAmex,
	FaCcDiscover,
	FaCcJcb,
} from 'react-icons/fa';

const CardNumberInput = ({
	value = '',
	onChange,
	error = '',
	disabled = false,
	autoFocus = false,
	onValidChange = () => {},
	onBrandChange = () => {},
	onBlurChange = () => {},
	updateCardDisplay = () => {},
	className = '',
}) => {
	// Estados para manejar la interfaz y validación
	const [focused, setFocused] = useState(false);
	const [cardBrand, setCardBrand] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [formattedNumber, setFormattedNumber] = useState('');
	const [hasInteracted, setHasInteracted] = useState(false);
	const inputRef = useRef(null);

	// Detectar el tipo de tarjeta basado en el número
	const detectCardBrand = (number) => {
		// Eliminar espacios y guiones
		const cleanNumber = number.replace(/[\s-]/g, '');

		// Patrones de detección de marca basados en BIN (Bank Identification Number)
		let brand = '';

		// Visa: comienza con 4
		if (/^4/.test(cleanNumber)) {
			brand = 'visa';
		}
		// Mastercard: comienza con 51-55 o 2221-2720
		else if (
			/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1])/.test(cleanNumber)
		) {
			brand = 'mastercard';
		}
		// American Express: comienza con 34 o 37
		else if (/^3[47]/.test(cleanNumber)) {
			brand = 'amex';
		}
		// Discover: comienza con 6011, 622126-622925, 644-649, 65
		else if (
			/^(6011|65|64[4-9]|622(12[6-9]|1[3-9]|[2-8]|9[01]|92[0-5]))/.test(
				cleanNumber
			)
		) {
			brand = 'discover';
		}
		// JCB: comienza con 35
		else if (/^35/.test(cleanNumber)) {
			brand = 'jcb';
		}

		return brand;
	};

	// Aplicar el algoritmo de Luhn para validar el número de tarjeta
	const validateCardNumber = (number) => {
		if (!number) return false;

		const digits = number.replace(/\D/g, '');

		if (digits.length < 13) return false; // Demasiado corto

		// Algoritmo de Luhn (Mod 10)
		let sum = 0;
		let doubleUp = false;

		// Procesar de derecha a izquierda
		for (let i = digits.length - 1; i >= 0; i--) {
			let digit = parseInt(digits.charAt(i), 10);

			if (doubleUp) {
				digit *= 2;
				if (digit > 9) digit -= 9;
			}

			sum += digit;
			doubleUp = !doubleUp;
		}

		return sum % 10 === 0;
	};

	// Formatear el número de tarjeta según el tipo
	const formatCardNumber = (value, brand) => {
		if (!value) return '';

		// Eliminar todos los caracteres no numéricos
		const cleanValue = value.replace(/\D/g, '');

		// Obtener la longitud máxima según el tipo de tarjeta
		const maxLength = brand === 'amex' ? 15 : 16;

		// Limitar la longitud
		const limitedValue = cleanValue.substring(0, maxLength);

		// Formatear según tipo de tarjeta
		let formatted = '';
		if (brand === 'amex') {
			// Formato 4-6-5 para American Express
			for (let i = 0; i < limitedValue.length; i++) {
				if (i === 4 || i === 10) {
					formatted += ' ';
				}
				formatted += limitedValue[i];
			}
		} else {
			// Formato 4-4-4-4 para otras tarjetas
			for (let i = 0; i < limitedValue.length; i++) {
				if (i > 0 && i % 4 === 0) {
					formatted += ' ';
				}
				formatted += limitedValue[i];
			}
		}

		return formatted;
	};

	// Obtener el icono correspondiente a la marca de la tarjeta
	const getCardBrandIcon = () => {
		switch (cardBrand) {
			case 'visa':
				return <FaCcVisa className='text-[#1434CB] text-xl' />;
			case 'mastercard':
				return <FaCcMastercard className='text-[#EB001B] text-xl' />;
			case 'amex':
				return <FaCcAmex className='text-[#2E77BC] text-xl' />;
			case 'discover':
				return <FaCcDiscover className='text-[#FF6000] text-xl' />;
			case 'jcb':
				return <FaCcJcb className='text-[#0b4ea2] text-xl' />;
			default:
				return (
					<AiOutlineCreditCard className='text-light/50 text-lg' />
				);
		}
	};

	// Efectos para validación y actualización
	useEffect(() => {
		if (!value) {
			if (
				cardBrand !== '' ||
				isValid !== false ||
				formattedNumber !== ''
			) {
				setCardBrand('');
				setIsValid(false);
				setFormattedNumber('');
				onBrandChange('');
				onValidChange(false);
				updateCardDisplay('');
			}
			return;
		}

		// Clean value for validation
		const cleanValue = value.replace(/\D/g, '');

		// Detect brand based on clean value
		const detectedBrand = detectCardBrand(cleanValue);

		// Validate the card number
		const isNumberValid = validateCardNumber(cleanValue);

		// Format the value for display based on the detected brand
		const formatted = formatCardNumber(value, detectedBrand);

		// Check if we need to update state (avoid unnecessary re-renders)
		if (
			cardBrand !== detectedBrand ||
			isValid !== isNumberValid ||
			formattedNumber !== formatted
		) {
			setCardBrand(detectedBrand);
			setIsValid(isNumberValid);
			setFormattedNumber(formatted);

			// Notify parent components
			onBrandChange(detectedBrand);
			onValidChange(isNumberValid);
			updateCardDisplay(formatted);
		}
	}, [
		value,
		cardBrand,
		isValid,
		formattedNumber,
		onBrandChange,
		onValidChange,
		updateCardDisplay,
	]);

	// Manejar cambios en el input
	const handleChange = (e) => {
		const inputValue = e.target.value;

		// Permitir solamente números y espacios
		if (/[^\d\s]/.test(inputValue)) return;

		// Detectar marca para determinar longitud máxima
		const cleanValue = inputValue.replace(/\s/g, '');
		const brand = detectCardBrand(cleanValue);
		const maxLength = brand === 'amex' ? 17 : 19; // Incluye espacios

		if (inputValue.length <= maxLength) {
			// Pasar al padre SOLO los dígitos (sin espacios)
			onChange(cleanValue);

			if (!hasInteracted) {
				setHasInteracted(true);
			}
		}
	};

	// Manejar el enfoque en el input
	const handleFocus = () => {
		setFocused(true);
	};

	// Manejar cuando pierde el enfoque
	const handleBlur = () => {
		setFocused(false);
		onBlurChange(value, cardBrand);
	};

	// Obtener el mensaje de ayuda según la marca de la tarjeta
	const getCardHintText = () => {
		if (!cardBrand) return 'Ingresa el número de tu tarjeta';

		switch (cardBrand) {
			case 'visa':
				return 'Tarjeta Visa detectada';
			case 'mastercard':
				return 'Tarjeta Mastercard detectada';
			case 'amex':
				return 'Tarjeta American Express detectada';
			case 'discover':
				return 'Tarjeta Discover detectada';
			case 'jcb':
				return 'Tarjeta JCB detectada';
			default:
				return 'Tarjeta no reconocida';
		}
	};

	return (
		<div className={`relative w-full ${className}`}>
			<label
				htmlFor='cardNumber'
				className={`block text-sm font-medium mb-1.5 transition-colors duration-200 ${
					focused ? 'text-primary' : 'text-light/70'
				}`}>
				Número de tarjeta
			</label>

			<div className='relative group'>
				{/* Icono del campo */}
				<div
					className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
						focused
							? 'text-primary'
							: cardBrand
								? 'opacity-100'
								: 'text-light/50'
					}`}>
					{getCardBrandIcon()}
				</div>

				{/* Campo de entrada */}
				<motion.input
					id='cardNumber'
					ref={inputRef}
					type='text'
					inputMode='numeric'
					value={formattedNumber}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					disabled={disabled}
					autoFocus={autoFocus}
					placeholder='1234 5678 9012 3456'
					autoComplete='cc-number'
					animate={focused ? { scale: [1, 1.01, 1] } : {}}
					className={`
            w-full bg-white/5 border rounded-lg py-3 pl-12 pr-4 text-light placeholder:text-light/30 font-mono tracking-wider
            focus:outline-none focus:ring-2 transition-all duration-300
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/[0.07]'}
            ${
				error
					? 'border-error/50 focus:ring-error/20'
					: focused
						? 'border-primary/50 focus:ring-primary/20'
						: isValid && cardBrand && hasInteracted
							? 'border-accent2/30 focus:ring-accent2/20'
							: 'border-white/10 focus:ring-primary/20'
			}
          `}
				/>

				{/* Indicador de validación en el borde derecho */}
				{hasInteracted && value && (
					<div
						className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-lg transition-all duration-300 ${
							isValid && cardBrand
								? 'bg-accent2'
								: value.length > 8
									? 'bg-light/10'
									: 'hidden'
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

			{/* Mensaje de ayuda o validación */}
			<AnimatePresence>
				{!error && (focused || (cardBrand && hasInteracted)) && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='flex items-center justify-between mt-1.5'>
						<span
							className={`text-xs flex items-center gap-1 ${
								isValid && cardBrand
									? 'text-accent2'
									: 'text-light/50'
							}`}>
							{isValid && cardBrand ? (
								<>
									<AiOutlineCheck className='flex-shrink-0' />
									<span>Número válido</span>
								</>
							) : (
								<>
									<AiOutlineInfoCircle className='flex-shrink-0 text-primary/70' />
									<span>{getCardHintText()}</span>
								</>
							)}
						</span>

						{cardBrand && (
							<div className='flex items-center gap-1.5'>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className={`h-4 w-auto transition-opacity ${cardBrand === 'visa' ? 'opacity-100' : 'opacity-30'}`}>
									<FaCcVisa className='h-4 text-[#1434CB]' />
								</motion.div>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className={`h-4 w-auto transition-opacity ${cardBrand === 'mastercard' ? 'opacity-100' : 'opacity-30'}`}>
									<FaCcMastercard className='h-4 text-[#EB001B]' />
								</motion.div>
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className={`h-4 w-auto transition-opacity ${cardBrand === 'amex' ? 'opacity-100' : 'opacity-30'}`}>
									<FaCcAmex className='h-4 text-[#2E77BC]' />
								</motion.div>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CardNumberInput;
