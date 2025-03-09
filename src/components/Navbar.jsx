'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	AiOutlineShoppingCart,
	AiOutlineSearch,
	AiOutlineMenu,
	AiOutlineClose,
	AiOutlineUser,
	AiOutlineLogout,
	AiOutlineHome,
	AiOutlineLaptop,
	AiOutlineTags,
	AiOutlineGift,
	AiOutlineCustomerService,
} from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthButtons } from '@/components';

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { openCart } = useCart();
	const { user, logout } = useAuth();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Cerrar menús al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				!e.target.closest('.search-container') &&
				!e.target.closest('.search-button')
			) {
				setIsSearchOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-dark/90 dark:bg-dark/95 shadow-lg py-2'
					: 'bg-dark/75 dark:bg-black/60 py-3'
			} backdrop-blur-xl border-b ${isScrolled ? 'border-white/10' : 'border-transparent'}`}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between'>
					{/* Logo con efecto mejorado */}
					<Link href='/' className='flex items-center group'>
						<div className='relative overflow-hidden'>
							<span
								className='text-2xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 
                bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300'>
								TechStore
							</span>
							<span
								className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent1 
                group-hover:w-full transition-all duration-500'></span>
						</div>
					</Link>

					{/* Links de navegación - Desktop */}
					<div className='hidden md:flex items-center space-x-1'>
						{[
							{
								href: '/products',
								label: 'Productos',
								icon: <AiOutlineLaptop />,
							},
							{
								href: '/categories',
								label: 'Categorías',
								icon: <AiOutlineTags />,
							},
							{
								href: '/deals',
								label: 'Ofertas',
								icon: <AiOutlineGift />,
							},
							{
								href: '/support',
								label: 'Soporte',
								icon: <AiOutlineCustomerService />,
							},
						].map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='group relative px-3 py-2 text-light/90 hover:text-light font-medium 
                  rounded-lg hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5'>
								<span className='text-secondary/80 group-hover:text-secondary transition-colors'>
									{item.icon}
								</span>
								{item.label}
								<span
									className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                  bg-gradient-to-r from-secondary to-accent1 group-hover:w-4/5 
                  transition-all duration-300 opacity-0 group-hover:opacity-100'></span>
							</Link>
						))}
					</div>

					{/* Controles derecha */}
					<div className='flex items-center space-x-1'>
						{/* Búsqueda mejorada */}
						<div className='relative search-container'>
							<button
								onClick={() => {
									setIsSearchOpen(!isSearchOpen);
									if (isSearchOpen === false) {
										setTimeout(
											() =>
												document
													.querySelector(
														'.search-input'
													)
													?.focus(),
											100
										);
									}
								}}
								className='search-button p-2.5 text-light/80 hover:text-light hover:bg-white/5 
                  rounded-full transition-all duration-200 flex items-center justify-center'
								aria-label='Buscar productos'>
								<AiOutlineSearch
									className={`w-5 h-5 ${isSearchOpen ? 'text-secondary' : ''}`}
								/>
							</button>

							{/* Panel de búsqueda con animación */}
							<div
								className={`absolute right-0 top-full mt-2 w-80 transform origin-top-right 
                transition-all duration-200 bg-dark/90 dark:bg-dark/95 backdrop-blur-md 
                border border-white/10 rounded-xl shadow-lg overflow-hidden
                ${isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
								<div className='flex items-center p-3'>
									<AiOutlineSearch className='text-secondary/80 mx-2' />
									<input
										type='text'
										placeholder='Buscar productos...'
										className='search-input w-full bg-transparent border-none px-2 py-1.5 
                      text-light/90 placeholder-light/40 focus:outline-none focus:ring-0'
									/>
								</div>
								<div className='border-t border-white/5 px-3 py-2'>
									<p className='text-xs text-light/50'>
										Categorías populares
									</p>
									<div className='flex flex-wrap gap-1 mt-1'>
										{[
											'Smartphones',
											'Laptops',
											'Audio',
											'Accesorios',
										].map((cat) => (
											<span
												key={cat}
												className='text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md 
                        text-light/70 hover:text-light transition-all cursor-pointer'>
												{cat}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Carrito con efecto mejorado */}
						<button
							onClick={openCart}
							className='relative p-2.5 text-light/80 hover:text-light hover:bg-white/5 
                rounded-full transition-all duration-200 flex items-center justify-center'
							aria-label='Ver carrito'>
							<AiOutlineShoppingCart className='w-5 h-5' />
							<span
								className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-accent1 to-accent2 
                text-light text-xs rounded-full flex items-center justify-center transform 
                transition-transform duration-300 hover:scale-110 shadow-sm shadow-accent1/20 
                border border-dark/20'>
								2
							</span>
						</button>

						{/* Botones de Auth - Desktop */}
						<div className='hidden md:flex items-center'>
							<AuthButtons />
						</div>

						{/* Botón menú móvil */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='md:hidden p-2.5 text-light/80 hover:text-light hover:bg-white/5 
                rounded-full transition-all duration-200 flex items-center justify-center'
							aria-label={
								isMenuOpen ? 'Cerrar menú' : 'Abrir menú'
							}>
							{isMenuOpen ? (
								<AiOutlineClose className='w-5 h-5' />
							) : (
								<AiOutlineMenu className='w-5 h-5' />
							)}
						</button>
					</div>
				</div>

				{/* Menú móvil con animación mejorada */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out 
            ${isMenuOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
					<div
						className={`py-4 border-t border-white/10 transition-all duration-300 
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
						<div className='space-y-1'>
							{/* Enlaces de navegación para móvil */}
							{[
								{
									href: '/',
									label: 'Inicio',
									icon: <AiOutlineHome />,
								},
								{
									href: '/products',
									label: 'Productos',
									icon: <AiOutlineLaptop />,
								},
								{
									href: '/categories',
									label: 'Categorías',
									icon: <AiOutlineTags />,
								},
								{
									href: '/deals',
									label: 'Ofertas',
									icon: <AiOutlineGift />,
								},
								{
									href: '/support',
									label: 'Soporte',
									icon: <AiOutlineCustomerService />,
								},
							].map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='flex items-center gap-3 px-4 py-2.5 text-light/80 hover:text-light 
                    transition-all rounded-lg hover:bg-white/5 w-full'>
									<span className='text-secondary w-5 h-5 flex items-center justify-center'>
										{item.icon}
									</span>
									{item.label}
								</Link>
							))}

							{/* Separador elegante */}
							<div className='h-px my-3 bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>

							{/* Sección de usuario */}
							<div className='px-3 pb-2'>
								{user?.name ? (
									<div className='space-y-2'>
										{/* Tarjeta de usuario autenticado */}
										<div
											className='flex items-center gap-3 p-3 bg-white/5 dark:bg-white/5 
                      rounded-xl border border-white/5 shadow-sm'>
											<div
												className='w-10 h-10 bg-gradient-to-br from-accent1 to-accent2 
                        rounded-full flex items-center justify-center text-light font-medium'>
												{user.name
													.charAt(0)
													.toUpperCase()}
											</div>
											<div>
												<p className='font-medium text-light'>
													{user.name}
												</p>
												<p className='text-xs text-light/50'>
													Cuenta Personal
												</p>
											</div>
										</div>

										{/* Botón de logout */}
										<button
											onClick={logout}
											className='w-full flex items-center gap-3 px-4 py-2.5 text-light/70 
                        hover:text-error transition-all rounded-lg hover:bg-error/5'>
											<AiOutlineLogout className='text-xl' />
											Cerrar Sesión
										</button>
									</div>
								) : (
									<div className='space-y-2'>
										{/* Botones de autenticación */}
										<Link
											href='/auth/login'
											className='flex items-center gap-3 px-4 py-2.5 w-full text-light/80 hover:text-secondary 
                        transition-all rounded-lg hover:bg-white/5 border border-white/5'>
											<AiOutlineUser className='text-xl text-secondary' />
											Iniciar Sesión
										</Link>

										<Link
											href='/auth/register'
											className='flex items-center justify-center gap-2 px-4 py-3 w-full
                        bg-gradient-to-r from-accent1 to-accent2 hover:from-accent1/90 hover:to-accent2/90
                        text-light font-medium rounded-xl transition-all duration-300 
                        hover:shadow-md shadow-accent1/20 border border-white/10'>
											Crear Cuenta
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
