import { Card, Modal, Button } from "reactstrap"
import { AlertCircle } from "react-feather"
import "./styles.scss"
import { useTranslation } from "react-i18next"

export const ConfirmDelete = ({ message, button, submit, cancel }) => {
  const { t } = useTranslation()

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
        <div className={"btns"}>
          <Button.Ripple color={"primary"} onClick={() => submit()}>
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
