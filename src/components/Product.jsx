import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from '../lib/client';

function Product({ product }) {
    if (!product) return null;

    const productUrl = product.slug?.current
        ? `/products/${product.slug.current}`
        : "#";
    const productImage =
        product?.images && product.images.length > 0
            ? urlFor(product.images[0]).url()
            : "https://placehold.co/600x400.png";

    return (
        <Link href={productUrl}>
            <div className="group relative overflow-hidden rounded-xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-accent1/10">
                {product.discount && (
                    <div className="absolute top-4 left-4 z-10 rounded-full bg-accent1/90 px-3 py-1 text-sm text-light backdrop-blur-sm">
                        -{product.discount}%
                    </div>
                )}

                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent2/5"></div>
                    <Image
                        src={ productImage }
                        alt={product.name || "Producto no disponible"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-lg bg-gradient-to-r from-accent1 to-accent2 px-4 py-2 text-sm text-light opacity-0 transition-all duration-300 hover:shadow-lg hover:shadow-accent1/50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
                        Ver Detalles
                    </button>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-light/90 transition-colors group-hover:text-secondary">
                            {product.name || "Producto no disponible"}
                        </h3>
                        <span
                            className={`text-xs px-2 py-1 rounded-full ${
                                product.inStock
                                    ? "bg-success/10 text-success"
                                    : "bg-error/10 text-error"
                            }`}
                        >
                            {product.inStock ? "En Stock" : "Agotado"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-light">
                                ${product.price || "0.00"}
                            </span>
                            {product.oldPrice && (
                                <span className="text-sm text-light/50 line-through">
                                    ${product.oldPrice}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-secondary">
                            <span className="text-xs">★</span>
                            <span className="text-sm font-medium">
                                {product.rating || "4.5"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Product;
