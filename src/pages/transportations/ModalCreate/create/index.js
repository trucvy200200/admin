// ** React Imports
import Create from "./Create"
import { useSelector } from "react-redux"
import { Card, CardBody, Row, Col } from "reactstrap"

// ** Styles
import "@styles/react/apps/app-users.scss"

const ModalCreate = (props) => {
  // ** States & Vars
  const { t, handleNoButton, handleGetData } = props
  const store = useSelector((state) => state.users)
  return (
    <Row>
      <Col sm="12">
        <Card className="m-0">
          <CardBody className="pt-2 px-0 pb-0">
            <Create store={store} t={t} handleGetData={handleGetData} handleNoButton={handleNoButton} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default ModalCreate
