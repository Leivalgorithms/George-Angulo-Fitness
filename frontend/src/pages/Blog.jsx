import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Blog.css';
import gym from '../assets/Gym.jpg';
import logo from '../assets/logoNoBg.png';
import { anuncios } from '../data/anuncios';


const Blog = () => {
  const [filtro, setFiltro] = useState('all');
  const navigate = useNavigate();

  // Filtrar anuncios según el filtro seleccionado
  const anunciosFiltrados = anuncios.filter(anuncio => {
    if (filtro === 'all') return true;
    if (filtro === 'destacado') return anuncio.destacado;
    return anuncio.tipo === filtro;
  });

  const verDetalle = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="hero">
        <img className="img-bg" src={gym} alt="Gimnasio" />
        <img className="hero-logo" src={logo} alt="Logo" />
        <div className="hero-middle">
          <h1 className="hero-title">ÚLTIMOS ANUNCIOS Y COMUNICADOS</h1>
          <p className="hero-p">Mantente informado sobre nuestras promociones, cambios de horario, nuevas sedes y comunicados especiales.</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros-container">
        <button 
          className={`filtro-btn ${filtro === 'all' ? 'active' : ''}`}
          onClick={() => setFiltro('all')}
        >
          Todos
        </button>
        
        <button 
          className={`filtro-btn ${filtro === 'sede' ? 'active' : ''}`}
          onClick={() => setFiltro('sede')}
        >
          Sedes
        </button>
        <button 
          className={`filtro-btn ${filtro === 'horario' ? 'active' : ''}`}
          onClick={() => setFiltro('horario')}
        >
          Horarios
        </button>
        <button 
          className={`filtro-btn ${filtro === 'promocion' ? 'active' : ''}`}
          onClick={() => setFiltro('promocion')}
        >
          Promociones
        </button>
      </div>

      {/* Sección de Anuncios */}
      <div className="blog-container">
        <h2 className="blog-section-title">Anuncios Recientes</h2>
        
        <div className="blog-grid">
          {anunciosFiltrados.map((anuncio) => (
            <div 
              key={anuncio.id} 
              className={`blog-card ${anuncio.destacado ? 'destacado' : ''} ${anuncio.tipo}`}
            >
              <div className="blog-card-header">
                <span className="blog-card-date">{anuncio.fecha}</span>
                <span className={`blog-card-tag ${anuncio.tipo}`}>
                  {anuncio.tipo.toUpperCase()}
                </span>
              </div>
              <h3 className="blog-card-title">{anuncio.titulo}</h3>
              <p className="blog-card-content">{anuncio.contenido}</p>
              <button 
                className="blog-card-button"
                onClick={() => verDetalle(anuncio.id)}
              >
                Leer más
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;