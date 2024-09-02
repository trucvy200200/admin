import "react-image-lightbox/style.css"
import "./styles.scss"
import TicketHandlingHistoryItem from "./TicketHandlingHistoryItem"

const TicketHandlingHistory = ({ data }) => {

  return (
    <div className="w-100">
      {
        data?.map((item, index) => {
          return <TicketHandlingHistoryItem key={index} item={item}/>
        })
      }
    </div>
  )
}

export default TicketHandlingHistory
