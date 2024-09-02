// ** Logo
import logo from '@src/assets/images/logo/ic_logo.png'
import { Spin } from "antd"

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src={logo} alt='logo' />
      <Spin size="large" />
    </div>
  )
}

export default SpinnerComponent
