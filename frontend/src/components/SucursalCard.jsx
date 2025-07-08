import React from 'react';
import '../pages/css/Sucursales.css';
import { Link } from 'react-router-dom';

const SucursalCard = ({ nombre,provincia, telefono, horarios }) => {
    return (
        <div className="sucursal-card">
            <div className="card-header">
                <h2 className="card-title">{nombre}</h2>
                <span className="card-phone">
                    Teléfono: <a href={`tel:${telefono}`}>{telefono}</a>
                </span>
            </div>
            <p className='card-prov'>
                <span className="prov-bold">Provincia: </span> 
                {provincia}
            </p>
            <div className="card-hours">
                {horarios.map((h, index) => (
                    <p key={index}>
                        <strong>{h.dia}:</strong> {h.hora}
                    </p>
                ))}
            </div>
            <button className="sucursal-boton">
                <Link to={`/sucursal/${encodeURIComponent(nombre)}`}>
                ver esta Sede
                </Link>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </div>
    );
}

export default SucursalCard;