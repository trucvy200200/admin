import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import CommentCard from "./CommentCard"
import { imageTypeRegex, getImageFromLocal } from "@utils"
import { IMAGE_SIZE_MAX, IMAGE_LENGTH_MAX } from "@constants/base-constant"
import { TICKET_STATUS } from "@constants/users-constant"
import { FormGroup } from "reactstrap"
import { XCircle } from "react-feather"
import { BsCameraFill } from "react-icons/bs"
import { IoSend } from "react-icons/io5"
import Lightbox from "react-image-lightbox"
import { Tooltip } from "antd"
import { toast } from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import { instancesV4 } from "@src/@core/plugin/axios"
import { createTicketComment, getTicketComment, updateTicketComment } from "@src/pages/ticket/adminNormal/manage/store/action"
import { store } from "@store/storeConfig/store"
import PerfectScrollbar from "react-perfect-scrollbar"

import "react-image-lightbox/style.css"
import "./styles.scss"

const TicketComments = ({ id, status }) => {
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
  const comments = useSelector((state) => state.ticketUser?.ticketComment)
  const totalComment = useSelector((state) => state.ticketUser?.totalComment)
  const ticketParams = useSelector((state) => state.ticketUser?.params)
  const [firstTime, setFirstTime] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pending, setPending] = useState(true)
  const [rowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(+ticketParams?.offset > 0 ? +ticketParams?.offset / 10 : 1)
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
      const result = await store.dispatch(getTicketComment(id, setPending, { limit: rowsPerPage, offset: currentPage + 1 === 1 ? 0 : (currentPage + 1 - 1) * rowsPerPage }))
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

  const getDataTicketComment = async () => {
    setFirstTime(true)
    await store.dispatch(updateTicketComment(id, setPending, { limit: rowsPerPage, offset: 0 }))
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

  const handleSendCmt = (e) => {
    e.preventDefault()
    if (comment || images?.length > 0) {
      setLoading(true)
      const obj = {}
      if (comment) obj.context = comment
      if (images?.length > 0) {
        const uploads = images.map((item) => {
          const formData = new FormData()
          formData.append("file", item?.imageFile)
          return instancesV4.post("setting/file/upload", formData)
        })
        Promise.all(uploads).then(function (res) {
          obj.images = res.map((item) => item?.data?.data?.fileUrl)
          dispatch(
            createTicketComment(
              id,
              obj,
              {
                toast,
                success: (message) => {
                  setComment("")
                  setImages([])
                  setFocusInput()
                  setIsDisabled(true)
                  getDataTicketComment()
                  setCurrentPage(1)
                  scrollToBottom()
                  return <SuccessNotificationToast message={t(message)} />
                },
                error: (message) => <ErrorNotificationToast message={t(message)} />
              },
              () => setLoading(false)
            )
          )
        })
      } else {
        dispatch(
          createTicketComment(
            id,
            obj,
            {
              toast,
              success: (message) => {
                setComment("")
                setImages([])
                setIsDisabled(true)
                setFocusInput()
                setCurrentPage(1)
                getDataTicketComment()
                scrollToBottom()
                return <SuccessNotificationToast message={t(message)} />
              },
              error: (message) => <ErrorNotificationToast message={t(message)} />
            },
            () => setLoading(false)
          )
        )
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
    return
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
      {status !== TICKET_STATUS.COMPLETED && status !== TICKET_STATUS.CANCELLED && status !== TICKET_STATUS.NEW_REQUEST && (
        <>
          <h3 className="mt-1">{t("Leave a comment")}</h3>
          <div className="comment_container" style={{ marginTop: "15px" }}>
            <div className="input_form">
              <div className="w-100 input-wrapper" style={{ border: `1px solid ${error ? "#ea5455" : "transparent"}` }}>
                <span
                  ref={inputComment}
                  className="textarea"
                  role="textbox"
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
                <div className="d-flex align-items-center justify-content-between gap-50">
                  <Tooltip title={t("Attach images")} placement="top">
                    <label htmlFor="chat_message_images" className="cursor-pointer button">
                      <BsCameraFill size={20} />
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
                  <Tooltip title={t("Send")} placement="top">
                    <button ref={submitButton} onClick={handleSendCmt} className={`button ${loading || isDisabled ? "not-allowed" : ""}`}>
                      <IoSend size={20} />
                    </button>
                  </Tooltip>
                </div>
              </div>
              {error && <p className="text-danger p-0 m-0">{error}</p>}
              {images?.length > 0 && <FormGroup className="image-container p-0 form-group">{renderPreview()}</FormGroup>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TicketComments
