import React from "react"
import logo from "@src/assets/images/logo/ic_logo_large.png"

export const NoDataComponent = (props) => {
  return (
    <div className="text-center no-data-component">
      <div className="my-4">{props?.message}</div>
    </div>
  )
}
