// ** Third Party Components
import React from "react"
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Edit, Check, X } from "react-feather"
import { Link } from "react-router-dom"
import { convertTimeDate } from "@src/utility/ConvertDate"
import currencyFormat from "@src/utility/UtilityFormat"
import { FiSettings } from "react-icons/fi"

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

const renderStatus = (row) => {
  switch (row?.delFlg) {
    case 0:
      return "Active"
    case 1:
      return "Inactive"
    default:
      break
  }
}
export const columns = ({ t, navigate, handleUpdateStatus }) => [
  {
    name: t("No."),
    width: "50px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{index + 1}</div>
  },
  {
    name: t("Tour name"),
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.name}</p>
      </div>
    )
  },
  {
    name: "Duration (Day)",
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.duration}</p>
      </div>
    )
  },
  {
    name: "Child Price (VND)",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.priceChild)} VND</div>
  },
  {
    name: "Adult Price (VND)",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.priceAdult)} VND</div>
  },
  {
    name: t("Status"),
    minWidth: "200px",
    center: "true",
    selector: (row) => (
      <Badge className="text-capitalize" color={statusObjColor(row?.delFlg)} pill>
        {t(renderStatus(row))}
      </Badge>
    )
  },
  {
    name: t("Created At"),
    minWidth: "150px",
    selector: (row) => convertTimeDate(row?.createdAt)
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
            {row?.delFlg === 1 ? (
              <DropdownItem className="w-100" onClick={() => handleUpdateStatus(row?.id, 0)}>
                <Check size={16} className="mr-50" />
                <span className="align-middle">{t("Active")}</span>
              </DropdownItem>
            ) : (
              <DropdownItem className="w-100" onClick={() => handleUpdateStatus(row?.id, 1)}>
                <X size={16} className="mr-50" />
                <span className="align-middle">{t("Inactive")}</span>
              </DropdownItem>
            )}

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
