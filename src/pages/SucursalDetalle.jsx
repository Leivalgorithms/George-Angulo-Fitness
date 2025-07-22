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

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    // Procesamiento de tarifas
    const tarifasAdaptadas = (sucursal.tarifas || []).map((t) => ({
        tipo: formatearTipo(t.tipo),
        monto: t.monto,
        moneda: t.moneda,
        beneficios: obtenerBeneficios(t.tipo, t.descripcion),
        destacado: t.destacado // Usar directamente el valor del JSON
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
                    <Carrusel imagenes={sucursal.imagenes} />
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