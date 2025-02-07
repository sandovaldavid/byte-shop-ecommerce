'use client';
import React from 'react';

function Loading() {
	return (
		<div className='min-h-screen bg-dark flex items-center justify-center relative'>
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

			<div className='absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-0 right-0 w-96 h-96 bg-accent1/10 rounded-full filter blur-3xl animate-pulse-slow'></div>

			<div className='relative flex flex-col items-center gap-8'>
				<div className='relative'>
					<div className='w-24 h-24 border-4 border-white/10 border-t-secondary rounded-full animate-spin'></div>

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/10 border-t-accent1 rounded-full animate-spin-reverse'></div>

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-light rounded-full'></div>
				</div>

				<div className='space-y-2 text-center'>
					<h2 className='text-xl font-medium text-light animate-pulse'>
						Cargando
					</h2>
					<p className='text-light/50 text-sm'>
						Preparando una experiencia increíble...
					</p>
				</div>
			</div>
		</div>
	);
}

export default Loading;
