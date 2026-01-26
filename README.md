# Incident Management Dashboard

A modern, responsive dashboard application for managing incidents, alerts, and tasks. Built with React, Vite, and Material-UI.

## 🚀 Features

- **Dashboard Overview**: Visual statistics and charts for tasks, alerts, and incidents
- **Task Management**: Create, edit, and delete tasks with status tracking
- **Alert System**: Manage alerts with severity levels (Critical, Warning, Info, Resolved)
- **Incident Tracking**: Track incidents with priority levels (Low, Warning, Critical)
- **Authentication**: User authentication with role-based access control
- **Real-time Updates**: Powered by React Query for efficient data fetching and caching
- **Responsive Design**: Modern UI with dark/light theme support
- **Data Visualization**: Interactive charts using Chart.js

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **UI Components**: Material-UI (MUI)
- **Styling**: SCSS Modules
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Incident-management-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://task-flow-backend-t5ng.onrender.com/api
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── api/              # API service functions
├── assets/           # Static assets
├── components/       # React components
│   ├── charts/      # Chart components
│   ├── pages/       # Page components
│   ├── routes/      # Route components
│   ├── shared/      # Shared components
│   ├── structure/   # Layout components
│   └── UI/          # UI components
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```

## 🎯 Key Components

- **OverviewPanel**: Main dashboard with statistics and charts
- **TasksPanel**: Task management interface
- **AlertsPanel**: Alert management interface
- **IncidentsPanel**: Incident tracking interface
- **GenericTable**: Reusable table component with pagination
- **DataPanel**: Card-based data display component

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to GitHub Pages

## 🌐 Deployment

The project is configured for GitHub Pages deployment. The build output is automatically deployed to the `gh-pages` branch.

## 📝 Notes

- The application uses a hash router for GitHub Pages compatibility
- Authentication state is persisted in localStorage
- API calls are handled through React Query for optimal caching and state management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
