import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertsPanel from "./components/pages/AlertsPanel";
import IncidentsPanel from "./components/pages/IncidentsPanel";
import OverviewPanel from "./components/pages/OverviewPanel";
import TasksPanel from "./components/pages/TasksPanel";
import RootLayout from "./components/Routes/RootLayout";
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
    <RouterProvider router={router} />
  </QueryClientProvider>
);
