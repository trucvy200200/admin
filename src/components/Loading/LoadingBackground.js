import React from "react"
import { Modal } from "reactstrap"
import { Spin } from "antd"

export const LoadingBackground = () => {
  return (
    <Modal isOpen={true} centered fade={false} toggle={() => {}} className={"modal-xs modal-loader"}>
      <div className={"d-flex justify-content-center"}>
        <Spin size="large" />
      </div>
    </Modal>
  )
}
