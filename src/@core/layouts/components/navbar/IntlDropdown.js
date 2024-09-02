// ** Third Party Components
import { useTranslation } from "react-i18next"
import { AiFillCaretDown } from "react-icons/ai"
import Avatar from "@components/avatar"

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import jwtDefaultConfig from "@auth/jwt/jwtDefaultConfig"
import { FULL_NAME_LANGUAGES, LANGUAGE_OPTIONS, LANGUAGES, FLAG_LANGUAGES } from "@constants/base-constant"

const IntlDropdown = () => {
  // ** Hooks
  const { i18n } = useTranslation()

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang).then()
    localStorage.setItem(jwtDefaultConfig.storageLanguage, lang)
  }

  return (
    <UncontrolledDropdown href="/" tag="li" className="dropdown-language nav-item">
      <DropdownToggle href="/" tag="a" onClick={(e) => e.preventDefault()} className="d-flex items-center" style={{ gap: "5px" }}>
        <Avatar img={i18n.language === LANGUAGES.VI ? FLAG_LANGUAGES.VIET_NAM : FLAG_LANGUAGES.ENGLISH} imgHeight={20} imgWidth={20} imgClassName="object-fit-cover" />
        <div>
          <span className="d-none d-sm-inline-block">{i18n.language === LANGUAGES.VI ? FULL_NAME_LANGUAGES.VIET_NAM : FULL_NAME_LANGUAGES.ENGLISH}</span>
          <AiFillCaretDown size={12} className={"ml-25"} />
        </div>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        {LANGUAGE_OPTIONS.map((language, index) => {
          return (
            <DropdownItem href="/" tag="a" key={index} onClick={(e) => handleLangUpdate(e, language.value)}>
              <img src={language.flag} width={20} height={20} alt="flag" className="me-1" />
              <span className="me-1">{language.label}</span>
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
