// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"
import { useTranslation } from "react-i18next"

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/not-authorized.svg"
import illustrationsDark from "@src/assets/images/pages/not-authorized-dark.svg"
import logo from "@src/assets/images/logo/ic_logo.png"

// ** Styles
import "@styles/base/pages/page-misc.scss"

const NotAuthorized = () => {
  const { t } = useTranslation()
  // ** Hooks
  const { skin } = useSkin()

  // ** Vars
  const user = getUserData()

  const source = skin === "dark" ? illustrationsDark : illustrationsLight

  return (
    <div className="misc-wrapper">
      <Link className="brand-logo" to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img className="inner-logo" src={logo} alt="logo" style={{ width: "60px" }} />
        <h2 className="text-primary" style={{ fontWeight: "bold" }}>
          WOLCG
        </h2>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">{t("You are not authorized")}! 🔐</h2>
          <p className="mb-2">{t("Please contact the customer support department for assistance")}.</p>
          <Button tag={Link} color="primary" className="btn-sm-block mb-1" to={user ? getHomeRouteForLoggedInUser() : "/"}>
            {t("Back to Home")}
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
