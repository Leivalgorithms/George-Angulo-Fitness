import 'leaflet/dist/leaflet.css';
import gym from '../assets/Gym.png';
import logo from '../assets/logoNoBg.png';
import './css/HomePage.css';

const HomePage = () => {
    return (        
        <div className="home">
            {/*Hero*/}
            <div className="hero">
                <img className="img-bg" src={gym} alt="" />
                <img className="hero-logo" src={logo} alt="Logo" />
                <div className="hero-middle">
                    <h1 className="hero-title">ENTRENA CON PROPOSITO, TRANSFORMA TU VIDA.</h1>
                    <p className="hero-p">Somos un centro de acondicionamiento fisico, donde combinas equipo tecnologico, instructores capacitados, ambientes agradables, todo en un mismo lugar, contamos con terapeuta fisico y nutricionista.</p>
                    <div className="hero-buttons">
                    <button className="hero-button">Ver planes</button>
                    <button className="hero-button">Sobre nosotros</button>
                    </div>
                </div>
            </div>

            {/*Sucursales
            <div className="sucursales">
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
                <button className="sucursal-boton">
                    <h1>Encuentra La Sucursal Mas Cercana a Ti!</h1>
                </button>
            </div>
            */}

            {/*Planes
            <div className="planes">
                
            </div>
            */}
        </div>
    );
};

export default HomePage;
