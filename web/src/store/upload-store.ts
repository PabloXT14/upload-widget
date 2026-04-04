import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet } from "immer"

import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
}

type UploadStoreState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
  cancelUpload: (uploadId: string) => void
}

enableMapSet() // Enable Map and Set support in Immer

export const useUploadStore = create<
  UploadStoreState,
  [["zustand/immer", never]]
>(
  immer((set, get) => {
    const processUpload = async (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      try {
        await uploadFileToStorage(
          { file: upload.file },
          { signal: upload.abortController?.signal }
        )

        set((state) => {
          state.uploads.set(uploadId, {
            ...upload,
            status: "success",
          })
        })
      } catch (_error) {
        set((state) => {
          state.uploads.set(uploadId, {
            ...upload,
            status: "error",
          })
        })
      }
    }

    const addUploads = (files: File[]) => {
      for (const file of files) {
        const uploadId = crypto.randomUUID()
        const abortController = new AbortController()

        const upload: Upload = {
          name: file.name,
          file,
          abortController,
          status: "progress",
        }

        set((state) => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    const cancelUpload = (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      // Here you would also want to cancel the actual upload request to the server
      upload.abortController.abort()

      set((state) => {
        state.uploads.set(uploadId, {
          ...upload,
          status: "canceled",
        })
      })
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
    }
  })
)
