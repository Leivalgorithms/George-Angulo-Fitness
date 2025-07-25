import { FaClock, FaDumbbell, FaHome, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import './css/NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoSucursales = () => {
        navigate('/sucursales');
    };

    return (
        <div className="error-page">
            <div className="error-content">
                {/* Código de error */}
                <div className="error-code">404</div>

                {/* Título */}
                <h1 className="error-title">Página no encontrada</h1>

                {/* Mensaje */}
                <p className="error-message">
                    La página que buscas no existe o ha sido movida.
                    Regresa al inicio y continúa explorando nuestro gym.
                </p>

                {/* Botones principales usando tu componente CTAButton */}
                <div className="error-buttons">
                    <CTAButton
                        variant="primary"
                        onClick={handleGoHome}
                        className="cta-button-404"
                        ariaLabel="Ir a la página principal"
                    >
                        <FaHome />
                        Ir al Inicio
                    </CTAButton>

                    <CTAButton
                        variant="secondary"
                        onClick={handleGoSucursales}
                        className="light-bg cta-button-404"
                        ariaLabel="Ver página de servicios"
                    >
                        <FaDumbbell />
                        Ver Sucursales
                    </CTAButton>
                </div>

                {/* Links rápidos minimalistas */}
                <div className="quick-links">
                    <a href="/horarios" className="quick-link" aria-label="Ver horarios">
                        <FaClock className="quick-link-icon" />
                        <span className="quick-link-text">Horarios</span>
                    </a>

                    <a href="/clases" className="quick-link" aria-label="Ver clases disponibles">
                        <FaUsers className="quick-link-icon" />
                        <span className="quick-link-text">Clases</span>
                    </a>

                    <a href="/membresias" className="quick-link" aria-label="Ver planes de membresía">
                        <FaDumbbell className="quick-link-icon" />
                        <span className="quick-link-text">Planes</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;