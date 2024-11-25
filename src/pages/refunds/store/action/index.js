import instances from "@src/@core/plugin/axios"
import refunds from "../reducer"

export const GET_REFUNDS = "GET_REFUNDS"
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL"

export const getOrderDetail = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/bookings/detail`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_ORDER_DETAIL,
          orders: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_ORDER_DETAIL,
          orders: [],
          total: 0
        })
      })
  }
}

export const getRefunds = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/refunds`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_REFUNDS,
          refunds: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_REFUNDS,
          refunds: [],
          total: 0
        })
      })
  }
}

export const updateStatusRefund = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .put(`/refunds/status`, data)
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Update status successfully!")
        } else {
          handleError("Update status failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Update status failed!")
      })
  } catch (err) {
    endLoading()
  }
}
