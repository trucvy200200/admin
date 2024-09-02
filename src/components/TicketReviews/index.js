import {useContext} from "react"
import {Star} from "react-feather"
import Rating from "react-rating"
import {ThemeColors} from "@src/utility/context/ThemeColors"
import {INIT_STAR, RATING_NOTE, RATING_TYPE, REVIEW_TYPE} from "@constants/ticket-constant"
import {useTranslation} from "react-i18next"
import {LANGUAGES} from "@constants/base-constant"
import {checkShowOpinionReview} from "@utils"

import "react-image-lightbox/style.css"
import "./styles.scss"

const TicketReviews = ({ ticketReviews }) => {
    const {i18n} = useTranslation()
    // ** Context
    const themeColors = useContext(ThemeColors)

    return (
        <div className="prod_reviews w-100">
            <div className="review_list_wrapper">
                {
                    ticketReviews?.length > 0 &&
                    ticketReviews.map((item, index) => {
                        const totalStars = item?.stars || INIT_STAR
                        return (
                            <div key={index} className="mb-50">
                                <h6>{index + 1}. {item?.review?.title || '---'}</h6>
                                {
                                    item?.review?.typeReview === REVIEW_TYPE.STARS &&
                                    <div className="d-flex align-items-center px-2 mb-1">
                                        <Rating
                                            initialRating={totalStars}
                                            readonly={true}
                                            emptySymbol={<Star size={24} fill='#babfc7' stroke='#babfc7' />}
                                            fullSymbol={<Star size={24} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
                                        />
                                        {
                                            totalStars > 0 &&
                                            <p className="mb-0 ps-50">({RATING_NOTE[item?.review?.typeStars || RATING_TYPE.FELLING][totalStars][i18n.language || LANGUAGES.EN]})</p>
                                        }
                                    </div>
                                }
                                {
                                    (checkShowOpinionReview(totalStars) || item?.review?.typeReview === REVIEW_TYPE.OPINION) && <div className="form-item">{item.opinion || '--'}</div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TicketReviews
