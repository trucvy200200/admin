import { DefaultRoute } from "../router/routes"
import jwtDefaultConfig from "@src/@core/auth/jwt/jwtDefaultConfig"
import { BASE_CONSTANT } from "@src/constants/base-constant"
import { LANGUAGES } from "@constants/base-constant"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num) => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: "short", day: "numeric", year: "numeric" }) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => {
  return localStorage.getItem(jwtDefaultConfig.storageUserData) && localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
}

export const getUserData = () => JSON.parse(localStorage.getItem(jwtDefaultConfig.storageUserData))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 // * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = () => {
  return DefaultRoute
}

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed" // for input hover border-color
  }
})

export const validateNumber = (value) => {
  if (!value || value.includes(".") || value.includes(",")) {
    return false
  }
  const matches = value.match(/^([0-9]\d*)(\.\d+)?$/)
  return matches?.length > 0 ? value : false
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const checkPassword = (value) => {
  if (pattern.test(value) === false) {
    return true
  }
  return false
}

const numberPattern = /^[0-9]+$/
export const isNumber = (value) => {
  if (numberPattern.test(value) === false) {
    return true
  }
  return false
}

export const imageFileCheck = (filename) => {
  const fileExtensions = ["jpg", "jpeg", "png", "webp"]

  const isValidExtension = fileExtensions.some((extension) => filename.endsWith(`.${extension}`))

  if (isValidExtension) {
    return true
  } else {
    return false
  }
}

export const patternDevote = /^.{8,}$/
export const checkDevoteName = (value) => patternDevote.test(value.trim())

export const patternLimit = /^.{4,}$/
export const checkNameLimit = (value) => patternLimit.test(value.trim())

export const checkURL = (string) =>
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g.test(
    string
  )

export const viLocale = {
  weekdays: {
    shorthand: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    longhand: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
  },

  months: {
    shorthand: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
    longhand: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
  },

  firstDayOfWeek: 1,

  rangeSeparator: " đến ",
  weekAbbreviation: "Tuần",
  scrollTitle: "Cuộn để tăng giá trị",
  toggleTitle: "Bấm để chuyển đổi"
}

export const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key))

export const renderImage = (params) => {
  if (!params.key && !params.userId && !params.token) return
  return `${BASE_CONSTANT.BASE_URL_USER}/admin/user/image-private?key=${params.key}&userId=${params.userId}&token=${params.token}`
}

export const allowedFileTypes = [".jpg", ".jpeg", ".png", ".webp"]

export const getInitials = (str) => {
  const results = []
  const wordArray = str?.split(" ")
  wordArray?.forEach((e) => {
    results.push(e[0])
  })
  return results.join("")
}

export function addChildToObject(data, targetId, floor, newChild) {
  for (let obj of data) {
    if (obj.id === targetId && obj.myFloor === floor) {
      obj.children = newChild
      return data // Return the updated data
    }
    if (obj.children) {
      const updatedChildren = addChildToObject(obj.children, targetId, floor, newChild)
      if (updatedChildren !== obj.children) {
        obj.children = updatedChildren
        return data
      }
    }
  }
  return data // Return the original data if target is not found
}

export const isNotificationsSupported = () => {
  return "Notification" in window
}

export const requestNotificationPermission = async () => {
  if (isNotificationsSupported()) {
    try {
      const permission = await Notification.requestPermission()
      return permission
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }
}

export const getImageFromLocal = (file) => {
  return URL.createObjectURL(file)
}

export const imageTypeRegex = /image\/(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)/gm

export const renderRowNum = (index, currentPage, perPage) => {
  return currentPage === 1 ? index + 1 : index + 1 + (currentPage - 1) * perPage
}

const pat = /^(?=.*\d)(?=.*[a-z])[a-z\d]{6,}$/
export const checkUsername = (value) => {
  if (value.length < 6) {
    return false
  }
  if (pat.test(value) === false) {
    return false
  }
  return true
}

export const validateIDCard = (value) => {
  if (!value || value.includes(".") || value.includes(",")) {
    return false
  }
  const matches = value.match(/^[0-9a-zA-Z ]*$/)
  return matches?.length > 0 ? value : false
}

export const convertIsActive = (value) => {
  switch (value?.toUpperCase()) {
    case "ALL":
      return ""
    case "TRUE":
      return 1
    case "FALSE":
      return 0
    default:
      return ""
  }
}

export function getFileExtension(url) {
  const parts = url.split(".")
  if (parts.length > 1) {
    return parts[parts.length - 1]
  }
  return null
}

export async function urlToFile(url, filename, mimeType) {
  if (url.startsWith("data:")) {
    /* eslint-disable */
    let arr = url.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let file = new File([u8arr], filename, { type: mime || mimeType })
    return Promise.resolve(file)
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }))
}

export function extractStringFromUrl(url) {
  const match = url.match(/\/([a-zA-Z0-9-]+)\.[a-zA-Z]+$/)
  return match ? match[1] : null
}

export const checkCanEditTicket = (type, createdById, permission, userId, verifiedById, canEdit) => {
  return !!(canEdit || (userId === createdById && type === "comment") || (permission && userId === verifiedById))
}

export function arrays_equal(a, b) {
  a = Array.isArray(a) ? a : []
  b = Array.isArray(b) ? b : []
  return a.length === b.length && a.every((el) => b.includes(el))
}

export const checkShowOpinionReview = (totalStar) => totalStar > 0 && totalStar < 4

export const renderWarning = (data, language) => {
  if (data?.warning && !isObjEmpty(data?.warning)) {
    switch (language) {
      case LANGUAGES.VI:
        return data?.warning?.valueVi
      case LANGUAGES.EN:
        return data?.warning?.valueEn
      default:
        break
    }
  }
  return data?.noteWarning
}

export const subString = (string, size) => {
  if (!string) return
  if (string.length > size) {
    return string.substr(0, size).concat("...")
  }
  return string
}

export async function handleConvertUrlToFile(url) {
  const mimeType = getFileExtension(url)
  const fileName = extractStringFromUrl(url)

  const file = await urlToFile(url, fileName + "." + mimeType, mimeType)

  return file
}

export const renderCCAddress = (type, isLanguageVi, contract) => {
  let address = null
  switch (type) {
    case "province":
      if (contract?.province) {
        address = contract.province
      } else {
        address = isLanguageVi ? contract?.objectProvince?.full_name : contract?.objectProvince?.full_name_en
      }
      break
    case "district":
      if (contract?.district) {
        address = contract.district
      } else {
        address = isLanguageVi ? contract?.objectDistrict?.full_name : contract?.objectDistrict?.full_name_en
      }
      break
    case "ward":
      if (contract?.ward) {
        address = contract.ward
      } else {
        address = isLanguageVi ? contract?.objectWard?.full_name : contract?.objectWard?.full_name_en
      }
      break
    default:
      break
  }
  return address || "--"
}

export async function videoSizeCheck(input) {
  if (!input) return null
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.onloadedmetadata = function () {
      const isLandscape = this.videoWidth > this.videoHeight
      resolve(isLandscape ? "horizontal" : "vertical")
    }
    video.onerror = function () {
      reject(new Error("Cannot load video"))
    }
    video.src = input
  })
}

export function roundDownToDecimals(num, decimals) {
  // Check if decimals is an integer and greater than or equal to 0
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("The number of decimal places must be a non-negative integer")
  }

  // Multiply the number by 10^decimals to shift the decimal point to the right
  let factor = Math.pow(10, decimals)

  // Floor the shifted number
  let flooredShiftedNumber = Math.floor(num * factor)

  // Divide back to shift the decimal point to the original position
  let result = flooredShiftedNumber / factor

  return result
}

export const round2Digits = (value) => {
  if (!value || isNaN(value)) return
  return Math.round(value * 100) / 100
}

export function isJSONString(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

export const checkEmptyHtmlString = (value) => {
  return !value || !value.replace(/(<([^>]+)>)/gi, "")?.trim()?.length
}
