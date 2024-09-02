import React from "react"
import { X } from "react-feather"
import { Card, Modal } from "reactstrap"
import InputOTP from "../input"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "../styles/modal.scss"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

const ModalOTPTable = (props) => {
  return (
    <Modal isOpen={props.show} centered className={"modal-md modal-otp-input"}>
      <Card className={"mb-0 p-2 text-center"}>
        <X size={16} className="mr-25 close_btn" onClick={() => props?.handleNoButton()} />
        <InputOTP {...props} />
      </Card>
    </Modal>
  )
}

export default ModalOTPTable
