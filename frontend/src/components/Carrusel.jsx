import React, { useState, useEffect } from 'react';
import './css/Carrusel.css';

const Carrusel = ({ imagenes = [] }) => {
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndice((prev) => (prev + 1) % imagenes.length);
        }, 3000);
        return () => clearInterval(intervalo);
    }, [imagenes.length]);

    if (!imagenes.length) {
        return <div className="foto-placeholder">Sin imágenes</div>;
    }

    return (
        <div className="carrusel">
            <img src={imagenes[indice]} alt={`Imagen ${indice + 1}`} className="carrusel-imagen" />
        </div>
    );
};

export default Carrusel;
