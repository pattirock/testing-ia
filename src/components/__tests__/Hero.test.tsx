import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero Component', () => {
  it('should render title prop', () => {
    render(<Hero title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('should render subtitle when provided', () => {
    render(<Hero title="Welcome" subtitle="Test subtitle" />);
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('should not render subtitle when not provided', () => {
    const { container } = render(<Hero title="Welcome" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('should render CTA button when provided', () => {
    const mockAction = jest.fn();
    render(
      <Hero 
        title="Welcome" 
        cta={{ text: 'Click Me', action: mockAction }}
      />
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should not render CTA button when not provided', () => {
    render(<Hero title="Welcome" />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('should call action when CTA button is clicked', () => {
    const mockAction = jest.fn();
    render(
      <Hero 
        title="Welcome" 
        cta={{ text: 'Click Me', action: mockAction }}
      />
    );
    
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('should apply background image style when provided', () => {
    const { container } = render(
      <Hero 
        title="Welcome" 
        backgroundImage="https://example.com/image.jpg"
      />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveStyle({ backgroundImage: 'url(https://example.com/image.jpg)' });
  });

  it('should not apply background image for invalid URLs', () => {
    const { container } = render(
      <Hero 
        title="Welcome" 
        backgroundImage="not-a-valid-url"
      />
    );
    
    const section = container.querySelector('section');
    expect(section?.style.backgroundImage).toBeFalsy();
  });

  it('should have proper semantic structure', () => {
    render(<Hero title="Welcome" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
