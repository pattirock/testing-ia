import React from 'react';
import { COMPANY_INFO } from '@constants/index';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>Contacto</h4>
          <p>
            <strong>Teléfono:</strong> <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
          </p>
          <p>
            <strong>Email:</strong> <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
          </p>
          <p>
            <strong>Dirección:</strong> {COMPANY_INFO.address}
          </p>
        </div>

        <div className={styles.section}>
          <h4>Horario</h4>
          {COMPANY_INFO.hours.map((hour) => (
            <p key={hour.day}>
              <strong>{hour.day}:</strong> {hour.open === 'Cerrado' ? 'Cerrado' : `${hour.open} - ${hour.close}`}
            </p>
          ))}
        </div>

        <div className={styles.section}>
          <h4>Síguenos</h4>
          <div className={styles.social}>
            {COMPANY_INFO.social.facebook && (
              <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
            {COMPANY_INFO.social.instagram && (
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {COMPANY_INFO.social.whatsapp && (
              <a href={COMPANY_INFO.social.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2024 {COMPANY_INFO.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
