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
    const nav = screen.getByRole('navigation');

    fireEvent.click(menuToggle);
    // Menu should be open
    expect(nav).toHaveClass('open');

    fireEvent.click(menuToggle);
    // Menu should be closed
    expect(nav).not.toHaveClass('open');
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

  it('should close menu when clicking on a navigation link', () => {
    renderWithRouter(<Header />);
    const menuToggle = screen.getByRole('button', { name: '' });
    const nav = screen.getByRole('navigation');
    const serviciosLink = screen.getByText('Servicios').closest('a');

    // Open menu
    fireEvent.click(menuToggle);
    expect(nav).toHaveClass('open');

    // Click on link should close menu
    fireEvent.click(serviciosLink!);
    expect(nav).not.toHaveClass('open');
  });

  it('should have all navigation links with correct hrefs', () => {
    renderWithRouter(<Header />);

    const inicioLink = screen.getByText('Inicio').closest('a');
    const serviciosLink = screen.getByText('Servicios').closest('a');
    const acercaLink = screen.getByText('Sobre Nosotros').closest('a');
    const contactoLink = screen.getByText('Contacto').closest('a');

    expect(inicioLink).toHaveAttribute('href', '/');
    expect(serviciosLink).toHaveAttribute('href', '/services');
    expect(acercaLink).toHaveAttribute('href', '/about');
    expect(contactoLink).toHaveAttribute('href', '/contact');
  });

  it('should render logo as link to home', () => {
    renderWithRouter(<Header />);
    const logoLink = screen.getByText('✨').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should have booking button with booking route', () => {
    renderWithRouter(<Header />);
    const bookingBtn = screen.getByText('Reservar').closest('a');
    expect(bookingBtn).toHaveAttribute('href', '/booking');
  });
});
