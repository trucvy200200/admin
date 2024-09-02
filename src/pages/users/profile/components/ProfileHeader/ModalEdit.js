import React, { useState } from "react"
import { Card, Row, Col, Form, Label, Input, FormGroup, Button, Modal } from "reactstrap"
import classnames from "classnames"
import { X } from "react-feather"
import { useForm, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import ModalOTP from "./ModalOTP/list"
import { isObjEmpty } from "@utils"
import instances from "@src/@core/plugin/axios"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"

import "./styles/styles.scss"

const ModalEdit = (props) => {
  const { t, handleNoButton, userData, walletData } = props
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    reset
  } = useForm()
  const [walletId, setWalletId] = useState(null)
  const [defaultWallet, setDefaultWallet] = useState(walletData && walletData.active === 1)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [errorPincode, setErrorPincode] = useState(false)
  
  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      if (defaultWallet) {
        if (String(e.pin_code) === String(userData?.pin_code)) {
          setLoading(true)
          instances
            .post(`/user/wallet/active`, { walletId: walletData.id, pin_code: String(e.pin_code) })
            .then((res) => {
              if (res.data && res.data.data) {
                setLoading(false)
                handleNoButton()
                setErrorPincode(false)
                dispatch({
                  type: "GET_PROFILE",
                  data: {
                    ...userData,
                    wallets: userData.wallets.map((wallet) => {
                      if (wallet.id === walletData.id) {
                        return { ...wallet, active: res.data.data.status }
                      } else {
                        return { ...wallet, active: 0 }
                      }
                    })
                  }
                })

                toast.success(<SuccessNotificationToast message={t("Update wallet successfully!")} />)
              } else {
                setErrorPincode(false)
                setLoading(false)
                toast.error(<ErrorNotificationToast message={t("Update wallet failed!")} />)
              }
            })
            .catch((err) => {
              setLoading(false)
              toast.error(<ErrorNotificationToast message={t("Update wallet failed!")} />)
            })
        } else {
          setErrorPincode(true)
        }
      } else {
        handleNoButton()
      }
    }
  }

  const validateNumber = (value) => {
    if (!value || value.includes(".") || value.includes(",")) {
      return false
    }
    const matches = value.match(/^([0-9]\d*)(\.\d+)?$/)
    return matches?.length > 0 ? value : false
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <Modal id="" isOpen={props?.showNotification} centered className={"modal-md modal-edit-wallet"}>
        <Card className={"mb-0 p-2 text-center"}>
          <X
            size={16}
            className="mr-25 close_btn"
            onClick={() => {
              setErrorPincode(false)
              props?.handleNoButton()
            }}
          />
          <h2 className="heading">{t("Edit Wallet")}</h2>
          <p>{t("Edit your saved wallet details")}</p>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
            <Row>
              <Col md="12" sm="12">
                <FormGroup className="form-group">
                  <Label className="form-label" htmlFor="name" style={{ width: "100%", textAlign: "left" }}>
                    {t("Wallet name")}: *
                  </Label>
                  <Input
                    disabled
                    defaultValue={walletData ? walletData.name : ""}
                    type="text"
                    id="wallet_name"
                    placeholder={t("Wallet name")}
                    name="wallet_name"
                    className={classnames({
                      "is-invalid": errors?.wallet_name
                    })}
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup className="form-group">
                  <Label className="form-label" htmlFor="name" style={{ width: "100%", textAlign: "left" }}>
                    {t("Wallet address")}: *
                  </Label>
                  <Input
                    disabled
                    defaultValue={walletData ? walletData.address : ""}
                    type="text"
                    id="wallet_address"
                    placeholder={t("Wallet address")}
                    name="wallet_address"
                    className={classnames({
                      "is-invalid": errors?.wallet_address
                    })}
                    autoFocus
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12">
                <FormGroup className="form-group">
                  <Label className="form-label" htmlFor="pin_code" style={{ width: "100%", textAlign: "left" }}>
                    {t("Pincode")}: *
                  </Label>

                  <Controller
                    name="pin_code"
                    control={control}
                    defaultValue={getValues("pin_code") || ""}
                    render={({ field }) => (
                      <Input
                        type="password"
                        id="pin_code"
                        placeholder={t("Pincode")}
                        name="pin_code"
                        className={classnames({
                          "is-invalid": errors?.pin_code
                        })}
                        {...register("pin_code", {
                          required: true,
                          minLength: 6,
                          maxLength: 6,
                          validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                        })}
                        {...field}
                        autoFocus
                      />
                    )}
                  />
                  {errorPincode && (
                    <Label className="form-label" htmlFor="note" style={{ width: "100%", textAlign: "left", color: "#ea5455" }}>
                      {t("Your pin code incorrect")}
                    </Label>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <div className={`wallet-edit d-flex align-items-center justify-content-center flex-column`} style={{ gap: "5px" }}>
              <div className={`set-wallet`} onClick={() => setDefaultWallet(!defaultWallet)}>
                <div className={`v-selection-control__wrapper ${defaultWallet ? "text-primary" : walletData && walletData.active === 1 ? "text-primary" : ""}`}>
                  <div className="v-switch__track"></div>
                  <div className={`v-selection-control__input ${defaultWallet ? "active" : walletData && walletData.active === 1 ? "active" : ""}`}>
                    <input id="switch-147" aria-readonly="false" type="checkbox" />
                    <div className={`v-switch__thumb ${defaultWallet ? "text-primary" : walletData && walletData.active === 1 ? "text-primary" : ""}`}></div>
                  </div>
                </div>
                <label className="v-label v-label--clickable" htmlFor="switch-200">
                  {t("Set as primary wallet")}
                </label>
              </div>
              {/*  <Label check>
                {t("Set Default" })}
                <Input style={{ marginLeft: "5px" }} checked={defaultWallet} type="checkbox" onChange={() => setDefaultWallet(!defaultWallet)} />
              </Label> */}
              <div className="btns btns-wrapper">
                <Button.Ripple type="submit" color={"primary"} className="mr-1" /* onClick={() => props?.handleYesButton()} */>
                  {t("Save changes")}
                </Button.Ripple>
                <Button.Ripple
                  /* tag={Link} to={``} */ outline
                  color={"secondary"}
                  onClick={() => {
                    props?.handleNoButton()
                    setErrorPincode(false)
                  }}
                >
                  {t("Cancel")}
                </Button.Ripple>
              </div>
            </div>
          </Form>
        </Card>
      </Modal>
      {modal && (
        <ModalOTP
          show={modal}
          walletId={walletId}
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

export default ModalEdit
