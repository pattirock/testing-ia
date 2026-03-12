import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AboutPage } from '../AboutPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock the servicesService
jest.mock('../../services/servicesService', () => ({
  servicesService: {
    getAllTherapists: jest.fn().mockResolvedValue([
      {
        id: '1',
        name: 'Terapeuta 1',
        specialization: 'massage',
        experience: 5,
        bio: 'Especialista en masaje terapéutico',
        imageUrl: 'https://example.com/therapist1.jpg',
      },
      {
        id: '2',
        name: 'Terapeuta 2',
        specialization: 'pressotherapy',
        experience: 3,
        bio: 'Experta en presoterapia',
        imageUrl: 'https://example.com/therapist2.jpg',
      },
      {
        id: '3',
        name: 'Terapeuta 3',
        specialization: 'maderoterapy',
        experience: 4,
        bio: 'Especialista en maderoterapia',
        imageUrl: 'https://example.com/therapist3.jpg',
      },
    ]),
  },
}));

describe('AboutPage', () => {
  it('should render page title', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
  });

  it('should render hero title', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/TherapyHub/i)).toBeInTheDocument();
  });

  it('should render mission section', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Nuestra Misión/i)).toBeInTheDocument();
  });

  it('should render mission description', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/proporcionar servicios de terapia de alta calidad/i)).toBeInTheDocument();
  });

  it('should load and display all therapists', async () => {
    renderWithRouter(<AboutPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Terapeuta 1')).toBeInTheDocument();
      expect(screen.getByText('Terapeuta 2')).toBeInTheDocument();
      expect(screen.getByText('Terapeuta 3')).toBeInTheDocument();
    });
  });

  it('should display therapist specializations', async () => {
    renderWithRouter(<AboutPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Masajes/i)).toBeInTheDocument();
      expect(screen.getByText(/Presoterapia/i)).toBeInTheDocument();
      expect(screen.getByText(/Maderoterapia/i)).toBeInTheDocument();
    });
  });

  it('should display therapist bios', async () => {
    renderWithRouter(<AboutPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Especialista en masaje terapéutico/i)).toBeInTheDocument();
      expect(screen.getByText(/Experta en presoterapia/i)).toBeInTheDocument();
      expect(screen.getByText(/Especialista en maderoterapia/i)).toBeInTheDocument();
    });
  });

  it('should display experience years', async () => {
    renderWithRouter(<AboutPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/5\s*años/)).toBeInTheDocument();
      expect(screen.getByText(/3\s*años/)).toBeInTheDocument();
      expect(screen.getByText(/4\s*años/)).toBeInTheDocument();
    });
  });

  it('should render therapist cards with images', async () => {
    renderWithRouter(<AboutPage />);
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('should render values section', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Nuestros Valores/i)).toBeInTheDocument();
  });

  it('should display all core values', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Profesionalismo/i)).toBeInTheDocument();
    expect(screen.getByText(/Cuidado/i)).toBeInTheDocument();
    expect(screen.getByText(/Excelencia/i)).toBeInTheDocument();
  });

  it('should have semantic heading structure', () => {
    renderWithRouter(<AboutPage />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
  });
});
