import React from "react";
import Link from "next/link";

function HeroBanner({ heroBanner }) {
    return (
        <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-r from-dark to-primary">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

            <div className="relative z-10 flex h-full items-center justify-between px-10 xl:px-20">
                <div className="space-y-6 max-w-2xl">
                    <h3 className="text-secondary font-medium animate-fade-right">
                        {heroBanner?.smallText || "Nueva Tecnología"}
                    </h3>

                    <h1 className="text-5xl lg:text-7xl font-bold text-light animate-fade-right [animation-delay:200ms]">
                        {heroBanner?.largeText1 || "El Futuro Es Ahora"}
                    </h1>

                    <h2 className="text-2xl lg:text-4xl text-accent1 font-semibold animate-fade-right [animation-delay:400ms]">
                        {heroBanner?.midText || "Descubre lo Último en Tech"}
                    </h2>

                    <p className="text-light max-w-lg animate-fade-right [animation-delay:600ms]">
                        {heroBanner?.desc ||
                            "Explora nuestra colección de productos tecnológicos de última generación."}
                    </p>

                    <Link
                        href={`/product/${heroBanner?.product || ""}`}
                        className="inline-block animate-fade-right [animation-delay:800ms]"
                    >
                        <button className="px-8 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/20 hover:shadow-accent2/40">
                            {heroBanner?.buttonText || "Comprar Ahora"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;