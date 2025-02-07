import { Client, Account, ID } from 'appwrite';

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const checkConnection = async () => {
	try {
		await account.get();
		return true;
	} catch (error) {
		if (error.code === 401) {
			return true;
		}
		console.error('Error de conexión:', error);
		return false;
	}
};
