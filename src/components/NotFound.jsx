'use client';
import React from 'react';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineSearch } from 'react-icons/ai';

function NotFound({
	icon = '😢',
	title = 'Producto no encontrado',
	message = 'El producto que buscas no existe o no está disponible.',
	buttonText = 'Volver a la tienda',
	buttonLink = '/products',
}) {
	return (
		<div className='min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-dark/95 to-dark/90 dark:from-dark/98 dark:to-dark/95'>
			{/* Grid pattern background */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(79,106,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(79,106,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]'></div>

			{/* Ambient light effects */}
			<div className='absolute top-10 -left-20 w-72 h-72 md:w-96 md:h-96 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow'></div>
			<div className='absolute -bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 bg-accent1/10 dark:bg-accent1/5 rounded-full filter blur-3xl animate-pulse-slow'></div>
			<div className='absolute top-1/4 right-1/4 w-48 h-48 bg-secondary/10 dark:bg-secondary/5 rounded-full filter blur-3xl animate-pulse-slow'></div>

			{/* Contenedor principal con glassmorphism */}
			<div className='relative z-10 w-full max-w-lg'>
				<div className='relative p-6 sm:p-8 md:p-10 bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass-light dark:shadow-glass-dark overflow-hidden'>
					{/* Ornamentos decorativos */}
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-secondary/30 dark:via-secondary/20 to-transparent rounded-full'></div>
					<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-accent1/30 dark:via-accent1/20 to-transparent rounded-full'></div>

					{/* Círculos decorativos animados */}
					<div className='absolute -top-20 -right-20 w-40 h-40 border border-secondary/20 rounded-full animate-spin-slow'></div>
					<div
						className='absolute -bottom-40 -left-20 w-64 h-64 border border-accent1/20 rounded-full animate-spin-slow'
						style={{
							animationDuration: '25s',
							animationDirection: 'reverse',
						}}></div>

					{/* Contenido principal */}
					<div className='flex flex-col items-center justify-center gap-6 text-center relative'>
						{/* Icono con marco decorativo */}
						<div className='relative'>
							<div className='text-6xl sm:text-7xl animate-bounce-slow z-10 relative'>
								{icon === '😢' ? '🔍' : icon}
							</div>
							<div className='absolute -inset-3 bg-gradient-to-r from-secondary/10 to-accent1/10 rounded-full blur-md -z-10'></div>
						</div>

						<div className='space-y-3'>
							{/* Título con gradiente */}
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 dark:from-secondary dark:via-light dark:to-accent1 bg-clip-text text-transparent'>
								{title}
							</h2>

							{/* Mensaje con mejor legibilidad */}
							<p className='text-light/80 dark:text-light/70 text-base sm:text-lg max-w-md mx-auto'>
								{message}
							</p>
						</div>

						{/* Botones con mejor interactividad */}
						<div className='flex flex-col sm:flex-row gap-3 w-full pt-2'>
							<Link
								href={buttonLink}
								className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-accent1/20 group'>
								<AiOutlineLeft className='transition-transform duration-300 group-hover:-translate-x-1' />
								<span>{buttonText}</span>
							</Link>

							<Link
								href='/'
								className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 dark:bg-dark/40 dark:hover:bg-dark/60 text-light/90 font-medium rounded-xl transition-all duration-300 border border-white/10 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg'>
								<span>Ir al inicio</span>
							</Link>
						</div>

						{/* Elemento de búsqueda opcional*/}
						<div className='w-full pt-4 mt-2 border-t border-white/10'>
							<form className='flex items-center gap-2 bg-white/5 dark:bg-dark/30 rounded-lg p-2 backdrop-blur-sm'>
								<AiOutlineSearch className='text-secondary/80 text-xl ml-1' />
								<input
									type='text'
									placeholder='Buscar otro producto...'
									className='w-full bg-transparent border-none text-light/90 placeholder:text-light/50 focus:outline-none focus:ring-0 text-sm'
								/>
								<button
									type='submit'
									className='px-3 py-1.5 text-sm bg-secondary/80 hover:bg-secondary text-dark font-medium rounded-md transition-colors'>
									Buscar
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Marca discreta de la tienda */}
				<div className='mt-4 text-center'>
					<p className='text-light/40 text-xs'>
						TechStore &copy; {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
