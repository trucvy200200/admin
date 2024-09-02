import instances, { instancesEnterprise, instancesV2, instancesV4 } from "@src/@core/plugin/axios"

export const GET_ACTIVE_USERS = "GET_ACTIVE_USERS"
export const GET_ACTIVE_ADMINS = "GET_ACTIVE_ADMINS"
export const GET_NORMAL_ADMINS = "GET_NORMAL_ADMINS"
export const GET_SYSTEM_ADMINS = "GET_SYSTEM_ADMINS"
export const GET_IT_SUPPORTS = "GET_IT_SUPPORTS"
export const GET_EXCHANGE_RATE = "GET_EXCHANGE_RATE"

export const getActiveUsers = (params) => {
  const config = { params }
  return async (dispatch) => {
    await instancesV2.get("/admin/user/active", config).then((response) => {
      dispatch({
        type: GET_ACTIVE_USERS,
        data: response?.data?.listData || [],
        total: response?.data?.total || 0,
        params
      })
    }).catch(() => {
      dispatch({
        type: GET_ACTIVE_USERS,
        data: [],
        total: 0,
        params
      })
    })
  }
}

export const getActiveAdmins = () => {
  return async (dispatch) => {
    await instances.get("/admin/active/filter").then((response) => {
      dispatch({
        type: GET_ACTIVE_ADMINS,
        data: response?.data?.listData || [],
        total: response?.data?.total
      })
    }).catch(() => {
      dispatch({
        type: GET_ACTIVE_ADMINS,
        data: [],
        total: 0
      })
    })
  }
}
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  return await instancesV4.post("setting/file/upload", formData)
    .then(res => res?.data?.data?.fileUrl)
    .catch(() => null)
}

export const getNormalAdmins = () => {
  return async (dispatch) => {
    await instances
      .get(`/admin/normal-admin`)
      .then((response) => {
        dispatch({
          type: GET_NORMAL_ADMINS,
          data: response?.data?.listData || []
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_NORMAL_ADMINS,
          data: []
        })
      })
  }
}

export const getSystemAdmins = () => {
  return async (dispatch) => {
    await instances
      .get(`/admin/system-admin`)
      .then((response) => {
        dispatch({
          type: GET_SYSTEM_ADMINS,
          data: response?.data?.listData || []
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_SYSTEM_ADMINS,
          data: []
        })
      })
  }
}

export const getITSupports = () => {
  return async (dispatch) => {
    await instances
      .get(`/admin/it-supports`)
      .then((response) => {
        dispatch({
          type: GET_IT_SUPPORTS,
          data: response?.data?.listData || []
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_IT_SUPPORTS,
          data: []
        })
      })
  }
}

export const uploadImages = async (array) => {
  const uploadPromises = array.map(async (item) => {
    if (item && typeof item === "string") {
      return item
    }
    const formData = new FormData()
    formData.append("file", item)
    const res = await instancesV4.post("setting/file/upload", formData)
    return res?.data?.data?.fileUrl
  })

  return Promise.all(uploadPromises)
}

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  return instancesV4
    .post("setting/file/upload", formData)
    .then((res) => res?.data?.data?.fileUrl)
    .catch(() => null)
}

export const getExchangeRate = () => {
  return (dispatch) => {
    instancesEnterprise
      .get(`/payment/exchange-rate`)
      .then((response) => {
        dispatch({
          type: GET_EXCHANGE_RATE,
          data: response?.data?.data?.conversionRate || 1
        })
      })
      .catch(() => {
        dispatch({
          type: GET_EXCHANGE_RATE,
          data: 1
        })
      })
  }
}