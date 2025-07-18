import 'leaflet/dist/leaflet.css';
import { FaDumbbell, FaHeart, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import gym from '../assets/Gym.png';
import logo from '../assets/logoNoBg.png';
import './css/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    
    const handleNavigateToSucursales = () => {
        navigate('/sucursales');
    };
    
    const handleNavigateToAbout = () => {
        navigate('/sobre-nosotros');
    };23

    const features = [
        {
            icon: FaUsers,
            title: "Instructores Capacitados",
        },
        {
            icon: FaDumbbell,
            title: "Equipo Tecnológico", 
        },
        {
            icon: FaHeart,
            title: "Bienestar Integral",
        }
    ];

    return (        
        <div className="home">
            <section className="hero">
                <img 
                    className="img-bg" 
                    src={gym} 
                    alt="Gimnasio George Angulo Fitness" 
                />                
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-brand">
                            <img 
                                className="hero-logo" 
                                src={logo} 
                                alt="George Angulo Fitness Logo" 
                            />
                        </div>
                        
                        <div className="hero-text">
                            <h1 className="hero-title">
                                ENTRENA CON PROPÓSITO,{' '}
                                <span className="hero-title--highlight">
                                    TRANSFORMA TU VIDA
                                </span>
                            </h1>
                            
                            <p className="hero-description">
                                Somos un centro de acondicionamiento físico donde combinas equipo tecnológico, 
                                instructores capacitados y ambientes agradables, todo en un mismo lugar. Contamos 
                                con terapeuta físico y nutricionista.
                            </p>
                            
                            <div className="hero-actions">
                                <button 
                                    className="hero-button hero-button--primary" 
                                    onClick={handleNavigateToSucursales}
                                    aria-label="Ver todas nuestras sucursales"
                                >
                                    Ver Sucursales
                                </button>
                                <button 
                                    className="hero-button hero-button--secondary" 
                                    onClick={handleNavigateToAbout}
                                    aria-label="Conocer más sobre nosotros"
                                >
                                    Sobre Nosotros
                                </button>
                            </div>
                        
                        {/**
                            <div className="hero-features">
                                {features.map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <div key={index} className="feature-card">
                                            <div className="feature-icon">
                                                <IconComponent />
                                            </div>
                                            <div className="feature-content">
                                                <h3 className="feature-title">{feature.title}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                             */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;