'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
	AiOutlineMail,
	AiOutlineCheckCircle,
	AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

function VerifyMessagePage() {
	const [isResending, setIsResending] = useState(false);
	const [resendStatus, setResendStatus] = useState(null);

	const handleResendVerification = () => {
		setIsResending(true);
		// Simulate API call with setTimeout
		setTimeout(() => {
			setIsResending(false);
			setResendStatus('success');

			// Clear success message after 5 seconds
			setTimeout(() => {
				setResendStatus(null);
			}, 5000);
		}, 1500);
	};

	return (
		<div className='flex items-center justify-center relative overflow-hidden py-4 px-4 sm:py-2'>
			{/* Enhanced background effects with animation */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

			<motion.div
				className='absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-secondary/5 to-transparent rounded-full filter blur-3xl'
				animate={{
					scale: [1, 1.05, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
			/>

			<motion.div
				className='absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-accent1/5 to-transparent rounded-full filter blur-3xl'
				animate={{
					scale: [1, 1.1, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 10,
					delay: 1,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
			/>

			{/* Content container with enhanced glassmorphism */}
			<motion.div
				className='relative w-full max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<div className='absolute inset-0 bg-gradient-to-br from-secondary/10 via-accent2/5 to-accent1/10 rounded-2xl blur-xl opacity-50'></div>

				<motion.div
					className='relative rounded-2xl overflow-hidden bg-glass-dark backdrop-blur-xl border border-glass-border-dark shadow-glass-dark'
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.1 }}>
					{/* Header with gradient */}
					<div className='relative overflow-hidden h-16 flex items-center justify-center'>
						<div className='absolute inset-0 bg-gradient-to-r from-accent2/30 via-secondary/20 to-accent1/30'></div>
						<motion.div
							initial={{ y: 10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.3 }}
							className='relative z-10'>
							<h1 className='text-2xl font-bold text-light'>
								Verificación de Email
							</h1>
						</motion.div>
					</div>

					<div className='p-6 sm:p-8'>
						<div className='flex flex-col items-center text-center space-y-6'>
							{/* Email icon with pulse animation */}
							<motion.div
								className='relative flex items-center justify-center'
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: 'spring',
									stiffness: 260,
									damping: 20,
									delay: 0.3,
								}}>
								<div className='absolute w-24 h-24 rounded-full bg-secondary/5 animate-ping opacity-75'></div>
								<div className='relative flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 border border-secondary/20'>
									<AiOutlineMail className='w-10 h-10 text-secondary' />
								</div>
							</motion.div>

							{/* Title with gradient text */}
							<motion.h2
								className='text-3xl font-bold bg-gradient-to-r from-secondary via-accent2 to-accent1 bg-clip-text text-transparent'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.4 }}>
								¡Revisa tu Email!
							</motion.h2>

							{/* Message with staggered animation */}
							<motion.div
								className='space-y-4'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.4 }}>
								<p className='text-light/80 sm:text-lg'>
									Hemos enviado un enlace de verificación a tu
									correo electrónico. Por favor, revisa tu
									bandeja de entrada y sigue las instrucciones
									para activar tu cuenta.
								</p>

								<div className='flex items-center justify-center space-x-2 text-sm text-light/60 bg-secondary/5 py-2 px-4 rounded-lg border border-secondary/10'>
									<AiOutlineCheckCircle className='text-secondary' />
									<span>El enlace expirará en 24 horas</span>
								</div>
							</motion.div>

							{/* Actions */}
							<motion.div
								className='space-y-4 w-full pt-4'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.4 }}>
								<Link
									href='/auth/login'
									className='block w-full px-8 py-3.5 bg-gradient-to-r from-secondary to-accent2 hover:from-accent2 hover:to-secondary text-light font-medium text-center rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-accent2/20'>
									Volver a Iniciar Sesión
								</Link>

								<div className='flex flex-col items-center'>
									<p className='text-light/60 text-sm mb-2'>
										¿No recibiste el email?
									</p>

									<button
										onClick={handleResendVerification}
										disabled={isResending}
										className='text-secondary hover:text-accent1 transition-colors flex items-center gap-2 py-1 px-3 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-secondary'>
										{isResending ? (
											<>
												<AiOutlineLoading3Quarters className='animate-spin' />
												<span>Enviando...</span>
											</>
										) : (
											<span>Reenviar verificación</span>
										)}
									</button>

									{/* Success message with animation */}
									<AnimatePresence>
										{resendStatus === 'success' && (
											<motion.div
												initial={{
													opacity: 0,
													height: 0,
												}}
												animate={{
													opacity: 1,
													height: 'auto',
												}}
												exit={{ opacity: 0, height: 0 }}
												className='mt-2 text-xs text-success flex items-center gap-1'>
												<AiOutlineCheckCircle />
												<span>
													¡Verificación enviada
													nuevamente!
												</span>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</motion.div>
						</div>
					</div>

					{/* Bottom decoration line */}
					<div className='h-1 w-full bg-gradient-to-r from-transparent via-secondary/20 to-transparent'></div>
				</motion.div>
			</motion.div>
		</div>
	);
}

export default VerifyMessagePage;
