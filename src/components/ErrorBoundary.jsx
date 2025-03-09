'use client';

import React, { Component } from 'react';
import Link from 'next/link';
import { BiError, BiRefresh, BiHome } from 'react-icons/bi';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error) {
		// Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Puedes registrar el error en un servicio de reporte de errores
		console.error('Error capturado por ErrorBoundary:', error, errorInfo);
		this.setState({ errorInfo });
	}

	handleRefresh = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			const { fallback } = this.props;

			// Si se proporciona un fallback personalizado, úsalo
			if (fallback) {
				return fallback;
			}

			// UI por defecto para errores
			return (
				<div className='min-h-[70vh] flex items-center justify-center px-4 py-16'>
					<div className='relative w-full max-w-2xl overflow-hidden rounded-2xl bg-dark/40 dark:bg-dark/60 backdrop-blur-xl p-8 border border-white/10 shadow-xl'>
						{/* Efectos de luz ambiental */}
						<div className='absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl'></div>
						<div className='absolute bottom-0 right-0 w-64 h-64 bg-accent1/10 rounded-full filter blur-3xl'></div>

						{/* Ícono de error con animación */}
						<div className='flex justify-center mb-6'>
							<div className='relative w-24 h-24 flex items-center justify-center'>
								<div className='absolute inset-0 bg-gradient-to-r from-error/30 to-error/10 rounded-full animate-pulse'></div>
								<BiError className='text-6xl text-error relative z-10' />
							</div>
						</div>

						{/* Mensaje de error */}
						<h2 className='text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-light via-secondary to-light dark:from-light dark:via-secondary dark:to-light bg-clip-text text-transparent'>
							Ocurrió un error inesperado
						</h2>

						<p className='text-light/80 dark:text-light/70 text-center mb-8 max-w-xl mx-auto'>
							Estamos trabajando para resolver este problema. Por
							favor, intenta recargar la página o vuelve al
							inicio.
						</p>

						{/* Acciones */}
						<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
							<button
								onClick={this.handleRefresh}
								className='px-6 py-3 bg-gradient-to-r from-secondary to-accent1 text-light rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-secondary/20'>
								<BiRefresh className='text-xl' /> Recargar
								página
							</button>

							<Link
								href='/'
								className='px-6 py-3 bg-white/10 dark:bg-dark/50 hover:bg-white/20 text-light rounded-xl transition-all flex items-center gap-2 backdrop-blur-md'>
								<BiHome className='text-xl' /> Volver al inicio
							</Link>
						</div>

						{/* Detalles técnicos (opcional) */}
						{this.state.error &&
							process.env.NODE_ENV === 'development' && (
								<div className='mt-8 p-4 bg-black/30 rounded-xl border border-white/5 max-h-[200px] overflow-auto'>
									<p className='text-secondary text-sm font-mono'>
										Error: {this.state.error.toString()}
									</p>
									{this.state.errorInfo && (
										<p className='text-white/60 text-xs font-mono mt-2 whitespace-pre-wrap'>
											{
												this.state.errorInfo
													.componentStack
											}
										</p>
									)}
								</div>
							)}
					</div>
				</div>
			);
		}

		// Si no hay error, renderizar los hijos normalmente
		return this.props.children;
	}
}

export default ErrorBoundary;
