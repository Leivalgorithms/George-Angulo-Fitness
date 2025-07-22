import { useEffect, useState } from 'react';
import './css/Sucursales.css';

import 'leaflet/dist/leaflet.css';
import SucursalCard from '../components/SucursalCard';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import horariosData from '../assets/Data/horarios.json';
import mapaData from '../assets/Data/mapa.json';
import sucursalesData from '../assets/Data/sucursales.json';
import tarifasData from '../assets/Data/tarifas.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const imagenesDisponibles = import.meta.glob('../assets/sucursales/**/*.jpeg', { eager: true });

const obtenerImagen = (rutaRelativaSinExtension) => {
    const extensiones = ['.jpeg', '.jpg'];
    for (let ext of extensiones) {
        const clave = `../assets/sucursales${rutaRelativaSinExtension}${ext}`;
        if (imagenesDisponibles[clave]) {
            return imagenesDisponibles[clave].default;
        }
    }
    return '';
};

const Sucursales = () => {
    const [sedes, setSedes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');
    const [imagenIndex, setImagenIndex] = useState({});

    useEffect(() => {
        const sedesCompletas = sucursalesData.map(sucursal => {
            const ubicacion = mapaData.find(m => m.nombre === sucursal.nombre);
            const horariosSucursal = horariosData
                .filter(h => h.sucursal_id === sucursal.id)
                .map(h => ({ dia: h.dia, hora: h.hora }));
            const tarifasSucursal = tarifasData
                .filter(t => t.sucursal_id === sucursal.id)
                .map(t => ({
                    tipo: t.tipo,
                    descripcion: t.descripcion || '',
                    monto: t.monto,
                    moneda: t.moneda
                }));

            return {
                ...sucursal,
                latitud: ubicacion?.lat || 0,
                longitud: ubicacion?.lng || 0,
                horarios: horariosSucursal,
                tarifas: tarifasSucursal
            };
        });

        setSedes(sedesCompletas);
    }, []);

    const sedesFiltradas = sedes.filter(sede => {
        const matchBusqueda = (
            sede.provincia.toLowerCase().includes(busqueda.toLowerCase()) ||
            sede.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        const matchFiltro = filtro ? sede.provincia === filtro : true;
        return matchBusqueda && matchFiltro;
    });

    const provinciasUnicas = [...new Set(sedes.map(s => s.provincia))];

    return (
        <div className="sucursales">
            <h1 className="sucursales-title">Nuestras Sucursales</h1>

            <div className="box-map">
                <MapContainer center={[9.9281, -84.0907]} zoom={9} style={{ height: "400px", width: "100%", zIndex: 1 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {sedesFiltradas.map(sede => (
                        sede.latitud && sede.longitud && (
                            <Marker key={sede.id} position={[sede.latitud, sede.longitud]}>
                                <Popup>
                                    <div style={{ maxWidth: '300px' }}>
                                        <strong>{sede.nombre}</strong><br />
                                        <strong>Provincia: </strong>{sede.provincia}<br />
                                        <strong>Dirección: </strong>{sede.direccion}<br />

                                        {sede.imagenes?.length > 0 && (
                                            <div className="popup-carrusel">
                                                <img
                                                    src={obtenerImagen(
                                                        sede.imagenes[imagenIndex[sede.id] || 0]?.replace('.jpeg', '').replace('.jpg', '')
                                                    )}
                                                    alt={`Imagen de ${sede.nombre}`}
                                                />

                                                {sede.imagenes.length > 1 && (
                                                    <>
                                                        <button
                                                            className="popup-flecha izquierda"
                                                            onClick={() =>
                                                                setImagenIndex(prev => ({
                                                                    ...prev,
                                                                    [sede.id]: (prev[sede.id] ?? 0) === 0
                                                                        ? sede.imagenes.length - 1
                                                                        : (prev[sede.id] ?? 0) - 1
                                                                }))
                                                            }
                                                        >
                                                            ‹
                                                        </button>
                                                        <button
                                                            className="popup-flecha derecha"
                                                            onClick={() =>
                                                                setImagenIndex(prev => ({
                                                                    ...prev,
                                                                    [sede.id]: (prev[sede.id] ?? 0) === sede.imagenes.length - 1
                                                                        ? 0
                                                                        : (prev[sede.id] ?? 0) + 1
                                                                }))
                                                            }
                                                        >
                                                            ›
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </Popup>

                            </Marker>
                        )
                    ))}
                </MapContainer>
            </div>

            <div className="filters-container">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Buscar sucursal..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        className="search-bar"
                    />
                    <svg
                        className="search-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                        />
                    </svg>
                </div>

                <div className="filter-wrapper">
                    <select value={filtro} onChange={e => setFiltro(e.target.value)} className="filter-select">
                        <option value="">Provincia</option>
                        {provinciasUnicas.map((prov, i) => (
                            <option key={i} value={prov}>{prov}</option>
                        ))}
                    </select>
                </div>
            </div>

            {sedesFiltradas.map(sede => (
                <SucursalCard
                    key={sede.id}
                    nombre={sede.nombre}
                    provincia={sede.provincia}
                    telefono={sede.telefono}
                    horarios={sede.horarios}
                    tarifas={sede.tarifas}
                />
            ))}
        </div>
    );
};

export default Sucursales;
