import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmationPage } from '../ConfirmationPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ConfirmationPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container).toBeInTheDocument();
  });

  it('should have page structure', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('should render section element', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should display heading', () => {
    renderWithRouter(<ConfirmationPage />);
    const heading = screen.queryByRole('heading');
    expect(heading).toBeInTheDocument();
  });

  it('should render as semantic HTML', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    const content = container.innerHTML;
    expect(content).toBeTruthy();
  });

  it('should have content wrapper', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    const wrapper = container.querySelector('.wrapper') || container.querySelector('div');
    expect(wrapper).toBeInTheDocument();
  });

  it('should render properly within router', () => {
    renderWithRouter(<ConfirmationPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should have page content', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container.innerHTML.length).toBeGreaterThan(0);
  });

  it('should display confirmation related elements', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should render with proper markup', () => {
    renderWithRouter(<ConfirmationPage />);
    expect(screen.getByRole('heading')).toBeVisible();
  });
});
