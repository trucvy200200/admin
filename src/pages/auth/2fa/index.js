import React, { useState, useContext, useEffect } from "react"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import { ChevronLeft } from "react-feather"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { Form, Input, FormGroup, Label, Button, Card, CardBody } from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import { AbilityContext } from "@src/utility/context/Can"
import { isObjEmpty, validateNumber } from "@utils"
import { login2FA } from "@store/actions/auth"
import IntlDropdown from "@layouts/components/navbar/IntlDropdown"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { useTranslation } from "react-i18next"

// ** Configs
import themeConfig from "@configs/themeConfig"

const Login2FA = () => {
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [authCode, setAuthCode] = useState("")
  const [loading, setLoading] = useState(false)
  const dataLogin = useSelector((state) => state.authReducer.dataLogin)
  const accessToken = dataLogin?.token

  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    }
  }, [])

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    getValues
  } = useForm()

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      if (authCode?.length !== 6) {
        toast.error(<ErrorNotificationToast message={`${t("Required 6 characters, and is a number")}!`} />)
        return
      }
      setLoading(true)
      dispatch(
        login2FA(
          { twoFactorCode: authCode },
          accessToken,
          () => {
            toast.success(<SuccessNotificationToast message={`${t("Login successfully")}!`} />)
            navigate("/")
          },
          (message) => toast.error(<ErrorNotificationToast message={`${t(message)}!`} />),
          setLoading,
          ability,
          dataLogin
        )
      )
    }
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <div className="auth-wrapper auth-v1 px-2">
        <div className="auth-inner py-2">
          <Card className="mb-0">
            <CardBody>
              <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                <img src={themeConfig.app.appLogoImageSmall} width={70} alt="" />
                <p>{t("Your account with 2-factor authentication enabled requires this additional sign-in step")}.</p>
                <p>
                  {t("Note")}: {t("Please do not delete the authentication application that you have set up without turning off 2-factor authentication")}
                </p>
              </Link>
              <div className="intl">
                <IntlDropdown />
              </div>
              <Form autoComplete="off" className="auth-login-form mt-0" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label className="form-label" for="username">
                    {t("Enter the 6-digit code from the authentication app you set up")}. <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="authCode"
                    control={control}
                    defaultValue={getValues("authCode") || ""}
                    render={({ field }) => (
                      <Input
                        id="authCode"
                        autoComplete="off"
                        autoFocus
                        placeholder={t("Authentication code")}
                        invalid={errors["authCode"] && true}
                        className={classnames({ "is-invalid": errors["authCode"] })}
                        {...register("authCode", {
                          required: true,
                          minLength: 6,
                          maxLength: 6,
                          validate: (value) => value !== "" && !value.includes(" ") && !!validateNumber(value)
                        })}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setAuthCode(e.target.value)
                        }}
                      />
                    )}
                  />
                </FormGroup>
                <Button.Ripple disabled={loading || authCode?.length !== 6} type="submit" color="primary" block>
                  {t("Submit")}
                </Button.Ripple>
              </Form>

              <p className="text-center mt-2">
                <Label className="form-label text-center">
                  <Link to="/login">
                    <ChevronLeft className="mr-25" size={16} />
                    <span className="align-middle">{t("Back to sign in")}</span>
                  </Link>
                </Label>
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login2FA
