import { lazy } from "react"

const Vehicles = lazy(() => import("@src/pages/transportations/list"))
const Hotels = lazy(() => import("@src/pages/hotels/list"))
const Orders = lazy(() => import("@src/pages/orders/list"))
const Refunds = lazy(() => import("@src/pages/refunds/list"))
const CustomerList = lazy(() => import("@src/pages/tours/incoming-list/customer-list"))

const DashboardRoutes = [
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
  },
  {
    path: "/orders/list",
    element: <Orders />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  },
  {
    path: "/refunds/list",
    element: <Refunds />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  },
  {
    path: "/incoming-tours/customer-list/:id",
    element: <CustomerList />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "dashboard"
    }
  }
]

export default DashboardRoutes
