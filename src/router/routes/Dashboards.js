import { lazy } from "react"

const Dashboard = lazy(() => import("@src/pages/dashboard"))
const Vehicles = lazy(() => import("@src/pages/transportations/list"))
const Hotels = lazy(() => import("@src/pages/hotels/list"))

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  },
  {
    path: "/vehicles/list",
    element: <Vehicles />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  },
  {
    path: "/hotels/list",
    element: <Hotels />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  }
]

export default DashboardRoutes
