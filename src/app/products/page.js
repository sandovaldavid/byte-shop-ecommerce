"use client";
import React, { useState } from 'react'
import { Product } from "@/components"

function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [sortBy, setSortBy] = useState('featured');

    const products = [
        {
            slug: "Smartwatch Pro X",
            name: "Smartwatch Pro X",
            description: "El último smartwatch con tecnología avanzada",
            price: 299.99,
            oldPrice: 399.99,
            discount: 25,
            image: "/products/watch_1.webp",
            inStock: true,
            rating: 4.8
        },
        {
            slug: "laptop-pro",
            name: "Laptop Pro X",
            description: "La mejor laptop para trabajo y entretenimiento",
            price: 999.99,
            oldPrice: 1299.99,
            discount: 23,
            image: "/product-2.jpg",
            inStock: true,
            rating: 4.9
        },
        {
            slug: "earbuds-pro",
            name: "Earbuds Pro X",
            description: "Los mejores auriculares inalámbricos con cancelación de ruido",
            price: 199.99,
            oldPrice: 249.99,
            discount: 20,
            image: "/product-3.jpg",
            inStock: false,
            rating: 4.7
        },
        {
            slug: "smartphone-pro",
            name: "Smartphone Pro X",
            description: "El mejor smartphone con cámara de alta calidad",
            price: 699.99,
            oldPrice: 799.99,
            discount: 13,
            image: "/product-4.jpg",
            inStock: true,
            rating: 4.6
        },
        {
            slug: "keyboard-pro",
            name: "Keyboard Pro X",
            description: "El teclado mecánico más avanzado para gaming",
            price: 149.99,
            oldPrice: 199.99,
            discount: 25,
            image: "/product-5.jpg",
            inStock: true,
            rating: 4.9
        },
        {
            slug: "monitor-pro",
            name: "Monitor Pro X",
            description: "El monitor curvo más grande y con mejor resolución",
            price: 399.99,
            oldPrice: 499.99,
            discount: 20,
            image: "/product-6.jpg",
            inStock: false,
            rating: 4.8
        },];

    return (
        <div className="min-h-screen bg-dark">
            <div className="relative overflow-hidden bg-gradient-to-r from-dark via-primary/20 to-dark py-16">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent mb-4">
                        Productos Tecnológicos
                    </h1>
                    <p className="text-light/70 max-w-2xl mx-auto">
                        Descubre nuestra colección de productos innovadores que transformarán tu vida digital
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-64 space-y-6">
                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-secondary font-medium mb-4">Categorías</h3>
                            <div className="space-y-2">
                                {['Todos', 'Smartphones', 'Laptops', 'Audio', 'Accesorios'].map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category.toLowerCase())}
                                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            selectedCategory === category.toLowerCase()
                                                ? 'bg-accent1/20 text-accent1'
                                                : 'text-light/70 hover:bg-white/5'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="text-secondary font-medium mb-4">Precio</h3>
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full accent-secondary"
                            />
                            <div className="flex justify-between text-light/70 mt-2">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-light/70">
                                Mostrando {products.length} productos
                            </p>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white/5 text-light border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                            >
                                <option value="featured">Destacados</option>
                                <option value="price-low" className="bg-dark text-light">Precio: Menor a Mayor</option>
                                <option value="price-high" className="bg-dark text-light">Precio: Mayor a Menor</option>
                                <option value="newest" className="bg-dark text-light">Más Nuevos</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Product key={product.slug} product={product} />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center gap-2">
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    className={`w-10 h-10 rounded-lg transition-colors ${
                                        page === 1
                                            ? 'bg-accent1 text-light'
                                            : 'bg-white/5 text-light/70 hover:bg-white/10'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage