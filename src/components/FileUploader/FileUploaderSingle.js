// ** React Imports
import { useState } from "react"

// ** Reactstrap Imports
import { Card, CardBody, Button, ListGroup, ListGroupItem } from "reactstrap"
import styled from "styled-components"

// ** Third Party Imports
import { useDropzone } from "react-dropzone"
import { FileText, X, DownloadCloud } from "react-feather"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import { useTranslation } from "react-i18next"
import { PDF_SIZE_MAX } from "@constants/base-constant"

const CardBodyStyled = styled(CardBody)`
  border: 1px grey dashed;
  border-radius: 10px;
`

const FileUploaderSingle = (props) => {
  // ** State
  const [files, setFiles] = useState([])
  const { t } = useTranslation()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]?.type?.size > PDF_SIZE_MAX) return toast.error(<ErrorNotificationToast message={t(`Size exceeds the prescribed limit!`)} />)
      if (acceptedFiles.length > 0 && acceptedFiles[0]?.type !== "application/pdf") return toast.error(<ErrorNotificationToast message={t(`Invalid file!`)} />)
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))])
      props.setState({ file: acceptedFiles[0], url: URL.createObjectURL(acceptedFiles[0]) })
    }
  })

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return <img className="rounded" alt={file.name} src={URL.createObjectURL(file)} height="28" width="28" />
    } else {
      return <FileText size="28" />
    }
  }

  const handleRemoveFile = (file) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i) => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className="d-flex align-items-center justify-content-between">
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color="danger" outline size="sm" className="btn-icon" onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <Card className="mb-0">
      <CardBodyStyled>
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
        {files.length ? <ListGroup className="my-2">{fileList}</ListGroup> : null}
      </CardBodyStyled>
    </Card>
  )
}

export default FileUploaderSingle
