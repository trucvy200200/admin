// ** Third Party Components
import { Line } from "react-chartjs-2"
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { convertDateTimeString } from "@src/utility/ConvertDate"

import "chart.js/auto"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/libs/charts/recharts.scss"

const RevenueChart = () => {
  const { t } = useTranslation()
  const dataChart = useSelector((state) => state?.dashboard?.revenueChart || [])

  const setUnionArr = () => {
    let newArr = (dataChart?.dataOrder?.[0]?.dailyData || []).map((item) => item?.day + "/" + dataChart?.dataOrder?.[0]?._id?.month + "/" + dataChart?.dataOrder?.[0]?._id?.year)
    return newArr
  }
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        scaleLabel: { display: true }
      }
    },
    plugins: {
      legend: {
        align: "start",
        position: "top",
        labels: {
          boxWidth: 20,
          marginBottom: 25,
          usePointStyle: true
        }
      }
    }
  }

  const data = {
    labels: setUnionArr(),
    datasets: [
      {
        data: dataChart?.dataOrder?.[0]?.dailyData?.map((value) => value?.dailyDeposit),
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: t("Revenue"),
        pointHoverRadius: 5,
        pointStyle: "circle",
        pointHoverBorderWidth: 5,
        borderColor: "#89c251",
        backgroundColor: "#89c251"
      }
    ]
  }

  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20
        }
      }
    }
  ]

  return (
    <Card>
      <CardHeader className="d-block justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <div>
          <CardTitle className="mb-75" tag="h4">
            {t("Statistics of revenue in the last 30 days")}
          </CardTitle>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "450px", width: "100%" }}>
          <Line data={data} options={options} height={450} plugins={plugins} />
        </div>
      </CardBody>
    </Card>
  )
}

export default RevenueChart
