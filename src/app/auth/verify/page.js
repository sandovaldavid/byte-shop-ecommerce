"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

function VerifyPage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const token = searchParams.get('token');

    useEffect(() => {
        // Simular verificación del token (prueba)
        // Aquí ira la validacion del token
        setTimeout(() => {
            setStatus(token ? 'success' : 'error');
        }, 2000);
    }, [token]);

    const statusConfig = {
        loading: {
            icon: (
                <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            ),
            title: "Verificando tu correo electrónico",
            message: "Esto solo tomará un momento...",
            button: null
        },
        success: {
            icon: <AiOutlineCheckCircle className="w-20 h-20 text-success animate-scale-in" />,
            title: "¡Correo verificado con éxito!",
            message: "Tu cuenta ha sido verificada correctamente. Ya puedes comenzar a explorar nuestra tienda.",
            button: (
                <Link 
                    href="/auth/login"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-accent1/20"
                >
                    Iniciar Sesión
                </Link>
            )
        },
        error: {
            icon: <AiOutlineCloseCircle className="w-20 h-20 text-error animate-shake" />,
            title: "Error de verificación",
            message: "No pudimos verificar tu correo electrónico. El enlace puede haber expirado o ser inválido.",
            button: (
                <Link 
                    href="/auth/register"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-error to-error/70 hover:from-error/70 hover:to-error text-light rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-error/20"
                >
                    Volver a registrarse
                </Link>
            )
        }
    };

    const current = statusConfig[status];

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden py-16">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(45,58,254,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,58,254,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className={`absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl transition-colors duration-500
                ${status === 'loading' ? 'bg-secondary/10' : 
                  status === 'success' ? 'bg-success/10' : 'bg-error/10'}`}>
            </div>
            <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl transition-colors duration-500
                ${status === 'loading' ? 'bg-accent1/10' : 
                  status === 'success' ? 'bg-success/10' : 'bg-error/10'}`}>
            </div>

            <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="transform transition-all duration-500">
                        {current.icon}
                    </div>

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent">
                        {current.title}
                    </h1>

                    <p className="text-light/70">
                        {current.message}
                    </p>

                    {current.button && (
                        <div className="pt-4 animate-fade-up">
                            {current.button}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;