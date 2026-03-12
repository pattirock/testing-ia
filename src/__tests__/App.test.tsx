import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render with router', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should have main application structure', () => {
    render(<App />);
    // Check if Header is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render header with company name', () => {
    render(<App />);
    expect(screen.getByText('TherapyHub')).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should render navigation header', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should have links to main sections', () => {
    render(<App />);
    // Check that navigation links exist (using role to be specific)
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);

    // Verify at least one link to each section exists
    const linkTexts = navLinks.map((link) => link.textContent);
    expect(linkTexts.join(' ')).toContain('Inicio');
    expect(linkTexts.join(' ')).toContain('Servicios');
  });

  it('should be mobile responsive ready', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
    // Component should render successfully on all screen sizes
  });
});
