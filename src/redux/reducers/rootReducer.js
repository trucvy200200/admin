// ** Redux Imports
import { combineReducers } from "redux"

// ** Reducers Imports
import authReducer from "./auth"
import navbar from "./navbar"
import layout from "./layout"
import common from "./common"
import users from "@pages/users/store/reducer"
import profiles from "@pages/users/profile/store/reducer"
import tours from "@pages/tours/store/reducer"
import hotels from "@pages/hotels/store/reducer"
import vehicles from "@pages/transportations/store/reducer"
import orders from "@pages/orders/store/reducer"
import refunds from "@pages/refunds/store/reducer"

const rootReducer = combineReducers({
  authReducer,
  navbar,
  layout,
  users,
  profiles,
  common,
  tours,
  hotels,
  vehicles,
  orders,
  refunds
})

export default rootReducer
