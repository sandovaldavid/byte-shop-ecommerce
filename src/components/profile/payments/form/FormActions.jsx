import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineSave,
	AiOutlineLoading3Quarters,
	AiOutlineCheck,
	AiOutlineClose,
} from 'react-icons/ai';

const FormActions = ({
	onCancel,
	isSubmitting = false,
	animateSuccess = false,
	showCancelButton = true,
	saveLabel = 'Guardar',
	cancelLabel = 'Cancelar',
	isEditMode = false,
	className = '',
}) => {
	// Variantes para las animaciones de los botones
	const buttonVariants = {
		hover: {
			scale: 1.02,
			transition: { duration: 0.2 },
		},
		tap: {
			scale: 0.98,
			transition: { duration: 0.1 },
		},
		success: {
			backgroundColor: ['rgba(10,214,112,1)', 'rgba(10,214,112,0.8)'],
			transition: { duration: 1.5 },
		},
	};

	// Estado de carga y variantes para los iconos
	const iconVariants = {
		initial: { opacity: 0, scale: 0 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', damping: 10 },
		},
		exit: {
			opacity: 0,
			scale: 0,
			transition: { duration: 0.2 },
		},
	};

	return (
		<div
			className={`mt-6 flex flex-col sm:flex-row gap-3 justify-end ${className}`}>
			{/* Botón para cancelar - Solo muestra si showCancelButton es true */}
			<AnimatePresence>
				{showCancelButton && (
					<motion.button
						type='button'
						onClick={onCancel}
						className='order-2 sm:order-1 px-5 py-2.5 rounded-lg border border-white/10 
                      bg-white/5 text-light/70 hover:bg-white/10 hover:text-light 
                      transition-colors text-sm font-medium focus:outline-none 
                      focus:ring-2 focus:ring-white/20'
						disabled={isSubmitting}
						variants={buttonVariants}
						whileHover='hover'
						whileTap='tap'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}>
						<div className='flex items-center justify-center gap-2'>
							<AiOutlineClose className='text-lg' />
							<span>{cancelLabel}</span>
						</div>
					</motion.button>
				)}
			</AnimatePresence>

			{/* Botón de guardar/enviar */}
			<motion.button
				type='submit'
				disabled={isSubmitting}
				className={`
          order-1 sm:order-2 px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 
          text-sm font-medium shadow-sm transition-all min-w-[140px]
          ${
				isSubmitting
					? 'bg-primary/50 text-white/70 cursor-not-allowed'
					: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20'
			}
        `}
				variants={buttonVariants}
				whileHover={!isSubmitting && !animateSuccess ? 'hover' : ''}
				whileTap={!isSubmitting && !animateSuccess ? 'tap' : ''}
				animate={animateSuccess ? 'success' : {}}>
				<AnimatePresence mode='wait'>
					{isSubmitting ? (
						<motion.div
							key='loading'
							variants={iconVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							className='animate-spin text-xl'>
							<AiOutlineLoading3Quarters />
						</motion.div>
					) : animateSuccess ? (
						<motion.div
							key='success'
							variants={iconVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							className='text-xl'>
							<AiOutlineCheck />
						</motion.div>
					) : (
						<motion.div
							key='normal'
							variants={iconVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							className='flex items-center gap-2'>
							<AiOutlineSave className='text-lg' />
							<span>{isEditMode ? 'Actualizar' : saveLabel}</span>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</div>
	);
};

export default FormActions;
