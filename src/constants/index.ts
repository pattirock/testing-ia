/**
 * Application-wide constants
 */

export const COMPANY_INFO = {
  name: 'TherapyHub',
  description: 'Tu centro de bienestar y relajación',
  phone: '+34 612 345 678',
  email: 'info@therapyhub.com',
  address: 'Calle Principal 123, Madrid 28001',
  hours: [
    { day: 'Lunes', open: '09:00', close: '20:00' },
    { day: 'Martes', open: '09:00', close: '20:00' },
    { day: 'Miércoles', open: '09:00', close: '20:00' },
    { day: 'Jueves', open: '09:00', close: '20:00' },
    { day: 'Viernes', open: '09:00', close: '21:00' },
    { day: 'Sábado', open: '10:00', close: '18:00' },
    { day: 'Domingo', open: 'Cerrado', close: 'Cerrado' },
  ],
  social: {
    facebook: 'https://facebook.com/therapyhub',
    instagram: 'https://instagram.com/therapyhub',
    whatsapp: 'https://wa.me/34612345678',
  },
};

export const SERVICE_TYPES = {
  massage: {
    label: 'Masajes Terapéuticos',
    icon: '💆',
    description: 'Masajes relajantes y terapéuticos',
  },
  pressotherapy: {
    label: 'Presoterapia',
    icon: '🌪️',
    description: 'Terapia de compresión para circulación',
  },
  maderoterapy: {
    label: 'Maderoterapia',
    icon: '🪵',
    description: 'Terapia con técnicas de madera especializadas',
  },
};

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  BOOKING: '/booking',
  ABOUT: '/about',
  CONTACT: '/contact',
  CONFIRMATION: '/confirmation',
};

export const COLORS = {
  primary: '#6B8E43',
  secondary: '#D4A574',
  light: '#F5F3F0',
  dark: '#2C2C2C',
  accent: '#8B6F47',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
