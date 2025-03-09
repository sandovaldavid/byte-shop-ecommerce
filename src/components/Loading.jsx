'use client';
import React from 'react';

function Loading() {
	return (
		<div className='fixed inset-0 z-50 bg-dark/95 backdrop-blur-md flex items-center justify-center'>
			{/* Grid pattern background */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>

			{/* Ambient light effects */}
			<div className='absolute top-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow'></div>
			<div className='absolute bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-accent1/10 rounded-full filter blur-3xl animate-pulse-slow'></div>

			{/* Main content container */}
			<div className='relative flex flex-col items-center justify-center gap-8 px-4 py-10'>
				{/* Tech-inspired loading animation */}
				<div className='relative mb-2'>
					{/* Outer ring */}
					<div className='w-20 sm:w-24 h-20 sm:h-24 border-4 border-white/5 border-t-secondary border-r-secondary/50 rounded-full animate-spin'></div>

					{/* Middle ring */}
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 sm:w-16 h-14 sm:h-16 border-4 border-white/5 border-t-accent1 border-r-accent1/50 rounded-full animate-spin-reverse'></div>

					{/* Inner ring */}
					<div
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 border-3 border-white/5 border-t-accent2 border-r-accent2/50 rounded-full animate-spin'
						style={{ animationDuration: '1s' }}></div>

					{/* Center dot with glow effect */}
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
						<div className='w-2 h-2 bg-light rounded-full animate-pulse'></div>
						<div className='absolute w-6 h-6 bg-secondary/20 rounded-full animate-ping'></div>
					</div>
				</div>

				{/* Text content */}
				<div className='space-y-3 text-center max-w-xs'>
					<div className='flex items-center justify-center'>
						<h2 className='text-xl sm:text-2xl font-medium bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent animate-pulse'>
							Cargando
						</h2>
						<div className='flex ml-2 gap-1'>
							<span
								className='w-2 h-2 rounded-full bg-secondary animate-bounce'
								style={{ animationDelay: '0ms' }}></span>
							<span
								className='w-2 h-2 rounded-full bg-accent1 animate-bounce'
								style={{ animationDelay: '150ms' }}></span>
							<span
								className='w-2 h-2 rounded-full bg-accent2 animate-bounce'
								style={{ animationDelay: '300ms' }}></span>
						</div>
					</div>

					<p className='text-light/60 text-sm sm:text-base px-4'>
						Preparando una experiencia increíble...
					</p>

					{/* Progress bar */}
					<div className='w-full max-w-[200px] mx-auto h-1 bg-white/5 rounded-full overflow-hidden'>
						<div className='h-full bg-gradient-to-r from-accent2 via-secondary to-accent1 rounded-full animate-gradient bg-size-200'></div>
					</div>
				</div>
			</div>

			{/* Bottom tech details - subtle branding */}
			<div className='absolute bottom-6 text-center w-full'>
				<p className='text-light/40 text-xs'>TechStore &middot; v1.0</p>
			</div>
		</div>
	);
}

export default Loading;
