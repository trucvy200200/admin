import React, { useState, useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { Form, Input, FormGroup, Label, Button, Card, CardBody } from "reactstrap"
import { getUserData, getHomeRouteForLoggedInUser, isObjEmpty } from "@utils"
import "@styles/base/pages/page-auth.scss"
import { AbilityContext } from "@src/utility/context/Can"
import { handleLogin, handleSaveDataLogin } from "@store/actions/auth"
import InputPasswordToggle from "@src/@core/components/input-password-toggle"
import { encrypt, decrypt, parseHexString } from "@src/utility/Crypto"
import IntlDropdown from "@layouts/components/navbar/IntlDropdown"
import { useTranslation } from "react-i18next"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { LOGIN_TYPE } from "@src/constants/users-constant"
import themeConfig from "@configs/themeConfig"
import useJwt from "@src/auth/jwt/useJwt"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"

import "flatpickr/dist/themes/material_blue.css"

const config = useJwt.jwtConfig

const Login = () => {
  const ability = useContext(AbilityContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [remember, setRemember] = useState(localStorage.getItem(jwtDefaultConfig.storageUserRemember))
  const [loading, setLoading] = useState(false)
  const {
    setValue,
    control,
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm()

  useEffect(() => {
    if (localStorage.getItem(jwtDefaultConfig.storageUserRemember)) {
      setValue(
        "username",
        decrypt(
          parseHexString(JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserRemember)).username.split("@")[0]),
          JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserRemember)).username.split("@")[1]
        )
      )
      setValue(
        "login-password",
        decrypt(
          parseHexString(JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserRemember)).password.split("@")[0]),
          JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserRemember)).password.split("@")[1]
        )
      )
    }
  }, [])

  const onSubmit = async (data) => {
    if (isObjEmpty(errors)) {
      localStorage.removeItem(config.storageUserData)
      localStorage.removeItem(config.storageTokenKeyName)
      setLoading(true)
      const resLocation = await useJwt
        .getGeoLocation()
        .then((res) => res)
        .catch(() => null)
      useJwt
        .login({ username: data.username, password: data["login-password"], ip: resLocation?.data?.ip || "" })
        .then((res) => {
          /* Login condition */
          if (res?.data?.data) {
            const response = res?.data?.data?.info
            if (response?.isTwoFactorAuthenticationEnabled) {
              if (remember) {
                const usernameCipher = encrypt(data.username)
                const passwordCipher = encrypt(data["login-password"])
                localStorage.setItem(
                  config.storageUserRemember,
                  JSON.stringify({
                    username: usernameCipher,
                    password: passwordCipher
                  })
                )
              } else {
                localStorage.removeItem(config.storageUserRemember)
              }
              setLoading(false)
              dispatch(handleSaveDataLogin({ ...response, token: res?.data?.data?.token }))
              navigate(getHomeRouteForLoggedInUser(response?.isTwoFactorAuthenticationEnabled))
            } else {
              const response = res?.data?.data?.info
              //hide 2 localStorage rows when 2fa login required
              /* Add to user, accessToken & refreshToken to localStorage if action in redux cannot */
              localStorage.setItem(config.storageUserData, JSON.stringify({ ...response }))
              localStorage.setItem(config.storageTokenKeyName, res?.data?.data?.token)
              if (remember) {
                const usernameCipher = encrypt(data.username)
                const passwordCipher = encrypt(data["login-password"])
                localStorage.setItem(
                  config.storageUserRemember,
                  JSON.stringify({
                    username: usernameCipher,
                    password: passwordCipher
                  })
                )
              } else {
                localStorage.removeItem(config.storageUserRemember)
              }
              setLoading(false)
              ability.update(response.ability)
              dispatch(handleLogin(response))
              dispatch(handleSaveDataLogin({ ...response, token: res?.data?.data?.token }))
              navigate(getHomeRouteForLoggedInUser(response?.isTwoFactorAuthenticationEnabled))
              // navigate('/2fa-setting')
            }
          }
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          switch (error?.response?.data?.type) {
            case LOGIN_TYPE.NOT_FOUND_USER:
              setLoading(false)
              toast.error(t("Username doesn't exits!"))
              break
            case LOGIN_TYPE.INCORRECT:
              setLoading(false)
              toast.error(t("Password is wrong!"))
              break
            case LOGIN_TYPE.USER_BLOCK:
              setLoading(false)
              toast.error(t("Your account has been locked"))
              break
            default:
              break
          }
        })
    }
  }

  const handleRememberMe = (e) => {
    setRemember(e.target.checked)
  }

  if (getUserData()) return <Navigate replace to={getHomeRouteForLoggedInUser()} />

  return (
    <>
      {loading && <LoadingBackground />}
      <div className="auth-wrapper auth-v1 px-2">
        <div className="auth-inner py-2">
          <Card className="mb-0">
            <CardBody>
              <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                <img src={themeConfig.app.appLogoImageSmall} width={70} alt="" />
                <h2>
                  {t("Welcome to")} <span>WOLCG</span>
                </h2>
              </Link>
              <div className="intl">
                <IntlDropdown />
              </div>
              <Form autoComplete="off" className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="form-group">
                  <Label className="form-label" for="username">
                    {t("Username")} <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue={getValues("username") || ""}
                    render={({ field }) => (
                      <Input
                        id="username"
                        autoComplete="off"
                        autoFocus
                        placeholder={t("username")}
                        invalid={errors["username"] && true}
                        {...register("username", {
                          required: true,
                          validate: (value) => value !== "" && !value?.includes(" ")
                        })}
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      {t("Password")} <span className="text-danger">*</span>
                    </Label>
                    <Label className="form-label text-right">
                      <Link to="/forgot-password">{t("Forgot password")}?</Link>
                    </Label>
                  </div>
                  <InputPasswordToggle
                    autoComplete="off"
                    control={control}
                    name="login-password"
                    placeholder="*********"
                    invalid={errors["login-password"] && true}
                    {...register("login-password", {
                      required: true,
                      validate: (value) => value !== "" && !value?.includes(" ")
                    })}
                    defaultValue={getValues("login-password") || ""}
                  />
                </FormGroup>
                <FormGroup className="form-group d-flex gap-50">
                  <Input checked={remember} type="checkbox" className="custom-control-Primary" id="remember-me" onChange={handleRememberMe} />
                  <Label htmlFor="remember-me" className="cursor-pointer" style={{ width: "fit-content" }}>
                    {t("Remember me")}
                  </Label>
                </FormGroup>
                <Button.Ripple disabled={loading} type="submit" color="primary" block>
                  {t("Sign in")}
                </Button.Ripple>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login
