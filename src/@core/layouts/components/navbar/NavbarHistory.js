// ** React Imports
import { useLocation, useNavigate } from "react-router-dom"
import { HiArrowLongLeft } from "react-icons/hi2"
import { useTranslation } from "react-i18next"

const renderCurrentPath = (pathname, t) => {
  switch (pathname) {
    case "/dashboard":
      return t("Dashboard")
    case "/profile":
      return t("Profile")

    default:
      break
  }
}

const NavbarHistory = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div id="goBack" onClick={() => navigate(-1)}>
      {location.pathname !== "/dashboard" && (
        <>
          <HiArrowLongLeft size={35} />
          <h6>{renderCurrentPath(location.pathname, t)}</h6>
        </>
      )}
    </div>
  )
}

export default NavbarHistory
