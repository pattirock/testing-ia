import React from 'react';
import { Service } from '@/types';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div className={styles.card}>
      {service.image && <img src={service.image} alt={service.name} className={styles.image} />}
      <div className={styles.content}>
        <h3>{service.name}</h3>
        <p className={styles.description}>{service.description}</p>

        <div className={styles.details}>
          <span className={styles.duration}>⏱️ {service.duration} min</span>
          <span className={styles.price}>${service.price}</span>
        </div>

        <div className={styles.benefits}>
          <strong>Beneficios:</strong>
          <ul>
            {service.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>

        {onSelect && (
          <button className={styles.selectBtn} onClick={() => onSelect(service)}>
            Reservar Ahora
          </button>
        )}
      </div>
    </div>
  );
};
