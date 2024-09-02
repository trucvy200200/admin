import { useState, useRef } from "react"
import { IoIosClose } from "react-icons/io"
import { Input as InputAntd } from "antd"
import styled from "styled-components"
import toast from "react-hot-toast"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import axios from "axios"
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
    padding: 0 !important;
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
      height: 32px;
    }
  }
  .ant-btn-loading-icon {
    margin-inline-end: 0 !important;
  }
`

const AutocompleteProvince = ({ selectedProvince, handleSelectedProvince, t, params }) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const cardContainer = useRef(null)

  const onChange = (e) => setQuery(e?.target.value)

  const onSearch = async () => {
    if (query?.trim()) {
      setLoading(true)
      try {
        const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query?.trim())}&format=jsonv2&addressdetails=1`

        const response = await axios.get(apiUrl)

        setLoading(false)
        if (response.data && response.data?.length > 0) {
          handleSelectedProvince(response.data[0])
          setQuery("")
        } else {
          toast.error(<ErrorNotificationToast message={t("Location not found!")} />)
        }
      } catch (error) {
        console.error("Error fetching location data:", error)
        toast.error(<ErrorNotificationToast message={t("Something went wrong!")} />)
        setLoading(false)
      }
    }
  }

  return (
    <div id="autocompleteProvince" className="account-wrapper form-control" ref={cardContainer}>
      <div className="main">
        {selectedProvince ? (
          <>
            <div className="account-info text-align-left">
              <div>{selectedProvince?.display_name}</div>
              <div className="arrow-down button" onClick={() => handleSelectedProvince(null)}>
                <IoIosClose size={24} />
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center w-100">
            <SearchStyled
              placeholder={t("Enter search here...")}
              value={query}
              onChange={onChange}
              onPressEnter={(e) => {
                e.preventDefault()
                onSearch()
              }}
              onSearch={onSearch}
              enterButton
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AutocompleteProvince
