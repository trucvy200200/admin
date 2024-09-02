import { v4 as uuidv4 } from "uuid"
import {
  GET_USER_CONTRACTS,
  GET_USERS,
  GET_USER,
  GET_GROUPS,
  EDIT_USER,
  GET_USERS_BY_ADMIN,
  SET_COUNTRIES,
  REMOVE_USER,
  VERIFY_USER,
  GET_USERS_MANAGE_POINT,
  GET_SUBORDINATE,
  GET_MY_NOTIFICATIONS,
  READ_ALL_NOTIFY,
  READ_NOTIFY_BY_ID,
  DELETE_NOTIFY_BY_ID,
  UPDATE_MY_NOTIFICATIONS,
  GET_USER_WAITING_REVIEW,
  CHANGE_USER,
  GET_TOTAL_PENDING_CONTRACT,
  GET_REJECT_REASONS,
  GET_USER_REVIEW_HISTORY,
  GET_PRODUCT_USERS_BY_ADMIN,
  GET_DELETE_REASONS,
  GET_CC_USERS_BY_ADMIN,
  GET_ENTERPRISE_CONTRACTS,
  GET_CUSTOMER_CARE_BY_ID,
  GET_BUSINESSES_BY_CUSTOMER_CARE_CODE,
  GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID,
  GET_ORDERS_BY_CUSTOMER_CARE_CODE,
  GET_WARNING_WALLET_USERS,
  GET_WITHDRAW_LIMIT_USERS,
  GET_CUSTOMER_CARE_INTRODUCTION
} from "../action"

// ** Initial State
const initialState = {
  allData: [],
  data: [],
  notifications: [],
  unReadNotifications: 0,
  countNotifications: 0,
  totalReviews: 0,
  notificationsParams: {},
  users: [],
  total: 1,
  totalRejectedUsers: 0,
  totalWaitingUsers: 0,
  params: {},
  selectedUser: null,
  errorMessage: null,
  groups: [],
  userContracts: [],
  enterpriseContracts: [],
  totalContract: 0,
  totalPendingContracts: 0,
  countries: [],
  usersByAdmin: {
    data: [],
    total: 0,
    totalUsers: 0,
    kycUsers: 0,
    totalAmount: 0,
    totalAmountDirectCommission: 0,
    totalAmountLeaderCommission: 0,
    totalAmountReBack: 0,
    totalAmountUpLevel: 0,
    totalDeposit: 0,
    totalIncome: 0,
    totalPurchase: 0,
    totalWithdraw: 0,
    totalTransfer: 0
  },
  userSubordinate: [],
  rejectReasons: [],
  deleteReasons: [],
  userReviewHistory: {
    data: [],
    totalPages: 0,
    params: {}
  },
  productUsersByAdmin: {
    data: [],
    totalPages: 0,
    params: {}
  },
  customerCenterUsersByAdmin: {
    data: [],
    totalPages: 0,
    params: {}
  },
  customerCare: null,
  businessesByCCCenterCode: {
    data: [],
    total: 0,
    params: {}
  },
  cCCenterTransactionHistory: {
    data: [],
    total: 0,
    params: {}
  },
  ordersByCCCenter: {
    data: [],
    total: 0,
    totalCashback: 0,
    params: {}
  }
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WAITING_REVIEW:
      return {
        ...state,
        totalReviews: action.data
      }
    case GET_CUSTOMER_CARE_BY_ID:
      return {
        ...state,
        customerCare: action.data
      }
    case GET_BUSINESSES_BY_CUSTOMER_CARE_CODE:
      return {
        ...state,
        businessesByCCCenterCode: {
          data: action.data,
          total: action.total,
          params: action.params
        }
      }
    case GET_TRANSACTION_HISTORY_BY_CUSTOMER_CARE_ID:
      return {
        ...state,
        cCCenterTransactionHistory: {
          data: action.data,
          total: action.total,
          params: action.params
        }
      }
    case GET_ORDERS_BY_CUSTOMER_CARE_CODE:
      return {
        ...state,
        ordersByCCCenter: {
          data: action.data,
          total: action.total,
          totalCashback: action.totalCashback,
          params: action.params
        }
      }
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.data
      }
    case GET_USER_CONTRACTS:
      return {
        ...state,
        userContracts: action.data,
        totalContract: action.total
      }
    case GET_ENTERPRISE_CONTRACTS:
      return {
        ...state,
        enterpriseContracts: action.data,
        totalContract: action.total
      }
    case GET_MY_NOTIFICATIONS:
      const notificationList = [...state.notifications, ...action.data]?.length > action.total ? [...state.notifications] : [...state.notifications, ...action.data]
      return {
        ...state,
        notifications: notificationList,
        unReadNotifications: action.totalUnRead,
        countNotifications: action.total,
        notificationsParams: action.params
      }
    case UPDATE_MY_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.data,
        unReadNotifications: action.totalUnRead,
        countNotifications: action.total,
        notificationsParams: action.params
      }
    case READ_ALL_NOTIFY:
      return {
        ...state,
        notifications: state.notifications.map((item) => {
          return { ...item, isRead: true }
        }),
        unReadNotifications: 0
      }
    case READ_NOTIFY_BY_ID:
      const newNotifications = state.notifications.map((item) => {
        return item?.id === action.notifyId ? { ...item, isRead: true } : item
      })
      const notifyReadFounded = state.notifications.find((item) => item?.id === action?.notifyId)
      return {
        ...state,
        notifications: newNotifications,
        unReadNotifications: !notifyReadFounded?.isRead ? state.unReadNotifications - 1 : state.unReadNotifications
      }
    case DELETE_NOTIFY_BY_ID:
      const newDeleteNotifications = state.notifications.filter((item) => item?.id !== action?.notifyId)
      const notifyFounded = state.notifications.find((item) => item?.id === action?.notifyId)
      return {
        ...state,
        notifications: newDeleteNotifications,
        unReadNotifications: !notifyFounded?.isRead ? state.unReadNotifications - 1 : state.unReadNotifications,
        countNotifications: state.countNotifications - 1
      }
    case GET_USERS_BY_ADMIN:
      const data = {
        data: action.users || [],
        total: action.totalPages || 0,
        totalUsers: action.totalUsers || 0,
        totalAmount: action.totalAmount || 0,
        totalAmountDirectCommission: action.totalAmountDirectCommission || 0,
        totalAmountLeaderCommission: action.totalAmountLeaderCommission || 0,
        totalAmountReBack: action.totalAmountReBack || 0,
        totalAmountUpLevel: action.totalAmountUpLevel || 0
      }
      return {
        ...state,
        usersByAdmin: data
      }
    case CHANGE_USER:
      const newArray = state.usersByAdmin?.data?.map((item) => {
        if (item?.id !== action.position) return item
        return { ...action.user, userID: action.user?.id, id: uuidv4() }
      })
      return {
        ...state,
        usersByAdmin: { ...state.usersByAdmin, data: newArray }
      }
    case GET_SUBORDINATE:
      return {
        ...state,
        userSubordinate: action.users,
        total: action.total
      }
    case GET_USERS_MANAGE_POINT:
      const newData = {
        data:
          action.users?.map((item) => {
            return { ...item, userID: item.id, id: uuidv4() }
          }) || [],
        total: action.totalPages || 0,
        totalUsers: action.totalUsers || 0,
        totalDeposit: action.totalDeposit || 0,
        totalIncome: action.totalIncome || 0,
        totalPurchase: action.totalPurchase || 0,
        totalWithdraw: action.totalWithdraw || 0,
        totalTransfer: action.totalTransfer || 0
      }
      return {
        ...state,
        usersByAdmin: newData
      }
    case GET_USERS:
      return {
        ...state,
        users: action.users,
        total: action.totalPages,
        totalRejectedUsers: action?.totalRejectedUsers,
        totalWaitingUsers: action?.totalWaitingUsers,
        params: action.params
      }
    case GET_PRODUCT_USERS_BY_ADMIN:
      return {
        ...state,
        productUsersByAdmin: {
          data: action?.data,
          params: action?.params,
          totalPages: action?.totalPages
        }
      }
    case GET_CC_USERS_BY_ADMIN:
      return {
        ...state,
        customerCenterUsersByAdmin: {
          data: action?.data,
          params: action?.params,
          totalPages: action?.totalPages
        }
      }
    case GET_USER_REVIEW_HISTORY:
      return {
        ...state,
        userReviewHistory: {
          data: action.data,
          totalPages: action.totalPages,
          params: action.params
        }
      }
    case GET_GROUPS:
      return {
        ...state,
        groups: action.groups
      }
    case GET_USER:
      return {
        ...state,
        selectedUser: action.selectedUser
      }
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) return action.user
          return user
        })
      }
    case VERIFY_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.id) return action.user
          return user
        }),
        kycUsers: action.user?.status === 2 ? +state.kycUsers + 1 : state.kycUsers
      }
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id)
      }
    case GET_TOTAL_PENDING_CONTRACT:
      return {
        ...state,
        totalPendingContracts: action.total
      }
    case GET_REJECT_REASONS:
      return {
        ...state,
        rejectReasons: action.data
      }
    case GET_DELETE_REASONS:
      return {
        ...state,
        deleteReasons: action.data
      }
    case GET_WARNING_WALLET_USERS:
      return {
        ...state,
        users: action.users,
        total: action.totalPages,
        params: action.params
      }
    case GET_WITHDRAW_LIMIT_USERS:
      return {
        ...state,
        users: action.users,
        total: action.totalPages,
        params: action.params
      }
    case GET_CUSTOMER_CARE_INTRODUCTION:
      return {
        ...state,
        customerCare: action.data
      }
    default:
      return { ...state }
  }
}
export default users
