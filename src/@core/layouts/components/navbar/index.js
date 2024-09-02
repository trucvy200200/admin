// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"
import NavbarHistory from "./NavbarHistory"

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarHistory />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
