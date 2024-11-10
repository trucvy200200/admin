import instances, { instancesV4 } from "@src/@core/plugin/axios"

export const GET_TOURS = "GET_TOURS"

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

export const getTours = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/tours/filter`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_TOURS,
          tours: response?.data?.tourData?.data,
          total: response?.data?.tourData?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_TOURS,
          tours: [],
          total: 0
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

export const createTour = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .post("/new-tour", data)
      .then((res) => {
        if (res.data.errCode === 200) {
          handleSuccess("Create tour successfully!")
          endLoading()
        } else {
          endLoading()
          handleError(res.data.meta.messages)
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message
        handleError(message || "Create tour failed!")
        endLoading()
      })
  } catch (err) {
    handleError("Create tour failed!")
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

export const updateTourById = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .patch(`/update-tour-by-id`, data)
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

export const uploadImages = async (array) => {
  const uploadPromises = array.map(async (item) => {
    const formData = new FormData()
    formData.append("file", item)
    const res = await instancesV4
      .post("setting/file/upload", formData)
      .then((res) => res)
      .catch(() => null)
    return res?.data?.data?.fileUrl
  })

  return Promise.all(uploadPromises)
}

export const uploadImage = async (item) => {
  if (!item) return null
  const formData = new FormData()
  formData.append("file", item)
  const res = await instancesV4
    .post("setting/file/upload", formData)
    .then((res) => res)
    .catch(() => null)
  return res?.data?.data?.fileUrl
}

export const updateTourImageById = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .patch(`/update-tour-image/`, data)
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
