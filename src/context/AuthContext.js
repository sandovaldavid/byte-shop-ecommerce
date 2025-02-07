'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/api/authController';
import { account } from '@/lib/appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkUser();
	}, []);

	const checkUser = async () => {
		try {
			const session = await account.getSession('current');
			if (session) {
				const currentUser = await authApi.getCurrentUser();
				setUser(currentUser);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error('Error checking user:', error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			try {
				await authApi.logoutUser();
			} catch (error) {
				console.log('No había sesión activa para cerrar');
			}

			await authApi.loginUser(email, password);
			await checkUser();
		} catch (error) {
			console.error('Error en login:', error);
			throw error;
		}
	};

	const register = async (email, password, name) => {
		try {
			const user = await authApi.registerUser(email, password, name);
			await authApi.sendVerificationEmail(
				`${window.location.origin}/auth/verify`
			);
			return user;
		} catch (error) {
			console.error('Error en registro:', error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await authApi.logoutUser();
			setUser(null);
		} catch (error) {
			console.error('Error en logout:', error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, login, register, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
