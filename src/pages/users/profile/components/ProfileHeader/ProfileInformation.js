import { Form, Label, Badge, FormGroup, Row, Col } from "reactstrap"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { convertDate } from "@src/utility/ConvertDate"
import { STATUS_CONSTANT } from "@constants/users-constant"

const statusObj = {
  true: "light-success",
  false: "light-warning",
  danger: "light-danger"
}

const options = (t) => {
  return [
    { value: "0", label: t("Male") },
    { value: "1", label: t("Female") },
    { value: "2", label: t("Other") }
  ]
}

const statusUser = (type) => {
  switch (type) {
    case STATUS_CONSTANT.ACTIVE:
      return "Active"
    case STATUS_CONSTANT.INACTIVE:
      return "Inactive"
    case STATUS_CONSTANT.DELETED:
      return "Deleted"
    default:
      break
  }
}

const ProfileInformation = () => {
  const data = useSelector((state) => state.profiles?.user)
  const countries = useSelector((state) => state.users.countries)
  const { t } = useTranslation()
  const userCountry = countries.length > 0 ? countries.find((country) => String(country?.country_code) === data?.country) : null

  return (
    <>
      <Form autoComplete={"off"}>
        <h2 className={"mb-1 heading desktop"}>{t("Profile Details")}</h2>
        <Row>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label for="username" className="font-bold">
                {t("Username")}
              </Label>
              {data?.username ? data?.username : "--"}
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label for="status" className="font-bold">
                {t("Status")}
              </Label>
              <Badge
                className="text-capitalize"
                color={data?.status === STATUS_CONSTANT.DELETED ? statusObj["danger"] : data?.status === STATUS_CONSTANT.INACTIVE ? statusObj[false] : statusObj[true]}
                pill
              >
                {t(statusUser(data?.status))}
              </Badge>
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label for="full-name" className="font-bold">
                {t("Full name")}
              </Label>
              {data?.full_name ? data?.full_name : "--"}
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label className={"label font-bold"} for="email">
                Email
              </Label>
              {data?.email ? data?.email : "--"}
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label className={"label font-bold"} for="phone">
                {t("Phone number")}
              </Label>
              {data?.phone ? data?.phone : "--"}
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup className="form-group">
              <Label className={"label font-bold"} for="country">
                {t("Country")}
              </Label>
              {data?.countryName || "--"}
            </FormGroup>
          </Col>
          <Col md="12" sm="12">
            <FormGroup className="form-group">
              <Label className={"label font-bold"} for="address">
                {t("Address")}
              </Label>
              <p>{data?.address ? data?.address : "--"}</p>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ProfileInformation
