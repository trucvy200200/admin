import { Card, Modal, Button, Label } from "reactstrap"
import OtpInput from "react-otp-input"
import { AlertCircle } from "react-feather"
import "./styles.scss"
import { useTranslation } from "react-i18next"
import React, {useState, useRef, useEffect} from "react"
export const ConfirmWithPinCode = ({ message, button, submit, cancel }) => {

  const { t } = useTranslation()
  const [pinCode, setPinCode] = useState("")
  const [errorPincode, setErrorPincode] = useState(false)
  const otpInputRef = useRef()

  useEffect(() => {
    /* eslint-disable-next-line */
    otpInputRef?.current?.firstChild?.children.length > 0 && Array.from(otpInputRef?.current?.firstChild?.children)?.map((item) => item?.setAttribute("inputmode", "numeric"))
  })

  const handleChange = (otp) => {
    if (errorPincode) {
      setErrorPincode(false)
    }
    setPinCode(otp)
  }

  const handleSubmit = () => {
    if (!pinCode || String(pinCode)?.trim()?.length !== 6) {
      setErrorPincode(true)
    } else {
      submit(pinCode)
    }
  }

  return (
    <Modal isOpen={true} centered toggle={() => cancel()} className={"modal-sm delete-modal"}>
      <Card className={"mb-0 p-3 text-center pt-2 pb-2"}>
        <div className={"d-flex justify-content-center message"}>
          <div className="fade-loading error">
            <div className="fade-loading error">
              <div className="fade-loading-2 error">
                <AlertCircle size={50} style={{ strokeWidth: 2 }} color="white" />
              </div>
            </div>
          </div>
          <h3>{t("Are you sure")}?</h3>
          <p>{message}</p>
        </div>
        <div className="mb-2">
          <Label className="form-label" for="pin_code">
            {t("Pincode")} <span className="text-danger">*</span>
          </Label>
          <div ref={otpInputRef}>
            <OtpInput
              inputType="password"
              containerStyle="pin_code-wrapper"
              inputStyle="pin_code-input"
              focusStyle="pin_code-focus"
              value={pinCode || ""}
              onChange={handleChange}
              numInputs={6}
              renderSeparator={""}
              renderInput={(props) => (
                <input
                  {...props}
                  autoComplete="new-password"
                  onKeyPress={(e) => {
                    if (isNaN(+e.key)) e.preventDefault()
                  }}
                />
              )}
            />
          </div>
          {errorPincode && (
            <Label className="form-label" for="note" style={{ color: "#ea5455" }}>
              {t("Your pin code incorrect")}
            </Label>
          )}
        </div>
        <div className={"btns"}>
          <Button.Ripple color={"primary"} disabled={!pinCode || String(pinCode)?.trim()?.length !== 6} onClick={() => handleSubmit(pinCode)}>
            {button}
          </Button.Ripple>
          <Button.Ripple color={"secondary"} outline onClick={() => cancel()}>
            {t("Cancel")}
          </Button.Ripple>
        </div>
      </Card>
    </Modal>
  )
}
