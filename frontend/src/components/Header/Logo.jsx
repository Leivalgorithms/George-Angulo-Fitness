// Logo.jsx
import { Link } from 'react-router-dom';
import logo from '../../assets/logoNoBg.png';
import { HEADER_CONFIG } from './constants';

const Logo = ({ closeMenu }) => {
  return (
    <div className="header-logo">
      <Link to="/" onClick={closeMenu}>
        <img
          src={logo}
          alt={HEADER_CONFIG.logoAlt}
          className="logo-image"
        />
      </Link>
    </div>
  );
};

export default Logo;