// ** Custom Components
import { useEffect, useState, useRef } from "react"

import PerfectScrollbar from "react-perfect-scrollbar"
import { Bell, X } from "react-feather"
import { Tooltip } from "antd"
import { HiOutlineMailOpen } from "react-icons/hi"
import { getMyNotifications, updateMyNotifications, readNotificationById, deleteNotificationById, readAllNotification } from "@src/pages/users/store/action"
import { NOTIFY_TYPE } from "@constants/notification-constant"
import { formatTimeAgo } from "@src/utility/ConvertDate"

import { Button, Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@constants/transaction-constant"
import { adminTicketDetailUrl, myTicketDetailUrl, userTicketDetailUrl } from "@src/utility/TicketUtils"
import { ROLE_POSITION } from "@constants/users-constant"
import { renderNotificationDescription, renderNotificationIcon, renderNotificationTitle } from "@src/utility/NotificationUtils"

const NotificationDropdown = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const { notifications, unReadNotifications, countNotifications, notificationParams } = useSelector((state) => state.users)
  const userData = useSelector((state) => state.profiles?.user)
  const rowsPerPage = 10
  const [currentPage, setCurrentPage] = useState(+notificationParams?.offset > 0 ? +notificationParams?.offset / rowsPerPage : 1)
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    dispatch(getMyNotifications({ limit: rowsPerPage, offset: currentPage === 1 ? 0 : (currentPage - 1) * rowsPerPage }))
  }, [isShow])

  const fetchData = async () => {
    if (!hasMore) {
      return
    }

    setIsLoading(true)

    if (notifications?.length !== 0 && notifications?.length === countNotifications) {
      setHasMore(false)
    } else {
      await dispatch(getMyNotifications({ limit: rowsPerPage, offset: currentPage + 1 === 1 ? 0 : (currentPage + 1 - 1) * rowsPerPage }))
      setCurrentPage(currentPage + 1)
    }

    setIsLoading(false)
  }

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchData().then()
    }
  }

  const handleDeleteNotify = async (id) => {
    await dispatch(deleteNotificationById({ notifyId: id }))
    await dispatch(updateMyNotifications({ offset: 0, limit: rowsPerPage }))
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
    setCurrentPage(1)
    setHasMore(true)
  }

  const handleRedirectToNotifyDetail = (id, url) => {
    dispatch(readNotificationById({ notifyId: id }))
    navigate(url)
  }

  const renderItem = (item, index) => {
    const description = item?.description ? JSON.parse(item.description) : null
    switch (item?.type) {
      case NOTIFY_TYPE.NEW_KYC:
      case NOTIFY_TYPE.UPDATE_KYC:
        return (
          <a key={index} className="d-flex" href={"/"} onClick={(e) => e.preventDefault()}>
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="me-50 h-100" onClick={() => handleRedirectToNotifyDetail(item?.id, `/review-users?userId=${item?.customer?.id}`)}>
                  {renderNotificationIcon(item)}
                </div>
                <div className="list-item-body flex-grow-1" onClick={() => handleRedirectToNotifyDetail(item?.id, `/review-users?userId=${item?.customer?.id}`)}>
                  {t(renderNotificationTitle(item))}
                  <p className="notification-text mb-0 text-truncate-1">{renderNotificationDescription(item, t)}</p>
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
      case NOTIFY_TYPE.NEW_TICKET:
      case NOTIFY_TYPE.NEW_TICKET_NEED_IT_SUPPORT_APPROVAL:
      case NOTIFY_TYPE.PROCESSING_TICKET:
      case NOTIFY_TYPE.COMPLETED_TICKET:
      case NOTIFY_TYPE.REJECTED_TICKET:
      case NOTIFY_TYPE.CANCELLED_TICKET:
      case NOTIFY_TYPE.NEW_TICKET_COMMENT:
      case NOTIFY_TYPE.ASSIGN_TICKET:
        const ticketDetailUrl =
          userData?.position === ROLE_POSITION.IT_SUPPORT || userData?.position === ROLE_POSITION.SYSTEM_ADMIN
            ? adminTicketDetailUrl(description?.ticketId)
            : myTicketDetailUrl(description?.ticketId)

        return (
          <a key={index} className="d-flex" href={"/"} onClick={(e) => e.preventDefault()}>
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="me-50 h-100" onClick={() => handleRedirectToNotifyDetail(item?.id, ticketDetailUrl)}>
                  {renderNotificationIcon(item)}
                </div>
                <div className="list-item-body flex-grow-1" onClick={() => handleRedirectToNotifyDetail(item?.id, ticketDetailUrl)}>
                  {t(renderNotificationTitle(item))}
                  <p className="notification-text mb-0">{renderNotificationDescription(item, t)}</p>
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
      case NOTIFY_TYPE.NEW_TICKET_USER:
      case NOTIFY_TYPE.NEW_TICKET_COMMENT_ADMIN:
      case NOTIFY_TYPE.ASSIGN_TICKET_USER:
      case NOTIFY_TYPE.COMPLETED_TICKET_USER_BY_USER:
        return (
          <a key={index} className="d-flex" href={"/"} onClick={(e) => e.preventDefault()}>
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="me-50 h-100" onClick={() => handleRedirectToNotifyDetail(item?.id, userTicketDetailUrl(item?.ticketUser?.id || item?.ticketCommentUser?.id))}>
                  {renderNotificationIcon(item)}
                </div>
                <div className="list-item-body flex-grow-1" onClick={() => handleRedirectToNotifyDetail(item?.id, userTicketDetailUrl(item?.ticketUser?.id || item?.ticketCommentUser?.id))}>
                  {t(renderNotificationTitle(item))}
                  <p className="notification-text mb-0 text-truncate-1">{renderNotificationDescription(item, t)}</p>
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
      case NOTIFY_TYPE.NEW_DEPOSIT_USER:
      case NOTIFY_TYPE.NEW_WITHDRAW_USER:
        const handleClickItem = () => {
          dispatch(readNotificationById({ notifyId: item?.id }))
          if (item?.transactionUser?.status === TRANSACTION_STATUS.WAITING_COMPLETED || item?.transactionUser?.status === TRANSACTION_STATUS.CONFIRMED) {
            navigate(`/deposit-withdraw/review?q=${item?.transactionUser?.id}`)
          } else if (item?.transactionUser?.type === TRANSACTION_TYPE.DEPOSIT) {
            navigate(`/transaction/deposit?id=${item?.transactionUser?.id}`)
          } else if (item?.transactionUser?.type === TRANSACTION_TYPE.WITHDRAW) {
            navigate(`/transaction/withdraw?id=${item?.transactionUser?.id}`)
          }
        }
        return (
          <a key={index} className="d-flex" href={"/"} onClick={(e) => e.preventDefault()}>
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="me-50 h-100" onClick={handleClickItem}>
                  {renderNotificationIcon(item)}
                </div>
                <div className="list-item-body flex-grow-1" onClick={handleClickItem}>
                  {t(renderNotificationTitle(item))}
                  <p className="notification-text mb-0 text-truncate-1">{renderNotificationDescription(item, t)}</p>
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
      case NOTIFY_TYPE.NEW_REQUEST_REJECT_ENTERPRISE:
        return (
          <a key={index} className="d-flex" href={"/"} onClick={(e) => e.preventDefault()}>
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="me-50 h-100" onClick={() => handleRedirectToNotifyDetail(item?.id, `/enterprise-review?userId=${description?.enterpriseId}`)}>
                  {renderNotificationIcon(item)}
                </div>
                <div className="list-item-body flex-grow-1" onClick={() => handleRedirectToNotifyDetail(item?.id, `/enterprise-review?userId=${description?.enterpriseId}`)}>
                  {t(renderNotificationTitle(item))}
                  <p className="notification-text mb-0 text-truncate-1">{renderNotificationDescription(item, t)}</p>
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
      default:
        return (
          <a
            key={index}
            className="d-flex"
            href={"/"}
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <div className={"list-item d-flex align-items-start"}>
              <>
                <div className="list-item-body flex-grow-1">
                  {t("New notification")}
                  <small className="notification-text">{formatTimeAgo(item?.createdAt)[i18n.language]}</small>
                </div>

                <div className="notification-icon">
                  <div className="isRead-notification" onClick={() => dispatch(readNotificationById({ notifyId: item?.id }))}>
                    {!item?.isRead && <div className="circle" />}
                  </div>
                  <div className="remove-notification" onClick={() => handleDeleteNotify(item?.id)}>
                    <X size={15} />
                  </div>
                </div>
              </>
            </div>
          </a>
        )
    }
  }

  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        containerRef={(el) => {
          scrollRef.current = el
        }}
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false
        }}
        onScroll={handleScroll}
      >
        {notifications?.length === 0 && !isLoading ? (
          <div className={"d-flex align-items-center justify-content-center p-1"}>{t("No notifications yet")}</div>
        ) : (
          <>
            {notifications?.map((item, index) => renderItem(item, index))}
            {isLoading && <div className="d-flex align-items-center justify-content-center p-1">{t("Loading")}</div>}
            {!hasMore && <div className={"d-flex align-items-center justify-content-center p-1"}>{t("All displayed")}</div>}
          </>
        )}
      </PerfectScrollbar>
    )
  }

  return (
    <UncontrolledDropdown tag="li" className="dropdown-notification nav-item me-25" isOpen={isShow} toggle={() => setIsShow(!isShow)}>
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <Bell size={21} />
        <Badge pill color="danger" className="badge-up badge-notification" style={{ padding: "0px !important" }}>
          {unReadNotifications < 100 ? unReadNotifications : "99+"}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex align-items-center" tag="div" header>
            <h4 className="notification-title mb-0 me-auto d-flex align-items-center">
              {t("Notifications")}
              <small className="ms-50 text-danger">{`(${unReadNotifications})`}</small>
            </h4>
            <Tooltip title={t("Mark all as read")} placement="left">
              <span className="action-icon" onClick={() => dispatch(readAllNotification())}>
                <HiOutlineMailOpen size={25} />
              </span>
            </Tooltip>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className="dropdown-menu-footer">
          <Button color="primary" block onClick={() => navigate("/notifications")}>
            {t("Read all notification")}
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
