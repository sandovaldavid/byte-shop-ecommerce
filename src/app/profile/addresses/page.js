'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineHome,
	AiOutlinePlus,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import ProfileLayout from '@/components/profile/layout/ProfileLayout';
import AddressList from '@/components/profile/addresses/AddressList';

// Mock addresses - Replace with your actual data fetching
const mockAddresses = [
	{
		id: 'addr-1',
		alias: 'Casa',
		name: 'David Rivera',
		street: 'Av. Tecnología 123',
		additionalInfo: 'Apto 4B',
		city: 'Ciudad Digital',
		state: 'Tecnolandia',
		postalCode: '12345',
		country: 'México',
		phone: '+52 55 1234 5678',
		instructions: 'Dejar con el portero si no estoy',
		isDefault: true,
		type: 'shipping',
		createdAt: '2024-01-15',
	},
	{
		id: 'addr-2',
		alias: 'Oficina',
		name: 'David Rivera',
		street: 'Calle Innovación 456',
		additionalInfo: 'Piso 8, Oficina 803',
		city: 'Ciudad Digital',
		state: 'Tecnolandia',
		postalCode: '12345',
		country: 'México',
		phone: '+52 55 8765 4321',
		instructions: '',
		isDefault: false,
		type: 'shipping',
		createdAt: '2024-02-01',
	},
	{
		id: 'addr-3',
		alias: 'Facturación',
		name: 'David Rivera',
		street: 'Av. Tecnología 123',
		additionalInfo: 'Apto 4B',
		city: 'Ciudad Digital',
		state: 'Tecnolandia',
		postalCode: '12345',
		country: 'México',
		phone: '',
		instructions: '',
		isDefault: true,
		type: 'billing',
		createdAt: '2024-01-15',
	},
];

export default function AddressesPage() {
	const [addresses, setAddresses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch addresses - Simulated with setTimeout
	useEffect(() => {
		const fetchAddresses = async () => {
			try {
				// Simulated API call
				setTimeout(() => {
					setAddresses(mockAddresses);
					setIsLoading(false);
				}, 800);
			} catch (error) {
				console.error('Error fetching addresses:', error);
				setIsLoading(false);
			}
		};

		fetchAddresses();
	}, []);

	// Add a new address
	const handleAddAddress = async (addressData) => {
		try {
			// Simulated API call
			const newAddress = {
				...addressData,
				id: `addr-${Date.now()}`,
				createdAt: new Date().toISOString(),
			};

			// If this is the first address of its type, make it default
			if (!addresses.find((addr) => addr.type === addressData.type)) {
				newAddress.isDefault = true;
			}

			// If marked as default, update all other addresses of same type
			if (newAddress.isDefault) {
				setAddresses((prev) =>
					prev.map((addr) =>
						addr.type === newAddress.type
							? { ...addr, isDefault: false }
							: addr
					)
				);
			}

			setAddresses((prev) => [...prev, newAddress]);
			return newAddress;
		} catch (error) {
			console.error('Error adding address:', error);
			throw error;
		}
	};

	// Edit an existing address
	const handleEditAddress = async (addressData) => {
		try {
			// Simulated API call
			let updatedAddresses = [...addresses];
			const index = updatedAddresses.findIndex(
				(addr) => addr.id === addressData.id
			);

			if (index !== -1) {
				// If marked as default, update all other addresses of same type
				if (addressData.isDefault) {
					updatedAddresses = updatedAddresses.map((addr) =>
						addr.type === addressData.type &&
						addr.id !== addressData.id
							? { ...addr, isDefault: false }
							: addr
					);
				}

				updatedAddresses[index] = addressData;
				setAddresses(updatedAddresses);
			}

			return addressData;
		} catch (error) {
			console.error('Error editing address:', error);
			throw error;
		}
	};

	// Delete an address
	const handleDeleteAddress = async (addressId) => {
		try {
			// Simulated API call
			setAddresses((prev) =>
				prev.filter((addr) => addr.id !== addressId)
			);
			return true;
		} catch (error) {
			console.error('Error deleting address:', error);
			throw error;
		}
	};

	// Set an address as default
	const handleSetDefaultAddress = async (addressId) => {
		try {
			// Simulated API call
			const targetAddress = addresses.find(
				(addr) => addr.id === addressId
			);

			if (targetAddress) {
				const updatedAddresses = addresses.map((addr) => ({
					...addr,
					isDefault:
						addr.id === addressId
							? true
							: addr.type === targetAddress.type
								? false
								: addr.isDefault,
				}));

				setAddresses(updatedAddresses);
			}

			return true;
		} catch (error) {
			console.error('Error setting default address:', error);
			throw error;
		}
	};

	// Animation variants
	const pageVariants = {
		hidden: { x: -10 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, when: 'beforeChildren' },
		},
	};

	const headerVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	return (
		<motion.div
			className='p-6 md:p-8'
			variants={pageVariants}
			initial='hidden'
			animate='visible'>
			{/* Page header */}
			<motion.div className='mb-8' variants={headerVariants}>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<div>
						<h1 className='text-2xl md:text-3xl font-bold text-light mb-2'>
							Mis Direcciones
						</h1>
						<p className='text-light/60'>
							Gestiona tus direcciones de envío y facturación
						</p>
					</div>

					{/* Desktop quick action buttons */}
					<div className='hidden sm:flex space-x-3'>
						<button
							onClick={() =>
								document
									.getElementById('addressList')
									?.scrollIntoView({ behavior: 'smooth' })
							}
							className='px-4 py-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all text-sm flex items-center gap-2 shadow-lg shadow-secondary/20'>
							<AiOutlinePlus />
							<span>Nueva Dirección</span>
						</button>
					</div>
				</div>

				{/* Info card */}
				<div className='mt-6 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm'>
					<div className='flex items-start gap-3'>
						<div className='text-secondary mt-1'>
							<AiOutlineInfoCircle size={20} />
						</div>
						<div>
							<p className='text-light/80 text-sm'>
								Puedes agregar múltiples direcciones para envío
								y facturación. Las direcciones marcadas como
								predeterminadas se seleccionarán automáticamente
								al realizar compras.
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Address statistics */}
			<motion.div
				className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}>
				<div className='bg-glass-dark backdrop-blur-sm border border-glass-border-dark rounded-xl p-5 flex items-center gap-4'>
					<div className='h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary'>
						<AiOutlineHome size={24} />
					</div>
					<div>
						<p className='text-light/60 text-sm'>
							Direcciones de Envío
						</p>
						<p className='text-2xl font-bold text-light'>
							{isLoading
								? '...'
								: addresses.filter(
										(addr) => addr.type === 'shipping'
									).length}
						</p>
					</div>
				</div>

				<div className='bg-glass-dark backdrop-blur-sm border border-glass-border-dark rounded-xl p-5 flex items-center gap-4'>
					<div className='h-12 w-12 rounded-full bg-accent1/20 flex items-center justify-center text-accent1'>
						<AiOutlineHome size={24} />
					</div>
					<div>
						<p className='text-light/60 text-sm'>
							Direcciones de Facturación
						</p>
						<p className='text-2xl font-bold text-light'>
							{isLoading
								? '...'
								: addresses.filter(
										(addr) => addr.type === 'billing'
									).length}
						</p>
					</div>
				</div>

				<div className='sm:col-span-2 md:col-span-1 bg-glass-dark backdrop-blur-sm border border-glass-border-dark rounded-xl p-5 bg-gradient-to-r from-secondary/5 to-accent1/5'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-light/60 text-sm'>
								Último cambio
							</p>
							<p className='text-light font-medium mt-1'>
								{isLoading
									? '...'
									: addresses.length > 0
										? new Date(
												Math.max(
													...addresses.map(
														(a) =>
															new Date(
																a.createdAt
															)
													)
												)
											).toLocaleDateString('es-ES', {
												day: 'numeric',
												month: 'long',
											})
										: 'Ninguna dirección'}
							</p>
						</div>

						{/* Mobile quick action button */}
						<button
							onClick={() =>
								document
									.getElementById('addressList')
									?.scrollIntoView({ behavior: 'smooth' })
							}
							className='sm:hidden px-4 py-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all text-sm flex items-center gap-2 shadow-lg shadow-accent1/20'>
							<AiOutlinePlus />
							<span>Agregar</span>
						</button>
					</div>
				</div>
			</motion.div>

			{/* Address list component */}
			<div id='addressList'>
				<AddressList
					addresses={addresses}
					isLoading={isLoading}
					onAddAddress={handleAddAddress}
					onEditAddress={handleEditAddress}
					onDeleteAddress={handleDeleteAddress}
					onSetDefaultAddress={handleSetDefaultAddress}
				/>
			</div>
		</motion.div>
	);
}
