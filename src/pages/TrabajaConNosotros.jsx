import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaHeart, FaTrophy, FaUpload, FaUsers } from 'react-icons/fa';
import logo from "../assets/logoNoBg.png";
import CTAButton from '../components/CTAButton';
import "./css/TrabajaConNosotros.css";

const TrabajaConNosotros = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        file: null,
        mensaje: "",
    });

    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        emailjs.init("xA96CzGZbjiD1oHn1");
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData({
                ...formData,
                file: e.dataTransfer.files[0]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { nombre, apellido, telefono, correo, mensaje, file } = formData;

        // Validación mejorada
        if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !correo.trim() || !mensaje.trim() || !file) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "Por favor completa todos los campos y adjunta tu CV." 
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

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.trim())) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "Por favor ingresa un correo electrónico válido." 
            });
            setIsLoading(false);
            return;
        }

        // Validación de archivo
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (file.size > maxSize) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "El archivo debe ser menor a 10MB." 
            });
            setIsLoading(false);
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            setFeedback({ 
                tipo: "error", 
                mensaje: "Solo se permiten archivos PDF o Word." 
            });
            setIsLoading(false);
            return;
        }

        try {
            const server = "store1";
            const uploadData = new FormData();
            uploadData.append("file", file);

            const uploadRes = await fetch(`https://${server}.gofile.io/uploadFile`, {
                method: "POST",
                body: uploadData,
            });

            const uploadJson = await uploadRes.json();
            if (uploadJson.status !== "ok") {
                throw new Error(`Error al subir el archivo: ${uploadJson.status}`);
            }

            const fileUrl = uploadJson.data.downloadPage;

            const templateParams = {
                nombre,
                apellido,
                telefono,
                correo,
                mensaje,
                archivo_url: fileUrl,
            };

            await emailjs.send("service_2g38xta", "template_p5pay2g", templateParams);

            setFeedback({ 
                tipo: "success", 
                mensaje: "¡Aplicación enviada exitosamente! Te contactaremos pronto." 
            });

            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                correo: "",
                file: null,
                mensaje: "",
            });

        } catch (error) {
            console.error("Error:", error);
            setFeedback({ 
                tipo: "error", 
                mensaje: `Error al enviar la aplicación: ${error.message}` 
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    return (
        <div className="trabaja-page">
            {/* Hero Section */}
            <section className="trabaja-hero">
                <div className="trabaja-hero-content">
                    <h1 className="trabaja-hero-title">
                        Únete a <span className="highlight">Nuestro Equipo</span>
                    </h1>
                    <p className="trabaja-hero-description">
                        Forma parte de la familia George Angulo Fitness y ayuda a transformar vidas 
                        mientras construyes tu carrera profesional en el mundo del fitness.
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
            <section className="trabaja-content">
                <div className="trabaja-container">
                    {/* Company Info Section */}
                    <div className="company-info-section">
                        <div className="logo-container">
                            <img src={logo} alt="George Angulo Fitness" className="company-logo" />
                        </div>
                        
                        <div className="company-description">
                            <h2 className="company-title">
                                ¡Únete a George <span className="highlight">Angulo</span> Fitness!
                            </h2>
                            <p className="company-text">
                                En nuestros gimnasios nos sentimos orgullosos de ser una gran familia. 
                                Buscamos personas apasionadas por el fitness que quieran crecer profesionalmente 
                                mientras ayudan a otros a alcanzar sus objetivos.
                            </p>
                        </div>

                        {/* Benefits Cards */}
                        <div className="benefits-section">
                            <h3 className="benefits-title">¿Por qué trabajar con nosotros?</h3>
                            <div className="benefits-grid">
                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FaUsers />
                                    </div>
                                    <h4 className="benefit-title">Ambiente Familiar</h4>
                                    <p className="benefit-description">
                                        Trabajo en equipo y compañerismo en un ambiente positivo
                                    </p>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FaTrophy />
                                    </div>
                                    <h4 className="benefit-title">Crecimiento Profesional</h4>
                                    <p className="benefit-description">
                                        Oportunidades de desarrollo y capacitación constante
                                    </p>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FaHeart />
                                    </div>
                                    <h4 className="benefit-title">Propósito</h4>
                                    <p className="benefit-description">
                                        Ayuda a transformar vidas y promueve hábitos saludables
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="application-form-section">
                        <div className="form-container">
                            <div className="form-header">
                                <h2 className="form-title">Envía tu Aplicación</h2>
                                <p className="form-description">
                                    Completa el formulario y adjunta tu CV para comenzar el proceso
                                </p>
                            </div>

                            <form className="application-form" onSubmit={handleSubmit}>
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
                                        <label htmlFor="correo" className="form-label">
                                            Correo Electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            id="correo"
                                            name="correo"
                                            className="form-input"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            placeholder="email@ejemplo.com"
                                            required
                                        />
                                    </div>
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
                                </div>

                                {/* File Upload */}
                                <div className="form-group">
                                    <label className="form-label">
                                        Curriculum Vitae *
                                    </label>
                                    <div 
                                        className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${formData.file ? 'has-file' : ''}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="file"
                                            name="file"
                                            className="file-input"
                                            onChange={handleChange}
                                            accept=".pdf,.doc,.docx"
                                            required
                                        />
                                        <label htmlFor="file" className="file-upload-label">
                                            <FaUpload className="upload-icon" />
                                            <div className="upload-text">
                                                {formData.file ? (
                                                    <>
                                                        <span className="file-name">{formData.file.name}</span>
                                                        <span className="file-size">
                                                            ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="upload-main">Arrastra tu CV aquí o haz clic para seleccionar</span>
                                                        <span className="upload-sub">PDF, DOC o DOCX (máx. 10MB)</span>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mensaje" className="form-label">
                                        Cuéntanos sobre ti *
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        className="form-textarea"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        placeholder="Describe tu experiencia, motivación y por qué te gustaría trabajar con nosotros..."
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-actions">
                                    <CTAButton
                                        variant="primary"
                                        disabled={isLoading}
                                        className="submit-button"
                                        ariaLabel="Enviar aplicación de trabajo"
                                    >
                                        {isLoading ? "Enviando..." : "Enviar Aplicación"}
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

export default TrabajaConNosotros;