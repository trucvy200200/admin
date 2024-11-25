// ** React Imports
import React, { useState, useEffect } from "react"

// ** Third Party Components
import { Button, Form, Input, Label, FormGroup, Row, Col, Badge } from "reactstrap"
import { PAYMENT_STATUS, ORDER_STATUS } from "@constants/base-constant"
import currencyFormat from "@src/utility/UtilityFormat"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const paymentStatusObjColor = (status) => {
  switch (status) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "light-info"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "light-warning"
    case PAYMENT_STATUS.COMPLETED:
      return "light-success"
    default:
      break
  }
}

const orderStatusObjColor = (status) => {
  switch (status) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "light-warning"
    case ORDER_STATUS.REFUND_COMPLETED:
    case ORDER_STATUS.COMPLETED:
      return "light-success"
    case ORDER_STATUS.CANCELLED:
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "light-danger"
    default:
      break
  }
}

const renderPaymentStatus = (row) => {
  switch (row?.paymentStatus) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "New request"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "Deposit advance"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    default:
      break
  }
}

const renderOrderStatus = (row) => {
  switch (row?.orderStatus) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "Waiting confirm"
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

const Detail = ({ detail }) => {
  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Order Code</Label>
          <div className="text-align-left mb-1">{detail?.id || "---"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Payment Code</Label>
          <div className="text-align-left mb-1">{detail?.paymentId && detail?.paymentId !== "null" ? detail?.paymentId : "---"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Payment Status</Label>
          <div className="d-flex justify-content-left mb-1">
            <Badge className="text-capitalize" color={paymentStatusObjColor(detail?.paymentStatus)} pill>
              {renderPaymentStatus(detail)}
            </Badge>
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Order Status</Label>
          <div className="d-flex justify-content-left mb-1">
            <Badge className="text-capitalize" color={orderStatusObjColor(detail?.orderStatus)} pill>
              {renderOrderStatus(detail)}
            </Badge>
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Email</Label>
          <div className="text-align-left mb-1">{detail?.email || "---"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Full name</Label>
          <div className="text-align-left mb-1">{detail?.fullName || "---"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Phone number</Label>
          <div className="text-align-left mb-1">{detail?.phone || "---"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Payment method</Label>
          <div className="text-align-left mb-1">{"E-wallet"}</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Payment account</Label>
          <div className="text-align-left mb-1">
            {detail?.payerName || "---"}-{detail?.paymentAccount || "---"}
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Total amount</Label>
          <div className="text-align-left mb-1">{currencyFormat(detail?.totalAmount)} VND</div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={12}>
          <Label className="form-label fw-bold">Amount paid</Label>
          <div className="text-align-left mb-1">{currencyFormat(detail?.depositAmount)} VND</div>
        </Col>
      </Row>
    </>
  )
}
export default Detail
