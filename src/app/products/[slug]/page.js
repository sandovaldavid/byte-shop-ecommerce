"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';

function ProductDetail({ params }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock data - Reemplazar con datos reales de Sanity
    const product = {
        name: "Smartwatch Pro X",
        description: "El último smartwatch con tecnología avanzada que combina elegancia y funcionalidad. Incluye monitoreo de salud 24/7, GPS integrado, y resistencia al agua.",
        price: 299.99,
        oldPrice: 399.99,
        discount: 25,
        rating: 4.8,
        inStock: true,
        specs: [
            "Pantalla AMOLED de 1.9\"",
            "Batería de 5 días",
            "Resistente al agua IP68",
            "Sensor cardíaco avanzado",
            "GPS integrado"
        ],
        images: [
            "/products/watch_1.webp",
            "/products/watch_2.webp",
            "/products/watch_3.webp",
        ]
    };

    return (
        <div className="min-h-screen bg-dark py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent2/5"></div>
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            {product.discount && (
                                <div className="absolute top-4 left-4 bg-accent1/90 text-light px-3 py-1 rounded-full backdrop-blur-sm text-sm">
                                    -{product.discount}%
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-lg overflow-hidden ${selectedImage === index
                                            ? 'ring-2 ring-accent1'
                                            : 'ring-1 ring-white/10'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-1 text-secondary">
                                    <span className="text-xs">★</span>
                                    <span className="text-sm font-medium">{product.rating}</span>
                                </div>
                                <span className="text-light/50">|</span>
                                <span className={product.inStock ? 'text-success' : 'text-error'}>
                                    {product.inStock ? 'En Stock' : 'Agotado'}
                                </span>
                            </div>
                        </div>

                        <p className="text-light/70 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-light">
                                ${product.price}
                            </span>
                            {product.oldPrice && (
                                <span className="text-xl text-light/50 line-through">
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-medium text-secondary">
                                Especificaciones
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.specs.map((spec, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-light/70"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-accent1"></span>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 bg-white/5 rounded-lg px-4 py-2 backdrop-blur-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-light/70 hover:text-accent1 transition-colors"
                                >
                                    <AiOutlineMinus />
                                </button>
                                <span className="text-light w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-light/70 hover:text-accent1 transition-colors"
                                >
                                    <AiOutlinePlus />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-light/70 hover:text-accent1 transition-colors">
                                <AiOutlineHeart className="text-xl" />
                                <span>Añadir a favoritos</span>
                            </button>
                        </div>

                        <button className="w-full bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl shadow-accent1/20 flex items-center justify-center gap-2 group">
                            <AiOutlineShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                            <span>Agregar al Carrito</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;