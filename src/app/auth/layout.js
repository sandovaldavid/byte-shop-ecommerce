import React from 'react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent1/10 rounded-full filter blur-3xl animate-pulse-slow"></div>

            <nav className="relative z-10 px-6 py-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent group-hover:from-accent1 group-hover:to-secondary transition-all duration-300">
                            TechStore
                        </span>
                    </a>
                    <a 
                        href="/"
                        className="text-light/70 hover:text-secondary transition-colors duration-300"
                    >
                        Volver a la tienda
                    </a>
                </div>
            </nav>

            <main className="relative z-10">
                {children}
            </main>

            <footer className="relative z-10 text-center py-8 text-light/50 text-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-light/10 to-transparent mb-8"></div>
                    © 2024 TechStore. Todos los derechos reservados.
                </div>
            </footer>

            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent"></div>
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-accent1/20 to-transparent"></div>
        </div>
    );
}