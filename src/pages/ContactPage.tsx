import React from 'react';
import { COMPANY_INFO } from '@constants/index';
import styles from './ContactPage.module.scss';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Contact form submitted:', formData);

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Contacto</h1>
          <p>Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros.</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2>Información de Contacto</h2>

              <div className={styles.infoItem}>
                <h4>📍 Dirección</h4>
                <p>{COMPANY_INFO.address}</p>
              </div>

              <div className={styles.infoItem}>
                <h4>📞 Teléfono</h4>
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              </div>

              <div className={styles.infoItem}>
                <h4>✉️ Email</h4>
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </div>

              <div className={styles.infoItem}>
                <h4>🕐 Horario de Atención</h4>
                <ul>
                  {COMPANY_INFO.hours.map((hour) => (
                    <li key={hour.day}>
                      <strong>{hour.day}:</strong> {hour.open === 'Cerrado' ? 'Cerrado' : `${hour.open} - ${hour.close}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.form}>
              <h2>Envíanos un Mensaje</h2>

              {isSubmitted && (
                <div className={styles.success}>
                  ✓ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+34 612 345 678"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="reserva">Consulta sobre reservas</option>
                    <option value="servicios">Información sobre servicios</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    rows={5}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
