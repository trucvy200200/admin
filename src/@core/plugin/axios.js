import axios from "axios"
import jwtDefaultConfig from "../auth/jwt/jwtDefaultConfig"
import { BASE_CONSTANT } from "@src/constants/base-constant"

const instances = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL || "http://localhost:3200/api/v1"
})

instances.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instances.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* user axios */
const instancesV2 = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_USER || "http://localhost:3200/api/v2"
})

instancesV2.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesV2.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* payment axios */
const instancesV3 = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_PAYMENT || "http://localhost:3200/api/v3"
})

instancesV3.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesV3.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* system axios */
const instancesV4 = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_SYSTEM || "http://localhost:3200/api/v4"
})

instancesV4.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesV4.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* product axios */
const instancesV5 = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_PRODUCT || "http://localhost:3200/api/v5"
})

instancesV5.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesV5.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

//instances of geo location service
const instancesV6 = axios.create({
  baseURL: BASE_CONSTANT.GEOLOCATION_URL
})

instancesV6.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesV6.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          localStorage.removeItem(jwtDefaultConfig.storageRefreshTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        localStorage.removeItem(jwtDefaultConfig.storageRefreshTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* enterprise axios */
const instancesEnterprise = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_ENTERPRISE || "http://localhost:3200/api/v5"
})

instancesEnterprise.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesEnterprise.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)

/* system woltech axios */
const instancesSystemWoltech = axios.create({
  baseURL: BASE_CONSTANT.BASE_URL_SYSTEM_WOLTECH || "http://localhost:3200/api/v5"
})

instancesSystemWoltech.interceptors.request.use(
  (config) => {
    // ** Get token from localStorage
    const accessToken = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ** Add request/response interceptor
instancesSystemWoltech.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error.response) {
        // Request made and server responded
        const { response } = error
        if (response && response.status === 401) {
          // ** Remove user, accessToken & refreshToken from localStorage
          localStorage.removeItem(jwtDefaultConfig.storageUserData)
          localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
          window.location.href = "/login"
        } else {
          return Promise.reject(error)
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    } catch (e) {
      if (e?.response?.data?.error?.statusCode === 401) {
        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem(jwtDefaultConfig.storageUserData)
        localStorage.removeItem(jwtDefaultConfig.storageTokenKeyName)
        window.location.href = "/login"
      }
    }
  }
)


export default instances
export { instancesV2, instancesV3, instancesV4, instancesV5, instancesV6, instancesEnterprise, instancesSystemWoltech }
