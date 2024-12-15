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
import { createHotel } from "../../store/action"
import EditorDescription from "@src/components/EditorDescription"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Create = ({ handleGetData, t, handleNoButton }) => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [desc, setDesc] = useState(null)
  const [numberErrors, setNumberErrors] = useState(null)
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
        hotelName: e.name,
        description: desc,
        location: e.location,
        address: e.address,
        pricePerNight: e.price,
        starRating: e.rating
      }
      setLoading(true)
      await createHotel(
        obj,
        () => {
          toast.success(<SuccessNotificationToast message={t("Create hotel successfully!")} />)
          handleGetData()
          handleNoButton()
          reset()
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Create hotel failed!")} />),
        () => setLoading(false)
      )
    }
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
        <h3>Create hotel</h3>
        <FormGroup className="form-group">
          <Label className="form-label" for="prod_name">
            Hotel name <span className="text-danger">*</span>
          </Label>
          <Controller
            id="name"
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Enter hotel name")}
                  name="name"
                  className={classnames({
                    "is-invalid": errors["name"]
                  })}
                  {...register("name", {
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
            Address <span className="text-danger">*</span>
          </Label>
          <Controller
            id="address"
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Enter address")}
                  name="address"
                  className={classnames({
                    "is-invalid": errors["address"]
                  })}
                  {...register("address", {
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
            Location <span className="text-danger">*</span>
          </Label>
          <Controller
            id="location"
            name="location"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <Input
                  type="text"
                  placeholder={t("Location")}
                  name="location"
                  className={classnames({
                    "is-invalid": errors["location"]
                  })}
                  {...register("location", {
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
          <Label className="form-label">
            {t("Star rating")} <span className="text-danger">*</span>
          </Label>
          <Controller
            name="rating"
            id="rating"
            control={control}
            defaultValue={""}
            render={({ field }) => {
              return (
                <Input
                  name="rating"
                  type="number"
                  placeholder={t("Enter rating")}
                  {...register("rating", {
                    required: true,
                    validate: (value) => value !== "",
                    min: 1,
                    max: 5
                  })}
                  className={classnames({
                    "is-invalid": errors["rating"]
                  })}
                  {...field}
                />
              )
            }}
          />
          <small>Value is from 1 to 5</small>
        </FormGroup>
        <FormGroup className="form-group">
          <Label className="form-label" for="price">
            {t("Price per night")} (VND) <span className="text-danger">*</span>
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
        <FormGroup className="bottom-form form-group">
          <Label className=" form-label" for="image_url">
            {t("Description")}
          </Label>
          <div id="Desc">
            <EditorDescription setValue={setDesc} value={desc} />
          </div>
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
