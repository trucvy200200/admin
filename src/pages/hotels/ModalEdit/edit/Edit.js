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
import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertToRaw } from "draft-js"
import htmlToDraft from "html-to-draftjs"
import draftToHtml from "draftjs-to-html"
import Cleave from "cleave.js/react"
import { updateHotelById } from "../../store/action"
import EditorDescription from "@src/components/EditorDescription"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Edit = ({ data, t, handleNoButton, handleGetUpdateData }) => {
  // ** States
  const [loading, setLoading] = useState(false)
  const [desc, setDesc] = useState(null)
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
    }
    if (data?.id) {
      setValue("price", data?.pricePerNight)
      setValue("name", data?.hotelName)
      setValue("location", data?.location)
      setValue("address", data?.address)
      setValue("rating", data?.starRating)
    }
  }, [])

  const onSubmit = async (e) => {
    if (loading) return
    if (isObjEmpty(errors)) {
      const obj = {
        id: data.id,
        hotelName: e.name,
        description: desc,
        location: e.location,
        address: e.address,
        pricePerNight: e.price,
        starRating: e.rating
      }
      setLoading(true)
      await updateHotelById(
        obj,
        () => {
          toast.success(<SuccessNotificationToast message={t("Update hotel successfully!")} />)
          handleGetUpdateData()
          handleNoButton()
          reset()
        },
        (message) => toast.error(<ErrorNotificationToast message={t(message || "Update hotel failed!")} />),
        () => setLoading(false)
      )
    }
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
        <h3>Update hotel</h3>
        <FormGroup className="form-group">
          <Label className="form-label">
            Hotel name <span className="text-danger">*</span>
          </Label>
          <Controller
            id="name"
            name="name"
            control={control}
            defaultValue={data?.hotelName || ""}
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
            defaultValue={data?.address || ""}
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
            defaultValue={data?.location || ""}
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
            defaultValue={data?.starRating || ""}
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
