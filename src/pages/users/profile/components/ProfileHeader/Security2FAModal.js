import classnames from "classnames"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { Form, Button, FormGroup, Input, InputGroupText, InputGroup, Label } from "reactstrap"
import { toast } from "react-hot-toast"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import { getMyProfile } from "../../store/action"
import { useTranslation } from "react-i18next"
import { Modal, Spin } from "antd"
import styled from "styled-components"
import instances from "@src/@core/plugin/axios"
import { useDispatch } from "react-redux"
import { IoRefreshOutline } from "react-icons/io5"
import { FaRegCopy } from "react-icons/fa6"

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
  }
  .anticon {
    color: #166699 !important;
  }
  .title {
    font-weight: 600px;
    text-align: center;
  }
  .img-wrapper {
    position: relative;
    margin: 0 auto;
    padding: 20px 30px;
    .img-loader {
      width: 300px;
      height: 300px;
      box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
      width: 300px;
      height: 300px;
    }
    .refresh-icon {
      position: absolute;
      top: 20px;
      right: 0;
      transform: translate(0%, 0%);
      cursor: pointer;
    }
  }
  .desc {
    text-align: center;
    margin: 0;
    font-size: 14px !important;
  }
  .ant-modal-footer {
    display: none;
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

  @media (max-width: 648px) {
    .img-wrapper {
      img {
        width: 200px;
        height: 200px;
      }
      .img-loader {
        width: 200px;
        height: 200px;
      }
    }
  }
`

const Security2FAModal = ({ setLoading }) => {
  const [data, setData] = useState("")
  const [open, setOpen] = useState(false)
  const [loadingQR, setLoadingQR] = useState(false)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    setLoading(true)
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

  const handleGenerateNewQR = async () => {
    setLoadingQR(true)
    instances
      .post("/auth/admin/2fa/generate")
      .then((res) => {
        if (!res?.data?.error) {
          setData(res?.data?.data)
        }
        setLoadingQR(false)
      })
      .catch((err) => {
        setLoadingQR(false)
      })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.code)
    toast.success(<SuccessNotificationToast message={`${t("Copy success!")}`} />)
  }

  return (
    <>
      <div className={"d-flex justify-content-center flex-wrap gap-50 mt-1"}>
        <Button.Ripple
          className={"d-flex justify-content-center w-fit w-max-sm-full font-max-sm-small"}
          onClick={handleGenerateQR}
          color="primary"
          style={{ width: "auto", margin: "0rem" }}
        >
          {t("Use authentication app")}
        </Button.Ripple>
      </div>
      <ModalStyled
        centered
        cancelText={t("Cancel")}
        open={open}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <h4 className="title">{t("Use third-party validation")}</h4>
        <p className="desc">{t("Please use the Google Authenticator app to scan this QR code")}</p>
        <div className="position-relative mx-auto">
          <div className="img-wrapper">
            {loadingQR ? (
              <div className="img-loader">
                <Spin size="large" />
              </div>
            ) : (
              <img src={data?.qrCode || ""} alt="" />
            )}
            <IoRefreshOutline className="refresh-icon" color="#b72634" onClick={handleGenerateNewQR} size={22} />
          </div>
        </div>
        <div className="position-relative mx- d-flex align-items-center gap-50 w-100" style={{ maxWidth: "450px", margin: "0 auto" }}>
          <InputGroup>
            <Input type="text" value={loadingQR ? `${t("Loading")}...` : data?.code} disabled={true} style={{ backgroundColor: "transparent", color: "grey" }} />
            <InputGroupText className="cursor-pointer" id="copy" onClick={handleCopy}>
              <FaRegCopy color="grey" size={20} />
            </InputGroupText>
          </InputGroup>
        </div>
        <Form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)} className="w-100">
          <FormGroup className="form-group mt-1" style={{ maxWidth: "450px", margin: "0 auto" }}>
            <Label className="form-label" for="auth_code">
              {t("Enter the 6-digit authentication code from your authenticator app")} <span className="text-danger">*</span>
            </Label>
            <Controller
              name="auth_code"
              id="auth_code"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  defaultValue={""}
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
          <div className={"d-flex justify-content-center flex-wrap gap-50"}>
            <Button.Ripple className={"d-flex justify-content-center w-fit w-max-sm-full font-max-sm-small"} type="submit" color="primary" style={{ width: "auto", margin: "0rem" }}>
              {t("Enable two-FA")}
            </Button.Ripple>
          </div>
        </Form>
      </ModalStyled>
    </>
  )
}

export default Security2FAModal
