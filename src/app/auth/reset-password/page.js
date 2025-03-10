'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
	AiOutlineMail,
	AiOutlineLoading3Quarters,
	AiOutlineCheckCircle,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

function ResetPasswordPage() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState({ type: null, message: '' });
	const [isEmailValid, setIsEmailValid] = useState(true);

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			setIsEmailValid(false);
			setStatus({
				type: 'error',
				message: 'Por favor, ingresa tu dirección de email',
			});
			return;
		}

		if (!validateEmail(email)) {
			setIsEmailValid(false);
			setStatus({
				type: 'error',
				message: 'Por favor, ingresa una dirección de email válida',
			});
			return;
		}

		setIsEmailValid(true);
		setIsLoading(true);
		setStatus({ type: null, message: '' });

		// Simulación de solicitud de recuperación de contraseña
		setTimeout(() => {
			setIsLoading(false);
			setStatus({
				type: 'success',
				message: 'Hemos enviado un enlace de recuperación a tu email',
			});
		}, 1500);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		if (status.type === 'error') {
			setStatus({ type: null, message: '' });
		}
	};

	return (
		<div className='w-full flex items-center justify-center px-4 py-8 sm:py-12'>
			{/* Contenedor principal con animaciones */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md relative'>
				{/* Efectos decorativos */}
				<div className='absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-secondary/10 via-accent1/5 to-accent2/10 rounded-full blur-3xl'></div>

				{/* Tarjeta del formulario */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.1, duration: 0.4 }}
					className='bg-glass-dark backdrop-blur-lg border border-glass-border-dark rounded-2xl shadow-glass-dark overflow-hidden'>
					{/* Cabecera con gradiente animado */}
					<motion.div
						className='relative overflow-hidden h-16 sm:h-20 flex items-center justify-center'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}>
						<div className='absolute inset-0 bg-gradient-to-r from-accent2/30 via-secondary/20 to-accent1/30'></div>
						<motion.div
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4, duration: 0.3 }}
							className='relative z-10'>
							<h2 className='text-2xl font-bold text-light'>
								Recuperar Contraseña
							</h2>
						</motion.div>
					</motion.div>

					{/* Contenido del formulario */}
					<div className='p-6 sm:p-8'>
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5, duration: 0.4 }}
							className='text-light/70 text-center mb-6'>
							Te enviaremos instrucciones para restablecer tu
							contraseña
						</motion.p>

						<form onSubmit={handleSubmit}>
							<div className='space-y-6'>
								{/* Campo de email con validación */}
								<motion.div
									className='relative'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6, duration: 0.3 }}>
									<div
										className={`flex items-center relative focus-within:ring-1 focus-within:ring-secondary/50 rounded-xl transition-all duration-300 bg-white/5 ${!isEmailValid ? 'border-error/50' : 'border-white/10'} border`}>
										<span className='absolute left-3 text-light/40 group-focus-within:text-secondary transition-colors duration-200'>
											<AiOutlineMail className='text-xl' />
										</span>
										<input
											type='email'
											placeholder='Email'
											value={email}
											onChange={handleEmailChange}
											className='w-full bg-transparent py-3 px-10 text-light focus:outline-none transition-all duration-300 placeholder:text-light/40'
											aria-label='Email'
										/>
									</div>

									{/* Mensaje de validación */}
									<AnimatePresence>
										{!isEmailValid && (
											<motion.p
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0 }}
												className='text-xs text-error/90 mt-1.5 ml-2 flex items-center gap-1'>
												<AiOutlineInfoCircle />
												<span>
													Ingresa un email válido
												</span>
											</motion.p>
										)}
									</AnimatePresence>
								</motion.div>

								{/* Botón de envío con estado de carga */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7, duration: 0.3 }}>
									<button
										type='submit'
										disabled={isLoading}
										className='w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg shadow-accent1/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center'>
										{isLoading ? (
											<span className='flex items-center justify-center gap-2'>
												<AiOutlineLoading3Quarters className='animate-spin text-xl' />
												Enviando...
											</span>
										) : (
											'Enviar instrucciones'
										)}
									</button>
								</motion.div>

								{/* Mensajes de estado */}
								<AnimatePresence>
									{status.message && (
										<motion.div
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -5 }}
											className={`rounded-lg p-3 text-sm flex items-center gap-2 ${
												status.type === 'error'
													? 'bg-error/10 border border-error/20 text-error'
													: 'bg-success/10 border border-success/20 text-success'
											}`}>
											{status.type === 'success' ? (
												<AiOutlineCheckCircle className='text-lg' />
											) : (
												<AiOutlineInfoCircle className='text-lg' />
											)}
											<span>{status.message}</span>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</form>

						{/* Enlace para volver */}
						<motion.div
							className='mt-8 text-center'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8, duration: 0.4 }}>
							<Link
								href='/auth/login'
								className='text-light/70 hover:text-secondary transition-colors underline-offset-4 hover:underline flex items-center justify-center gap-1.5'>
								<span>Volver al inicio de sesión</span>
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default ResetPasswordPage;
