import React, { useState, useEffect } from 'react';
import './css/Carrusel.css';

const Carrusel = ({ imagenes = [] }) => {
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndice((prev) => (prev + 1) % imagenes.length);
        }, 5000);
        return () => clearInterval(intervalo);
    }, [imagenes.length]);

    if (!imagenes.length) {
        return <div className="foto-placeholder">Sin imágenes</div>;
    }

    return (
        <div className="carrusel">
            <div className="carrusel-imagen-wrapper">
                {imagenes.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Imagen ${i + 1}`}
                        className={`carrusel-imagen ${i === indice ? 'activa' : ''}`}
                    />
                ))}
            </div>
            <div className="carrusel-indicadores">
                {imagenes.map((_, i) => (
                    <span
                        key={i}
                        className={`indicador ${i === indice ? 'activo' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrusel;
