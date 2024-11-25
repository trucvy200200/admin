import instances from "@src/@core/plugin/axios"

export const GET_HOTELS = "GET_HOTELS"

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
          hotels: [],
          total: 0
        })
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
