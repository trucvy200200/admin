// ** React Imports
import React, { useEffect, useState } from "react"

import { isObjEmpty } from "@utils"
import { Row, Col, Button, Form, Input, Label, FormGroup, Card } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import { Editor } from "react-draft-wysiwyg"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import FileUploaderMultiple from "@src/components/FileUploader/FileUploaderMultiple"
import { useTranslation } from "react-i18next"
import { updateTourById, getTourById } from "../store/action"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import draftToHtml from "draftjs-to-html"
import Select, { components } from "react-select"
import { selectThemeColors } from "@utils"
import { uploadImages } from "@src/redux/actions/common"
import moment from "moment"
import Flatpickr from "react-flatpickr"
import Cleave from "cleave.js/react"
import { stringToDate } from "@src/utility/ConvertDate"
import { getHotels } from "@src/pages/hotels/store/action"
import { getVehicles } from "@src/pages/transportations/store/action"

import "flatpickr/dist/themes/material_blue.css"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "@styles/react/apps/app-users.scss"
import "./styles.scss"
import "@styles/react/libs/react-select/_react-select.scss"

const { ValueContainer, Placeholder } = components

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
    </ValueContainer>
  )
}

const filterOptions = [
  {
    value: "Nothern Vietnam",
    label: "Northern Vietnam"
  },
  { value: "Southern Vietnam", label: "Southern Vietnam" },
  { value: "Central Vietnam", label: "Central Vietnam" }
]

const renderLocation = (location) => {
  switch (location) {
    case "Nothern Vietnam":
      return "Northern Vietnam"
    case "Southern Vietnam":
      return "Southern Vietnam"
    case "Central Vietnam":
      return "Central Vietnam"
    default:
      return "Select location"
  }
}

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
  const [location, setLocation] = useState(null)
  const [closeTime, setCloseTime] = useState(moment()?._d)
  const [estimatedTime, setEstimatedTime] = useState(moment()?._d)
  const [transportation, setTransportation] = useState(null)
  const [hotel, setHotel] = useState(null)
  const [numberErrors, setNumberErrors] = useState(null)
  const hotels = useSelector((state) => state.hotels.hotels)
  const vehicles = useSelector((state) => state.vehicles.vehicles)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues
  } = useForm()

  useEffect(() => {
    dispatch(getHotels(setLoading, {}))
    dispatch(getVehicles(setLoading, {}))
  }, [])

  useEffect(() => {
    if (id) {
      getTourById(
        id,
        setLoading,
        (data) => {
          setValue("name", data?.name)
          setLocation(data?.location)
          setValue("address", data?.address)
          setValue("phone", data?.phone)
          setValue("priceAdult", data?.priceAdult)
          setValue("priceChild", data?.priceChild)
          setValue("duration", data?.duration)
          setDesc(data?.description)
          setEstimatedTime(data?.estimatedTime)
          setCloseTime(data?.closeOrderTime)
          setValue("limit", data?.limit)
          setTransportation(data?.transportationId)
          setHotel(data?.hotelId)
          const state = data?.description || null
          setEditorState(data?.description ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state).contentBlocks, htmlToDraft(state).entityMap)) : "")
          const state2 = data?.regulation || null
          setEditorRegulationState(
            data?.regulation ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state2).contentBlocks, htmlToDraft(state2).entityMap)) : ""
          )
          setRegulation(data?.regulation)
          if (typeof data?.plan === "string") {
            const state3 = data?.plan || null
            setEditorPlanState(data?.plan ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(state3).contentBlocks, htmlToDraft(state3).entityMap)) : "")
            setPlan(data?.plan)
          }

          setImagesUpload(data?.images?.map((image) => image?.urlImage))
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
        idTour: id,
        name: e.name,
        description: desc,
        location: location,
        regulation: regulation,
        address: e.address,
        phone: e.phone,
        priceAdult: e.priceAdult,
        priceChild: e.priceChild,
        duration: e.duration,
        plan: plan,
        transportationId: transportation,
        hotelId: hotel || null,
        estimatedTime: stringToDate(estimatedTime, "dd/MM/yyyy", "/"),
        closeOrderTime: stringToDate(closeTime, "dd/MM/yyyy", "/"),
        limit: e.limit
      }
      setLoading(true)
      if (uploadImages.length > 0) {
        obj.images = await uploadImages(imagesUpload)
      }
      await updateTourById(
        obj,
        () => {
          toast.success(<SuccessNotificationToast message={"Update tour successfully!"} />)
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Update tour failed!")} />),
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
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                      zIndex: 99991,
                      height: "auto !important"
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      overflow: "visible"
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      position: "absolute",
                      opacity: state.hasValue || state.selectProps.inputValue ? "0" : "1",
                      visibility: state.hasValue || state.selectProps.inputValue ? "hidden" : "visible",
                      transition: "all 0.1s ease"
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: "auto !important"
                    })
                  }}
                  components={{
                    ValueContainer: CustomValueContainer
                  }}
                  style={{ width: "100%" }}
                  placeholder={renderLocation(location)}
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={filterOptions}
                  isClearable={false}
                  isSearchable={false}
                  onChange={({ value }) => setLocation(value)}
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
                <Label className="form-label" for="name">
                  Vehicle <span className="text-danger">*</span>
                </Label>
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                      zIndex: 99992,
                      height: "auto !important"
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      overflow: "visible"
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      position: "absolute",
                      opacity: state.hasValue || state.selectProps.inputValue ? "1" : "0.4",
                      visibility: state.hasValue || state.selectProps.inputValue ? "hidden" : "visible",
                      transition: "all 0.1s ease"
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: "auto !important"
                    })
                  }}
                  components={{
                    ValueContainer: CustomValueContainer
                  }}
                  style={{ width: "100%" }}
                  placeholder={vehicles.find((item) => item.id === transportation) ? vehicles.find((item) => item.id === transportation).transportName : "Select..."}
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={vehicles.map((item) => ({ label: `${item.id} - ${item.transportName}`, value: item.id }))}
                  isClearable={false}
                  isSearchable={true}
                  onChange={({ value }) => setTransportation(value)}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="name">
                  {t("Hotel")} (optional)
                </Label>
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                      zIndex: 99990,
                      height: "auto !important"
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      overflow: "visible"
                    }),
                    placeholder: (provided, state) => ({
                      ...provided,
                      position: "absolute",
                      opacity: state.hasValue || state.selectProps.inputValue ? "1" : "0.4",
                      visibility: state.hasValue || state.selectProps.inputValue ? "hidden" : "visible",
                      transition: "all 0.1s ease"
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: "auto !important"
                    })
                  }}
                  components={{
                    ValueContainer: CustomValueContainer
                  }}
                  style={{ width: "100%" }}
                  placeholder={hotels.find((item) => item.id === hotel) ? hotels.find((item) => item.id === hotel).hotelName : "Select..."}
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={hotels.map((item) => ({ label: `${item.id} - ${item.hotelName}`, value: item.id }))}
                  isClearable={false}
                  isSearchable={true}
                  onChange={({ value }) => setHotel(value)}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg={6} className="edit_col">
              <FormGroup className="form-group">
                <Label className={"label"}>
                  Estimated Departure Time <span className="text-danger">*</span>
                </Label>
                <Flatpickr
                  options={{ disableMobile: true, dateFormat: "d/m/Y", minDate: new Date(), defaultDate: moment()?._d }}
                  id="estimatedTime"
                  value={estimatedTime}
                  className={classnames({ "estimatedTime form-control": true, "is-invalid": !estimatedTime })}
                  onChange={(_, date) => {
                    setEstimatedTime(date)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg={6} className="edit_col">
              <FormGroup className="form-group">
                <Label className={"label"}>
                  Close Order Time <span className="text-danger">*</span>
                </Label>
                <Flatpickr
                  options={{ disableMobile: true, dateFormat: "d/m/Y", minDate: new Date(), defaultDate: moment()?._d }}
                  id="closeTime"
                  value={closeTime}
                  className={classnames({ "closeTime form-control": true, "is-invalid": !closeTime })}
                  onChange={(_, date) => {
                    setCloseTime(date)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="priceChild">
                  {t("Child price")} (VND)<span className="text-danger">*</span>
                </Label>
                <Cleave
                  placeholder={t("Enter price")}
                  className={classnames(
                    {
                      "is-invalid": errors["priceChild"]
                    },
                    "form-control"
                  )}
                  options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
                  onChange={(e) => {
                    setValue("priceChild", e.target.rawValue)
                    if (numberErrors?.priceChild) {
                      setNumberErrors({ ...numberErrors, priceChild: null })
                      setError("priceChild", null)
                    }
                  }}
                  value={getValues("priceChild")}
                  id="price"
                />
                <small>Minimum 10.000</small>
              </FormGroup>
            </Col>
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="priceAdult">
                  {t("Adult price")} (VND) <span className="text-danger">*</span>
                </Label>
                <Cleave
                  placeholder={t("Enter price")}
                  className={classnames(
                    {
                      "is-invalid": errors["priceAdult"]
                    },
                    "form-control"
                  )}
                  options={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
                  onChange={(e) => {
                    setValue("priceAdult", e.target.rawValue)
                    if (numberErrors?.priceAdult) {
                      setNumberErrors({ ...numberErrors, priceAdult: null })
                      setError("priceAdult", null)
                    }
                  }}
                  value={getValues("priceAdult")}
                  id="price"
                />
                <small>Minimum 10.000</small>
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
            <Col md="12" lg="6">
              <FormGroup className="form-group">
                <Label className="form-label" for="duration">
                  {t("Slot limit")} <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="limit"
                  id="limit"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => {
                    return (
                      <Input
                        name="limit"
                        type="number"
                        placeholder={t("Enter limit")}
                        {...register("limit", {
                          required: true,
                          validate: (value) => value !== "",
                          min: 1
                        })}
                        className={classnames({
                          "is-invalid": errors["limit"]
                        })}
                        {...field}
                      />
                    )
                  }}
                />
                <p>Minimum 1</p>
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
