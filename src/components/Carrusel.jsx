import { useEffect, useState } from 'react';
import './css/Carrusel.css';

const Carrusel = ({ imagenes = [] }) => {
    const [indice, setIndice] = useState(0);

    useEffect(() => {
        if (imagenes.length > 1) {
            const intervalo = setInterval(() => {
                setIndice((prev) => (prev + 1) % imagenes.length);
            }, 5000);
            return () => clearInterval(intervalo);
        }
    }, [imagenes.length]);

    const cambiarImagen = (nuevoIndice) => {
        setIndice(nuevoIndice);
    };

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
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ))}
            </div>

            {imagenes.length > 1 && (
                <div className="carrusel-indicadores">
                    {imagenes.map((_, i) => (
                        <span
                            key={i}
                            className={`indicador ${i === indice ? 'activo' : ''}`}
                            onClick={() => cambiarImagen(i)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ir a imagen ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Carrusel;