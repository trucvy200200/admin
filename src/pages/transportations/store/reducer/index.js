import { GET_VEHICLES } from "../action"

// ** Initial State
const initialState = {
  vehicles: [],
  total: 0,
  params: {}
}

const vehicles = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.vehicles,
        total: action.total,
        params: action.params
      }
    default:
      return { ...state }
  }
}
export default vehicles
