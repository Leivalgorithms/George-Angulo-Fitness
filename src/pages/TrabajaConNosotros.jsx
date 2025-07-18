import React from "react";
import "./css/TrabajaConNosotros.css";
import logo from "../assets/logoNoBg.png";

const TrabajaConNosotros = () => {
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

                <div className="trabaja-form-container">
                    <h1>Unite a nuestro equipo</h1>
                    <form className="trabaja-form">
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Apellido" />
                        <input type="email" placeholder="Correo" />
                        <input type="tel" placeholder="Telefono" />
                        <input type="file" />
                        <textarea placeholder="Cuentanos brevemente un poco de ti" rows={4}></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TrabajaConNosotros;
