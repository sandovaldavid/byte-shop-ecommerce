/**
 * Implementación del algoritmo de Luhn (Mod 10) para validar números de tarjetas de crédito
 * @param {string} cardNumber - Número de tarjeta (puede incluir espacios)
 * @returns {boolean} - True si el número es válido según el algoritmo de Luhn
 */
export function luhnCheck(cardNumber) {
	// Eliminar espacios y caracteres no numéricos
	const digits = cardNumber.replace(/\D/g, '');

	if (digits.length < 12) return false; // La tarjeta es muy corta

	let sum = 0;
	let shouldDouble = false;

	// Iterar de derecha a izquierda
	for (let i = digits.length - 1; i >= 0; i--) {
		let digit = parseInt(digits.charAt(i), 10);

		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	return sum % 10 === 0;
}

/**
 * Detecta la marca de la tarjeta basada en su número
 * @param {string} cardNumber - Número de tarjeta (puede incluir espacios)
 * @returns {string} - Nombre de la marca de tarjeta ('visa', 'mastercard', 'amex', 'discover', '')
 */
export function detectCardBrand(cardNumber) {
	// Eliminar espacios y caracteres no numéricos
	const digits = cardNumber.replace(/\D/g, '');

	// Visa: comienza con 4
	if (/^4/.test(digits)) {
		return 'visa';
	}

	// Mastercard: comienza con 51-55 o 2221-2720
	if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1][0-9]|2720)/.test(digits)) {
		return 'mastercard';
	}

	// American Express: comienza con 34 o 37
	if (/^3[47]/.test(digits)) {
		return 'amex';
	}

	// Discover: comienza con 6011, 622126-622925, 644-649, 65
	if (
		/^(6011|65|64[4-9]|622(12[6-9]|1[3-9]|[2-8]|9[01]|92[0-5]))/.test(
			digits
		)
	) {
		return 'discover';
	}

	// JCB: comienza con 35
	if (/^35/.test(digits)) {
		return 'jcb';
	}

	// Diners Club: comienza con 300-305, 36, 38
	if (/^(30[0-5]|36|38)/.test(digits)) {
		return 'diners';
	}

	return '';
}

/**
 * Formatea un número de tarjeta según la marca y el patrón correspondiente
 * @param {string} cardNumber - Número de tarjeta sin formato
 * @param {string} brand - Marca de la tarjeta
 * @returns {string} - Número de tarjeta formateado
 */
export function formatCardNumber(cardNumber, brand) {
	// Eliminar espacios y caracteres no numéricos
	const digits = cardNumber.replace(/\D/g, '');

	// Amex usa formato 4-6-5
	if (brand === 'amex') {
		return digits
			.replace(/^(\d{4})(\d{6})(\d{5})$/, '$1 $2 $3')
			.trim()
			.substring(0, 17);
	}

	// Las demás usan formato 4-4-4-4
	return digits
		.replace(/(\d{4})(?=\d)/g, '$1 ')
		.trim()
		.substring(0, 19);
}
