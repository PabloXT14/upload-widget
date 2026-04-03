import axios from "axios"

export const uploadWidgetApi = axios.create({
  baseURL: import.meta.env.VITE_UPLOAD_WIDGET_API_BASE_URL,
})
