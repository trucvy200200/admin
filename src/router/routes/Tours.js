import { lazy } from "react"

const TourList = lazy(() => import("@src/pages/tours/list"))
const CreateTour = lazy(() => import("@src/pages/tours/create"))
const EditTour = lazy(() => import("@src/pages/tours/edit"))
const IncomingTours = lazy(() => import("@src/pages/tours/incoming-list"))

const ToursRoutes = [
  {
    path: "/tours/list",
    element: <TourList />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "tours"
    }
  },
  {
    path: "/tours/create",
    element: <CreateTour />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "tours"
    }
  },
  {
    path: "/tours/edit/:id",
    element: <EditTour />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "tours"
    }
  },
  {
    path: "/incoming-tours",
    element: <IncomingTours />,
    meta: {
      appLayout: true,
      action: "view",
      resource: "tours"
    }
  }
]

export default ToursRoutes
