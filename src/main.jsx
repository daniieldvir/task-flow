import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertsPanel from "./components/pages/AlertsPanel.jsx";
import IncidentsPanel from "./components/pages/IncidentsPanel.jsx";
import OverviewPanel from "./components/pages/OverviewPanel.jsx";
import TasksPanel from "./components/pages/TasksPanel.jsx";
import RootLayout from "./components/Routes/RootLayout.jsx";
import { AuthProvider } from "./hooks/authContext.jsx";
import { ThemeProvider } from "./hooks/themeContext.jsx";
import { FilterProvider } from "./hooks/useFilter.jsx";
import "./index.scss";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <OverviewPanel /> },
      { path: "/tasks", element: <TasksPanel /> },
      { path: "/alerts", element: <AlertsPanel /> },
      {
        path: "/incidents",
        element: <IncidentsPanel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <RouterProvider router={router} />
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
