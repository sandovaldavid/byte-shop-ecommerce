import { ProfileLayout } from '@/components';
import ClientPageWrapper from '@/components/profile/layout/ClientPageWrapper';

export const metadata = {
	title: 'Perfil | TechShop',
	description: 'Explora tu perfil de usuario',
};

export default function Profile({ children }) {
	return (
		<ProfileLayout>
			<ClientPageWrapper>{children}</ClientPageWrapper>
		</ProfileLayout>
	);
}
