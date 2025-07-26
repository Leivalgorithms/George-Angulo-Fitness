import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import anuncios from '../assets/Data/anuncios.json';
import gym from '../assets/Gym.png';
import './css/Blog.css';


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
      <div className="blog-hero">
        <img className="blog-img-bg" src={gym} alt="Gimnasio" />
        <div className="blog-hero-middle">
          <h1 className="blog-hero-title">ÚLTIMOS ANUNCIOS Y COMUNICADOS</h1>
          <p className="blog-hero-p">Mantente informado sobre nuestras promociones, cambios de horario, nuevas sedes y comunicados especiales.</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="blog-filtros-container">
        <button
          className={`blog-filtro-btn ${filtro === 'all' ? 'active' : ''}`}
          onClick={() => setFiltro('all')}
        >
          Todos
        </button>

        <button
          className={`blog-filtro-btn ${filtro === 'sede' ? 'active' : ''}`}
          onClick={() => setFiltro('sede')}
        >
          Sedes
        </button>
        <button
          className={`blog-filtro-btn ${filtro === 'horario' ? 'active' : ''}`}
          onClick={() => setFiltro('horario')}
        >
          Horarios
        </button>
        <button
          className={`blog-filtro-btn ${filtro === 'promocion' ? 'active' : ''}`}
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