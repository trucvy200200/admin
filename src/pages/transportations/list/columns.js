// ** Third Party Components
import React from "react"
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Edit, Check, X } from "react-feather"
import { Link } from "react-router-dom"
import { convertTimeDate } from "@src/utility/ConvertDate"
import currencyFormat from "@src/utility/UtilityFormat"
import { FiSettings } from "react-icons/fi"
import { TRANSPORTATION_TYPE } from "@constants/base-constant"

const statusObjColor = (status) => {
  switch (status) {
    case 0:
      return "light-success"
    case 1:
      return "light-warning"
    default:
      break
  }
}

const renderType = (type) => {
  switch (type) {
    case TRANSPORTATION_TYPE.FLIGHT:
      return "Flight"
    case TRANSPORTATION_TYPE.CAR:
      return "Car"
    default:
      return "Select vehicle type"
  }
}

export const columns = ({ t, navigate, handleUpdateStatus }) => [
  {
    name: t("No."),
    width: "250px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{row?.id}</div>
  },
  {
    name: t("Brand name"),
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.name}</p>
      </div>
    )
  },
  {
    name: t("Type"),
    minWidth: "200px",
    center: "true",
    selector: (row) => <div>{renderType(row)}</div>
  },
  {
    name: "Departure",
    width: "200px",

    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.duration}</p>
      </div>
    )
  },
  {
    name: "Destination",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.priceChild)} VND</div>
  },
  {
    name: "Price (VND)",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.priceAdult)} VND</div>
  },
  {
    name: (
      <div>
        <span className="desktop">{t("Action")}</span>
        <FiSettings size={16} className="mobile" />
      </div>
    ),
    minWidth: "100px",
    center: true,
    cell: (row) => (
      <>
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={16} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="root">
            <DropdownItem className="w-100" onClick={() => handleUpdateStatus(row?.id, 1)}>
              <X size={16} className="mr-50" />
              <span className="align-middle">{t("Remove")}</span>
            </DropdownItem>
            <DropdownItem className="w-100" onClick={() => navigate(`/tours/edit/${row?.id}`)}>
              <Edit size={16} className="mr-50" />
              <span className="align-middle">{t("Edit")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    )
  }
]
