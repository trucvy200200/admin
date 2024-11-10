// ** React Imports
import React, { useState, useEffect } from "react"

import { isObjEmpty } from "@utils"
// ** Third Party Components
import { Button, Form, Input, Label, FormGroup } from "reactstrap"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { useForm, Controller } from "react-hook-form"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { DragDrop } from "@uppy/react"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import classnames from "classnames"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertToRaw } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import draftToHtml from "draftjs-to-html"
import Cleave from "cleave.js/react"
// import { updateTour } from "../../store/action"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Edit = ({ data, t, handleNoButton, handleGetUpdateData }) => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [editorState, setEditorState] = useState(null)
  const [desc, setDesc] = useState(null)
  const descEditorRef = React.useRef(null)
  const [image, setImage] = useState({})
  const [numberErrors, setNumberErrors] = useState(null)
  const {
    setError,
    setValue,
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm()

  useEffect(() => {
    if (data?.description) {
      setDesc(data?.description ? data?.description : "")
      const state = data?.description || null
      setEditorState(data?.description ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state).contentBlocks, htmlToDraft(state).entityMap)) : "")
      descEditorRef.current = document.querySelector("#Desc .descEditor")
    }
    if (data?.id) {
      setValue("price", data.price)
      setValue("minimumUserIncome", data.minimumUserIncome)
      setImage({ image_url: data.imageUrl })
    }
  }, [])

  const renderPreview = () => {
    return (
      <div className="icon_details_header">
        <div className={"add-image__item-container icon-avatar"}>
          <div className="image-wrapper">
            {image?.image_url && (
              <img
                className={`add-image__item-image ${image?.image_url && image?.image_url.includes("http") ? "" : "default"}`}
                src={image?.image_url && image?.image_url.includes("http") ? image?.image_url : ""}
                alt="icon picture"
              />
            )}
          </div>
          <div className="actions-wrapper">
            <div className="buttons">
              <div className={"icon-upload-image"}>
                {t("Upload")}
                <div className="uppy-wrapper">
                  <DragDrop uppy={uppy} />
                </div>
              </div>
            </div>
            <div className="noti">{t("Allowed JPG, GIF or PNG. Max size of 800K")}</div>
          </div>
        </div>
      </div>
    )
  }
  const uppy = new Uppy({
    meta: { type: "avatar" },
    autoProceed: true,
    restrictions: { allowedFileTypes: ["image/*"] }
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    setImage({ image_url: preview, image_file: file.data })
  })

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      if (!values.price) {
        setError("price", t("Price is required!"))
        return
      }
      const inputData = {}
      inputData.name = values.prodName || null
      inputData.price = values.price
      inputData.description = desc || null
      inputData.minimumUserIncome = values.minimumUserIncome || 0
      inputData.imageUrl = image?.image_url

      // await updateCryptoProduct(
      //   data.id,
      //   inputData,
      //   setLoading,
      //   () => {
      //     toast.success(<SuccessNotificationToast message={t("Update successfully!")} />)
      //     reset()
      //     handleGetUpdateData()
      //     handleNoButton()
      //   },
      //   () => toast.error(<ErrorNotificationToast message={t("Update failed")} />)
      // )
    }
  }

  const onEditorStateChange = (e) => {
    if (!e.getCurrentContent().getPlainText()) {
      setDesc(" ")
    } else {
      const html = draftToHtml(convertToRaw(e.getCurrentContent())).toString()
      setDesc(html ? html : " ")
    }
    setEditorState(e)
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-2" autoComplete={"off"}>
        <FormGroup className="form-group">{renderPreview()}</FormGroup>
        <FormGroup className="form-group">
          <Label className="form-label" for="prod_name">
            {t("Product name")} <span className="text-danger">*</span>
          </Label>
          <Controller
            id="prodName"
            name="prodName"
            control={control}
            defaultValue={data?.name || ""}
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Product name")}
                  name="prodName"
                  className={classnames({
                    "is-invalid": errors["prodName"]
                  })}
                  {...register("prodName", {
                    required: true,
                    validate: (value) => value !== ""
                  })}
                  {...field}
                />
              )
            }}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label className="form-label" for="minimumUserIncome">
            {t("Participation condition")} <span className="text-danger">*</span>
          </Label>
          <Cleave
            className={classnames(
              {
                "is-invalid": errors["minimumUserIncome"]
              },
              "form-control"
            )}
            placeholder={t("Participation condition")}
            options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
            onChange={(e) => {
              setValue("minimumUserIncome", e.target.rawValue)
              if (numberErrors?.minimumUserIncome) {
                setNumberErrors({ ...numberErrors, minimumUserIncome: null })
                setError("minimumUserIncome", null)
              }
            }}
            value={getValues("minimumUserIncome")}
            id="minimumUserIncome"
          />
          <small>{t("Minimum")} 0</small>
        </FormGroup>
        <FormGroup className="form-group">
          <Label className="form-label" for="price">
            {t("Service price by month")} <span className="text-danger">*</span>
          </Label>
          <Cleave
            placeholder={t("Service price by month")}
            className={classnames(
              {
                "is-invalid": errors["price"]
              },
              "form-control"
            )}
            options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
            onChange={(e) => {
              setValue("price", e.target.rawValue)
              if (numberErrors?.price) {
                setNumberErrors({ ...numberErrors, price: null })
                setError("price", null)
              }
            }}
            value={getValues("price")}
            disabled={+data?.totalRegister > 0}
            id="price"
          />
          <small>{t("Minimum 1")}</small>
        </FormGroup>
        <FormGroup className="bottom-form form-group">
          <Label className=" form-label" for="image_url">
            {t("Product description")}
          </Label>
          <div id="Desc">
            <Editor editorState={editorState} toolbarClassName="descToolbar" wrapperClassName="descWrapper" editorClassName="descEditor" onEditorStateChange={onEditorStateChange} />
          </div>
        </FormGroup>
        <div className="d-flex align-items-center justify-content-end">
          <Button.Ripple className="mr-1" type="submit" color="primary">
            {t("Update")}
          </Button.Ripple>
          <Button.Ripple color="cancel" onClick={handleNoButton}>
            {t("Cancel")}
          </Button.Ripple>
        </div>
      </Form>
    </>
  )
}
export default Edit
