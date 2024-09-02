import React from "react"
import { Nav, NavItem, NavLink } from "reactstrap"
import classnames from "classnames"
import "./tabbars.scss"
import { User, Lock } from "react-feather"
import { IoWalletOutline } from "react-icons/io5"
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { useTranslation } from 'react-i18next'

const Tabbars = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation()

  const tabs = [
    {
      id: "1",
      icon: <User size={20} />,
      label: t("Information")
    },
    {
      id: "2",
      icon: <Lock size={20} />,
      label: t("Security")
    },
    {
      id: "3",
      icon: <IoWalletOutline size={22} />,
      label: t("Wallet")
    },
    {
      id: "4",
      icon: <HiOutlineClipboardDocumentList size={22} />,
      label: t("Online contract")
    }
  ]

  return (
    <div id="profile_tabbar">
      <Nav tabs>
        {tabs.map((item, index) => {
          return (
            <NavItem key={index}>
              <NavLink className={classnames({ active: activeTab === item.id })} onClick={() => setActiveTab(item.id)}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </NavItem>
          )
        })}
      </Nav>
    </div>
  )
}

export default Tabbars
