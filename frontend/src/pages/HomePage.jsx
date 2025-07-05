import React from "react";
import './css/HomePage.css';
import gym from '../assets/Gym.jpg';
import logo from '../assets/logoNoBg.png';

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
                        <a href="/planes">
                            <button className="hero-button">Ver planes</button>
                        </a>
                        <a href="/nosotros">
                            <button className="hero-button">Sobre nosotros</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
