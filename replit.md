# You Are The Compass Business Website

## Overview

This is a modern business website for "You Are The Compass", a Sydney-based startup founded by Jessye Clayton that focuses on podcasting, personal growth education, and adventure experiences. The application is built as a full-stack web application with a React frontend and Express.js backend, designed with a clean, minimal, warm, and approachable aesthetic using a green color scheme.

The platform serves multiple purposes: showcasing podcast episodes with integrated audio players, managing newsletter subscriptions, handling contact inquiries, providing educational content through a blog system, and offering a link-in-bio style page for social media integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React 18 and TypeScript, utilizing Wouter for client-side routing instead of traditional React Router. The UI is constructed with Tailwind CSS for styling and Shadcn/ui components built on Radix UI primitives for accessibility and consistency. The design system uses Inter font for body text and Playfair Display for headings, with a primary green color (#2E7D32) and supporting colors defined in the site configuration.

State management is handled through TanStack Query for server state and React Hook Form with Zod validation for form handling. The component architecture follows a modular approach with reusable components for common elements like episode cards, testimonial cards, and newsletter forms.

### Backend Architecture
The backend uses Express.js with TypeScript, following a simple REST API pattern. The server implements middleware for request logging, JSON parsing, and error handling. Routes are organized in a separate module for better maintainability.

Data storage follows a dual approach: a memory-based storage system for development and testing, with CSV file fallback for persistence. The application is designed to integrate with external services like Mailchimp for newsletter management, with graceful fallbacks when those services are unavailable.

### Database Schema
The application uses Drizzle ORM with PostgreSQL schema definitions for two main entities:
- **Subscribers**: Stores email addresses and creation timestamps for newsletter subscriptions
- **Contacts**: Stores contact form submissions with name, email, message, and timestamp

The schema is configured for PostgreSQL with UUID primary keys and proper indexing on email fields.

### Form Handling and Validation
Forms use React Hook Form with Zod schema validation for type safety and error handling. The validation schemas are shared between frontend and backend through the shared directory, ensuring consistency across the application.

### Content Management
The application supports markdown-based content for blog posts and episode descriptions, stored in the content directory. This allows for easy content updates without requiring database changes or deployments.

### Component Design System
The UI follows a consistent design system with:
- Reusable card components for episodes, testimonials, and features
- Consistent spacing and typography scales
- Accessible form components with proper labeling
- Responsive design patterns using Tailwind CSS breakpoints
- Hover and interaction states for enhanced user experience

### Build and Development
The application uses Vite for fast development and building, with TypeScript compilation and hot module replacement. The build process outputs static assets for the frontend and bundles the backend for deployment.

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Primary styling framework with custom color scheme configuration
- **Radix UI**: Accessible component primitives for buttons, dialogs, forms, and navigation
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Shadcn/ui**: Pre-built component library built on Radix UI with custom styling

### Development and Build Tools
- **Vite**: Development server and build tool with fast HMR and optimized bundling
- **TypeScript**: Type safety across frontend and backend code
- **Drizzle Kit**: Database schema management and migration tools
- **ESBuild**: Fast JavaScript/TypeScript bundling for production builds

### Data and State Management
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **React Hook Form**: Form state management with minimal re-renders
- **Zod**: Runtime type validation for forms and API requests
- **Drizzle ORM**: Type-safe database query builder with PostgreSQL support

### Database and Storage
- **PostgreSQL**: Primary database (configured via Drizzle but may use Neon Database serverless)
- **CSV File Storage**: Fallback storage for subscribers and contacts when external services are unavailable

### Optional External Services
- **Mailchimp API**: Newsletter subscription management (with fallback to local CSV storage)
- **Font APIs**: Google Fonts integration for Inter and Playfair Display typefaces

### Audio and Media
- **HTML5 Audio**: Native browser audio player capabilities for podcast episode playback
- **Embla Carousel**: Touch-friendly carousel component for content sections

The application is designed with resilience in mind, providing fallback mechanisms when external services are unavailable, ensuring core functionality remains accessible even in degraded states.