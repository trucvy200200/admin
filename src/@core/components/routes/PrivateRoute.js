// ** React Imports
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'

// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import { isUserLoggedIn } from "@utils"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const user = JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserData))
  if (route) {
    let action = null
    let authRoute = false
    let publicRoute = false
    let resource = null

    if (route.meta) {
      action = route.meta.action
      authRoute = route.meta.authRoute
      publicRoute = route.meta.publicRoute
      resource = route.meta.resource
    }

    if ((!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() &&
        route.meta &&
        !authRoute &&
        !publicRoute)) {
      return <Navigate to='/login' />
    }
    if (route.meta !== undefined &&
      isUserLoggedIn() &&
      user?.changePassword === false) {
      return <Navigate to='/change-password' />
    }
    if (route.meta && authRoute && isUserLoggedIn()) {
      return <Navigate to='/' />
    }
    if (!isUserLoggedIn()) {
      return <Navigate to='/misc/not-authorized' replace />
    }
  }

  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
