/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				dark: 'var(--dark)',
				light: 'var(--light)',
				accent1: 'var(--accent1)',
				accent2: 'var(--accent2)',
				success: 'var(--success)',
				error: 'var(--error)',
				background: 'var(--background)',
				text: 'var(--text)',
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
