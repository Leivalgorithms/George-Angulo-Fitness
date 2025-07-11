import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Sucursales.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SucursalCard from '../components/SucursalCard';

const Sucursales = () => {
    const [sedes, setSedes] = useState([]);
    const [mapa, setMapa] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        // Traer sucursales con horarios y tarifas
        axios.get('http://localhost:3001/sucursales')
            .then(res => setSedes(res.data))
            .catch(console.error);

        // Traer coordenadas para mapa
        axios.get('http://localhost:3001/mapa')
            .then(res => setMapa(res.data))
            .catch(console.error);
    }, []);

    // Combinar datos sucursales con coordenadas del mapa
    const sedesConUbicacion = sedes.map(sede => {
        const ubicacion = mapa.find(m => m.nombre === sede.nombre);
        return {
            ...sede,
            latitud: ubicacion?.lat || 0,
            longitud: ubicacion?.lng || 0,
        };
    });

    // Filtrado por búsqueda y filtro de provincia
    const sedesFiltradas = sedesConUbicacion.filter(sede => {
        const matchBusqueda = (
            sede.provincia.toLowerCase().includes(busqueda.toLowerCase()) ||
            sede.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        const matchFiltro = filtro ? sede.provincia === filtro : true;
        return matchBusqueda && matchFiltro;
    });

    const provinciasUnicas = [...new Set(sedesConUbicacion.map(s => s.provincia))];

    return (
        <div className="sucursales">
            <h1 className="sucursales-title">Nuestras Sucursales</h1>

            <div className="box-map">
                <MapContainer center={[9.9281, -84.0907]} zoom={11.35} style={{ height: "400px", width: "100%", zIndex: 1 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {sedesFiltradas.map(sede => (
                        sede.latitud && sede.longitud && (
                            <Marker key={sede.id} position={[sede.latitud, sede.longitud]}>
                                <Popup>
                                    <strong>{sede.nombre}</strong> <br /> {sede.provincia}
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

            {/* Mostrar cards de sucursales con horarios */}
            {sedesFiltradas.map(sede => (
                <SucursalCard
                    key={sede.id}
                    nombre={sede.nombre}
                    telefono={sede.telefono}
                    horarios={sede.horarios} // esto es un array [{dia, hora}]
                    tarifas={sede.tarifas}   // si quieres mostrar tarifas, pásalas aquí
                />
            ))}
        </div>
    );
};

export default Sucursales;
