import React from 'react';
import PropTypes from 'prop-types';
import './css/CTAButton.css';

const CTAButton = ({ 
    children, 
    variant = 'primary', 
    onClick, 
    disabled = false,
    ariaLabel,
    className = ''
}) => {
    const baseClasses = 'cta-button';
    const variantClass = variant === 'primary' ? 'primary' : 'secondary';
    const finalClasses = `${baseClasses} ${variantClass} ${className}`.trim();

    return (
        <button 
            className={finalClasses}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

CTAButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    ariaLabel: PropTypes.string,
    className: PropTypes.string
};

CTAButton.defaultProps = {
    variant: 'primary',
    disabled: false,
    className: ''
};

export default CTAButton;