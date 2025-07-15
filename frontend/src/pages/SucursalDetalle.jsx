import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/SucursalDetalle.css';
import PlanesCard from '../components/PlanesCard';
import Carrusel from '../components/Carrusel';

const SucursalDetalle = () => {
    const { nombre } = useParams();
    const [sucursal, setSucursal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/sucursales/${encodeURIComponent(nombre)}`)
            .then(res => {
                if (res.data) {
                    setSucursal(res.data);
                } else {
                    setError('Sucursal no encontrada');
                }
            })
            .catch(() => setError('Error al cargar la sucursal'))
            .finally(() => setLoading(false));
    }, [nombre]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    const tarifasAdaptadas = (sucursal.tarifas || []).map((t) => ({
        tipo: t.tipo.replace(/_/g, ' '),
        monto: t.monto,
        moneda: t.moneda,
        beneficios: t.beneficios || [],
        destacado: t.tipo.toLowerCase().includes('destacado')
    }));

    return (
        <div className="sucursal-detalle-container">
            <h1 className="sucursal-nombre">{sucursal.nombre}</h1>

            <section className="sucursal-layout">
                <div className="sucursal-info-box">
                    <p><strong>Provincia:</strong> {sucursal.provincia}</p>
                    <p>
                        <strong>Teléfono:</strong>{' '}
                        <a href={`tel:${sucursal.telefono}`} className="sucursal-telefono">
                            {sucursal.telefono}
                        </a>
                    </p>
                    <p><strong>Dirección:</strong><br />{sucursal.direccion}</p>
                </div>

                <div className="sucursal-fotos">
                    <Carrusel imagenes={sucursal.imagenes || []} />
                </div>
            </section>


            <section className="sucursal-horarios">
                <h2 className="horarios-titulo">
                    <span className="barra-decorativa" /> Horarios de Atención
                </h2>
                {(sucursal.horarios || []).map((h, i) => (
                    <article key={i} className="horario-item">
                        <strong>{h.dia}:</strong> {h.hora}
                    </article>
                ))}
            </section>

            <section className="sucursal-tarifas">
                <h2>Tarifas</h2>
                {tarifasAdaptadas.length > 0 ? (
                    <PlanesCard tarifas={tarifasAdaptadas} />
                ) : (
                    <p>No hay tarifas disponibles.</p>
                )}
            </section>
        </div>
    );
};

export default SucursalDetalle;
