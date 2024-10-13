// Logo Import
import logo from "@src/assets/images/icons/icons/ic_logo.png"
import logoSmall from "@src/assets/images/icons/icons/ic_logo_small.png"
import appBird from "@src/assets/images/imgs/bird.png"
import appBirdEgg from "@src/assets/images/imgs/bird_egg.jpg"
import appLogoCoinPayment from "@src/assets/images/imgs/coinpayment.png"
import appLogoLevelActiveElip from "@src/assets/images/imgs/elip.png"
import appLogoLevelActiveCrown from "@src/assets/images/imgs/crown.png"
import appLogoLevelActiveFlash from "@src/assets/images/imgs/flash.png"
// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: "BookingNow",
    appLogoImage: logo,
    appLogoImageSmall: logoSmall,
    appBird: appBird,
    appBirdEgg: appBirdEgg,
    appLogoCoinPayment: appLogoCoinPayment,
    appLogoLevelActiveElip: appLogoLevelActiveElip,
    appLogoLevelActiveCrown: appLogoLevelActiveCrown,
    appLogoLevelActiveFlash: appLogoLevelActiveFlash
  },
  layout: {
    isRTL: false,
    skin: "light", // light, dark, bordered, semi-dark
    type: "vertical", // vertical, horizontal
    routerTransition: "fadeIn", // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    contentWidth: "full", // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: "floating", // static , sticky , floating, hidden
      backgroundColor: "primary" // BS color options [primary, success, etc]
    },
    footer: {
      type: "hidden" // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
    toastPosition: "top-right" // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  }
}

export default themeConfig
