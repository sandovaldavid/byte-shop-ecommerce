import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineCalendar,
	AiOutlineInfoCircle,
	AiOutlineCheck,
	AiOutlineWarning,
} from 'react-icons/ai';

const ExpiryDateInputs = ({
	month = '',
	year = '',
	onChangeMonth,
	onChangeYear,
	monthError = '',
	yearError = '',
	disabled = false,
	onValidChange = () => {},
	updateCardDisplay = () => {},
	className = '',
}) => {
	// Estados para manejar la UI y validaciones
	const [focused, setFocused] = useState(null); // 'month', 'year', o null
	const [isValid, setIsValid] = useState({
		month: false,
		year: false,
		combined: false,
	});
	const [isNearExpiry, setIsNearExpiry] = useState(false);
	const [hasInteracted, setHasInteracted] = useState({
		month: false,
		year: false,
	});

	// Obtener arrays de meses y años para los selectores
	const months = Array.from({ length: 12 }, (_, i) => {
		const num = i + 1;
		return {
			value: num < 10 ? `0${num}` : `${num}`,
			label: num < 10 ? `0${num}` : `${num}`,
		};
	});

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 12 }, (_, i) => {
		const fullYear = currentYear + i;
		return {
			value: fullYear.toString().slice(-2), // Solo los últimos 2 dígitos (ej: 23, 24...)
			label: fullYear.toString().slice(-2),
			fullYear,
		};
	});

	// Efecto para validar las fechas
	useEffect(() => {
		// Validar campo de mes
		const monthValid =
			month !== '' && parseInt(month) >= 1 && parseInt(month) <= 12;

		// Validar campo de año
		const yearValid = year !== '' && years.some((y) => y.value === year);

		// Validar que la fecha combinada sea en el futuro
		const combinedValid = validateExpiryDate(month, year);

		// Verificar si está cerca de expirar (en los próximos 3 meses)
		const nearExpiry = checkNearExpiry(month, year);
		setIsNearExpiry(nearExpiry && combinedValid);

		setIsValid({
			month: monthValid,
			year: yearValid,
			combined: combinedValid,
		});

		// Notificar al componente padre sobre la validez
		onValidChange(combinedValid);

		// Actualizar la visualización de la tarjeta
		updateCardDisplay(month, year);
	}, [month, year, onValidChange, updateCardDisplay]);

	// Validar si la fecha de expiración es futura
	const validateExpiryDate = (m, y) => {
		if (!m || !y) return false;

		const inputMonth = parseInt(m);
		const inputYear = parseInt(`20${y}`);
		const now = new Date();
		const currentMonth = now.getMonth() + 1; // getMonth() es 0-indexed
		const currentYear = now.getFullYear();

		return (
			inputYear > currentYear ||
			(inputYear === currentYear && inputMonth >= currentMonth)
		);
	};

	// Verificar si la tarjeta está cerca de expirar (3 meses)
	const checkNearExpiry = (m, y) => {
		if (!m || !y) return false;

		const inputMonth = parseInt(m);
		const inputYear = parseInt(`20${y}`);
		const now = new Date();
		const currentMonth = now.getMonth() + 1;
		const currentYear = now.getFullYear();

		// Calcular fecha 3 meses en el futuro
		let futureMonth = currentMonth + 3;
		let futureYear = currentYear;

		if (futureMonth > 12) {
			futureMonth -= 12;
			futureYear += 1;
		}

		// Está cerca de expirar si está entre la fecha actual y 3 meses en el futuro
		return (
			inputYear < futureYear ||
			(inputYear === futureYear && inputMonth <= futureMonth)
		);
	};

	// Manejadores de eventos
	const handleMonthChange = (e) => {
		onChangeMonth(e.target.value);
		if (!hasInteracted.month) {
			setHasInteracted({ ...hasInteracted, month: true });
		}
	};

	const handleYearChange = (e) => {
		onChangeYear(e.target.value);
		if (!hasInteracted.year) {
			setHasInteracted({ ...hasInteracted, year: true });
		}
	};

	const handleFocus = (field) => {
		setFocused(field);
	};

	const handleBlur = () => {
		setFocused(null);
	};

	return (
		<div className={`relative ${className}`}>
			<label
				className={`block text-sm font-medium mb-1.5 transition-colors duration-200 ${
					focused ? 'text-primary' : 'text-light/70'
				}`}>
				Fecha de expiración
			</label>

			<div className='flex flex-wrap sm:flex-nowrap gap-3'>
				{/* Selector de mes */}
				<div className='relative w-full'>
					<div
						className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
							focused === 'month'
								? 'text-primary'
								: isValid.month
									? 'text-accent2'
									: 'text-light/50'
						}`}>
						<AiOutlineCalendar />
					</div>

					<motion.select
						value={month}
						onChange={handleMonthChange}
						onFocus={() => handleFocus('month')}
						onBlur={handleBlur}
						disabled={disabled}
						animate={
							focused === 'month' ? { scale: [1, 1.01, 1] } : {}
						}
						className={`
              w-full bg-white/5 border rounded-lg py-3 pl-10 pr-4 text-light appearance-none
              focus:outline-none focus:ring-2 transition-all duration-300
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/[0.07]'}
              ${
					monthError
						? 'border-error/50 focus:ring-error/20'
						: focused === 'month'
							? 'border-primary/50 focus:ring-primary/20'
							: isValid.month
								? 'border-accent2/30 focus:ring-accent2/20'
								: 'border-white/10 focus:ring-primary/20'
				}
            `}>
						<option value='' className='bg-dark text-light/50'>
							Mes
						</option>
						{months.map((m) => (
							<option
								key={m.value}
								value={m.value}
								className='bg-dark text-light'>
								{m.label}
							</option>
						))}
					</motion.select>

					{/* Indicador de validación */}
					{hasInteracted.month && month && (
						<div
							className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-lg transition-all duration-300 ${
								isValid.month ? 'bg-accent2' : 'bg-light/10'
							}`}
						/>
					)}

					{/* Ícono de flecha personalizado */}
					<div className='absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<svg
							className={`h-4 w-4 transition-colors ${focused === 'month' ? 'text-primary' : 'text-light/50'}`}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>

				{/* Selector de año */}
				<div className='relative w-full'>
					<motion.select
						value={year}
						onChange={handleYearChange}
						onFocus={() => handleFocus('year')}
						onBlur={handleBlur}
						disabled={disabled}
						animate={
							focused === 'year' ? { scale: [1, 1.01, 1] } : {}
						}
						className={`
              w-full bg-white/5 border rounded-lg py-3 px-4 text-light appearance-none
              focus:outline-none focus:ring-2 transition-all duration-300
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white/[0.07]'}
              ${
					yearError
						? 'border-error/50 focus:ring-error/20'
						: focused === 'year'
							? 'border-primary/50 focus:ring-primary/20'
							: isValid.year
								? 'border-accent2/30 focus:ring-accent2/20'
								: 'border-white/10 focus:ring-primary/20'
				}
            `}>
						<option value='' className='bg-dark text-light/50'>
							Año
						</option>
						{years.map((y) => (
							<option
								key={y.value}
								value={y.value}
								className='bg-dark text-light'>
								{y.label}
							</option>
						))}
					</motion.select>

					{/* Indicador de validación */}
					{hasInteracted.year && year && (
						<div
							className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-lg transition-all duration-300 ${
								isValid.year ? 'bg-accent2' : 'bg-light/10'
							}`}
						/>
					)}

					{/* Ícono de flecha personalizado */}
					<div className='absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none'>
						<svg
							className={`h-4 w-4 transition-colors ${focused === 'year' ? 'text-primary' : 'text-light/50'}`}
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Mensajes de error */}
			<AnimatePresence>
				{(monthError || yearError) && (
					<motion.p
						initial={{ opacity: 0, y: -10, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'auto' }}
						exit={{ opacity: 0, y: -10, height: 0 }}
						transition={{ duration: 0.2 }}
						className='text-error text-xs mt-1.5 flex items-center gap-1'>
						<AiOutlineInfoCircle className='flex-shrink-0' />
						<span>{monthError || yearError}</span>
					</motion.p>
				)}
			</AnimatePresence>

			{/* Mensaje de ayuda o aviso de expiración */}
			<AnimatePresence>
				{!monthError && !yearError && month && year && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className='mt-1.5'>
						{isNearExpiry ? (
							<div className='flex items-center gap-1 text-xs text-accent1'>
								<AiOutlineWarning className='flex-shrink-0' />
								<span>Esta tarjeta expirará pronto</span>
							</div>
						) : isValid.combined ? (
							<div className='flex items-center gap-1 text-xs text-accent2'>
								<AiOutlineCheck className='flex-shrink-0' />
								<span>Fecha válida</span>
							</div>
						) : hasInteracted.month && hasInteracted.year ? (
							<div className='flex items-center gap-1 text-xs text-error'>
								<AiOutlineInfoCircle className='flex-shrink-0' />
								<span>
									La fecha de expiración debe ser futura
								</span>
							</div>
						) : null}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ExpiryDateInputs;
