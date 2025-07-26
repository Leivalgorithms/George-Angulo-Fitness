import { useEffect, useState } from 'react';
import { FaFilter, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
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
                    moneda: t.moneda,
                    destacado: t.destacado || false
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
        <div className="sucursales-page">
            {/* Hero Section */}
            <section className="sucursales-hero">
                <div className="sucursales-hero-content">
                    <h1 className="sucursales-hero-title">
                        Nuestras <span className="highlight">Sucursales</span>
                    </h1>
                    <p className="sucursales-hero-description">
                        Encuentra el gimnasio más cercano a ti. Contamos con múltiples ubicaciones 
                        estratégicas para brindarte la mejor experiencia fitness.
                    </p>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <div className="map-container">
                    <div className="map-header">
                        <h2 className="map-title">
                            <FaMapMarkerAlt className="map-icon" />
                            Ubicaciones en el Mapa
                        </h2>
                        <p className="map-description">
                            Explora nuestras sucursales y encuentra la más conveniente para ti
                        </p>
                    </div>
                    
                    <div className="map-wrapper">
                        <MapContainer 
                            center={[9.9281, -84.0907]} 
                            zoom={9} 
                            style={{ height: "450px", width: "100%", zIndex: 1 }}
                            className="leaflet-map"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {sedesFiltradas.map(sede => (
                                sede.latitud && sede.longitud && (
                                    <Marker key={sede.id} position={[sede.latitud, sede.longitud]}>
                                        <Popup>
                                            <div className="popup-content">
                                                <h3 className="popup-title">{sede.nombre}</h3>
                                                <p className="popup-info">
                                                    <strong>Provincia:</strong> {sede.provincia}
                                                </p>
                                                <p className="popup-info">
                                                    <strong>Dirección:</strong> {sede.direccion}
                                                </p>

                                                {sede.imagenes?.length > 0 && (
                                                    <div className="popup-carrusel">
                                                        <img
                                                            src={obtenerImagen(
                                                                sede.imagenes[imagenIndex[sede.id] || 0]?.replace('.jpeg', '').replace('.jpg', '')
                                                            )}
                                                            alt={`Imagen de ${sede.nombre}`}
                                                            className="popup-image"
                                                        />

                                                        {sede.imagenes.length > 1 && (
                                                            <>
                                                                <button
                                                                    className="popup-arrow left"
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
                                                                    className="popup-arrow right"
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
                </div>
            </section>

            {/* Filters Section */}
            <section className="filters-section">
                <div className="filters-container">
                    <div className="search-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o provincia..."
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-wrapper">
                        <FaFilter className="filter-icon" />
                        <select 
                            value={filtro} 
                            onChange={e => setFiltro(e.target.value)} 
                            className="filter-select"
                        >
                            <option value="">Todas las provincias</option>
                            {provinciasUnicas.map((prov, i) => (
                                <option key={i} value={prov}>{prov}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Sucursales Grid */}
            <section className="sucursales-content">
                <div className="sucursales-container">
                    <div className="sucursales-header">
                        <h2 className="section-title">Todas Nuestras Sucursales</h2>
                        <p className="section-description">
                            {sedesFiltradas.length} sucursal{sedesFiltradas.length !== 1 ? 'es' : ''} encontrada{sedesFiltradas.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="sucursales-grid">
                        {sedesFiltradas.map(sede => (
                            <SucursalCard
                                key={sede.id}
                                nombre={sede.nombre}
                                provincia={sede.provincia}
                                telefono={sede.telefono}
                                direccion={sede.direccion}
                                horarios={sede.horarios}
                                tarifas={sede.tarifas}
                            />
                        ))}
                    </div>

                    {sedesFiltradas.length === 0 && (
                        <div className="no-results">
                            <FaMapMarkerAlt className="no-results-icon" />
                            <h3 className="no-results-title">No se encontraron sucursales</h3>
                            <p className="no-results-text">
                                Intenta con otros términos de búsqueda o cambia el filtro de provincia
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Sucursales;