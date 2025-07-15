import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/css/Sucursales.css';

const SucursalCard = ({ nombre, provincia, telefono, horarios }) => {
    return (
        <div className="sucursal-card">
            <div className="card-header">
                <h2 className="card-title">{nombre}</h2>
                <span className="card-phone">
                    Teléfono: <a href={`tel:${telefono}`}>{telefono}</a>
                </span>
            </div>
            <div className="card-hours">
                <p className="card-province"><strong>Provincia:</strong> {provincia}</p>
                {horarios.map((h, index) => (
                    <p key={index}>
                        <strong>{h.dia}:</strong> {h.hora}
                    </p>
                ))}
            </div>
            <Link
                to={`/sucursales/${encodeURIComponent(nombre)}`}
                className="sucursal-boton"
            >
                Ver esta sede
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </Link>
        </div>
    );
}

export default SucursalCard;