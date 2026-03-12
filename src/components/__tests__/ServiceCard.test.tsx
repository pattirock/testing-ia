import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceCard } from '../ServiceCard';
import { Service } from '../../types';

const mockService: Service = {
  id: '1',
  name: 'Masaje Relajante',
  type: 'massage',
  description: 'Masaje suave y relajante',
  duration: 60,
  price: 50,
  benefits: ['Reduce estrés', 'Mejora circulación', 'Alivia dolor muscular', 'Mejora sueño'],
};

describe('ServiceCard Component', () => {
  it('should render service name', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Masaje Relajante')).toBeInTheDocument();
  });

  it('should render service description', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Masaje suave y relajante')).toBeInTheDocument();
  });

  it('should render service duration', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText(/60 min/)).toBeInTheDocument();
  });

  it('should render service price', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('should render first 3 benefits', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Reduce estrés')).toBeInTheDocument();
    expect(screen.getByText('Mejora circulación')).toBeInTheDocument();
    expect(screen.getByText('Alivia dolor muscular')).toBeInTheDocument();
  });

  it('should not render more than 3 benefits', () => {
    render(<ServiceCard service={mockService} />);
    // The 4th benefit should not be rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });

  it('should render select button when onSelect is provided', () => {
    const mockOnSelect = jest.fn();
    render(<ServiceCard service={mockService} onSelect={mockOnSelect} />);
    expect(screen.getByText('Reservar Ahora')).toBeInTheDocument();
  });

  it('should not render select button when onSelect is not provided', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.queryByText('Reservar Ahora')).not.toBeInTheDocument();
  });

  it('should call onSelect when button is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ServiceCard service={mockService} onSelect={mockOnSelect} />);
    
    const button = screen.getByText('Reservar Ahora');
    fireEvent.click(button);
    
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockService);
  });

  it('should render service image when provided', () => {
    const serviceWithImage = {
      ...mockService,
      image: 'https://example.com/image.jpg',
    };
    render(<ServiceCard service={serviceWithImage} />);
    
    const image = screen.getByAltText('Masaje Relajante');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should have proper heading hierarchy', () => {
    render(<ServiceCard service={mockService} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.textContent).toBe('Masaje Relajante');
  });
});
