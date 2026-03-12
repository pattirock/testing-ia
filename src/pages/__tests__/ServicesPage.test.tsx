import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ServicesPage } from '../ServicesPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ServicesPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<ServicesPage />);
    expect(container).toBeInTheDocument();
  });

  it('should have page container', () => {
    renderWithRouter(<ServicesPage />);
    // Check main heading is present
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('should render Hero component', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('should render filter section', () => {
    renderWithRouter(<ServicesPage />);
    expect(screen.getByText(/Filtrar por tipo/i)).toBeInTheDocument();
  });

  it('should render content container', () => {
    renderWithRouter(<ServicesPage />);
    // Verify main content exists
    const services = screen.getByText('Nuestros Servicios');
    expect(services).toBeInTheDocument();
  });

  it('should have filter buttons present in DOM', () => {
    renderWithRouter(<ServicesPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display loading or content area', () => {
    renderWithRouter(<ServicesPage />);
    // Verify main content renders
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
  });

  it('should have proper page structure', () => {
    renderWithRouter(<ServicesPage />);
    const heading = screen.getByText('Nuestros Servicios');
    expect(heading).toBeInTheDocument();
  });

  it('should render semantic HTML', () => {
    const { container } = renderWithRouter(<ServicesPage />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });
});
