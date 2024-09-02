// ** I18n Imports
import i18n from "i18next"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import jwtDefaultConfig from "@auth/jwt/jwtDefaultConfig"
import {LANGUAGES} from "@constants/base-constant"

// ** Languages Imports
const en = new URL("@src/assets/data/locales/en.json", import.meta.url).href
const vi = new URL("@src/assets/data/locales/vi.json", import.meta.url).href

const languages = {
  en,
  vi
}

const defaultLanguage = localStorage.getItem(jwtDefaultConfig.storageLanguage) || LANGUAGES.EN

i18n

  // Enables the i18next backend
  .use(Backend)

  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    backend: {
      /* translation file path */
      loadPath: (lng) => languages[lng]
    },
    fallbackLng: "en",
    lng: defaultLanguage,
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    }
  })

export default i18n
