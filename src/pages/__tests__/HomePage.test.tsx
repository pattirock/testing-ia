import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock the servicesService
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
        benefits: ['Reduce estrés', 'Mejora circulación'],
      },
      {
        id: '2',
        name: 'Masaje Profundo',
        type: 'massage',
        description: 'Masaje profundo',
        duration: 75,
        price: 65,
        benefits: ['Alivio de dolor', 'Flexibilidad'],
      },
      {
        id: '3',
        name: 'Presoterapia',
        type: 'pressotherapy',
        description: 'Presoterapia',
        duration: 45,
        price: 55,
        benefits: ['Drenaje linfático', 'Reduce hinchazón'],
      },
    ]),
  },
}));

describe('HomePage', () => {
  it('should render hero section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Bienvenido a TherapyHub')).toBeInTheDocument();
  });

  it('should render intro section with description', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Cargando servicios...')).toBeInTheDocument();
  });

  it('should load and display featured services', async () => {
    renderWithRouter(<HomePage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
      expect(screen.getByText('Masaje Profundo')).toBeInTheDocument();
      expect(screen.getByText('Presoterapia')).toBeInTheDocument();
    });
  });

  it('should display only 3 featured services', async () => {
    renderWithRouter(<HomePage />);
    
    await waitFor(() => {
      const serviceCards = screen.getAllByText(/Reservar Ahora/);
      // Should have exactly 3 service cards
      expect(serviceCards.length).toBe(3);
    });
  });

  it('should render benefits section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('¿Por qué elegirnos?')).toBeInTheDocument();
  });

  it('should render benefits features', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Terapeutas Profesionales')).toBeInTheDocument();
    expect(screen.getByText('Máxima Calidad')).toBeInTheDocument();
    expect(screen.getByText('Ambiente Relajante')).toBeInTheDocument();
    expect(screen.getByText('Reservas Fáciles')).toBeInTheDocument();
  });

  it('should render CTA section', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('¿Listo para relajarte?')).toBeInTheDocument();
  });

  it('should have reservation buttons', async () => {
    renderWithRouter(<HomePage />);
    
    await waitFor(() => {
      const buttons = screen.getAllByText('Reservar Ahora');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it('should have proper heading hierarchy', () => {
    renderWithRouter(<HomePage />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });
});
