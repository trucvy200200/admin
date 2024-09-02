import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import classnames from "classnames"
import { Input, Form, Button, Label, FormGroup, Row, Col } from "reactstrap"
import { toast } from "react-hot-toast"
import { isObjEmpty, validateNumber } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import ModalEdit from "./ModalEdit"
import ModalOTP from "./ModalOTP/list"
import { useTranslation } from "react-i18next"
import instances from "@src/@core/plugin/axios"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { ConfirmDelete } from "@src/components/ConfirmDelete"

const WalletInformation = (
  {
    /* data */
  }
) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.profiles?.user)
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset
  } = useForm()
  const [modalEdit, setModalEdit] = useState(false)
  const [walletData, setWalletData] = useState(null)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [walletId, setWalletId] = useState(null)
  const [deleteWallet, setDeleteWallet] = useState({ status: false, id: null })
  const [errorPincode, setErrorPincode] = useState(false)

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      if (String(e.pin_code) === String(userData?.pin_code)) {
        setLoading(true)
        setErrorPincode(false)
        instances
          .post(`/user/wallet`, { userId: userData.id, name: e.wallet_name, address: e.wallet_address })
          .then((res) => {
            if (res.data && res.data.data.id) {
              setLoading(false)
              setModal(true)
              setWalletId(res.data.data.id)
            } else {
              setModal(false)
              setLoading(false)
              toast.error(<ErrorNotificationToast message={"Add wallet failed!"} />)
            }
          })
          .catch((err) => {
            setLoading(false)
            toast.error(<ErrorNotificationToast message={"Add wallet failed!"} />)
          })
      } else {
        setErrorPincode(true)
      }
    }
  }

  const handleDelete = (id) => {
    instances
      .delete(`/user/wallet/${id}`)
      .then((res) => {
        if (res.data && res.data.status === 1) {
          setLoading(false)
          setDeleteWallet({ status: false, id: null })
          dispatch({
            type: "GET_PROFILE",
            data: { ...userData, wallets: userData.wallets.filter((wallet) => wallet.id !== id) }
          })
          toast.success(<SuccessNotificationToast message={t("Delete wallet successfully!")} />)
        } else {
          setDeleteWallet({ status: false, id: null })
          setLoading(false)
          toast.error(<ErrorNotificationToast message={t("Delete wallet failed!")} />)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(<ErrorNotificationToast message={t("Delete wallet failed!")} />)
      })
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <div>
        <div className="wallet_container">
          <div className="add-form">
            <Form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup className="form-group">
                    <Label className="form-label" htmlFor="name" style={{ width: "100%", textAlign: "left" }}>
                      {t("Wallet name")}: *
                    </Label>
                    <Controller
                      name="wallet_name"
                      control={control}
                      defaultValue={getValues("wallet_name") || ""}
                      render={({ field }) => (
                        <Input
                          type="text"
                          id="wallet_name"
                          placeholder={t("Wallet name")}
                          name="wallet_name"
                          className={classnames({
                            "is-invalid": errors?.wallet_name
                          })}
                          {...register("wallet_name", {
                            required: true,
                            validate: (value) => value !== ""
                          })}
                          {...field}
                          autoFocus
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup className="form-group">
                    <Label className="form-label" htmlFor="name" style={{ width: "100%", textAlign: "left" }}>
                      {t("Wallet address")}: *
                    </Label>
                    <Controller
                      name="wallet_address"
                      control={control}
                      defaultValue={getValues("wallet_address") || ""}
                      render={({ field }) => (
                        <Input
                          type="text"
                          id="wallet_address"
                          placeholder={t("USDT/TRC20 address")}
                          name="wallet_address"
                          className={classnames({
                            "is-invalid": errors?.wallet_address
                          })}
                          {...register("wallet_address", {
                            required: true,
                            validate: (value) => value !== "" && !value.includes(" ")
                          })}
                          {...field}
                          autoFocus
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
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
                      <div for="note" style={{ width: "100%", textAlign: "left", color: "#ea5455" }}>
                        {t("Your pin code incorrect")}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <div className={`d-flex align-items-center justify-content-between btns`} style={{ gap: "5px" }}>
                <Button type="submit" color={"primary"} /* onClick={() => props?.handleYesButton()} */>
                  {t("Save")}
                </Button>
              </div>
            </Form>
          </div>
          <div className="wallets">
            {userData?.wallets?.length > 0 && userData?.wallets
              .filter((wallet) => wallet.status)
              .sort((a, b) => b.active - a.active)
              .map((wallet, index) => {
                return (
                  <div key={index} className={`item ${wallet.active ? "active" : ""}`}>
                    {wallet.active ? <div className="tag">Primary</div> : <div className="tag transparent">Primary</div>}
                    <div className="name">
                      <span>{wallet.name}</span>
                    </div>
                    <div className="amount">{wallet.address}</div>
                    <div className="btns">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setModalEdit(true)
                          setWalletData(wallet)
                        }}
                        className={"btn-edit d-flex justify-content-center"}
                      >
                        {t("Edit")}
                      </button>
                      {!wallet.active && (
                        <button onClick={() => setDeleteWallet({ status: true, id: wallet.id })} className={"btn-del d-flex justify-content-center"}>
                          {t("Delete")}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      {/* delete wallet */}
      {deleteWallet.status && (
        <ConfirmDelete message={t("Confirm to delete wallet")} button={t("Delete")} submit={() => handleDelete(deleteWallet.id)} cancel={() => setDeleteWallet({ status: false, id: null })} />
      )}
      {/* edit wallet */}
      {modalEdit && <ModalEdit walletData={walletData} t={t} showNotification={modalEdit} handleNoButton={() => setModalEdit(false)} userData={userData} />}
      {/* otp modal */}
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

export default WalletInformation
