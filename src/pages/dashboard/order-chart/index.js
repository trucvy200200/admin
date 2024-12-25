// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"

// ** Third Party Components
import { PieChart, Pie, ResponsiveContainer, Sector, Cell } from "recharts"

import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { memo, useState } from "react"
import { ORDER_STATUS } from "@constants/base-constant"

import "@styles/react/libs/charts/recharts.scss"

const colors = ["#DC3912", "#3366CC", "#FF9900", "#AAAA11", "#22AA99"]

const renderOrderStatus = (value) => {
  switch (value) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "Waiting confirm"
    case ORDER_STATUS.REFUND_COMPLETED:
      return "Refund completed"
    case ORDER_STATUS.CANCELLED:
      return "Cancelled by customer"
    case ORDER_STATUS.COMPLETED:
      return "Completed"
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "Cancelled by admin"
    default:
      break
  }
}

const OrderPieChart = () => {
  const { t } = useTranslation()
  const store = useSelector((state) => state?.dashboard?.orderChart)
  const [activeIndex, setActiveIndex] = useState(0)
  // ** Chart Data
  const data = store?.dataOrder?.map((item, index) => ({ name: renderOrderStatus(item?.status), value: item?.count || 0, color: colors[index < 10 ? index : 8] }))

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.value}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      </g>
    )
  }

  const onPieEnter = (_, index) => setActiveIndex(index)

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="title">
          {t("Total orders")}
        </CardTitle>
        <small className="mt-50 text-white">
          {t("Number of orders")}: <b>{store?.total}</b>
        </small>
      </CardHeader>

      <CardBody>
        <div className="recharts-wrapper">
          <ResponsiveContainer height={300}>
            <PieChart height={300}>
              <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={100} outerRadius={150} dataKey="value" onMouseEnter={onPieEnter}>
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} label />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {data?.map((item, index) => {
            return (
              <div className="me-2" key={index}>
                <span className="bullet bullet-sm bullet-bordered me-50" style={{ backgroundColor: item?.color }}></span>
                <span className="me-75">{item?.name || ""}</span>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
export default memo(OrderPieChart)
