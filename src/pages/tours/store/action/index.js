import instances, { instancesV4 } from "@src/@core/plugin/axios"

export const GET_TOURS = "GET_TOURS"
export const GET_INCOMING_TOURS = "GET_INCOMING_TOURS"

export const deleteTour = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .delete(`/tours/remove`, { data })
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

export const getIncomingTours = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/incoming-tours`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_INCOMING_TOURS,
          tours: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_INCOMING_TOURS,
          tours: [],
          total: 0
        })
      })
  }
}

export const approveIncomingTour = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .post(`/incoming-tours/accept`, data)
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Approve successfully!")
        } else {
          handleError("Approve failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Approve failed!")
      })
  } catch (err) {
    endLoading()
  }
}

export const rejectIncomingTour = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .post(`/incoming-tours/cancel`, data)
      .then((res) => {
        endLoading()
        if (res?.status === 200) {
          handleSuccess("Reject successfully!")
        } else {
          handleError("Reject failed!")
        }
      })
      .catch((err) => {
        endLoading()
        handleError("Reject failed!")
      })
  } catch (err) {
    endLoading()
  }
}
