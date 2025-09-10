# You Are The Compass

A modern business website for the "You Are The Compass" brand featuring podcasting, education services, and adventure treks with a clean, warm, and approachable design.

## 🚀 Features

- **Clean, minimal design** with green (#2E7D32) primary color theme
- **Responsive layout** optimized for all devices
- **Podcast episode management** with audio player
- **Newsletter subscription** with Mailchimp integration and CSV fallback
- **Contact form** with CSV storage
- **Blog system** with markdown support
- **Link-in-bio page** (Linktree-style) with dark mode
- **SEO optimization** with meta tags and Open Graph support
- **Accessibility features** with semantic HTML and proper contrast

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Routing**: Wouter (client-side)
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack Query
- **UI Components**: Shadcn/ui + Radix UI
- **Fonts**: Inter (body) + Playfair Display (headings)
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/hongphucsoftware/JessyeClayton.git
cd JessyeClayton

# Install dependencies
npm install
```

### Development

#### Run the full application (recommended)
```bash
npm run dev
```
This starts both the frontend and backend in development mode. The website will be available at `http://localhost:5000`.

#### Run frontend and backend separately
```bash
# Terminal 1 - Frontend only
npm run dev:client

# Terminal 2 - Backend only  
npm run dev:server
```

### Production

#### Build for production
```bash
npm run build
```

#### Start production server
```bash
npm start
```

## 🚀 Deployment

### Deploy to Vercel

#### Option 1: Deploy via Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview
npm run deploy:preview

# Deploy to production
npm run deploy
```

#### Option 2: Deploy via GitHub Integration
1. Push your code to the GitHub repository
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

#### Option 3: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect the build settings from `vercel.json`

### Environment Variables
Make sure to set the following environment variables in your Vercel dashboard:
- `NODE_ENV=production`
- Any other environment variables your application needs

## 📁 Project Structure

