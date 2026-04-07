import { uploadWidgetApi } from "../api/upload-widget-api"

type UploadFileToStorageParams = {
  file: File
  onProgress: (sizeInBytes: number) => void
}

type UploadFileToStorageResponse = {
  url: string
}

type UploadFileToStorageOptions = {
  signal?: AbortSignal
}

export async function uploadFileToStorage(
  { file, onProgress }: UploadFileToStorageParams,
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
      onUploadProgress: (progressEvent) => {
        onProgress(progressEvent.loaded) // Call the onProgress callback with the number of bytes uploaded
      },
    }
  )

  console.log("File uploaded successfully:", response.data)

  return {
    url: response.data.url,
  }
}
