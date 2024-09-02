
const ErrorNotificationToast = (props) => {
  return (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">{props?.message}</h6>
        </div>
      </div>
    </>
  )
}
export default ErrorNotificationToast
