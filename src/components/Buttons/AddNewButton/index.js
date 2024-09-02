import { Col, Row } from "reactstrap"
import { Plus } from "react-feather"
import React from "react"

const Index = (props) => {
  return (
    <Row className="d-flex align-items-center justify-content-end m-0">
      <Col md={2} className="d-flex align-items-center justify-content-end p-0">
        <button className={"btn btn-primary white-space-nowrap"} onClick={props?.onClick}>
          <Plus color={"white"} size={18} /> {props?.text}
        </button>
      </Col>
    </Row>
  )
}
export default Index
