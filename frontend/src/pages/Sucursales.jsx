import React from 'react';
import './css/Sucursales.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SucursalCard from '../components/SucursalCard';

const sedes = [
    {
        nombre: "Sede San Pedro",
        telefono: "60208938",
        horarios: [
            { dia: "Lunes a Viernes", hora: "05:00 am - 09:00 pm" },
            { dia: "Sábado", hora: "08:00 am - 04:00 pm" },
            { dia: "Domingo", hora: "08:00 am - 05:00 pm" }
        ]
    },
    {
        nombre: "Sede Heredia",
        telefono: "70121212",
        horarios: [
            { dia: "Lunes a Viernes", hora: "06:00 am - 10:00 pm" },
            { dia: "Sábado", hora: "08:00 am - 04:00 pm" },
            { dia: "Domingo", hora: "08:00 am - 02:00 pm" }
        ]
    }
];

const Sucursales = () => {
    return(
        <div className='sucursales'>
            <h1 className="sucursales-title">Nuestras Sucursales</h1>
            <div className="box-map">
                <div className="map">
                    <MapContainer center={[9.9281, -84.0907]} zoom={11.35} style={{ height: "400px", width: "100%" }}>
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
            {sedes.map((sede, index) => (
                <SucursalCard
                    key={index}
                    nombre={sede.nombre}
                    telefono={sede.telefono}
                    horarios={sede.horarios}
                />
            ))}
        </div>
    );
}

export default Sucursales;