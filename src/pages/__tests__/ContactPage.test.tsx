import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContactPage } from '../ContactPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactPage', () => {
  it('should render page title', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
  });

  it('should render contact form', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Formulario de Contacto/i)).toBeInTheDocument();
  });

  it('should render contact information section', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Información de Contacto/i)).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    renderWithRouter(<ContactPage />);
    
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Asunto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  it('should render submit button', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Enviar Mensaje/i)).toBeInTheDocument();
  });

  it('should update name field when value changes', () => {
    renderWithRouter(<ContactPage />);
    
    const nameInput = screen.getByLabelText(/Nombre/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    
    expect(nameInput.value).toBe('Juan Pérez');
  });

  it('should update email field when value changes', () => {
    renderWithRouter(<ContactPage />);
    
    const emailInput = screen.getByLabelText(/Correo/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    
    expect(emailInput.value).toBe('juan@example.com');
  });

  it('should update phone field when value changes', () => {
    renderWithRouter(<ContactPage />);
    
    const phoneInput = screen.getByLabelText(/Teléfono/i) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: '+1234567890' } });
    
    expect(phoneInput.value).toBe('+1234567890');
  });

  it('should update subject field when value changes', () => {
    renderWithRouter(<ContactPage />);
    
    const subjectInput = screen.getByLabelText(/Asunto/i) as HTMLInputElement;
    fireEvent.change(subjectInput, { target: { value: 'Consulta sobre servicios' } });
    
    expect(subjectInput.value).toBe('Consulta sobre servicios');
  });

  it('should update message field when value changes', () => {
    renderWithRouter(<ContactPage />);
    
    const messageInput = screen.getByLabelText(/Mensaje/i) as HTMLTextAreaElement;
    fireEvent.change(messageInput, { target: { value: 'Me gustaría más información' } });
    
    expect(messageInput.value).toBe('Me gustaría más información');
  });

  it('should display phone number in contact info', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/\+1234567890|123-456-7890/)).toBeInTheDocument();
  });

  it('should display email in contact info', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/info@therapyhub\.com|contacto@therapyhub\.com/)).toBeInTheDocument();
  });

  it('should display business hours', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Horarios/i)).toBeInTheDocument();
  });

  it('should display business hours details', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Lunes|Monday/i)).toBeInTheDocument();
  });

  it('should have semantic heading structure', () => {
    renderWithRouter(<ContactPage />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
  });

  it('should have proper form structure with labels', () => {
    renderWithRouter(<ContactPage />);
    
    const labels = screen.getAllByText(/Nombre|Correo|Teléfono|Asunto|Mensaje/i);
    expect(labels.length).toBeGreaterThanOrEqual(5);
  });

  it('should render location information', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Ubicación|Dirección/i)).toBeInTheDocument();
  });
});
