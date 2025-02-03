import { NoFound } from "@/components";

export default function NotFoundPage() {
    return (
        <NoFound
            icon="🔍"
            title="Página no encontrada"
            message="La página que buscas no existe o no está disponible."
            buttonText="Volver al inicio"
            buttonLink="/"
        />
    );
}
