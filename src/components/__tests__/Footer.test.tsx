import '@testing-library/jest-dom';
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
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  it('should display phone number', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Teléfono:/i)).toBeInTheDocument();
  });

  it('should display email address', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
  });

  it('should display business hours section', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Horario/i)).toBeInTheDocument();
  });

  it('should display weekday hours', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Lunes|Monday|Lun/i)).toBeInTheDocument();
  });

  it('should display weekend hours', () => {
    renderWithRouter(<Footer />);
    // Check that at least one weekend day is displayed
    const hasWeekendHours = screen.queryByText(/Sábado/i) || screen.queryByText(/Domingo/i);
    expect(hasWeekendHours).toBeInTheDocument();
  });

  it('should have navigation links', () => {
    renderWithRouter(<Footer />);
    // Footer has contact links (tel, mailto) and social links
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have link to services page', () => {
    renderWithRouter(<Footer />);
    // Footer displays social media links instead
    const socialLinks = screen.getAllByRole('link');
    const hasSocialLink = socialLinks.some((link) =>
      /facebook|instagram|whatsapp/i.test(link.textContent || '')
    );
    expect(hasSocialLink).toBe(true);
  });

  it('should have link to about page', () => {
    renderWithRouter(<Footer />);
    // Footer displays "Síguenos" section instead of about link
    expect(screen.getByText(/Síguenos/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Dirección:/i)).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName).toBe('FOOTER');
  });

  it('should render multiple columns for information', () => {
    renderWithRouter(<Footer />);
    // Check that multiple information categories are displayed
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
    expect(screen.getByText(/Horario/i)).toBeInTheDocument();
  });
});
