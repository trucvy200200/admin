import { isUserLoggedIn } from "@utils"
import { Mail, ChevronLeft } from "react-feather"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { CardTitle, Card, CardBody, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupText } from "reactstrap"
import { useState, useEffect, useRef } from "react"
import classnames from "classnames"
import { Controller, useForm } from "react-hook-form"
import { isObjEmpty } from "../../../utility/Utils"
import ReCAPCHA from "reaptcha"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import useJwt from "../../../auth/jwt/useJwt"
import ErrorNotificationToast from "../../../components/Toast/ToastFail"
import SuccessNotificationToast from "../../../components/Toast/ToastSuccess"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { BASE_CONSTANT } from "@src/constants/base-constant"
// ** Configs
import themeConfig from "@configs/themeConfig"

// ** styles
import "@styles/base/pages/page-auth.scss"

const ForgotPassword = () => {
  const { t } = useTranslation()
  const reCaptcha = useRef()
  const [recaptchaToken, setRecaptchaToken] = useState("")
  const {
    setValue,
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm()
  const [pending, setPending] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    if (recaptchaToken) {
      if (isObjEmpty(errors)) {
        setPending(true)
        useJwt
          .forgotPassword({ email: data["login-email"] })
          .then((res) => {
            if (res?.data && res?.data?.status) {
              setPending(false)
              toast.success(<SuccessNotificationToast message={t("Please check your email")} />)
              navigate("/confirm-forgot")
            } else {
              setPending(false)
              toast.error(<ErrorNotificationToast message={t(res?.data?.message)} />)
            }
          })
          .catch((err) => {
            setPending(false)
            toast.error(<ErrorNotificationToast message={t("Email is not found")} />)
          })
      }
    } else {
      toast.error(<ErrorNotificationToast message={t("Please check reCaptcha")} />)
    }
  }

  /* onchange recaptcha */
  const onChange = (value) => {
    setRecaptchaToken(value)
  }

  if (!isUserLoggedIn()) {
    return (
      <>
        {pending && <LoadingBackground />}
        <div className="auth-wrapper auth-v1 px-2">
          <div className="auth-inner py-2">
            <Card className="mb-0">
              <CardBody>
                <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                  <img src={themeConfig.app.appLogoImageSmall} width={70} alt="" />
                </Link>
                <CardTitle tag="h2" className="text-center">
                  {t("Forgot password")}
                </CardTitle>
                <Form className="auth-forgot-password-form mt-2" onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
                  <FormGroup className="form-group">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <InputGroup>
                      <InputGroupText className={errors["login-email"] && true ? "is-invalid" : ""}>
                        <div className="icon">
                          <Mail size={16} />
                        </div>
                      </InputGroupText>
                      <Controller
                        name="login-email"
                        control={control}
                        defaultValue={getValues("login-email") || ""}
                        render={({ field }) => (
                          <Input
                            type="email"
                            id="login-email"
                            placeholder="email"
                            name="login-email"
                            autoFocus
                            invalid={errors["login-email"] && true}
                            {...register("login-email", {
                              required: true,
                              validate: (value) => value !== "" && !value?.includes(" ")
                            })}
                            {...field}
                          />
                        )}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <div className="google-recaptcha-wrapper">
                      <ReCAPCHA
                        ref={reCaptcha}
                        className="google-recaptcha"
                        sitekey={BASE_CONSTANT.SITE_KEY || "recaptcha_sitekey"}
                        onVerify={onChange}
                        onErrored={(err) => console.log(err)}
                        hl={t("reCaptchaLocale")}
                      />
                    </div>
                  </FormGroup>
                  <Button.Ripple type="submit" color="primary" block>
                    {t("Send to link")}
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
  } else {
    return <Navigate to="/" />
  }
}

export default ForgotPassword
