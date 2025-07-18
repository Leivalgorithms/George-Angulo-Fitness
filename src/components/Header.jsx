import React, { useState } from "react";
import './css/Header.css';
import logo from '../assets/logoNoBg.png'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return(
        <header className="header">
            <div className="header-container">
                    <a href="/">
                        <img src={logo} alt="Logo" className="h-20" />
                    </a>

                <button 
                className={`hamburger ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
                aria-label="Toggle mennu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav>
                    <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
                        <a href="/blog">Blog</a>
                        <a href="/sucursales">Sucursales</a>
                        <a href="/planes">Planes</a>
                        <a href="/servicios">Servicios</a>
                        <a href="/contactos">Contactos</a>
                    </ul>
                </nav>
            </div>
    </header>
    );
}

export default Header;