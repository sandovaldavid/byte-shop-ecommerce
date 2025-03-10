import React from 'react';
import { motion } from 'framer-motion';
import {
	AiOutlineCreditCard,
	AiOutlineBank,
	AiOutlineWallet,
	AiOutlineQuestionCircle,
} from 'react-icons/ai';
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcAmex,
	FaCcDiscover,
} from 'react-icons/fa';

const CardTypeSelector = ({
	value = 'credit_card',
	onChange = () => {},
	error = '',
	disabled = false,
	options = [
		{ id: 'credit_card', label: 'Tarjeta de crédito' },
		{ id: 'debit_card', label: 'Tarjeta de débito' },
	],
	className = '',
}) => {
	// Obtener icono correspondiente al tipo de tarjeta
	const getOptionIcon = (optionId) => {
		switch (optionId) {
			case 'credit_card':
				return <AiOutlineCreditCard className='text-xl' />;
			case 'debit_card':
				return <AiOutlineBank className='text-xl' />; // Cambiado de AiOutlineBankCard a AiOutlineBank
			case 'paypal':
				return <AiOutlineWallet className='text-xl' />;
			default:
				return <AiOutlineQuestionCircle className='text-xl' />;
		}
	};

	// El resto del componente permanece igual

	// Obtener gradiente según tipo seleccionado
	const getSelectedGradient = (optionId) => {
		switch (optionId) {
			case 'credit_card':
				return 'from-primary/20 to-secondary/20 border-primary/30';
			case 'debit_card':
				return 'from-secondary/20 to-accent1/20 border-secondary/30';
			case 'paypal':
				return 'from-accent1/20 to-accent2/20 border-accent1/30';
			default:
				return 'from-gray/20 to-white/10 border-white/20';
		}
	};

	// Animación para los elementos seleccionables
	const optionVariants = {
		initial: { scale: 0.95, opacity: 0 },
		animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
		hover: { scale: 1.02, transition: { duration: 0.2 } },
		tap: { scale: 0.98, transition: { duration: 0.1 } },
	};

	// Iconos de marcas de tarjeta para mostrar como decoración
	const brandIcons = [
		<FaCcVisa key='visa' className='text-[#1434CB] opacity-60' />,
		<FaCcMastercard
			key='mastercard'
			className='text-[#EB001B] opacity-60'
		/>,
		<FaCcAmex key='amex' className='text-[#2E77BC] opacity-60' />,
		<FaCcDiscover key='discover' className='text-[#FF6000] opacity-60' />,
	];

	return (
		<div className={`w-full ${className}`}>
			<label className='block text-sm font-medium text-light/70 mb-2'>
				Tipo de tarjeta
			</label>

			<div className='relative'>
				{/* Selector de tipo de tarjeta */}
				<div className='flex flex-wrap gap-3'>
					{options.map((option) => (
						<motion.label
							key={option.id}
							variants={optionVariants}
							initial='initial'
							animate='animate'
							whileHover='hover'
							whileTap='tap'
							className={`
                relative flex items-center gap-2.5 py-3 px-4 rounded-xl cursor-pointer
                border backdrop-blur-sm transition-all duration-300
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                ${
					value === option.id
						? `bg-gradient-to-br ${getSelectedGradient(option.id)} shadow-sm`
						: 'bg-white/5 border-white/10 hover:bg-white/10'
				}
              `}>
							<input
								type='radio'
								name='cardType'
								value={option.id}
								checked={value === option.id}
								onChange={() => onChange(option.id)}
								disabled={disabled}
								className='sr-only'
								aria-label={`Seleccionar ${option.label}`}
							/>

							<div
								className={`
                  flex items-center justify-center h-8 w-8 rounded-full transition-colors duration-300
                  ${value === option.id ? 'bg-white/10' : 'bg-white/5'}
                `}>
								{getOptionIcon(option.id)}
							</div>

							<span className='text-sm font-medium text-light'>
								{option.label}
							</span>

							{/* Indicador de selección */}
							{value === option.id && (
								<motion.div
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className='absolute top-2 right-2 h-2 w-2 bg-primary rounded-full'
								/>
							)}
						</motion.label>
					))}
				</div>

				{/* Mensaje de error si existe */}
				{error && (
					<motion.p
						initial={{ opacity: 0, y: -5 }}
						animate={{ opacity: 1, y: 0 }}
						className='text-error text-xs mt-1.5 flex items-start gap-1.5'>
						<span className='flex-shrink-0 mt-0.5'>⚠️</span>
						{error}
					</motion.p>
				)}

				{/* Decoración con iconos de tarjetas */}
				<div className='mt-2 flex flex-wrap gap-2 items-center'>
					<span className='text-xs text-light/40'>Aceptamos:</span>
					<div className='flex space-x-1.5'>
						{brandIcons.map((icon, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 5 }}
								animate={{
									opacity: 0.7,
									y: 0,
									transition: { delay: 0.3 + index * 0.1 },
								}}
								whileHover={{ opacity: 1, scale: 1.1 }}
								className='text-lg'>
								{icon}
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardTypeSelector;
