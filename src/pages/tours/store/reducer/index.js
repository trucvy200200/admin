import { GET_TOURS } from "../action"

// ** Initial State
const initialState = {
  tours: [],
  total: 0,
  params: {}
}

const tours = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURS:
      return {
        ...state,
        tours: action.tours,
        total: action.totalPages,
        params: action.params
      }
    default:
      return { ...state }
  }
}
export default tours
