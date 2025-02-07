'use client';
import Link from 'next/link';
import { AiOutlineUser } from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

export const AuthButtons = () => {
	const { user, logout, loading } = useAuth();

	if (loading) {
		return (
			<div className='h-8 w-32 animate-pulse bg-white/10 rounded'></div>
		);
	}

	if (user?.name) {
		return (
			<div className='flex items-center space-x-4'>
				<span className='text-light/80'>Hola, {user.name}</span>
				<button
					onClick={logout}
					className='px-4 py-2 text-light/80 hover:text-secondary transition-all duration-200 hover:scale-105'>
					Cerrar Sesión
				</button>
			</div>
		);
	}

	return (
		<>
			<Link
				href='/auth/login'
				className='px-4 py-2 text-light/80 hover:text-secondary transition-all duration-200 hover:scale-105 flex items-center gap-2'>
				<AiOutlineUser />
				Iniciar Sesión
			</Link>
			<Link
				href='/auth/register'
				className='px-4 py-2 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-accent1/20'>
				Registrarse
			</Link>
		</>
	);
};

export default AuthButtons;