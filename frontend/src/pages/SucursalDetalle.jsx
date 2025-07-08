import React from 'react';
import { useParams } from 'react-router-dom';
import sedes from '../data/sedes';
import './css/SucursalDetalle.css';

const SucursalDetalle = () => {
    const { nombre } = useParams();
    const sucursal = sedes.find(s => s.nombre === decodeURIComponent(nombre));

    if (!sucursal) {
        return <div className="error-msg">Sucursal no encontrada</div>;
    }

    return (
        <div className="sucursal-detalle-container">
            <h1 className="sucursal-nombre">{sucursal.nombre}</h1>
            
            <section className="sucursal-info">
                <p><strong>Provincia:</strong> {sucursal.provincia}</p>
                <p>
                    <strong>Teléfono:</strong>{' '}
                    <a href={`tel:${sucursal.telefono}`} className="sucursal-telefono">
                        {sucursal.telefono}
                    </a>
                </p>
            </section>

            <section className="sucursal-horarios">
                <h2>Horarios de Atención</h2>
                {sucursal.horarios.map((h, i) => (
                    <article key={i} className="horario-item">
                        <strong>{h.dia}:</strong> {h.hora}
                    </article>
                ))}
            </section>
        </div>
    );
};

export default SucursalDetalle;
