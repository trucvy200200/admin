import React from "react"
import { X } from "react-feather"
import { Card, Modal } from "reactstrap"
import Edit from '../edit'

// ** Styles
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

const ModalEditTable = (props) => {
  return (
    <Modal isOpen={props.show} centered className={"modal-md product-modal"}>
      < Card className={"mb-0 p-2 text-center"}>
        <X size={16} className="mr-25 close_btn" onClick={() => props?.handleNoButton()} />
        <Edit {...props} />
      </Card>
    </Modal >
  )
}

export default ModalEditTable
