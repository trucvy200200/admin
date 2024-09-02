import { Card, Modal, Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { Info } from "react-feather"
import "./styles.scss"

export const ConfirmDisable2FA = ({ message, button, submit, cancel }) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={true} centered toggle={() => {}} className={"modal-md delete-modal"}>
      <Card className={"mb-0 p-2 text-center pt-3 pb-3"}>
        <div className={"d-flex justify-content-center message"}>
          <div className="fade-loading info">
            <div className="fade-loading info">
              <div className="fade-loading-2 info">
                <Info size={50} style={{ strokeWidth: 2 }} color="white" />
              </div>
            </div>
          </div>
          <h3>{t("Are you sure")}?</h3>
          <p>{message}</p>
        </div>
        <div className={"btns"}>
          <Button color={"primary"} onClick={() => submit()}>
            {button}
          </Button>
          <Button color={"secondary"} outline onClick={() => cancel()}>
            {t("Cancel")}
          </Button>
        </div>
      </Card>
    </Modal>
  )
}
