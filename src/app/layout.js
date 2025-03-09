import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Layout } from '../components';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';

// Optimización de fuentes
const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	preload: true,
});

export const metadata = {
	metadataBase: new URL('https://tu-dominio.com'),
	title: {
		template: '%s | TechShop',
		default: 'TechShop | Tu Tienda de Tecnología',
	},
	description:
		'Descubre la mejor selección de productos tecnológicos: smartphones, laptops, audio y más. Innovación y calidad al mejor precio.',
	keywords:
		'tecnología, ecommerce, gadgets, smartphones, laptops, audio, accesorios tecnológicos',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 5,
	},
	openGraph: {
		title: 'TechShop | Tu Tienda de Tecnología',
		description:
			'Explora nuestra colección de productos tecnológicos de última generación.',
		type: 'website',
		locale: 'es_ES',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'TechShop - Tecnología de última generación',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
	},
	manifest: '/manifest.json',
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.svg', type: 'image/svg+xml' },
		],
		apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
	},
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0A1022' },
	],
};

export default function RootLayout({ children }) {
	return (
		<html
			lang='es'
			className='scroll-smooth'
			suppressHydrationWarning
		>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-300`}>
				<ErrorBoundary
					fallback={
						<p>Algo salió mal. Por favor, recarga la página.</p>
					}>
					<ThemeProvider>
						<AuthProvider>
							<CartProvider>
								<Suspense fallback={<Loading />}>
									<Layout>{children}</Layout>
								</Suspense>
							</CartProvider>
						</AuthProvider>
					</ThemeProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}
