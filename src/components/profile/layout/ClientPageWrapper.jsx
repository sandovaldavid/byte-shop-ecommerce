'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, memo } from 'react';

const ClientPageWrapper = ({ children }) => {
	const pathname = usePathname();
	const [key, setKey] = useState(pathname);

	// Forzar re-renderizado cuando cambia la ruta
	useEffect(() => {
		// Pequeño retraso para asegurar que el cambio de ruta se complete
		const timer = setTimeout(() => {
			setKey(pathname + Date.now()); // Asegura un key único cada vez
		}, 10);

		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<div key={key} >
			{children}
		</div>
	);
};

export default memo(ClientPageWrapper);
