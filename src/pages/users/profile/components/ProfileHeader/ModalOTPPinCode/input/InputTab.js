// ** React Imports
import React, { useState } from "react"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { useDispatch } from "react-redux"
import instances from "@src/@core/plugin/axios"

// ** Custom Components
import "flatpickr/dist/themes/material_blue.css"
import "./input.scss"

// ** Third Party Components
import { Row, Col, Button, Label } from "reactstrap"
import OtpInput from "react-otp-input"
import {getMyProfile} from "@pages/users/profile/store/action"

const InputTab = (props) => {
  const dispatch = useDispatch()
  const { t, handleNoButton, data, handleReset, newPincode, oldPincode } = props
  const [resend, setResend] = useState(null)
  const [loading, setLoading] = useState(false)
  const [otp, setOTP] = useState("")

  const handleChange = (otp) => {
    setOTP(otp)
  }

  const handleVerify = () => {
    if (loading) return
    if (!String(otp) || String(otp)?.length !== 6) {
      toast.error(<ErrorNotificationToast message={t("Verify code is incorrect!")} />)
      return
    }
    setLoading(true)
    instances
      .put("/admin/verify-update-pin-code", { code: otp })
      .then((res) => {
        const response = res?.data
        setLoading(false)
        if (!response.error) {
          handleNoButton()
          handleReset()
          dispatch(getMyProfile())
          toast.success(<SuccessNotificationToast message={t("Change pincode successfully!")} />)
        } else if (response.error) {
          if (response?.code === 1) {
            toast.error(<ErrorNotificationToast message={t("Verify code is expired!")} />)
          } else {
            toast.error(<ErrorNotificationToast message={t("Verify code is incorrect!")} />)
          }
        } else {
          toast.error(<ErrorNotificationToast message={t("Something went wrong, please try later!")} />)
        }
      })
      .catch((err) => {
        toast.error(<ErrorNotificationToast message={t(err?.response?.data?.message || "Something went wrong, please try later!")} />)
        setLoading(false)
      })
  }

  const handleResend = (e) => {
    setLoading(true)
    instances
      .put(`/admin/update-pin-code`, { pinCode: newPincode, oldPinCode: oldPincode })
      .then((res) => {
        const response = res?.data
        setLoading(false)
        if (!response.error) {
          setResend(true)
          setTimeout(() => {
            setResend(false)
          }, 8000)
          toast.success(<SuccessNotificationToast message={t("Resend mail successfully!")} />)
        } else if (response.error && response?.message) {
          setResend(false)
          toast.error(<ErrorNotificationToast message={t("Please try again in 5 minutes")} />)
        }
      })
      .catch((err) => {
        setResend(false)
        toast.error(<ErrorNotificationToast message={t(err?.response?.data?.message || "Resend mail failed!")} />)
        setLoading(false)
      })
  }

  return (
    <>
      <Row>
        <Col sm="12">
          <Row>
            <Col md="12" sm="12" className="edit_col">
              <p style={{ textAlign: "center" }}>
                {t("We've sent a code to")} <b>{data.email}</b>
              </p>
            </Col>
            <Col md="12" sm="12" className="edit_col">
              <OtpInput containerStyle="otp-wrapper" inputStyle="otp-input" focusStyle="otp-focus" value={otp} onChange={handleChange} numInputs={6} renderSeparator={""} renderInput={(props) => <input {...props} />}/>
            </Col>
            <Col md="12" sm="12" className="edit_col">
              <p style={{ textAlign: "center" }}>
                {t("Don't get a code")}?{" "}
                <a style={{ color: "black", fontWeight: "bold" }} className="link-text" onClick={handleResend}>
                  {t("Click to resend")}
                </a>
              </p>
            </Col>
            <Col className="d-flex justify-content-end flex-sm-row flex-column mt-2 btns-wrapper" sm="12">
              <Button.Ripple disabled={!String(otp) || String(otp)?.length !== 6} onClick={handleVerify} className="mb-1 mb-sm-0 mr-1" type="submit" color="primary">
                {t("Verify")}
              </Button.Ripple>
              <Button.Ripple color="secondary" outline onClick={() => handleNoButton()}>
                {t("Cancel")}
              </Button.Ripple>
            </Col>
            {resend && (
              <Label className="form-label w-100" style={{ textAlign: "center", marginTop: "10px" }}>
                {t("Please check your email!")}
              </Label>
            )}
          </Row>
        </Col>
      </Row>
      {loading && (
        <div className="transaction-loading">
          <div className="fallback-spinner vh-100">
            <div className="loading">
              <div className="effect-1 effects"></div>
              <div className="effect-2 effects"></div>
              <div className="effect-3 effects"></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default InputTab
