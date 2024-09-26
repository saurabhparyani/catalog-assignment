import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./index.css";
import ChartPage from "./pages/ChartPage.tsx";
import SummaryPage from "./pages/SummaryPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { FullscreenProvider } from "./context/FullscreenContext.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/chart" replace />,
      },
      {
        path: "chart",
        element: <ChartPage />,
      },
      {
        path: "summary",
        element: <SummaryPage />,
      },
      {
        path: "statistics",
        element: <StatisticsPage />,
      },
      {
        path: "analysis",
        element: <AnalysisPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <FullscreenProvider>
        <RouterProvider router={router} />
      </FullscreenProvider>
    </ThemeProvider>
  </StrictMode>
);
