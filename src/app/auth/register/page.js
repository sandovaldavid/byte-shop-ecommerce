'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	AiOutlineUser,
	AiOutlineMail,
	AiOutlineLock,
	AiOutlineGoogle,
} from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';
import { checkConnection } from '@/lib/appwrite';

function RegisterPage() {
	const router = useRouter();
	const { register } = useAuth();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			if (formData.password !== formData.confirmPassword) {
				throw new Error('Las contraseñas no coinciden');
			}

			await register(formData.email, formData.password, formData.name);
			router.push('/');
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

	return (
		<div className='min-h-80 bg-dark flex items-center justify-center relative overflow-hidden py-16'>
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
			<div className='absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 left-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl'></div>

			<div className='relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'>
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
						Crear Cuenta
					</h1>
					<p className='text-light/70 mt-2'>
						Únete a la revolución tecnológica
					</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='space-y-4'>
						{/* Nombre */}
						<div className='relative'>
							<AiOutlineUser className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
							<input
								type='text'
								name='name'
								placeholder='Nombre completo'
								value={formData.name}
								onChange={handleChange}
								className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
							/>
						</div>

						<div className='relative'>
							<AiOutlineMail className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
							<input
								type='email'
								name='email'
								placeholder='Email'
								value={formData.email}
								onChange={handleChange}
								className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
							/>
						</div>

						<div className='relative'>
							<AiOutlineLock className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
							<input
								type='password'
								name='password'
								placeholder='Contraseña'
								value={formData.password}
								onChange={handleChange}
								className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
							/>
						</div>

						<div className='relative'>
							<AiOutlineLock className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50 text-xl' />
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirmar contraseña'
								value={formData.confirmPassword}
								onChange={handleChange}
								className='w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-light focus:outline-none focus:border-secondary transition-colors placeholder:text-light/50'
							/>
						</div>
					</div>

					<div className='flex items-center text-sm'>
						<label className='flex items-center text-light/70 hover:text-light cursor-pointer group'>
							<input
								type='checkbox'
								className='mr-2 accent-secondary'
							/>
							Acepto los{' '}
							<Link
								href='/terms'
								className='text-secondary hover:text-accent1 transition-colors ml-1'>
								términos y condiciones
							</Link>
						</label>
					</div>

					<div className='space-y-4'>
						<button
							type='submit'
							disabled={isLoading}
							className='w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-accent1/20'>
							{isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
						</button>
						{error && (
							<p className='text-red-500 text-sm text-center mt-2'>
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
					¿Ya tienes una cuenta?{' '}
					<Link
						href='/auth/login'
						className='text-secondary hover:text-accent1 transition-colors'>
						Inicia sesión
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
