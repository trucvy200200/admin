import instances from "@src/@core/plugin/axios"

export const GET_ORDER_CHART = "GET_ORDER_CHART"
export const GET_RENENUE_CHART = "GET_RENENUE_CHART"

export const getOrderChart = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/statistics`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_ORDER_CHART,
          orderChart: response?.data?.message,
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_ORDER_CHART,
          orderChart: [],  
        })
      })
  }
}

export const getRevenueChart = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/statistics/line`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_RENENUE_CHART,
          revenueChart: response?.data?.data,
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_RENENUE_CHART,
          revenueChart: [],     
        })
      })
  }
}
