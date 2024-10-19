// **  Initial State
import {} from "@store/actions/common"

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
    default:
      return state
  }
}

export default commonReducer
