import { FaArrowRight, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CTAButton from './CTAButton';
import './css/SucursalesCard.css';

const SucursalCard = ({ nombre, provincia, telefono, direccion, horarios, tarifas }) => {
    const navigate = useNavigate();

    const handleVerSede = () => {
        navigate(`/sucursales/${encodeURIComponent(nombre)}`);
    };
    return (
        <div className="sucursal-card">
            <div className="card-header">
                {/* Información principal - lado izquierdo */}
                <div className="card-info-left">
                    <h2 className="card-title">{nombre}</h2>
                    
                    <div className="card-province">
                        <FaMapMarkerAlt className="card-icon" />
                        <span>{provincia}</span>
                    </div>
                    
                    <div className="card-phone">
                        <FaPhone className="card-icon" />
                        <a href={`tel:${telefono}`} className="phone-link">
                            {telefono}
                        </a>
                    </div>
                    
                    {direccion && (
                        <div className="card-address">
                            <span>{direccion}</span>
                        </div>
                    )}
                </div>

                {/* Horarios - lado derecho */}
                <div className="card-info-right">
                    <div className="card-schedule">
                        {horarios && horarios.length > 0 ? (
                            horarios.map((horario, index) => (
                                <div key={index} className="schedule-item">
                                    <span className="day">{horario.dia}</span>
                                    <span className="time">{horario.hora}</span>
                                </div>
                            ))
                        ) : (
                            <div className="schedule-item">
                                <span className="day">Horarios</span>
                                <span className="time">Consultar</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón de acción */}
                <div className="card-action">
                    <CTAButton
                        variant="primary"
                        onClick={handleVerSede}
                        ariaLabel={`Ver detalles de la sucursal ${nombre}`}
                        className="card-cta-button"
                    >
                        <span className="button-text">Ver sede</span>
                        <FaArrowRight className="button-icon" />
                    </CTAButton>
                </div>
            </div>
        </div>
    );
};

export default SucursalCard;