// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown"
import UserDropdown from "./UserDropdown"
// import NotificationDropdown from './NotificationDropdown'

const NavbarUser = (props) => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      {/* <NotificationDropdown /> */}
      <IntlDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
