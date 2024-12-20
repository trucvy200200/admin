// ** React Imports
import React, { useState, useEffect } from "react"

// ** Columns
import { columns } from "./columns"
import { useDispatch, useSelector } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Row, Col, Card, InputGroup, Input, Button } from "reactstrap"
import { NoDataComponent } from "@src/components/NoDataComponent"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { getVehicles, deleteVehicle } from "../store/action"
import { useTranslation } from "react-i18next"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import Spinner from "@src/@core/components/spinner/Loading-spinner-table"
import { toast } from "react-hot-toast"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import AddNewButton from "@src/components/Buttons/AddNewButton"
import ModalCreate from "../ModalCreate/list"
import ModalEdit from "../ModalEdit/list"
import { ConfirmDelete } from "@src/components/ConfirmDelete"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "../styles/configure.scss"

// ** Table Header
const CustomHeader = ({ setShowCreate, t, handleFilter, departure, handleSearchDeparture, destination, handlSearchDestination }) => {
  return (
    <div className="invoice-list-table-header w-100 mb-75">
      <Row>
        <Col lg={3} sm={6} xs={12} className="modal-search-col pl-0 my-50 d-flex align-items-center justify-content-center">
          <InputGroup className="ml-sm-0 input-group-merge product-search w-auto input-group-custom">
            <Input
              id="search-product"
              type="text"
              className="w-100 w-md-auto"
              value={departure}
              onChange={(e) => {
                handleSearchDeparture(e.target.value)
              }}
              placeholder={`${t("Enter departure")}...`}
            />
          </InputGroup>
        </Col>
        <Col lg={3} sm={6} xs={12} className="modal-search-col pl-0 my-50 d-flex align-items-center justify-content-center">
          <InputGroup className="ml-sm-0 input-group-merge product-search w-auto input-group-custom">
            <Input
              id="search-product"
              type="text"
              className="w-100 w-md-auto"
              value={destination}
              onChange={(e) => {
                handlSearchDestination(e.target.value)
              }}
              placeholder={`${t("Enter destination")}...`}
            />
          </InputGroup>
        </Col>
        <Col lg={3} sm={6} xs={12} className="my-50 px-0 px-md-1 d-flex align-items-center">
          <Button className="button-search" color="primary" onClick={handleFilter}>
            {t("Search")}
          </Button>
        </Col>
        <Col lg={12} sm={6} xs={12} className="d-flex p-0 mt-1 justify-content-end">
          <div className="create-button">
            <AddNewButton onClick={() => setShowCreate(true)} text={t("Create")} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Table = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const store = useSelector((state) => state.vehicles)
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsURL = useParams()
  // ** States
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? +searchParams.get("page") : 1)
  const [departure, setDeparture] = useState(searchParams.get("departure") || "")
  const [destination, setDestination] = useState(searchParams.get("destination") || "")
  const [rowsPerPage] = useState(10)
  const [showCreate, setShowCreate] = useState(false)
  const [editShow, setEditShow] = useState({ status: false, data: null })
  const [showDelete, setShowDelete] = useState({ status: false, id: null, name: null })

  // ** Get data on mount
  useEffect(() => {
    handleGetData()
  }, [paramsURL])

  const handleGetData = () => {
    dispatch(getVehicles(setLoading, { departure: departure || null, destination: destination || null, currentPage: currentPage, perPage: rowsPerPage }))
  }

  const checkParams = (filterParams) => {
    const params = {}
    if (filterParams.destination) {
      params.destination = filterParams.destination
    }
    if (filterParams.departure) {
      params.departure = filterParams.departure
    }

    params.page = filterParams.page

    params.perPage = filterParams.limit

    setSearchParams(params)
  }

  // ** Function in get data on page change
  const handlePagination = (page) => {
    checkParams({
      limit: rowsPerPage,
      page: page.selected + 1,
      departure,
      destination
    })
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on query change
  const handleFilter = () => {
    checkParams({ limit: rowsPerPage, page: 1, departure, destination })
    setCurrentPage(1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))
    return (
      <ReactPaginate
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={"pagination react-paginate justify-content-end my-2 pe-1"}
      />
    )
  }
  // ** Table data to render
  const dataToRender = () => {
    if (store.vehicles?.length > 0) {
      return store?.vehicles
    } else {
      return []
    }
  }

  const handleDeleteVehicle = async () => {
    setLoading(true)
    await deleteVehicle(
      {
        idTransport: showDelete?.id
      },
      (message) => {
        toast.success(<SuccessNotificationToast message={message} />)
        handleGetData()
        setShowDelete({ status: false, id: null })
      },
      (message) => toast.error(<ErrorNotificationToast message={message} />),
      () => setLoading(false)
    )
  }

  return (
    <>
      {pending && <LoadingBackground />}
      <Card>
        <div className="product-wrapper overflow-auto table-responsive sticky-actions">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            persistTableHead
            paginationServer
            progressPending={loading}
            progressComponent={<Spinner />}
            columns={columns({
              t,
              handleEditVehicle: setEditShow,
              handleDeleteVehicle: setShowDelete
            })}
            sortIcon={<ChevronDown />}
            className="react-dataTable no-padding"
            data={dataToRender()}
            paginationComponent={CustomPagination}
            noDataComponent={<NoDataComponent message={t("No data yet")} />}
            subHeaderComponent={
              <CustomHeader
                setShowCreate={setShowCreate}
                t={t}
                handleFilter={handleFilter}
                destination={destination}
                handlSearchDestination={setDestination}
                handleSearchDeparture={setDeparture}
                departure={departure}
              />
            }
          />
        </div>
      </Card>
      {showCreate && (
        <ModalCreate
          show={showCreate}
          handleNoButton={() => {
            setShowCreate(false)
          }}
          t={t}
          handleGetData={handleGetData}
        />
      )}
      {editShow.status && (
        <ModalEdit
          data={editShow.data}
          handleGetUpdateData={handleGetData}
          show={editShow.status}
          handleNoButton={() => {
            setEditShow({ status: false, data: null })
          }}
          t={t}
        />
      )}
      {showDelete?.status && (
        <ConfirmDelete message={"Confirm to delete vehicle"} button={"Delete"} submit={handleDeleteVehicle} cancel={() => setShowDelete({ status: false, id: null })} />
      )}
    </>
  )
}

export default Table
