'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineSave,
	AiOutlineClose,
	AiOutlineStar,
	AiOutlineHome,
	AiOutlineCreditCard,
} from 'react-icons/ai';

const AddressForm = ({
	address = null,
	type = 'shipping', // 'shipping' or 'billing'
	onSubmit,
	onCancel,
	isSubmitting = false,
}) => {
	// Form state
	const [formData, setFormData] = useState({
		id: '',
		alias: '',
		name: '',
		street: '',
		additionalInfo: '',
		city: '',
		state: '',
		postalCode: '',
		country: '',
		phone: '',
		instructions: '',
		isDefault: false,
		type: type,
	});

	// Validation state
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	// Fill form data if editing an existing address
	useEffect(() => {
		if (address) {
			setFormData({
				...formData,
				...address,
				type: type, // ensure type is set correctly
			});
		}
	}, [address, type]);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value, type: inputType, checked } = e.target;

		setFormData({
			...formData,
			[name]: inputType === 'checkbox' ? checked : value,
		});

		// Mark field as touched
		if (!touched[name]) {
			setTouched({ ...touched, [name]: true });
		}

		// Clear error when user types
		if (errors[name]) {
			setErrors({ ...errors, [name]: null });
		}
	};

	// Validate form
	const validate = () => {
		const newErrors = {};
		// Required fields
		if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
		if (!formData.street.trim())
			newErrors.street = 'Dirección es requerida';
		if (!formData.city.trim()) newErrors.city = 'Ciudad es requerida';
		if (!formData.state.trim())
			newErrors.state = 'Estado/Provincia es requerido';
		if (!formData.postalCode.trim())
			newErrors.postalCode = 'Código postal es requerido';
		if (!formData.country.trim()) newErrors.country = 'País es requerido';

		// Phone validation (optional field)
		if (formData.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
			newErrors.phone = 'Teléfono no válido';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();

		// Mark all fields as touched
		const allTouched = {};
		Object.keys(formData).forEach((key) => {
			allTouched[key] = true;
		});
		setTouched(allTouched);

		// Validate and submit if valid
		if (validate()) {
			onSubmit(formData);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className='bg-glass-dark backdrop-blur-lg border border-glass-border-dark rounded-2xl shadow-glass-dark overflow-hidden'>
			<div className='p-5 sm:p-6'>
				{/* Form Header */}
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-3'>
						<div
							className={`w-10 h-10 rounded-full ${type === 'shipping' ? 'bg-secondary/20' : 'bg-accent1/20'} flex items-center justify-center`}>
							{type === 'shipping' ? (
								<AiOutlineHome
									className={`text-xl ${type === 'shipping' ? 'text-secondary' : 'text-accent1'}`}
								/>
							) : (
								<AiOutlineCreditCard
									className={`text-xl ${type === 'shipping' ? 'text-secondary' : 'text-accent1'}`}
								/>
							)}
						</div>
						<h2 className='text-xl font-medium text-light'>
							{address ? 'Editar' : 'Agregar'}{' '}
							{type === 'shipping'
								? 'dirección de envío'
								: 'dirección de facturación'}
						</h2>
					</div>

					<button
						type='button'
						onClick={onCancel}
						className='p-2 rounded-full bg-white/5 hover:bg-white/10 text-light/70 hover:text-light transition-colors'
						aria-label='Cancelar'>
						<AiOutlineClose />
					</button>
				</div>

				{/* Form Body */}
				<form onSubmit={handleSubmit} className='space-y-5'>
					{/* Row 1: Alias and Name */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						{/* Alias/Nickname */}
						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Alias
							</label>
							<input
								type='text'
								name='alias'
								value={formData.alias}
								onChange={handleChange}
								placeholder='Ej: Casa, Oficina'
								className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
							/>
						</div>

						{/* Full Name */}
						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Nombre completo{' '}
								<span className='text-error'>*</span>
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Nombre de quien recibe'
								required
								className={`w-full bg-white/5 border ${errors.name && touched.name ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
							/>
							{errors.name && touched.name && (
								<p className='text-error text-xs mt-1'>
									{errors.name}
								</p>
							)}
						</div>
					</div>

					{/* Row 2: Street Address & Additional Info */}
					<div>
						<label className='block text-sm text-light/80 mb-1.5'>
							Dirección <span className='text-error'>*</span>
						</label>
						<input
							type='text'
							name='street'
							value={formData.street}
							onChange={handleChange}
							placeholder='Calle y número'
							required
							className={`w-full bg-white/5 border ${errors.street && touched.street ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
						/>
						{errors.street && touched.street && (
							<p className='text-error text-xs mt-1'>
								{errors.street}
							</p>
						)}
					</div>

					<div>
						<label className='block text-sm text-light/80 mb-1.5'>
							Información adicional
						</label>
						<input
							type='text'
							name='additionalInfo'
							value={formData.additionalInfo}
							onChange={handleChange}
							placeholder='Apartamento, suite, unidad, etc. (opcional)'
							className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
						/>
					</div>

					{/* Row 3: City, State */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Ciudad <span className='text-error'>*</span>
							</label>
							<input
								type='text'
								name='city'
								value={formData.city}
								onChange={handleChange}
								placeholder='Ciudad'
								required
								className={`w-full bg-white/5 border ${errors.city && touched.city ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
							/>
							{errors.city && touched.city && (
								<p className='text-error text-xs mt-1'>
									{errors.city}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Estado/Provincia{' '}
								<span className='text-error'>*</span>
							</label>
							<input
								type='text'
								name='state'
								value={formData.state}
								onChange={handleChange}
								placeholder='Estado o provincia'
								required
								className={`w-full bg-white/5 border ${errors.state && touched.state ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
							/>
							{errors.state && touched.state && (
								<p className='text-error text-xs mt-1'>
									{errors.state}
								</p>
							)}
						</div>
					</div>

					{/* Row 4: Postal Code, Country */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Código postal{' '}
								<span className='text-error'>*</span>
							</label>
							<input
								type='text'
								name='postalCode'
								value={formData.postalCode}
								onChange={handleChange}
								placeholder='Código postal'
								required
								className={`w-full bg-white/5 border ${errors.postalCode && touched.postalCode ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
							/>
							{errors.postalCode && touched.postalCode && (
								<p className='text-error text-xs mt-1'>
									{errors.postalCode}
								</p>
							)}
						</div>

						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								País <span className='text-error'>*</span>
							</label>
							<input
								type='text'
								name='country'
								value={formData.country}
								onChange={handleChange}
								placeholder='País'
								required
								className={`w-full bg-white/5 border ${errors.country && touched.country ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
							/>
							{errors.country && touched.country && (
								<p className='text-error text-xs mt-1'>
									{errors.country}
								</p>
							)}
						</div>
					</div>

					{/* Row 5: Phone */}
					<div>
						<label className='block text-sm text-light/80 mb-1.5'>
							Teléfono
						</label>
						<input
							type='tel'
							name='phone'
							value={formData.phone}
							onChange={handleChange}
							placeholder='Teléfono de contacto (opcional)'
							className={`w-full bg-white/5 border ${errors.phone && touched.phone ? 'border-error/50' : 'border-white/10'} rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300`}
						/>
						{errors.phone && touched.phone && (
							<p className='text-error text-xs mt-1'>
								{errors.phone}
							</p>
						)}
					</div>

					{/* Row 6: Delivery Instructions (only for shipping addresses) */}
					{type === 'shipping' && (
						<div>
							<label className='block text-sm text-light/80 mb-1.5'>
								Instrucciones de entrega
							</label>
							<textarea
								name='instructions'
								value={formData.instructions}
								onChange={handleChange}
								placeholder='Información adicional para el repartidor (opcional)'
								rows='2'
								className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300 resize-none'
							/>
						</div>
					)}

					{/* Row 7: Set as default checkbox */}
					<div className='flex items-center'>
						<div className='relative flex items-center'>
							<input
								type='checkbox'
								id='isDefault'
								name='isDefault'
								checked={formData.isDefault}
								onChange={handleChange}
								className='sr-only'
							/>
							<div
								className={`w-5 h-5 rounded border ${formData.isDefault ? 'bg-secondary border-secondary' : 'border-white/30 bg-white/5'} flex items-center justify-center mr-3 transition-colors duration-200`}
								onClick={() =>
									setFormData({
										...formData,
										isDefault: !formData.isDefault,
									})
								}>
								{formData.isDefault && (
									<svg
										className='w-3 h-3 text-light'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='3'
											d='M5 13l4 4L19 7'></path>
									</svg>
								)}
							</div>
							<label
								htmlFor='isDefault'
								className='text-sm text-light/80 flex items-center gap-1.5 cursor-pointer'>
								<AiOutlineStar
									className={
										formData.isDefault
											? 'text-secondary'
											: 'text-light/50'
									}
								/>
								Establecer como{' '}
								{type === 'shipping'
									? 'dirección de envío'
									: 'dirección de facturación'}{' '}
								predeterminada
							</label>
						</div>
					</div>

					{/* Form Actions */}
					<div className='pt-4 border-t border-white/10 flex justify-end items-center gap-3'>
						<button
							type='button'
							onClick={onCancel}
							className='px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-light/70 hover:text-light text-sm transition-all border border-white/10'
							disabled={isSubmitting}>
							Cancelar
						</button>

						<button
							type='submit'
							disabled={isSubmitting}
							className='px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light font-medium flex items-center gap-2 text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none'>
							{isSubmitting ? (
								<>
									<svg
										className='animate-spin h-4 w-4 text-light'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
									Guardando...
								</>
							) : (
								<>
									<AiOutlineSave />
									{address
										? 'Actualizar dirección'
										: 'Guardar dirección'}
								</>
							)}
						</button>
					</div>
				</form>
			</div>

			{/* Info section at bottom */}
			{type === 'shipping' && (
				<div className='px-5 sm:px-6 py-3 bg-white/5 border-t border-white/10'>
					<p className='text-xs text-light/50 flex items-start gap-2'>
						<span className='text-lg mt-0.5'>ℹ️</span>
						<span>
							Esta dirección se utilizará para calcular los costos
							de envío y entregar tus productos. Asegúrate de que
							la información sea precisa.
						</span>
					</p>
				</div>
			)}

			{type === 'billing' && (
				<div className='px-5 sm:px-6 py-3 bg-white/5 border-t border-white/10'>
					<p className='text-xs text-light/50 flex items-start gap-2'>
						<span className='text-lg mt-0.5'>ℹ️</span>
						<span>
							Esta dirección se utilizará para generar tus
							facturas. Debe coincidir con los datos registrados
							para tu forma de pago.
						</span>
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default AddressForm;
