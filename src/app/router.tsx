import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import { ROUTES } from '@/shared/lib/routes'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

const GeneratorPage = lazy(() =>
  import('@/pages/GeneratorPage').then((m) => ({ default: m.GeneratorPage })),
)

export const router = createBrowserRouter([
  {
    path: ROUTES.dashboard,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.generator,
    element: <GeneratorPage />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
])
