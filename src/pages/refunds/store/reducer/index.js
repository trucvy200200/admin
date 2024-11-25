import { GET_ORDER_DETAIL, GET_REFUNDS } from "../action"

// ** Initial State
const initialState = {
  refunds: [],
  total: 0,
  params: {},
  detail: {}
}

const refunds = (state = initialState, action) => {
  switch (action.type) {
    case GET_REFUNDS:
      return {
        ...state,
        refunds: action.refunds,
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
export default refunds
