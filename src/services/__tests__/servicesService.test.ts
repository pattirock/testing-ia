import { servicesService, mockServices, mockTherapists } from '../servicesService';

describe('servicesService', () => {
  describe('getAllServices', () => {
    it('should return all services', async () => {
      const services = await servicesService.getAllServices();
      expect(services).toBeDefined();
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBe(6);
    });

    it('should return services with required properties', async () => {
      const services = await servicesService.getAllServices();
      services.forEach((service) => {
        expect(service).toHaveProperty('id');
        expect(service).toHaveProperty('name');
        expect(service).toHaveProperty('type');
        expect(service).toHaveProperty('description');
        expect(service).toHaveProperty('duration');
        expect(service).toHaveProperty('price');
        expect(service).toHaveProperty('benefits');
      });
    });
  });

  describe('getServiceById', () => {
    it('should return a service by id', async () => {
      const service = await servicesService.getServiceById('1');
      expect(service).toBeDefined();
      expect(service?.id).toBe('1');
      expect(service?.name).toBe('Masaje Relajante');
    });

    it('should return undefined for non-existent service', async () => {
      const service = await servicesService.getServiceById('999');
      expect(service).toBeUndefined();
    });
  });

  describe('getServicesByType', () => {
    it('should filter services by massage type', async () => {
      const services = await servicesService.getServicesByType('massage');
      expect(services.length).toBeGreaterThan(0);
      services.forEach((service) => {
        expect(service.type).toBe('massage');
      });
    });

    it('should filter services by pressotherapy type', async () => {
      const services = await servicesService.getServicesByType('pressotherapy');
      expect(services.length).toBeGreaterThan(0);
      services.forEach((service) => {
        expect(service.type).toBe('pressotherapy');
      });
    });

    it('should return empty array for invalid type', async () => {
      const services = await servicesService.getServicesByType('invalid');
      expect(services.length).toBe(0);
    });
  });

  describe('getAllTherapists', () => {
    it('should return all therapists', async () => {
      const therapists = await servicesService.getAllTherapists();
      expect(therapists).toBeDefined();
      expect(Array.isArray(therapists)).toBe(true);
      expect(therapists.length).toBe(4);
    });

    it('should return therapists with required properties', async () => {
      const therapists = await servicesService.getAllTherapists();
      therapists.forEach((therapist) => {
        expect(therapist).toHaveProperty('id');
        expect(therapist).toHaveProperty('name');
        expect(therapist).toHaveProperty('specialization');
        expect(therapist).toHaveProperty('bio');
        expect(therapist).toHaveProperty('experience');
      });
    });
  });

  describe('getTherapistById', () => {
    it('should return a therapist by id', async () => {
      const therapist = await servicesService.getTherapistById('t1');
      expect(therapist).toBeDefined();
      expect(therapist?.id).toBe('t1');
      expect(therapist?.name).toBe('María García');
    });

    it('should return undefined for non-existent therapist', async () => {
      const therapist = await servicesService.getTherapistById('t999');
      expect(therapist).toBeUndefined();
    });
  });

  describe('mock data validation', () => {
    it('should have valid service data', () => {
      mockServices.forEach((service) => {
        expect(service.id).toBeTruthy();
        expect(service.name).toBeTruthy();
        expect(service.duration).toBeGreaterThan(0);
        expect(service.price).toBeGreaterThan(0);
        expect(Array.isArray(service.benefits)).toBe(true);
        expect(service.benefits.length).toBeGreaterThan(0);
      });
    });

    it('should have valid therapist data', () => {
      mockTherapists.forEach((therapist) => {
        expect(therapist.id).toBeTruthy();
        expect(therapist.name).toBeTruthy();
        expect(Array.isArray(therapist.specialization)).toBe(true);
        expect(therapist.specialization.length).toBeGreaterThan(0);
        expect(therapist.experience).toBeGreaterThan(0);
      });
    });
  });
});
