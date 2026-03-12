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
    const { container } = renderWithRouter(<ServicesPage />);
    expect(container.querySelector('.page')).toBeInTheDocument();
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
    const { container } = renderWithRouter(<ServicesPage />);
    expect(container.querySelector('.content')).toBeInTheDocument();
  });

  it('should have filter buttons present in DOM', () => {
    renderWithRouter(<ServicesPage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display loading or content area', () => {
    const { container } = renderWithRouter(<ServicesPage />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
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
