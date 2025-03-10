'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineMail,
} from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi } from '@/api/authController';
import { Loading } from '@/components';

function VerifyPageContent() {
	const searchParams = useSearchParams();
	const [status, setStatus] = useState('loading');
	const userId = searchParams.get('userId');
	const secret = searchParams.get('secret');

	useEffect(() => {
		const verifyEmail = async () => {
			if (!userId || !secret) {
				setStatus('error');
				return;
			}

			try {
				await authApi.confirmVerification(userId, secret);
				setStatus('success');
			} catch (error) {
				console.error('Error en la verificación:', error);
				setStatus('error');
			}
		};

		verifyEmail();
	}, [userId, secret]);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.2,
				duration: 0.6,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	const statusConfig = {
		loading: {
			icon: (
				<div className='relative w-24 h-24 flex items-center justify-center'>
					<div className='absolute w-full h-full rounded-full border-4 border-secondary/20'></div>
					<div className='absolute w-full h-full rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin'></div>
					<AiOutlineMail className='text-4xl text-secondary/70' />
				</div>
			),
			title: 'Verificando tu correo electrónico',
			message: 'Esto solo tomará un momento...',
			button: null,
			bgClass: 'from-secondary/10 via-accent2/5 to-accent1/10',
			iconBgClass: 'bg-secondary/10 border-secondary/20',
		},
		success: {
			icon: (
				<div className='w-24 h-24 rounded-full bg-success/10 border-2 border-success/20 flex items-center justify-center transform transition-all duration-700 animate-pulse-slow'>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							type: 'spring',
							stiffness: 200,
							damping: 10,
							delay: 0.2,
						}}>
						<AiOutlineCheckCircle className='w-16 h-16 text-success' />
					</motion.div>
				</div>
			),
			title: '¡Correo verificado con éxito!',
			message:
				'Tu cuenta ha sido verificada correctamente. Ya puedes comenzar a explorar nuestra tienda.',
			button: (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}>
					<Link
						href='/auth/login'
						className='inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg shadow-accent1/20'>
						<span>Iniciar Sesión</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</Link>
				</motion.div>
			),
			bgClass: 'from-success/10 via-success/5 to-accent2/10',
			iconBgClass: 'bg-success/10 border-success/20',
		},
		error: {
			icon: (
				<div className='w-24 h-24 rounded-full bg-error/10 border-2 border-error/20 flex items-center justify-center'>
					<motion.div
						animate={{
							rotate: [0, -5, 5, -5, 5, 0],
							transition: { duration: 0.5, delay: 0.2 },
						}}>
						<AiOutlineCloseCircle className='w-16 h-16 text-error' />
					</motion.div>
				</div>
			),
			title: 'Error de verificación',
			message:
				'No pudimos verificar tu correo electrónico. El enlace puede haber expirado o ser inválido.',
			button: (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5, duration: 0.3 }}
					className='flex flex-col sm:flex-row items-center gap-4'>
					<Link
						href='/auth/register'
						className='inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-error to-error/70 hover:from-error/70 hover:to-error text-light font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg shadow-error/20 w-full sm:w-auto'>
						Volver a registrarse
					</Link>
					<Link
						href='/'
						className='inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/10 text-light/90 hover:bg-white/10 hover:text-light font-medium rounded-xl transition-all duration-300 w-full sm:w-auto'>
						Volver al inicio
					</Link>
				</motion.div>
			),
			bgClass: 'from-error/10 via-error/5 to-error/10',
			iconBgClass: 'bg-error/10 border-error/20',
		},
	};

	const current = statusConfig[status];

	return (
		<div className='bg-dark flex items-center justify-center relative overflow-hidden py-8 px-4'>
			{/* Background elements */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

			{/* Dynamic gradients */}
			<motion.div
				className={`absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-50 ${current.bgClass}`}
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
				className={`absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-50 ${current.bgClass}`}
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

			{/* Content card */}
			<motion.div
				className='relative w-full max-w-md'
				variants={containerVariants}
				initial='hidden'
				animate='visible'>
				<motion.div
					className='relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-glass-dark backdrop-blur-lg border border-white/10 shadow-glass-dark'
					variants={itemVariants}>
					{/* Card inner gradient overlay */}
					<div
						className={`absolute inset-0 bg-gradient-to-br ${current.bgClass} opacity-20`}></div>

					<div className='relative z-10 flex flex-col items-center justify-center space-y-8 text-center'>
						{/* Icon */}
						<motion.div
							variants={itemVariants}
							className='transform transition-all duration-500'>
							{current.icon}
						</motion.div>

						{/* Title */}
						<motion.h1
							variants={itemVariants}
							className='text-3xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent'>
							{current.title}
						</motion.h1>

						{/* Message */}
						<motion.p
							variants={itemVariants}
							className='text-light/80 max-w-sm'>
							{current.message}
						</motion.p>

						{/* Button */}
						{current.button && (
							<motion.div
								variants={itemVariants}
								className='pt-4 w-full'>
								{current.button}
							</motion.div>
						)}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}

function VerifyPage() {
	return (
		<Suspense fallback={<Loading />}>
			<VerifyPageContent />
		</Suspense>
	);
}

export default VerifyPage;
