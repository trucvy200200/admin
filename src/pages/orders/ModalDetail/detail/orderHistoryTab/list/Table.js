// ** React Imports
import React from "react"

// ** Columns
import { columns } from "./columns"

// ** Third Party Components
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Card } from "reactstrap"
import { NoDataComponent } from "@src/components/NoDataComponent"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "../styles/configure.scss"

const OrderCustomerList = ({ row }) => {
  const dataToRender = () => {
    if (row?.length > 0) {
      return row
    } else {
      return []
    }
  }

  return (
    <Card>
      <div className="product-wrapper overflow-auto">
        <DataTable
          noHeader
          sortServer
          responsive
          persistTableHead
          paginationServer
          columns={columns()}
          sortIcon={<ChevronDown />}
          className="react-dataTable no-padding"
          data={dataToRender()}
          noDataComponent={<NoDataComponent message={"No data yet"} />}
        />
      </div>
    </Card>
  )
}

export default OrderCustomerList
