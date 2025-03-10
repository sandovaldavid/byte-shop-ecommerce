import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AiOutlinePlus, AiOutlineInfoCircle } from 'react-icons/ai';

const ProfileEmptyState = ({
	title = 'No hay contenido disponible',
	description = 'Aún no tienes ningún elemento en esta sección',
	icon = null,
	actionText = 'Agregar nuevo',
	actionLink = '#',
	secondaryText = null,
	secondaryLink = null,
	onActionClick = null,
	isLoading = false,
	customIcon = null,
	animated = true,
}) => {
	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	};

	// Determine which icon to display
	const getIcon = () => {
		if (customIcon) return customIcon;

		if (icon) return icon;

		return (
			<div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10 shadow-lg'>
				<AiOutlineInfoCircle className='text-3xl md:text-4xl text-light/40' />
			</div>
		);
	};

	// Render action button or link
	const renderAction = () => {
		const buttonClasses =
			'px-5 py-2.5 flex items-center gap-2 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-secondary/20 font-medium text-sm md:text-base';

		if (onActionClick) {
			return (
				<motion.button
					variants={animated ? itemVariants : {}}
					onClick={onActionClick}
					disabled={isLoading}
					className={buttonClasses}>
					<AiOutlinePlus />
					<span>{actionText}</span>
				</motion.button>
			);
		}

		return (
			<Link href={actionLink}>
				<motion.a
					variants={animated ? itemVariants : {}}
					className={buttonClasses}>
					<AiOutlinePlus />
					<span>{actionText}</span>
				</motion.a>
			</Link>
		);
	};

	return (
		<motion.div
			variants={animated ? containerVariants : {}}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}
			className='w-full p-6 sm:p-10 flex flex-col items-center justify-center text-center'>
			{/* Top background gradient */}
			<motion.div
				variants={animated ? itemVariants : {}}
				className='absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-48 -z-10 opacity-20'>
				<div className='w-full h-full bg-gradient-to-b from-secondary/10 via-accent1/5 to-transparent rounded-full blur-3xl'></div>
			</motion.div>

			{/* Icon */}
			<motion.div variants={animated ? itemVariants : {}}>
				{getIcon()}
			</motion.div>

			{/* Title */}
			<motion.h3
				variants={animated ? itemVariants : {}}
				className='text-xl md:text-2xl font-semibold text-light mb-2'>
				{title}
			</motion.h3>

			{/* Description */}
			<motion.p
				variants={animated ? itemVariants : {}}
				className='text-light/60 mb-6 max-w-md text-sm md:text-base'>
				{description}
			</motion.p>

			{/* Actions */}
			<motion.div
				variants={animated ? itemVariants : {}}
				className='flex flex-col sm:flex-row items-center gap-4'>
				{renderAction()}

				{/* Secondary action */}
				{secondaryText && secondaryLink && (
					<Link href={secondaryLink}>
						<motion.a
							variants={animated ? itemVariants : {}}
							className='text-accent1 hover:text-secondary underline underline-offset-4 transition-colors text-sm md:text-base'>
							{secondaryText}
						</motion.a>
					</Link>
				)}
			</motion.div>

			{/* Bottom decorative element */}
			<motion.div
				variants={animated ? itemVariants : {}}
				className='mt-10 w-16 h-1 bg-gradient-to-r from-secondary/50 to-accent1/50 rounded-full'></motion.div>
		</motion.div>
	);
};

export default ProfileEmptyState;
