import React from 'react';
import './css/Footer.css';
import logo from '../assets/logoNoBg.png';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="footer-contact">
                    <h3>Contacto</h3>
                    <p>Costa Rica</p>
                    <p>Teléfono:</p>
                    <p>Email:</p>
                    <a className='chamba' href="" target="_blank" rel="noopener noreferrer"> Trabaja con Nosotros</a>
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
