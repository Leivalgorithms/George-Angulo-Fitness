import React, { useState } from 'react';
import './css/Footer.css';
import logo from '../assets/logoNoBg.png';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {

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
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <a href="/">
                        <img src={logo} alt="Logo" />
                    </a>

                </div>
                <div className="footer-contact">
                    <h3>Contacto</h3>
                    <p>Costa Rica</p>
                    <p>Teléfono: 8585-8526</p>
                    <p
                        onClick={handleCopyEmail}
                        className="email-copy"
                        title="Haz clic para copiar"
                        style={{ cursor: 'pointer' }}
                    >
                        Email: servicioalclientegaf@outlook.com
                    </p>
                    <Link className='chamba' to='/trabaja-con-nosotros'>
                        Trabaja con Nosotros
                    </Link>
                    {copied && (
                        <p className="copied-message">El correo se ha copiado exitosamente</p>
                    )}
                </div>
                <div className="footer-social">
                    <h3>Síguenos</h3>
                    <a href="https://www.facebook.com/GimnasiosGeorgeAnguloFitness/?locale=es_LA" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
                    <a href="https://www.instagram.com/georgeangulofitness/?hl=es" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} George Angulo Fitness.</p>
            </div>
        </footer>
    );
};

export default Footer;
