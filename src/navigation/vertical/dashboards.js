// ** Icons Import
import { Home, Circle, Database, User } from "react-feather"
import { RiFlightTakeoffLine, RiBillLine } from "react-icons/ri"
import { FaHotel } from "react-icons/fa"

export default [
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Home size={20} />,
    badge: "light-warning",
    navLink: "/dashboard",
    action: "view",
    resource: "dashboard"
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
    id: "order-management",
    title: "Orders",
    icon: <RiBillLine size={20} />,
    badge: "light-warning",
    navLink: "/orders/list",
    action: "view",
    resource: "tour_management"
  }
]
