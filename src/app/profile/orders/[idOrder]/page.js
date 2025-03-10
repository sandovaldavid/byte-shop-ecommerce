'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	AiOutlineArrowLeft,
	AiOutlineShoppingCart,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import OrderDetail from '@/components/profile/orders/OrderDetail';
import ProfileLoadingSkeleton from '@/components/profile/utils/ProfileLoadingSkeleton';
import ProfileEmptyState from '@/components/profile/utils/ProfileEmptyState';

// Simulación de API - reemplazar con tu llamada real a la API
const mockFetchOrder = async (orderId) => {
	// Simular retardo de red
	await new Promise((resolve) => setTimeout(resolve, 800));

	const mockOrders = {
		'ORD-94872': {
			id: 'ORD-94872',
			date: '5 marzo, 2024',
			total: '$349.99',
			subtotal: '$329.99',
			shipping: '$20.00',
			taxes: '$0.00',
			items: 2,
			status: 'completed',
			paymentMethod: 'Tarjeta terminada en 4242',
			trackingNumber: 'TRACK-123456789',
			shippingAddress: {
				name: 'David Rivera',
				address: 'Av. Tecnología 123',
				additionalInfo: 'Apto 4B',
				city: 'Ciudad Digital',
				state: 'Tecnolandia',
				postalCode: '12345',
				country: 'México',
				phone: '+52 55 1234 5678',
			},
			products: [
				{
					id: 'prod-1',
					name: 'Auriculares Bluetooth ANC Pro',
					price: '$129.99',
					quantity: 1,
					image: '/products/headphones.jpg',
					options: 'Color: Negro',
				},
				{
					id: 'prod-2',
					name: 'Smartwatch Fitness Plus',
					price: '$219.99',
					quantity: 1,
					image: '/products/smartwatch.jpg',
					options: 'Color: Plata',
				},
			],
			timeline: [
				{
					date: '3 marzo, 2024',
					time: '10:30',
					status: 'ordered',
					text: 'Pedido realizado',
				},
				{
					date: '3 marzo, 2024',
					time: '14:15',
					status: 'payment',
					text: 'Pago confirmado',
					details:
						'Tu pago ha sido procesado correctamente mediante tarjeta de crédito terminada en 4242',
				},
				{
					date: '4 marzo, 2024',
					time: '09:45',
					status: 'processing',
					text: 'En preparación',
				},
				{
					date: '4 marzo, 2024',
					time: '16:30',
					status: 'shipped',
					text: 'Pedido enviado',
					details:
						'Tu pedido ha sido enviado con número de seguimiento TRACK-123456789',
				},
				{
					date: '5 marzo, 2024',
					time: '11:20',
					status: 'delivered',
					text: 'Entregado',
					details: 'Tu pedido ha sido entregado correctamente',
				},
			],
		},
		'ORD-85693': {
			id: 'ORD-85693',
			date: '28 febrero, 2024',
			total: '$129.50',
			subtotal: '$119.50',
			shipping: '$10.00',
			taxes: '$0.00',
			items: 1,
			status: 'shipped',
			paymentMethod: 'PayPal',
			trackingNumber: 'TRACK-987654321',
			shippingAddress: {
				name: 'David Rivera',
				address: 'Calle Innovación 456',
				additionalInfo: 'Piso 8, Oficina 803',
				city: 'Ciudad Digital',
				state: 'Tecnolandia',
				postalCode: '12345',
				country: 'México',
				phone: '+52 55 8765 4321',
			},
			products: [
				{
					id: 'prod-3',
					name: 'Teclado Mecánico RGB',
					price: '$129.50',
					quantity: 1,
					image: '/products/keyboard.jpg',
					options: 'Switches: Blue',
				},
			],
			timeline: [
				{
					date: '26 febrero, 2024',
					time: '15:20',
					status: 'ordered',
					text: 'Pedido realizado',
				},
				{
					date: '26 febrero, 2024',
					time: '15:22',
					status: 'payment',
					text: 'Pago confirmado',
					details:
						'Tu pago ha sido procesado correctamente mediante PayPal',
				},
				{
					date: '27 febrero, 2024',
					time: '10:15',
					status: 'processing',
					text: 'En preparación',
				},
				{
					date: '28 febrero, 2024',
					time: '09:30',
					status: 'shipped',
					text: 'Pedido enviado',
					details:
						'Tu pedido ha sido enviado con número de seguimiento TRACK-987654321',
				},
			],
		},
	};

	return mockOrders[orderId] || null;
};

export default function OrderDetailPage() {
	const params = useParams();
	const router = useRouter();
	const { idOrder } = params;

	const [order, setOrder] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Cargar los datos del pedido
	useEffect(() => {
		const fetchOrderDetails = async () => {
			try {
				setIsLoading(true);
				const orderData = await mockFetchOrder(idOrder);

				if (!orderData) {
					setError('Pedido no encontrado');
				} else {
					setOrder(orderData);
				}
			} catch (err) {
				console.error('Error fetching order details:', err);
				setError('Ocurrió un error al cargar los detalles del pedido');
			} finally {
				setIsLoading(false);
			}
		};

		fetchOrderDetails();
	}, [idOrder]);

	// Variantes de animación
	const pageVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.4,
				when: 'beforeChildren',
			},
		},
	};

	const handleGoBack = () => {
		router.push('/profile/orders');
	};

	// Mostrar skeleton mientras carga
	if (isLoading) {
		return <ProfileLoadingSkeleton />;
	}

	// Mostrar estado de error si no se encuentra el pedido
	if (error || !order) {
		return (
			<ProfileEmptyState
				title={error || 'Pedido no encontrado'}
				description='No pudimos encontrar el pedido que estás buscando. Puede que haya sido eliminado o la dirección sea incorrecta.'
				customIcon={
					<div className='h-20 w-20 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10'>
						<AiOutlineInfoCircle className='text-4xl text-error/80' />
					</div>
				}
				actionText='Ver todos mis pedidos'
				actionLink='/profile/orders'
				secondaryText='Ir al inicio'
				secondaryLink='/profile'
				animated={true}
			/>
		);
	}

	// Renderizar detalle del pedido
	return (
		<motion.div
			className='p-4 sm:p-6 md:p-8'
			variants={pageVariants}
			initial='hidden'
			animate='visible'>
			<div className='mb-4 md:hidden'>
				<button
					onClick={handleGoBack}
					className='inline-flex items-center gap-2 px-3 py-2 text-sm rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-light/80 hover:text-light'>
					<AiOutlineArrowLeft size={16} />
					<span>Volver a pedidos</span>
				</button>
			</div>

			{/* Usar el componente OrderDetail para mostrar toda la información */}
			<OrderDetail order={order} animated={true} />

			{/* Pedidos relacionados o recomendaciones (opcional) */}
			<div className='mt-10'>
				<div className='flex items-center gap-2 mb-4'>
					<AiOutlineShoppingCart className='text-xl text-secondary' />
					<h2 className='text-lg font-medium text-light'>
						Pedidos recomendados
					</h2>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer'
							onClick={() =>
								router.push('/products/sample-product')
							}>
							<div className='flex gap-3 items-center'>
								<div className='w-16 h-16 rounded-lg bg-white/5 flex-shrink-0'></div>
								<div>
									<div className='text-light font-medium'>
										Producto recomendado #{item}
									</div>
									<div className='text-light/60 text-sm'>
										$99.99
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Ayuda para el usuario */}
			<motion.div
				className='mt-8 flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}>
				<AiOutlineInfoCircle className='text-secondary text-xl flex-shrink-0 mt-0.5' />
				<div className='text-sm text-light/70'>
					<p className='mb-1'>¿Alguna pregunta sobre tu pedido?</p>
					<p>
						Si tienes alguna duda sobre tu pedido, puedes consultar
						nuestra sección de{' '}
						<span className='text-accent1 hover:text-accent2 transition-colors cursor-pointer'>
							Preguntas Frecuentes
						</span>{' '}
						o contactar a nuestro{' '}
						<span className='text-accent1 hover:text-accent2 transition-colors cursor-pointer'>
							Servicio al Cliente
						</span>
						.
					</p>
				</div>
			</motion.div>
		</motion.div>
	);
}
