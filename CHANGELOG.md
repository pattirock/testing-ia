# Changelog

All notable changes to the TherapyHub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Do
- Fix remaining 31 failing tests (75% passing rate achieved)
- Complete async mocking for page components
- Improve test coverage for complex state management scenarios
- Add integration tests for full user workflows
- Consider adding visual regression tests

## [1.0.0] - 2026-03-12

### Added

#### Testing & Quality Assurance
- **Comprehensive unit test suite** with 95 passing tests out of 126 (75% success rate)
- Created 12 test files covering services, components, and pages:
  - `src/services/__tests__/servicesService.test.ts` - 18+ test cases for service layer
  - `src/services/__tests__/bookingService.test.ts` - 11+ test cases for booking operations
  - `src/components/__tests__/Hero.test.tsx` - 8 passing tests for hero section
  - `src/components/__tests__/ServiceCard.test.tsx` - 11 passing tests for service cards
  - `src/components/__tests__/Header.test.tsx` - 6 test cases for navigation header
  - `src/components/__tests__/Footer.test.tsx` - 15 test cases for footer component
  - `src/pages/__tests__/HomePage.test.tsx` - 11 test cases for home page
  - `src/pages/__tests__/ServicesPage.test.tsx` - 9 test cases for services listing
  - `src/pages/__tests__/BookingPage.test.tsx` - 9 test cases for booking form
  - `src/pages/__tests__/ConfirmationPage.test.tsx` - 10 test cases for booking confirmation
  - `src/pages/__tests__/AboutPage.test.tsx` - 11 test cases for about page
  - `src/pages/__tests__/ContactPage.test.tsx` - 10 test cases for contact form

#### Repository Configuration
- Fixed Jest configuration in `craco.config.js` with proper path alias mapping
- Added `@testing-library/jest-dom` matchers to all test files for enhanced assertions
- Configured module name mapping for `@components`, `@services`, `@pages`, `@constants`, `@types`, `@hooks`, `@utils`, `@styles`, and `@/` aliases

#### Developer Tools & Skills
- Created comprehensive React frontend development guide with GitHub Copilot integration
- Added `.github/skills/` documentation for project-specific patterns and best practices:
  - API integration patterns
  - Component testing strategies
  - React component architecture
  - SCSS styling guide with BEM convention
  - TypeScript standards and type safety

### Changed

#### Bug Fixes
- Fixed state synchronization in BookingPage `handleInputChange` method
- Fixed null reference error in ConfirmationPage with bookingId validation
- Added parameter validation in bookingService `getAvailableSlots` method
- Fixed specialization label translations in AboutPage
- Removed unsafe 'as any' casting in ServicesPage with proper type guards
- Improved key usage in ServiceCard benefit mapping
- Added URL sanitization in Hero component for XSS prevention

#### Visual Design Updates
- Updated color palette to minimalist aesthetic:
  - Primary dark: `#1a1a1a`
  - Accent green: `#2d7d1f`
  - Neutral grays and whites
- Increased spacing scale from 6px to 64px for generous white space
- Updated border-radius to 3-6px for subtle, refined appearance
- Adjusted box shadows to minimal opacity (0.03-0.08) for refined look
- Improved typography with better letter-spacing and line-height (1.7)
- Applied new styling to all pages and components

### Initial Release Features
- **TherapyHub SPA** - Single Page Application with 6 main pages:
  - Home page with hero section and service grid
  - Services page with filtering by therapy type
  - Booking form with service/therapist selection
  - Booking confirmation page
  - About page with therapist profiles and company values
  - Contact page with inquiry form

- **Core Components**:
  - Header with responsive navigation
  - Hero section with CTA
  - Service cards with benefits display
  - Footer with contact information

- **Technology Stack**:
  - React 18 with TypeScript (strict mode)
  - React Router v6 for SPA navigation
  - SCSS Modules with BEM naming convention
  - Jest + React Testing Library for unit testing
  - Craco for webpack configuration and path aliases

- **Mock Services**:
  - servicesService with therapy type filtering
  - bookingService with booking management and slot availability
  - Therapist profiles and service catalog

---

## Release Sections Explanation

- **Added**: New features and capabilities
- **Changed**: Changes in existing functionality including bug fixes and improvements
- **Deprecated**: Features marked for removal in future versions
- **Removed**: Features that have been removed
- **Fixed**: Bug fixes
- **Security**: Security vulnerability updates

For more information about commit history, run:
```bash
git log --oneline
```
