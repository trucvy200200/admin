// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import NavbarUser from "./NavbarUser"
import NavbarHistory from "./NavbarHistory"
import NavbarBookmarks from "./NavbarBookmarks"

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, isHidden, setMenuVisibility } = props

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        {!isHidden && <NavbarBookmarks setMenuVisibility={setMenuVisibility} />}
        <NavbarHistory />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
