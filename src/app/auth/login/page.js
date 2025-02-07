'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineMail, AiOutlineLock, AiOutlineGoogle } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

function LoginPage() {
	const router = useRouter();
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

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
		<div className='min-h-80 bg-dark flex items-center justify-center relative overflow-hidden py-16'>
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl'></div>

			<div className='relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
						Bienvenido de nuevo
					</h1>
					<p className='text-light/70 mt-2'>
						Accede a tu cuenta para continuar
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='space-y-4'>
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

						<div className='relative'>
							<AiOutlineLock className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
							<input
								type='password'
								placeholder='Contraseña'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
							/>
						</div>
					</div>

					<div className='flex items-center justify-between text-sm'>
						<label className='flex items-center text-light/70 hover:text-light cursor-pointer group'>
							<input
								type='checkbox'
								className='mr-2 accent-secondary'
							/>
							Recordarme
						</label>
						<Link
							href='/auth/reset-password'
							className='text-light/70 hover:text-secondary transition-colors'>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					<div className='space-y-4'>
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-accent1/20 disabled:opacity-50 disabled:cursor-not-allowed'>
							{isLoading
								? 'Iniciando sesión...'
								: 'Iniciar Sesión'}
						</button>

						{error && (
							<p className='text-red-500 text-sm text-center'>
								{error}
							</p>
						)}

						<button
							type='button'
							className='w-full bg-white/5 border border-white/10 text-light py-3 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2'>
							<AiOutlineGoogle className='text-xl' />
							Continuar con Google
						</button>
					</div>
				</form>

				<p className='text-center text-light/70 mt-8'>
					¿No tienes una cuenta?{' '}
					<Link
						href='/auth/register'
						className='text-secondary hover:text-accent1 transition-colors'>
						Regístrate
					</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
