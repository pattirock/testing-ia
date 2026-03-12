import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { HomePage } from '@pages/HomePage';
import { ServicesPage } from '@pages/ServicesPage';
import { BookingPage } from '@pages/BookingPage';
import { ConfirmationPage } from '@pages/ConfirmationPage';
import { AboutPage } from '@pages/AboutPage';
import { ContactPage } from '@pages/ContactPage';
import { ROUTES } from '@constants/index';
import '@styles/global.scss';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
            <Route path={ROUTES.BOOKING} element={<BookingPage />} />
            <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
