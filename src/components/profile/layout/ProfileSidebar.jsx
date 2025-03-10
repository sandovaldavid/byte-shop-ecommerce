'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	AiOutlineUser,
	AiOutlineShopping,
	AiOutlineHeart,
	AiOutlineEnvironment,
	AiOutlineWallet,
	AiOutlineBell,
	AiOutlineSetting,
	AiOutlineLogout,
} from 'react-icons/ai';

const navItems = [
	{
		icon: <AiOutlineUser />,
		label: 'Información Personal',
		href: '/profile',
		exact: true,
	},
	{
		icon: <AiOutlineShopping />,
		label: 'Mis Pedidos',
		href: '/profile/orders',
	},
	{
		icon: <AiOutlineHeart />,
		label: 'Lista de Deseos',
		href: '/profile/wishlist',
	},
	{
		icon: <AiOutlineEnvironment />,
		label: 'Direcciones',
		href: '/profile/addresses',
	},
	{
		icon: <AiOutlineWallet />,
		label: 'Métodos de Pago',
		href: '/profile/payments',
	},
	{
		icon: <AiOutlineBell />,
		label: 'Notificaciones',
		href: '/profile/notifications',
	},
	{
		icon: <AiOutlineSetting />,
		label: 'Configuración',
		href: '/profile/settings',
	},
];

const ProfileSidebar = ({
	user,
	className = '',
	onLogout = () => console.log('Logout clicked'),
	onClose = () => {},
	onNavigate = null,
}) => {
	const pathname = usePathname();
	const router = useRouter();

	// Check if nav item is active
	const isActive = (href) => {
		const item = navItems.find((item) => item.href === href);
		if (item?.exact) {
			return pathname === href;
		}
		return pathname?.startsWith(href);
	};

	// Get user initials for avatar fallback
	const getInitials = (name) => {
		return name
			? name
					.split(' ')
					.map((n) => n[0])
					.join('')
					.toUpperCase()
			: 'U';
	};

	// Función para manejar la navegación
	const handleNavigation = (path) => (e) => {
		e.preventDefault();
		if (typeof onClose === 'function') onClose();

		router.push(path);
	};

	// Animation variants
	const sidebarVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { staggerChildren: 0.05, duration: 0.4 },
		},
	};

	const itemVariants = {
		visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
	};

	return (
		<motion.aside
			className={`bg-glass-dark backdrop-blur-md border-r border-white/10 flex-shrink-0 z-40 ${className}`}
			variants={sidebarVariants}
			initial='hidden'
			animate='visible'>
			{/* User Profile Card */}
			<div className='p-6 border-b border-white/10'>
				<div className='flex flex-col sm:flex-row items-center gap-4 mb-4'>
					<div className='relative'>
						{user?.avatar ? (
							<img
								src={user.avatar}
								alt={user.name || 'User profile'}
								className='w-16 h-16 rounded-full border-2 border-secondary/70 shadow-lg shadow-secondary/10'
							/>
						) : (
							<div className='w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent1 flex items-center justify-center text-light font-bold text-xl shadow-lg shadow-accent1/20'>
								{getInitials(user?.name || 'User')}
							</div>
						)}

						<div className='absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-dark flex items-center justify-center'>
							<span className='sr-only'>Online</span>
						</div>
					</div>

					<div className='text-center sm:text-left'>
						<h2 className='font-medium text-lg text-light'>
							{user?.name || 'Usuario'}
						</h2>
						<p className='text-xs text-light/50'>
							{user?.email || 'usuario@email.com'}
						</p>

						{/* FIXED: Changed handleClick to handleNavigation */}
						<button
							className='mt-2 text-xs text-secondary hover:text-accent1 hover:underline transition-colors'
							onClick={handleNavigation('/profile/settings')}>
							Editar perfil
						</button>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-2 mt-4'>
					<div className='p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-center'>
						<p className='text-xl font-bold text-light'>
							{user?.stats?.orders || 0}
						</p>
						<p className='text-xs text-light/60'>Pedidos</p>
					</div>
					<div className='p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-center'>
						<p className='text-xl font-bold text-light'>
							{user?.stats?.wishlist || 0}
						</p>
						<p className='text-xs text-light/60'>Favoritos</p>
					</div>
					<div className='p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-center'>
						<p className='text-xl font-bold text-light'>
							{user?.stats?.reviews || 0}
						</p>
						<p className='text-xs text-light/60'>Reseñas</p>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<div className='py-4 overflow-y-auto scrollbar-none'>
				<nav>
					<ul className='space-y-1 px-3'>
						{navItems.map((item) => (
							<motion.li key={item.href} variants={itemVariants}>
								<a
									href={item.href}
									onClick={handleNavigation(item.href)}
									className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
										${
											isActive(item.href)
												? 'bg-gradient-to-r from-secondary/10 to-accent1/5 text-secondary font-medium border-l-2 border-secondary'
												: 'text-light/70 hover:bg-white/5 hover:text-light border-l-2 border-transparent'
										}`}>
									<span
										className={`text-xl ${isActive(item.href) ? 'text-secondary' : 'text-light/60'}`}>
										{item.icon}
									</span>
									<span>{item.label}</span>

									{/* Active indicator dot */}
									{isActive(item.href) && (
										<motion.div
											className='ml-auto w-2 h-2 rounded-full bg-secondary'
											layoutId='activeDot'
											transition={{
												type: 'spring',
												duration: 0.5,
											}}
										/>
									)}
								</a>
							</motion.li>
						))}
					</ul>
				</nav>

				<div className='mt-8 px-6'>
					<div className='h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6'></div>

					<motion.button
						className='w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-white/5 hover:bg-error/10 text-light/70 hover:text-error border border-white/5 hover:border-error/30'
						variants={itemVariants}
						onClick={onLogout}>
						<AiOutlineLogout className='text-xl' />
						<span>Cerrar Sesión</span>
					</motion.button>
				</div>
			</div>

			{/* Upgrade card */}
			<div className='px-6 py-4 mt-4'>
				<div className='relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/20 to-accent2/20 p-4 border border-white/10'>
					<div className='absolute -top-12 -right-12 w-24 h-24 rounded-full bg-accent1/10 blur-xl'></div>
					<div className='absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-secondary/10 blur-lg'></div>

					<h3 className='text-sm font-medium text-light mb-2'>
						¿Necesitas ayuda?
					</h3>
					<p className='text-xs text-light/70 mb-4'>
						Nuestro equipo de soporte está listo para asistirte.
					</p>

					{/* FIXED: Changed handleClick to handleNavigation */}
					<a
						href='/support'
						onClick={handleNavigation('/support')}
						className='inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-white/10 text-light hover:bg-white/20 transition-all duration-200'>
						Contactar Soporte
					</a>
				</div>
			</div>
		</motion.aside>
	);
};

export default ProfileSidebar;
