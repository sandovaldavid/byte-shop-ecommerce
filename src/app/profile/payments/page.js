'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineLoading3Quarters,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import PaymentMethodList from '@/components/profile/payments/PaymentMethodList';
import ProfileLoadingSkeleton from '@/components/profile/utils/ProfileLoadingSkeleton';
import ProfileEmptyState from '@/components/profile/utils/ProfileEmptyState';

// Definición de métricas simuladas para la sección de pagos
const paymentStats = {
	metrics: [
		{
			id: 'payment-methods',
			label: 'Métodos de Pago',
			value: '0',
			icon: <AiOutlineCreditCard className='text-primary' />,
			change: null,
		},
		{
			id: 'default-payment',
			label: 'Método Predeterminado',
			value: 'No configurado',
			icon: <FaCcVisa className='text-[#1434CB]' />,
			change: null,
		},
		{
			id: 'last-update',
			label: 'Última Actualización',
			value: 'Nunca',
			icon: <AiOutlineInfoCircle className='text-accent2' />,
			change: null,
		},
	],
};

export default function PaymentsPage() {
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [stats, setStats] = useState(paymentStats);

	// Simulación de carga de datos desde una API
	useEffect(() => {
		const fetchPaymentMethods = async () => {
			try {
				setLoading(true);

				// Simular retardo de red
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Datos de ejemplo para métodos de pago
				const mockPaymentMethods = [
					{
						id: 'card-123',
						type: 'credit_card',
						brand: 'visa',
						lastFour: '4242',
						expiryMonth: '12',
						expiryYear: '25',
						isDefault: true,
						holderName: 'Juan Pérez',
					},
					{
						id: 'card-456',
						type: 'credit_card',
						brand: 'mastercard',
						lastFour: '5678',
						expiryMonth: '03',
						expiryYear: '26',
						isDefault: false,
						holderName: 'Juan Pérez',
					},
					{
						id: 'card-789',
						type: 'debit_card',
						brand: 'visa',
						lastFour: '9876',
						expiryMonth: '08',
						expiryYear: '24',
						isDefault: false,
						holderName: 'Juan Pérez',
					},
				];

				setPaymentMethods(mockPaymentMethods);

				// Actualizar las métricas basadas en los datos reales
				if (mockPaymentMethods.length > 0) {
					const defaultMethod = mockPaymentMethods.find(
						(m) => m.isDefault
					);
					const lastUpdateDate = new Date().toLocaleDateString(
						'es-ES',
						{
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						}
					);

					setStats({
						metrics: [
							{
								id: 'payment-methods',
								label: 'Métodos de Pago',
								value: mockPaymentMethods.length.toString(),
								icon: (
									<AiOutlineCreditCard className='text-primary' />
								),
								change: null,
							},
							{
								id: 'default-payment',
								label: 'Método Predeterminado',
								value: defaultMethod
									? `${defaultMethod.brand.charAt(0).toUpperCase() + defaultMethod.brand.slice(1)} •••• ${defaultMethod.lastFour}`
									: 'No configurado',
								icon: getCardIcon(
									defaultMethod?.brand || 'unknown'
								),
								change: null,
							},
							{
								id: 'last-update',
								label: 'Última Actualización',
								value: lastUpdateDate,
								icon: (
									<AiOutlineInfoCircle className='text-accent2' />
								),
								change: null,
							},
						],
					});
				}
			} catch (err) {
				console.error('Error al cargar métodos de pago:', err);
				setError(
					'No pudimos cargar tus métodos de pago. Por favor, intenta de nuevo más tarde.'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchPaymentMethods();
	}, []);

	// Obtener el icono correspondiente a la marca de la tarjeta
	function getCardIcon(brand) {
		switch (brand.toLowerCase()) {
			case 'visa':
				return <FaCcVisa className='text-[#1434CB]' />;
			case 'mastercard':
				return <FaCcMastercard className='text-[#EB001B]' />;
			case 'amex':
				return <FaCcAmex className='text-[#2E77BC]' />;
			default:
				return <AiOutlineCreditCard className='text-accent2' />;
		}
	}

	// Manejar la adición de un nuevo método de pago
	const handleAddPaymentMethod = async (formData) => {
		try {
			setLoading(true);

			// Simular retardo de red
			await new Promise((resolve) => setTimeout(resolve, 800));

			const newPaymentMethod = {
				id: `card-${Date.now()}`,
				type: formData.type,
				brand: formData.brand,
				lastFour: formData.lastFour,
				expiryMonth: formData.expiryMonth,
				expiryYear: formData.expiryYear,
				isDefault: formData.isDefault,
				holderName: formData.holderName,
			};

			// Si el nuevo método es predeterminado, actualizar los otros métodos
			const updatedMethods = formData.isDefault
				? paymentMethods.map((method) => ({
						...method,
						isDefault: false,
					}))
				: [...paymentMethods];

			// Agregar el nuevo método
			const newMethods = [...updatedMethods, newPaymentMethod];
			setPaymentMethods(newMethods);

			// Actualizar las métricas
			updateStats(newMethods);

			return newPaymentMethod;
		} catch (error) {
			console.error('Error al agregar el método de pago:', error);
			setError(
				'No pudimos agregar el método de pago. Por favor, intenta de nuevo.'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Manejar la actualización de un método de pago existente
	const handleUpdatePaymentMethod = async (formData) => {
		try {
			setLoading(true);

			// Simular retardo de red
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Actualizar el método de pago existente
			let updatedMethods = paymentMethods.map((method) => {
				if (method.id === formData.id) {
					return {
						...method,
						holderName: formData.holderName,
						expiryMonth: formData.expiryMonth,
						expiryYear: formData.expiryYear,
						isDefault: formData.isDefault,
					};
				}

				// Si el método actualizado es ahora el predeterminado, actualizar otros métodos
				if (formData.isDefault) {
					return {
						...method,
						isDefault: method.id === formData.id,
					};
				}

				return method;
			});

			setPaymentMethods(updatedMethods);

			// Actualizar las métricas
			updateStats(updatedMethods);

			return updatedMethods.find((m) => m.id === formData.id);
		} catch (error) {
			console.error('Error al actualizar el método de pago:', error);
			setError(
				'No pudimos actualizar el método de pago. Por favor, intenta de nuevo.'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Manejar la eliminación de un método de pago
	const handleDeletePaymentMethod = async (id) => {
		try {
			setLoading(true);

			// Simular retardo de red
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Filtrar el método de pago eliminado
			const updatedMethods = paymentMethods.filter(
				(method) => method.id !== id
			);

			// Si el método eliminado era el predeterminado, establecer uno nuevo
			if (
				paymentMethods.find((m) => m.id === id)?.isDefault &&
				updatedMethods.length > 0
			) {
				updatedMethods[0].isDefault = true;
			}

			setPaymentMethods(updatedMethods);

			// Actualizar las métricas
			updateStats(updatedMethods);

			return true;
		} catch (error) {
			console.error('Error al eliminar el método de pago:', error);
			setError(
				'No pudimos eliminar el método de pago. Por favor, intenta de nuevo.'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Manejar establecer un método de pago como predeterminado
	const handleSetDefaultPaymentMethod = async (id) => {
		try {
			setLoading(true);

			// Simular retardo de red
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Actualizar el método predeterminado
			const updatedMethods = paymentMethods.map((method) => ({
				...method,
				isDefault: method.id === id,
			}));

			setPaymentMethods(updatedMethods);

			// Actualizar las métricas
			updateStats(updatedMethods);

			return true;
		} catch (error) {
			console.error(
				'Error al establecer el método de pago predeterminado:',
				error
			);
			setError(
				'No pudimos actualizar el método de pago predeterminado. Por favor, intenta de nuevo.'
			);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Actualizar las métricas basadas en los datos actuales
	const updateStats = (methods) => {
		if (methods.length > 0) {
			const defaultMethod = methods.find((m) => m.isDefault);
			const lastUpdateDate = new Date().toLocaleDateString('es-ES', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			});

			setStats({
				metrics: [
					{
						id: 'payment-methods',
						label: 'Métodos de Pago',
						value: methods.length.toString(),
						icon: <AiOutlineCreditCard className='text-primary' />,
						change: null,
					},
					{
						id: 'default-payment',
						label: 'Método Predeterminado',
						value: defaultMethod
							? `${defaultMethod.brand.charAt(0).toUpperCase() + defaultMethod.brand.slice(1)} •••• ${defaultMethod.lastFour}`
							: 'No configurado',
						icon: getCardIcon(defaultMethod?.brand || 'unknown'),
						change: null,
					},
					{
						id: 'last-update',
						label: 'Última Actualización',
						value: lastUpdateDate,
						icon: <AiOutlineInfoCircle className='text-accent2' />,
						change: null,
					},
				],
			});
		}
	};

	return (
		<div className='min-h-screen p-4 sm:p-6 md:p-8 '>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}>
				{/* Componente principal para la lista de métodos de pago */}
				<PaymentMethodList
					paymentMethods={paymentMethods}
					loading={loading}
					error={error}
					onAddPaymentMethod={handleAddPaymentMethod}
					onUpdatePaymentMethod={handleUpdatePaymentMethod}
					onDeletePaymentMethod={handleDeletePaymentMethod}
					onSetDefaultPaymentMethod={handleSetDefaultPaymentMethod}
					showMetrics={true}
					stats={stats}
				/>

				{/* Mensaje de error si existe */}
				{error && !loading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='mt-6 p-4 bg-error/10 border border-error/20 rounded-xl text-light flex gap-3 items-start'>
						<AiOutlineInfoCircle className='text-xl flex-shrink-0 text-error mt-0.5' />
						<div>
							<h3 className='font-medium mb-1'>Error</h3>
							<p className='text-sm text-light/70'>{error}</p>
						</div>
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
