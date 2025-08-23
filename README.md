# Nondan Frontend

A modern, responsive frontend application for the Nondan event management platform built with React.js, Vite, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with dark/light theme support
- **Authentication**: Secure login/signup with JWT token management
- **Event Management**: Browse, search, filter, and register for events
- **Club Management**: Explore clubs, join/leave, and manage memberships
- **User Dashboard**: Personalized dashboard for students and admins
- **Admin Panel**: Complete admin interface for event and club management
- **Real-time Search**: Fast search functionality across events and clubs
- **Certificate Verification**: QR code-based certificate verification system
- **AI Chatbot**: Integrated AI assistant for user support
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Theme System**: Dynamic dark/light mode switching
- **Toast Notifications**: User-friendly feedback system

## 🛠 Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **Icons**: Lucide React 0.468.0
- **Notifications**: React Toastify 11.0.5
- **State Management**: React Context API
- **Type Checking**: ESLint with React plugins
- **Deployment**: Vercel (configured)

## 📋 Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend API running (see backend documentation)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd nondan_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will start running on `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_URL=http://localhost:5000

# Application Configuration
VITE_APP_NAME=Nondan
VITE_APP_VERSION=1.0.0

# External Services (Optional)
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 📜 Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
nondan_frontend/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/
│   │   └── nondan.svg           # App logo
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx       # Main footer component
│   │   │   └── Sidebar.jsx      # Sidebar navigation
│   │   ├── ui/
│   │   │   ├── Avatar.jsx       # User avatar component
│   │   │   ├── Badge.jsx        # Status badges
│   │   │   ├── Button.jsx       # Reusable button component
│   │   │   ├── Card.jsx         # Card container
│   │   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   │   ├── Modal.jsx        # Modal dialogs
│   │   │   ├── SearchBar.jsx    # Search input component
│   │   │   └── ThemeToggle.jsx  # Dark/light mode toggle
│   │   ├── club/
│   │   │   ├── InviteModal.jsx  # Club invitation modal
│   │   │   ├── MemberList.jsx   # Club members display
│   │   │   └── RoleManager.jsx  # Role management
│   │   ├── Chatbot.jsx          # AI chatbot component
│   │   ├── ClubCard.jsx         # Club display card
│   │   ├── ErrorBoundary.jsx    # Error handling wrapper
│   │   ├── EventCard.jsx        # Event display card
│   │   └── navbar.jsx           # Main navigation
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   ├── ThemeContext.jsx     # Theme management
│   │   └── ThemeHooks.js        # Theme-related hooks
│   ├── hooks/
│   │   ├── useClubRoles.js      # Club role management hook
│   │   └── useData.js           # Data fetching hook
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Analytics.jsx    # Admin analytics dashboard
│   │   │   ├── AttendeeManagement.jsx # Event attendee management
│   │   │   ├── ClubManagement.jsx # Club administration
│   │   │   ├── CreateEvent.jsx  # Event creation form
│   │   │   ├── Dashboard.jsx    # Admin dashboard
│   │   │   ├── EditEvent.jsx    # Event editing form
│   │   │   ├── Events.jsx       # Admin event management
│   │   │   └── Scanner.jsx      # QR code scanner
│   │   ├── student/
│   │   │   ├── Certificates.jsx # Student certificates
│   │   │   ├── Dashboard.jsx    # Student dashboard
│   │   │   ├── Events.jsx       # Student events view
│   │   │   └── Profile.jsx      # Student profile
│   │   ├── AuthPage.jsx         # Login/signup page
│   │   ├── BlogPage.jsx         # Blog/news page
│   │   ├── ClubDetailPage.jsx   # Individual club details
│   │   ├── ClubsPage.jsx        # All clubs listing
│   │   ├── EventDetailPage.jsx  # Individual event details
│   │   ├── EventsPage.jsx       # All events listing
│   │   ├── home.jsx             # Landing page
│   │   ├── NotFound.jsx         # 404 error page
│   │   ├── Settings.jsx         # User settings
│   │   └── VerifyCertificate.jsx # Certificate verification
│   ├── styles/
│   │   └── theme.js             # Theme configuration
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── .eslintrc.js                 # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vercel.json                  # Vercel deployment config
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🧩 Components

### UI Components
- **Button**: Customizable button with variants (primary, secondary, outline, ghost)
- **Card**: Container component for content sections
- **Modal**: Reusable modal dialog system
- **Avatar**: User profile image component
- **Badge**: Status and category indicators
- **SearchBar**: Search input with filtering capabilities
- **LoadingSpinner**: Loading state indicator
- **ThemeToggle**: Dark/light mode switcher

### Layout Components
- **Navbar**: Main navigation with responsive menu
- **Footer**: Site footer with links and contact info
- **Sidebar**: Side navigation for dashboards

### Feature Components
- **EventCard**: Event display with registration functionality
- **ClubCard**: Club information display
- **Chatbot**: AI-powered assistance widget
- **ErrorBoundary**: Error handling wrapper

## 📄 Pages

### Public Pages
- **Home**: Landing page with featured events and clubs
- **Events**: Browse and search all events
- **Clubs**: Explore available clubs
- **EventDetail**: Detailed event information and registration
- **ClubDetail**: Club information and membership options
- **AuthPage**: Login and signup forms
- **VerifyCertificate**: Certificate verification system

### Protected Pages
- **Student Dashboard**: Personalized student interface
- **Student Profile**: Profile management for students
- **Student Events**: Student's registered events
- **Student Certificates**: Earned certificates display

### Admin Pages
- **Admin Dashboard**: Administrative overview
- **Event Management**: Create, edit, and manage events
- **Club Management**: Administer clubs and memberships
- **Analytics**: Platform statistics and insights
- **Attendee Management**: Manage event participants
- **QR Scanner**: Certificate and ticket scanning

## 🛣 Routing

The application uses React Router for navigation with the following structure:

### Public Routes
- `/` - Home page
- `/events` - Events listing
- `/clubs` - Clubs listing
- `/event/:id` - Event details
- `/club/:id` - Club details
- `/auth/login` - Login page
- `/auth/signup` - Registration page
- `/verify/:certificateId` - Certificate verification

### Protected Routes (Authentication Required)
- `/settings` - User settings
- `/student/*` - Student dashboard routes
- `/admin/*` - Admin dashboard routes (Admin role required)

### Route Protection
- **PublicRoute**: Redirects authenticated users to dashboard
- **ProtectedRoute**: Requires authentication
- **AdminRoute**: Requires admin role

## 🗂 State Management

The application uses React Context API for state management:

### AuthContext
Manages user authentication state:
- User information (name, email, role)
- Authentication status
- Login/logout functionality
- JWT token management

### ThemeContext
Handles theme switching:
- Dark/light mode toggle
- Theme persistence
- System preference detection

## 🎨 Styling

### Tailwind CSS
- **Utility-first**: Use Tailwind utility classes
- **Responsive Design**: Mobile-first approach
- **Custom Theme**: Defined in `tailwind.config.js`
- **Dark Mode**: Built-in dark theme support

### Design System
- **Colors**: Primary accent colors with CSS variables
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized margin and padding
- **Shadows**: Consistent elevation system

### CSS Variables
```css
:root {
  --primary-accent-1: #your-primary-color;
  --primary-accent-2: #your-secondary-color;
}
```

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment with `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This handles client-side routing for direct URL access.

### Deployment Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Environment Variables**
   Set environment variables in Vercel dashboard or CLI

### Other Platforms

The built files in `/dist` can be deployed to:
- **Netlify**: Drag and drop `/dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `/dist` contents to S3 bucket
- **Firebase Hosting**: Use Firebase CLI

## 🛠 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript-style JSDoc comments
- Maintain component purity when possible

### File Naming
- Components: PascalCase (e.g., `EventCard.jsx`)
- Pages: PascalCase (e.g., `Dashboard.jsx`)
- Hooks: camelCase starting with 'use' (e.g., `useAuth.js`)
- Utilities: camelCase (e.g., `formatDate.js`)

### Component Structure
```jsx
// Imports
import React, { useState, useEffect } from 'react';

// Component
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-wrapper">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

## 🧪 Testing

### Future Testing Setup
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress or Playwright
- **Component Tests**: Storybook (planned)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the coding standards
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Development Workflow
1. Check existing issues or create a new one
2. Follow the component and naming conventions
3. Ensure responsive design compliance
4. Test across different browsers
5. Update documentation if needed

## 📄 License

This project is licensed under the MIT License.
