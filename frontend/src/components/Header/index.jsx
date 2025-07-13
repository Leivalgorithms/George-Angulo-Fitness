import { useEffect } from 'react';
import '../css/Header.css';
import DesktopNav from './DesktopNav';
import HamburgerButton from './HamburgerButton';
import Logo from './Logo';
import MobileMenuExpansion from './MobileMenuExpansion';
import useHeaderjs from './hooks/useHeader';

const Header = () => {
  const { menuOpen, toggleMenu, closeMenu } = useHeaderjs();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, [menuOpen]);

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-container">
          <Logo closeMenu={closeMenu} />
          <DesktopNav closeMenu={closeMenu} />
          <HamburgerButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>
      </header>
      
      <MobileMenuExpansion menuOpen={menuOpen} closeMenu={closeMenu} />
    </div>
  );
};

export default Header;