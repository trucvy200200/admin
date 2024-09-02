// ** React Imports
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Button } from "reactstrap"

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin"
import { useTranslation } from "react-i18next"

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/error.svg"
import illustrationsDark from "@src/assets/images/pages/error-dark.svg"
import logo from "@src/assets/images/logo/ic_logo.png"

// ** Styles
import "@styles/base/pages/page-misc.scss"

const Error = () => {
  const { t } = useTranslation()
  // ** Hooks
  const { skin } = useSkin()

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
          <h2 className="mb-1">{t("Page Not Found")} 🕵🏻‍♀️</h2>
          <p className="mb-2">{t("Oops! 😖 The requested URL was not found on this server")}.</p>
          <Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
          {t("Back to Home")}
          </Button>
          <img className="img-fluid" src={source} alt="Not authorized page" />
        </div>
      </div>
    </div>
  )
}
export default Error
