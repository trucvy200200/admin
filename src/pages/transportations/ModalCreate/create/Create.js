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
import classnames from "classnames"
import Cleave from "cleave.js/react"
import { createVehicle } from "../../store/action"
import Select, { components } from "react-select"
import { TRANSPORTATION_TYPE } from "@constants/base-constant"
import { selectThemeColors } from "@utils"

import "@styles/react/libs/react-select/_react-select.scss"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

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

const renderType = (type) => {
  switch (type) {
    case TRANSPORTATION_TYPE.FLIGHT:
      return "Flight"
    case TRANSPORTATION_TYPE.CAR:
      return "Car"
    default:
      return "Select vehicle type"
  }
}

const filterOptions = [
  {
    value: TRANSPORTATION_TYPE.FLIGHT,
    label: "Flight"
  },
  { value: TRANSPORTATION_TYPE.CAR, label: "Car" }
]

const Create = ({ handleGetData, t, handleNoButton }) => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [numberErrors, setNumberErrors] = useState(null)
  const [type, setType] = useState(null)
  const {
    setError,
    setValue,
    control,
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = async (e) => {
    if (loading) return
    if (isObjEmpty(errors)) {
      const obj = {
        transportName: e.brand,
        company: e.company,
        type,
        departure: e.departure,
        destination: e.destination,
        price: e.price
      }
      setLoading(true)
      await createVehicle(
        obj,
        () => {
          toast.success(<SuccessNotificationToast message={t("Create vehicle successfully!")} />)
          handleGetData()
          handleNoButton()
          reset()
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Create vehicle failed!")} />),
        () => setLoading(false)
      )
    }
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
        <h3>Create vehicle</h3>
        <FormGroup className="form-group">
          <Label className="form-label" for="prod_name">
            Name <span className="text-danger">*</span>
          </Label>
          <Controller
            id="brand"
            name="brand"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Brand name")}
                  name="brand"
                  className={classnames({
                    "is-invalid": errors["brand"]
                  })}
                  {...register("brand", {
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
          <Label className="form-label" for="prod_name">
            Company <span className="text-danger">*</span>
          </Label>
          <Controller
            id="company"
            name="company"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Company name")}
                  name="company"
                  className={classnames({
                    "is-invalid": errors["company"]
                  })}
                  {...register("company", {
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
          <Label className="form-label" for="name">
            {t("Type")} <span className="text-danger">*</span>
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
            placeholder={renderType(type)}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={filterOptions}
            isClearable={false}
            isSearchable={false}
            onChange={({ value }) => setType(value)}
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label className="form-label" for="prod_name">
            Departure <span className="text-danger">*</span>
          </Label>
          <Controller
            id="departure"
            name="departure"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Departure")}
                  name="departure"
                  className={classnames({
                    "is-invalid": errors["departure"]
                  })}
                  {...register("departure", {
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
          <Label className="form-label" for="prod_name">
            Destination <span className="text-danger">*</span>
          </Label>
          <Controller
            id="destination"
            name="destination"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Destination")}
                  name="destination"
                  className={classnames({
                    "is-invalid": errors["destination"]
                  })}
                  {...register("destination", {
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
          <Label className="form-label" for="price">
            {t("Price")} (VND) <span className="text-danger">*</span>
          </Label>
          <Cleave
            placeholder={t("Enter price")}
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
            id="price"
          />
          <small>{t("Minimum 10.000")}</small>
        </FormGroup>
        <div className="d-flex align-items-center justify-content-end mb-0">
          <Button.Ripple className="mr-1" type="submit" color="primary">
            {t("Create")}
          </Button.Ripple>
          <Button.Ripple color="cancel" onClick={handleNoButton}>
            {t("Cancel")}
          </Button.Ripple>
        </div>
      </Form>
    </>
  )
}
export default Create
