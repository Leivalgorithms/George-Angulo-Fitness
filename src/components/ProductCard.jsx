import React from 'react';
import PropTypes from 'prop-types';
import './css/ProductCard.css';

const ProductCard = ({ name, price, featured = false }) => {
    return (
        <div className={`product-card ${featured ? 'featured' : ''}`}>
            {featured && (
                <div className="featured-badge">Destacado</div>
            )}
            <h6 className="product-name">{name}</h6>
            <p className="product-price">{price}</p>
        </div>
    );
};

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    featured: PropTypes.bool
};

ProductCard.defaultProps = {
    featured: false
};

export default ProductCard;