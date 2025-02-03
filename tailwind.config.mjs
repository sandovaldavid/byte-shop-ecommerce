/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                dark: "var(--dark)",
                light: "var(--light)",
                accent1: "var(--accent1)",
                accent2: "var(--accent2)",
                success: "var(--success)",
                error: "var(--error)",
                background: "var(--background)",
                text: "var(--text)",
            },
            animation: {
                "scale-in": "scale-in 0.5s ease-out",
                "fade-right": "fadeRight 1s ease-out forwards",
                "fade-left": "fadeLeft 1s ease-out forwards",
                "fade-up": "fade-up 0.5s ease-out",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "spin-slow": "spin 20s linear infinite",
                shake: "shake 0.5s ease-in-out",
                "spin-reverse": "spin 2s linear infinite reverse",
                "bounce-slow": "bounce 3s infinite",
            },
            keyframes: {
                fadeRight: {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                fadeLeft: {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0)" },
                    "100%": { transform: "scale(1)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "75%": { transform: "translateX(5px)" },
                },
            },
        },
    },
    plugins: [],
    variants: {
        extend: {
            scrollBehavior: ["smooth"],
        },
    },
    // Y esta
    corePlugins: {
        scrollBehavior: true,
    },
};