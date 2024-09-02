import React from "react"
import { formatTimeAgo } from "@src/utility/ConvertDate"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import defaultAvatar from "@src/assets/images/avatars/avatar-blank.png"
import Avatar from "@components/avatar"
import SwiperMultiSlides from "@src/components/Swiper/SwiperMultiSlides"
import "./styles.scss"

const CommentCard = (props) => {
  const { i18n } = useTranslation()
  const userInfo = useSelector((state) => state.profiles.user)
  const { owner, createdAt, context, images } = props
  
  return (
    <li>
      <div className={`user_info ${owner?.id !== userInfo?.id ? "flex-row-reverse" : ""}`}>
        <Avatar img={owner?.avatar ? owner?.avatar : defaultAvatar} />
        <div style={{ width: `${images.length > 0 ? "100%" : "fit-content"}`, maxWidth: "92%" }}>
          <div className="comment_content">
            <h4 className="user_name d-inline font-medium-2">{owner?.full_name}</h4>
            <div className="comment_created d-inline px-1">
              <span className="date">{formatTimeAgo(createdAt)[i18n.language]}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: context }} />
            {images?.length > 0 && (
              <div className="p-1">
                <SwiperMultiSlides images={images} />
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default CommentCard
