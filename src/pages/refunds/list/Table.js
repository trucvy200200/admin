// ** React Imports
import React, { useState, useEffect } from "react"

// ** Columns
import { columns } from "./columns"
import { useDispatch, useSelector } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Row, Col, Card, InputGroup, Input, Button, Label, FormGroup } from "reactstrap"
import { NoDataComponent } from "@src/components/NoDataComponent"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { getRefunds, updateStatusRefund } from "../store/action"
import { useTranslation } from "react-i18next"
import { LoadingBackground } from "@src/components/Loading/LoadingBackground"
import Spinner from "@src/@core/components/spinner/Loading-spinner-table"
// import ModalDetail from "../ModalDetail/list"
import Select, { components } from "react-select"
import { selectThemeColors } from "@utils"
import { PAYMENT_STATUS, ORDER_STATUS } from "@constants/base-constant"
import { ConfirmApprove } from "@src/components/ConfirmApprove"
import { toast } from "react-hot-toast"
import SuccessNotificationToast from "@src/components/Toast/ToastSuccess"
import ErrorNotificationToast from "@src/components/Toast/ToastFail"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "../styles/configure.scss"

// ** Table Header
const { ValueContainer, Placeholder } = components

const filterOrderOptions = () => [
  { value: "all", label: "All" },
  { value: ORDER_STATUS.REFUND_COMPLETED, label: "Refund completed" },
  { value: ORDER_STATUS.COMPLETED, label: "Completed" },
  { value: ORDER_STATUS.CANCELLED, label: "Cancelled by customer" },
  { value: ORDER_STATUS.CANCELLED_BY_ADMIN, label: "Cancelled by admin" }
]

const renderOrderStatus = (value) => {
  switch (value) {
    case "all":
      return "All"
    case ORDER_STATUS.REFUND_COMPLETED:
      return "Refund completed"
    case ORDER_STATUS.CANCELLED:
      return "Cancelled by customer"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "Cancelled by admin"
    default:
      break
  }
}
const CustomHeader = ({ t, handleFilter, searchTerm, handleSearch, paymentStatus, handleFilterPaymentStatus, orderStatus, handleFilterOrderStatus }) => {
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
        {/* <Col lg={3} sm={6} xs={12} className="modal-search-col pl-0 my-50 d-flex align-items-center justify-content-center">
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
        </Col> */}
        <Col lg={3} sm={6} xs={12} className="p-0 modal-search-col d-flex align-items-center justify-content-center">
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
            placeholder={t(renderOrderStatus(orderStatus))}
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            options={filterOrderOptions()}
            isClearable={false}
            isSearchable={false}
            onChange={({ value }) => handleFilterOrderStatus(value)}
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className="px-0 px-md-1 d-flex align-items-center">
          <Button className="button-search" color="primary" onClick={handleFilter}>
            {t("Search")}
          </Button>
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
  const store = useSelector((state) => state.refunds)
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsURL = useParams()
  // ** States
  const [orderStatus, setOrderStatus] = useState(searchParams.get("orderStatus") ? searchParams.get("orderStatus") : "all")
  const [paymentStatus, setPaymentStatus] = useState(searchParams.get("paymentStatus") ? searchParams.get("paymentStatus") : "all")
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") ? +searchParams.get("page") : 1)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [rowsPerPage] = useState(10)
  const [showApprove, setShowApprove] = useState({ status: false, id: null })

  // ** Get data on mount
  useEffect(() => {
    handleGetData()
  }, [paramsURL])

  const handleGetData = () => {
    dispatch(
      getRefunds(setLoading, {
        location: searchTerm || null,
        orderStatus: orderStatus !== "all" ? orderStatus : null,
        paymentStatus: paymentStatus !== "all" ? paymentStatus : null,
        currentPage,
        perPage: rowsPerPage
      })
    )
  }

  const checkParams = (filterParams) => {
    const params = {}
    if (filterParams.q) {
      params.q = filterParams.q
    }
    if (filterParams.orderStatus !== "all") {
      params.orderStatus = filterParams.orderStatus
    }
    if (filterParams.paymentStatus !== "all") {
      params.paymentStatus = filterParams.paymentStatus
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
      orderStatus,
      paymentStatus,
      q: searchTerm
    })
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on query change
  const handleFilter = () => {
    checkParams({ limit: rowsPerPage, page: 1, orderStatus, paymentStatus, q: searchTerm })
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
    if (store.refunds?.length > 0) {
      return store?.refunds
    } else {
      return []
    }
  }
  const handleCompleteRefund = async () => {
    setLoading(true)
    await updateStatusRefund(
      { status: ORDER_STATUS.REFUND_COMPLETED, bookingId: showApprove?.id },
      (message) => {
        toast.success(<SuccessNotificationToast message={message} />)
        handleGetData()
        setShowApprove({ status: false, id: null })
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
              handleCompleteRefund: setShowApprove
            })}
            sortIcon={<ChevronDown />}
            className="react-dataTable no-padding"
            data={dataToRender()}
            paginationComponent={CustomPagination}
            noDataComponent={<NoDataComponent message={t("No refund yet")} />}
            subHeaderComponent={
              <CustomHeader
                t={t}
                handleFilter={handleFilter}
                paymentStatus={paymentStatus}
                handleFilterPaymentStatus={setPaymentStatus}
                orderStatus={orderStatus}
                handleFilterOrderStatus={setOrderStatus}
                handleSearch={setSearchTerm}
                searchTerm={searchTerm}
              />
            }
          />
        </div>
      </Card>
      {showApprove?.status && (
        <ConfirmApprove message={"Confirm to complete this refund"} button={"Complete"} submit={handleCompleteRefund} cancel={() => setShowApprove({ status: false, id: null })} />
      )}
    </>
  )
}

export default Table
