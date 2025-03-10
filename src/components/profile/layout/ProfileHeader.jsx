'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	AiOutlineEdit,
	AiOutlineBell,
	AiOutlineSearch,
	AiOutlineSetting,
	AiOutlineUser,
} from 'react-icons/ai';

const ProfileHeader = ({
	user = {},
	pageTitle = 'Mi Perfil',
	notifications = 2,
	onSearch = () => {},
	onNotificationsClick = () => {},
	onNavigate = null,
}) => {
	const pathname = usePathname();
	const router = useRouter();

	// Animation variants
	const headerVariants = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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

	// Función para manejar los clicks en los enlaces con recarga completa
	const handleNavigation = (href) => (e) => {
		e.preventDefault();

		if (typeof onNavigate === 'function') {
			onNavigate(href);
		} else {
			router.push(href);
		}
	};

	return (
		<motion.header
			className='w-full bg-glass-dark backdrop-blur-md border-b border-white/10 sticky top-0 z-30'
			variants={headerVariants}
			initial='hidden'
			animate='visible'>
			<div className='px-4 sm:px-6 py-4'>
				<div className='flex items-center justify-between gap-4'>
					{/* Left side - Page Title (desktop) and Back button (mobile) */}
					<motion.div
						variants={itemVariants}
						className='flex items-center gap-3'>
						<a
							href='/profile'
							onClick={handleNavigation('/profile')}
							className='md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-light/70'>
							<AiOutlineUser size={16} />
						</a>

						<div>
							<h1 className='text-xl font-bold text-light hidden md:block'>
								{pageTitle}
							</h1>
							<h1 className='text-lg font-bold text-light md:hidden'>
								{pageTitle.length > 15
									? `${pageTitle.substring(0, 15)}...`
									: pageTitle}
							</h1>

							<div className='h-1 w-12 bg-gradient-to-r from-secondary to-accent1 rounded-full mt-1 hidden md:block'></div>
						</div>
					</motion.div>

					{/* Right side - User actions */}
					<motion.div
						variants={itemVariants}
						className='flex items-center gap-2 sm:gap-3'>
						{/* Search button */}
						<div className='hidden sm:block relative'>
							<div className='relative'>
								<input
									type='text'
									placeholder='Buscar...'
									className='w-40 lg:w-60 bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-light/90 placeholder:text-light/40 focus:outline-none focus:border-secondary/40 transition-all duration-300'
									onChange={(e) => onSearch(e.target.value)}
								/>
								<AiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50' />
							</div>
						</div>

						{/* Search button for mobile */}
						<button
							className='sm:hidden p-2 rounded-full bg-white/5 border border-white/10 text-light/70 hover:bg-white/10 hover:text-light transition-all duration-200'
							onClick={() => onSearch('')}
							aria-label='Search'>
							<AiOutlineSearch size={18} />
						</button>

						{/* Settings */}
						<a
							href='/profile/settings'
							onClick={handleNavigation('/profile/settings')}
							className='p-2 rounded-full bg-white/5 border border-white/10 text-light/70 hover:bg-white/10 hover:text-light transition-all duration-200'
							aria-label='Settings'>
							<AiOutlineSetting size={18} />
						</a>

						{/* Notifications */}
						<button
							className='p-2 rounded-full bg-white/5 border border-white/10 text-light/70 hover:bg-white/10 hover:text-light transition-all duration-200 relative'
							onClick={onNotificationsClick}
							aria-label='Notifications'>
							<AiOutlineBell size={18} />
							{notifications > 0 && (
								<span className='absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center text-[10px] font-bold bg-accent1 text-light rounded-full border border-dark'>
									{notifications > 9 ? '9+' : notifications}
								</span>
							)}
						</button>

						{/* User Profile */}
						<div className='hidden sm:flex items-center gap-3'>
							<div className='h-full w-px bg-white/10'></div>
							<div className='flex items-center gap-3'>
								<a
									href='/profile'
									onClick={handleNavigation('/profile')}
									className='relative group'>
									<div className='overflow-hidden w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent1 flex items-center justify-center text-light font-bold border border-white/10'>
										{user?.avatar ? (
											<img
												src={user.avatar}
												alt={
													user.name || 'User profile'
												}
												className='w-full h-full object-cover'
											/>
										) : (
											getInitials(user?.name || 'User')
										)}
									</div>
									<div className='absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100'>
										<AiOutlineEdit
											size={14}
											className='text-light'
										/>
									</div>
								</a>

								<div className='hidden lg:block'>
									<p className='text-sm font-medium text-light'>
										{user?.name
											? user.name.length > 16
												? `${user.name.substring(0, 16)}...`
												: user.name
											: 'Usuario'}
									</p>
									<p className='text-xs text-light/50'>
										Mi Cuenta
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Mobile search bar - expandable */}
			<motion.div variants={itemVariants} className='px-4 pb-3 sm:hidden'>
				<div className='relative'>
					<input
						type='text'
						placeholder='Buscar en mi cuenta...'
						className='w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-light/90 placeholder:text-light/40 focus:outline-none focus:border-secondary/30 transition-all duration-300'
						onChange={(e) => onSearch(e.target.value)}
					/>
					<AiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-light/50' />
				</div>
			</motion.div>
		</motion.header>
	);
};

export default ProfileHeader;
