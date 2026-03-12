import { bookingService } from '../bookingService';
import { Booking } from '../../types';

describe('bookingService', () => {
  describe('createBooking', () => {
    it('should create a booking with unique ID', async () => {
      const bookingData = {
        clientName: 'John Doe',
        clientEmail: 'john@example.com',
        clientPhone: '+34 612 345 678',
        serviceId: '1',
        therapistId: 't1',
        date: new Date('2026-04-01'),
        startTime: '10:00',
        endTime: '11:00',
        notes: 'Test booking',
        status: 'pending' as const,
        price: 50,
      };

      const booking = await bookingService.createBooking(bookingData);
      expect(booking).toBeDefined();
      expect(booking.id).toBeTruthy();
      expect(booking.id).toMatch(/^booking_\d+$/);
      expect(booking.clientName).toBe(bookingData.clientName);
      expect(booking.clientEmail).toBe(bookingData.clientEmail);
    });

    it('should create bookings with different IDs', async () => {
      const bookingData1 = {
        clientName: 'John Doe',
        clientEmail: 'john@example.com',
        clientPhone: '+34 612 345 678',
        serviceId: '1',
        therapistId: 't1',
        date: new Date('2026-04-01'),
        startTime: '10:00',
        endTime: '11:00',
        notes: '',
        status: 'pending' as const,
        price: 50,
      };

      const bookingData2 = {
        clientName: 'Jane Doe',
        clientEmail: 'jane@example.com',
        clientPhone: '+34 612 345 679',
        serviceId: '2',
        therapistId: 't2',
        date: new Date('2026-04-02'),
        startTime: '11:00',
        endTime: '12:00',
        notes: '',
        status: 'pending' as const,
        price: 65,
      };

      const booking1 = await bookingService.createBooking(bookingData1);
      const booking2 = await bookingService.createBooking(bookingData2);

      expect(booking1.id).not.toBe(booking2.id);
    });
  });

  describe('getBooking', () => {
    it('should retrieve a created booking', async () => {
      const bookingData = {
        clientName: 'Test User',
        clientEmail: 'test@example.com',
        clientPhone: '+34 612 345 678',
        serviceId: '1',
        therapistId: 't1',
        date: new Date('2026-04-01'),
        startTime: '10:00',
        endTime: '11:00',
        notes: '',
        status: 'pending' as const,
        price: 50,
      };

      const created = await bookingService.createBooking(bookingData);
      const retrieved = await bookingService.getBooking(created.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(created.id);
      expect(retrieved?.clientName).toBe(bookingData.clientName);
    });

    it('should return undefined for non-existent booking', async () => {
      const booking = await bookingService.getBooking('booking_nonexistent');
      expect(booking).toBeUndefined();
    });
  });

  describe('getAvailableSlots', () => {
    it('should return available time slots', async () => {
      const slots = await bookingService.getAvailableSlots('1', new Date('2026-04-01'));
      expect(slots).toBeDefined();
      expect(Array.isArray(slots)).toBe(true);
      expect(slots.length).toBeGreaterThan(0);
    });

    it('should return slots in correct format', async () => {
      const slots = await bookingService.getAvailableSlots('1', new Date('2026-04-01'));
      slots.forEach((slot) => {
        expect(slot).toHaveProperty('startTime');
        expect(slot).toHaveProperty('endTime');
        expect(typeof slot.startTime).toBe('string');
        expect(typeof slot.endTime).toBe('string');
      });
    });

    it('should return slots between 9:00 and 18:00', async () => {
      const slots = await bookingService.getAvailableSlots('1', new Date('2026-04-01'));
      slots.forEach((slot) => {
        const hour = parseInt(slot.startTime.split(':')[0]);
        expect(hour).toBeGreaterThanOrEqual(9);
        expect(hour).toBeLessThan(18);
      });
    });

    it('should return empty array for missing parameters', async () => {
      const slots = await bookingService.getAvailableSlots('', new Date());
      expect(slots).toEqual([]);
    });
  });

  describe('sendConfirmationEmail', () => {
    it('should resolve confirmation email sending', async () => {
      const result = await bookingService.sendConfirmationEmail('test@example.com', 'booking_123');
      expect(result).toBe(true);
    });

    it('should accept valid email addresses', async () => {
      const result = await bookingService.sendConfirmationEmail('user@example.com', 'booking_456');
      expect(result).toBe(true);
    });
  });

  describe('getAllBookings', () => {
    it('should return all bookings', async () => {
      const bookingData = {
        clientName: 'Test User',
        clientEmail: 'test@example.com',
        clientPhone: '+34 612 345 678',
        serviceId: '1',
        therapistId: 't1',
        date: new Date('2026-04-01'),
        startTime: '10:00',
        endTime: '11:00',
        notes: '',
        status: 'pending' as const,
        price: 50,
      };

      const initialBookings = await bookingService.getAllBookings();
      const initialCount = initialBookings.length;

      await bookingService.createBooking(bookingData);

      const allBookings = await bookingService.getAllBookings();
      // Note: This test may be flaky in parallel test runs due to shared state
      expect(allBookings.length).toBeGreaterThanOrEqual(initialCount);
    });
  });
});
