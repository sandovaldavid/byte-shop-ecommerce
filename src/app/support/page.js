'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	AiOutlineQuestionCircle,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineMessage,
	AiOutlineArrowRight,
	AiOutlineSend,
	AiOutlineSearch,
	AiOutlineInfoCircle,
} from 'react-icons/ai';

const faqItems = [
	{
		question: '¿Cuánto tarda el envío de los productos?',
		answer: 'Nuestros envíos se realizan en 24-48 horas para productos en stock. Para productos internacionales o personalizados puede tomar de 3-7 días hábiles.',
	},
	{
		question: '¿Cómo puedo dar seguimiento a mi pedido?',
		answer: "Puedes dar seguimiento a tu pedido desde tu cuenta en la sección 'Mis Pedidos', o utilizando el código de seguimiento que enviamos a tu correo electrónico.",
	},
	{
		question: '¿Cuál es la política de devoluciones?',
		answer: 'Aceptamos devoluciones dentro de los primeros 30 días después de la compra. El producto debe estar en perfectas condiciones y con su embalaje original.',
	},
	{
		question: '¿Ofrecen garantía para los productos?',
		answer: 'Todos nuestros productos cuentan con garantía mínima de 1 año. Algunos productos premium tienen garantía extendida de hasta 3 años.',
	},
	{
		question: '¿Cómo puedo cancelar un pedido?',
		answer: 'Puedes cancelar tu pedido dentro de las primeras 12 horas contactando a nuestro equipo de soporte. Después de ese tiempo, el pedido ya podría estar en proceso de envío.',
	},
];

const supportCategories = [
	{
		title: 'Servicio Técnico',
		icon: '💻',
		description: 'Soporte para problemas técnicos con tus dispositivos',
		gradient: 'from-secondary to-primary',
	},
	{
		title: 'Pedidos y Envíos',
		icon: '📦',
		description: 'Consultas sobre tu pedido, envío o devoluciones',
		gradient: 'from-accent1 to-accent2',
	},
	{
		title: 'Garantías',
		icon: '🛡️',
		description: 'Información sobre garantías y reparaciones',
		gradient: 'from-primary to-accent2',
	},
	{
		title: 'Facturación',
		icon: '🧾',
		description: 'Ayuda con facturas, pagos o reembolsos',
		gradient: 'from-accent2 to-secondary',
	},
];

export default function SupportPage() {
	const [activeTab, setActiveTab] = useState('faq');
	const [activeQuestion, setActiveQuestion] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);

	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitStatus('success');
			setFormData({ name: '', email: '', subject: '', message: '' });

			// Clear success message after 5 seconds
			setTimeout(() => setSubmitStatus(null), 5000);
		}, 1500);
	};

	const filteredFAQs = searchQuery
		? faqItems.filter(
				(item) =>
					item.question
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					item.answer
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			)
		: faqItems;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				duration: 0.4,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
	};

	return (
		<div className='min-h-screen bg-dark text-light relative overflow-hidden pt-4'>
			{/* Background elements */}
			<div className='absolute inset-0 bg-[linear-gradient(rgba(51,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,85,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

			<div className='absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full filter blur-3xl'></div>
			<div className='absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tl from-accent1/5 to-transparent rounded-full filter blur-3xl'></div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
				{/* Hero Section */}
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary via-light to-accent1 bg-clip-text text-transparent pb-3'>
						Centro de Soporte
					</h1>
					<p className='text-light/70 text-lg max-w-2xl mx-auto'>
						Estamos aquí para ayudarte. Consulta nuestras preguntas
						frecuentes o contáctanos directamente.
					</p>
					{/* Search Bar */}
					<div className='mt-8 max-w-xl mx-auto'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Buscar en soporte...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
							/>
							<AiOutlineSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-light/40 text-xl' />
						</div>
					</div>
				</motion.div>

				{/* Support Categories */}
				<motion.div
					className='mb-16'
					variants={containerVariants}
					initial='hidden'
					animate='visible'>
					<h2 className='text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-secondary to-accent2 bg-clip-text text-transparent'>
						¿En qué podemos ayudarte hoy?
					</h2>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{supportCategories.map((category, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								className='relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 flex flex-col items-center text-center'>
								<div
									className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl mb-4 transform group-hover:scale-110 transition-all duration-300`}>
									{category.icon}
								</div>
								<h3 className='text-xl font-medium mb-2'>
									{category.title}
								</h3>
								<p className='text-light/60 text-sm'>
									{category.description}
								</p>
								<button className='mt-4 px-4 py-2 bg-white/5 text-sm rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1 group'>
									Explorar
									<AiOutlineArrowRight className='group-hover:translate-x-1 transition-transform duration-300' />
								</button>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Tabs Navigation */}
				<div className='mb-8 flex justify-center'>
					<div className='inline-flex border border-white/10 rounded-xl p-1 bg-white/5 backdrop-blur-sm'>
						<button
							onClick={() => setActiveTab('faq')}
							className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'faq' ? 'bg-gradient-to-r from-secondary to-accent1 text-light shadow-md' : 'text-light/70 hover:text-light'}`}>
							Preguntas Frecuentes
						</button>
						<button
							onClick={() => setActiveTab('contact')}
							className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'contact' ? 'bg-gradient-to-r from-secondary to-accent1 text-light shadow-md' : 'text-light/70 hover:text-light'}`}>
							Contactar
						</button>
					</div>
				</div>

				{/* Tab Content */}
				<div className='bg-glass-dark backdrop-blur-lg border border-glass-border-dark rounded-2xl shadow-glass-dark overflow-hidden p-6 sm:p-8'>
					{/* FAQ Tab */}
					{activeTab === 'faq' && (
						<motion.div
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							className='space-y-6'>
							{filteredFAQs.length > 0 ? (
								filteredFAQs.map((item, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										className='border border-white/10 rounded-xl overflow-hidden'>
										<button
											onClick={() =>
												setActiveQuestion(
													activeQuestion === index
														? null
														: index
												)
											}
											className='w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors duration-200'>
											<span className='flex items-center'>
												<AiOutlineQuestionCircle className='text-secondary mr-3 flex-shrink-0' />
												<span className='font-medium'>
													{item.question}
												</span>
											</span>
											<span
												className={`transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-5 w-5 text-light/60'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M19 9l-7 7-7-7'
													/>
												</svg>
											</span>
										</button>

										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{
												height:
													activeQuestion === index
														? 'auto'
														: 0,
												opacity:
													activeQuestion === index
														? 1
														: 0,
											}}
											transition={{ duration: 0.3 }}
											className='overflow-hidden'>
											<div className='p-5 pt-0 text-light/70 bg-white/5'>
												<p>{item.answer}</p>
											</div>
										</motion.div>
									</motion.div>
								))
							) : (
								<motion.div
									variants={itemVariants}
									className='bg-white/5 rounded-xl p-8 text-center'>
									<p className='text-light/70 mb-2'>
										No se encontraron resultados para "
										{searchQuery}"
									</p>
									<button
										onClick={() => setSearchQuery('')}
										className='text-secondary hover:text-accent1 transition-colors'>
										Borrar búsqueda
									</button>
								</motion.div>
							)}

							<motion.div
								variants={itemVariants}
								className='mt-8 text-center'>
								<p className='text-light/60 mb-4'>
									¿No encuentras lo que buscas?
								</p>
								<button
									onClick={() => setActiveTab('contact')}
									className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary to-accent1 hover:from-accent1 hover:to-secondary text-light font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]'>
									<AiOutlineMessage className='mr-2' />
									Contactar con soporte
								</button>
							</motion.div>
						</motion.div>
					)}

					{/* Contact Tab */}
					{activeTab === 'contact' && (
						<motion.div
							variants={containerVariants}
							initial='hidden'
							animate='visible'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
								{/* Contact Info */}
								<motion.div
									variants={itemVariants}
									className='md:col-span-1 space-y-6'>
									<div>
										<h3 className='text-xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent1 bg-clip-text text-transparent'>
											Información de Contacto
										</h3>
										<p className='text-light/70 mb-6'>
											Nuestro equipo de soporte está
											disponible para ayudarte en
											cualquier momento.
										</p>
									</div>

									<div className='space-y-4'>
										<div className='flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300'>
											<div className='w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary'>
												<AiOutlinePhone className='text-xl' />
											</div>
											<div>
												<h4 className='font-medium text-sm text-light/80 mb-1'>
													Teléfono
												</h4>
												<p className='text-light'>
													+52 55 1234 5678
												</p>
												<p className='text-xs text-light/50 mt-1'>
													Lun-Vie: 9AM - 6PM
												</p>
											</div>
										</div>

										<div className='flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300'>
											<div className='w-10 h-10 rounded-full bg-accent1/20 flex items-center justify-center text-accent1'>
												<AiOutlineMail className='text-xl' />
											</div>
											<div>
												<h4 className='font-medium text-sm text-light/80 mb-1'>
													Email
												</h4>
												<p className='text-light'>
													soporte@techstore.com
												</p>
												<p className='text-xs text-light/50 mt-1'>
													Respuesta en 24-48 horas
												</p>
											</div>
										</div>

										<div className='flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300'>
											<div className='w-10 h-10 rounded-full bg-accent2/20 flex items-center justify-center text-accent2'>
												<AiOutlineInfoCircle className='text-xl' />
											</div>
											<div>
												<h4 className='font-medium text-sm text-light/80 mb-1'>
													Horario de Atención
												</h4>
												<p className='text-light'>
													Lunes a Viernes
												</p>
												<p className='text-xs text-light/50 mt-1'>
													9:00 AM - 6:00 PM
												</p>
											</div>
										</div>
									</div>
								</motion.div>

								{/* Contact Form */}
								<motion.div
									variants={itemVariants}
									className='md:col-span-2'>
									<h3 className='text-xl font-bold mb-6 bg-gradient-to-r from-accent1 to-accent2 bg-clip-text text-transparent'>
										Envíanos un mensaje
									</h3>

									<form
										onSubmit={handleFormSubmit}
										className='space-y-5'>
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
											<div>
												<label
													htmlFor='name'
													className='block text-sm text-light/80 mb-2'>
													Nombre completo
												</label>
												<input
													type='text'
													id='name'
													name='name'
													value={formData.name}
													onChange={handleFormChange}
													required
													className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
													placeholder='Tu nombre'
												/>
											</div>
											<div>
												<label
													htmlFor='email'
													className='block text-sm text-light/80 mb-2'>
													Email
												</label>
												<input
													type='email'
													id='email'
													name='email'
													value={formData.email}
													onChange={handleFormChange}
													required
													className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
													placeholder='tucorreo@ejemplo.com'
												/>
											</div>
										</div>

										<div>
											<label
												htmlFor='subject'
												className='block text-sm text-light/80 mb-2'>
												Asunto
											</label>
											<input
												type='text'
												id='subject'
												name='subject'
												value={formData.subject}
												onChange={handleFormChange}
												required
												className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300'
												placeholder='Asunto de tu mensaje'
											/>
										</div>

										<div>
											<label
												htmlFor='message'
												className='block text-sm text-light/80 mb-2'>
												Mensaje
											</label>
											<textarea
												id='message'
												name='message'
												value={formData.message}
												onChange={handleFormChange}
												required
												rows={5}
												className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary/50 transition-all duration-300 resize-none'
												placeholder='¿Cómo podemos ayudarte?'></textarea>
										</div>

										<div>
											<button
												type='submit'
												disabled={isSubmitting}
												className='w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-accent1 to-accent2 hover:from-accent2 hover:to-accent1 text-light font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'>
												{isSubmitting ? (
													<>
														<svg
															className='animate-spin h-5 w-5 text-light'
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'>
															<circle
																className='opacity-25'
																cx='12'
																cy='12'
																r='10'
																stroke='currentColor'
																strokeWidth='4'></circle>
															<path
																className='opacity-75'
																fill='currentColor'
																d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
														</svg>
														Enviando...
													</>
												) : (
													<>
														<AiOutlineSend /> Enviar
														mensaje
													</>
												)}
											</button>

											{/* Success message */}
											{submitStatus === 'success' && (
												<motion.div
													initial={{
														opacity: 0,
														y: 10,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														duration: 0.3,
													}}
													className='mt-4 p-3 bg-success/10 border border-success/20 rounded-lg text-success flex items-center gap-2'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-5 w-5'
														viewBox='0 0 20 20'
														fill='currentColor'>
														<path
															fillRule='evenodd'
															d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
															clipRule='evenodd'
														/>
													</svg>
													Mensaje enviado
													correctamente. Te
													responderemos en breve.
												</motion.div>
											)}
										</div>
									</form>
								</motion.div>
							</div>
						</motion.div>
					)}
				</div>

				{/* Quick Help Section */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='mt-16 text-center'>
					<motion.h3
						variants={itemVariants}
						className='text-2xl font-bold mb-6'>
						Recursos de Ayuda Rápida
					</motion.h3>

					<motion.div
						variants={containerVariants}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						<motion.div variants={itemVariants}>
							<Link
								href='/guides'
								className='block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1'>
								<div className='text-3xl mb-2'>📘</div>
								<h4 className='font-medium mb-1'>
									Guías de Usuario
								</h4>
								<p className='text-light/60 text-sm'>
									Manuales detallados para tus productos
								</p>
							</Link>
						</motion.div>

						<motion.div variants={itemVariants}>
							<Link
								href='/tutorials'
								className='block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1'>
								<div className='text-3xl mb-2'>🎬</div>
								<h4 className='font-medium mb-1'>Tutoriales</h4>
								<p className='text-light/60 text-sm'>
									Videos explicativos paso a paso
								</p>
							</Link>
						</motion.div>

						<motion.div variants={itemVariants}>
							<Link
								href='/downloads'
								className='block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1'>
								<div className='text-3xl mb-2'>💾</div>
								<h4 className='font-medium mb-1'>Descargas</h4>
								<p className='text-light/60 text-sm'>
									Drivers y software para tus dispositivos
								</p>
							</Link>
						</motion.div>

						<motion.div variants={itemVariants}>
							<Link
								href='/community'
								className='block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1'>
								<div className='text-3xl mb-2'>👥</div>
								<h4 className='font-medium mb-1'>Comunidad</h4>
								<p className='text-light/60 text-sm'>
									Conecta con otros usuarios
								</p>
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
