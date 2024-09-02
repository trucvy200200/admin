import { Card, Modal, Button, Input } from "reactstrap"
import { AlertCircle } from "react-feather"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import {useState} from "react"

import "./styles.scss"

export const ConfirmCancel = ({ open, message, button, submit, cancel }) => {
  const { t } = useTranslation()
  const [note, setNote] = useState(null)
  const {
    register,
    control,
    formState: { errors },
    setError,
    clearErrors
  } = useForm()

  const handleSubmit = () => {
    if (!note || !String(note)?.trim()) {
      setError("note", true)
      return
    }
    clearErrors()
    submit(note)
  }

  return (
    <Modal isOpen={open} centered toggle={() => cancel()} className={"modal-md delete-modal"}>
      <Card className={"mb-0 p-2 text-center pt-2 pb-2"}>
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
          <Controller
            name="note"
            control={control}
            defaultValue={""}
            render={({ field }) => {
              return (
                <Input
                  type="textarea"
                  id="note"
                  placeholder={t("Enter the reason for the rejection")}
                  {...register("note", { required: true })}
                  className={classnames({ "is-invalid": errors["note"] })}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setNote(e.target.value)
                  }}
                />
              )
            }}
          />
        </div>
        <div className={"btns"}>
          <Button.Ripple color={"primary"} disabled={!note || !String(note)?.trim()} onClick={handleSubmit}>
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
