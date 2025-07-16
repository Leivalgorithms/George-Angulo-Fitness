import React, { useState } from "react";
import './css/Header.css';
import logo from '../assets/logoNoBg.png'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return(
        <header className="header">
            <div className="header-container">
                <h1 className="logo">
                    <img src={logo} alt="Logo" className="h-20" />
                </h1>

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
                        <li>Blog</li>
                        <li>Sucursales</li>
                        <li>Planes</li>
                        <li>Servicios</li>
                        <li>Contactos</li>
                    </ul>
                </nav>
            </div>
    </header>
    );
}

export default Header;