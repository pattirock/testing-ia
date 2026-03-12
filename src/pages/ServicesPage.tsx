import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@components/Hero';
import { ServiceCard } from '@components/ServiceCard';
import { Service } from '@/types';
import { ROUTES, SERVICE_TYPES } from '@constants/index';
import { servicesService } from '@services/servicesService';
import styles from './ServicesPage.module.scss';

interface FilterState {
  type: 'all' | 'massage' | 'pressotherapy' | 'maderoterapy';
}

export const ServicesPage: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const [filter, setFilter] = React.useState<FilterState>({ type: 'all' });
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices =
    filter.type === 'all' ? services : services.filter((s) => s.type === filter.type);

  const handleServiceSelect = (service: Service) => {
    navigate(`${ROUTES.BOOKING}?serviceId=${service.id}`);
  };

  return (
    <div className={styles.page}>
      <Hero
        title="Nuestros Servicios"
        subtitle="Descubre todo lo que ofrecemos para tu bienestar"
      />

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.filters}>
            <h3>Filtrar por tipo:</h3>
            <button
              className={`${styles.filterBtn} ${filter.type === 'all' ? styles.active : ''}`}
              onClick={() => setFilter({ type: 'all' })}
            >
              Todos los servicios
            </button>
            {Object.entries(SERVICE_TYPES).map(([key, value]) => {
              const filterType = key as 'massage' | 'pressotherapy' | 'maderoterapy';
              return (
                <button
                  key={key}
                  className={`${styles.filterBtn} ${filter.type === filterType ? styles.active : ''}`}
                  onClick={() => setFilter({ type: filterType })}
                >
                  {value.icon} {value.label}
                </button>
              );
            })}
          </div>

          {isLoading ? (
            <p className={styles.loading}>Cargando servicios...</p>
          ) : (
            <div className={styles.grid}>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onSelect={handleServiceSelect}
                  />
                ))
              ) : (
                <p className={styles.noResults}>No hay servicios disponibles en esta categoría</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={styles.info}>
        <div className={styles.container}>
          <h2>Información sobre nuestros servicios</h2>
          <p>
            Todos nuestros servicios están diseñados por profesionales certificados con años de
            experiencia. Cada sesión es personalizada según tus necesidades específicas de bienestar.
          </p>
        </div>
      </section>
    </div>
  );
};
