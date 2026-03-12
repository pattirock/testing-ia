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
    expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
  });

  it('should display company name', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/TherapyHub/i)).toBeInTheDocument();
  });

  it('should have page structure', () => {
    const { container } = renderWithRouter(<AboutPage />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('should render semantic sections', () => {
    const { container } = renderWithRouter(<AboutPage />);
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should have hero component', () => {
    renderWithRouter(<AboutPage />);
    expect(screen.getByText(/Sobre Nosotros|TherapyHub/i)).toBeInTheDocument();
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
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should have proper semantic HTML', () => {
    const { container } = renderWithRouter(<AboutPage />);
    const headings = container.querySelectorAll('h1, h2, h3');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should display About page content', () => {
    renderWithRouter(<AboutPage />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeVisible();
  });
});
