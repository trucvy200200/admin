// ** React Imports
import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils
import { isUserLoggedIn } from "@utils"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "@store/actions/auth"
import instances, { instancesV2 } from "@src/@core/plugin/axios"
import { getMyProfile } from "@pages/users/profile/store/action"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { User, Power } from "react-feather"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/imgs/im_user.png"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { useTranslation } from "react-i18next"
import currencyFormat from "@src/utility/UtilityFormat"

const UserDropdown = () => {
  const { t } = useTranslation()
  // ** Store Vars
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state?.profiles?.user)
  const settings = useSelector((state) => state?.profiles?.setting)
  const wallet = useSelector((state) => state?.wallet)
  const packages = useSelector((state) => state.packages)
  const [loading, setLoading] = useState(false)
  const id = useRef()

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      // dispatch(getMyProfile())
    }
  }, [packages?.buyPending, wallet?.pending])

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      id.current = setInterval(() => {
        // dispatch(getMyProfile())
      }, 60000)
    }
    return () => clearInterval(id.current)
  }, [])

  //** Vars
  const userAvatar = (userData && userData?.avatar?.includes("http") && userData?.avatar) || defaultAvatar

  const handleLogoutUser = async () => {
    setLoading(true)
    instancesV2
      .post("/log-out")
      .then(() => {
        setLoading(false)
        dispatch(handleLogout())
        navigate("/login")
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <LoadingBackground />}
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
          <Avatar img={userAvatar} className={`bg-white ${userAvatar ? "" : "default"}`} />
          <div className="user-nav d-sm-flex align-items-start d-none">
            <span className="user-name font-weight-bold">{JSON.parse(localStorage.getItem("userDataAdmin"))?.name || "---"}</span>
          </div>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag={Link} to="/profile">
            <User size={16} style={{ marginRight: "7.5px" }} />
            <span className="align-middle">{t("Profile")}</span>
          </DropdownItem>
          <DropdownItem onClick={handleLogoutUser}>
            <Power size={16} style={{ marginRight: "7.5px" }} />
            <span className="align-middle">{t("Logout")}</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

export default UserDropdown
