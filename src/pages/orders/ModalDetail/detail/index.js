// ** React Imports
import Detail from "./Detail"
import { useSelector } from "react-redux"
import { Card, CardBody, Row, Col, TabContent, TabPane, Nav, NavLink, NavItem, Button } from "reactstrap"
import { useState } from "react"
import OrderHistoryTab from "./orderHistoryTab/list"

// ** Styles
import "@styles/react/apps/app-users.scss"

const ModalDetail = (props) => {
  // ** States & Vars
  const { t, handleNoButton, handleGetData } = props
  const order = useSelector((state) => state.orders.detail)
  const [activeTab, setActiveTab] = useState("1")

  return (
    <Row>
      <Col sm="12">
        <Card className="m-0">
          <CardBody className="pt-2 px-0 pb-0">
            <Nav className="align-items-center justify-content-start flex-wrap" pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => setActiveTab("1")}>
                  {t("Order information")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === "2"} onClick={() => setActiveTab("2")}>
                  {t("Adult list")}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === "3"} onClick={() => setActiveTab("3")}>
                  {t("Child list")}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Detail detail={order} />
              </TabPane>
              <TabPane tabId="2">
                <OrderHistoryTab row={order?.adults} />
              </TabPane>
              <TabPane tabId="3">
                <OrderHistoryTab row={order?.children} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default ModalDetail
