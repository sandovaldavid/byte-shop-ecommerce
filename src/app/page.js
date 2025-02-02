import React from 'react'
import { client } from '../lib/client.js'
import { Cart, Footer, FooterBanner, HeroBanner, Layout, Navbar, Product } from "../components"

async function getData() {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    const bannerQuery = '*[_type == "banner"]'
    const bannerData = await client.fetch(bannerQuery)

    return {
        products,
        bannerData
    }
}

async function Page() {
    const { products, bannerData } = await getData()

    return (
        <>
            <HeroBanner heroBanner={bannerData?.length > 0 && bannerData[0]} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-light mb-2">Best Seller Products</h2>
                <p className="text-light/70 mb-8">Discover our most popular tech products</p>

                {!products || products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="text-6xl">📱</div>
                        <h3 className="text-2xl font-medium text-light">No hay productos disponibles</h3>
                        <p className="text-light/70 text-center max-w-md">
                            Lo sentimos, en este momento no hay productos disponibles.
                            Vuelve a visitarnos pronto para ver nuestras nuevas ofertas.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Product key={product.slug.current} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <FooterBanner footerBanner={bannerData?.length > 0 && bannerData[0]} />
        </>
    )
}

export default Page