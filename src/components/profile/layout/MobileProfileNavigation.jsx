'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
	AiOutlineUser,
	AiOutlineShopping,
	AiOutlineHeart,
	AiOutlineEnvironment,
	AiOutlineWallet,
	AiOutlineBell,
	AiOutlineSetting,
	AiOutlineLogout,
	AiOutlineMenu,
} from 'react-icons/ai';

const navItems = [
	{ icon: <AiOutlineUser />, label: 'Perfil', path: '/profile', exact: true },
	{ icon: <AiOutlineShopping />, label: 'Pedidos', path: '/profile/orders' },
	{ icon: <AiOutlineHeart />, label: 'Favoritos', path: '/profile/wishlist' },
	{
		icon: <AiOutlineEnvironment />,
		label: 'Direcciones',
		path: '/profile/addresses',
	},
	{ icon: <AiOutlineWallet />, label: 'Pagos', path: '/profile/payments' },
	{
		icon: <AiOutlineBell />,
		label: 'Alertas',
		path: '/profile/notifications',
	},
	{ icon: <AiOutlineSetting />, label: 'Ajustes', path: '/profile/settings' },
];

// Main items that will always be visible (limited to 4)
const mainNavItems = navItems.slice(0, 4);
// Additional items that will be shown in expanded view
const extraNavItems = navItems.slice(4);

const MobileProfileNavigation = ({
	onLogout = () => console.log('Logout clicked'),
	onNavigate = null,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);

	const isActive = (path) => {
		const item = navItems.find((item) => item.path === path);
		if (item?.exact) {
			return pathname === path;
		}
		return pathname?.startsWith(path);
	};

	// Manejar navegación programática
	const handleNavigation = (path) => (e) => {
		e.preventDefault();
		setIsExpanded(false);

		// Usa onNavigate si existe
		if (typeof onNavigate === 'function') {
			onNavigate(path);
		} else {
			router.push(path);
		}
	};

	// Animation variants
	const expandButtonVariants = {
		initial: { y: 0 },
		expanded: { y: -10 },
	};

	const expandedMenuVariants = {
		hidden: { height: 0, opacity: 0 },
		visible: {
			height: 'auto',
			opacity: 1,
			transition: {
				height: {
					duration: 0.3,
					ease: 'easeInOut',
				},
				opacity: {
					duration: 0.2,
					delay: 0.1,
				},
			},
		},
		exit: {
			height: 0,
			opacity: 0,
			transition: {
				height: {
					duration: 0.3,
					ease: 'easeInOut',
				},
				opacity: {
					duration: 0.1,
				},
			},
		},
	};

	const iconVariants = {
		normal: { scale: 1 },
		active: { scale: 1.1 },
	};

	return (
		<>
			{/* Extra items menu that appears when expanded */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						className='fixed bottom-16 left-0 right-0 z-[60] bg-glass-dark backdrop-blur-lg border-t border-white/10 shadow-lg shadow-dark/20'
						variants={expandedMenuVariants}
						initial='hidden'
						animate='visible'
						exit='exit'>
						<div className='p-3 grid grid-cols-3 gap-1'>
							{extraNavItems.map((item) => (
								<a
									key={item.path}
									href={item.path}
									onClick={handleNavigation(item.path)}
									className={`flex flex-col items-center justify-center p-3 rounded-xl ${
										isActive(item.path)
											? 'bg-white/10 text-secondary'
											: 'text-light/60 hover:bg-white/5 hover:text-light/80'
									} transition-all duration-200`}>
									<motion.div
										variants={iconVariants}
										animate={
											isActive(item.path)
												? 'active'
												: 'normal'
										}
										className='text-xl mb-1'>
										{item.icon}
									</motion.div>
									<span className='text-xs'>
										{item.label}
									</span>
								</a>
							))}

							{/* Logout button */}
							<button
								onClick={() => {
									setIsExpanded(false);
									onLogout();
								}}
								className='flex flex-col items-center justify-center p-3 rounded-xl text-light/60 hover:bg-error/10 hover:text-error transition-all duration-200'>
								<motion.div
									whileTap={{ scale: 0.95 }}
									className='text-xl mb-1'>
									<AiOutlineLogout />
								</motion.div>
								<span className='text-xs'>Salir</span>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main fixed bottom navigation */}
			<div className='fixed bottom-0 left-0 right-0 h-16 bg-glass-dark backdrop-blur-lg border-t border-white/10 z-[50] md:hidden shadow-lg shadow-dark/10'>
				<div className='h-full grid grid-cols-5 items-center'>
					{mainNavItems.map((item) => (
						<a
							key={item.path}
							href={item.path}
							onClick={handleNavigation(item.path)}
							className={`h-full flex flex-col items-center justify-center ${
								isActive(item.path)
									? 'text-secondary'
									: 'text-light/50 hover:text-light/80'
							} transition-colors duration-200`}>
							<motion.div
								variants={iconVariants}
								animate={
									isActive(item.path) ? 'active' : 'normal'
								}
								className='text-xl mb-0.5'>
								{item.icon}
							</motion.div>
							<span className='text-[10px]'>{item.label}</span>

							{/* Active indicator */}
							{isActive(item.path) && (
								<motion.div
									layoutId='activeIndicator'
									className='absolute bottom-0 w-8 h-1 rounded-t-full bg-gradient-to-r from-secondary to-accent1'
									transition={{
										type: 'spring',
										duration: 0.5,
									}}
								/>
							)}
						</a>
					))}

					{/* Expand button for additional options */}
					<button
						onClick={() => setIsExpanded(!isExpanded)}
						className={`h-full w-full flex flex-col items-center justify-center ${
							isExpanded ? 'text-accent1' : 'text-light/50'
						} transition-colors duration-200`}
						aria-label={
							isExpanded ? 'Cerrar menú' : 'Abrir más opciones'
						}>
						<motion.div
							animate={isExpanded ? 'expanded' : 'initial'}
							variants={expandButtonVariants}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 15,
							}}
							className='flex flex-col items-center'>
							<AiOutlineMenu
								className={`text-xl mb-0.5 ${isExpanded ? 'rotate-45' : ''} transition-transform duration-300`}
							/>
							<span className='text-[10px]'>
								{isExpanded ? 'Cerrar' : 'Más'}
							</span>
						</motion.div>
					</button>
				</div>
			</div>

			{/* Safe area spacing for iOS devices */}
			<div className='h-16 md:hidden'></div>
		</>
	);
};

export default MobileProfileNavigation;
