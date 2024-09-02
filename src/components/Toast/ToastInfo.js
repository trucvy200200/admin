import Avatar from "@src/@core/components/avatar"
import { Info } from "react-feather"
import { toast } from "react-hot-toast"

const InfoNotificationToast = (props) => {
  return toast.custom((t) => (
    <div className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="warning" icon={<Info size={12} />} />
          <h6 className="toast-title">{props?.message}</h6>
        </div>
      </div>
    </div>
  ))
}
export default InfoNotificationToast
