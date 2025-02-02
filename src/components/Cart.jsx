"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
    AiOutlineClose,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
} from "react-icons/ai";

function Cart() {
    // Mock data - Reemplazar con datos reales
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Smartwatch Pro X",
            price: 299.99,
            quantity: 1,
            image: "/product-1.jpg",
        },
    ]);

    return (
        <div className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-dark/95 backdrop-blur-md text-light p-6 transform transition-transform duration-300 z-50">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Tu Carrito</h2>
                    <span className="bg-accent1/20 text-accent1 px-2 py-1 rounded-full text-sm">
                        {cartItems.length} items
                    </span>
                </div>
                <button className="p-2 hover:text-secondary transition-colors">
                    <AiOutlineClose className="w-6 h-6" />
                </button>
            </div>

            {cartItems.length > 0 ? (
                <>
                    <div className="flex-1 overflow-y-auto space-y-6 mb-8">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-medium mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-secondary">
                                            ${item.price}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2">
                                            <button className="p-1 hover:text-accent1 transition-colors">
                                                <AiOutlineMinus className="w-4 h-4" />
                                            </button>
                                            <span className="text-light/90">
                                                {item.quantity}
                                            </span>
                                            <button className="p-1 hover:text-accent1 transition-colors">
                                                <AiOutlinePlus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-light/50 hover:text-error">
                                    <AiOutlineClose className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-4">
                        <div className="flex justify-between text-lg">
                            <span className="text-light/80">Subtotal</span>
                            <span className="font-medium">
                                $
                                {cartItems
                                    .reduce(
                                        (total, item) =>
                                            total + item.price * item.quantity,
                                        0
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>

                        <button className="w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-accent1/20">
                            Proceder al Pago
                        </button>

                        <Link
                            href="/products"
                            className="flex items-center justify-center gap-2 text-light/80 hover:text-secondary transition-colors mt-4"
                        >
                            <AiOutlineLeft />
                            <span>Continuar Comprando</span>
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center space-y-6">
                    <div className="text-6xl">🛒</div>
                    <h3 className="text-xl font-medium">
                        Tu carrito está vacío
                    </h3>
                    <p className="text-light/70">
                        ¡Descubre productos increíbles para agregar!
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent1 to-accent2 text-light px-6 py-3 rounded-lg hover:from-accent2 hover:to-accent1 transition-all duration-300 transform hover:scale-105"
                    >
                        <AiOutlineLeft />
                        Explorar Productos
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;