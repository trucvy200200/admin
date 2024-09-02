import {Card, Modal, Button, Label, Input} from "reactstrap"
import { AlertCircle } from "react-feather"
import { useTranslation } from "react-i18next"
import React, {useState} from "react"
import classnames from "classnames"
import Cleave from "cleave.js/react"

import "./styles.scss"

export const ModalConfirmAllowJoinProduct = ({ message, button, submit, cancel }) => {

  const { t } = useTranslation()
  const [limitError, setLimitError] = useState(false)
  const [accountLimit, setAccountLimit] = useState(0)
  const [isSupport, setIsSupport] = useState(false)

  const handleSubmit = () => {
    if (Number(accountLimit) > 0) {
      setLimitError(false)
      submit(isSupport, +accountLimit)
    } else {
      setLimitError(true)
    }
  }

  return (
    <Modal isOpen={true} centered toggle={() => cancel()} className={"modal-sm allow-product-modal"}>
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
            {t("Support account")} <span className="text-danger">*</span>
          </Label>
          <div className="d-flex align-items-center">
            <div className='form-check me-1'>
              <Input
                type='radio'
                id='yes-support'
                name='is-support'
                onChange={() => setIsSupport(true)}
                checked={isSupport}
              />
              <Label className='form-check-label' for='yes-support'>{t("Yes")}</Label>
            </div>
            <div className='form-check ms-1'>
              <Input
                type='radio'
                id='no-support'
                name='is-support'
                onChange={() => setIsSupport(false)}
                checked={!isSupport}
              />
              <Label className='form-check-label' for='no-support'>{t("No")}</Label>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <Label className="form-label" for="pin_code">
            {t("Mt4 account registration limit")} <span className="text-danger">*</span>
          </Label>
          <Cleave
            onChange={(e) => setAccountLimit(e.target.rawValue)}
            value={accountLimit}
            name='accountLimit'
            className={classnames('form-control', { 'is-invalid': limitError })}
            options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }}
          />
        </div>
        <div className={"btns"}>
          <Button.Ripple color={"primary"} disabled={!Number(accountLimit)} onClick={handleSubmit}>
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
