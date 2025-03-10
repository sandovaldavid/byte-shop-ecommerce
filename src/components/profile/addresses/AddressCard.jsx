'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineStar,
	AiFillStar,
	AiOutlineCheck,
	AiOutlineHome,
	AiOutlineEnvironment,
	AiOutlineCreditCard,
} from 'react-icons/ai';

const AddressCard = ({
	address,
	isDefault = false,
	type = 'shipping', // 'shipping' or 'billing'
	onEdit = () => {},
	onDelete = () => {},
	onSetDefault = () => {},
}) => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	// Handle deletion confirmation
	const handleDeleteClick = () => {
		if (isDefault) return; // Don't allow deleting default address
		setShowConfirmDelete(true);
	};

	const confirmDelete = () => {
		setShowConfirmDelete(false);
		onDelete(address.id);
	};

	const cancelDelete = () => {
		setShowConfirmDelete(false);
	};

	return (
		<motion.div
			className='relative bg-glass-dark backdrop-blur-md border border-glass-border-dark rounded-2xl overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Default indicator */}
			{isDefault && (
				<div className='absolute top-0 right-0'>
					<div className='bg-gradient-to-r from-secondary to-accent1 text-light text-xs font-medium py-1 px-4 rounded-bl-lg shadow-sm flex items-center gap-1'>
						<AiOutlineCheck className='text-light' />
						<span>
							{type === 'shipping'
								? 'Envío predeterminado'
								: 'Facturación predeterminada'}
						</span>
					</div>
				</div>
			)}

			{/* Type indicator */}
			<div
				className={`absolute top-0 left-0 w-1 h-full ${type === 'shipping' ? 'bg-secondary' : 'bg-accent1'}`}></div>

			<div className='p-5 sm:p-6'>
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-5 items-start'>
					{/* Address icon */}
					<div
						className={`w-10 h-10 rounded-full flex-shrink-0 ${type === 'shipping' ? 'bg-secondary/20' : 'bg-accent1/20'} flex items-center justify-center`}>
						{type === 'shipping' ? (
							<AiOutlineHome
								className={`text-xl ${type === 'shipping' ? 'text-secondary' : 'text-accent1'}`}
							/>
						) : (
							<AiOutlineCreditCard
								className={`text-xl ${type === 'shipping' ? 'text-secondary' : 'text-accent1'}`}
							/>
						)}
					</div>

					{/* Address details */}
					<div className='flex-1'>
						<div className='flex justify-between items-start'>
							<div>
								<h3 className='font-medium text-light flex items-center gap-2'>
									{address.alias || 'Dirección'}
									{isDefault && (
										<AiFillStar className='text-secondary text-sm' />
									)}
								</h3>
								<p className='text-light/60 text-sm mt-0.5'>
									{address.name}
								</p>
							</div>
						</div>

						<div className='mt-3 text-light/80 text-sm space-y-1'>
							<p>{address.street}</p>
							{address.additionalInfo && (
								<p>{address.additionalInfo}</p>
							)}
							<p>
								{address.city}, {address.state}{' '}
								{address.postalCode}
							</p>
							<p>{address.country}</p>
							{address.phone && (
								<p className='mt-2 flex items-center gap-2 text-light/70'>
									<span>📞</span> {address.phone}
								</p>
							)}
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className='mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3'>
					<div className='flex items-center gap-2'>
						<div className='flex items-center gap-1 text-xs text-light/50'>
							<AiOutlineEnvironment className='text-secondary' />
							<span>
								{type === 'shipping' ? 'Envío' : 'Facturación'}
							</span>
						</div>

						{address.instructions && (
							<div className='max-w-xs'>
								<p
									className='text-xs text-light/50 truncate'
									title={address.instructions}>
									📝 {address.instructions}
								</p>
							</div>
						)}
					</div>

					<div className='flex items-center gap-2'>
						{!isDefault && (
							<button
								onClick={() => onSetDefault(address.id)}
								className='flex items-center gap-1 py-1.5 px-3 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-light/70 hover:text-secondary transition-all border border-transparent hover:border-secondary/30'
								title='Establecer como predeterminada'>
								<AiOutlineStar className='text-sm' />
								<span>Predeterminada</span>
							</button>
						)}

						<button
							onClick={() => onEdit(address.id)}
							className='p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-light/70 hover:text-secondary transition-all border border-transparent hover:border-secondary/30'
							title='Editar dirección'>
							<AiOutlineEdit className='text-lg' />
						</button>

						{!isDefault && (
							<button
								onClick={handleDeleteClick}
								className='p-1.5 rounded-lg bg-white/5 hover:bg-error/10 text-light/70 hover:text-error transition-all border border-transparent hover:border-error/30'
								title='Eliminar dirección'
								disabled={isDefault}>
								<AiOutlineDelete className='text-lg' />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Delete Confirmation */}
			{showConfirmDelete && (
				<div className='absolute inset-0 bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4 z-10'>
					<div className='bg-glass-dark w-full max-w-xs p-5 rounded-xl border border-glass-border-dark shadow-glass-dark text-center'>
						<div className='w-12 h-12 mx-auto rounded-full bg-error/20 flex items-center justify-center mb-4'>
							<AiOutlineDelete className='text-error text-xl' />
						</div>

						<h3 className='text-light font-medium mb-2'>
							¿Eliminar esta dirección?
						</h3>
						<p className='text-light/60 text-sm mb-5'>
							Esta acción no se puede deshacer.
						</p>

						<div className='flex gap-3 justify-center'>
							<button
								onClick={cancelDelete}
								className='px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-light/70 hover:text-light text-sm transition-all border border-white/10'>
								Cancelar
							</button>
							<button
								onClick={confirmDelete}
								className='px-4 py-2 rounded-lg bg-error/20 hover:bg-error/30 text-error text-sm transition-all'>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Hover effect overlay */}
			<div
				className={`absolute inset-0 bg-secondary/5 opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
			/>
		</motion.div>
	);
};

export default AddressCard;
