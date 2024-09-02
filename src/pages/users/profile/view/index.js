// ** React Imports
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { TabContent, TabPane, Card, Row, Col } from "reactstrap"
import ProfileHeader from "../components/ProfileHeader/ProfileHeader"
import SecurityPincode from "../components/ProfileHeader/SecurityPincode"
import SecurityPassword from "../components/ProfileHeader/SecurityPassword"
import WalletInformation from "../components/ProfileHeader/WalletInformation"
import Security2FA from "../components/ProfileHeader/Security2FA"
import ProfileInformation from "../components/ProfileHeader/ProfileInformation"
import currencyFormat from "@src/utility/UtilityFormat"
import { AiFillDollarCircle, AiFillStar, AiFillCreditCard } from "react-icons/ai"
import { FaPiggyBank, FaGratipay } from "react-icons/fa"
import { getMyProfile } from "../store/action"
import { useDispatch, useSelector } from "react-redux"

// ** styles
import "flatpickr/dist/themes/material_blue.css"
import "../components/ProfileHeader/styles/styles.scss"
import "@styles/react/pages/page-profile.scss"

const Profile = () => {
  // ** States
  const { t } = useTranslation()
  const store = useSelector((state) => state.profiles)
  const [activeTab, setActiveTab] = useState("1")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])

  return (
    <>
      {store?.user !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader t={t} setActiveTab={setActiveTab} activeTab={activeTab} data={store?.user} />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Card className="shadow">
                      <div className="profile-information p-2">
                        <ProfileInformation data={store?.user} />
                      </div>
                    </Card>
                  </TabPane>
                  <TabPane tabId="2">
                    <Card className="shadow">
                      <div className="profile-password p-2">
                        <h2 className={"mb-1 heading"}>{t("Change Password")}</h2>
                        <SecurityPassword data={store?.user} />
                      </div>
                    </Card>
                    <Card className="shadow">
                      <div className="profile-password p-2">
                        <h2 className={"mb-1 heading"}>{t("Change pincode")}</h2>
                        <SecurityPincode data={store?.user} />
                      </div>
                    </Card>
                    <Card className="shadow">
                      <div className="profile-2fa p-2">
                        <h2 className={"mb-1 heading"}>{t("Two-steps verification")}</h2>
                        <Security2FA user={store?.user} />
                      </div>
                    </Card>
                  </TabPane>
                  <TabPane tabId="3">
                    <Card className="shadow">
                      <div className="profile-wallet p-2">
                        <h2 className={"mb-1 heading"}>{t("Main Wallet")}</h2>
                        <WalletInformation data={store?.user} />
                      </div>
                    </Card>
                    <Card className="shadow">
                      <div className="profile-wallet p-2">
                        <h2 className={"mb-1 heading"}>{t("Extra Wallet")}</h2>
                        <div className="extra-wallets">
                          {[
                            { icon: <AiFillDollarCircle size={30} />, label: t("Total"), class: "Total", amount: store?.user?.amount },
                            { icon: <AiFillStar size={30} />, label: t("Direct Commission"), class: "Direct Commission", amount: store?.user?.amountDirectCommission },
                            { icon: <AiFillCreditCard size={30} />, label: t("Leader Commission"), class: "Leader Commission", amount: store?.user?.amountLeaderCommission },
                            { icon: <FaPiggyBank size={30} />, label: t("Level Commission"), class: "Level Commission", amount: store?.user?.amountUpLevel },
                            { icon: <FaGratipay size={30} />, label: t("Reback"), class: "Reback", amount: store?.user?.amountReBack }
                          ].map((wallet, index) => {
                            return (
                              <div className={`item ${wallet.class.split(" ")[0].toLocaleLowerCase()}`} key={index}>
                                <div className="icon">{wallet.icon}</div>
                                <div className="info">
                                  <div className="name">
                                    <span>{wallet.label}</span>
                                  </div>
                                  <div className="amount">{currencyFormat(wallet.amount)}</div>
                                </div>
                                <div className="circle circle-1"></div>
                                <div className="circle circle-2"></div>
                                <div className="circle circle-3"></div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </Card>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default Profile
