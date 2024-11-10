import { GET_HOTELS } from "../action"

// ** Initial State
const initialState = {
  hotels: [],
  total: 0,
  params: {}
}

const hotels = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.hotels,
        total: action.total,
        params: action.params
      }
    default:
      return { ...state }
  }
}
export default hotels
