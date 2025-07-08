import React, { useState } from 'react';
import './css/Sucursales.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SucursalCard from '../components/SucursalCard';
import sedes from '../data/sedes';

const Sucursales = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    const sedesFiltradas = sedes.filter(sede => {
        const matchBusqueda = sede.provincia.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase());
        const matchFiltro = filtro ? sede.provincia === filtro : true;
        return matchBusqueda && matchFiltro;
    });

    return (
        <div className='sucursales'>
            <h1 className="sucursales-title">Nuestras Sucursales</h1>
            <div className="box-map">
                <div className="map">
                    <MapContainer center={[9.9281, -84.0907]} zoom={11.35} style={{ height: "400px", width: "100%", zIndex: 1 }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[9.9281, -84.0907]}>
                            <Popup>
                                Sucursal Central <br /> San José.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>

            <div className="filters-container">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Buscar sucursal..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="search-bar"
                    />
                    <span className="search-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            width="20"
                            height="20">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                        </svg>
                    </span>
                </div>

                <div className="filter-wrapper">
                    <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="filter-select">
                        <option value="">Provincia</option>
                        {sedes.map((sede, index) => (
                            <option key={index} value={sede.provincia}>{sede.provincia}</option>
                        ))}
                    </select>
                </div>
            </div>

            {sedesFiltradas.map((sede) => (
                <SucursalCard
                    key={sede.id}
                    nombre={sede.nombre}
                    provincia={sede.provincia}
                    telefono={sede.telefono}
                    horarios={sede.horarios}
                />
            ))}
        </div>
    );
}

export default Sucursales;
