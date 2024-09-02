import React from "react"
import logo from '@src/assets/images/logo/ic_logo_large.png'

export const NoDataComponent = (props) => {
    return (
        <div className='text-center no-data-component'>
            <img src={logo} alt="" className={`mt-2 mb-1`} />
            <div>{props?.message}</div>
        </div>
    )
}
