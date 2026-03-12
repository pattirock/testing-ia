import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  it('should render header with company name', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('TherapyHub')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Sobre Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('should render booking button', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Reservar')).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', () => {
    renderWithRouter(<Header />);
    const menuToggle = screen.getByRole('button', { name: '' });

    fireEvent.click(menuToggle);
    // Menu should be open
    expect(menuToggle.parentElement).toHaveClass('open');

    fireEvent.click(menuToggle);
    // Menu should be closed
    expect(menuToggle.parentElement).not.toHaveClass('open');
  });

  it('should have proper semantic structure', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should have navigation links with correct href attributes', () => {
    renderWithRouter(<Header />);
    const inicioLink = screen.getByText('Inicio').closest('a');
    expect(inicioLink).toHaveAttribute('href', '/');
  });
});
