import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ChartPage from "./pages/ChartPage.tsx";
import SummaryPage from "./pages/SummaryPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import AnalysisPage from "./pages/AnalysisPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import { FullscreenProvider } from "./context/FullscreenContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/chart" replace />,
  },
  {
    path: "/chart",
    element: <ChartPage />,
  },
  {
    path: "/summary",
    element: <SummaryPage />,
  },
  {
    path: "/statistics",
    element: <StatisticsPage />,
  },
  {
    path: "/analysis",
    element: <AnalysisPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FullscreenProvider>
      <RouterProvider router={router} />
    </FullscreenProvider>
  </StrictMode>
);
