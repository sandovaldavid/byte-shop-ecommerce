'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import OrderList from '@/components/profile/orders/OrderList';
import ProfileLoadingSkeleton from '@/components/profile/utils/ProfileLoadingSkeleton';

// Mock orders data - Replace with your actual data fetching
const mockOrders = [
	{
		id: 'ORD-94872',
		date: '5 marzo, 2024',
		total: '$349.99',
		items: 2,
		status: 'completed',
		paymentMethod: 'Tarjeta terminada en 4242',
		trackingNumber: 'TRACK-123456789',
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
	},
	{
		id: 'ORD-85693',
		date: '28 febrero, 2024',
		total: '$129.50',
		items: 1,
		status: 'shipped',
		paymentMethod: 'PayPal',
		trackingNumber: 'TRACK-987654321',
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
	},
	{
		id: 'ORD-74528',
		date: '12 febrero, 2024',
		total: '$766.00',
		items: 3,
		status: 'completed',
		paymentMethod: 'Tarjeta terminada en 8976',
		products: [
			{
				id: 'prod-4',
				name: 'Monitor Curvo 27"',
				price: '$299.00',
				quantity: 1,
				image: '/products/monitor.jpg',
			},
			{
				id: 'prod-5',
				name: 'SSD 1TB NVMe',
				price: '$149.00',
				quantity: 1,
				image: '/products/ssd.jpg',
			},
			{
				id: 'prod-6',
				name: 'Mouse Gaming Pro',
				price: '$89.00',
				quantity: 2,
				image: '/products/mouse.jpg',
			},
		],
	},
	{
		id: 'ORD-69435',
		date: '30 enero, 2024',
		total: '$1,299.99',
		items: 1,
		status: 'processing',
		paymentMethod: 'Tarjeta terminada en 5523',
		products: [
			{
				id: 'prod-7',
				name: 'Laptop UltraBook X1',
				price: '$1,299.99',
				quantity: 1,
				image: '/products/laptop.jpg',
				options: 'RAM: 16GB, SSD: 512GB',
			},
		],
	},
	{
		id: 'ORD-58391',
		date: '15 enero, 2024',
		total: '$59.99',
		items: 1,
		status: 'cancelled',
		paymentMethod: 'Tarjeta terminada en 7789',
		products: [
			{
				id: 'prod-8',
				name: 'Cargador USB-C 100W',
				price: '$59.99',
				quantity: 1,
				image: '/products/charger.jpg',
			},
		],
	},
];

export default function OrdersPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);

	// Métricas del usuario
	const userStats = {
		orders: mockOrders.length,
		wishlist: 12,
		reviews: 4,
	};

	// Cargar órdenes (simulación de API)
	useEffect(() => {
		const loadOrders = async () => {
			try {
				// Simular tiempo de carga
				await new Promise((resolve) => setTimeout(resolve, 800));
				setOrders(mockOrders);
				setIsLoading(false);
			} catch (error) {
				console.error('Error loading orders:', error);
				setError(
					'Error al cargar los pedidos. Por favor, intenta más tarde.'
				);
				setIsLoading(false);
			}
		};

		loadOrders();
	}, []);

	// Manejar navegación hacia el detalle del pedido
	const handleViewOrderDetail = (orderId) => {
		router.push(`/profile/orders/${orderId}`);
	};

	// Mostrar skeleton mientras carga
	if (isLoading) {
		return <ProfileLoadingSkeleton />;
	}

	return (
		<div className='p-4 sm:p-6 md:p-8'>
			{/* Efectos visuales decorativos */}
			<div className='absolute -z-10 top-10 right-10 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl opacity-60 pointer-events-none'></div>
			<div className='absolute -z-10 bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-accent1/5 to-accent2/5 rounded-full blur-3xl opacity-60 pointer-events-none'></div>

			{/* Utilizar el componente OrderList */}
			<OrderList
				orders={orders}
				loading={isLoading}
				error={error}
				stats={userStats}
				showMetrics={false}
				onSelectOrder={handleViewOrderDetail}
			/>
		</div>
	);
}
