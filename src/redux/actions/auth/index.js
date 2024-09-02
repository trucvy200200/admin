// ** UseJWT import to get config
import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"
import { BASE_CONSTANT } from "@constants/base-constant"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import instances from "@src/@core/plugin/axios"
import { logoutProfile } from "@src/pages/users/profile/store/action"

const config = useJwt.jwtConfig

// ** Handle Save Data Login
export const handleSaveDataLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "SAVE_DATA_LOGIN",
      data
    })
  }
}

export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName]
    })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
      [config.storageTokenKeyName]: null
    })
    dispatch(logoutProfile())

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem(config.storageUserData)
    localStorage.removeItem(config.storageTokenKeyName)
  }
}

export const loadUserData = () => {
  const data = JSON.parse(localStorage.getItem(config.storageUserData))
  return (dispatch) => {
    dispatch({ type: "LOAD_USER_DATA", data: data })
  }
}

export const login2FA = (data, accessToken, handleSuccess, handleError, setLoading, ability, dataLogin) => {
  return (dispatch) => {
    const instances = axios.create({
      baseURL: BASE_CONSTANT.BASE_URL
    })
    instances.interceptors.request.use(
      (config) => {
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    instances
      .post("/auth/admin/2fa/authenticate", data)
      .then((res) => {
        setLoading(false)
        if (!res?.data?.error && res?.data?.code === 0) {
          const { token, ...rest } = dataLogin
          ability.update(dataLogin?.ability)
          dispatch(handleLogin(dataLogin))
          localStorage.setItem(jwtDefaultConfig.storageTokenKeyName, accessToken)
          localStorage.setItem(jwtDefaultConfig.storageUserData, JSON.stringify({ ...rest }))
          handleSuccess()
        } else {
          handleError(res?.data?.message)
        }
      })
      .catch(() => {
        handleError("Something went wrong, please try later")
        setLoading(false)
      })
  }
}

export const updateTokenFirebaseUser = async (data) => {
  return await instances.put("/admin/update-firebase", data)
}
