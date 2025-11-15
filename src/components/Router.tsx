import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CropsPage from '@/components/pages/CropsPage';
import PestsPage from '@/components/pages/PestsPage';
import SoilPage from '@/components/pages/SoilPage';
import WeatherPage from '@/components/pages/WeatherPage';
import SchemesPage from '@/components/pages/SchemesPage';
import MarketPage from '@/components/pages/MarketPage';
import PesticidesPage from '@/components/pages/PesticidesPage';
import WaterPage from '@/components/pages/WaterPage';
import DiseaseDetectionPage from '@/components/pages/DiseaseDetectionPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "crops",
        element: <CropsPage />,
      },
      {
        path: "pests",
        element: <PestsPage />,
      },
      {
        path: "soil",
        element: <SoilPage />,
      },
      {
        path: "weather",
        element: <WeatherPage />,
      },
      {
        path: "schemes",
        element: <SchemesPage />,
      },
      {
        path: "market",
        element: <MarketPage />,
      },
      {
        path: "pesticides",
        element: <PesticidesPage />,
      },
      {
        path: "water",
        element: <WaterPage />,
      },
      {
        path: "disease-detection",
        element: <DiseaseDetectionPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
