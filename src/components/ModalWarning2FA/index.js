import { useState } from "react"
import { Card } from "reactstrap"
import { Modal, Spin } from "antd"
import { useTranslation } from "react-i18next"
import { IoWarning } from "react-icons/io5"
import Security2FAModal from "@src/pages/users/profile/components/ProfileHeader/Security2FAModal"

import "./styles.scss"

export const ModalWarning = ({ closable, isModalOpen, setIsModalOpen, message }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading ? (
        <div className="modal-backdrop show w-100 h-100" style={{ zIndex: 999999999, position: "fixed" }}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Spin size="large" />
          </div>
        </div>
      ) : null}
      {isModalOpen ? (
        <Modal
          className="modal-waring"
          open={isModalOpen}
          centered
          closable={closable}
          onOk={() => setIsModalOpen(false)}
          okText={t("Confirm")}
          cancelText={t("Cancel")}
          onCancel={() => {
            if (!closable) return
            setIsModalOpen(false)
          }}
        >
          <Card className="p-0 m-0 waring">
            <div className="circle-wrapper"></div>
            <div className="heading">{t("Warning")}!</div>
            <div className="foot">
              <div className="foot-circle">
                <IoWarning size={105} color={"#ff4545"} />
              </div>
              <div className="top-container"></div>
              <h3 className="my-1">{message}</h3>
              <div className="warning-content">
                <Security2FAModal setLoading={setLoading} />
              </div>
            </div>
          </Card>
        </Modal>
      ) : null}
    </>
  )
}
