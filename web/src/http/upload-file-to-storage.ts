import { uploadWidgetApi } from "../api/upload-widget-api"

type UploadFileToStorageParams = {
  file: File
}

type UploadFileToStorageResponse = {
  url: string
}

export async function uploadFileToStorage({ file }: UploadFileToStorageParams) {
  const formData = new FormData()

  formData.append("file", file)

  const response = await uploadWidgetApi.post<UploadFileToStorageResponse>(
    "/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return {
    url: response.data.url,
  }
}
