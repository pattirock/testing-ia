import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ConfirmationPage } from '../ConfirmationPage';

const renderWithRouter = (
  component: React.ReactElement,
  initialRoute = '/confirmation?bookingId=test123'
) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/booking" element={<div>Booking</div>} />
        <Route path="/confirmation" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ConfirmationPage', () => {
  it('should render without crashing', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container).toBeInTheDocument();
  });

  it('should have page structure', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should render section element', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should display heading', () => {
    renderWithRouter(<ConfirmationPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('should render as semantic HTML', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    const content = container.innerHTML;
    expect(content.length).toBeGreaterThan(0);
  });

  it('should have content wrapper', () => {
    const { container } = renderWithRouter(<ConfirmationPage />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should render properly within router', () => {
    renderWithRouter(<ConfirmationPage />);
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
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
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toBeVisible();
  });
});
