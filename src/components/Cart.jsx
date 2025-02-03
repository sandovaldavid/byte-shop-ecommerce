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
            image: "/product-1.jpg",
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
                        className="fixed top-0 right-0 h-screen w-full md:w-[400px] bg-dark/80 backdrop-blur-xl border-l border-white/10 text-light shadow-lg z-50 flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <AiOutlineShoppingCart className="text-2xl text-accent1" />
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent">
                                        Tu Carrito
                                    </h2>
                                    <span className="text-sm text-light/70">
                                        {cartItems.length}{" "}
                                        {cartItems.length === 1
                                            ? "item"
                                            : "items"}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors hover:text-accent1"
                            >
                                <AiOutlineClose className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default Cart;