// ** React Imports
import { useState } from "react"

import InputTab from "./InputTab"

// ** Third Party Components
import { Mail } from "react-feather"
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"

// ** Styles
import "@styles/react/apps/app-users.scss"

const InputTabContainer = (props) => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState("1")
  const { t } = props

  // ** Function to toggle tabs
  const toggle = (tab) => setActiveTab(tab)

  return (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card className="m-0">
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <Mail size={16} />
                  <span className="align-middle d-none d-sm-block">{t("Please check your mail")}</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <InputTab {...props} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}
export default InputTabContainer
