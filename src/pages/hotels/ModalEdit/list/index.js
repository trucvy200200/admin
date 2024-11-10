// ** User List Component
import Table from "./Table"

// ** Styles
import "@styles/react/apps/app-users.scss"
import React from "react"

const ModalEdit = (props) => {
  return (
    <div>
      <Table {...props} />
    </div>
  )
}

export default ModalEdit
