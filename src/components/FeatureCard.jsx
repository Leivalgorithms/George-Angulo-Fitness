import React from 'react';
import PropTypes from 'prop-types';
import './css/FeatureCard.css';

const FeatureCard = ({ icon: IconComponent, title, description }) => {
    return (
        <div className="feature-card">
            <div className="feature-icon">
                <IconComponent />
            </div>
            <div className="feature-content">
                <h5 className="feature-title">{title}</h5>
                <p className="feature-description">{description}</p>
            </div>
        </div>
    );
};

FeatureCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default FeatureCard;