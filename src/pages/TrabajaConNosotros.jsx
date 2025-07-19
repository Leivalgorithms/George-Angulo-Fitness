import React from "react";
import { useState, useEffect } from "react";
import "./css/TrabajaConNosotros.css";
import logo from "../assets/logoNoBg.png";

const TrabajaConNosotros = () => {

    const [formData, setFormData] = useState({
        nombre: "",
        apellid: "",
        telefono: "",
        correo: "",
        file: "",
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

        const { nombre, apellido, telefono, correo, file, mensaje } = formData;

        if (!nombre || !apellido || !telefono || !correo || !file || !mensaje) {
            setFeedback({ tipo: "error", mensaje: "Por favor completa todos los campos." });
        } else {
            setFeedback({ tipo: "success", mensaje: "¡Formulario enviado exitosamente!" });
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                correo: "",
                file: "",
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

    return (
        <div className="trabaja-section">
            <div className="trabaja-container">
                <div className="trabaja-left">
                    <h2>¡Unite a George <span className="highlight">Angulo</span> Fitness!</h2>
                    <img src={logo} alt="George Angulo Fitness" className="trabaja-logo" />
                    <p>
                        En nuestros gimnasios nos sentimos orgullosos de ser una gran familia.
                        <br />
                        ¡Esperamos que pronto formes parte de ella!
                    </p>
                </div>

                {feedback && (
                    <div className={`floating-feedback ${feedback.tipo}`}>
                        {feedback.mensaje}
                    </div>
                )}

                <div className="trabaja-form-container">
                    <h1>Unite a nuestro equipo</h1>
                    <form className="trabaja-form" onSubmit={handleSubmit}>
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
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
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
                        <label htmlFor="file" className="custom-file-label">
                            {formData.file ? formData.file.name : "Sube tu archivo"}
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="hidden-file-input"
                            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                        />
                        <textarea
                            name="mensaje"
                            placeholder="Cuéntanos brevemente un poco de ti"
                            rows={4}
                            value={formData.mensaje}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit">Enviar</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default TrabajaConNosotros;
