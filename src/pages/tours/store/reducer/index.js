import { GET_TOURS, GET_INCOMING_TOURS, GET_CUSTOMER_LIST } from "../action"

// ** Initial State
const initialState = {
  tours: [],
  total: 0,
  params: {},
  incomingTours: [],
  customers: {
    data: [],
    total: 0
  }
}

const tours = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURS:
      return {
        ...state,
        tours: action.tours,
        total: action.total,
        params: action.params
      }
    case GET_INCOMING_TOURS:
      return {
        ...state,
        incomingTours: action.tours,
        total: action.total,
        params: action.params
      }
    case GET_INCOMING_TOURS:
      return {
        ...state,
        customers: { data: action.customers, total: action.total }
      }
    default:
      return { ...state }
  }
}
export default tours
