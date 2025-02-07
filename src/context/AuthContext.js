'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkUser();
	}, []);

	const checkUser = async () => {
		try {
			const session = await account.get();
			setUser(session);
		} catch (error) {
			setUser(null);
		}
		setLoading(false);
	};

	const login = async (email, password) => {
		try {
			await account.createEmailPasswordSession(email, password);
			await checkUser();
		} catch (error) {
			throw error;
		}
	};

	const register = async (email, password, name) => {
		try {
			await account.create(ID.unique(), email, password, name);
			await login(email, password);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			await account.deleteSession('current');
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
