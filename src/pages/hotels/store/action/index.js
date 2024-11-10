import instances, { instancesV4 } from "@src/@core/plugin/axios"

export const GET_HOTELS = "GET_HOTELS"

// export const getProductsReviewTotal = () => {
//   return async (dispatch) => {
//     await instances.get("/owner/product/review/total")
//       .then((response) => {
//         dispatch({
//           type: GET_PRODUCTS_REVIEW_TOTAL,
//           total: response?.data?.data
//         })
//       })
//       .catch(() => {
//         dispatch({
//           type: GET_PRODUCTS_REVIEW_TOTAL,
//           total: 0
//         })
//       })
//   }
// }

export const getTourById = (id, setLoading, handleSuccess, handleError) => {
  try {
    setLoading(true)
    instances
      .get(`/get-tour-by-id/`, { params: { tourId: id } })
      .then((response) => {
        setLoading(false)
        handleSuccess(response?.data?.tours)
      })
      .catch(() => {
        setLoading(false)
        handleSuccess({})
      })
  } catch {
    handleError("Something wrong")
  }
}

export const getHotels = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/hotel`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_HOTELS,
          hotels: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_HOTELS,
          tours: [],
          hotels: 0
        })
      })
  }
}

export const changeStatusTour = (tour, notification, toggleLoading, getReviews) => {
  return async (dispatch) => {
    const { id } = tour
    toggleLoading(true)
    await instances
      .put(`/review/${id}`, { displayFlag: !reviewData?.displayFlag })
      .then((res) => {
        if (!res.data.error) {
          toggleLoading(false)
          notification.toast.success(notification.success("Update review successfully!"))
          getReviews()
        } else {
          toggleLoading(false)
          notification.toast.error(notification.error(res.data.meta.messages))
        }
      })
      .catch((err) => {
        toggleLoading(false)
        notification.toast.error(notification.error("Update review failed!"))
      })
  }
}

export const createHotel = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .post("/hotel", data)
      .then((res) => {
        if (res.data.errCode === 200) {
          handleSuccess("Create hotel successfully!")
          endLoading()
        } else {
          endLoading()
          handleError(res.data.meta.messages)
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message
        handleError(message || "Create hotel failed!")
        endLoading()
      })
  } catch (err) {
    handleError("Create hotel failed!")
    endLoading()
  }
}

export const updateTourStatus = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .patch(`/update-tour-status/`, data)
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Update status successfully!")
        } else {
          handleError("Update status failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Update status failed!")
      })
  } catch (err) {
    endLoading()
  }
}

export const updateHotelById = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .put(`/hotel/update`, data)
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Update successfully!")
        } else {
          handleError("Update failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Update failed!")
      })
  } catch (err) {
    endLoading()
  }
}

export const deleteHotel = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .delete(`/hotel/remove-hotel`, { data })
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Delete successfully!")
        } else {
          handleError("Delete failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Delete failed!")
      })
  } catch (err) {
    endLoading()
  }
}
