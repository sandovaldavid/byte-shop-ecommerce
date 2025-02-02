export const dynamic = 'force-dynamic';
import React from 'react'
import { client } from '@/lib/client'
import { ProductList } from "@/components"

async function getProducts() {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)
    return products
}

async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="min-h-screen bg-dark">
            <div className="relative overflow-hidden bg-gradient-to-r from-dark via-primary/20 to-dark py-16">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent pb-3">
                        Productos Tecnológicos
                    </h1>
                </div>
            </div>

            <ProductList initialProducts={products} />
        </div>
    )
}

export default ProductsPage