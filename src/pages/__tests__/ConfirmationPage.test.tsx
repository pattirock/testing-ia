import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import { ConfirmationPage } from '../ConfirmationPage';

// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock the bookingService
jest.mock('../../services/bookingService', () => ({
  bookingService: {
    getBooking: jest.fn().mockResolvedValue({
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

// Mock the servicesService
jest.mock('../../services/servicesService', () => ({
  servicesService: {
    getServiceById: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Masaje Relajante',
      type: 'massage',
      description: 'Masaje suave',
      duration: 60,
      price: 50,
      benefits: ['Reduce estrés'],
    }),
    getTherapistById: jest.fn().mockResolvedValue({
      id: '1',
      name: 'Terapeuta 1',
      specialization: 'massage',
      experience: 5,
      bio: 'Experiente',
      imageUrl: 'https://example.com/img.jpg',
    }),
  },
}));

describe('ConfirmationPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
  });

  it('should render confirmation page title', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Reserva Confirmada/i)).toBeInTheDocument();
    });
  });

  it('should display booking ID', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/123/)).toBeInTheDocument();
    });
  });

  it('should load and display booking details', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('juan@example.com')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
    });
  });

  it('should display service name', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
    });
  });

  it('should display therapist name', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Terapeuta 1')).toBeInTheDocument();
    });
  });

  it('should display booking date and time', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/2024-12-15/)).toBeInTheDocument();
      expect(screen.getByText(/09:00/)).toBeInTheDocument();
    });
  });

  it('should render navigation buttons', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Ir al Inicio/i)).toBeInTheDocument();
      expect(screen.getByText(/Ver Más Servicios/i)).toBeInTheDocument();
    });
  });

  it('should display contact information section', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Información de Contacto/i)).toBeInTheDocument();
    });
  });

  it('should render success checkmark or icon', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      // The page should display confirmation message
      expect(screen.getByText(/Confirmada/i)).toBeInTheDocument();
    });
  });

  it('should display email confirmation message', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/correo de confirmación/i)).toBeInTheDocument();
    });
  });

  it('should have semantic heading structure', async () => {
    renderWithRouter(<ConfirmationPage />);
    
    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });
});
