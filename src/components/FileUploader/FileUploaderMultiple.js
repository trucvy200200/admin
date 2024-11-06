// ** Reactstrap Imports
import { Card, CardBody, Button, ListGroup, ListGroupItem } from "reactstrap"

// ** Third Party Imports
import { useDropzone } from "react-dropzone"
import { X, DownloadCloud } from "react-feather"
import { useTranslation } from "react-i18next"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"

const FileUploaderMultiple = ({ setImagesUpload, setErrorImage, imagesUpload, errorImage, limit }) => {
  // ** State
  const { t } = useTranslation()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) return toast.error(<ErrorNotificationToast message={t(`Invalid file!`)} />)
      setErrorImage(false)
      if (!limit) {
        setImagesUpload([...imagesUpload, ...acceptedFiles.map((file) => Object.assign(file))])
      } else {
        setImagesUpload([...acceptedFiles.map((file) => Object.assign(file))])
      }
    },
    accept: {
      "image/jpeg": [".jpeg", ".png"],
      "image/jpg": [".jpg", ".png"]
    },
    maxFiles: limit || undefined,
    multiple: !limit
  })

  const renderFilePreview = (file) => {
    return <img className="rounded" style={{ width: "100px", height: "100px" }} alt={file?.name} src={file?.name ? URL.createObjectURL(file) : file} height="28" width="28" />
  }

  const handleRemoveFile = (file) => {
    const uploadedFiles = imagesUpload
    const filtered = uploadedFiles?.filter((i) => (i?.name || i) !== (file?.name || file))
    setImagesUpload([...filtered])
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = imagesUpload?.map((file, index) => (
    <ListGroupItem key={`${file?.name || file}-${index}`} className="d-flex align-items-center justify-content-between">
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0 text-truncate-1">{file?.name || file}</p>
          <p className="file-size mb-0 text-align-left">{file?.size ? renderFileSize(file.size) : ""}</p>
        </div>
      </div>
      <Button color="danger" outline size="sm" className="btn-icon" onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <Card>
      <CardBody style={{ border: `${errorImage ? "2px #000080" : "2px #13131340"} dashed`, borderRadius: "10px" }}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="d-flex align-items-center justify-content-center flex-column">
            <DownloadCloud size={64} />
            <h5>{t("Drop Files here or click to upload")}</h5>
            <p className="text-secondary">
              {t("Drop files here or click")}{" "}
              <a href="/" onClick={(e) => e.preventDefault()}>
                {t("browse")}
              </a>{" "}
              {t("thorough your machine")}
            </p>
          </div>
        </div>
        {imagesUpload?.length ? <ListGroup className="my-2">{fileList}</ListGroup> : null}
      </CardBody>
    </Card>
  )
}

export default FileUploaderMultiple
