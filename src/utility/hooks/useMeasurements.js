import {useMediaQuery} from "react-responsive"

export const useMeasurements = () => {
  return {
    isMobile: useMediaQuery({ maxWidth: 865 }),
    isMobileSM: useMediaQuery({ maxWidth: 450 }),
    isMobileXS: useMediaQuery({ maxWidth: 400 }),
    isMobileSMALL: useMediaQuery({ maxWidth: 330 })
  }
}
