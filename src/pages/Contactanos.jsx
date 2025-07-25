import emailjs from '@emailjs/browser';
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEnvelope, FaExclamationCircle, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import CTAButton from '../components/CTAButton';
import "./css/Contactanos.css";

const Contactanos = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        asunto: "",
        mensaje: ""
    });

    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { nombre, apellido, telefono, asunto, mensaje } = formData;

        // Validación mejorada
        if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !asunto.trim() || !mensaje.trim()) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "Por favor completa todos los campos obligatorios." 
            });
            setIsLoading(false);
            return;
        }

        // Validación de teléfono
        if (!/^\d{8}$/.test(telefono.trim())) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "El teléfono debe tener exactamente 8 dígitos." 
            });
            setIsLoading(false);
            return;
        }

        try {
            await emailjs.sendForm('service_2g38xta', 'template_5gomgum', e.target, 'xA96CzGZbjiD1oHn1');
            
            setFeedback({ 
                tipo: "success", 
                mensaje: "¡Mensaje enviado exitosamente! Te contactaremos pronto." 
            });
            
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                asunto: "",
                mensaje: "",
            });
        } catch (error) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "Error al enviar el mensaje. Por favor intenta nuevamente." 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('servicioalclientegaf@outlook.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Error al copiar el correo: ', err);
        }
    };

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    return (
        <div className="contactanos-page">
            {/* Hero Section */}
            <section className="contactanos-hero">
                <div className="contactanos-hero-content">
                    <h1 className="contactanos-hero-title">
                        ¡Contá<span className="highlight">ctanos!</span>
                    </h1>
                    <p className="contactanos-hero-description">
                        Estamos aquí para escucharte. Tu experiencia, sugerencias y preguntas 
                        son importantes para nosotros. Contáctanos y hagamos del fitness una realidad juntos.
                    </p>
                </div>
            </section>

            {/* Feedback Notification */}
            {feedback && (
                <div className={`notification ${feedback.tipo}`}>
                    <div className="notification-content">
                        {feedback.tipo === 'success' ? (
                            <FaCheckCircle className="notification-icon" />
                        ) : (
                            <FaExclamationCircle className="notification-icon" />
                        )}
                        <span>{feedback.mensaje}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <section className="contactanos-content">
                <div className="contactanos-container">
                    {/* Contact Info Cards */}
                    <div className="contact-info-section">
                        <h2 className="section-title">Información de Contacto</h2>
                        <p className="section-description">
                            Múltiples formas de conectar contigo
                        </p>
                        
                        <div className="contact-cards">
                            {/* Phone Card */}
                            <div className="contact-card">
                                <div className="contact-card-icon">
                                    <FaPhone />
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Teléfono</h3>
                                    <p className="contact-card-subtitle">Llámanos directamente</p>
                                    <a 
                                        href="tel:85858526" 
                                        className="contact-card-link"
                                    >
                                        8585-8526
                                    </a>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="contact-card">
                                <div className="contact-card-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Correo Electrónico</h3>
                                    <p className="contact-card-subtitle">Escríbenos cuando gustes</p>
                                    <div className="email-section">
                                        <span className="contact-card-email">
                                            <p
                                                onClick={handleCopyEmail}
                                                className="email-copy"
                                                title="Haz clic para copiar"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                servicioalclientegaf@outlook.com
                                            </p>
                                        </span>
                                        
                                        {copied && (
                                            <span className="copied-indicator">
                                                ¡Copiado!
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="contact-card">
                                <div className="contact-card-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="contact-card-content">
                                    <h3 className="contact-card-title">Ubicaciones</h3>
                                    <p className="contact-card-subtitle">Visítanos en persona</p>
                                    <a 
                                        href="/sucursales" 
                                        className="contact-card-link"
                                    >
                                        Ver todas las sucursales
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <div className="form-container">
                            <div className="form-header">
                                <h2 className="form-title">Envíanos un Mensaje</h2>
                                <p className="form-description">
                                    Completa el formulario y nos pondremos en contacto contigo
                                </p>
                            </div>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="nombre" className="form-label">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            className="form-input"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Nombre"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="apellido" className="form-label">
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            className="form-input"
                                            value={formData.apellido}
                                            onChange={handleChange}
                                            placeholder="Apellido"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="telefono" className="form-label">
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            id="telefono"
                                            name="telefono"
                                            className="form-input"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            placeholder="8585-8526"
                                            maxLength={8}
                                            pattern="\d{8}"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="asunto" className="form-label">
                                            Asunto *
                                        </label>
                                        <input
                                            type="text"
                                            id="asunto"
                                            name="asunto"
                                            className="form-input"
                                            value={formData.asunto}
                                            onChange={handleChange}
                                            placeholder="¿De qué se trata?"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje" className="form-label">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        className="form-textarea"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="Cuéntanos más detalles sobre tu consulta..."
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-actions">
                                    <CTAButton
                                        variant="primary"
                                        disabled={isLoading}
                                        className="submit-button"
                                        ariaLabel="Enviar formulario de contacto"
                                    >
                                        {isLoading ? "Enviando..." : "Enviar Mensaje"}
                                    </CTAButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contactanos;