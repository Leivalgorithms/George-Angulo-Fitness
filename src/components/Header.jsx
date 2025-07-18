import { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logoNoBg.png';
import './css/Header.css';

// Constantes
const MENU_ITEMS = [
  { id: "blog", name: "Blog", href: "/blog" },
  { id: "sucursales", name: "Sucursales", href: "/sucursales" },
  { id: "planes", name: "Planes", href: "/planes" },
  { id: "servicios", name: "Servicios", href: "/servicios" },
  { id: "contactos", name: "Contactos", href: "/contactos" }
];

const SOCIAL_LINKS = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/GimnasiosGeorgeAnguloFitness/?locale=es_LA",
    icon: FaFacebookF
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/georgeangulofitness/?hl=es",
    icon: FaInstagram
  }
];

const CONTACT_INFO = [
  {
    id: "phone",
    text: "Teléfono:",
    icon: FaPhone
  },
  {
    id: "email",
    text: "Email:",
    icon: FaEnvelope
  },
  {
    id: "location",
    text: "Costa Rica",
    icon: FaMapMarkerAlt
  }
];

const HEADER_CONFIG = {
  logoAlt: "Logo George Angulo Fitness",
  menuAriaLabel: "Toggle menu"
};

// Componente Header unificado
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);
  
  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);
  
  // Controlar scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);
  
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-container">
          
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logo}
                alt={HEADER_CONFIG.logoAlt}
                className="logo-image"
              />
            </Link>
          </div>
          
          {/* Navegación Desktop */}
          <nav className="desktop-nav">
            <ul className="nav-menu-desktop">
              {MENU_ITEMS.map(item => (
                <li key={item.id} className="nav-item-desktop">
                  <Link
                    to={item.href}
                    className="nav-link-desktop"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Botón Hamburguesa */}
          <div className="mobile-menu-button">
            <button
              className={`hamburger ${menuOpen ? "hamburger--active" : ""}`}
              onClick={toggleMenu}
              aria-label={HEADER_CONFIG.menuAriaLabel}
              aria-expanded={menuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
          
        </div>
      </header>

      {/* Logo móvil flotante - separado del header principal */}
      <div className="mobile-logo-container">
        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt={HEADER_CONFIG.logoAlt}
            className="mobile-logo-image"
          />
        </Link>
      </div>
     
      {/* Menú Móvil */}
      <div className={`mobile-menu-expansion ${menuOpen ? "mobile-menu-expansion--open" : ""}`}>
        <div className="mobile-menu-header">
        </div>
        <div className="mobile-menu-content">
          <nav className="mobile-nav">
            <ul className="nav-menu-mobile">
              {MENU_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className="nav-item-mobile"
                >
                  <Link
                    to={item.href}
                    className="nav-link-mobile"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer del menú móvil */}
          <div className="mobile-menu-footer">
            <h3 className="mobile-menu-footer-title">Síguenos</h3>
           
            <div className="mobile-menu-social">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="mobile-menu-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
           
            <div className="mobile-menu-contact">
              {CONTACT_INFO.map((contact) => {
                const IconComponent = contact.icon;
                return (
                  <div key={contact.id} className="mobile-menu-contact-item">
                    <IconComponent className="mobile-menu-contact-icon" />
                    <span>{contact.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;