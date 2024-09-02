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
import instances, { instancesV4, instancesV6 } from "@src/@core/plugin/axios"
import { getMyProfile } from "@pages/users/profile/store/action"
import { getUserWaitingReview, getTotalPendingContracts, SET_COUNTRIES } from "@pages/users/store/action"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { User, Power } from "react-feather"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/imgs/im_user.png"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { useTranslation } from "react-i18next"
import { PERMISSION_SCREEN_ENUM } from "@constants/permission-screens-constant"
import { useCheckPermission } from "@hooks/useCheckPermission"
import currencyFormat from "@src/utility/UtilityFormat"

const UserDropdown = () => {
  const { t } = useTranslation()
  // ** Store Vars
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { checkPermission } = useCheckPermission()
  const userData = useSelector((state) => state?.profiles?.user)
  const settings = useSelector((state) => state?.profiles?.setting)
  const wallet = useSelector((state) => state?.wallet)
  const packages = useSelector((state) => state.packages)
  const [loading, setLoading] = useState(false)
  const id = useRef()

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      dispatch(getMyProfile())
      instancesV4.get("/setting").then((res) => {
        if (res?.data?.data) {
          dispatch({ type: "GET_SETTING", data: res?.data?.data })
        } else {
          dispatch({ type: "GET_SETTING", data: null })
        }
      })
    }
  }, [packages?.buyPending, wallet?.pending])

  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      id.current = setInterval(() => {
        dispatch(getMyProfile())
      }, 60000)
    }
    instancesV4.get("/country/all").then((res) => {
      if (res.data.data) {
        dispatch({ type: SET_COUNTRIES, data: res.data.data })
      }
    })
    return () => clearInterval(id.current)
  }, [])

  //** Vars
  const userAvatar = (userData && userData?.avatar?.includes("http") && userData?.avatar) || defaultAvatar

  const handleLogoutUser = async () => {
    setLoading(true)
    const resLocation = await instancesV6
      .get("")
      .then((res) => res)
      .catch(() => null)
    instances
      .post("/auth/admin/logout", { ip: resLocation?.data?.ip || "" })
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
            <span className="user-name font-weight-bold">{userData?.full_name || "---"}</span>
            <h6 className="ml-50 mb-0 text-white">
              {userData?.amount ? currencyFormat(userData?.amount) : 0} {settings?.coin_char ? t(String(settings?.coin_char)) : "--"}
            </h6>
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
