import { CONTACT_INFO, MENU_ITEMS, SOCIAL_LINKS } from './constants';

const MobileMenu = ({ menuOpen, closeMenu }) => {
  return (
    <div className={`mobile-menu-expansion ${menuOpen ? "mobile-menu-expansion--open" : ""}`}>
      <div className="mobile-menu-header">
      </div>

      <div className="mobile-menu-content">
        <nav className="mobile-nav">
          <ul className="nav-menu-mobile">
            {MENU_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className="nav-item-mobile"
              >
                <a
                  href={item.href}
                  className="nav-link-mobile"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Footer del menú móvil */}
        <div className="mobile-menu-footer">
          <h3 className="mobile-menu-footer-title">Síguenos</h3>
         
          <div className="mobile-menu-social">
            {SOCIAL_LINKS.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  className="mobile-menu-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
          
          <div className="mobile-menu-contact">
            {CONTACT_INFO.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <div key={contact.id} className="mobile-menu-contact-item">
                  <IconComponent className="mobile-menu-contact-icon" />
                  <span>{contact.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;