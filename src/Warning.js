import React, { memo, useState } from "react"
import { useSelector } from "react-redux"
import { ROLE_POSITION } from "@constants/users-constant"
import { useTranslation } from "react-i18next"
import { ModalWarning } from "@src/components/ModalWarning2FA"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"

const Warning = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.profiles?.user)
  const token = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

  // React.useEffect(() => {
  //   if (user && token) {
  //     setOpen(!user?.isTwoFactorAuthenticationEnabled)
  //   }
  // }, [token, user])

  return (
    <>
      {/* {user && token ? (
        <ModalWarning
          closable={user?.position === ROLE_POSITION.SYSTEM_ADMIN || user?.position === ROLE_POSITION.IT_SUPPORT}
          isModalOpen={open}
          setIsModalOpen={(type) => setOpen(type)}
          message={t("We have detected that your account does not have Two-Factor Authentication (2FA) enabled. For your security, it is highly recommended to enable 2FA immediately")}
        />
      ) : null} */}
    </>
  )
}

export default memo(Warning)
