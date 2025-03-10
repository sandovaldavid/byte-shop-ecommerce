export const dynamic = 'force-dynamic';
import React from 'react';
import { client } from '@/lib/client';
import { ProductList } from '@/components';
import { AiOutlineLaptop } from 'react-icons/ai';

async function getProducts() {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);
	return products;
}

async function ProductsPage() {
	const products = await getProducts();

	return (
		<div className='min-h-screen bg-gradient-to-b from-dark/95 to-dark/90 dark:from-dark/98 dark:to-dark/95'>
			{/* Background ambient effects */}
			<div className='fixed inset-0 bg-[linear-gradient(rgba(51,85,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none'></div>
			<div className='fixed top-0 left-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>
			<div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-accent1/5 dark:bg-accent1/3 rounded-full filter blur-3xl opacity-50 pointer-events-none'></div>

			{/* Hero Header Section */}
			<div className='relative overflow-hidden py-12 md:py-20 border-b border-white/5'>
				<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>
				<div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent2/5 to-accent1/10 opacity-60'></div>

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col items-center text-center space-y-6'>
						{/* Icon with glow effect */}
						<div className='relative mb-2'>
							<div className='text-4xl md:text-5xl text-secondary animate-pulse-slow'>
								<AiOutlineLaptop />
							</div>
							<div className='absolute -inset-4 bg-secondary/10 rounded-full blur-xl -z-10'></div>
						</div>

						{/* Main heading */}
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 dark:from-secondary dark:via-light dark:to-accent1 bg-clip-text text-transparent pb-3'>
							Productos Tecnológicos
						</h1>

						{/* Subtitle */}
						<p className='max-w-2xl mx-auto text-light/80 dark:text-light/70 text-lg'>
							Descubre nuestra colección de dispositivos y
							accesorios de última generación
						</p>

						{/* Decorative separator with gradient */}
						<div className='w-24 h-1 bg-gradient-to-r from-secondary to-accent1 rounded-full mt-2'></div>
					</div>

					{/* Filter Stats - Shows the number of products */}
					<div className='mt-10 flex flex-wrap justify-center gap-4'>
						<div className='bg-white/5 dark:bg-dark/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10'>
							<span className='text-secondary font-medium'>
								{products.length}
							</span>
							<span className='text-light/70 ml-2'>
								productos disponibles
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Improved content container for ProductList */}
			<div className='relative z-10 py-8 md:py-12'>
				<ProductList initialProducts={products} />
			</div>
		</div>
	);
}

export default ProductsPage;
