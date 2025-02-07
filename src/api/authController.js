// src/api/auth.js
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

export const authApi = {
	registerUser: async (email, password, name) => {
		try {
			const user = await account.create(
				ID.unique(),
				email,
				password,
				name
			);
			return user;
		} catch (error) {
			console.error('Error en registro:', error);
			throw error;
		}
	},

	loginUser: async (email, password) => {
		try {
			const session = await account.createEmailPasswordSession(
				email,
				password
			);
			return session;
		} catch (error) {
			console.error('Error en login:', error);
			throw error;
		}
	},

	logoutUser: async () => {
		try {
			await account.deleteSession('current');
		} catch (error) {
			console.error('Error en logout:', error);
			throw error;
		}
	},

	getCurrentUser: async () => {
		try {
			const user = await account.get();
			return user;
		} catch (error) {
			console.error('Error obteniendo usuario:', error);
			return null;
		}
	},

	sendVerificationEmail: async (url) => {
		try {
			await account.createVerification(url);
		} catch (error) {
			console.error('Error enviando verificación:', error);
			throw error;
		}
	},

	confirmVerification: async (userId, secret) => {
		try {
			await account.updateVerification(userId, secret);
		} catch (error) {
			console.error('Error confirmando verificación:', error);
			throw error;
		}
	},

	sendPasswordRecovery: async (email, url) => {
		try {
			await account.createRecovery(email, url);
		} catch (error) {
			console.error('Error enviando recuperación:', error);
			throw error;
		}
	},

	confirmPasswordRecovery: async (userId, secret, password) => {
		try {
			await account.updateRecovery(userId, secret, password);
		} catch (error) {
			console.error('Error actualizando contraseña:', error);
			throw error;
		}
	},
};
