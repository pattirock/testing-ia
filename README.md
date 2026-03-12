# TherapyHub - SPA para Centro de Masajes y Terapias

Una aplicación web moderna y responsiva para una empresa de servicios terapéuticos que ofrece masajes, presoterapia, y maderoterapia.

## 🌟 Características

- **Diseño responsive** - Se adapta perfectamente a cualquier dispositivo
- **Catálogo de servicios** - Visualiza todos los servicios disponibles
- **Sistema de reservas online** - Reserva citas de forma fácil y rápida
- **Gestión de terapeutas** - Selecciona el terapeuta de tu preferencia
- **Página de confirmación** - Confirmación inmediata de tu reserva
- **Información de contacto** - Localiza y contacta con el centro
- **Equipo profesional** - Conoce a nuestros terapeutas certificados

## 📋 Stack Tecnológico

- **Framework**: React 18+
- **Lenguaje**: TypeScript
- **Routing**: React Router v6
- **Estilos**: SCSS con módulos
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint
- **Formato**: Prettier
- **Build**: Webpack (vía React Scripts)

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js >= 16.x
- npm >= 8.x o yarn >= 3.x

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd testing-ia

# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm start
# Abre http://localhost:3000 en el navegador

# Crear build de producción
npm run build

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formateo de código
npm run format

# Verificar tipos TypeScript
npm run typecheck
```

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ServiceCard.tsx
├── pages/                   # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── BookingPage.tsx
│   ├── ConfirmationPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── services/                # Servicios y lógica de negocio
│   ├── servicesService.ts
│   └── bookingService.ts
├── types/                   # Definiciones TypeScript
│   └── index.ts
├── constants/               # Constantes de la aplicación
│   └── index.ts
├── styles/                  # Estilos globales
│   ├── variables.scss
│   └── global.scss
├── App.tsx                  # Componente raíz
└── index.tsx                # Entry point
```

## 🎨 Páginas Principales

### Home (`/`)
- Hero section llamativo
- Servicios destacados
- Beneficios de la empresa
- Call-to-action principal

### Servicios (`/services`)
- Catálogo completo de servicios
- Filtrado por tipo de terapia
- Cards detalladas con beneficios
- Acceso directo a reservas

### Reservas (`/booking`)
- Formulario completo de reserva
- Selección de servicio y terapeuta
- Picker de fecha y hora
- Notas adicionales opcionales
- Validación en tiempo real

### Confirmación (`/confirmation`)
- Confirmación visual de la reserva
- Número de reserva único
- Próximos pasos
- Información de contacto

### Sobre Nosotros (`/about`)
- Misión y valores
- Equipo de terapeutas
- Información general

### Contacto (`/contact`)
- Formulario de contacto
- Información de ubicación
- Horarios de atención
- Coordenadas de contacto

## 🛠️ Desarrollo

### Estructura de Componentes

Todos los componentes utilizan:
- **TypeScript** para tipado seguro
- **React Hooks** (no class components)
- **CSS Modules SCSS** para estilos aislados
- **Composición** para reutilización

### Ejemplo de Componente

```typescript
import React from 'react';
import styles from './MyComponent.module.scss';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className={styles.component}>
      <h2>{title}</h2>
      {onAction && <button onClick={onAction}>Acción</button>}
    </div>
  );
};
```

### Estilos

Los estilos utilizan la convención BEM:

```scss
@import '@styles/variables.scss';

.component {
  padding: $spacing-lg;

  &__title {
    color: $primary;
  }

  &--active {
    background-color: $light;
  }

  @include media('tablet') {
    padding: $spacing-xl;
  }
}
```

## 🧪 Testing

Todos los componentes e hooks deben incluir tests:

```bash
# Ejecutar tests
npm test

# Modo watch
npm run test:watch

# Con cobertura
npm run test:coverage
```

## 📦 Datos Mock

Actualmente la aplicación utiliza datos mock para:
- Servicios disponibles
- Terapeutas
- Horarios disponibles
- Gestión de reservas

Estos pueden ser reemplazados por APIs reales actualizando los servicios en `src/services/`.

## 🌐 Deploy

La aplicación está lista para deployment en plataformas como:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Heroku

```bash
npm run build
# Los archivos optimizados estarán en la carpeta build/
```

## 📱 Diseño Responsivo

Breakpoints definidos:
- **Mobile**: < 480px
- **Tablet**: >= 768px
- **Desktop**: >= 1024px
- **Wide**: >= 1440px

## 🎓 Convenciones

### Nombres de Archivos
- Componentes: `PascalCase.tsx` (ej: `UserCard.tsx`)
- Estilos: `PascalCase.module.scss` (ej: `UserCard.module.scss`)
- Funciones/Utils: `camelCase.ts` (ej: `formatDate.ts`)
- Hooks: `useCamelCase.ts` (ej: `useUserData.ts`)

### Tipos
- Interfaces para props: `ComponentProps`
- Tipos para estados: descriptivos (ej: `BookingFormData`)
- Tipos para API: en `types/index.ts`

### Imports
```typescript
import { Component } from '@components/ComponentName';
import { useCustomHook } from '@hooks/useCustomHook';
import { CONSTANTS } from '@constants/index';
import styles from './Component.module.scss';
```

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nombre-feature`
2. Commit con mensajes descriptivos: `git commit -m "feat: descripción"`
3. Haz push a la rama: `git push origin feature/nombre-feature`
4. Abre un Pull Request

## 📝 Estándares de Código

- Usar TypeScript en todo el código
- Evitar `any` type, usar `unknown` con type guards
- Componentes menores a 300 líneas
- Tests para nuevas funcionalidades
- Linting: `npm run lint`
- Formateo: `npm run format`

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 📞 Soporte

Para soporte o preguntas contactar a través de:
- TherapyHub Center
- 📞 +34 612 345 678
- ✉️ info@therapyhub.com
- 📍 Calle Principal 123, Madrid 28001
