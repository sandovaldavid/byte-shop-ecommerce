'use client';
import React from 'react';
import { Cart } from '@/components';

function CartShop() {
	return (
		<div className='min-h-screen bg-dark py-20'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='mb-8'>
					<h1 className='text-4xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
						Carrito de Compras
					</h1>
					<p className='text-light/70 mt-2'>
						Revisa y gestiona tus productos seleccionados
					</p>
				</div>
				<div className='bg-white/5 backdrop-blur-sm rounded-xl p-6'>
					<Cart />
				</div>
			</div>
		</div>
	);
}

export default CartShop;
