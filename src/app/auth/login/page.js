'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineGoogle,
	AiOutlineLoading3Quarters,
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlineUser,
} from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

function LoginPage() {
	const router = useRouter();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	// Clear error after 5 seconds
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				setError('');
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			await login(email, password);
			router.push('/');
		} catch (error) {
			console.error('Error en login:', error);
			setError(
				'Error al iniciar sesión: ' +
					(error.message || 'Credenciales inválidas')
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen w-full bg-gradient-to-br from-dark/95 to-dark/90 flex flex-col items-center justify-center relative overflow-hidden py-8 px-4 sm:px-6 lg:py-16'>
			{/* Background patterns and effects */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl opacity-60 translate-x-1/4 translate-y-1/4'></div>
			<div className='absolute top-1/3 right-1/4 w-64 h-64 bg-accent2/5 rounded-full filter blur-2xl opacity-70'></div>
			<div className='absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl opacity-70'></div>

			{/* Logo/Brand section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='mb-8'>
				<div className='w-16 h-16 rounded-full bg-gradient-to-br from-accent1 to-accent2 flex items-center justify-center mx-auto shadow-lg'>
				<AiOutlineUser className='text-light text-2xl' />
				</div>
			</motion.div>

			{/* Login form card with glassmorphism */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='relative w-full max-w-md rounded-2xl bg-glass-dark backdrop-blur-xl border border-glass-border-dark shadow-glass-dark overflow-hidden'>
				{/* Card inner glow effect */}
				<div className='absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent1/5 opacity-50'></div>

				<div className='relative p-6 sm:p-8'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent'>
							Bienvenido de nuevo
						</h1>
						<p className='text-light/70 mt-2 max-w-xs mx-auto'>
							Accede a tu cuenta para continuar tu experiencia
							tech
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Input fields */}
						<div className='space-y-4'>
							{/* Email field with validation styling */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineMail />
								</div>
								<input
									type='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40'
									aria-label='Email address'
								/>
							</div>

							{/* Password field with show/hide toggle */}
							<div className='relative group'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl group-focus-within:text-secondary transition-colors duration-200'>
									<AiOutlineLock />
								</div>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Contraseña'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
									className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary focus:bg-white/8 transition-all duration-300 placeholder:text-light/40'
									aria-label='Password'
								/>
								<button
									type='button'
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-light/40 hover:text-light/70 transition-colors duration-200'
									aria-label={
										showPassword
											? 'Hide password'
											: 'Show password'
									}>
									{showPassword ? (
										<AiOutlineEyeInvisible className='text-xl' />
									) : (
										<AiOutlineEye className='text-xl' />
									)}
								</button>
							</div>
						</div>

						{/* Remember me and forgot password */}
						<div className='flex items-center justify-between text-sm'>
							<label className='flex items-center text-light/70 hover:text-light cursor-pointer group'>
								<input
									type='checkbox'
									checked={rememberMe}
									onChange={(e) =>
										setRememberMe(e.target.checked)
									}
									className='mr-2 accent-secondary w-4 h-4 rounded'
								/>
								<span className='select-none'>Recordarme</span>
							</label>
							<Link
								href='/auth/reset-password'
								className='text-light/70 hover:text-secondary transition-colors underline-offset-4 hover:underline'>
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						{/* Error message with animation */}
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								className='bg-error/10 border border-error/20 rounded-lg p-3 text-sm text-error flex items-center gap-2'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 flex-shrink-0'>
									<path
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
										clipRule='evenodd'
									/>
								</svg>
								{error}
							</motion.div>
						)}

						{/* Actions */}
						<div className='space-y-4'>
							{/* Login button with loading state */}
							<button
								type='submit'
								disabled={isLoading}
								className='w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-xl shadow-accent1/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none'>
								{isLoading ? (
									<span className='flex items-center justify-center gap-2'>
										<AiOutlineLoading3Quarters className='animate-spin text-xl' />
										Iniciando sesión...
									</span>
								) : (
									'Iniciar Sesión'
								)}
							</button>

							{/* Google sign in */}
							<button
								type='button'
								className='w-full bg-white/5 border border-white/10 text-light/90 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]'>
								<AiOutlineGoogle className='text-xl text-light' />
								<span>Continuar con Google</span>
							</button>
						</div>
					</form>

					{/* Sign up link */}
					<div className='text-center mt-8'>
						<p className='text-light/70'>
							¿No tienes una cuenta?{' '}
							<Link
								href='/auth/register'
								className='text-secondary hover:text-accent1 transition-colors font-medium hover:underline underline-offset-4'>
								Regístrate
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
				Al iniciar sesión, aceptas nuestros{' '}
				<Link
					href='/terms'
					className='underline hover:text-light/70 transition-colors'>
					Términos de Servicio
				</Link>{' '}
				y{' '}
				<Link
					href='/privacy'
					className='underline hover:text-light/70 transition-colors'>
					Política de Privacidad
				</Link>
			</motion.p>
		</div>
	);
}

export default LoginPage;
