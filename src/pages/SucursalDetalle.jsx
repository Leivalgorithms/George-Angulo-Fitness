import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carrusel from '../components/Carrusel';
import PlanesCard from '../components/PlanesCard';
import './css/SucursalDetalle.css';

// Importar datos locales
import horariosData from '../assets/Data/horarios.json';
import sucursalesData from '../assets/Data/sucursales.json';
import tarifasData from '../assets/Data/tarifas.json';

const imagenesDisponibles = import.meta.glob('../assets/sucursales/**/*.jpeg', { eager: true });

const obtenerImagen = (ruta) => {
    const extensiones = ['.jpeg', '.jpg'];
    for (let ext of extensiones) {
        const clave = `../assets/sucursales${ruta}${ext}`;
        if (imagenesDisponibles[clave]) {
            return imagenesDisponibles[clave].default;
        }
    }
    return '';
};

const SucursalDetalle = () => {
    const { nombre } = useParams();
    const [sucursal, setSucursal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const suc = sucursalesData.find(s => s.nombre === decodeURIComponent(nombre));

            if (suc) {
                const horariosSucursal = horariosData
                    .filter(h => h.sucursal_id === suc.id)
                    .map(h => ({ dia: h.dia, hora: h.hora }));

                const tarifasSucursal = tarifasData
                    .filter(t => t.sucursal_id === suc.id)
                    .map(t => ({
                        tipo: t.tipo,
                        descripcion: t.descripcion || '',
                        monto: t.monto,
                        moneda: t.moneda,
                        destacado: t.destacado || false
                    }));

                const imagenesProcesadas = (suc.imagenes || []).map(obtenerImagen);

                setSucursal({
                    ...suc,
                    horarios: horariosSucursal,
                    tarifas: tarifasSucursal,
                    imagenes: imagenesProcesadas
                });
            } else {
                setError('Sucursal no encontrada');
            }

            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [nombre]);

    // Función para obtener beneficios según el tipo de plan
    const obtenerBeneficios = (tipo, descripcion) => {
        const beneficios = [];

        if (tipo.includes('vip')) {
            beneficios.push('Acceso a múltiples sedes');
            if (descripcion) beneficios.push(descripcion);
            beneficios.push('Prioridad en reservas');
            beneficios.push('Descuentos en productos');
        } else if (tipo.includes('trimestre')) {
            beneficios.push('Ahorro vs mensualidad');
            beneficios.push('3 meses de acceso');
            if (tipo.includes('menor_edad')) {
                beneficios.push('Tarifa especial menores');
            }
        } else if (tipo.includes('menor_edad')) {
            beneficios.push('Tarifa especial menores');
            beneficios.push('Horarios preferenciales');
        } else if (tipo.includes('sesion')) {
            beneficios.push('Pago por uso');
            beneficios.push('Sin compromiso mensual');
        } else {
            beneficios.push('Acceso completo al gimnasio');
            beneficios.push('Uso de todos los equipos');
        }

        return beneficios;
    };

    // Función para formatear nombres de tipos
    const formatearTipo = (tipo) => {
        return tipo
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace('Vip', 'VIP')
            .replace('Usuario Nacional', '(Nacional)')
            .replace('Usuario Extranjero', '(Extranjero)');
    };

    if (loading) {
        return (
            <div className="sucursal-detalle-page">
                <div className="loading-container">
                    Cargando información de la sucursal...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sucursal-detalle-page">
                <div className="error-msg">{error}</div>
            </div>
        );
    }

    // Se usa para poner de primero los planes featured
    const tarifasAdaptadas = (sucursal.tarifas || [])
        .map((t) => ({
            tipo: formatearTipo(t.tipo),
            monto: t.monto,
            moneda: t.moneda,
            beneficios: obtenerBeneficios(t.tipo, t.descripcion),
            destacado: t.destacado
        }))
        .sort((a, b) => {
            // Los destacados van primero (true se convierte en 1, false en 0
            // Restamos para que los destacados (1) tengan menor valor y aparezcan primero
            return Number(b.destacado) - Number(a.destacado);
        });

    return (
        <div className="sucursal-detalle-page">
            {/* Hero Section */}
            <section className="sucursal-hero">
                <div className="sucursal-hero-content">
                    <h1 className="sucursal-nombre">
                        {sucursal.nombre.split(' ').map((palabra, index) => (
                            index === sucursal.nombre.split(' ').length - 1 ? (
                                <span key={index} className="highlight">{palabra}</span>
                            ) : (
                                <span key={index}>{palabra} </span>
                            )
                        ))}
                    </h1>
                    <p className="sucursal-provincia">
                        Provincia de {sucursal.provincia}
                    </p>
                </div>
            </section>

            {/* Contenido Principal */}
            <section className="sucursal-content">
                <div className="sucursal-container">
                    {/* Layout Principal: Fotos + Info */}
                    <section className="sucursal-layout">
                        <div className="sucursal-fotos">
                            <Carrusel imagenes={sucursal.imagenes} />
                        </div>

                        <div className="sucursal-info-box">
                            <div className="info-section">
                                <p>
                                    <strong>Provincia:</strong><br />
                                    {sucursal.provincia}
                                </p>
                                <p>
                                    <strong>Ubicación:</strong><br />
                                    {sucursal.direccion}
                                </p>
                                <p>
                                    <strong>Teléfono:</strong><br />
                                    <a href={`tel:${sucursal.telefono}`} className="sucursal-telefono">
                                        {sucursal.telefono}
                                    </a>
                                </p>
                            </div>

                            {/* Horarios integrados */}
                            <div className="horarios-section">
                                <p className="horarios-titulo">
                                    <strong>Horarios de Atención:</strong>
                                </p>
                                <div className="horarios-lista">
                                    {(sucursal.horarios || []).map((h, i) => (
                                        <div key={i} className="horario-item">
                                            <span className="horario-dia">{h.dia}:</span>
                                            <span className="horario-hora">{h.hora}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección de Tarifas */}
                    <section className="sucursal-tarifas">
                        <h2>Planes y Tarifas</h2>
                        {tarifasAdaptadas.length > 0 ? (
                            <PlanesCard tarifas={tarifasAdaptadas} />
                        ) : (
                            <p>No hay tarifas disponibles para esta sucursal.</p>
                        )}
                    </section>
                </div>
            </section>
        </div>
    );
};

export default SucursalDetalle;