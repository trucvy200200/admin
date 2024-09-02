import React from "react"
import { Card, Modal } from "reactstrap"
import { useTranslation } from "react-i18next"
import { Progress, Spin } from "antd"
import styled from "styled-components"

const SpinStyled = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #166699 !important;
  }
`

export const LoadingBackgroundUpload = ({ percent, message }) => {
  return (
    <Modal isOpen={true} centered toggle={() => {}} wrapClassName="modal-loader-wrapper" className={"modal-xs modal-loader"}>
      <Card className={"mb-0 p-2 text-center"}>
        <div className={"d-flex justify-content-center flex-column align-items-center gap-1"}>
          <SpinStyled size="large" />
          <Progress percent={percent} status="active" showInfo={false} style={{ margin: "0" }} />
        </div>
        <p className={"mt-1 mb-0"}>{message}</p>
      </Card>
    </Modal>
  )
}
