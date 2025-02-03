"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    AiOutlineClose,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineLeft,
    AiOutlineShoppingCart,
} from "react-icons/ai";

function Cart({ isOpen, onClose }) {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Smartwatch Pro X",
            price: 299.99,
            quantity: 1,
            image: "/products/watch_1.webp",
        },
    ]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-dark/80 backdrop-blur-xl border-l border-white/10 text-light z-50"
                    >
                        <div className="p-6 border-b border-white/10">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <AiOutlineShoppingCart className="text-2xl text-accent1" />
                                    <h2 className="text-xl font-bold">
                                        Tu Carrito
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                >
                                    <AiOutlineClose className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 bg-white/5 p-4 rounded-xl mb-4"
                                >
                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">
                                            {item.name}
                                        </h3>
                                        <p className="text-accent1 font-bold">
                                            ${item.price}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center bg-white/5 rounded-lg">
                                                <button className="p-2">
                                                    <AiOutlineMinus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button className="p-2">
                                                    <AiOutlinePlus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 p-6">
                            <div className="flex justify-between text-lg mb-4">
                                <span>Total</span>
                                <span className="font-bold">
                                    $
                                    {cartItems
                                        .reduce(
                                            (total, item) =>
                                                total +
                                                item.price * item.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                            <button className="w-full bg-gradient-to-r from-accent1 to-accent2 text-light py-3 rounded-xl">
                                Proceder al Pago
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default Cart;