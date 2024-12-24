// ** Icons Import
import { Home, Circle, Database, User } from "react-feather"
import { RiFlightTakeoffLine, RiBillLine, RiRefund2Line } from "react-icons/ri"
import { FaHotel } from "react-icons/fa"
import { TbComet } from "react-icons/tb"

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    badge: "light-warning",
    navLink: "/dashboard",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "tours",
    title: "Tours",
    icon: <Database size={20} />,
    badge: "light-warning",
    navLink: "/tours/list",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "vehicles",
    title: "Vehicles",
    icon: <RiFlightTakeoffLine size={20} />,
    badge: "light-warning",
    navLink: "/vehicles/list",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "hotels",
    title: "Hotels",
    icon: <FaHotel size={20} />,
    badge: "light-warning",
    navLink: "/hotels/list",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "incoming-tours",
    title: "Incoming tours",
    icon: <TbComet size={20} />,
    badge: "light-warning",
    navLink: "/incoming-tours",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "order-management",
    title: "Order list",
    icon: <RiBillLine size={20} />,
    badge: "light-warning",
    navLink: "/orders/list",
    action: "view",
    resource: "tour_management"
  },
  {
    id: "refund-management",
    title: "Refund list",
    icon: <RiRefund2Line size={20} />,
    badge: "light-warning",
    navLink: "/refunds/list",
    action: "view",
    resource: "tour_management"
  }
]
