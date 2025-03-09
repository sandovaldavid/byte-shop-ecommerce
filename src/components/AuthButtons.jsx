'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	AiOutlineUser,
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineUserAdd,
	AiOutlineDown,
} from 'react-icons/ai';
import { useAuth } from '@/context/AuthContext';

export const AuthButtons = () => {
	const { user, logout, loading } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	if (loading) {
		return (
			<div className='flex items-center space-x-2'>
				<div className='h-9 w-9 rounded-full animate-pulse bg-white/10'></div>
				<div className='h-8 w-24 animate-pulse bg-white/10 rounded-md'></div>
			</div>
		);
	}

	// User is logged in
	if (user?.name) {
		// Split the name to get the first name for a more personal greeting
		const firstName = user.name.split(' ')[0];

		return (
			<div className='relative'>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className='flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300
            bg-white/5 hover:bg-white/10 border border-white/10 group'>
					<div
						className='w-8 h-8 bg-gradient-to-br from-accent1 to-accent2 
            rounded-full flex items-center justify-center text-light text-sm font-medium
            shadow-md shadow-accent1/20 group-hover:shadow-accent2/30 transition-all duration-300'>
						{user.name.charAt(0).toUpperCase()}
					</div>
					<div className='hidden sm:block'>
						<p className='text-light/90 text-sm font-medium'>
							{firstName}
						</p>
						<p className='text-light/50 text-xs'>Mi cuenta</p>
					</div>
					<AiOutlineDown
						className={`text-light/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
					/>
				</button>

				{/* Dropdown menu with user options */}
				{isOpen && (
					<div
						className='absolute right-0 top-full mt-2 w-48 bg-dark/90 backdrop-blur-md border border-white/10 
            rounded-xl shadow-lg overflow-hidden z-50 transition-all duration-300 animate-fade-up'>
						<div className='p-3 border-b border-white/10'>
							<p className='text-light font-medium'>
								{user.name}
							</p>
							<p className='text-light/50 text-xs'>
								Cuenta Personal
							</p>
						</div>
						<div className='py-1'>
							<Link
								href='/profile'
								className='flex items-center gap-2 px-3 py-2 text-light/70 hover:text-light hover:bg-white/5 w-full text-left'>
								<AiOutlineUser className='text-secondary/80' />
								Mi Perfil
							</Link>
							<button
								onClick={() => {
									setIsOpen(false);
									logout();
								}}
								className='flex items-center gap-2 px-3 py-2 text-light/70 hover:text-error w-full text-left hover:bg-error/5'>
								<AiOutlineLogout className='text-error/80' />
								Cerrar Sesión
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}

	// User is not logged in
	return (
		<div className='flex items-center gap-3'>
			<Link
				href='/auth/login'
				className='flex items-center gap-1.5 px-3 py-1.5 text-light/80 hover:text-secondary
          transition-all duration-200 rounded-lg hover:bg-white/5 sm:gap-2 sm:px-4 sm:py-2
          border border-transparent hover:border-secondary/20'>
				<AiOutlineLogin className='text-secondary/80 text-lg' />
				<span className=' xs:inline'>Sign in</span>
			</Link>

			<Link
				href='/auth/register'
				className='flex items-center gap-1.5 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2
          bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1
          text-light font-medium rounded-xl transition-all duration-300 
          shadow-sm hover:shadow-lg shadow-accent1/20 hover:shadow-accent2/30
          transform hover:translate-y-[-1px] border border-white/10'>
				<AiOutlineUserAdd className='text-lg' />
				<span className=' xs:inline'>Sign up</span>
			</Link>
		</div>
	);
};

export default AuthButtons;
