import { GET_ORDER_DETAIL, GET_ORDERS } from "../action"

// ** Initial State
const initialState = {
  orders: [],
  total: 0,
  params: {},
  detail: {}
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        total: action.total,
        params: action.params
      }
    case GET_ORDER_DETAIL:
      return {
        ...state,
        detail: action.detail
      }
    default:
      return { ...state }
  }
}
export default orders
