"use client";
import React, { createContext, useContext, useState } from "react";
import { Cart } from '../components';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{ isCartOpen, openCart, closeCart }}>
            {children}
            <Cart isOpen={isCartOpen} onClose={closeCart} />
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
