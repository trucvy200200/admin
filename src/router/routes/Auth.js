// ** React Imports
import { lazy } from "react"

const Profile = lazy(() => import("@pages/users/profile/view"))
const Login = lazy(() => import("../../pages/auth/login/Login"))

const ConfirmForgot = lazy(() => import('@src/pages/auth/confirmForgot/ConfirmForgot'))
const ForgotPassword = lazy(() => import("@src/pages/auth/forgotPassword/ForgotPassword"))
const Login2FA = lazy(() => import("@src/pages/auth/2fa"))
const TwoFASetting = lazy(() => import("@src/pages/auth/2fa/Setting"))

const AuthenticationRoutes = [
  {
    path: "/profile",
    element: <Profile />,
    meta: {
      appLayout: true,
      className: "user-profile",
      resource: "auth",
      action: "view"
    }
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/checkpoint",
    element: <Login2FA />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/2fa-setting",
    element: <TwoFASetting />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/confirm-forgot',
    element: <ConfirmForgot />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  }
]

export default AuthenticationRoutes
