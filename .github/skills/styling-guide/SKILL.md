---
name: styling-guide
description: "Use when: setting up CSS/SCSS structure, creating component styles, implementing theming, or establishing CSS architecture. Provides guidelines for modern responsive styling with BEM convention."
---

# Styling Guide - BEM & SCSS

Professional CSS/SCSS architecture using BEM convention for maintainable component styling.

## Project Structure

```
src/
├── styles/
│   ├── index.scss              # Global entry point
│   ├── variables.scss          # Color, spacing, fonts
│   ├── mixins.scss             # Reusable SCSS mixins
│   ├── reset.scss              # CSS reset/normalize
│   ├── typography.scss         # Font definitions
│   ├── theme.scss              # Light/dark theme
│   └── utilities.scss          # Utility classes
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.scss
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.module.scss
```

## Variables & Configuration

```scss
// styles/variables.scss

// Colors
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;
$danger: #dc3545;
$warning: #ffc107;
$info: #17a2b8;

// Neutral colors
$dark: #212529;
$light: #f8f9fa;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;

// Spacing
$spacing-1: 4px;
$spacing-2: 8px;
$spacing-3: 12px;
$spacing-4: 16px;
$spacing-5: 20px;
$spacing-6: 24px;
$spacing-8: 32px;

// Typography
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$line-height-base: 1.5;

// Sizing
$border-radius-sm: 2px;
$border-radius-base: 4px;
$border-radius-lg: 8px;

// Breakpoints
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-xxl: 1400px;

// Z-index
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
```

## Mixins

```scss
// styles/mixins.scss

// Media queries
@mixin media($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: $breakpoint-sm) { @content; }
  }
  @else if $breakpoint == 'md' {
    @media (min-width: $breakpoint-md) { @content; }
  }
  @else if $breakpoint == 'lg' {
    @media (min-width: $breakpoint-lg) { @content; }
  }
  @else if $breakpoint == 'xl' {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}

// Flexbox
@mixin flex($direction: row, $justify: center, $align: center) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
}

// Grid
@mixin grid($columns, $gap: $spacing-4) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
}

// Truncate text
@mixin truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Multi-line truncate
@mixin line-clamp($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Focus styles
@mixin focus-outline {
  outline: 2px solid $primary;
  outline-offset: 2px;
}

// Transitions
@mixin transition($properties: all, $duration: 0.3s, $timing: ease) {
  transition: $properties $duration $timing;
}

// Box shadow
@mixin box-shadow($level: 1) {
  @if $level == 1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  @else if $level == 2 {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  }
  @else if $level == 3 {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10);
  }
}
```

## BEM Convention

**BEM = Block Element Modifier**

```scss
// Block: standalone component
.button { }

// Element: part of the block
.button__icon { }
.button__text { }

// Modifier: variation of block/element
.button--primary { }
.button--large { }
.button__text--bold { }
```

## Component Styling Example

```scss
// components/Button/Button.module.scss
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

// Block
.button {
  display: inline-block;
  padding: $spacing-2 $spacing-4;
  font-size: $font-size-base;
  font-weight: 500;
  border: none;
  border-radius: $border-radius-base;
  cursor: pointer;
  @include transition(all, 0.2s);
  
  // Focus state
  &:focus {
    @include focus-outline;
  }
  
  // Hover state
  &:hover {
    transform: translateY(-2px);
    @include box-shadow(2);
  }
  
  // Active state
  &:active {
    transform: translateY(0);
  }
  
  // Disabled state
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  // Variant modifiers
  &--primary {
    background-color: $primary;
    color: white;
    
    &:hover {
      background-color: darken($primary, 10%);
    }
  }
  
  &--secondary {
    background-color: $secondary;
    color: white;
    
    &:hover {
      background-color: darken($secondary, 10%);
    }
  }
  
  &--danger {
    background-color: $danger;
    color: white;
    
    &:hover {
      background-color: darken($danger, 10%);
    }
  }
  
  &--outlined {
    background-color: transparent;
    border: 2px solid $primary;
    color: $primary;
    
    &:hover {
      background-color: rgba($primary, 0.05);
    }
  }
  
  // Size modifiers
  &--small {
    padding: $spacing-1 $spacing-2;
    font-size: $font-size-sm;
  }
  
  &--large {
    padding: $spacing-3 $spacing-6;
    font-size: $font-size-lg;
  }
  
  // Width modifier
  &--full {
    width: 100%;
  }
}
```

## React Component with Styling

```typescript
// components/Button/Button.tsx
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className = ''
}) => {
  const baseClass = styles.button;
  const variantClass = styles[`button--${variant}`];
  const sizeClass = styles[`button--${size}`];
  const fullWidthClass = fullWidth ? styles['button--full'] : '';
  
  const classNames = [
    baseClass,
    variantClass,
    sizeClass,
    fullWidthClass,
    className
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

## Responsive Design

```scss
// responsive-component.module.scss
.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-4;
  padding: $spacing-4;
  
  // Mobile-first approach
  @include media('md') {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include media('lg') {
    grid-template-columns: repeat(3, 1fr);
    padding: $spacing-6;
  }
  
  @include media('xl') {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card__image {
  width: 100%;
  max-width: 400px;
  
  @include media('md') {
    max-width: 100%;
  }
}

.card__title {
  font-size: $font-size-base;
  
  @include media('md') {
    font-size: $font-size-lg;
  }
  
  @include media('lg') {
    font-size: $font-size-xl;
  }
}
```

## CSS Classes Usage in React

```typescript
// ✅ Best: Dynamic class composition
const getClasses = (variant?: string, isActive?: boolean) => {
  return [
    styles.component,
    variant && styles[`component--${variant}`],
    isActive && styles['component--active']
  ]
    .filter(Boolean)
    .join(' ');
};

export const Component: React.FC<Props> = ({ variant, isActive }) => (
  <div className={getClasses(variant, isActive)}>
    Content
  </div>
);
```

## CSS-in-JS Alternative (Styled Components)

```typescript
// If using styled-components instead of CSS modules
import styled from 'styled-components';

const StyledButton = styled.button<{ variant: string }>`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({ variant, ...props }) => (
  <StyledButton variant={variant} {...props}>
    {props.children}
  </StyledButton>
);
```

## Styling Best Practices Checklist

- [ ] Use CSS modules for scoped styling
- [ ] Follow BEM naming convention
- [ ] Define spacing/colors in variables
- [ ] Use mixins for repeated patterns
- [ ] Mobile-first responsive design
- [ ] Semantic class names
- [ ] No !important unless absolutely necessary
- [ ] Consistent selector nesting (max 3 levels)
- [ ] Group related styles together
- [ ] No hardcoded values; use SCSS variables
- [ ] Proper focus/hover/active states
- [ ] Accessible color contrast (WCAG AA minimum)
- [ ] Organize by Block > Elements > Modifiers > States

## Color Accessibility

- Ensure minimum contrast ratio of 4.5:1 for text
- Don't rely on color alone to convey information
- Test with accessibility tools (WebAIM Contrast Checker)

## Resources

- [BEM Documentation](http://getbem.com/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
