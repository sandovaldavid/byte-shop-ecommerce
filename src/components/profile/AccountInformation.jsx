'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import {
	AiOutlineEdit,
	AiOutlineSave,
	AiOutlineUser,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineEnvironment,
	AiOutlineCalendar,
	AiOutlineLoading3Quarters,
	AiOutlineCheck,
	AiOutlineClose,
	AiOutlineInfoCircle,
} from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { RiVerifiedBadgeFill, RiTimeLine } from 'react-icons/ri';
import ProfileLoadingSkeleton from './utils/ProfileLoadingSkeleton';
import ProfileEmptyState from './utils/ProfileEmptyState';

const AccountInformation = () => {
	const { user, loading } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	// Mock user data for development (replace with actual auth user data in production)
	const mockUserData = {
		name: 'Sofia Rodríguez',
		email: 'sofia.rodriguez@example.com',
		phone: '+52 55 1234 5678',
		address: 'Calle Tecnológica #404',
		city: 'Ciudad Digital',
		postalCode: '12345',
		country: 'México',
		joinedDate: 'Noviembre 2022',
		avatar: null,
		verified: true,
		lastLogin: 'Hace 2 días',
		accountType: 'Premium',
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 24,
			},
		},
	};

	const buttonVariants = {
		hover: { scale: 1.05 },
		tap: { scale: 0.95 },
	};

	// Initialize form data using user or mock data
	useEffect(() => {
		if (user || mockUserData) {
			const userData = user || mockUserData;
			setFormData({
				name: userData.name || '',
				phone: userData.phone || '',
				address: userData.address || '',
				city: userData.city || '',
				postalCode: userData.postalCode || '',
			});
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		setError(null);

		try {
			// Simulate API call with delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			setSuccess('Información actualizada correctamente');
			setIsEditing(false);

			// Clear success message after delay
			setTimeout(() => setSuccess(null), 3000);
		} catch (err) {
			setError('No se pudo actualizar la información. Intente de nuevo.');
		} finally {
			setIsSaving(false);
		}
	};

	// Show loading skeleton while fetching data
	if (loading) {
		return <ProfileLoadingSkeleton type='account' />;
	}

	// Show empty state if no user data
	if (!user && !mockUserData) {
		return (
			<ProfileEmptyState
				title='No hay información disponible'
				description='No pudimos cargar tu información personal. Por favor inicia sesión de nuevo.'
				actionText='Iniciar sesión'
				actionLink='/login'
				icon={<AiOutlineInfoCircle size={40} />}
			/>
		);
	}

	// Use mock data for development, replace with user in production
	const userData = user || mockUserData;

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='w-full'>
				{/* Success notification */}
				<AnimatePresence>
					{success && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='mb-4 p-3 rounded-lg bg-success/10 border border-success/20 text-success flex items-center gap-2'>
							<AiOutlineCheck className='text-lg' />
							<span>{success}</span>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Error notification */}
				<AnimatePresence>
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='mb-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error flex items-center gap-2'>
							<AiOutlineClose className='text-lg' />
							<span>{error}</span>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Account Info Card */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden'>
					{/* Card Header */}
					<motion.div
						variants={itemVariants}
						className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-white/10 bg-gradient-to-r from-dark/20 to-transparent'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								{userData.avatar ? (
									<Image
										src={userData.avatar}
										alt={userData.name}
										width={64}
										height={64}
										className='rounded-full ring-2 ring-secondary/30'
									/>
								) : (
									<div className='w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center'>
										<FaUserCircle className='text-4xl text-secondary' />
									</div>
								)}

								{userData.verified && (
									<div className='absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1'>
										<AiOutlineCheck size={10} />
									</div>
								)}
							</div>

							<div>
								<h2 className='text-xl font-semibold text-light'>
									{userData.name}
								</h2>
								<p className='text-light/60 text-sm'>
									{userData.email}
								</p>
							</div>
						</div>

						{!isEditing ? (
							<motion.button
								variants={buttonVariants}
								whileHover='hover'
								whileTap='tap'
								onClick={() => setIsEditing(true)}
								className='px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-colors text-sm flex items-center gap-2'>
								<AiOutlineEdit size={16} />
								<span>Editar información</span>
							</motion.button>
						) : (
							<motion.button
								variants={buttonVariants}
								whileHover='hover'
								whileTap='tap'
								onClick={() => setIsEditing(false)}
								className='px-4 py-2 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded-lg transition-colors text-sm flex items-center gap-2'>
								<AiOutlineClose size={16} />
								<span>Cancelar</span>
							</motion.button>
						)}
					</motion.div>

					{/* Card Content */}
					<div className='p-6'>
						{!isEditing ? (
							<motion.div
								variants={containerVariants}
								className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<motion.div variants={itemVariants}>
									<div className='space-y-5'>
										<div className='flex items-start gap-3'>
											<div className='mt-0.5 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary'>
												<AiOutlineUser size={18} />
											</div>
											<div>
												<p className='text-light/50 text-sm'>
													Nombre completo
												</p>
												<p className='text-light font-medium mt-1'>
													{userData.name}
												</p>
											</div>
										</div>

										<div className='flex items-start gap-3'>
											<div className='mt-0.5 w-8 h-8 rounded-full bg-accent1/10 flex items-center justify-center text-accent1'>
												<AiOutlineMail size={18} />
											</div>
											<div>
												<p className='text-light/50 text-sm'>
													Correo electrónico
												</p>
												<p className='text-light font-medium mt-1'>
													{userData.email}
												</p>
											</div>
										</div>

										<div className='flex items-start gap-3'>
											<div className='mt-0.5 w-8 h-8 rounded-full bg-accent2/10 flex items-center justify-center text-accent2'>
												<AiOutlinePhone size={18} />
											</div>
											<div>
												<p className='text-light/50 text-sm'>
													Teléfono
												</p>
												<p className='text-light font-medium mt-1'>
													{userData.phone}
												</p>
											</div>
										</div>
									</div>
								</motion.div>

								<motion.div variants={itemVariants}>
									<div className='space-y-5'>
										<div className='flex items-start gap-3'>
											<div className='mt-0.5 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary'>
												<AiOutlineEnvironment
													size={18}
												/>
											</div>
											<div>
												<p className='text-light/50 text-sm'>
													Dirección de envío
												</p>
												<p className='text-light font-medium mt-1'>
													{userData.address}
												</p>
												<p className='text-light/60 text-sm'>
													{userData.city}, CP{' '}
													{userData.postalCode}
												</p>
												<p className='text-light/60 text-sm'>
													{userData.country}
												</p>
											</div>
										</div>

										<div className='flex items-start gap-3'>
											<div className='mt-0.5 w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success'>
												<AiOutlineCalendar size={18} />
											</div>
											<div>
												<p className='text-light/50 text-sm'>
													Miembro desde
												</p>
												<p className='text-light font-medium mt-1'>
													{userData.joinedDate}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							</motion.div>
						) : (
							<motion.form
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onSubmit={handleSubmit}>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-4'>
										<div>
											<label className='flex items-center gap-2 text-light/60 text-sm mb-1.5'>
												<AiOutlineUser className='text-primary' />
												Nombre completo
											</label>
											<input
												type='text'
												name='name'
												value={formData.name}
												onChange={handleInputChange}
												className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring focus:ring-secondary/20 text-light outline-none'
												placeholder='Tu nombre completo'
												required
											/>
										</div>

										<div>
											<label className='flex items-center gap-2 text-light/60 text-sm mb-1.5'>
												<AiOutlineMail className='text-accent1' />
												Correo electrónico
											</label>
											<input
												type='email'
												value={userData.email}
												className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-light/50 cursor-not-allowed'
												disabled
											/>
											<p className='text-xs text-light/40 mt-1'>
												El correo no puede ser
												modificado
											</p>
										</div>

										<div>
											<label className='flex items-center gap-2 text-light/60 text-sm mb-1.5'>
												<AiOutlinePhone className='text-accent2' />
												Teléfono
											</label>
											<input
												type='tel'
												name='phone'
												value={formData.phone}
												onChange={handleInputChange}
												className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring focus:ring-secondary/20 text-light outline-none'
												placeholder='Tu número telefónico'
											/>
										</div>
									</div>

									<div className='space-y-4'>
										<div>
											<label className='flex items-center gap-2 text-light/60 text-sm mb-1.5'>
												<AiOutlineEnvironment className='text-secondary' />
												Dirección
											</label>
											<input
												type='text'
												name='address'
												value={formData.address}
												onChange={handleInputChange}
												className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring focus:ring-secondary/20 text-light outline-none'
												placeholder='Tu dirección'
											/>
										</div>

										<div className='grid grid-cols-2 gap-3'>
											<div>
												<label className='text-light/60 text-sm mb-1.5 block'>
													Ciudad
												</label>
												<input
													type='text'
													name='city'
													value={formData.city}
													onChange={handleInputChange}
													className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring focus:ring-secondary/20 text-light outline-none'
													placeholder='Tu ciudad'
												/>
											</div>

											<div>
												<label className='text-light/60 text-sm mb-1.5 block'>
													Código postal
												</label>
												<input
													type='text'
													name='postalCode'
													value={formData.postalCode}
													onChange={handleInputChange}
													className='w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-secondary focus:ring focus:ring-secondary/20 text-light outline-none'
													placeholder='Código postal'
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Form Actions */}
								<div className='mt-8 flex justify-end'>
									<motion.button
										variants={buttonVariants}
										whileHover='hover'
										whileTap='tap'
										type='submit'
										disabled={isSaving}
										className='px-6 py-2.5 bg-gradient-to-r from-secondary to-accent1 hover:from-secondary/90 hover:to-accent1/90 text-white rounded-lg flex items-center gap-2 transition-all'>
										{isSaving ? (
											<>
												<AiOutlineLoading3Quarters className='animate-spin' />
												<span>Guardando...</span>
											</>
										) : (
											<>
												<AiOutlineSave />
												<span>Guardar cambios</span>
											</>
										)}
									</motion.button>
								</div>
							</motion.form>
						)}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default AccountInformation;
