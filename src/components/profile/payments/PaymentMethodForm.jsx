import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { luhnCheck } from '@/utils/cardValidation';

import FormHeader from './form/FormHeader';
import FormFields from './form/FormFields';
import FormActions from './form/FormActions';
import CreditCardDisplay from './form/CreditCardDisplay';
import ProfileLoadingSkeleton from '../utils/ProfileLoadingSkeleton';

const PaymentMethodForm = ({
	paymentMethod = null,
	onSubmit,
	onCancel,
	isSubmitting = false,
	className = '',
}) => {
	// Estado local para el formulario
	const [formData, setFormData] = useState({
		type: 'credit_card',
		cardNumber: '',
		brand: '',
		holderName: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		isDefault: false,
		...paymentMethod,
	});

	// Estado para manejo de errores
	const [errors, setErrors] = useState({});

	// Estado para manejo de UI
	const [isCardFlipped, setIsCardFlipped] = useState(false);
	const [cardBrand, setCardBrand] = useState('');
	const [lastFourDigits, setLastFourDigits] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	// Estado para manejar renderizado de tarjeta
	const [displayData, setDisplayData] = useState({
		cardNumber: '',
		holderName: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
	});

	// Efecto para manejar edición de tarjeta existente
	useEffect(() => {
		if (paymentMethod) {
			// En modo edición, establecer datos disponibles
			setCardBrand(paymentMethod.brand || '');
			setLastFourDigits(paymentMethod.lastFour || '');

			// Si tenemos un método existente, actualizar la visualización
			setDisplayData({
				cardNumber: paymentMethod.lastFour
					? `•••• •••• •••• ${paymentMethod.lastFour}`
					: '',
				holderName: paymentMethod.holderName || '',
				expiryMonth: paymentMethod.expiryMonth || '',
				expiryYear: paymentMethod.expiryYear || '',
				cvv: '•••',
			});
		}
	}, [paymentMethod]);

	// Manejar cambios en los campos del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;

		// Actualizar el estado del formulario
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		// Limpiar error del campo que se está editando
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: '',
			}));
		}

		// Si el campo es cardNumber, detectar la marca de la tarjeta
		if (name === 'cardNumber') {
			const cleanValue = value.replace(/\D/g, '');
			const detectedBrand = detectCardBrand(cleanValue);

			if (detectedBrand) {
				setCardBrand(detectedBrand);
				setFormData((prevState) => ({
					...prevState,
					brand: detectedBrand,
				}));
			} else {
				setCardBrand('');
				setFormData((prevState) => ({
					...prevState,
					brand: '',
				}));
			}

			// Extraer últimos 4 dígitos
			if (cleanValue.length >= 4) {
				setLastFourDigits(cleanValue.slice(-4));
				setFormData((prevState) => ({
					...prevState,
					lastFour: cleanValue.slice(-4),
				}));
			} else {
				setLastFourDigits('');
			}
		}
	};

	// Función para detectar marca de tarjeta
	const detectCardBrand = (number) => {
		const firstDigit = number.charAt(0);
		const firstTwoDigits = number.substring(0, 2);
		const firstFourDigits = number.substring(0, 4);

		// Visa: comienza con 4
		if (firstDigit === '4') {
			return 'visa';
		}
		// Mastercard: comienza con 51-55 o 2221-2720
		else if (
			(parseInt(firstTwoDigits) >= 51 &&
				parseInt(firstTwoDigits) <= 55) ||
			(parseInt(firstFourDigits) >= 2221 &&
				parseInt(firstFourDigits) <= 2720)
		) {
			return 'mastercard';
		}
		// Amex: comienza con 34 o 37
		else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
			return 'amex';
		}
		// Discover: comienza con 6011, 622126-622925, 644-649, 65
		else if (
			firstFourDigits === '6011' ||
			(parseInt(number.substring(0, 6)) >= 622126 &&
				parseInt(number.substring(0, 6)) <= 622925) ||
			parseInt(firstTwoDigits) === 65 ||
			(parseInt(firstTwoDigits) >= 64 && parseInt(firstTwoDigits) <= 65)
		) {
			return 'discover';
		}

		return '';
	};

	// Manejar la actualización de la visualización de la tarjeta
	const updateCardDisplay = (field, value) => {
		if (field === 'cardNumber') {
			// Asegurarnos de que recibimos un valor limpio para el cardNumber
			const cleanValue = value.replace(/\s/g, '');

			// No formatear aquí - dejar que CreditCardDisplay se encargue del formato
			setDisplayData((prev) => ({
				...prev,
				[field]: cleanValue,
			}));
		} else {
			setDisplayData((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	// Validar formulario
	const validateForm = () => {
		let valid = true;
		const newErrors = {};

		// Validar número de tarjeta (si no está en modo edición)
		if (
			!paymentMethod &&
			(!formData.cardNumber ||
				formData.cardNumber.replace(/\s/g, '').length < 15)
		) {
			newErrors.cardNumber = 'Debes ingresar un número de tarjeta válido';
			valid = false;
		} else if (
			!paymentMethod &&
			!luhnCheck(formData.cardNumber.replace(/\s/g, ''))
		) {
			newErrors.cardNumber = 'El número de tarjeta es inválido';
			valid = false;
		}

		// Validar nombre del titular
		if (!formData.holderName || formData.holderName.trim().length < 5) {
			newErrors.holderName =
				'Ingresa el nombre completo del titular de la tarjeta';
			valid = false;
		}

		// Validar mes de expiración
		if (!formData.expiryMonth) {
			newErrors.expiryMonth = 'Selecciona el mes de expiración';
			valid = false;
		}

		// Validar año de expiración
		if (!formData.expiryYear) {
			newErrors.expiryYear = 'Selecciona el año de expiración';
			valid = false;
		}

		// Validar que la fecha de expiración no sea pasada
		if (formData.expiryMonth && formData.expiryYear) {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear();
			const currentMonth = currentDate.getMonth() + 1;
			const expiryYear = parseInt(`20${formData.expiryYear}`);
			const expiryMonth = parseInt(formData.expiryMonth);

			if (
				expiryYear < currentYear ||
				(expiryYear === currentYear && expiryMonth < currentMonth)
			) {
				newErrors.expiryYear = 'La tarjeta está vencida';
				valid = false;
			}
		}

		// Validar CVV (si no está en modo edición)
		if (!paymentMethod && !formData.cvv) {
			newErrors.cvv = 'Ingresa el código de seguridad';
			valid = false;
		} else if (!paymentMethod && formData.cvv.length < 3) {
			newErrors.cvv =
				'El código de seguridad debe tener al menos 3 dígitos';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	// Manejar envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Si ya se envió el formulario, evitar múltiples envíos
		if (formSubmitted) return;

		// Validar formulario antes de enviar
		if (!validateForm()) {
			return;
		}

		setFormSubmitted(true);

		try {
			// Enviar datos al componente padre
			await onSubmit(formData);

			// Mostrar animación de éxito
			setShowSuccessAnimation(true);

			// Esperar un momento antes de cerrar el formulario
			setTimeout(() => {
				setShowSuccessAnimation(false);
			}, 1500);
		} catch (error) {
			console.error('Error al guardar método de pago:', error);
			setFormSubmitted(false);
			// Si hay un error específico en la respuesta, mostrarlo
			if (error.message) {
				setErrors((prev) => ({
					...prev,
					general: error.message,
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					general: 'Ocurrió un error al guardar el método de pago',
				}));
			}
		}
	};

	// Manejar la validación global del formulario
	const handleValidFields = (isValid) => {
		setIsFormValid(isValid);
	};

	// Variantes de animación para el formulario
	const formVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: 'easeOut',
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.95,
			transition: {
				duration: 0.3,
				ease: 'easeIn',
			},
		},
	};

	return (
		<motion.div
			className={`w-full mx-auto ${className}`}
			initial='hidden'
			animate='visible'
			exit='exit'
			variants={formVariants}>
			<div className='bg-dark/40 p-4 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-xl'>
				{/* Efectos decorativos de fondo */}
				<div className='absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl'></div>
				<div className='absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl'></div>

				{/* Encabezado del formulario */}
				<FormHeader
					title={
						paymentMethod
							? 'Editar método de pago'
							: 'Nuevo método de pago'
					}
					subtitle={
						paymentMethod
							? 'Actualiza la información de tu tarjeta'
							: 'Ingresa la información de tu tarjeta'
					}
					onClose={onCancel}
					isEditMode={!!paymentMethod}
					cardBrand={cardBrand}
				/>

				<form onSubmit={handleSubmit} className='relative z-10'>
					<div className='p-5 sm:p-7'>
						{/* Grid para layout responsive */}
						<div className='grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8'>
							{/* Columna izquierda: Vista previa de la tarjeta */}
							<div className='lg:col-span-2 order-1'>
								<CreditCardDisplay
									cardNumber={displayData.cardNumber}
									holderName={displayData.holderName}
									expiryMonth={displayData.expiryMonth}
									expiryYear={displayData.expiryYear}
									cvv={displayData.cvv}
									cardBrand={cardBrand}
									isCardFlipped={isCardFlipped}
									isValid={
										isFormValid &&
										!Object.keys(errors).length
									}
								/>
							</div>

							{/* Columna derecha: Campos del formulario */}
							<div className='lg:col-span-3 order-2'>
								<FormFields
									formData={formData}
									errors={errors}
									handleChange={handleChange}
									isCardFlipped={isCardFlipped}
									setIsCardFlipped={setIsCardFlipped}
									loading={false}
									updateCardDisplay={updateCardDisplay}
									cardBrand={cardBrand}
									onValidFields={handleValidFields}
									disabled={
										isSubmitting || showSuccessAnimation
									}
								/>
							</div>
						</div>

						{/* Error general */}
						<AnimatePresence>
							{errors.general && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className='mt-4 p-3 bg-error/10 border border-error/20 rounded-lg'>
									<p className='text-error text-sm flex items-center gap-2'>
										<span className='text-lg'>⚠️</span>
										{errors.general}
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Acciones del formulario */}
					<div className='px-5 sm:px-7 pb-5 sm:pb-7'>
						<FormActions
							onCancel={onCancel}
							isSubmitting={isSubmitting || formSubmitted}
							animateSuccess={showSuccessAnimation}
							isEditMode={!!paymentMethod}
						/>
					</div>
				</form>
			</div>
		</motion.div>
	);
};

export default PaymentMethodForm;
