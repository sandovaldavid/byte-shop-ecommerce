'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
	AiOutlineShoppingCart,
	AiOutlineSearch,
	AiOutlineMenu,
	AiOutlineClose,
} from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { AuthButtons } from '@/components';

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const { openCart } = useCart();

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-dark/80 dark:bg-black/50 backdrop-blur-xl border-b border-white/10'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<Link href='/' className='flex items-center space-x-2'>
						<span className='text-2xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 bg-clip-text text-transparent hover:scale-105 transition-transform'>
							TechStore
						</span>
					</Link>

					<div className='hidden md:flex items-center space-x-8'>
						<Link
							href='/products'
							className='text-light hover:text-secondary font-medium transition-all duration-200 hover:scale-105'>
							Productos
						</Link>
						<Link
							href='/categories'
							className='text-light hover:text-secondary font-medium transition-all duration-200 hover:scale-105'>
							Categorías
						</Link>
						<Link
							href='/deals'
							className='text-light hover:text-secondary font-medium transition-all duration-200 hover:scale-105'>
							Ofertas
						</Link>
						<Link
							href='/support'
							className='text-light hover:text-secondary font-medium transition-all duration-200 hover:scale-105'>
							Soporte
						</Link>
					</div>

					<div className='flex items-center space-x-4'>
						{/* Búsqueda */}
						<div className='relative'>
							<button
								onClick={() => setIsSearchOpen(!isSearchOpen)}
								className='p-2 text-light/80 hover:text-secondary transition-all duration-200 hover:scale-105'>
								<AiOutlineSearch className='w-6 h-6' />
							</button>
							{isSearchOpen && (
								<div className='absolute right-0 top-12 w-80'>
									<input
										type='text'
										placeholder='Buscar productos...'
										className='w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg backdrop-blur-md text-light focus:outline-none focus:border-secondary transition-all duration-200'
									/>
								</div>
							)}
						</div>

						{/* Carrito */}
						<button
							onClick={openCart}
							className='relative p-2 hover:bg-white/5 rounded-lg transition-all duration-200 hover:scale-105'>
							<AiOutlineShoppingCart className='text-2xl text-light/70 hover:text-accent1' />
							<span className='absolute -top-1 -right-1 w-5 h-5 bg-accent1 text-light text-xs rounded-full flex items-center justify-center'>
								2
							</span>
						</button>

						{/* Botones de Auth */}
						<div className='hidden md:flex items-center space-x-3'>
							<AuthButtons />
						</div>

						{/* Menú móvil */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='md:hidden p-2 text-light/80 hover:text-secondary transition-all duration-200'>
							{isMenuOpen ? (
								<AiOutlineClose className='w-6 h-6' />
							) : (
								<AiOutlineMenu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>

				{/* Menú móvil expandido */}
				{isMenuOpen && (
					<div className='md:hidden py-4 border-t border-white/10'>
						<div className='flex flex-col space-y-4'>
							<Link
								href='/products'
								className='text-light/80 hover:text-secondary transition-colors duration-200'>
								Productos
							</Link>
							<Link
								href='/categories'
								className='text-light/80 hover:text-secondary transition-colors duration-200'>
								Categorías
							</Link>
							<Link
								href='/deals'
								className='text-light/80 hover:text-secondary transition-colors duration-200'>
								Ofertas
							</Link>
							<Link
								href='/support'
								className='text-light/80 hover:text-secondary transition-colors duration-200'>
								Soporte
							</Link>
							{/* Auth links para móvil */}
							<div className='flex flex-col space-y-2 pt-4 border-t border-white/10'>
								<Link
									href='/auth/login'
									className='text-light/80 hover:text-secondary transition-colors duration-200 flex items-center gap-2'>
									<AiOutlineUser />
									Iniciar Sesión
								</Link>
								<Link
									href='/auth/register'
									className='bg-gradient-to-r from-accent1 to-accent2 text-light py-2 px-4 rounded-xl text-center'>
									Registrarse
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
