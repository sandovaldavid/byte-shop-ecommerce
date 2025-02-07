'use client';
import React from 'react';
import Link from 'next/link';
import { AiOutlineMail, AiOutlineCheckCircle } from 'react-icons/ai';

function VerifyMessagePage() {
	return (
		<div className='min-h-80 bg-dark flex items-center justify-center relative overflow-hidden py-16'>
			{/* Background effects */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 left-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl'></div>

			{/* Content container */}
			<div className='relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'>
				<div className='flex flex-col items-center text-center space-y-6'>
					{/* Icon */}
					<div className='flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 border border-secondary/20'>
						<AiOutlineMail className='w-10 h-10 text-secondary' />
					</div>

					{/* Title */}
					<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
						¡Revisa tu Email!
					</h1>

					{/* Message */}
					<div className='space-y-4'>
						<p className='text-light/70'>
							Hemos enviado un enlace de verificación a tu correo
							electrónico. Por favor, revisa tu bandeja de entrada
							y sigue las instrucciones para activar tu cuenta.
						</p>
						<div className='flex items-center justify-center space-x-2 text-sm text-light/50'>
							<AiOutlineCheckCircle className='text-secondary' />
							<span>El enlace expirará en 24 horas</span>
						</div>
					</div>

					{/* Actions */}
					<div className='space-y-4 w-full pt-4'>
						<Link
							href='/auth/login'
							className='block w-full px-8 py-3 bg-white/5 hover:bg-white/10 text-light text-center rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20'>
							Volver a Iniciar Sesión
						</Link>
						<p className='text-light/50 text-sm'>
							¿No recibiste el email?{' '}
							<button className='text-secondary hover:text-accent1 transition-colors'>
								Reenviar verificación
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerifyMessagePage;
