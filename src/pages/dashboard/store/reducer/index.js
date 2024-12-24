import { GET_ORDER_CHART, GET_RENENUE_CHART } from "../action"

// ** Initial State
const initialState = {
  orderChart: {},
  revenueChart: {}
}

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_CHART:
      return {
        ...state,
        orderChart: action.orderChart,
      }
      case GET_RENENUE_CHART:
      return {
        ...state,
        revenueChart: action.revenueChart,
      }
    default:
      return { ...state }
  }
}
export default dashboard
