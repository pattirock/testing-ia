import { Service, Therapist } from '@/types';

/**
 * Mock data service for therapies and therapists
 */

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Masaje Relajante',
    type: 'massage',
    description: 'Masaje suave y relajante para aliviar la tensión muscular y el estrés',
    duration: 60,
    price: 50,
    benefits: [
      'Reduce estrés y ansiedad',
      'Mejora circulación sanguínea',
      'Alivia dolor muscular',
      'Mejora calidad del sueño',
    ],
  },
  {
    id: '2',
    name: 'Masaje Terapéutico Profundo',
    type: 'massage',
    description: 'Masaje de tejido profundo para tratar lesiones y dolores crónicos',
    duration: 75,
    price: 65,
    benefits: [
      'Alivio de dolor crónico',
      'Mejora flexibilidad',
      'Recuperación de lesiones',
      'Aumenta movilidad articular',
    ],
  },
  {
    id: '3',
    name: 'Presoterapia Clásica',
    type: 'pressotherapy',
    description: 'Terapia de compresión neumática para mejorar circulación linfática',
    duration: 45,
    price: 55,
    benefits: [
      'Mejora drenaje linfático',
      'Reduce hinchazón y retención de líquidos',
      'Aumenta energía y vitalidad',
      'Beneficios anti-celulitis',
    ],
  },
  {
    id: '4',
    name: 'Presoterapia + Masaje Combinado',
    type: 'pressotherapy',
    description: 'Combinación de presoterapia con masaje relajante para máximos beneficios',
    duration: 90,
    price: 80,
    benefits: [
      'Efecto sinérgico maximizado',
      'Relajación profunda',
      'Drenaje linfático mejorado',
      'Recuperación acelerada',
    ],
  },
  {
    id: '5',
    name: 'Maderoterapia Básica',
    type: 'maderoterapy',
    description: 'Técnicas especializadas con instrumentos de madera para estimulación',
    duration: 50,
    price: 60,
    benefits: [
      'Estimula circulación profunda',
      'Suaviza celulitis',
      'Tonifica piel',
      'Mejora contorno corporal',
    ],
  },
  {
    id: '6',
    name: 'Maderoterapia Gourmet Facial',
    type: 'maderoterapy',
    description: 'Tratamiento facial rejuvenecedor con técnicas de maderoterapia',
    duration: 40,
    price: 70,
    benefits: [
      'Rejuvenecimiento facial',
      'Mejora textura de piel',
      'Reduce arrugas finas',
      'Aumenta luminosidad',
    ],
  },
];

export const mockTherapists: Therapist[] = [
  {
    id: 't1',
    name: 'María García',
    specialization: ['massage', 'pressotherapy'],
    bio: 'Terapeuta certificada con 8 años de experiencia en masajes terapéuticos',
    experience: 8,
  },
  {
    id: 't2',
    name: 'Antonio López',
    specialization: ['massage', 'maderoterapy'],
    bio: 'Especialista en maderoterapia y masajes deportivos con amplia experiencia',
    experience: 10,
  },
  {
    id: 't3',
    name: 'Elena Rodríguez',
    specialization: ['pressotherapy', 'maderoterapy'],
    bio: 'Experta en presoterapia y tratamientos rejuvenecedores',
    experience: 6,
  },
  {
    id: 't4',
    name: 'Carlos Martínez',
    specialization: ['massage', 'pressotherapy', 'maderoterapy'],
    bio: 'Profesional multidisciplinario con formación completa en todas nuestras terapias',
    experience: 12,
  },
];

export const servicesService = {
  getAllServices: async (): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 300);
    });
  },

  getServiceById: async (id: string): Promise<Service | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices.find((s) => s.id === id)), 200);
    });
  },

  getServicesByType: async (type: string): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(mockServices.filter((s) => s.type === type)),
        250
      );
    });
  },

  getAllTherapists: async (): Promise<Therapist[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTherapists), 300);
    });
  },

  getTherapistById: async (id: string): Promise<Therapist | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTherapists.find((t) => t.id === id)), 200);
    });
  },
};
