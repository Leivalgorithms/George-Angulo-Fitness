import React from 'react';
import './css/BlogDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import anuncios from '../assets/Data/anuncios.json';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const anuncio = anuncios.find(item => item.id === parseInt(id));

  if (!anuncio) {
    return <div>Anuncio no encontrado</div>;
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          Volver al blog
        </button>

        <div className="blog-detail-card">
          <div className="blog-detail-header">
            <span className="blog-detail-date">{anuncio.fecha}</span>
            <span className={`blog-detail-tag ${anuncio.tipo}`}>
              {anuncio.tipo.toUpperCase()}
            </span>
          </div>
          <h1 className="blog-detail-title">{anuncio.titulo}</h1>

          <div className="blog-detail-content">
            <p>{anuncio.contenido}</p>

            {anuncio.detalle && (
              <>
                <h3>Detalles adicionales:</h3>
                <p>{anuncio.detalle}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;