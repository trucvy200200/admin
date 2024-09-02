import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { Form, Button, Label, FormGroup, Row, Col, Input } from "reactstrap"
import { toast } from "react-hot-toast"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import { getMyProfile } from "../../store/action"
import { useTranslation } from "react-i18next"
import { Modal } from "antd"
import styled from "styled-components"
import instances from "@src/@core/plugin/axios"
import { useDispatch } from "react-redux"
import { IoShieldCheckmarkSharp } from "react-icons/io5"

const H3Styled = styled.h3`
  font-weight: 600;
  font-size: 18px;
  svg {
    color: green;
  }
`

const ModalStyled = styled(Modal)`
  .ant-modal-close {
    top: 8px;
    inset-inline-end: 8px;
  }
  border-radius: 20px;
  .ant-modal-title {
    font-size: 20px;
    font-weight: 600px;
  }
  .ant-modal-body {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    gap: 5px;
  }
  .anticon {
    color: #166699 !important;
  }
  .title {
    font-weight: 600px;
    text-align: center;
  }
  img {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  .desc {
    text-align: center;
  }
  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }
  .ant-btn {
    background-color: transparent !important;
    box-shadow: none;
    border-radius: 10px;
    text-align: center;
    border: 1px solid black !important;
    padding: 1.3rem;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    &:hover {
      color: black !important;
    }
  }
  .ant-btn-default {
    border-color: #b72634 !important;
    background: #b72634 !important;
    color: white;
    &:hover {
      color: white;
    }
  }
`

const Security2FA = ({ user }) => {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    instances
      .post("/auth/admin/2fa/turn-on", {
        twoFactorCode: e.auth_code
      })
      .then((res) => {
        setLoading(false)
        if (!res?.data?.error && res?.data?.code === 0) {
          dispatch(getMyProfile())
          reset()
          toast.success(<SuccessNotificationToast message={`${t("Enable two-FA successfully")}!`} />)
        } else {
          toast.error(<ErrorNotificationToast message={`${t(res?.data?.message)}!`} />)
        }
      })
      .catch((err) => {
        toast.error(<ErrorNotificationToast message={`${t("Enable two-FA failed")}!`} />)
        setLoading(false)
      })
  }

  const handleTurnOff = () => {
    instances
      .post("/auth/admin/2fa/turn-off", {
        twoFactorCode: getValues("auth_code")
      })
      .then((res) => {
        setLoading(false)
        if (!res?.data?.error && res?.data?.code === 0) {
          dispatch(getMyProfile())
          toast.success(<SuccessNotificationToast message={`${t("Turn off two-FA successfully")}!`} />)
        } else {
          toast.error(<ErrorNotificationToast message={`${t(res?.data?.message)}!`} />)
        }
      })
      .catch((err) => {
        toast.error(<ErrorNotificationToast message={`${t("Turn off two-FA failed")}!`} />)
        setLoading(false)
      })
  }

  const handleGenerateQR = async () => {
    setLoading(true)
    instances
      .post("/auth/admin/2fa/generate")
      .then((res) => {
        if (!res?.data?.error) {
          setData(res?.data?.data)
        }
        setLoading(false)
        setOpen(true)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <>
      {!user?.isTwoFactorAuthenticationEnabled ? (
        <>
          <div className="qr-code">
            <p>{t("Two factor authentication is not enabled yet.")}</p>
            <p>{t("Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.")}</p>
          </div>

          <Form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="12" sm="12">
                <FormGroup className="form-group">
                  <Label for="auth_code">
                    {" "}
                    {t("Input your authentication code")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="auth_code"
                    control={control}
                    defaultValue={getValues("auth_code") || ""}
                    render={({ field }) => (
                      <Input
                        name="auth_code"
                        id="auth_code"
                        type="text"
                        placeholder={t("Input your 6 digit authenticator code")}
                        {...register("auth_code", {
                          required: true,
                          minLength: 6,
                          maxLength: 6
                        })}
                        className={classnames({
                          "is-invalid": errors?.auth_code
                        })}
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className={"d-flex justify-content-end"}>
              <Button.Ripple className={"d-flex justify-content-end"} onClick={handleGenerateQR} color="primary" style={{ width: "auto", margin: "0.5rem 0.5rem 0 0" }}>
                {t("Use authentication app")}
              </Button.Ripple>
              <Button.Ripple className={"d-flex justify-content-end"} type="submit" color="primary" style={{ width: "auto", marginTop: ".5rem", marginRight: ".5rem" }}>
                {t("Enable two-FA")}
              </Button.Ripple>
            </div>
          </Form>
        </>
      ) : (
        <>
          <H3Styled>
            {t("Two factor authentication is enabled")} <IoShieldCheckmarkSharp />
          </H3Styled>
          <div className={"d-flex justify-content-end"}>
            <Button.Ripple onClick={handleTurnOff} className={"d-flex justify-content-end"} type="submit" color="primary">
              {t("Disable two-FA")}
            </Button.Ripple>
          </div>
        </>
      )}
      <ModalStyled centered cancelText={t("Cancel")} open={open} okText={t("Submit")} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
        <h4 className="title">{t("Use third-party validation")}</h4>
        <p className="desc">{t("Please use the Google Authenticator app to scan this QR code")}</p>
        <img src={data?.qrCode || ""} alt="" />
        <h4>{data?.code}</h4>
      </ModalStyled>
    </>
  )
}

export default Security2FA
