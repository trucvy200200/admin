import { Link, useNavigate } from "react-router-dom"
import InputPassword from "@components/input-password-toggle"
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button, Input } from "reactstrap"
import React, { Fragment, useState } from "react"
import jwt from "../../../auth/jwt/useJwt"
import classnames from "classnames"
import { useForm } from "react-hook-form"
// ** styles
import "@styles/base/pages/page-auth.scss"
// ** Configs
import themeConfig from "@configs/themeConfig"
import { getUserData } from "../../../auth/utils"
import { handleLogout } from "../../../redux/actions/auth"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"

const ChangePassword = () => {
    const { t } = useTranslation()
    const user = getUserData()
    const dispatch = useDispatch()
    return (
        <div className="auth-wrapper auth-v1 px-2">
            <div className="auth-inner py-2">
                <Card className="mb-0">
                    <CardBody>
                        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
                            <img src={themeConfig.app.appLogoImageSmall} width={70} alt="" />
                        </Link>
                        <CardTitle tag="h4" className="text-center">
                            {t("Forgot password confirmation")}
                        </CardTitle>
                        <div className="desc-forgot">
                            <p>{t("We have sent the required information to your account")}.</p>
                            <p>{t("Access your Email and follow the instructions to reset the password for your account")}.</p>
                            {t("Thank You")}!
                        </div>
                        <div className="misc-inner p-1">
                            <div className="w-100 text-center">
                                <Button tag={Link} to="/login" color="primary" className="btn-sm-block m-0" onClick={() => dispatch(handleLogout())}>
                                    {t("Sign in")}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ChangePassword
