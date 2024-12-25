import { Col, Row } from "reactstrap"
import OrderChart from "./order-chart"
import RevenueChar from "./revenue-chart"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getOrderChart, getRevenueChart } from "./store/action"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getOrderChart(setLoading, {}))
    dispatch(getRevenueChart(setLoading, {}))
  }, [])

  return (
    <Row>
      {loading && <LoadingBackground />}
      <Col lg={12} sm={12}>
        <div className="welcome mt-md-0 mt-1">Hi, Welcome back</div>
      </Col>

      <Col lg={12} sm={12}>
        <OrderChart />
      </Col>
      <Col lg={12} sm={12}>
        <RevenueChar />
      </Col>
    </Row>
  )
}

export default Dashboard
