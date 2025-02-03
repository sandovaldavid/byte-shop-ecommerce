"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    AiOutlineShoppingCart,
    AiOutlineSearch,
    AiOutlineMenu,
    AiOutlineClose,
} from "react-icons/ai";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80  backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent">
                            TechStore
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/products"
                            className="text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            Productos
                        </Link>
                        <Link
                            href="/categories"
                            className="text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            Categorías
                        </Link>
                        <Link
                            href="/deals"
                            className="text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            Ofertas
                        </Link>
                        <Link
                            href="/support"
                            className="text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            Soporte
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-light/80 hover:text-secondary transition-colors duration-200"
                            >
                                <AiOutlineSearch className="w-6 h-6" />
                            </button>
                            {isSearchOpen && (
                                <div className="absolute right-0 top-12 w-80">
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg backdrop-blur-md text-light focus:outline-none focus:border-secondary transition-colors duration-200"
                                    />
                                </div>
                            )}
                        </div>

                        <Link
                            href="/cart"
                            className="relative p-2 text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            <AiOutlineShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-accent1 text-light text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-light/80 hover:text-secondary transition-colors duration-200"
                        >
                            {isMenuOpen ? (
                                <AiOutlineClose className="w-6 h-6" />
                            ) : (
                                <AiOutlineMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/products"
                                className="text-light/80 hover:text-secondary transition-colors duration-200"
                            >
                                Productos
                            </Link>
                            <Link
                                href="/categories"
                                className="text-light/80 hover:text-secondary transition-colors duration-200"
                            >
                                Categorías
                            </Link>
                            <Link
                                href="/deals"
                                className="text-light/80 hover:text-secondary transition-colors duration-200"
                            >
                                Ofertas
                            </Link>
                            <Link
                                href="/support"
                                className="text-light/80 hover:text-secondary transition-colors duration-200"
                            >
                                Soporte
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;