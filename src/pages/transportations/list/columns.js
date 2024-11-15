// ** Third Party Components
import React from "react"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Edit, Check, X } from "react-feather"
import currencyFormat from "@src/utility/UtilityFormat"
import { FiSettings } from "react-icons/fi"
import { TRANSPORTATION_TYPE } from "@constants/base-constant"

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

export const columns = ({ t, handleEditVehicle, handleDeleteVehicle }) => [
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
        <p className="w-100 mb-0 text-truncate-1">{row?.company}</p>
      </div>
    )
  },
  {
    name: t("Type"),
    minWidth: "200px",
    center: "true",
    selector: (row) => <div>{renderType(row?.type)}</div>
  },
  {
    name: "Departure",
    width: "200px",

    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.departure}</p>
      </div>
    )
  },
  {
    name: "Destination",
    minWidth: "210px",
    selector: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.destination}</p>
      </div>
    )
  },
  {
    name: "Price (VND)",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.price)} VND</div>
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
            <DropdownItem className="w-100" onClick={() => handleDeleteVehicle({ status: true, id: row?.id })}>
              <X size={16} className="mr-50" />
              <span className="align-middle">{t("Remove")}</span>
            </DropdownItem>
            <DropdownItem className="w-100" onClick={() => handleEditVehicle({ status: true, data: row })}>
              <Edit size={16} className="mr-50" />
              <span className="align-middle">{t("Edit")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    )
  }
]
