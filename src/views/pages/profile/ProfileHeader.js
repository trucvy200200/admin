// ** React Imports
import { useState } from "react"

import { X, Check } from "react-feather"
import { DragDrop } from "@uppy/react"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { useDispatch } from "react-redux"
import instances from "@src/@core/plugin/axios"
import { updateProfile } from "@pages/users/profile/store/action"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { toast } from "react-hot-toast"
import { AlignJustify, Edit } from "react-feather"
import avatar from "@src/assets/images/imgs/im_user.png"
import { User, Lock } from "react-feather"
import { IoWalletOutline } from "react-icons/io5"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap"
import ProfileBackground from '@src/assets/images/backgrounds/profile-bg.png'

const ProfileHeader = ({ t, setActiveTab, activeTab, data, sponsor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState(data)
  const [isChoose, setIsChoose] = useState(false)
  const [pending, setPending] = useState(false)
  const dispatch = useDispatch()

  const toggle = () => setIsOpen(!isOpen)

  const uppy = new Uppy({
    meta: { type: "avatar" },
    autoProceed: true,
    restrictions: { allowedFileTypes: ["image/*"] }
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    data.avatar_file = file.data
    setEditData({ ...editData, avatar: preview, avatar_file: file.data })
    setIsChoose(true)
  })

  const handleReset = () => {
    data.avatar_file = null
    setEditData({ ...editData, avatar: "", avatar_file: "" })
    setIsChoose(false)
  }

  const handleSave = async () => {
    setPending(true)
    const userData = {}
    if (editData?.avatar_file) {
      const uploads = [editData?.avatar_file].map((item) => {
        const formData = new FormData()
        formData.append("file", item)
        return instances.post("/file", formData)
      })
      Promise.all(uploads).then((values) => {
        userData.avatar = values[0].data.url
        dispatch(
          updateProfile(
            userData,
            { ...editData, avatar: values[0].data.url },
            (message) => {
              toast.success(<SuccessNotificationToast message={`${t(message)}!`} />)
              setIsChoose(false)
            },
            (message) => toast.error(<ErrorNotificationToast message={`${t(message)}!`} />),
            () => setPending(false)
          )
        )
      })
    } else {
      userData.avatar = ""
      dispatch(
        updateProfile(
          userData,
          { ...editData, avatar: "" },
          (message) => {
            toast.success(<SuccessNotificationToast message={`${t(message)}!`} />)
            setIsChoose(false)
          },
          (message) => toast.error(<ErrorNotificationToast message={`${t(message)}!`} />),
          () => setPending(false)
        )
      )
    }
  }

  return (
    <Card className="profile-header mb-2">
      <CardImg src={ProfileBackground} alt="User Profile Image" top />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            {!isChoose ? (
              <div className="edit-avatar rounded">
                <Edit size={20} />
                <div className="uppy-wrapper">
                  <DragDrop uppy={uppy} />
                </div>
              </div>
            ) : (
              <>
                <div className="edit-avatar rounded check" onClick={handleSave}>
                  <Check size={20} />
                </div>
                <div className="edit-avatar rounded close" onClick={handleReset}>
                  <X size={20} />
                </div>
              </>
            )}
            <img className="rounded img-fluid w-100 h-100" src={editData?.avatar ? editData?.avatar : avatar} alt="Card image" />
          </div>
        </div>
        <div className="qr-img-container align-items-center">
          <div className="profile-img">
            <img className="rounded img-fluid" src={editData?.qrInfo} alt="Qr-code" />
          </div>

          <div className="sponsor-wrapper ms-2">
            <p className="title">{t("Sponsor")}</p>
            <p className="full_name">
              {t("Full name")}: <b>{sponsor?.full_name}</b>
            </p>
            <p className="username">
              {t("Username")}: <b>{sponsor?.username}</b>
            </p>
            <p className="phone">
              {t("Phone number")}: <b>{sponsor?.phone}</b>
            </p>
          </div>
        </div>
      </div>
      <div className="profile-header-nav">
        <Navbar container={false} className="justify-content-end justify-content-lg-between w-100" expand="lg" light>
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                <NavItem>
                  <NavLink className="fw-bold" active={activeTab === "1"} onClick={() => setActiveTab("1")}>
                    <span className="d-none d-lg-block">{t("Information")}</span>
                    <User className="d-block d-lg-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="fw-bold" active={activeTab === "2"} onClick={() => setActiveTab("2")}>
                    <span className="d-none d-lg-block">{t("Security")}</span>
                    <Lock className="d-block d-lg-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="fw-bold" active={activeTab === "3"} onClick={() => setActiveTab("3")}>
                    <span className="d-none d-lg-block">{t("Wallet")}</span>
                    <IoWalletOutline className="d-block d-lg-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="fw-bold" active={activeTab === "4"} onClick={() => setActiveTab("4")}>
                    <span className="d-none d-lg-block">{t("Online contract")}</span>
                    <HiOutlineClipboardDocumentList className="d-block d-lg-none" size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
