// **  Initial State
import {
  GET_ACTIVE_ADMINS,
  GET_ACTIVE_USERS,
  GET_EXCHANGE_RATE,
  GET_IT_SUPPORTS,
  GET_NORMAL_ADMINS,
  GET_SYSTEM_ADMINS
} from "@store/actions/common"

const initialState = {
  activeUsers: {
    data: [],
    total: 0,
    params: {}
  },
  activeAdmins: {
    data: [],
    params: {}
  },
  itSupports: [],
  systemAdmins: [],
  normalAdmins: [],
  exchangeRate: 0
}

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: {
          params: action.params,
          data: action.data,
          total: action.total
        }
      }
    case GET_ACTIVE_ADMINS:
      return {
        ...state,
        activeAdmins: {
          data: action.data,
          total: action.total
        }
      }
    case GET_IT_SUPPORTS:
      return {
        ...state,
        itSupports: action.data
      }
    case GET_SYSTEM_ADMINS:
      return {
        ...state,
        systemAdmins: action.data
      }
    case GET_NORMAL_ADMINS:
      return {
        ...state,
        normalAdmins: action.data
      }
    case GET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.data
      }
    default:
      return state
  }
}

export default commonReducer
