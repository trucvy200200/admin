import { lazy } from 'react'

const Dashboard = lazy(() => import('@src/pages/dashboard'))

const DashboardRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    meta: {
      appLayout: true,
      action: 'view',
      resource: 'dashboard'
    }
  }
]

export default DashboardRoutes
