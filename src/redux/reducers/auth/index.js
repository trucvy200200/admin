// **  Initial State
const initialState = {
  userData: {},
  dataLogin: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_DATA_LOGIN":
      return {
        ...state,
        dataLogin: action?.data,
        userData: action?.data
      }
    case "LOGIN":
      return {
        ...state,
        userData: action.data
      }
    case "LOGOUT":
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }
    case "LOAD_USER_DATA":
      return {
        ...state,
        userData: action.data
      }
    default:
      return state
  }
}

export default authReducer
