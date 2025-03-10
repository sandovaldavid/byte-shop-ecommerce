'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Hook para acceder al contexto de tema
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
	}
	return context;
};

// Proveedor del tema
export function ThemeProvider({ children }) {
	// Estado para el tema actual ('light', 'dark', o 'system')
	const [theme, setTheme] = useState('system');
	// Estado para saber si el DOM está cargado (para evitar problemas de hidratación)
	const [mounted, setMounted] = useState(false);
	// Estado para saber el tema que se está mostrando actualmente basado en la preferencia del sistema
	const [resolvedTheme, setResolvedTheme] = useState('light');

	// Detectar preferencia del sistema y configurar tema inicial
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem('theme') || 'system';
		setTheme(savedTheme);

		// Aplicar tema inicial
		applyTheme(savedTheme);

		// Configurar observador para cambios en la preferencia del sistema
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (theme === 'system') {
				applyTheme('system');
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Actualizar el tema resuelto cuando cambie el tema o la preferencia del sistema
	useEffect(() => {
		if (mounted) {
			applyTheme(theme);
		}
	}, [theme, mounted]);

	// Cambiar el tema
	const setThemeValue = (newTheme) => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	};

	// Aplicar el tema en el DOM
	const applyTheme = (currentTheme) => {
		const root = document.documentElement;
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;

		let activeTheme;
		if (currentTheme === 'system') {
			activeTheme = prefersDark ? 'dark' : 'light';
		} else {
			activeTheme = currentTheme;
		}

		setResolvedTheme(activeTheme);

		if (activeTheme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	};

	// Alternar entre temas
	const toggleTheme = () => {
		if (
			theme === 'dark' ||
			(theme === 'system' && resolvedTheme === 'dark')
		) {
			setThemeValue('light');
		} else {
			setThemeValue('dark');
		}
	};

	// No renderizar nada hasta que el componente esté montado para evitar problemas de hidratación
	if (!mounted) {
		return <>{children}</>;
	}

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme: setThemeValue,
				resolvedTheme,
				toggleTheme,
				isDark: resolvedTheme === 'dark',
			}}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContext;
