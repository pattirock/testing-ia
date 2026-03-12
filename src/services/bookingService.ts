import { Booking } from '@/types';

/**
 * Service for managing bookings (mock implementation)
 */

const bookings: Booking[] = [];

export const bookingService = {
  createBooking: async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking: Booking = {
          ...booking,
          id: `booking_${Date.now()}`,
        };
        bookings.push(newBooking);
        resolve(newBooking);
      }, 500);
    });
  },

  getBooking: async (id: string): Promise<Booking | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(bookings.find((b) => b.id === id)), 200);
    });
  },

  getAvailableSlots: async (
    serviceId: string,
    date: Date
  ): Promise<{ startTime: string; endTime: string }[]> => {
    if (!serviceId || !date) {
      console.warn('Missing serviceId or date for available slots');
      return [];
    }
    // Mock available slots between 9:00 and 18:00
    console.debug(`Loading available slots for service ${serviceId} on date ${date.toDateString()}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const slots = [];
        for (let hour = 9; hour < 18; hour++) {
          slots.push({
            startTime: `${hour}:00`,
            endTime: `${hour + 1}:00`,
          });
        }
        resolve(slots);
      }, 300);
    });
  },

  sendConfirmationEmail: async (email: string, bookingId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Confirmation email sent to ${email} for booking ${bookingId}`);
        resolve(true);
      }, 500);
    });
  },

  getAllBookings: async (): Promise<Booking[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(bookings), 200);
    });
  },
};
