// ** React Imports
import { Fragment, useState } from "react"

// ** Third Party Components
import toast from "react-hot-toast"
import classnames from "classnames"
import { Copy } from "react-feather"
import { InputGroup, Input, InputGroupText, Label, Tooltip } from "reactstrap"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
const CopyToClipboard = (props) => {
  // ** Props
  const { t } = useTranslation()
  const userData = useSelector((state) => state.profiles?.user)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { f, value, label, hideIcon, showIcon, visible, className, htmlFor, placeholder, iconSize, inputClassName, ...rest } = props
  const ToastContent = ({ message }) => (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title font-weight-bold">{t("Notification")}</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>{t(message)}</span>
      </div>
    </>
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/invite?code=${userData?.user_code}`)

    toast.success(<ToastContent message={t("Copy success!")} />, {
      hideProgressBar: true,
      autoClose: 2000,
      position: "top-right"
    })
  }

  const toggle = () => setTooltipOpen(!tooltipOpen)

  return (
    <Fragment>
      {label ? <Label for={htmlFor}>{label}</Label> : null}
      <InputGroup
        className={classnames({
          [className]: className
        })}
      >
        <Input
          type="text"
          value={`${userData?.user_code ? `${window.location.origin}/invite?code=${userData?.user_code}` : "--"}`}
          disabled={true}
          style={{ backgroundColor: "transparent", color: "grey" }}
          className={classnames({
            [inputClassName]: inputClassName
          })}
        />
        <InputGroupText className="cursor-pointer" id="copy" onClick={handleCopy}>
          <Copy size={16} />
        </InputGroupText>
        <Tooltip placement="top" isOpen={tooltipOpen} target="copy" toggle={toggle}>
          {t("Copy invitation link")}
        </Tooltip>
      </InputGroup>
    </Fragment>
  )
}

export default CopyToClipboard
