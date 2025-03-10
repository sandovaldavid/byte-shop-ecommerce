import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import CardTypeSelector from './CardTypeSelector';
import CardNumberInput from './CardNumberInput';
import CardHolderInput from './CardHolderInput';
import ExpiryDateInputs from './ExpiryDateInputs';
import CVVInput from './CVVInput';
import DefaultCheckbox from './DefaultCheckbox';
import ProfileLoadingSkeleton from '../../utils/ProfileLoadingSkeleton';

const FormFields = ({
	formData = {},
	errors = {},
	handleChange,
	isCardFlipped,
	setIsCardFlipped,
	handleBlur,
	handleFocus,
	loading = false,
	updateCardDisplay,
	cardBrand,
	onValidFields = () => {},
	disabled = false,
	className = '',
}) => {
	// Estados para manejar la validación de campos
	const [validFields, setValidFields] = useState({
		cardNumber: false,
		cardHolderName: false,
		expiryDate: false,
		cvv: false,
	});

	// Estado para manejar animaciones
	const [activeField, setActiveField] = useState(null);

	// Ref para rastrear la última validez del formulario
	const lastFormValidityRef = useRef(false);

	// Manejar cambios en la validez de los campos individuales
	const handleValidChange = useCallback((field, isValid) => {
		setValidFields((prev) => {
			// Si el valor no ha cambiado, no actualices el estado
			if (prev[field] === isValid) return prev;
			// De lo contrario, actualiza solo el campo que cambió
			return { ...prev, [field]: isValid };
		});
	}, []);

	// Efecto para notificar al componente padre solo cuando cambie la validez
	useEffect(() => {
		const isFormValid = Object.values(validFields).every((valid) => valid);

		// Solo notificar si la validez global ha cambiado
		if (isFormValid !== lastFormValidityRef.current) {
			lastFormValidityRef.current = isFormValid;
			onValidFields(isFormValid);
		}
	}, [validFields, onValidFields]);

	// Si está cargando, mostrar skeleton
	if (loading) {
		return <ProfileLoadingSkeleton type='payment-form' />;
	}

	// Animaciones para transiciones suaves
	const fieldVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.4,
			},
		}),
		exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
	};

	return (
		<div className={`w-full ${className}`}>
			{/* Resto del componente permanece igual */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
				{/* Tipo de tarjeta */}
				<motion.div
					className='sm:col-span-2'
					custom={0}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<CardTypeSelector
						value={formData.type || 'credit_card'}
						onChange={(value) =>
							handleChange({ target: { name: 'type', value } })
						}
						error={errors.type}
						disabled={disabled}
					/>
				</motion.div>

				{/* Número de tarjeta */}
				<motion.div
					className='sm:col-span-2'
					custom={1}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<CardNumberInput
						value={formData.cardNumber || ''}
						onChange={(value) =>
							handleChange({
								target: { name: 'cardNumber', value },
							})
						}
						error={errors.cardNumber}
						disabled={disabled || !!formData.id}
						autoFocus={!formData.id}
						onValidChange={(isValid) =>
							handleValidChange('cardNumber', isValid)
						}
						onBrandChange={() => {}}
						onFocus={() => setActiveField('cardNumber')}
						onBlur={() => setActiveField(null)}
						updateCardDisplay={(value) =>
							updateCardDisplay('cardNumber', value)
						}
					/>
				</motion.div>

				{/* Nombre del titular */}
				<motion.div
					className='sm:col-span-2'
					custom={2}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<CardHolderInput
						value={formData.holderName || ''}
						onChange={(value) =>
							handleChange({
								target: { name: 'holderName', value },
							})
						}
						error={errors.holderName}
						disabled={disabled}
						onValidChange={(isValid) =>
							handleValidChange('cardHolderName', isValid)
						}
						onFocus={() => setActiveField('holderName')}
						onBlur={() => setActiveField(null)}
						updateCardDisplay={(value) =>
							updateCardDisplay('holderName', value)
						}
					/>
				</motion.div>

				{/* Fecha de expiración */}
				<motion.div
					custom={3}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<ExpiryDateInputs
						month={formData.expiryMonth || ''}
						year={formData.expiryYear || ''}
						onChangeMonth={(value) =>
							handleChange({
								target: { name: 'expiryMonth', value },
							})
						}
						onChangeYear={(value) =>
							handleChange({
								target: { name: 'expiryYear', value },
							})
						}
						monthError={errors.expiryMonth}
						yearError={errors.expiryYear}
						disabled={disabled}
						onValidChange={(isValid) =>
							handleValidChange('expiryDate', isValid)
						}
						onFocus={() => setActiveField('expiryDate')}
						onBlur={() => setActiveField(null)}
						updateCardDisplay={(month, year) => {
							updateCardDisplay('expiryMonth', month);
							updateCardDisplay('expiryYear', year);
						}}
					/>
				</motion.div>

				{/* CVV */}
				<motion.div
					custom={4}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<CVVInput
						value={formData.cvv || ''}
						onChange={(value) =>
							handleChange({ target: { name: 'cvv', value } })
						}
						error={errors.cvv}
						cardBrand={cardBrand}
						disabled={disabled || !!formData.id}
						onValidChange={(isValid) =>
							handleValidChange('cvv', isValid)
						}
						onFocus={(e) => {
							setActiveField('cvv');
							setIsCardFlipped(true);
						}}
						onBlur={(e) => {
							setActiveField(null);
							setIsCardFlipped(false);
						}}
						updateCardDisplay={(value) =>
							updateCardDisplay('cvv', value)
						}
					/>
				</motion.div>

				{/* Checkbox para establecer como predeterminado */}
				<motion.div
					className='sm:col-span-2 mt-3'
					custom={5}
					initial='hidden'
					animate='visible'
					variants={fieldVariants}>
					<DefaultCheckbox
						isChecked={formData.isDefault || false}
						onChange={(value) =>
							handleChange({
								target: { name: 'isDefault', value },
							})
						}
						disabled={disabled}
						showHint={true}
					/>
				</motion.div>
			</div>

			{/* Nota informativa de seguridad */}
			<motion.div
				className='mt-6 p-4 rounded-lg bg-white/5 border border-white/10'
				custom={6}
				initial='hidden'
				animate='visible'
				variants={fieldVariants}>
				<div className='flex gap-3'>
					<div className='text-secondary flex-shrink-0 mt-0.5'>
						<AiOutlineInfoCircle size={18} />
					</div>
					<div className='text-xs text-light/70 leading-relaxed'>
						<p>
							Tu información se transmite de forma segura y no
							almacenamos tu número de tarjeta completo. Solo
							guardamos los últimos 4 dígitos para futuras
							transacciones.
						</p>

						{cardBrand && (
							<AnimatePresence>
								<motion.p
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									className='mt-2 text-accent2/70'>
									<span className='font-medium'>✓</span>{' '}
									Tarjeta {cardBrand} detectada correctamente.
								</motion.p>
							</AnimatePresence>
						)}
					</div>
				</div>
			</motion.div>

			{/* Indicador de campos obligatorios */}
			<motion.div
				className='mt-3 text-right text-xs text-light/50'
				custom={7}
				initial='hidden'
				animate='visible'
				variants={fieldVariants}>
				Todos los campos son obligatorios
			</motion.div>
		</div>
	);
};

export default FormFields;
