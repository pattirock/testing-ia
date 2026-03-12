/**
 * Service types for the therapeutic services company
 */

export type ServiceType = 'massage' | 'pressotherapy' | 'maderoterapy';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  duration: number; // in minutes
  price: number;
  image?: string;
  benefits: string[];
}

export interface Therapist {
  id: string;
  name: string;
  specialization: ServiceType[];
  bio: string;
  image?: string;
  experience: number; // in years
}

export interface BookingSlot {
  id: string;
  therapistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  available: boolean;
  price: number;
}

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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

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
