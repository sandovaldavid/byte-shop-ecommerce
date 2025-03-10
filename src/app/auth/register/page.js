'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	AiOutlineUser,
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineGoogle,
	AiOutlineCheck,
	AiOutlineInfoCircle,
	AiOutlineArrowLeft,
} from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

function RegisterPage() {
	const router = useRouter();
	const { register } = useAuth();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	// Auto dismiss error message after 6 seconds
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(''), 6000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	// Check password strength
	useEffect(() => {
		if (!formData.password) {
			setPasswordStrength(0);
			return;
		}

		let strength = 0;
		// Length check
		if (formData.password.length >= 8) strength += 1;
		// Contains uppercase
		if (/[A-Z]/.test(formData.password)) strength += 1;
		// Contains lowercase
		if (/[a-z]/.test(formData.password)) strength += 1;
		// Contains number
		if (/[0-9]/.test(formData.password)) strength += 1;
		// Contains special char
		if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

		setPasswordStrength(strength);
	}, [formData.password]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Reset error on input change
		if (error) setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormSubmitted(true);

		if (!acceptTerms) {
			setError('Debes aceptar los términos y condiciones para continuar');
			return;
		}

		if (
			!formData.name ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setError('Todos los campos son obligatorios');
			return;
		}

		if (passwordStrength < 3) {
			setError('La contraseña debe ser más segura');
			return;
		}

		setError('');
		setIsLoading(true);

		try {
			if (formData.password !== formData.confirmPassword) {
				throw new Error('Las contraseñas no coinciden');
			}

			const user = await register(
				formData.email,
				formData.password,
				formData.name
			);

			router.push('/auth/verify/messague');
		} catch (error) {
			console.error('Error detallado:', error);
			setError(
				'Error al crear la cuenta: ' +
					(error.message || 'Error desconocido')
			);
		} finally {
			setIsLoading(false);
		}
	};

	const getPasswordStrengthColor = () => {
		if (passwordStrength === 0) return 'bg-white/10';
		if (passwordStrength <= 2) return 'bg-error';
		if (passwordStrength <= 3) return 'bg-accent2';
		if (passwordStrength <= 4) return 'bg-accent1';
		return 'bg-success';
	};

	const getPasswordStrengthText = () => {
		if (!formData.password) return '';
		if (passwordStrength <= 2) return 'Débil';
		if (passwordStrength <= 3) return 'Moderada';
		if (passwordStrength <= 4) return 'Buena';
		return 'Fuerte';
	};

	return (
		<div className='min-h-screen w-full bg-gradient-to-br from-dark/95 to-dark/90 flex flex-col items-center justify-center relative overflow-hidden py-8 px-4 sm:px-6 lg:py-16'>
			{/* Background patterns and effects */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl opacity-60 translate-x-1/4 translate-y-1/4'></div>
			<div className='absolute top-1/3 right-1/4 w-64 h-64 bg-accent2/5 rounded-full filter blur-2xl opacity-70'></div>

			{/* Main card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='relative w-full max-w-md rounded-2xl bg-glass-dark backdrop-blur-xl border border-glass-border-dark shadow-glass-dark overflow-hidden'>
				{/* Card inner glow effect */}
				<div className='absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent1/5 opacity-50'></div>

				<div className='relative p-6 sm:p-8'>
					{/* Header */}
					<div className='text-center mb-8'>
						<div className='w-16 h-16 rounded-full bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center mx-auto shadow-lg mb-4'>
							<AiOutlineUser className='text-light text-2xl' />
						</div>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary via-accent1/90 to-accent2 bg-clip-text text-transparent'>
							Crear Cuenta
						</h1>
						<p className='text-light/70 mt-2'>
							Únete a la revolución tecnológica
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-4'>
							{/* Nombre */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineUser />
								</div>
								<input
									type='text'
									name='name'
									placeholder='Nombre completo'
									value={formData.name}
									onChange={handleChange}
									className={`w-full bg-white/5 border ${formSubmitted && !formData.name ? 'border-error/50' : 'border-white/10'} rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40`}
									aria-label='Nombre completo'
								/>
								{formSubmitted && !formData.name && (
									<p className='text-error/90 text-xs mt-1 ml-1'>
										Ingrese su nombre
									</p>
								)}
							</div>

							{/* Email */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineMail />
								</div>
								<input
									type='email'
									name='email'
									placeholder='Email'
									value={formData.email}
									onChange={handleChange}
									className={`w-full bg-white/5 border ${formSubmitted && !formData.email ? 'border-error/50' : 'border-white/10'} rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40`}
									aria-label='Email'
								/>
								{formSubmitted && !formData.email && (
									<p className='text-error/90 text-xs mt-1 ml-1'>
										Ingrese su email
									</p>
								)}
							</div>

							{/* Contraseña */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineLock />
								</div>
								<input
									type='password'
									name='password'
									placeholder='Contraseña'
									value={formData.password}
									onChange={handleChange}
									className={`w-full bg-white/5 border ${formSubmitted && !formData.password ? 'border-error/50' : 'border-white/10'} rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40`}
									aria-label='Contraseña'
								/>
								{formData.password && (
									<div className='mt-2'>
										<div className='flex items-center justify-between mb-1'>
											<div className='flex space-x-1 flex-1'>
												{[1, 2, 3, 4, 5].map(
													(level) => (
														<div
															key={level}
															className={`h-1 w-full rounded-full ${
																level <=
																passwordStrength
																	? getPasswordStrengthColor()
																	: 'bg-white/10'
															}`}></div>
													)
												)}
											</div>
											<span className='text-xs ml-2 text-light/60'>
												{getPasswordStrengthText()}
											</span>
										</div>
										{passwordStrength < 3 &&
											formData.password && (
												<p className='text-xs text-light/60 flex items-center gap-1'>
													<AiOutlineInfoCircle className='text-accent1' />
													<span>
														Use mayúsculas, números
														y símbolos para mayor
														seguridad
													</span>
												</p>
											)}
									</div>
								)}
								{formSubmitted && !formData.password && (
									<p className='text-error/90 text-xs mt-1 ml-1'>
										Ingrese una contraseña
									</p>
								)}
							</div>

							{/* Confirmar contraseña */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineLock />
								</div>
								<input
									type='password'
									name='confirmPassword'
									placeholder='Confirmar contraseña'
									value={formData.confirmPassword}
									onChange={handleChange}
									className={`w-full bg-white/5 border ${
										formSubmitted &&
										(!formData.confirmPassword ||
											formData.confirmPassword !==
												formData.password)
											? 'border-error/50'
											: formData.confirmPassword &&
												  formData.confirmPassword ===
														formData.password
												? 'border-success/30'
												: 'border-white/10'
									} rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40`}
									aria-label='Confirmar contraseña'
								/>
								{formData.confirmPassword &&
									formData.confirmPassword ===
										formData.password && (
										<span className='absolute right-3 top-1/2 -translate-y-1/2 text-success text-sm'>
											<AiOutlineCheck className='text-lg' />
										</span>
									)}
								{formSubmitted && !formData.confirmPassword && (
									<p className='text-error/90 text-xs mt-1 ml-1'>
										Confirme su contraseña
									</p>
								)}
								{formSubmitted &&
									formData.confirmPassword &&
									formData.confirmPassword !==
										formData.password && (
										<p className='text-error/90 text-xs mt-1 ml-1'>
											Las contraseñas no coinciden
										</p>
									)}
							</div>
						</div>

						{/* Terms checkbox */}
						<div className='flex items-center text-sm'>
							<label className='flex items-center text-light/70 hover:text-light cursor-pointer group'>
								<input
									type='checkbox'
									checked={acceptTerms}
									onChange={(e) =>
										setAcceptTerms(e.target.checked)
									}
									className={`mr-2 accent-secondary w-4 h-4 rounded ${formSubmitted && !acceptTerms ? 'ring-2 ring-error/50' : ''}`}
								/>
								<span className='select-none'>
									Acepto los{' '}
									<Link
										href='/terms'
										className='text-secondary hover:text-accent1 transition-colors underline-offset-2 hover:underline'>
										términos y condiciones
									</Link>
								</span>
							</label>
						</div>

						{/* Error display */}
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								className='bg-error/10 border border-error/20 rounded-lg p-3 text-sm text-error flex items-center gap-2'>
								<AiOutlineInfoCircle className='text-xl flex-shrink-0' />
								<span>{error}</span>
							</motion.div>
						)}

						{/* Actions */}
						<div className='space-y-4'>
							{/* Register button */}
							<button
								type='submit'
								disabled={isLoading}
								className='w-full h-12 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl shadow-accent1/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center'>
								{isLoading ? (
									<>
										<svg
											className='animate-spin -ml-1 mr-2 h-4 w-4 text-light'
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
										Creando cuenta...
									</>
								) : (
									'Crear cuenta'
								)}
							</button>

							{/* Google sign in */}
							<button
								type='button'
								className='w-full bg-white/5 border border-white/10 text-light/90 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]'>
								<AiOutlineGoogle className='text-lg text-light' />
								<span>Continuar con Google</span>
							</button>
						</div>
					</form>

					{/* Sign in link */}
					<div className='text-center mt-8'>
						<p className='text-light/70'>
							¿Ya tienes una cuenta?{' '}
							<Link
								href='/auth/login'
								className='text-secondary hover:text-accent1 transition-colors font-medium hover:underline underline-offset-4'>
								Inicia sesión
							</Link>
						</p>
					</div>
				</div>
			</motion.div>

			{/* Privacy policy notice */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className='mt-6 text-light/50 text-xs text-center max-w-md'>
				Al registrarte, aceptas nuestra{' '}
				<Link
					href='/privacy'
					className='underline hover:text-light/70 transition-colors'>
					Política de Privacidad
				</Link>{' '}
				y confirmas que has leído nuestras prácticas de protección de
				datos.
			</motion.p>
		</div>
	);
}

export default RegisterPage;
