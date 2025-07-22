import { useState } from 'react';
import {
    FaDumbbell,
    FaHeart,
    FaShoppingCart,
    FaSuperpowers,
    FaTag,
    FaTruck,
    FaWater
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import equipoImg from '../assets/equipo-gimnasio.png';
import productosImg from '../assets/productos-ventas.png';
import CTAButton from '../components/CTAButton';
import EquipmentItem from '../components/EquipmentItem';
import FeatureCard from '../components/FeatureCard';
import ProductCard from '../components/ProductCard';
import './css/Servicios.css';

const ServicesPage = () => {
    const navigate = useNavigate();
    const [activeService, setActiveService] = useState('productos');
    const [imageLoaded, setImageLoaded] = useState(false);

    // Datos de servicios
    const services = {
        productos: {
            id: 'productos',
            title: 'Ventas de Productos',
            subtitle: 'Suplementos y Nutrición Deportiva',
            description: 'Ofrecemos una amplia gama de productos nutricionales de alta calidad para complementar tu entrenamiento y alcanzar tus objetivos fitness.',
            image: productosImg,
            icon: FaShoppingCart,
            features: [
                {
                    icon: FaWater,
                    title: 'Hidratación Premium',
                    description: 'Agua purificada y bebidas deportivas'
                },
                {
                    icon: FaSuperpowers,
                    title: 'Suplementos Elite',
                    description: 'Proteínas y aminoácidos de calidad superior'
                },
                {
                    icon: FaHeart,
                    title: 'Nutrición Integral',
                    description: 'Productos para bienestar completo'
                }
            ],
            products: [
                {
                    name: 'Agua 650 ml + Scoop Aminoenergy',
                    price: '₡1.300',
                    featured: true
                },
                {
                    name: 'Agua 1000 ml + Scoop Aminoenergy',
                    price: '₡1.500',
                    featured: false
                },
                {
                    name: 'Scoop Iso 100 Vainilla o Chocolate',
                    price: '₡1.000',
                    featured: true
                },
                {
                    name: 'Scoop C4',
                    price: '₡1.000',
                    featured: false
                },
                {
                    name: 'Agua 650 ml',
                    price: '₡800',
                    featured: false
                },
                {
                    name: 'Hidratante Gatorade',
                    price: '₡1.200',
                    featured: false
                }
            ]
        },
        equipo: {
            id: 'equipo',
            title: 'Venta de Equipo de Gimnasio',
            subtitle: 'Equipamiento Profesional para Fitness',
            description: 'En nuestra sala de exhibición encontrarás el mejor equipo de gimnasio, desde máquinas de cardio hasta peso libre, todo con la garantía de calidad que necesitas.',
            image: equipoImg,
            icon: FaDumbbell,
            features: [
                {
                    icon: FaDumbbell,
                    title: 'Equipo Profesional',
                    description: 'Equipo nuevo, innovador y variado'
                },
                {
                    icon: FaTruck,
                    title: 'Entrega Nacional',
                    description: 'Servicio a todo el país'
                },
                {
                    icon: FaTag,
                    title: 'Precios Competitivos',
                    description: 'Las mejores ofertas del mercado'
                }
            ],
            equipment: [
                'Equipo nuevo, innovador y variado',
                'Equipo de cardio: caminadoras, elípticas, escaladoras y bicicletas de spinning',
                'Máquinas de peso libre para entrenamiento completo',
                'Mancuernas y discos',
                'Gran variedad de barras y accesorios',
                'Colchonetas',
                'Hule para piso de excelente calidad y grosor',
                'Servicio de entrega a cualquier parte a nivel nacional',
                'Precios competitivos'
            ],
            contact: {
                phone: '8480-3030',
                company: 'MUNDO FIT DE CENTROAMÉRICA'
            }
        }
    };

    // Handlers
    const handleServiceChange = (serviceId) => {
        setActiveService(serviceId);
        setImageLoaded(false);
    };

    const handleNavigateToSucursales = () => {
        navigate('/sucursales');
    };

    const handleNavigateToContact = () => {
        navigate('/contactos');
    };

    const handleQuoteRequest = () => {
        navigate('/contactos');
    };

    // Servicio actual
    const currentService = services[activeService];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-content">
                    <h1 className="services-hero-title">
                        Nuestros <span className="highlight">Servicios</span>
                    </h1>
                    <p className="services-hero-description">
                        Descubre toda la gama de productos y equipos que tenemos disponibles 
                        para potenciar tu experiencia fitness y alcanzar tus objetivos.
                    </p>
                </div>
            </section>

            {/* Services Navigation */}
            <section className="services-nav">
                <div className="services-nav-container">
                    {Object.values(services).map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <button
                                key={service.id}
                                className={`service-nav-button ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => handleServiceChange(service.id)}
                                aria-label={`Cambiar a ${service.title}`}
                            >
                                <IconComponent className="service-nav-icon" />
                                <span className="service-nav-text">{service.title}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Service Content */}
            <section className="service-content">
                <div className="service-container">
                    {/* Service Header */}
                    <div className="service-header">
                        <div className="service-text">
                            <h2 className="service-title">{currentService.title}</h2>
                            <h3 className="service-subtitle">{currentService.subtitle}</h3>
                            <p className="service-description">{currentService.description}</p>
                        </div>
                        <div className="service-image">
                            <img 
                                src={currentService.image} 
                                alt={currentService.title}
                                className={`service-img ${imageLoaded ? 'loaded' : 'loading'}`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Service Features */}
                    <div className="service-features">
                        <h4 className="features-title">Características Destacadas</h4>
                        <div className="features-grid">
                            {currentService.features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Products or Equipment List */}
                    {activeService === 'productos' ? (
                        <div className="products-section">
                            <h4 className="section-title">Productos Disponibles</h4>
                            <div className="products-grid">
                                {currentService.products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        name={product.name}
                                        price={product.price}
                                        featured={product.featured}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="equipment-section">
                            <h4 className="section-title">Equipos Disponibles</h4>
                            <div className="equipment-list">
                                {currentService.equipment.map((item, index) => (
                                    <EquipmentItem 
                                        key={index}
                                        text={item}
                                    />
                                ))}
                            </div>
                            
                            {/* Contact Info - Integrado en la página */}
                            <div className="contact-info">
                                <h5 className="contact-title">Información de Contacto</h5>
                                <p className="contact-detail">
                                    <strong>Teléfono:</strong> {currentService.contact.phone}
                                </p>
                                <p className="contact-detail">
                                    <strong>Empresa:</strong> {currentService.contact.company}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="service-cta">
                        <h4 className="cta-title">
                            {activeService === 'productos' ? 
                                '¿Listo para potenciar tu rendimiento?' : 
                                '¿Necesitas equipar tu gimnasio?'
                            }
                        </h4>
                        <p className="cta-description">
                            {activeService === 'productos' ? 
                                'Visita nuestras sucursales y descubre todos nuestros productos.' : 
                                'Contáctanos para una cotización personalizada.'
                            }
                        </p>
                        <div className="cta-buttons">
                            <CTAButton 
                                variant="primary"
                                onClick={activeService === 'productos' ? handleNavigateToSucursales : handleQuoteRequest}
                                ariaLabel={activeService === 'productos' ? 'Ir a página de sucursales' : 'Solicitar cotización de equipos'}
                            >
                                {activeService === 'productos' ? 'Ver Sucursales' : 'Solicitar Cotización'}
                            </CTAButton>
                            <CTAButton
                                variant="secondary"
                                className='light-bg'
                                onClick={handleNavigateToContact}
                                ariaLabel="Ir a página de contacto"
                            >
                                Contactar
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;