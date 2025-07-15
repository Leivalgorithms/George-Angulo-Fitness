import React, { useState, useEffect } from "react";
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, apellido, telefono, asunto, mensaje } = formData;

        if (!nombre || !apellido || !telefono || !asunto || !mensaje) {
            setFeedback({ tipo: "error", mensaje: "Por favor completa todos los campos." });
        } else {
            setFeedback({ tipo: "success", mensaje: "¡Formulario enviado exitosamente!" });
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                asunto: "",
                mensaje: ""
            });
        }
    };

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('servicioalclientegaf@outlook.com')
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            })
            .catch((err) => {
                console.error('Error al copiar el correo: ', err);
            })
    }

    return (
        <>
            <div className="contactanos-container">
                <div className="contactanos-left">
                    <h1>Pongámonos en contacto</h1>
                    <p>¡Cuéntanos de tu experiencia!</p>
                    <p><strong>Teléfono:</strong></p>
                    <p>8585-8526</p>
                    <p><strong>Correo:</strong></p>
                    <p
                        onClick={handleCopyEmail}
                        className="email-copy"
                        title="Haz clic para copiar"
                        style={{ cursor: 'pointer' }}
                    >
                        servicioalclientegaf@outlook.com
                    </p>
                    {copied && (
                        <p className="copied-message">El correo se ha copiado exitosamente</p>
                    )}
                </div>
                {feedback && (
                    <div className={`floating-feedback ${feedback.tipo}`}>
                        {feedback.mensaje}
                    </div>
                )}

                <div className="contactanos-card">
                    <h2>Contáctanos</h2>
                    <form className="contactanos-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                maxLength={8}
                                pattern="\d{8}"
                                title="Debe ingresar exactamente 8 números"
                            />
                            <input
                                type="text"
                                name="asunto"
                                placeholder="Asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                            />
                        </div>
                        <textarea
                            name="mensaje"
                            placeholder="Cuéntanos un poco más"
                            rows={4}
                            value={formData.mensaje}
                            onChange={handleChange}
                        ></textarea>

                        <div className="btn-wrapper">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contactanos;
