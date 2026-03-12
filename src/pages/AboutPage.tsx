import React from 'react';
import { Hero } from '@components/Hero';
import { COMPANY_INFO } from '@constants/index';
import { servicesService } from '@services/servicesService';
import { Therapist } from '@/types';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FC = () => {
  const [therapists, setTherapists] = React.useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTherapists = async () => {
      try {
        const data = await servicesService.getAllTherapists();
        setTherapists(data);
      } catch (error) {
        console.error('Error loading therapists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTherapists();
  }, []);

  return (
    <div className={styles.page}>
      <Hero
        title="Sobre TherapyHub"
        subtitle="Tu centro de bienestar y relajación"
      />

      <section className={styles.mission}>
        <div className={styles.container}>
          <h2>Nuestra Misión</h2>
          <p>
            En TherapyHub, nuestro objetivo es proporcionar a nuestros clientes un escape tranquilo
            del estrés diario a través de tratamientos terapéuticos de alta calidad. Creemos que el
            bienestar holístico es fundamental para una vida plena y satisfactoria.
          </p>
          <p>
            Nuestro equipo de terapeutas certificados están dedicados a crear experiencias
            personalizadas que se adapten a las necesidades específicas de cada cliente, utilizando
            técnicas modernas y naturales.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>Nuestros Valores</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.value}>
              <h3>🎯 Profesionalismo</h3>
              <p>Todos nuestros terapeutas cuentan con certificaciones reconocidas</p>
            </div>
            <div className={styles.value}>
              <h3>💚 Cuidado</h3>
              <p>Tratamos a cada cliente con atención y compasión personalizada</p>
            </div>
            <div className={styles.value}>
              <h3>✨ Excelencia</h3>
              <p>Nos esforzamos por ofrecer el mejor servicio en todo momento</p>
            </div>
            <div className={styles.value}>
              <h3>🌿 Naturalidad</h3>
              <p>Utilizamos técnicas y productos naturales siempre que es posible</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.therapists}>
        <div className={styles.container}>
          <h2>Nuestro Equipo de Terapeutas</h2>
          {isLoading ? (
            <p className={styles.loading}>Cargando equipo...</p>
          ) : (
            <div className={styles.grid}>
              {therapists.map((therapist) => (
                <div key={therapist.id} className={styles.therapistCard}>
                  <div className={styles.therapistImage}>
                    <div className={styles.avatar}>
                      {therapist.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                  <h3>{therapist.name}</h3>
                  <p className={styles.experience}>
                    {therapist.experience} años de experiencia
                  </p>
                  <p className={styles.bio}>{therapist.bio}</p>
                  <div className={styles.specializations}>
                    {therapist.specialization.map((spec) => {
                      const specLabels: Record<string, string> = {
                        massage: 'Masajes',
                        pressotherapy: 'Presoterapia',
                        maderoterapy: 'Maderoterapia',
                      };
                      return (
                        <span key={spec} className={styles.badge}>
                          {specLabels[spec] || spec}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.contact}>
        <div className={styles.container}>
          <h2>Ponte en Contacto</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <h4>📍 Dirección</h4>
              <p>{COMPANY_INFO.address}</p>
            </div>
            <div className={styles.contactItem}>
              <h4>📞 Teléfono</h4>
              <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
            </div>
            <div className={styles.contactItem}>
              <h4>✉️ Email</h4>
              <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
