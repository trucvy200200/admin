// ** Icons Import
import { Home, Circle, Database } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    navLink: '/dashboard',
    action: "view",
    resource: "dashboard"
  },
  {
    id: 'tours',
    title: 'Tour management',
    icon: <Database size={20} />,
    badge: 'light-warning',
    navLink: '/tours/list',
    action: "view",
    resource: "tour_management"
  }
]
