import classnames from 'classnames'
import { Spin } from "antd"

const ComponentSpinner = ({ className }) => {
  return (
    <div
      className={classnames('fallback-spinner', {
        [className]: className
      })}
    >
      <Spin size="large" />
    </div>
  )
}

export default ComponentSpinner
