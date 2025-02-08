import React from 'react';
import { client } from '../lib/client.js';
import {
	Cart,
	Footer,
	FooterBanner,
	HeroBanner,
	Layout,
	Navbar,
	Product,
} from '../components';

async function getData() {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		products,
		bannerData,
	};
}

async function Page() {
	async function Page() {
		const { products, bannerData } = await getData();

		return (
			<>
				<HeroBanner
					heroBanner={bannerData?.length > 0 && bannerData[0]}
				/>

				{/* Sección de Productos Destacados */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					{/* Encabezado con efecto de gradiente */}
					<div className='relative mb-12'>
						<div className='absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent1/20 dark:from-secondary/10 dark:to-accent1/10 blur-3xl'></div>
						<div className='relative'>
							<h2 className='text-4xl font-bold bg-gradient-to-r from-secondary via-accent1 to-accent2 dark:from-secondary dark:via-accent1 dark:to-accent2 bg-clip-text text-transparent pb-2'>
								Best Seller Products
							</h2>
							<p className='text-light/80 dark:text-light/70 text-lg'>
								Discover our most popular tech products
							</p>
							{/* Línea decorativa */}
							<div className='w-32 h-1 mt-4 bg-gradient-to-r from-secondary to-accent1 rounded-full'></div>
						</div>
					</div>

					{/* Grid de Productos con Efecto Tech */}
					{!products || products.length === 0 ? (
						<div className='relative overflow-hidden rounded-2xl bg-white/5 dark:bg-dark/40 backdrop-blur-md border border-white/10 dark:border-white/5'>
							<div className='absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:20px_20px]'></div>
							<div className='relative flex flex-col items-center justify-center py-20 space-y-6'>
								<div className='text-6xl animate-bounce-slow'>
									📱
								</div>
								<h3 className='text-2xl font-medium text-light dark:text-light/90 bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
									No hay productos disponibles
								</h3>
								<p className='text-light/70 dark:text-light/60 text-center max-w-md bg-white/5 dark:bg-dark/40 p-6 rounded-xl backdrop-blur-sm'>
									Lo sentimos, en este momento no hay
									productos disponibles. Vuelve a visitarnos
									pronto para ver nuestras nuevas ofertas.
								</p>
							</div>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{/* Efecto de gradiente de fondo */}
							<div className='absolute inset-0 bg-gradient-to-tr from-secondary/10 via-transparent to-accent1/10 dark:from-secondary/5 dark:via-transparent dark:to-accent1/5 blur-3xl -z-10'></div>

							{products.map((product) => (
								<Product
									key={product.slug.current}
									product={product}
								/>
							))}
						</div>
					)}
				</div>

				{/* Banner de Footer con efecto de profundidad */}
				<div className='relative'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark/90 dark:from-transparent dark:via-dark/70 dark:to-dark/95'></div>
					<FooterBanner
						footerBanner={bannerData?.length > 0 && bannerData[0]}
					/>
				</div>
			</>
		);
	}
	const { products, bannerData } = await getData();

	return (
		<>
			<HeroBanner heroBanner={bannerData?.length > 0 && bannerData[0]} />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<h2 className='text-3xl font-bold text-light mb-2'>
					Best Seller Products
				</h2>
				<p className='text-light/70 mb-8'>
					Discover our most popular tech products
				</p>

				{!products || products.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-20 space-y-6'>
						<div className='text-6xl'>📱</div>
						<h3 className='text-2xl font-medium text-light'>
							No hay productos disponibles
						</h3>
						<p className='text-light/70 text-center max-w-md'>
							Lo sentimos, en este momento no hay productos
							disponibles. Vuelve a visitarnos pronto para ver
							nuestras nuevas ofertas.
						</p>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{products.map((product) => (
							<Product
								key={product.slug.current}
								product={product}
							/>
						))}
					</div>
				)}
			</div>
			<FooterBanner
				footerBanner={bannerData?.length > 0 && bannerData[0]}
			/>
		</>
	);
}

export default Page;
