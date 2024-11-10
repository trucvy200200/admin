// ** React Imports
import Edit from "./Edit"
import { useSelector } from "react-redux"
import { Card, CardBody, Row, Col } from "reactstrap"

// ** Styles
import "@styles/react/apps/app-users.scss"

const ModalEdit = (props) => {
  // ** States & Vars
  const { data, t, handleNoButton, handleGetUpdateData } = props
  const store = useSelector((state) => state.users)
  return (
    <Row>
      <Col sm="12">
        <Card className="m-0">
          <CardBody className="pt-2 px-0 pb-0">
            <Edit store={store} data={data} t={t} handleNoButton={handleNoButton} handleGetUpdateData={handleGetUpdateData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default ModalEdit
