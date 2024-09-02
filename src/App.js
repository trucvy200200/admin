import React from "react"
import { notification } from "antd"

// ** Router Import
import Router from "./router/Router"

const App = () => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <>
      {contextHolder}
      <Router />
    </>
  )
}

export default App
