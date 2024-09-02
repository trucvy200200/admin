import { useForm } from "react-hook-form"
import React, { useState } from "react"
import classnames from "classnames"
import InputPincodeValidate from "@components/input-pincode-validate"
import { Form, Button, Label, FormGroup, Row, Col } from "reactstrap"
import { toast } from "react-hot-toast"
import { isObjEmpty } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import { getMyProfile } from "../../store/action"
import { useTranslation } from "react-i18next"
import { Modal } from "antd"
import styled from "styled-components"
import instances from "@src/@core/plugin/axios"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ModalOTP from "./ModalOTPPinCode/list"

const ModalStyled = styled(Modal)`
  width: 400px !important;
  border-radius: 20px;
  @media (max-width: 770px) {
    width: 90vw !important;
  }
  .ant-modal-title {
    font-size: 20px;
    font-weight: 600;
  }
  .ant-modal-body {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    gap: 5px;
  }
  .anticon {
    color: #166699 !important;
  }
  .title {
    font-weight: 600;
    text-align: center;
  }
  img {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  .desc {
    text-align: center;
  }
  .ant-modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .submit {
    background-color: #166699 !important;
    box-shadow: none;
    border-radius: 10px;
    text-align: center;
    border: 1px solid #166699 !important;
    padding: 0.85rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .cancel {
    border-color: #b72634 !important;
    background: #b72634 !important;
    color: white;
    &:hover {
      color: white;
    }
  }
`

const SecurityPincode = () => {
  const { t } = useTranslation()
  const userData = useSelector((state) => state.profiles?.user)
  const [modal, setModal] = useState(false)
  const [pending, setPending] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    reset
  } = useForm()
  const dispatch = useDispatch()

  const validateNumber = (value) => {
    if (!value || value.includes(".") || value.includes(",")) {
      return false
    }
    const matches = value.match(/^([0-9]\d*)(\.\d+)?$/)
    return matches?.length > 0 ? value : false
  }

  const onSubmit = (e) => {
    if (pending) return
    if (isObjEmpty(errors)) {
      if (!validateNumber(e.new_pincode) || !validateNumber(e.confirm_pincode) || !validateNumber(e.old_pincode)) {
        toast.error(<ErrorNotificationToast message={t("Invalid pincode")} />)
        return
      }
      if (e.new_pincode !== e.confirm_pincode) {
        toast.error(<ErrorNotificationToast message={t("Confirm Pincode does not match")} />)
        return
      }
      setPending(true)
      instances
        .put(`/admin/update-pin-code`, { pinCode: e.confirm_pincode, oldPinCode: e.old_pincode })
        .then((res) => {
          const response = res?.data
          setPending(false)
          if (!response.error) {
            setModal(true)
          } else if (response.error && response?.message) {
            toast.error(<ErrorNotificationToast message={t("Please try again in 5 minutes")} />)
          } else {
            toast.error(<ErrorNotificationToast message={t("Change pincode failed!")} />)
          }
        })
        .catch((err) => {
          setPending(false)
          toast.error(<ErrorNotificationToast message={t(err?.response?.data?.message || "Change pincode failed!")} />)
        })
    }
  }

  const onKeyPressEvent = (event, newPincode) => {
    if (newPincode?.length > 5) {
      event.preventDefault()
    }
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)
    if (!new RegExp("[0-9]").test(keyValue)) {
      event.preventDefault()
    }
  }

  const handleResetPincode = async () => {
    if (pending) return
    setPending(true)
    instances
      .post("/admin/reset-pin-code")
      .then((res) => {
        if (!res?.data?.error) {
          toast.success(<SuccessNotificationToast message={`${t("Please check your mail")}!`} />)
        }
        dispatch(getMyProfile())
        setPending(false)
        setShowConfirmReset(false)
      })
      .catch((err) => {
        toast.error(<ErrorNotificationToast message={t(err?.response?.data?.message || "Reset pincode failed!")} />)
        setShowConfirmReset(false)
        setPending(false)
      })
  }

  return (
    <>
      <Form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label for="old_pincode">
                {t("Old pincode")} <span className="text-danger">*</span>
              </Label>
              <InputPincodeValidate
                control={control}
                id="old_pincode"
                placeholder="******"
                name="old_pincode"
                inputClassName={classnames(
                  {
                    "is-invalid": errors?.old_pincode
                  },
                  getValues("old_pincode")?.length > 0 && getValues("old_pincode")?.length < 6 && "is-invalid"
                )}
                onKeyPress={(e) => onKeyPressEvent(e, getValues("old_pincode"))}
                {...register("old_pincode", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                })}
                autoFocus
              />
              {getValues("old_pincode")?.length > 1 && getValues("old_pincode")?.length < 6 && (
                <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                  {t("Required 6 characters, and is a number")}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label for="new_pincode">
                {t("New pincode")} <span className="text-danger">*</span>
              </Label>
              <InputPincodeValidate
                control={control}
                id="new_pincode"
                placeholder="******"
                name="new_pincode"
                inputClassName={classnames(
                  {
                    "is-invalid": errors?.new_pincode
                  },
                  getValues("new_pincode")?.length > 0 && getValues("new_pincode")?.length < 6 && "is-invalid"
                )}
                onKeyPress={(e) => onKeyPressEvent(e, getValues("new_pincode"))}
                {...register("new_pincode", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                })}
                autoFocus
              />
              {getValues("new_pincode")?.length > 1 && getValues("new_pincode")?.length < 6 && (
                <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                  {t("Required 6 characters, and is a number")}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="12" className="mobile">
            <FormGroup className="form-group">
              <Label for="confirm_pincode">
                {t("Confirm pincode")} <span className="text-danger">*</span>
              </Label>
              <InputPincodeValidate
                control={control}
                id="confirm_pincode"
                placeholder="******"
                name="confirm_pincode"
                onKeyPress={(e) => onKeyPressEvent(e, getValues("confirm_pincode"))}
                inputClassName={classnames(
                  {
                    "is-invalid": errors?.confirm_pincode
                  },
                  getValues("new_pincode")?.length > 0 &&
                    getValues("confirm_pincode")?.length > 0 &&
                    getValues("confirm_pincode")?.length < 6 &&
                    getValues("new_pincode") !== getValues("confirm_pincode") &&
                    "is-invalid"
                )}
                {...register("confirm_pincode", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                })}
                autoFocus
              />
              {getValues("new_pincode")?.length > 0 && getValues("confirm_pincode")?.length > 0 && getValues("new_pincode") !== getValues("confirm_pincode") && (
                <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                  {t("Confirm Pincode does not match")}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="12" className="mt-1">
            <FormGroup className="form-group">
              <Label style={{ fontSize: "18px" }}>{t("Pincode requirements")}:</Label>
              <ul style={{ listStyleType: "circle" }}>
                <li>{t("Required 6 characters, and is a number")}</li>
              </ul>
            </FormGroup>
          </Col>
          <Col md="6" sm="12" className="desktop">
            <FormGroup className="form-group">
              <Label for="confirm_pincode">
                {t("Confirm pincode")} <span className="text-danger">*</span>
              </Label>
              <InputPincodeValidate
                control={control}
                id="confirm_pincode"
                placeholder="******"
                name="confirm_pincode"
                onKeyPress={(e) => onKeyPressEvent(e, getValues("confirm_pincode"))}
                inputClassName={classnames(
                  {
                    "is-invalid": errors?.confirm_pincode
                  },
                  getValues("new_pincode")?.length > 0 &&
                    getValues("confirm_pincode")?.length > 0 &&
                    getValues("confirm_pincode")?.length < 6 &&
                    getValues("new_pincode") !== getValues("confirm_pincode") &&
                    "is-invalid"
                )}
                {...register("confirm_pincode", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                })}
                autoFocus
              />
              {getValues("new_pincode")?.length > 0 && getValues("confirm_pincode")?.length > 0 && getValues("new_pincode") !== getValues("confirm_pincode") && (
                <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                  {t("Confirm Pincode does not match")}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md="6" sm="12" />
        </Row>
        <div className={"d-flex justify-content-end"}>
          <Button.Ripple
            disabled={pending}
            className={"d-flex justify-content-end"}
            onClick={() => setShowConfirmReset(true)}
            color="primary"
            style={{ width: "auto", marginTop: ".5rem", marginRight: ".5rem" }}
          >
            {t("Reset pincode")}
          </Button.Ripple>
          <Button.Ripple disabled={pending} className={"d-flex justify-content-end"} type="submit" color="primary" style={{ width: "auto", marginTop: ".5rem", marginRight: ".5rem" }}>
            {t("Save changes")}
          </Button.Ripple>
        </div>
      </Form>
      {
        showConfirmReset &&
        <ModalStyled
          centered
          okText={t("Submit")}
          cancelText={t("Cancel")}
          open={showConfirmReset}
          onOk={handleResetPincode}
          onCancel={() => setShowConfirmReset(false)}
          width={1000}
          footer={[
            <Button key="cancel" className="cancel" onClick={() => setShowConfirmReset(false)}>
              {t("Cancel")}
            </Button>,
            <Button key="submit" type="primary" className="submit" disabled={pending} onClick={handleResetPincode}>
              {t("Submit")}
            </Button>
          ]}
        >
          <h4 className="title">{t("Confirm")}</h4>
          <p className="desc">{t("This action cannot be undone. Are you sure want to reset your pincode")}</p>
        </ModalStyled>
      }
      {modal && (
        <ModalOTP
          show={modal}
          newPincode={getValues("new_pincode")}
          oldPincode={getValues("old_pincode")}
          handleNoButton={() => {
            setModal(false)
          }}
          handleReset={() => {
            reset()
          }}
          data={userData}
          t={t}
        />
      )}
    </>
  )
}

export default SecurityPincode
