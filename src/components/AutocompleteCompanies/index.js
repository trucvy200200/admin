import { useState, useRef } from "react"
import { IoIosArrowDown, IoIosClose } from "react-icons/io"
import { IoWalletOutline } from "react-icons/io5"
import { instancesEnterprise } from "@src/@core/plugin/axios"
import { Input as InputAntd } from "antd"
import styled from "styled-components"
import toast from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import "./styles.scss"

const { Search } = InputAntd

const SearchStyled = styled(Search)`
  .ant-input {
    border-top: 1px solid transparent !important;
    border-right: 1px solid transparent !important;
    border-left: 1px solid transparent !important;
    border-bottom: 1px solid grey !important;
    border-radius: 0 !important;
    box-shadow: 0 0 0 2px transparent;
    padding: 4px 0 !important;
  }
  .ant-input:focus {
    box-shadow: 0 0 0 2px transparent;
  }

  .ant-input-search-button {
    display: flex;
    align-items: center;
  }
  .ant-btn-icon {
    line-height: 1px !important;
  }
  .ant-input-group-addon {
    background: transparent !important;
    border: none !important;
  }
  .ant-btn-primary {
    background: transparent !important;
    color: black;
    border-radius: 0 !important;
    height: 38px !important;
    box-shadow: none !important;
    font-size: 20px;
    &:hover {
      color: black !important;
    }
  }
  .ant-input-wrapper {
    input {
      height: 38px;
    }
  }
  .ant-btn-loading-icon {
    margin-inline-end: 0 !important;
  }
`

const AutocompleteCompanies = ({ selectedUser, handleSelectedUser, t, params }) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const cardContainer = useRef(null)

  const onChange = (e) => setQuery(e?.target.value)

  const onSearch = async () => {
    if (query?.trim()) {
      setLoading(true)
      instancesEnterprise
        .get(`/admin/company/${query}`, { params: params || {} })
        .then((res) => {
          if (res?.data?.data) {
            handleSelectedUser(res?.data?.data)
            setQuery("")
          }
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          toast.error(<ErrorNotificationToast message={t(err?.response?.data?.message || "Something went wrong!")} />)
        })
    }
  }

  return (
    <div id="autocompleteUsers" className="account-wrapper form-control" ref={cardContainer}>
      <div className="main">
        {selectedUser?.id ? (
          <>
            <div className="icon">
              <IoWalletOutline size={23} />
            </div>
            <div className="account-info text-align-left">
              <div>
                <b>
                  {t("Enterprise name")}: {selectedUser?.businessAbbreviation || selectedUser?.businessName}
                </b>
                <p className="text-secondary d-flex align-items-center m-0">
                  {t("Username")}: {selectedUser?.users[0]?.username}
                </p>
                <p className="text-secondary d-flex align-items-center m-0">
                  {t("Email")}: {selectedUser?.users[0]?.email}
                </p>
              </div>
              <>
                {!selectedUser?.id ? (
                  <div className="arrow-down button">
                    <IoIosArrowDown size={18} />
                  </div>
                ) : (
                  <div className="arrow-down button" onClick={() => handleSelectedUser(null)}>
                    <IoIosClose size={25} />
                  </div>
                )}
              </>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center w-100" style={{ minHeight: "63px" }}>
            <SearchStyled placeholder={t("Search by username or email")} value={query} onChange={onChange} onSearch={onSearch} enterButton loading={loading} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AutocompleteCompanies
