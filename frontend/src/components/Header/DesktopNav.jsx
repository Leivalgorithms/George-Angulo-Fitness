import { MENU_ITEMS } from './constants';

const DesktopNav = ({ closeMenu }) => {
  return (
    <nav className="desktop-nav">
      <ul className="nav-menu-desktop">
        {MENU_ITEMS.map(item => (
          <li key={item.id} className="nav-item-desktop">
            <a
              href={item.href}
              className="nav-link-desktop"
              onClick={closeMenu}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;