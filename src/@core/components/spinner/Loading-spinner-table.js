import classnames from 'classnames'
import { Spin } from "antd"

const ComponentSpinner = ({ className }) => {
  return (
    <div
      className={classnames('fallback-spinner-table', {
        [className]: className
      })}
    >
      <Spin size="large" />
    </div>
  )
}

export default ComponentSpinner
