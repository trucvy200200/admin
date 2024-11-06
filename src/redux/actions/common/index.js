import instances, { instancesEnterprise, instancesV2, instancesV4 } from "@src/@core/plugin/axios"

export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  return await instances
    .post("setting/file/upload", formData)
    .then((res) => res?.data?.data?.fileUrl)
    .catch(() => null)
}

export const uploadImages = async (array) => {
  const formData = new FormData()
  let haveData = false
  let newArr = []
  array.map(async (item) => {
    if (item && typeof item !== "string") {
      haveData = true
      formData.append("image", item)
    } else newArr.push(item)
  })
  if (haveData) {
    const uploadImages = await instances.patch("/new-image", formData).then((res) => {
      return res?.data?.data
    })
    return [...newArr, uploadImages].join(",")
  }

  return array.join(",")
}
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  return instancesV4
    .post("setting/file/upload", formData)
    .then((res) => res?.data?.data?.fileUrl)
    .catch(() => null)
}
