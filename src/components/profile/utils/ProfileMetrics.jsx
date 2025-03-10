import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	AiOutlineShoppingCart,
	AiOutlineHeart,
	AiOutlineStar,
	AiOutlineArrowRight,
} from 'react-icons/ai';

const ProfileMetrics = ({
	stats = {
		orders: 0,
		wishlist: 0,
		reviews: 0,
	},
	animated = true,
}) => {
	// Metrics data configuration
	const metrics = [
		{
			title: 'Pedidos',
			value: stats.orders,
			icon: <AiOutlineShoppingCart className='text-xl md:text-2xl' />,
			href: '/profile/orders',
			gradient: 'from-secondary to-primary',
			description: 'Ver historial',
		},
		{
			title: 'Favoritos',
			value: stats.wishlist,
			icon: <AiOutlineHeart className='text-xl md:text-2xl' />,
			href: '/profile/wishlist',
			gradient: 'from-accent1 to-accent2',
			description: 'Ver lista',
		},
		{
			title: 'Reseñas',
			value: stats.reviews,
			icon: <AiOutlineStar className='text-xl md:text-2xl' />,
			href: '/profile/reviews',
			gradient: 'from-accent2 to-secondary',
			description: 'Ver reseñas',
		},
	];

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
	};

	const Card = ({ metric, index }) => {
		return (
			<motion.div
				variants={animated ? itemVariants : {}}
				whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
				className='flex-1 bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-dark/5 group hover:border-white/20 transition-all duration-300'>
				<Link href={metric.href} className='block h-full'>
					<div className='p-4 sm:p-5 flex flex-col'>
						{/* Card Header with Icon and Value */}
						<div className='flex justify-between items-center mb-3'>
							<div
								className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${metric.gradient} text-light shadow-lg`}>
								{metric.icon}
							</div>
							<span className='text-2xl md:text-3xl font-bold text-light'>
								{metric.value}
							</span>
						</div>

						{/* Card Title */}
						<h3 className='text-sm md:text-base font-medium text-light mb-1'>
							{metric.title}
						</h3>

						{/* Decorative Line */}
						<div
							className={`h-0.5 w-12 bg-gradient-to-r ${metric.gradient} rounded-full my-2 transition-all duration-300 group-hover:w-full`}></div>

						{/* Card Footer */}
						<div className='mt-auto pt-2 flex items-center justify-between text-light/60 text-xs md:text-sm'>
							<span>{metric.description}</span>
							<AiOutlineArrowRight className='transform group-hover:translate-x-1 transition-transform duration-300' />
						</div>
					</div>
				</Link>
			</motion.div>
		);
	};

	return (
		<motion.div
			variants={animated ? containerVariants : {}}
			initial={animated ? 'hidden' : undefined}
			animate={animated ? 'visible' : undefined}
			className='w-full'>
			<div className='flex flex-col sm:flex-row gap-4 w-full'>
				{metrics.map((metric, index) => (
					<Card key={metric.title} metric={metric} index={index} />
				))}
			</div>
		</motion.div>
	);
};

export default ProfileMetrics;
