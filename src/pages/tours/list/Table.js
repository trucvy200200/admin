// ** React Imports
import React, { useState, useEffect } from "react"

// ** Columns
import { columns } from "./columns"
import { useDispatch, useSelector } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import Select, { components } from "react-select"
import { Row, Col, Card, InputGroup, Input, Button } from "reactstrap"
import { NoDataComponent } from "@src/components/NoDataComponent"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { selectThemeColors } from "@utils"
import { getTours, deleteTour } from "../store/action"
import { useTranslation } from "react-i18next"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import Spinner from "@src/@core/components/spinner/Loading-spinner-table"
import { toast } from "react-hot-toast"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"
import AddNewButton from "@src/components/Buttons/AddNewButton"
import { ConfirmDelete } from "@src/components/ConfirmDelete"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "../styles/configure.scss"

const { ValueContainer, Placeholder } = components

const filterOptions = ({ t }) => [
  { value: "all", label: t("All") },
  { value: "active", label: t("Active") },
  { value: "inactive", label: t("Inactive") }
]

const renderStatus = (value) => {
  switch (value) {
    case "all":
      return "All"
    case "active":
      return "Active"
    case "inactive":
      return "Inactive"
    default:
      break
  }
}

// ** Table Header
const CustomHeader = ({ navigate, t, handleFilter, status, handleFilterStatus, searchTerm, handleSearch }) => {
  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) => (child && child.type !== Placeholder ? child : null))}
      </ValueContainer>
    )
  }
  return (
    <div className="invoice-list-table-header w-100 mb-75">
      <Row>
        <Col lg={3} sm={6} xs={12} className="modal-search-col pl-0 my-50 d-flex align-items-center justify-content-center">
          <InputGroup className="ml-sm-0 input-group-merge product-search w-auto input-group-custom">
            <Input
              id="search-product"
              type="text"
              className="w-100 w-md-auto"
              value={searchTerm}
              onChange={(e) => {
                handleSearch(e.target.value)
              }}
              placeholder={`${t("Enter search")}...`}
            />
          </InputGroup>
        </Col>
        <Col lg={3} sm={6} xs={12} className="modal-search-col p-0 my-50 d-flex align-items-center justify-content-center">
          <Select
            styles={{
              container: (provided) => ({
                ...provided,
                width: "100%",
                zIndex: 99991,
                height: "auto !important"
              }),
              valueContainer: (provided) => ({
                ...provided,
                overflow: "visible"
              }),
              placeholder: (provided, state) => ({
                ...provided,
                position: "absolute",
                opacity: state.hasValue || state.selectProps.inputValue ? "0" : "1",
                visibility: state.hasValue || state.selectProps.inputValue ? "hidden" : "visible",
                transition: "all 0.1s ease"
              }),
              control: (provided) => ({
                ...provided,
                height: "auto !important"
              })
            }}
            components={{
              ValueContainer: CustomValueContainer
            }}
            style={{ width: "100%" }}
            placeholder={t(renderStatus(status))}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={filterOptions({ t })}
            isClearable={false}
            isSearchable={false}
            onChange={({ value }) => handleFilterStatus(value)}
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className="my-50 px-0 px-md-1 d-flex align-items-center">
          <Button className="button-search" color="primary" onClick={handleFilter}>
            {t("Search")}
          </Button>
        </Col>
        <Col lg={12} sm={6} xs={12} className="d-flex p-0 mt-1 justify-content-end">
          <div className="create-button">
            <AddNewButton onClick={() => navigate("/tours/create")} text={t("Create")} />
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
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const store = useSelector((state) => state.tours)
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsURL = useParams()
  // ** States
  const [status, setStatus] = useState(searchParams.get("status") ? searchParams.get("status") : "all")
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? +searchParams.get("page") : 1)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [rowsPerPage] = useState(10)
  const [showDelete, setShowDelete] = useState({ status: false, id: null })

  // ** Get data on mount
  useEffect(() => {
    handleGetData()
  }, [paramsURL])

  const handleGetData = () => {
    dispatch(getTours(setLoading, { status: status || null, keyword: searchTerm || null, currentPage: currentPage, perPage: rowsPerPage }))
  }

  const checkParams = (filterParams) => {
    const params = {}
    if (filterParams.status !== "all") {
      params.status = filterParams.status
    }
    if (filterParams.q) {
      params.q = filterParams.q
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
      status,
      q: searchTerm
    })
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on query change
  const handleFilter = () => {
    checkParams({ limit: rowsPerPage, page: 1, status, q: searchTerm })
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
    if (store.tours?.length > 0) {
      return store?.tours
    } else {
      return []
    }
  }

  const handleDeleteHotel = async () => {
    setLoading(true)
    await deleteTour(
      {
        tourId: showDelete?.id
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
      {loading && <LoadingBackground />}
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
              navigate,
              handleDeleteTour: setShowDelete
            })}
            sortIcon={<ChevronDown />}
            className="react-dataTable no-padding"
            data={dataToRender()}
            paginationComponent={CustomPagination}
            noDataComponent={<NoDataComponent message={t("No tour yet")} />}
            subHeaderComponent={
              <CustomHeader navigate={navigate} t={t} handleFilter={handleFilter} status={status} handleFilterStatus={setStatus} handleSearch={setSearchTerm} searchTerm={searchTerm} />
            }
          />
        </div>
      </Card>
      {showDelete?.status && <ConfirmDelete message={"Confirm to delete tour"} button={"Delete"} submit={handleDeleteHotel} cancel={() => setShowDelete({ status: false, id: null })} />}
    </>
  )
}

export default Table
