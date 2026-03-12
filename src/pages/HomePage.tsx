import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@components/Hero';
import { ServiceCard } from '@components/ServiceCard';
import { Service } from '@/types';
import { ROUTES } from '@constants/index';
import { servicesService } from '@services/servicesService';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        setServices(data.slice(0, 3)); // Show only 3 featured services
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleServiceSelect = (service: Service) => {
    navigate(`${ROUTES.BOOKING}?serviceId=${service.id}`);
  };

  const handleHeroClick = () => {
    navigate(ROUTES.BOOKING);
  };

  return (
    <div className={styles.home}>
      <Hero
        title="Bienvenido a TherapyHub"
        subtitle="Tu centro de bienestar y relajación completo"
        cta={{ text: 'Reservar Ahora', action: handleHeroClick }}
      />

      <section className={styles.intro}>
        <div className={styles.container}>
          <h2>Nuestros Servicios</h2>
          <p>
            Ofrecemos una variedad de terapias especializadas para tu bienestar completo. Desde
            masajes relajantes hasta tratamientos avanzados de presoterapia y maderoterapia.
          </p>
        </div>
      </section>

      {isLoading ? (
        <section className={styles.loading}>
          <p>Cargando servicios...</p>
        </section>
      ) : (
        <section className={styles.services}>
          <div className={styles.container}>
            <h2>Servicios Destacados</h2>
            <div className={styles.grid}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2>¿Por qué elegirnos?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <span className={styles.icon}>👥</span>
              <h3>Terapeutas Profesionales</h3>
              <p>Equipo certificado y experimentado en todas las terapias</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🏆</span>
              <h3>Máxima Calidad</h3>
              <p>Tratamientos personalizados según tus necesidades</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>💆</span>
              <h3>Ambiente Relajante</h3>
              <p>Espacio tranquilo y acogedor para tu bienestar</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>📅</span>
              <h3>Reservas Fáciles</h3>
              <p>Reserva online de forma rápida y sencilla</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Listo para relajarte?</h2>
          <p>Reserva tu sesión ahora y disfruta de nuestros servicios premium</p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate(ROUTES.BOOKING)}
          >
            Reservar Sesión
          </button>
        </div>
      </section>
    </div>
  );
};
