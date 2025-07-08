// MobileMenuExpansion.jsx
import React from 'react';
import MobileMenu from './MobileMenu';

const MobileMenuExpansion = ({ menuOpen, closeMenu }) => {
  return (
    <MobileMenu menuOpen={menuOpen} closeMenu={closeMenu} />
  );
};

export default MobileMenuExpansion;