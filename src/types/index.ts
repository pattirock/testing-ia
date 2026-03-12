/**
 * @fileoverview Type definitions for TherapyHub application
 * All types for services, bookings, therapists, and business logic
 */

/**
 * Tipo de servicio terapéutico disponible en TherapyHub
 * @typedef {('massage' | 'pressotherapy' | 'maderoterapy')} ServiceType
 */
export type ServiceType = 'massage' | 'pressotherapy' | 'maderoterapy';

/**
 * Estado de una reserva
 * @typedef {('pending' | 'confirmed' | 'completed' | 'cancelled')} BookingStatus
 */
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

/**
 * Servicio terapéutico ofrecido por TherapyHub
 *
 * @typedef {Object} Service
 * @property {string} id - ID único del servicio en la base de datos
 * @property {string} name - Nombre del servicio (ej: "Masaje Relajante")
 * @property {ServiceType} type - Tipo de servicio para filtrado y categorización
 * @property {string} description - Descripción detallada del servicio y sus beneficios
 * @property {number} duration - Duración de la sesión en minutos
 * @property {number} price - Precio de la sesión en euros
 * @property {string} [image] - URL opcional de imagen del servicio
 * @property {string[]} benefits - Lista de beneficios principales (máx 5)
 *
 * @example
 * {
 *   id: '1',
 *   name: 'Masaje Relajante',
 *   type: 'massage',
 *   description: 'Masaje suave de cuerpo completo...',
 *   duration: 60,
 *   price: 50,
 *   benefits: ['Reduce estrés', 'Mejora circulación']
 * }
 */
export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  duration: number;
  price: number;
  image?: string;
  benefits: string[];
}

/**
 * Información de un terapeuta professional
 *
 * @typedef {Object} Therapist
 * @property {string} id - ID único del terapeuta
 * @property {string} name - Nombre completo
 * @property {ServiceType[]} specialization - Especialidades (puede tener múltiples)
 * @property {string} bio - Biografía profesional y certificaciones
 * @property {string} [image] - URL opcional de foto de perfil
 * @property {number} experience - Años de experiencia profesional
 *
 * @example
 * {
 *   id: 'therapist_1',
 *   name: 'María García',
 *   specialization: ['massage', 'pressotherapy'],
 *   bio: 'Masajista certificada con 10 años de experiencia...',
 *   experience: 10
 * }
 */
export interface Therapist {
  id: string;
  name: string;
  specialization: ServiceType[];
  bio: string;
  image?: string;
  experience: number;
}

/**
 * Slot de tiempo disponible para reservas
 *
 * @typedef {Object} BookingSlot
 * @property {string} id - ID único del slot
 * @property {string} therapistId - ID del terapeuta disponible
 * @property {string} serviceId - ID del servicio
 * @property {Date} startTime - Hora de inicio
 * @property {Date} endTime - Hora de fin
 * @property {boolean} available - Si está disponible para reservar
 * @property {number} price - Precio del slot
 */
export interface BookingSlot {
  id: string;
  therapistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  available: boolean;
  price: number;
}

/**
 * Reserva de una sesión terapéutica
 *
 * @typedef {Object} Booking
 * @property {string} id - ID único de la reserva (generado por el sistema)
 * @property {string} clientName - Nombre completo del cliente
 * @property {string} clientEmail - Email para confirmación y contacto
 * @property {string} clientPhone - Teléfono de contacto (formato: +34XXXXXXXXX)
 * @property {string} serviceId - ID del servicio reservado
 * @property {string} therapistId - ID del terapeuta asignado
 * @property {Date} date - Fecha completa de la reserva
 * @property {string} startTime - Hora de inicio (formato: HH:mm)
 * @property {string} endTime - Hora de fin (formato: HH:mm)
 * @property {string} [notes] - Notas adicionales del cliente
 * @property {BookingStatus} status - Estado actual de la reserva
 * @property {number} price - Precio final de la sesión
 *
 * @example
 * {
 *   id: 'booking_123',
 *   clientName: 'Juan Pérez',
 *   clientEmail: 'juan@example.com',
 *   clientPhone: '+34912345678',
 *   serviceId: '1',
 *   therapistId: 'therapist_1',
 *   date: new Date('2026-03-15'),
 *   startTime: '10:00',
 *   endTime: '11:00',
 *   status: 'confirmed',
 *   price: 50
 * }
 */
export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  therapistId: string;
  date: Date;
  startTime: string;
  endTime: string;
  notes?: string;
  status: BookingStatus;
  price: number;
}

/**
 * Formulario de contacto enviado por visitantes
 *
 * @typedef {Object} ContactForm
 * @property {string} name - Nombre del remitente
 * @property {string} email - Email para respuesta
 * @property {string} phone - Teléfono de contacto
 * @property {string} subject - Asunto del mensaje
 * @property {string} message - Contenido del mensaje (mín 10, máx 1000 caracteres)
 *
 * @example
 * {
 *   name: 'María López',
 *   email: 'maria@example.com',
 *   phone: '+34612345678',
 *   subject: 'Consulta sobre servicios',
 *   message: 'Me gustaría más información sobre...'
 * }
 */
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/**
 * Información de la empresa y horarios de operación
 *
 * @typedef {Object} CompanyInfo
 * @property {string} name - Nombre legal de la empresa
 * @property {string} description - Descripción breve del negocio
 * @property {string} phone - Teléfono principal de contacto
 * @property {string} email - Email de contacto
 * @property {string} address - Dirección física de la empresa
 * @property {Array} hours - Horarios por día de la semana
 * @property {string} hours[].day - Día de la semana (Monday, Tuesday, etc.)
 * @property {string} hours[].open - Hora de apertura (formato: HH:mm)
 * @property {string} hours[].close - Hora de cierre (formato: HH:mm)
 * @property {Object} social - Enlaces a redes sociales
 * @property {string} [social.facebook] - URL de perfil Facebook
 * @property {string} [social.instagram] - URL de perfil Instagram
 * @property {string} [social.twitter] - URL de perfil Twitter/X
 * @property {string} [social.whatsapp] - Número de WhatsApp
 *
 * @example
 * {
 *   name: 'TherapyHub SPA',
 *   description: 'Centro de masajes y terapias',
 *   phone: '+34912345678',
 *   email: 'info@therapyhub.com',
 *   address: 'Calle Principal 123, Madrid',
 *   hours: [
 *     { day: 'Monday', open: '10:00', close: '20:00' },
 *     { day: 'Saturday', open: '09:00', close: '19:00' },
 *     { day: 'Sunday', open: '10:00', close: '18:00' }
 *   ],
 *   social: {
 *     instagram: 'https://instagram.com/therapyhub',
 *     whatsapp: '+34612345678'
 *   }
 * }
 */
export interface CompanyInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
  };
}
