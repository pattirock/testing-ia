import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AboutPage } from '../AboutPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AboutPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<AboutPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render page title', () => {
    renderWithRouter(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /Sobre/i });
    expect(heading).toBeInTheDocument();
  });

  it('should display company name', () => {
    renderWithRouter(<AboutPage />);
    const headings = screen.getAllByRole('heading');
    const hasCompanyName = headings.some((h) => /TherapyHub/.test(h.textContent || ''));
    expect(hasCompanyName).toBe(true);
  });

  it('should have page structure', () => {
    renderWithRouter(<AboutPage />);
    // Check that main content is rendered
    expect(screen.getByText(/Nuestra Misión/i)).toBeInTheDocument();
  });

  it('should render semantic sections', () => {
    const { container } = renderWithRouter(<AboutPage />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should have hero component', () => {
    renderWithRouter(<AboutPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display content', () => {
    const { container } = renderWithRouter(<AboutPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('should have page wrapper', () => {
    const { container } = renderWithRouter(<AboutPage />);
    const pageDiv = container.querySelector('div');
    expect(pageDiv).toBeInTheDocument();
  });

  it('should render properly within router', () => {
    renderWithRouter(<AboutPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should have proper semantic HTML', () => {
    const { container } = renderWithRouter(<AboutPage />);
    const headings = container.querySelectorAll('h1, h2, h3');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display About page content', () => {
    renderWithRouter(<AboutPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeVisible();
  });
});
