'use client';
import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
	const pathname = usePathname();
	const isAuthPage = pathname?.startsWith('/auth');

	return (
		<div>
			{!isAuthPage && (
				<header>
					<Navbar />
				</header>
			)}
			<main className={!isAuthPage ? 'pt-16' : ''}>{children}</main>
			{!isAuthPage && <Footer />}
		</div>
	);
}

export default Layout;
