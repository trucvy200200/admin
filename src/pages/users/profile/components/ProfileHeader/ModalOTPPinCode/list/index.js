// ** User List Component
import Table from "./Table"

// ** Styles
import "@styles/react/apps/app-users.scss"
import React from "react"

const ModalOTP = (props) => {
  return (
    <div id="userCustomer" >
      <Table {...props} />
    </div>
  )
}

export default ModalOTP
