import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, COMPANY_INFO } from '@constants/index';
import styles from './ConfirmationPage.module.scss';

export const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  React.useEffect(() => {
    if (!bookingId) {
      navigate('/booking');
    }
  }, [bookingId, navigate]);

  if (!bookingId) {
    return null;
  }

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>✓</div>
          <h1>¡Reserva Confirmada!</h1>
          <p className={styles.message}>
            Tu reserva ha sido confirmada correctamente. Te enviaremos un email de confirmación con
            todos los detalles.
          </p>

          <div className={styles.bookingDetails}>
            <h3>Número de Reserva</h3>
            <p className={styles.bookingId}>{bookingId}</p>

            <h3>¿Qué viene después?</h3>
            <ul>
              <li>Recibirás un email de confirmación con los detalles de tu sesión</li>
              <li>Por favor, llega 10 minutos antes de tu cita</li>
              <li>Si necesitas cancelar, hazlo con al menos 24 horas de anticipación</li>
              <li>Puedes contactarnos a {COMPANY_INFO.phone} para cualquier cambio</li>
            </ul>
          </div>

          <div className={styles.contactInfo}>
            <h3>Información de Contacto</h3>
            <p>
              Si tienes alguna pregunta, no dudes en contactarnos:
              <br />
              <strong>Teléfono:</strong> <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              <br />
              <strong>Email:</strong> <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              <br />
              <strong>Dirección:</strong> {COMPANY_INFO.address}
            </p>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={() => navigate(ROUTES.HOME)}>
              Volver al Inicio
            </button>
            <button className={styles.secondaryBtn} onClick={() => navigate(ROUTES.BOOKING)}>
              Hacer Otra Reserva
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
