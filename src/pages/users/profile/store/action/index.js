import instances from "@src/@core/plugin/axios"
import { getUserData } from "@src/auth/utils"
import { getLocalStorage, setLocalStorage } from "@utils"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import { ROLE_POSITION } from "@constants/users-constant"

export const GET_PROFILE = "GET_PROFILE"
export const GET_SETTING = "GET_SETTING"
export const EDIT_PROFILE = "EDIT_PROFILE"
export const GET_MY_CONTRACT = "GET_MY_CONTRACT"
export const LOGOUT = "LOGOUT"

export const logoutProfile = () => {
  return async (dispatch) =>
    dispatch({
      type: LOGOUT
    })
}

// ** Get all Data
export const getMyProfile = () => {
  return async (dispatch) => {
    await instances.get("/admin/profile").then((response) => {
      dispatch({
        type: GET_PROFILE,
        data: response.data.data
      })
      const userData = getLocalStorage(jwtDefaultConfig.storageUserData)
      userData && setLocalStorage(jwtDefaultConfig.storageUserData, { ability: userData?.ability, ...response.data.data })
    })
  }
}

export const getRoleByUser = () => {
  return getUserData()?.role
}

export const checkPermissionByScreen = async (permissionScreen) => {
  const user = getUserData()
  let permissionCheck = {
    view: false,
    create: false,
    remove: false,
    edit: false,
    import: false,
    export: false
  }
  if ([ROLE_POSITION.IT_SUPPORT, ROLE_POSITION.SYSTEM_ADMIN].includes(user?.position)) {
    permissionCheck = {
      view: true,
      create: true,
      remove: true,
      edit: true,
      import: true,
      export: true
    }
  } else {
    const permissions = user?.ability
    if (permissions?.length > 0) {
      for (const permission of permissions) {
        if (permission?.subject === "all" && permission?.action === "manage") {
          permissionCheck = {
            view: true,
            create: true,
            remove: true,
            edit: true,
            import: true,
            export: true
          }
          return
        }
        if (permissionScreen === permission?.subject) {
          switch (permission?.action) {
            case "view":
              permissionCheck.view = true
              break
            case "create":
              permissionCheck.create = true
              break
            case "edit":
              permissionCheck.edit = true
              break
            case "remove":
              permissionCheck.remove = true
              break
            case "import":
              permissionCheck.import = true
              break
            case "export":
              permissionCheck.export = true
              break
            case "manage":
              permissionCheck = {
                view: true,
                create: true,
                remove: true,
                edit: true,
                import: true,
                export: true
              }
              return
            default:
              break
          }
        }
      }
    }
  }
  return permissionCheck
}

export const updateProfile = (body, data, success, fail, updateEnd) => {
  return async (dispatch) => {
    await instances
      .put(`/admin/user`, body)
      .then((res) => {
        if (res?.data?.data) {
          dispatch({
            type: EDIT_PROFILE,
            data
          })
          updateEnd()
          success("Update success")
        } else {
          updateEnd()
          fail("Update failed")
        }
      })
      .catch((err) => {
        updateEnd()
        dispatch({ type: "GET_ERROR", errorMessage: err?.response?.data?.message })
      })
  }
}

// ** Get My Contract
export const getMyContract = () => {
  return async (dispatch) => {
    return await instances
      .get(`/contracts`)
      .then((response) => {
        dispatch({
          type: GET_MY_CONTRACT,
          data: response?.data?.data
        })
        return response?.data?.data
      })
      .catch((err) => err)
  }
}

export const updateMyContract = (body) => {
  return async (dispatch) => {
    await instances
      .put(`/contracts`, body)
      .then((response) => {
        return { data: response?.data, success: true }
      })
      .catch((err) => {
        return { data: err, success: false }
      })
  }
}
