import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookingPage } from '../BookingPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock the services
jest.mock('../../services/servicesService', () => ({
  servicesService: {
    getAllServices: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Masaje Relajante',
        type: 'massage',
        description: 'Masaje suave',
        duration: 60,
        price: 50,
        benefits: ['Reduce estrés'],
      },
      {
        id: '2',
        name: 'Presoterapia',
        type: 'pressotherapy',
        description: 'Presoterapia',
        duration: 45,
        price: 55,
        benefits: ['Drenaje linfático'],
      },
    ]),
    getAllTherapists: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Terapeuta 1',
        specialization: 'massage',
        experience: 5,
        bio: 'Experiente',
        imageUrl: 'https://example.com/img.jpg',
      },
      {
        id: '2',
        name: 'Terapeuta 2',
        specialization: 'pressotherapy',
        experience: 3,
        bio: 'Terapeuta',
        imageUrl: 'https://example.com/img.jpg',
      },
    ]),
  },
}));

jest.mock('../../services/bookingService', () => ({
  bookingService: {
    getAvailableSlots: jest.fn().mockResolvedValue([
      '09:00',
      '10:00',
      '11:00',
      '14:00',
      '15:00',
    ]),
    createBooking: jest.fn().mockResolvedValue({
      id: '123',
      serviceId: '1',
      therapistId: '1',
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      clientPhone: '123456789',
      date: '2024-12-15',
      time: '09:00',
      createdAt: '2024-12-01',
    }),
  },
}));

describe('BookingPage', () => {
  it('should render page title', () => {
    renderWithRouter(<BookingPage />);
    expect(screen.getByText('Reserva tu Sesión')).toBeInTheDocument();
  });

  it('should render all form fields', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Servicio/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Terapeuta/i)).toBeInTheDocument();
    });
  });

  it('should render date and time inputs', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument();
    });
  });

  it('should load services and therapists on mount', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
      expect(screen.getByText('Presoterapia')).toBeInTheDocument();
      expect(screen.getByText('Terapeuta 1')).toBeInTheDocument();
      expect(screen.getByText('Terapeuta 2')).toBeInTheDocument();
    });
  });

  it('should update form field when input changes', async () => {
    renderWithRouter(<BookingPage />);
    
    const nameInput = screen.getByLabelText(/Nombre completo/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    
    expect(nameInput.value).toBe('Juan Pérez');
  });

  it('should update email field', async () => {
    renderWithRouter(<BookingPage />);
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    
    expect(emailInput.value).toBe('juan@example.com');
  });

  it('should update phone field', async () => {
    renderWithRouter(<BookingPage />);
    
    const phoneInput = screen.getByLabelText(/Teléfono/i) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: '123456789' } });
    
    expect(phoneInput.value).toBe('123456789');
  });

  it('should render submit button', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Confirmar Reserva')).toBeInTheDocument();
    });
  });

  it('should have proper form structure', () => {
    renderWithRouter(<BookingPage />);
    expect(screen.getByText('Reserva tu Sesión')).toBeInTheDocument();
  });

  it('should display booking information', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Selecciona el servicio que deseas/i)).toBeInTheDocument();
    });
  });

  it('should render therapist icon or identifier', async () => {
    renderWithRouter(<BookingPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Terapeuta')).toBeInTheDocument();
    });
  });
});
