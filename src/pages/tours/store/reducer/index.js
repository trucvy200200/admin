import { GET_TOURS, GET_INCOMING_TOURS } from "../action"

// ** Initial State
const initialState = {
  tours: [],
  total: 0,
  params: {},
  incomingTours: []
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
    default:
      return { ...state }
  }
}
export default tours
