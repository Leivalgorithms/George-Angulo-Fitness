// constants.jsx
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export const MENU_ITEMS = [
  { id: "blog", name: "Blog", href: "/blog" },
  { id: "sucursales", name: "Sucursales", href: "/sucursales" },
  { id: "planes", name: "Planes", href: "/planes" },
  { id: "servicios", name: "Servicios", href: "/servicios" },
  { id: "contactos", name: "Contactos", href: "/contactos" }
];

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/GimnasiosGeorgeAnguloFitness/?locale=es_LA",
    icon: FaFacebookF
  },
  {
    id: "instagram",
    name: "Instagram", 
    href: "https://www.instagram.com/georgeangulofitness/?hl=es",
    icon: FaInstagram
  }
];

export const CONTACT_INFO = [
  {
    id: "phone",
    text: "Teléfono:",
    icon: FaPhone
  },
  {
    id: "email",
    text: "Email:",
    icon: FaEnvelope
  },
  {
    id: "location",
    text: "Costa Rica",
    icon: FaMapMarkerAlt
  }
];

export const HEADER_CONFIG = {
  logoAlt: "Logo George Angulo Fitness",
  menuAriaLabel: "Toggle menu"
};