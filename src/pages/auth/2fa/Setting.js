import React, { useState, useEffect } from "react"
import classnames from "classnames"
import { useSelector } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { Form, Input, FormGroup, Button, Card, CardBody, Row, Col } from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import IntlDropdown from "@layouts/components/navbar/IntlDropdown"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { useTranslation } from "react-i18next"

// ** Configs
import themeConfig from "@configs/themeConfig"

import axios from "axios"
import { BASE_CONSTANT } from "@src/constants/base-constant"

const TwoFASetting = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dataLogin = useSelector((state) => state.authReducer.dataLogin)
  const accessToken = dataLogin?.token
  const [data, setData] = useState("")

  useEffect(() => {
    if (!accessToken) {
      navigate("/")
    } else {
      handleGenerateQR()
    }
  }, [])

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm()

  const onSubmit = (e) => {
    const instancesAuth = axios.create({
      baseURL: BASE_CONSTANT.BASE_URL || "http://localhost:3200/api/v1"
    })

    instancesAuth.interceptors.request.use(
      (config) => {
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    
    setLoading(true)
    instancesAuth
      .post("/auth/admin/2fa/turn-on", {
        twoFactorCode: e.auth_code
      })
      .then((res) => {
        setLoading(false)
        if (!res?.data?.error && res?.data?.code === 0) {
          navigate("/checkpoint")
          reset()
          toast.success(<SuccessNotificationToast message={`${t("Enable two-FA successfully")}!`} />)
        } else {
          toast.error(<ErrorNotificationToast message={`${t(res?.data?.message)}!`} />)
        }
      })
      .catch((err) => {
        toast.error(<ErrorNotificationToast message={`${t("Enable two-FA failed")}!`} />)
        setLoading(false)
      })
  }

  const handleGenerateQR = async () => {
    setLoading(true)

    const instancesAuth = axios.create({
      baseURL: BASE_CONSTANT.BASE_URL || "http://localhost:3200/api/v1"
    })

    instancesAuth.interceptors.request.use(
      (config) => {
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    instancesAuth
      .post("/auth/admin/2fa/generate")
      .then((res) => {
        if (!res?.data?.error) {
          setData(res?.data?.data)
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <div className="auth-wrapper auth-v1 px-2 twofa-setting">
        <div className="auth-inner py-2">
          <Card className="mb-0">
            <CardBody>
              <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                <img src={themeConfig.app.appLogoImageSmall} width={70} alt="" />
              </Link>
              <div className="intl">
                <IntlDropdown />
              </div>
              <div>
                <h4 className="title text-center">{t("Use third-party validation")}</h4>
                <p className="desc text-center">{t("Please use the Google Authenticator app to scan this QR code")}</p>
                <img className="mx-auto d-block" src={data?.qrCode || ""} alt="" />
                <h4 className="text-center mb-1">{data?.code}</h4>

                <Form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)} className="w-100">
                  <Row className="justify-content-center w-100 mx-0">
                    <Col md="7" sm="7" xs="12" className="px-0 px-xs-1">
                      <FormGroup className="form-group">
                        <Controller
                          name="auth_code"
                          control={control}
                          defaultValue={getValues("auth_code") || ""}
                          render={({ field }) => (
                              <Input
                              name="auth_code"
                              id="auth_code"
                              type="number"
                              placeholder={t("Input 6 digit authenticator code")}
                              {...register("auth_code", {
                                required: true,
                                minLength: 6,
                                maxLength: 6
                              })}
                              className={classnames({
                                "is-invalid": errors?.auth_code
                              })}
                              {...field}
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" sm="3" xs="12" className="px-1 px-xs-0">
                      <Button.Ripple className={"d-flex justify-content-center"} type="submit" color="primary" style={{ width: "100%", marginTop: "0", marginRight: "0" }}>
                        {t("Enable")}
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default TwoFASetting
