import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Footer';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer', () => {
  it('should render footer element', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display company name', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/TherapyHub/)).toBeInTheDocument();
  });

  it('should display contact information', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
  });

  it('should display phone number', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/\+1234567890|123-456-7890/)).toBeInTheDocument();
  });

  it('should display email address', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/info@therapyhub\.com|contacto@therapyhub\.com/)).toBeInTheDocument();
  });

  it('should display business hours section', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Horarios/i)).toBeInTheDocument();
  });

  it('should display weekday hours', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Lunes|Monday|Lun/i)).toBeInTheDocument();
  });

  it('should display weekend hours', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Sábado|Domingo|Sat|Sun/i)).toBeInTheDocument();
  });

  it('should have navigation links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Inicio|Inicio de/i)).toBeInTheDocument();
  });

  it('should have link to services page', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Servicios/)).toBeInTheDocument();
  });

  it('should have link to about page', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Sobre Nosotros|Acerca de/i)).toBeInTheDocument();
  });

  it('should have link to contact page', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Contacto/)).toBeInTheDocument();
  });

  it('should display social media links or placeholders', () => {
    renderWithRouter(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should display copyright information', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Copyright|©|derechos reservados/i)).toBeInTheDocument();
  });

  it('should display company address', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Dirección|Ubicación|Address/i)).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
  });

  it('should render multiple columns for information', () => {
    renderWithRouter(<Footer />);
    // Check that multiple information categories are displayed
    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
    expect(screen.getByText(/Horarios/i)).toBeInTheDocument();
  });
});
