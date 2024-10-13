// ** React Imports
import React, { useEffect, useState } from "react"

import { isObjEmpty } from "@utils"
import { Row, Col, Button, Form, Input, Label, FormGroup, Card, FormText } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import { Editor } from "react-draft-wysiwyg"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import FileUploaderMultiple from "@src/components/FileUploader/FileUploaderMultiple"
import { useTranslation } from "react-i18next"
import { createTour, getTourById } from "../store/action"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import draftToHtml from "draftjs-to-html"

import "flatpickr/dist/themes/material_blue.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "@styles/react/apps/app-users.scss"
import "./styles.scss"

const CreateTour = () => {
  const { t } = useTranslation()
  const [imagesUpload, setImagesUpload] = useState([])
  const [descError, setDescError] = useState("")
  const [editorState, setEditorState] = useState(null)
  const [desc, setDesc] = useState("")
  const [editorRegulationState, setEditorRegulationState] = useState(null)
  const [regulation, setRegulation] = useState("")
  const [planError, setPlanError] = useState("")
  const [editorPlanState, setEditorPlanState] = useState(null)
  const [plan, setPlan] = useState("")
  const [regulationError, setRegulationError] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorImage, setErrorImage] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const store = useSelector((state) => state.tours.detail)
  const dispatch = useDispatch()

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue
  } = useForm()

  useEffect(() => {
    if (id) {
      getTourById(
        id,
        setLoading,
        (data) => {
          setValue("name", data?.name)
          setValue("location", data?.location)
          setValue("address", data?.address)
          setValue("phone", data?.phone)
          setValue("priceAdult", data?.priceAdult)
          setValue("priceChild", data?.priceChild)
          setValue("duration", data?.duration)
          setDesc(data?.description)
          const state = data?.description || null
          setEditorState(data?.description ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state).contentBlocks, htmlToDraft(state).entityMap)) : "")
          //  setPlan(data?.plan)
          const state2 = data?.regulation || null
          setEditorRegulationState(
            data?.regulation ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state2).contentBlocks, htmlToDraft(state2).entityMap)) : ""
          )
          setRegulation(data?.regulation)
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Something wrong!")} />)
      )
    }
  }, [id])

  const onEditorStateChange = (e) => {
    if (!e.getCurrentContent().getPlainText()) {
      setDesc("")
    } else {
      const html = draftToHtml(convertToRaw(e.getCurrentContent())).toString()
      setDesc(html ? html : "")
      setDescError(false)
    }
    setEditorState(e)
  }

  const onEditorRegulationStateChange = (e) => {
    if (!e.getCurrentContent().getPlainText()) {
      setRegulation("")
    } else {
      const html = draftToHtml(convertToRaw(e.getCurrentContent())).toString()
      setRegulation(html ? html : "")
      setRegulationError(false)
    }
    setEditorRegulationState(e)
  }

  const onEditorPlanStateChange = (e) => {
    if (!e.getCurrentContent().getPlainText()) {
      setRegulation("")
    } else {
      const html = draftToHtml(convertToRaw(e.getCurrentContent())).toString()
      setPlan(html ? html : "")
      setPlanError(false)
    }
    setEditorPlanState(e)
  }

  const onSubmit = async (e) => {
    if (loading) return
    if (isObjEmpty(errors)) {
      const obj = {
        name: e.name,
        description: desc,
        location: e.location,
        regulation: regulation,
        address: e.address,
        phoneContact: e.phone,
        priceAdult: e.priceAdult,
        priceChild: e.priceChild,
        durations: e.duration
      }
      setLoading(true)
      await createTour(
        obj,
        () => {
          toast.success(<SuccessNotificationToast message={t("Create tour successfully!")} />)
          navigate("/tours/list")
          reset()
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Create tour failed!")} />),
        () => setLoading(false)
      )
    }
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Card className="p-1 p-sm-3">
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
          <Row>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="name">
                  {t("Tour name")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="name"
                  id="name"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="name"
                        placeholder={t("Enter tour name")}
                        {...register("name", {
                          required: true,
                          validate: (value) => value !== ""
                        })}
                        className={classnames({
                          "is-invalid": errors["name"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="location">
                  {t("Location")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="location"
                  id="location"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="location"
                        placeholder={t("Enter location")}
                        {...register("location", {
                          required: true,
                          validate: (value) => value !== ""
                        })}
                        className={classnames({
                          "is-invalid": errors["location"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="address">
                  {t("Address")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="address"
                  id="address"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="address"
                        placeholder={t("Enter address")}
                        {...register("address", {
                          required: true,
                          validate: (value) => value !== ""
                        })}
                        className={classnames({
                          "is-invalid": errors["address"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="phone">
                  {t("Phone")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="phone"
                  id="phone"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="phone"
                        placeholder={t("Enter phone")}
                        {...register("phone", {
                          required: true,
                          validate: (value) => value !== ""
                        })}
                        className={classnames({
                          "is-invalid": errors["phone"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="priceChild">
                  {t("Child price")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="priceChild"
                  id="priceChild"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        type="number"
                        name="priceChild"
                        placeholder={t("Enter price")}
                        {...register("priceChild", {
                          required: true,
                          validate: (value) => value !== "",
                          min: 10000
                        })}
                        className={classnames({
                          "is-invalid": errors["priceChild"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
                <p>Minimum 10,000 VND</p>
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="priceAdult">
                  {t("Adult price")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="priceAdult"
                  id="priceAdult"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        type="number"
                        name="priceAdult"
                        placeholder={t("Enter price")}
                        {...register("priceAdult", {
                          required: true,
                          validate: (value) => value !== "",
                          min: 10000
                        })}
                        className={classnames({
                          "is-invalid": errors["priceAdult"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
                <p>Minimum 10,000 VND</p>
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="duration">
                  {t("Duration (day)")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="duration"
                  id="duration"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="duration"
                        type="number"
                        placeholder={t("Enter duration")}
                        {...register("duration", {
                          required: true,
                          validate: (value) => value !== "",
                          min: 1
                        })}
                        className={classnames({
                          "is-invalid": errors["duration"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
                <p>Minimum 1 day</p>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className="form-group">
                <Label className="form-label" for="desc">
                  {t("Description")} <span className="text-danger">*</span>
                </Label>
                <Editor
                  id="desc"
                  editorState={editorState}
                  toolbarClassName="descToolbar"
                  wrapperClassName={`descWrapper ${descError ? "error" : ""}`}
                  editorClassName="descEditor"
                  onEditorStateChange={onEditorStateChange}
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className="form-group">
                <Label className="form-label" for="plan">
                  {t("Plan")} <span className="text-danger">*</span>
                </Label>
                <Editor
                  id="plan"
                  editorState={editorPlanState}
                  toolbarClassName="descToolbar"
                  wrapperClassName={`descWrapper ${planError ? "error" : ""}`}
                  editorClassName="descEditor"
                  onEditorStateChange={onEditorPlanStateChange}
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className="form-group">
                <Label className="form-label" for="reg">
                  {t("Regulation")} <span className="text-danger">*</span>
                </Label>
                <Editor
                  id="reg"
                  editorState={editorRegulationState}
                  toolbarClassName="descToolbar"
                  wrapperClassName={`descWrapper ${regulationError ? "error" : ""}`}
                  editorClassName="descEditor"
                  onEditorStateChange={onEditorRegulationStateChange}
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup className="form-group">
                <Label className="form-label" for="choose_images">
                  {t("Choose images")}
                </Label>
                <FileUploaderMultiple setImagesUpload={setImagesUpload} setErrorImage={setErrorImage} imagesUpload={imagesUpload} errorImage={errorImage} />
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-center justify-content-end p-0" sm="12">
              <Button.Ripple
                disabled={loading}
                onClick={() => {
                  if (!desc) setDescError(true)
                  if (!plan) setPlanError(true)
                  if (!regulation) setRegulationError(true)
                }}
                className="mb-0 mr-0"
                type="submit"
                color="primary"
              >
                {t("Save")}
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default CreateTour
