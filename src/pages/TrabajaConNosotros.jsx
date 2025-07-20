import React, { useState, useEffect } from "react";
import "./css/TrabajaConNosotros.css";
import logo from "../assets/logoNoBg.png";
import emailjs from "@emailjs/browser";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, apellido, telefono, correo, mensaje, file } = formData;

        // Validate all required fields
        if (!nombre || !apellido || !telefono || !correo || !mensaje || !file) {
            setFeedback({ tipo: "error", mensaje: "Por favor completa todos los campos." });
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

            // Step 3: Send data via EmailJS
            const templateParams = {
                nombre,
                apellido,
                telefono,
                correo,
                mensaje,
                archivo_url: fileUrl,
            };

            await emailjs.send("service_2g38xta", "template_p5pay2g", templateParams);

            setFeedback({ tipo: "success", mensaje: "Formulario enviado correctamente con archivo." });

            // Reset form
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
            setFeedback({ tipo: "error", mensaje: `Error al enviar el formulario: ${error.message}` });
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
                    <h2>
                        ¡Unite a George <span className="highlight">Angulo</span> Fitness!
                    </h2>
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
                            placeholder="Teléfono"
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
                            onChange={handleChange}
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