import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "../components";
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "TechShop | Tu Tienda de Tecnología",
    description:
        "Descubre la mejor selección de productos tecnológicos: smartphones, laptops, audio y más. Innovación y calidad al mejor precio.",
    keywords:
        "tecnología, ecommerce, gadgets, smartphones, laptops, audio, accesorios tecnológicos",
    openGraph: {
        title: "TechShop | Tu Tienda de Tecnología",
        description:
            "Explora nuestra colección de productos tecnológicos de última generación.",
        type: "website",
        locale: "es_ES",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <CartProvider>
                        <Layout>{children}</Layout>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}