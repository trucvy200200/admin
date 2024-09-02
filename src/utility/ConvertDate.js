import moment from "moment"

export const convertDateString = (value) => {
  return moment(value).format("DD-MM-YYYY")
}
export const convertDate = (value) => {
  return moment(value?.toString()).format("DD-MM-YYYY")
}
export const convertDateDefault = (value) => {
  return moment(value).format("YYYY-MM-DD")
}

export const convertDateMonthFirst = (value) => {
  return moment(value).format("MM-DD-YYYY")
}

export const convertDateDefaultV2 = (value) => {
  return moment(value).format("YYYY/MM/DD")
}

export const convertDateDefaultV3 = (value) => {
  return moment(value).format("dd/MM/yyyy")
}

export const convertMonth = (value) => {
  return moment(value?.toString()).format("MM-YYYY")
}

export const convertTimeDate = (value) => {
  return moment(value).format("HH:mm DD/MM/YYYY")
}

export const convertYYYYMMDDHHMM = (value) => {
  return moment(value).format("YYYY-MM-DD HH:mm")
}

export const convertTimeDates = (value) => {
  return moment(value).format("HH:mm DD/MM/YYYY")
}

export const convertTimeDateNotYear = (value) => {
  return moment(value).format("HH:mm DD/MM")
}

export const convertDateTime = (time) => {
  let hours = new Date(time).getHours()
  let minutes = new Date(time).getMinutes()
  let date = new Date(time).getDate()
  let month = new Date(time).getMonth() + 1
  const year = new Date(time).getFullYear()
  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (date < 10) {
    date = `0${date}`
  }
  if (month < 10) {
    month = `0${month}`
  }
  return `${date}/${month}/${year}  ${hours}:${minutes}`
}

const viLocale = {
  months: "Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12".split("_"),
  monthsShort: "Thg1_Thg2_Thg3_Thg4_Thg5_Thg6_Thg7_Thg8_Thg9_Thg10_Thg11_Thg12".split("_"),
  weekdays: "Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy".split("_"),
  weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM [năm] YYYY",
    LLL: "D MMMM [năm] YYYY HH:mm",
    LLLL: "dddd, D MMMM [năm] YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Hôm nay] LT",
    nextDay: "[Ngày mai] LT",
    nextWeek: "dddd [tuần tới] LT",
    lastDay: "[Hôm qua] LT",
    lastWeek: "dddd [tuần rồi] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "%s tới",
    past: "%s trước",
    s: "vài giây",
    ss: "%d giây",
    m: "một phút",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    w: "một tuần",
    ww: "%d tuần",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm"
  },
  ordinalParse: /\d{1,2}/,
  ordinal: "%d"
}

export const formatTimeAgo = (input) => {
  moment.updateLocale("vi", viLocale)
  const inputTime = moment(input)
  const inputTimeEn = moment(input).locale("en")
  const vi = inputTime.fromNow()
  const en = inputTimeEn.fromNow()
  return { en, vi }
}

export const renderTimeCallAPI = (value, isEnd) => {
  if (!value) return null
  const timeData = new Date().getTimezoneOffset() / (-60)
  const newTime = timeData >= 0 ? timeData : (-1 * timeData)
  const now = new Date(0, 0)
  now.setMinutes(+Math.round(newTime * 60))
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const time = `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`
  return `${value}${isEnd ? 'T23:59:59' : 'T00:00:00'}${timeData >= 0 ? "+" : "-"}${time}`
}

export const renderDateTimeCallAPI = (date, time) => {
  if (!date) return null
  const timeData = new Date().getTimezoneOffset() / (-60)
  const newTime = timeData >= 0 ? timeData : (-1 * timeData)
  const now = new Date(0, 0)
  now.setMinutes(+Math.round(newTime * 60))
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const timezone = `${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}`
  return `${date}T${time}:00${timeData >= 0 ? "+" : "-"}${timezone}`
}

export const renderTimeNoTimezoneCallAPI = (value, isEnd) => {
  return value ? `${value}${isEnd ? 'T23:59:59' : 'T00:00:00'}` : null
}

export const convertNewDateFilter = (value) => {
  if (!value || value === '') return
  const data = value.split('-')
  return new Date(`${data[0]}-${data[1]}-${data[2]}`)
}

export const convertDateTimeString = (value) => {
  const data = String(value).split("-")
  if (data?.length > 2) {
    return `${data?.[2]}/${data?.[1]}`
  } else {
    return `${data?.[1]}/${data?.[0]}`
  }
}

export const disabledDate = (current) => {
  // Can not select days before today
  return current && current < moment(moment().format("YYYY-MM-DD HH:mm"), "YYYY-MM-DD HH:mm")
}