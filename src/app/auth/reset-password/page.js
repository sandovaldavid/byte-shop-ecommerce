'use client';
import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

function ResetPasswordPage() {
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='min-h-80 bg-dark flex items-center justify-center relative overflow-hidden py-16'>
			{/* Efectos de fondo */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 left-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl'></div>

			{/* Contenedor del formulario */}
			<div className='relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
						Recuperar Contraseña
					</h1>
					<p className='text-light/70 mt-2'>
						Te enviaremos un enlace para restablecer tu contraseña
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='relative'>
						<AiOutlineMail className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
						/>
					</div>

					<button
						type='submit'
						className='w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-accent1/20'>
						Enviar instrucciones
					</button>
				</form>

				<div className='text-center mt-6'>
					<a
						href='/auth/login'
						className='text-light/70 hover:text-secondary transition-colors text-sm'>
						Volver al inicio de sesión
					</a>
				</div>
			</div>
		</div>
	);
}

export default ResetPasswordPage;
