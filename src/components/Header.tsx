import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, ROUTES } from '@constants/index';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <span className={styles.icon}>✨</span>
          <span className={styles.name}>{COMPANY_INFO.name}</span>
        </Link>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <Link to={ROUTES.HOME} onClick={() => setIsMenuOpen(false)}>
            Inicio
          </Link>
          <Link to={ROUTES.SERVICES} onClick={() => setIsMenuOpen(false)}>
            Servicios
          </Link>
          <Link to={ROUTES.ABOUT} onClick={() => setIsMenuOpen(false)}>
            Sobre Nosotros
          </Link>
          <Link to={ROUTES.CONTACT} onClick={() => setIsMenuOpen(false)}>
            Contacto
          </Link>
          <Link
            to={ROUTES.BOOKING}
            className={styles.bookBtn}
            onClick={() => setIsMenuOpen(false)}
          >
            Reservar
          </Link>
        </nav>
      </div>
    </header>
  );
};
