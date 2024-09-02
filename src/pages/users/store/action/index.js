import { instancesEnterprise, instancesV2, instancesV4 } from "@src/@core/plugin/axios"
import { REASON_TYPE } from "@constants/settings-constant"
import { APPROVAL_CCC_ERROR } from "@constants/users-constant"
export const GET_USERS = "GET_USERS"
export const GET_USER = "GET_USER"
export const GET_ERROR = "GET_ERROR"
export const GET_GROUPS = "GET_GROUPS"
export const EDIT_USER = "EDIT_USER"
export const VERIFY_USER = "VERIFY_USER"
export const REMOVE_USER = "REMOVE_USER"
export const GET_USER_CONTRACTS = "GET_USER_CONTRACTS"
export const GET_USER_WAITING_REVIEW = "GET_USER_WAITING_REVIEW"
export const GET_USERS_BY_ADMIN = "GET_USERS_BY_ADMIN"
export const GET_USERS_MANAGE_POINT = "GET_USERS_MANAGE_POINT"
export const GET_MY_NOTIFICATIONS = "GET_MY_NOTIFICATIONS"
export const UPDATE_MY_NOTIFICATIONS = "UPDATE_MY_NOTIFICATIONS"
export const READ_ALL_NOTIFY = "READ_ALL_NOTIFY"
export const READ_NOTIFY_BY_ID = "READ_NOTIFY_BY_ID"
export const DELETE_NOTIFY_BY_ID = "DELETE_NOTIFY_BY_ID"
export const GET_SUBORDINATE = "GET_SUBORDINATE"
export const SET_COUNTRIES = "SET_COUNTRIES"
export const CHANGE_USER = "CHANGE_USER"
export const GET_TOTAL_PENDING_CONTRACT = "GET_TOTAL_PENDING_CONTRACT"
export const GET_REJECT_REASONS = "GET_REJECT_REASONS"
export const GET_USER_REVIEW_HISTORY = "GET_USER_REVIEW_HISTORY"
export const GET_PRODUCT_USERS_BY_ADMIN = "GET_PRODUCT_USERS_BY_ADMIN"
export const GET_DELETE_REASONS = "GET_DELETE_REASONS"
export const GET_CC_USERS_BY_ADMIN = "GET_CC_USERS_BY_ADMIN"
export const GET_ENTERPRISE_CONTRACTS = "GET_ENTERPRISE_CONTRACTS"
export const GET_CUSTOMER_CARE_BY_ID = "GET_CUSTOMER_CARE_BY_ID"
export const GET_BUSINESSES_BY_CUSTOMER_CARE_CODE = "GET_BUSINESSES_BY_CUSTOMER_CARE_CODE"
export const GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID = "GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID"
export const GET_ORDERS_BY_CUSTOMER_CARE_CODE = "GET_ORDERS_BY_CUSTOMER_CARE_CODE"
export const GET_WARNING_WALLET_USERS = "GET_WARNING_WALLET_USERS"
export const GET_WITHDRAW_LIMIT_USERS = "GET_WITHDRAW_LIMIT_USERS"
export const GET_CUSTOMER_CARE_INTRODUCTION = "GET_CUSTOMER_CARE_INTRODUCTION"

export const getUserSponsor = async (userCode) => {
  return await instancesV2
    .get(`/admin/user/user-code/${userCode}`)
    .then((response) => {
      return response?.data?.data
    })
    .catch((err) => console.log(err))
}

export const getUserWaitingReview = () => {
  return async (dispatch) => {
    await instancesV2
      .get(`/admin/user/review/total-waiting`)
      .then((response) => {
        dispatch({
          type: GET_USER_WAITING_REVIEW,
          data: response?.data?.data
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: GET_USER_WAITING_REVIEW,
          data: 0
        })
      })
  }
}

export const getCustomerCareDetailById = (id) => {
  return instancesV2.get(`/admin/user/customer-care/${id}`)
}

export const getCustomerCareById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CUSTOMER_CARE_BY_ID,
      data: null
    })
    await instancesV2
      .get(`/admin/user/customer-care/${id}`)
      .then((response) => {
        const data = response?.data?.data
        dispatch({
          type: GET_CUSTOMER_CARE_BY_ID,
          data: data
        })
        dispatch(getBusinessesByCustomerCareCode(data?.user_code, { limit: 10, offset: 0 }, () => { }))
        dispatch(getOrdersByCustomerCareCode(data?.user_code, { limit: 10, offset: 0 }, () => { }))
        dispatch(getTransactionHistoryByCustomerCareId(id, { limit: 10, offset: 0 }, () => { }))
      })
      .catch(() => { })
  }
}

export const getBusinessesByCustomerCareCode = (userCode, params, setLoading) => {
  return async (dispatch) => {
    setLoading(true)
    dispatch({
      type: GET_BUSINESSES_BY_CUSTOMER_CARE_CODE,
      data: [],
      total: 0,
      params
    })
    await instancesEnterprise
      .get(`/admin/company/${userCode}/list`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_BUSINESSES_BY_CUSTOMER_CARE_CODE,
          data: response?.data?.listData,
          total: response?.data?.total,
          params
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }
}

export const getTransactionHistoryByCustomerCareId = (id, params, setLoading) => {
  return async (dispatch) => {
    setLoading(true)
    dispatch({
      type: GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID,
      data: [],
      total: 0,
      params
    })
    await instancesV2
      .get(`/admin/transaction/cskh/${id}`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID,
          data: response?.data?.listData,
          total: response?.data?.total,
          params
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }
}

export const getOrdersByCustomerCareCode = (userCode, params, setLoading) => {
  return async (dispatch) => {
    setLoading(true)
    dispatch({
      type: GET_ORDERS_BY_CUSTOMER_CARE_CODE,
      data: [],
      total: 0,
      totalCashback: 0,
      params
    })
    await instancesEnterprise
      .get(`/admin/order/${userCode}/list`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_ORDERS_BY_CUSTOMER_CARE_CODE,
          data: response?.data?.listData,
          total: response?.data?.total,
          totalCashback: response?.data?.totalCashback,
          params
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }
}

export const getUsersByAdmin = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2.get("/admin/user/filter", config).then((response) => {
      dispatch({
        type: GET_USERS_BY_ADMIN,
        users: response?.data?.users,
        totalPages: response?.data?.count,
        totalUsers: response?.data?.totalUsers,
        kycUsers: response?.data?.kycUsers,
        totalAmount: response?.data?.totalAmount,
        totalAmountDirectCommission: response?.data?.totalAmountDirectCommission,
        totalAmountLeaderCommission: response?.data?.totalAmountLeaderCommission,
        totalAmountReBack: response?.data?.totalAmountReBack,
        totalAmountUpLevel: response?.data?.totalAmountUpLevel,
        params: params
      })
    })
  }
}

export const getUsersAutoKYC = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/system-verified/filter", config)
      .then((response) => {
        dispatch({
          type: GET_USERS_BY_ADMIN,
          users: response?.data?.users,
          totalPages: response?.data?.count,
          totalUsers: response?.data?.totalUsers,
          kycUsers: response?.data?.kycUsers,
          totalAmount: response?.data?.totalAmount,
          totalAmountDirectCommission: response?.data?.totalAmountDirectCommission,
          totalAmountLeaderCommission: response?.data?.totalAmountLeaderCommission,
          totalAmountReBack: response?.data?.totalAmountReBack,
          totalAmountUpLevel: response?.data?.totalAmountUpLevel,
          params: params
        })
      })
      .catch(() => {
        dispatch({
          type: GET_USERS_BY_ADMIN,
          users: [],
          totalPages: 0,
          totalUsers: 0,
          kycUsers: 0,
          totalAmount: 0,
          totalAmountDirectCommission: 0,
          totalAmountLeaderCommission: 0,
          totalAmountReBack: 0,
          totalAmountUpLevel: 0,
          params: params
        })
      })
  }
}

export const getUsersManagePoint = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/point", config)
      .then((response) => {
        dispatch({
          type: GET_USERS_MANAGE_POINT,
          users: response?.data?.users,
          totalPages: response?.data?.count,
          totalUsers: response?.data?.count,
          totalDeposit: response?.data?.totalDeposit,
          totalIncome: response?.data?.totalIncome,
          totalPurchase: response?.data?.totalPurchase,
          totalWithdraw: response?.data?.totalWithdraw,
          totalTransfer: response?.data?.totalTransfer,
          params: params
        })
      })
      .catch(() => { })
  }
}

export const getUserReviewHistory = (params, setLoading) => {
  const config = { params }
  return async (dispatch) => {
    setLoading(true)
    await instancesV2
      .get("/admin/user/history-update/filter", config)
      .then((response) => {
        dispatch({
          type: GET_USER_REVIEW_HISTORY,
          data: response?.data?.listData || [],
          totalPages: response?.data?.total || 0,
          params
        })
        setLoading(false)
      })
      .catch(() => {
        dispatch({
          type: GET_USER_REVIEW_HISTORY,
          data: [],
          totalPages: 0,
          params
        })
        setLoading(false)
      })
  }
}

export const getSubordinate = async (params) => {
  const config = { params: params }
  return await instancesV2.get("/admin/user/floor", config)
}

export const getUsers = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2.get("/admin/user/review", config).then((response) => {
      dispatch({
        type: GET_USERS,
        users: response?.data?.users,
        totalPages: response?.data?.count,
        totalWaitingUsers: response?.data?.totalWaitingUsers,
        totalRejectedUsers: response?.data?.totalRejectedUsers,
        params: params
      })
    })
  }
}

export const getProductUsersByAdmin = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/product/filter", config)
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_USERS_BY_ADMIN,
          data: response?.data?.users || [],
          totalPages: response?.data?.count || 0,
          params
        })
      })
      .catch(() => {
        dispatch({
          type: GET_PRODUCT_USERS_BY_ADMIN,
          data: [],
          totalPages: 0,
          params
        })
      })
  }
}

export const getCCUsersByAdmin = (params, setLoading) => {
  const config = { params: params }
  setLoading(true)
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/customer-care/filter", config)
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_CC_USERS_BY_ADMIN,
          data: response?.data?.users || [],
          totalPages: response?.data?.count || 0,
          params
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_CC_USERS_BY_ADMIN,
          data: [],
          totalPages: 0,
          params
        })
      })
  }
}

export const setUserBeComeCC = (data, notification, toggleLoading, getAll) => {
  toggleLoading(true)
  instancesV2
    .post(`/admin/user/approve-customer-care`, data)
    .then(async (res) => {
      toggleLoading(false)
      if (res.data.status) {
        await getAll()
        notification.toast.success(notification.success("User approval for Customer Care successfully!"))
      } else {
        switch (res.data.meta.messages) {
          case APPROVAL_CCC_ERROR.INCORRECT_PIN_CODE:
            notification.toast.error(notification.error("Incorrect pin code!"))
            break
          case APPROVAL_CCC_ERROR.NOT_FOUND_USER:
            notification.toast.error(notification.error("User doesn't exist"))
            break
          case APPROVAL_CCC_ERROR.USER_ALREADY_EXIST:
            notification.toast.error(notification.error("User is already exist"))
            break
          default:
            notification.toast.error(notification.error("User approval for Customer Care failed!"))
            break
        }
      }
    })
    .catch((error) => {
      toggleLoading(false)
      let message = error?.response?.data?.message || null
      switch (message) {
        case APPROVAL_CCC_ERROR.INCORRECT_PIN_CODE:
          notification.toast.error(notification.error("Incorrect pin code!"))
          break
        case APPROVAL_CCC_ERROR.NOT_FOUND_USER:
          notification.toast.error(notification.error("User doesn't exist"))
          break
        case APPROVAL_CCC_ERROR.USER_ALREADY_EXIST:
          notification.toast.error(notification.error("User is already exist"))
          break
        default:
          notification.toast.error(notification.error("User approval for Customer Care failed!"))
          break
      }
    })
}

export const getUserV2 = (id) => {
  return instancesV2.get(`/admin/user/${id}`)
}

export const verifyStatusUser = (id, data, setLoading, handleSuccess, handleError) => {
  return async (dispatch) => {
    setLoading(true)
    await instancesV2
      .put(`/admin/user/verification/${id}`, data)
      .then((response) => {
        setLoading(false)
        if (response?.data && response?.data?.data?.status) {
          handleSuccess()
          dispatch(getUserWaitingReview())
        } else {
          handleError(response?.data?.meta?.messages)
        }
      })
      .catch((err) => {
        handleError(err?.response?.data?.message)
        setLoading(false)
      })
  }
}

export const updateStatusUser = (id, status, notification, toggleLoading, handleSuccess) => {
  return (dispatch) => {
    toggleLoading(true)
    instancesV2
      .put(`/admin/user/update-status/${id}`, { status })
      .then(async (res) => {
        if (res.data.data) {
          handleSuccess()
          toggleLoading(false)
          notification.toast.success(notification.success("Update user successfully!"))
        } else {
          toggleLoading(false)
          notification.toast.error(notification.error(res.data.meta.messages))
        }
      })
      .catch((err) => {
        toggleLoading(false)
        notification.toast.error(notification.error(err?.response?.data?.message || "Update user failed!"))
      })
  }
}

export const suspendUser = (pinCode, id, notification, toggleLoading, getAll) => {
  return (dispatch) => {
    toggleLoading(true)
    instancesV2
      .post(`/admin/user/suspend-user`, { userId: id, pinCode: pinCode })
      .then(async (res) => {
        toggleLoading(false)
        if (res.data.status) {
          await getAll()
          notification.toast.success(notification.success("Update user successfully!"))
        } else {
          notification.toast.error(notification.error(res.response.data.message))
        }
      })
      .catch((res) => {
        toggleLoading(false)
        notification.toast.error(notification.error(res.response.data.message))
      })
  }
}

export const allowUserLoginProduct = (id, data, notification, toggleLoading, getAll) => {
  toggleLoading(true)
  instancesV2
    .put(`/admin/user/verify-login-product/${id}`, data)
    .then(async (res) => {
      toggleLoading(false)
      if (res.data.status) {
        await getAll()
        notification.toast.success(notification.success("Allowing participation in the product page successfully!"))
      } else {
        notification.toast.error(notification.error(res.data.meta.messages))
      }
    })
    .catch((error) => {
      let message = error?.response?.data?.message || null
      if (error?.response?.data?.message?.includes("Registered")) {
        message = "User have participated in the product page"
      }
      toggleLoading(false)
      notification.toast.error(notification.error(message || "Allowing participation in the product page failed!"))
    })
}

export const updateUser = (dataChange, user, id, notification, endLoading, handleNoButton, handleGetAll) => {
  return (dispatch) => {
    instancesV2
      .put(`/admin/user/${id}`, dataChange)
      .then(async (res) => {
        if (res.data.data) {
          dispatch({
            type: EDIT_USER,
            id,
            user
          })
          await handleGetAll()
          await endLoading()
          await handleNoButton()
          notification.toast.success(notification.success("Update user successfully!"))
        } else {
          endLoading()
          notification.toast.error(notification.error("Update user failed!"))
        }
      })
      .catch((err) => {
        endLoading()
        notification.toast.error(notification.error(err.response.data.message))
      })
  }
}

export const uploadUserImage = (data, userId, type) => {
  const formData = new FormData()
  formData.append("file", data)
  formData.append("userId", userId)
  formData.append("type", type)
  return instancesV2
    .post("/admin/user/upload-kyc", formData)
    .then((res) => res?.data?.data)
    .catch(() => null)
}

export const getUserImage = async (type, userId) => {
  const params = { type, userId }
  return instancesV2
    .get("/admin/user/image-kyc", { params })
    .then((value) => {
      return value?.data?.data
    })
    .catch(() => {
      return null
    })
}

export const getUserFaceCCCDImages = async (userId) => {
  return instancesV2
    .get(`/admin/user/images-kyc/${userId}`)
    .then((value) => value?.data?.data)
    .catch(() => null)
}

export const getContractById = (params) => {
  const config = { params: params }
  return instancesV2.get(`/admin/contracts/file`, config)
}

export const getUserContracts = (params) => {
  return async (dispatch) => {
    await instancesV2
      .get(`/admin/contracts/filter?${params}`)
      .then((response) => {
        dispatch({
          type: GET_USER_CONTRACTS,
          data: response?.data?.data?.listData,
          total: response?.data?.data?.total
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getEnterpriseContracts = (params) => {
  return async (dispatch) => {
    await instancesV2
      .get(`/admin/user/enterprise-contract/filter?${params}`)
      .then((response) => {
        dispatch({
          type: GET_ENTERPRISE_CONTRACTS,
          data: response?.data?.data?.listData,
          total: response?.data?.data?.total
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getEnterpriseContractById = (params) => {
  const config = { params: params }
  return instancesV2
    .get(`/admin/user/enterprise-cskh-contract`, config)
    .then((res) => res)
    .catch(() => null)
}

export const getTotalPendingContracts = () => {
  return async (dispatch) => {
    await instancesV2
      .get(`/admin/contracts/total-pending`)
      .then((response) => {
        dispatch({
          type: GET_TOTAL_PENDING_CONTRACT,
          total: response?.data?.data
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getMyNotifications = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV4
      .get(`/admin/notification/my-notify`, config)
      .then((response) => {
        dispatch({
          type: GET_MY_NOTIFICATIONS,
          data: response?.data?.listData,
          total: response?.data?.total,
          totalUnRead: response?.data?.totalUnRead,
          params: params
        })
      })
      .catch((err) => console.log(err))
  }
}

export const readAllNotification = () => {
  return async (dispatch) => {
    dispatch({
      type: READ_ALL_NOTIFY
    })
    await instancesV4
      .post(`/admin/notification/my-notify/read-all`)
      .then(() => { })
      .catch((err) => console.log(err))
  }
}

export const readNotificationById = (params) => {
  return async (dispatch) => {
    dispatch({
      type: READ_NOTIFY_BY_ID,
      notifyId: params?.notifyId
    })
    await instancesV4
      .put(`/admin/notification/${params?.notifyId}`, { isRead: true })
      .then(() => { })
      .catch((err) => console.log(err))
  }
}

export const deleteNotificationById = (params) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_NOTIFY_BY_ID,
      notifyId: params?.notifyId
    })
    await instancesV4
      .delete(`/admin/notification/${params?.notifyId}`)
      .then(() => { })
      .catch((err) => console.log(err))
  }
}

export const updateMyNotifications = (params) => {
  return async (dispatch) => {
    const config = { params: params }
    await instancesV4
      .get(`/admin/notification/my-notify`, config)
      .then((response) => {
        dispatch({
          type: UPDATE_MY_NOTIFICATIONS,
          data: response?.data?.listData,
          total: response?.data?.total,
          totalUnRead: response?.data?.totalUnRead,
          params: params
        })
      })
      .catch((err) => console.log(err))
  }
}

export const getRejectReasons = () => {
  return async (dispatch) => {
    instancesV4
      .get(`/admin/setting/reason?type=${REASON_TYPE.REJECT_KYC}`)
      .then((res) => {
        if (res?.data?.data) {
          dispatch({
            type: GET_REJECT_REASONS,
            data: [...res?.data?.data, { id: null, valueVi: "Lý do khác...", valueEn: "Other reason...", type: "other" }]
          })
        } else {
          dispatch({
            type: GET_REJECT_REASONS,
            data: []
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_REJECT_REASONS,
          data: []
        })
      })
  }
}

export const getDeleteReasons = () => {
  return async (dispatch) => {
    instancesV4
      .get(`/admin/setting/reason?type=${REASON_TYPE.DELETE_USER}`)
      .then((res) => {
        if (res?.data?.data) {
          dispatch({
            type: GET_DELETE_REASONS,
            data: [...res?.data?.data, { id: null, valueVi: "Lý do khác...", valueEn: "Other reason...", type: "other" }]
          })
        } else {
          dispatch({
            type: GET_DELETE_REASONS,
            data: []
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_REJECT_REASONS,
          data: []
        })
      })
  }
}

export const deleteUser = (id, body, setLoading, handleSuccess, handleError) => {
  setLoading(true)
  return instancesV2
    .delete(`/admin/user/${id}`, { data: body })
    .then((res) => {
      setLoading(false)
      if (res.data && !res?.data?.error) {
        handleSuccess()
      } else {
        handleError("Delete user failed!")
      }
    })
    .catch((error) => {
      setLoading(false)
      handleError(error?.response?.data?.message || "Delete user failed!")
    })
}

export const getWarningWalletUsers = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/wallet-warning/filter", config)
      .then((response) => {
        dispatch({
          type: GET_WARNING_WALLET_USERS,
          users: response?.data?.users || [],
          totalPages: response?.data?.count || 0,
          params
        })
      })
      .catch(() => {
        dispatch({
          type: GET_WARNING_WALLET_USERS,
          users: [],
          totalPages: 0,
          params
        })
      })
  }
}

export const getWithdrawLimitUsers = (params) => {
  const config = { params: params }
  return async (dispatch) => {
    await instancesV2
      .get("/admin/user/point", config)
      .then((response) => {
        dispatch({
          type: GET_WITHDRAW_LIMIT_USERS,
          users: response?.data?.users || [],
          totalPages: response?.data?.count || 0,
          params
        })
      })
      .catch(() => {
        dispatch({
          type: GET_WITHDRAW_LIMIT_USERS,
          users: [],
          totalPages: 0,
          params
        })
      })
  }
}

export const getCustomerCareIntroduction = (id) => {
  return async (dispatch) => {
    return await instancesV2
      .get(`/admin/user/cskh-detail/${id}`)
      .then((response) => {
        dispatch({
          type: GET_CUSTOMER_CARE_INTRODUCTION,
          data: response?.data?.data
        })
        return response?.data?.data
      })
      .catch((err) => {
        dispatch({
          type: GET_CUSTOMER_CARE_INTRODUCTION,
          data: null
        })
      })
  }
}
