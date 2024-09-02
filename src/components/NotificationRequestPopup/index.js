import React, { useEffect, useState } from "react"
import { Modal } from "antd"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import themeConfig from "@configs/themeConfig"
import { useTranslation } from "react-i18next"
import toast from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"

function NotificationRequestPopup({ callBack }) {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const token = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      if (Notification.permission !== "granted") {
        setIsModalOpen(true)
        Notification.requestPermission().then()
        if (Notification.permission === 'denied') {
          toast.error(<ErrorNotificationToast message={t('Notifications blocked. Please enable them in your browser.')}/>)
        }
      }
    } else if ('safari' in window && 'pushNotification' in window.safari) {
      const permissionData = window.safari.pushNotification.permission()
      if (permissionData !== 'granted') {
        setIsModalOpen(true)
        window.safari.pushNotification.requestPermission().then()
        if (permissionData === 'denied') {
          toast.error(<ErrorNotificationToast message={t('Push notifications not supported.')}/>)
        }
      }
    } else {
      toast.error(<ErrorNotificationToast message={t('Push notifications not supported.')}/>)
    }
  }, [token])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const requestNotificationPermission = async () => {
    if (blocked) return setIsModalOpen(false)
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      setIsModalOpen(false)
      callBack()
    }
    if (permission === "denied") {
      setBlocked(true)
    }
  }

  return (
    <Modal open={isModalOpen} onOk={() => requestNotificationPermission()} okText={blocked ? t("Confirm") : t("Accept")} cancelText={t("Cancel")} onCancel={handleCancel}>
      <div className="d-flex align-items-center justify-content-center flex-column text-center">
        <span className="brand-logo">
          <img src={themeConfig.app.appLogoImage} alt="logo" style={{ width: "70px", height: "70px" }} />
        </span>
        <h3 className="d-flex align-items-center justify-content-center text-center mt-1">
          {blocked ? t("You have blocked notification") : t("Do you allow WOLCG to send notifications through your browser?")}
        </h3>
        {blocked && <p>{t("You can adjust permission right next to the address bar")}</p>}
      </div>
    </Modal>
  )
}

export default NotificationRequestPopup