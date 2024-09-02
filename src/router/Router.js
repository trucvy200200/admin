// ** Router imports
import { lazy } from "react"

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom"

// ** Layouts
import BlankLayout from "@layouts/BlankLayout"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils"

// ** GetRoutes
import { getRoutes, DefaultRoute } from "./routes"

// ** Components
const Error = lazy(() => import("../views/pages/misc/Error"))
const Login = lazy(() => import("../pages/auth/login/Login"))
const NotAuthorized = lazy(() => import("../views/pages/misc/NotAuthorized"))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)

  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser()
    } else {
      return "/login"
    }
  }

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ path: "/login", element: <Login /> }]
    },
    {
      path: "/auth/not-auth",
      element: <BlankLayout />,
      children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }]
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
