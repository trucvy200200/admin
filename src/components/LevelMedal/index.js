import "./styles.scss"
import themeConfig from "@configs/themeConfig"

const LevelMedal = ({ level }) => {
  return (
    <div className="lv-wrapper d-flex align-items-center justify-content-center">
      <div className="item">
        <div className="item-inner">
          <img src={themeConfig.app.appLogoLevelActiveElip} className="elip" />
          <img src={themeConfig.app.appLogoLevelActiveFlash} className="flash" />
          <img src={themeConfig.app.appLogoLevelActiveCrown} className="crown" />
          <div className="number">{`LV.${level}`}</div>
        </div>
      </div>
    </div>
  )
}

export default LevelMedal
