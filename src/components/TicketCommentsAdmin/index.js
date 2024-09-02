import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import CommentCard from "./CommentCard"
import { imageTypeRegex, getImageFromLocal } from "@utils"
import { IMAGE_SIZE_MAX, IMAGE_LENGTH_MAX } from "@constants/base-constant"
import { TICKET_STATUS } from "@constants/users-constant"
import { FormGroup } from "reactstrap"
import { XCircle } from "react-feather"
import { AiOutlinePicture } from "react-icons/ai"
import Lightbox from "react-image-lightbox"
import { Tooltip } from "antd"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { createAdminTicketComment, getAdminTicketComments } from "@src/pages/adminTicket/store/action"
import PerfectScrollbar from "react-perfect-scrollbar"
import {uploadFile} from "@store/actions/common"

import "react-image-lightbox/style.css"
import "./styles.scss"
import "@styles/react/libs/swiper/swiper.scss"
const TicketCommentsAdmin = ({ id, status }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const submitButton = useRef(null)
  const inputComment = useRef(null)
  const scrollRef = useRef(null)
  const wrapperRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [comment, setComment] = useState()
  const [error, setError] = useState("")
  const [images, setImages] = useState([])
  const [indexActive, setIndexActive] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const [scrollEl, setScrollEl] = useState()
  const {list: comments, total: totalComment, params: ticketParams} = useSelector((state) => state.adminTicket?.ticketComments)
  const [firstTime, setFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const [rowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(+ticketParams?.offset > 0 ? +ticketParams?.offset / rowsPerPage : 1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (id) {
      getDataTicketComment()
    }
  }, [id])

  const fetchData = async () => {
    if (!hasMore) {
      return
    }

    setIsLoading(true)

    if (comments?.length !== 0 && comments?.length === totalComment) {
      setHasMore(false)
    } else {
      const result = await dispatch(getAdminTicketComments(id, setPending, { limit: rowsPerPage, offset: currentPage + 1 === 1 ? 0 : (currentPage + 1 - 1) * rowsPerPage }))
      if (scrollEl) {
        const current = scrollEl?.children[result?.length === 10 ? 9 : 0]
        scrollEl.scrollTop = current?.offsetTop + current?.offsetHeight
      }
      setCurrentPage(currentPage + 1)
    }

    setIsLoading(false)
  }

  const handleScroll = (e) => {
    const { scrollTop } = e.target
    if (isLoading) return
    if (scrollTop <= 50) {
      fetchData()
    }
  }

  const getDataTicketComment = () => {
    if (pending) return
    setFirstTime(true)
    dispatch(getAdminTicketComments(id, setPending, { limit: rowsPerPage, offset: 0 }, true))
    setFirstTime(false)
  }

  const handleShowOff = () => setIndexActive(null)

  const toggleActive = (index) => setIndexActive(index)

  const handleShowFullImage = (index) => {
    setIndexActive(index)
    setSelectedImage(index)
  }

  const handleRemoveImage = (index) => {
    images.splice(index, 1)
    setImages([...images])
    if (images?.length === 0) setIsDisabled(true)
  }

  const onDragLeave = () => wrapperRef.current.classList.remove("dropUpload")

  const handleSubmitTicketComment = async (obj) => {
    await createAdminTicketComment(
      id,
      obj,
      () => {
        toast.success(<SuccessNotificationToast message={t("Send comment successfully!")}/>)
        setComment("")
        setImages([])
        setFocusInput()
        setIsDisabled(true)
        getDataTicketComment()
        setCurrentPage(1)
        scrollToBottom()
      },
      (message) => toast.error(<ErrorNotificationToast message={t(message || "Send comment failed!")}/>),
      () => setLoading(false)
    )
  }

  const handleSendCmt = async (e) => {
    if (loading) return
    e.preventDefault()
    if (comment || images?.length > 0) {
      setLoading(true)
      const obj = {images: []}
      if (comment) obj.context = comment
      if (images?.length > 0) {
        for (const image of images) {
          const item = await uploadFile(image?.imageFile)
          if (item) {
            obj.images.push(item)
          }
        }
        handleSubmitTicketComment(obj).then()
      } else {
        handleSubmitTicketComment(obj).then()
      }
    } else {
      setError(t("Please type your comment!"))
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [scrollEl, firstTime])

  function scrollToBottom() {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl?.scrollHeight
    }
  }

  function setFocusInput() {
    const div = inputComment?.current
    div.innerHTML = ""
    inputComment?.current.focus()
  }

  function setFocusSend() {
    submitButton.current?.focus()
  }

  const changeHandler = (e) => {
    const { files } = e.target

    const validImageFiles = []
    if (files.length > IMAGE_LENGTH_MAX) {
      return toast.error(<ErrorNotificationToast message={`${t("Maximum limit of")} ${IMAGE_LENGTH_MAX} ${t("images")}`} />)
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.match(imageTypeRegex)) {
        if (file.size / 1024 < IMAGE_SIZE_MAX) {
          validImageFiles.push({
            imageFile: file,
            imageURL: getImageFromLocal(file)
          })
        } else {
          toast.error(<ErrorNotificationToast message={t(`Size exceeds the prescribed limit!`)} />)
        }
      }
    }
    if (validImageFiles.length) {
      setImages([...images, ...validImageFiles])
      setIsDisabled(false)
      setFocusSend()
      setError(false)
      return
    }
    toast.error(<ErrorNotificationToast message={t(`Invalid file!`)} />)
  }

  const renderPreview = () => {
    return (
      <>
        {images.map((item, index) => {
          return (
            <div className="image-form" key={index} onMouseOver={() => toggleActive(index)} onMouseOut={handleShowOff}>
              <XCircle size={24} className="delete-icon" onClick={() => handleRemoveImage(index)} visibility={index === indexActive ? "visible" : "hidden"} />
              <div className="image-wrapper" onClick={() => handleShowFullImage(index)}>
                <img
                  key={index}
                  className={`add-image__item-image ${item?.imageURL && item?.imageURL.includes("http") ? "" : "default"}`}
                  src={item?.imageURL && item?.imageURL.includes("http") ? item?.imageURL : ""}
                  alt="icon picture"
                />
              </div>
            </div>
          )
        })}
        {selectedImage !== null && (
          <div className="lightbox">
            <Lightbox
              mainSrc={images[selectedImage]?.imageURL}
              nextSrc={images[(selectedImage + 1) % images.length]?.imageURL}
              prevSrc={images[(selectedImage + images.length - 1) % images.length]?.imageURL}
              onCloseRequest={() => setSelectedImage(null)}
              onMovePrevRequest={() => setSelectedImage((selectedImage + images.length - 1) % images.length)}
              onMoveNextRequest={() => setSelectedImage((selectedImage + 1) % images.length)}
            />
          </div>
        )}
      </>
    )
  }

  const handleEnterPressed = (e) => {
    if (isDisabled) return
    if (e.keyCode == 13 && !e.shiftKey) {
      handleSendCmt(e)
    }
  }

  return (
    <div className="prod_reviews w-100">
      <h3 className={"label font-bold"} htmlFor="comments">
        {t("Comments")}
      </h3>
      {(status === TICKET_STATUS.PROCESSING || status === TICKET_STATUS.NEW_REQUEST) && (
        <>
        <div className="mx-2 comment_container" style={{ marginTop: "15px" }}>
          <div className="input_form">
            <div className="w-100 input-wrapper">
              <span
                ref={inputComment}
                className="textarea"
                role="textbox"
                placeholder={`${t("Type your message")}...`}
                contentEditable
                onInput={(e) => {
                  const commentContent = e.currentTarget.outerHTML.replace(`contenteditable="true"`, "")
                  setComment(commentContent)
                  if (e.currentTarget.textContent.length === 0) return setIsDisabled(true)
                  setIsDisabled(false)
                  setError(false)
                }}
                onKeyDown={handleEnterPressed}
              ></span>
              <div className="d-flex align-items-center justify-content-between controls">
                <Tooltip title={t("Attach images")} placement="top">
                  <label htmlFor="chat_message_images" className="cursor-pointer button">
                    <AiOutlinePicture size={24} />
                    <input
                      onDragLeave={onDragLeave}
                      id="chat_message_images"
                      className="drop-active"
                      accept="image/*"
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => {
                        changeHandler(e)
                      }}
                    />
                  </label>
                </Tooltip>
                <button ref={submitButton} onClick={handleSendCmt} disabled={loading || isDisabled} className={`button submit-btn ${loading || isDisabled ? "not-allowed" : ""}`}>
                  {t("Send")}
                </button>
              </div>
            </div>
            {error && <p className="text-danger p-0 m-0">{error}</p>}
            {images?.length > 0 && <FormGroup className="image-container p-0 form-group">{renderPreview()}</FormGroup>}
          </div>
        </div>
      </>
      )}
      <div className="comment_list_wrapper">
        <PerfectScrollbar
          containerRef={(el) => {
            scrollRef.current = el
            setScrollEl(el)
          }}
          component="ul"
          className="comment_list scrollable-container"
          options={{
            wheelPropagation: false
          }}
          onScroll={handleScroll}
        >
          {comments?.length > 0 ? comments?.map((item, index) => <CommentCard key={index} {...item} />) : <li className="my-2">{t("No comment yet")}</li>}
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default TicketCommentsAdmin
