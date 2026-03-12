import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking, Service, ServiceType, Therapist } from '@/types';
import { ROUTES } from '@constants/index';
import { servicesService } from '@services/servicesService';
import { bookingService } from '@services/bookingService';
import styles from './BookingPage.module.scss';

interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  therapistId: string;
  date: string;
  startTime: string;
  notes: string;
}

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = React.useState<Service[]>([]);
  const [therapists, setTherapists] = React.useState<Therapist[]>([]);
  const [availableSlots, setAvailableSlots] = React.useState<{ startTime: string; endTime: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState<BookingFormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    therapistId: '',
    date: '',
    startTime: '',
    notes: '',
  });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, therapistsData] = await Promise.all([
          servicesService.getAllServices(),
          servicesService.getAllTherapists(),
        ]);
        setServices(servicesData);
        setTherapists(therapistsData);

        // Auto-select service from URL params
        const params = new URLSearchParams(window.location.search);
        const serviceId = params.get('serviceId');
        if (serviceId) {
          setFormData((prev) => ({ ...prev, serviceId }));
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      // Load available slots when date changes
      if (name === 'date' && newFormData.serviceId) {
        loadAvailableSlots(newFormData.serviceId, new Date(value));
      }
      return newFormData;
    });
  };

  const loadAvailableSlots = async (serviceId: string, date: Date) => {
    try {
      const slots = await bookingService.getAvailableSlots(serviceId, date);
      setAvailableSlots(slots);
    } catch (err) {
      console.error('Error loading slots:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const selectedService = services.find((s) => s.id === formData.serviceId);
      if (!selectedService) {
        throw new Error('Servicio inválido');
      }

      const [startHour] = formData.startTime.split(':');
      const endHour = (parseInt(startHour) + Math.ceil(selectedService.duration / 60)).toString();

      const booking: Omit<Booking, 'id'> = {
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        serviceId: formData.serviceId,
        therapistId: formData.therapistId,
        date: new Date(formData.date),
        startTime: formData.startTime,
        endTime: `${endHour}:00`,
        notes: formData.notes,
        status: 'pending',
        price: selectedService.price,
      };

      const result = await bookingService.createBooking(booking);
      
      // Send confirmation email
      await bookingService.sendConfirmationEmail(formData.clientEmail, result.id);

      // Navigate to confirmation page
      navigate(`${ROUTES.CONFIRMATION}?bookingId=${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al confirmar la reserva');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedService = services.find((s) => s.id === formData.serviceId);
  const filteredTherapists = formData.serviceId
    ? therapists.filter((t) => t.specialization.includes(selectedService?.type as ServiceType))
    : therapists;

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <h1>Reservar una Sesión</h1>
        <p className={styles.subtitle}>
          Completa el formulario para reservar tu sesión de terapia
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <fieldset>
            <legend>Información Personal</legend>

            <div className={styles.formGroup}>
              <label htmlFor="clientName">Nombre *</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="clientEmail">Email *</label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="clientPhone">Teléfono *</label>
                <input
                  type="tel"
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="+34 612 345 678"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Detalles de la Sesión</legend>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="serviceId">Servicio *</label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="therapistId">Terapeuta *</label>
                <select
                  id="therapistId"
                  name="therapistId"
                  value={formData.therapistId}
                  onChange={handleInputChange}
                  required
                  disabled={filteredTherapists.length === 0}
                >
                  <option value="">Selecciona un terapeuta</option>
                  {filteredTherapists.map((therapist) => (
                    <option key={therapist.id} value={therapist.id}>
                      {therapist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="date">Fecha *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="startTime">Hora *</label>
                <select
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  disabled={availableSlots.length === 0 || !formData.date}
                >
                  <option value="">Selecciona una hora</option>
                  {availableSlots.map((slot) => (
                    <option key={slot.startTime} value={slot.startTime}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Notas Adicionales</legend>

            <div className={styles.formGroup}>
              <label htmlFor="notes">Comentarios (opcional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Cuéntanos si tienes alguna condición especial o preferencia..."
                rows={4}
              />
            </div>
          </fieldset>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate(ROUTES.SERVICES)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
