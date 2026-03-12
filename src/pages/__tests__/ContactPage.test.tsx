import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContactPage } from '../ContactPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<ContactPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render page title', () => {
    renderWithRouter(<ContactPage />);
    // Find main h1 heading
    const mainHeading = screen.getByRole('heading', { level: 1, name: /Contacto/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('should have page structure', () => {
    renderWithRouter(<ContactPage />);
    // Check main heading is present
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('should render semantic HTML', () => {
    const { container } = renderWithRouter(<ContactPage />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should display page content', () => {
    const { container } = renderWithRouter(<ContactPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('should render with proper wrapper', () => {
    const { container } = renderWithRouter(<ContactPage />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should have heading element', () => {
    renderWithRouter(<ContactPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should render properly within router', () => {
    renderWithRouter(<ContactPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display contact page content', () => {
    renderWithRouter(<ContactPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeVisible();
  });

  it('should have semantic structure with multiple sections', () => {
    const { container } = renderWithRouter(<ContactPage />);
    const content = container.querySelector('section');
    expect(content).toBeInTheDocument();
  });
});
