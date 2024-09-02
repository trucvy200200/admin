import React from "react"
import { convertTimeDate } from "@src/utility/ConvertDate"
import { useTranslation } from "react-i18next"
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png"
import Avatar from "@components/avatar"
import { ADMIN_ACTION_ENUM } from "@constants/activity-history-admin-constant"
import { IoMdArrowRoundForward } from "react-icons/io"

import "./styles.scss"

const TicketHandlingHistoryItem = ({ item }) => {
  const { t } = useTranslation()

  const renderActivity = (type) => {
    switch (type) {
      case ADMIN_ACTION_ENUM.PROCESS_TICKET_USER:
        return t("has received and is processing the ticket")
      default:
        return t("has changed the handler")
    }
  }

  const renderDescription = () => {
    if (item?.logJson) {
      const data = JSON.parse(item.logJson)
      switch (item?.function) {
        case ADMIN_ACTION_ENUM.ASSIGN_TICKET_USER:
          return (
            <div className="d-flex flex-wrap align-items-center mt-50 assign-container">
              <div className="d-flex align-items-center mt-50 assign-item">
                <Avatar className="d-md-block d-none" img={item?.updatedBy?.avatar || defaultAvatar}/>
                <h4 className="d-inline font-medium-1 ps-md-1 ps-0 mb-0">{item?.updatedBy?.full_name || "---"}</h4>
              </div>
              <IoMdArrowRoundForward className="mt-50 mx-1 assign-icon" color="grey" size={20}/>
              <div className="d-flex align-items-center mt-50 assign-item">
                <Avatar className="d-md-block d-none" img={data?.adminAvatar || defaultAvatar}/>
                <h4 className="d-inline font-medium-1 ps-md-1 ps-0 mb-0">{data?.adminFullName || "---"}</h4>
              </div>
            </div>
          )
        case ADMIN_ACTION_ENUM.ASSIGN_TICKET:
          return (
            <div className="d-flex flex-wrap align-items-center mt-50 assign-container">
              <div className="d-flex align-items-center mt-50 assign-item">
                <Avatar className="d-md-block d-none" img={item?.updatedBy?.avatar || defaultAvatar}/>
                <h4 className="d-inline font-medium-1 ps-md-1 ps-0 mb-0">{item?.updatedBy?.full_name || "---"}</h4>
              </div>
              <IoMdArrowRoundForward className="mt-50 mx-1 assign-icon" color="grey" size={20}/>
              <div className="d-flex align-items-center mt-50 assign-item">
                <Avatar className="d-md-block d-none" img={data?.receiverAvatar || defaultAvatar}/>
                <h4 className="d-inline font-medium-1 ps-md-1 ps-0 mb-0">{data?.receiverFullName || "---"}</h4>
              </div>
            </div>
          )
        default:
          return <></>
      }
    } else return <></>
  }

  return (
    <div className="mx-1 py-1">
      <div className="d-flex align-items-start">
        <Avatar img={item?.updatedBy?.avatar || defaultAvatar}/>
        <div className="w-100 ps-1">
          <h4
            className="user_name d-inline font-medium-1">{item?.updatedBy?.full_name} {renderActivity(item?.function)}</h4>
          <p className="mb-0 font-small-3">{convertTimeDate(item?.createdAt)}</p>
          {renderDescription()}
        </div>
      </div>
    </div>
  )
}

export default TicketHandlingHistoryItem
