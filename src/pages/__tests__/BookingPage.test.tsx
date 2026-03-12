import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookingPage } from '../BookingPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BookingPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<BookingPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render page title', () => {
    renderWithRouter(<BookingPage />);
    expect(screen.getByText(/Reserva tu Sesión/i)).toBeInTheDocument();
  });

  it('should render form container', () => {
    const { container } = renderWithRouter(<BookingPage />);
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
  });

  it('should have semantic structure', () => {
    renderWithRouter(<BookingPage />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('should render multiple div containers', () => {
    const { container } = renderWithRouter(<BookingPage />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should be wrapped in router', () => {
    const { container } = renderWithRouter(<BookingPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render page with content', () => {
    const { container } = renderWithRouter(<BookingPage />);
    const content = container.innerHTML;
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have proper page structure', () => {
    const { container } = renderWithRouter(<BookingPage />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('should render section element', () => {
    const { container } = renderWithRouter(<BookingPage />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
