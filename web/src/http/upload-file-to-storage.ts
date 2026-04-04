import { uploadWidgetApi } from "../api/upload-widget-api"

type UploadFileToStorageParams = {
  file: File
}

type UploadFileToStorageResponse = {
  url: string
}

type UploadFileToStorageOptions = {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file }: UploadFileToStorageParams,
  options?: UploadFileToStorageOptions
) {
  const formData = new FormData()

  formData.append("file", file)

  const response = await uploadWidgetApi.post<UploadFileToStorageResponse>(
    "/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: options?.signal,
    }
  )

  return {
    url: response.data.url,
  }
}
