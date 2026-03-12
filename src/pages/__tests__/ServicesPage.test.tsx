import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ServicesPage } from '../ServicesPage';

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
      {
        id: '3',
        name: 'Maderoterapia',
        type: 'maderoterapy',
        description: 'Maderoterapia',
        duration: 50,
        price: 60,
        benefits: ['Estimula circulación'],
      },
    ]),
  },
}));

describe('ServicesPage', () => {
  it('should render page title', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText('Cargando servicios...')).toBeInTheDocument();
  });

  it('should load and display all services', async () => {
    renderWithRouter(<ServicesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
      expect(screen.getByText('Presoterapia')).toBeInTheDocument();
      expect(screen.getByText('Maderoterapia')).toBeInTheDocument();
    });
  });

  it('should render filter buttons', async () => {
    renderWithRouter(<ServicesPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Todos los servicios/)).toBeInTheDocument();
      expect(screen.getByText(/Masajes Terapéuticos/)).toBeInTheDocument();
      expect(screen.getByText(/Presoterapia/)).toBeInTheDocument();
      expect(screen.getByText(/Maderoterapia/)).toBeInTheDocument();
    });
  });

  it('should filter services by type when filter button is clicked', async () => {
    renderWithRouter(<ServicesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
    });

    const massageFilter = screen.getByText(/Masajes Terapéuticos/);
    fireEvent.click(massageFilter);

    // Should still see massage service
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
    // Should not see other types
    expect(screen.queryByText('Presoterapia')).not.toBeInTheDocument();
    expect(screen.queryByText('Maderoterapia')).not.toBeInTheDocument();
  });

  it('should show all services when "Todos" filter is clicked', async () => {
    renderWithRouter(<ServicesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
    });

    // First, apply a filter
    const massageFilter = screen.getByText(/Masajes Terapéuticos/);
    fireEvent.click(massageFilter);

    // Then, click "Todos"
    const todosButton = screen.getByText(/Todos los servicios/);
    fireEvent.click(todosButton);

    // All services should be visible
    await waitFor(() => {
      expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
      expect(screen.getByText('Presoterapia')).toBeInTheDocument();
      expect(screen.getByText('Maderoterapia')).toBeInTheDocument();
    });
  });

  it('should render service cards with reservation buttons', async () => {
    renderWithRouter(<ServicesPage />);
    
    await waitFor(() => {
      const buttons = screen.getAllByText('Reservar Ahora');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should render info section', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText('Información sobre nuestros servicios')).toBeInTheDocument();
  });

  it('should have proper page structure with hero', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText('Descubre todo lo que ofrecemos para tu bienestar')).toBeInTheDocument();
  });
});
