'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/api/authController';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkUser();
	}, []);

	const checkUser = async () => {
		try {
			const currentUser = await authApi.getCurrentUser();
			setUser(currentUser);
		} catch (error) {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		try {
			await authApi.loginUser(email, password);
			await checkUser();
		} catch (error) {
			throw error;
		}
	};

	const register = async (email, password, name) => {
		try {
			await authApi.registerUser(email, password, name);
			await login(email, password);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await authApi.logoutUser();
			setUser(null);
		} catch (error) {
			console.error('Error logging out:', error);
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
