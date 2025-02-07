'use client';
import React from 'react';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';

function NotFound({
	icon = '😢',
	title = 'Producto no encontrado',
	message = 'El producto que buscas no existe o no está disponible.',
	buttonText = 'Volver a la tienda',
	buttonLink = '/products',
}) {
	return (
		<div className='min-h-screen bg-dark flex items-center justify-center relative overflow-hidden'>
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

			<div className='absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl'></div>

			<div className='relative flex flex-col items-center justify-center gap-6 p-8 max-w-md text-center'>
				<div className='text-8xl animate-bounce-slow'>{icon}</div>

				<h2 className='text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
					{title}
				</h2>

				<p className='text-light/70'>{message}</p>

				<Link
					href={buttonLink}
					className='flex items-center gap-2 bg-gradient-to-r from-accent1 to-accent2 text-light px-6 py-3 rounded-xl hover:from-accent2 hover:to-accent1 transition-all duration-300 transform hover:scale-105 group'>
					<AiOutlineLeft className='transition-transform group-hover:-translate-x-1' />
					{buttonText}
				</Link>

				<div className='absolute top-1/2 -left-24 w-24 h-px bg-gradient-to-r from-transparent via-accent1/50 to-transparent'></div>
				<div className='absolute top-1/2 -right-24 w-24 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent'></div>
			</div>
		</div>
	);
}

export default NotFound;
