import instances from "@src/@core/plugin/axios"

export const GET_ORDERS = "GET_ORDERS"
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
          detail: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_ORDER_DETAIL,
          detail: null,
          total: 0
        })
      })
  }
}

export const getOrders = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/bookings`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_ORDERS,
          orders: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_ORDERS,
          orders: [],
          total: 0
        })
      })
  }
}
