// ** User List Component
import Table from "./Table"

// ** Styles
import "@styles/react/apps/app-users.scss"
import React from "react"

const OrderHistoryTab = (props) => {
  return (
    <div id="orderHistoryTab" className="app-user-list">
      <Table {...props} />
    </div>
  )
}

export default OrderHistoryTab
