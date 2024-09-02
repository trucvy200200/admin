// ** React Imports
import { useState } from "react"
import { Card, Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import { X, Check, AlignJustify, Edit, User, Lock } from "react-feather"
import { DragDrop } from "@uppy/react"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { useDispatch } from "react-redux"
import { instancesV4 } from "@src/@core/plugin/axios"
import { updateProfile } from "../../store/action"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { toast } from "react-hot-toast"
import { imageFileCheck, allowedFileTypes } from "@utils"
import avatar from "@src/assets/images/imgs/im_user.png"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import { LazyLoadImage } from "react-lazy-load-image-component"
import ProfileBackground from '@src/assets/images/backgrounds/profile-bg.png'

import "react-lazy-load-image-component/src/effects/blur.css"

const ProfileHeader = ({ t, setActiveTab, activeTab, data }) => {
  // ** States
  const profileLocal = JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserData))
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState(data)
  const [isChoose, setIsChoose] = useState(false)
  const [pending, setPending] = useState(false)
  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen)

  const uppy = new Uppy({
    meta: { type: "avatar" },
    autoProceed: true,
    restrictions: { allowedFileTypes }
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    setPending(true)
    data.avatar_file = file.data
    const result = imageFileCheck(file?.name)
    if (!result) {
      toast.error(<ErrorNotificationToast message={t(`Invalid file!`)} />)
      return
    }
    setEditData({ ...editData, avatar: preview, avatar_file: file.data })
    setIsChoose(true)
    setPending(false)
  })

  const handleReset = () => {
    data.avatar_file = null
    setEditData({ ...editData, avatar: data.avatar, avatar_file: "" })
    setIsChoose(false)
  }

  const handleSave = async () => {
    setPending(true)
    const userData = {}
    if (editData?.avatar_file) {
      const uploads = [editData?.avatar_file].map((item) => {
        const formData = new FormData()
        formData.append("file", item)
        return instancesV4.post("setting/file/upload", formData)
      })
      Promise.all(uploads).then((values) => {
        userData.avatar = values[0]?.data?.data?.fileUrl
        dispatch(
          updateProfile(
            userData,
            { ...editData, avatar: values[0]?.data?.data?.fileUrl },
            (message) => {
              toast.success(<SuccessNotificationToast message={`${t(message)}!`} />)
              setIsChoose(false)
            },
            (message) => toast.error(<ErrorNotificationToast message={`${t(message)}!`} />),
            () => setPending(false)
          )
        )
        localStorage.setItem(jwtDefaultConfig.storageUserData, JSON.stringify({ ...editData, avatar: values[0]?.data?.data?.fileUrl, ability: profileLocal.ability }))
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
      localStorage.setItem(jwtDefaultConfig.storageUserData, JSON.stringify({ ...editData, ability: profileLocal.ability }))
    }
  }

  return (
    <>
      {pending && <LoadingBackground />}
      <Card className="profile-header mb-2">
        <LazyLoadImage
          alt={""}
          height={"100%"}
          src={ProfileBackground}
          width={"100%"}
          effect="blur"
          className="card-img-top"
        />
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
              <LazyLoadImage alt="Card image" height={"100%"} src={editData?.avatar ? editData?.avatar : avatar} width={"100%"} effect="blur" className="rounded img-fluid w-100 h-100" />
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
                    <NavLink className="fw-bold d-flex align-items-center gap-50" active={activeTab === "1"} onClick={() => setActiveTab("1")}>
                      <User size={14} />
                      <span className="d-none d-lg-block">{t("Information")}</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="fw-bold d-flex align-items-center gap-50" active={activeTab === "2"} onClick={() => setActiveTab("2")}>
                      <Lock size={14} />
                      <span className="d-none d-lg-block">{t("Security")}</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Collapse>
          </Navbar>
        </div>
      </Card>
    </>
  )
}

export default ProfileHeader
