import { useForm } from "react-hook-form"
import { useState } from "react"
import classnames from "classnames"
import InputConfirmValidate from "@src/@core/components/input-confirm-validate"
import { Form, Button, Label, FormGroup, Row, Col } from "reactstrap"
import { toast } from "react-hot-toast"
import { isObjEmpty, checkPassword } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../store/action"
import { useTranslation } from "react-i18next"

const SecurityPassword = () => {
  const data = useSelector((state) => state.profiles?.user)
  const { t } = useTranslation()
  const [pending, setPending] = useState(false)
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    getValues
  } = useForm()
  const dispatch = useDispatch()
  
  const onSubmit = (e) => {
    if (isObjEmpty(errors) && !checkPassword(e.confirmPassword) && !checkPassword(e.password) && e.password === e.confirmPassword) {
      setPending(true)
      const userData = {}
      userData.password = e.confirmPassword
      dispatch(
        updateProfile(
          e.confirmPassword ? userData : {},
          data,
          (message) => toast.success(t(message)),
          (message) => toast.error(t(message)),
          () => setPending(false)
        )
      )
    }
  }

  return (
    <Form autoComplete={"off"} onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="6" sm="12">
          <FormGroup className="form-group">
            <Label for="password">
              {t("New password")} <span className="text-danger">*</span>
            </Label>
            <InputConfirmValidate
              control={control}
              id="password"
              placeholder="******"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 25,
                validate: (value) => value !== "" && !value?.includes(" ")
              })}
              inputClassName={classnames({
                "is-invalid": errors?.password
              })}
              autoFocus
            />
            {getValues("password")?.length > 0 && checkPassword(getValues("password")) && (
              <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                {t("Minimum 8 characters, at least 1 letter, 1 number and 1 special character")}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md="6" sm="12">
          <FormGroup className="form-group">
            <Label for="confirmPassword">
              {t("Confirm password")} <span className="text-danger">*</span>
            </Label>
            <InputConfirmValidate
              control={control}
              id="confirmPassword"
              placeholder="******"
              name="confirmPassword"
              inputClassName={classnames(
                {
                  "is-invalid": errors?.confirmPassword
                },
                (getValues("password")?.length > 0 && getValues("confirmPassword")?.length > 0 && getValues("password") !== getValues("confirmPassword")) && "is-invalid"
              )}
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                maxLength: 25,
                validate: (value) => value !== "" && !value?.includes(" ")
              })}
              autoFocus
            />
            {(getValues("password")?.length > 0 && getValues("confirmPassword")?.length > 0 && getValues("password") !== getValues("confirmPassword")) && (
              <div className="error-message" style={{ color: "#ea5455", marginTop: "5px" }}>
                {t("Confirm Password does not match")}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md="6" sm="12" className="mt-1">
          <FormGroup className="form-group">
            <Label for="confirmPassword" style={{ fontSize: "18px" }}>
              {t("Password requirements")}:
            </Label>
            <ul style={{ listStyleType: "circle" }}>
              <li>{t("Minimum 8 characters long - the more, the better")}</li>
              <li>{t("At least one lowercase character")}</li>
              <li>{t("At least one symbol")}</li>
            </ul>
          </FormGroup>
        </Col>
        <Col md="6" sm="12"></Col>
      </Row>
      <div className={"d-flex justify-content-end"}>
        <Button.Ripple disabled={pending} className={"d-flex justify-content-end"} type="submit" color="primary">
          {t("Save changes")}
        </Button.Ripple>
      </div>
    </Form>
  )
}

export default SecurityPassword
