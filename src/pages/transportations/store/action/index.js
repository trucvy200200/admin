import instances, { instancesV4 } from "@src/@core/plugin/axios"

export const GET_VEHICLES = "GET_VEHICLES"

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

export const getVehicles = (setLoading, params) => {
  return async (dispatch) => {
    setLoading(true)
    instances
      .get(`/transport`, { params })
      .then((response) => {
        setLoading(false)
        dispatch({
          type: GET_VEHICLES,
          vehicles: response?.data?.data,
          total: response?.data?.total
        })
      })
      .catch(() => {
        setLoading(false)
        dispatch({
          type: GET_VEHICLES,
          vehicles: [],
          total: 0
        })
      })
  }
}

export const deleteVehicle = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .delete(`/transport/remove-transport`, { data })
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

export const createVehicle = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .post("/transport", data)
      .then((res) => {
        if (res.data.errCode === 200) {
          handleSuccess("Create vehicle successfully!")
          endLoading()
        } else {
          endLoading()
          handleError(res.data.meta.messages)
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message
        handleError(message || "Create vehicle failed!")
        endLoading()
      })
  } catch (err) {
    handleError("Create vehicle failed!")
    endLoading()
  }
}

export const updateVehicleById = async (data, handleSuccess, handleError, endLoading) => {
  try {
    await instances
      .put(`/transport/update`, data)
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
