/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--primary), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--primary), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--primary))`;
				},
				secondary: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--secondary), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--secondary), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--secondary))`;
				},
				dark: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--dark), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--dark), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--dark))`;
				},
				light: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--light), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--light), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--light))`;
				},
				accent1: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--accent1), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--accent1), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--accent1))`;
				},
				accent2: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--accent2), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--accent2), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--accent2))`;
				},
				success: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--success), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--success), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--success))`;
				},
				error: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--error), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--error), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--error))`;
				},
				background: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--background), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--background), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--background))`;
				},
				text: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--text), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--text), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--text))`;
				},
				gray: ({ opacityVariable, opacityValue }) => {
					if (opacityValue !== undefined) {
						return `rgba(var(--gray), ${opacityValue})`;
					}
					if (opacityVariable !== undefined) {
						return `rgba(var(--gray), var(${opacityVariable}, 1))`;
					}
					return `rgb(var(--gray))`;
				},
			},
			// El resto de tu configuración sigue igual
			backgroundColor: {
				'glass-light': 'var(--glass-light)',
				'glass-dark': 'var(--glass-dark)',
			},
			borderColor: {
				'glass-light': 'var(--glass-border-light)',
				'glass-dark': 'var(--glass-border-dark)',
			},
			boxShadow: {
				'glass-light': 'var(--glass-shadow-light)',
				'glass-dark': 'var(--glass-shadow-dark)',
				'neuro-light': 'var(--neuro-shadow-light)',
				'neuro-dark': 'var(--neuro-shadow-dark)',
			},
			animation: {
				'scale-in': 'scale-in 0.5s ease-out',
				'fade-right': 'fadeRight 1s ease-out forwards',
				'fade-left': 'fadeLeft 1s ease-out forwards',
				'fade-up': 'fade-up 0.5s ease-out',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'spin-slow': 'spin 20s linear infinite',
				shake: 'shake 0.5s ease-in-out',
				'spin-reverse': 'spin 2s linear infinite reverse',
				'bounce-slow': 'bounce 3s infinite',
				gradient: 'gradient 3s linear infinite',
				shine: 'shine 2s linear infinite',
				'pulse-slow': 'pulse 3s linear infinite',
			},
			keyframes: {
				fadeRight: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				fadeLeft: {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0)' },
					'100%': { transform: 'scale(1)' },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				shake: {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-5px)' },
					'75%': { transform: 'translateX(5px)' },
				},
				gradient: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
				shine: {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' },
				},
			},
			perspective: {
				1000: '1000px',
			},
			translate: {
				'z-10': 'translateZ(10px)',
				'z-15': 'translateZ(15px)',
				'z-20': 'translateZ(20px)',
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundSize: {
				'size-200': '200% 200%',
			},
			backgroundPosition: {
				'pos-0': '0% 0%',
				'pos-100': '100% 100%',
			},
		},
	},
	plugins: [],
	variants: {
		extend: {
			scrollBehavior: ['smooth'],
		},
	},
	corePlugins: {
		scrollBehavior: true,
	},
};
