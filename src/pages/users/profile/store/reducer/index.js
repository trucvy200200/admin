import { GET_PROFILE, EDIT_PROFILE, GET_MY_CONTRACT, GET_SETTING, LOGOUT } from "../action"

// ** Initial State
const initialState = {
  user: null,
  contract: null
}

const profiles = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_CONTRACT:
      return {
        ...state,
        contract: action.data
      }
    case GET_PROFILE:
      return {
        ...state,
        user: action.data
      }
    case EDIT_PROFILE:
      return {
        ...state,
        user: action.data
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case GET_SETTING:
      return {
        ...state,
        setting: action.data
      }
    default:
      return { ...state }
  }
}
export default profiles
