import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet } from "immer"

import { uploadFileToStorage } from "../http/upload-file-to-storage"
import { CanceledError } from "axios"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
  originalSizeInBytes: number
  uploadSizeInBytes: number
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
          {
            file: upload.file,
            onProgress: (sizeInBytes) => {
              set((state) => {
                state.uploads.set(uploadId, {
                  ...upload,
                  uploadSizeInBytes: sizeInBytes,
                })
              })
            },
          },
          { signal: upload.abortController?.signal }
        )

        set((state) => {
          state.uploads.set(uploadId, {
            ...upload,
            status: "success",
          })
        })
      } catch (error) {
        if (error instanceof CanceledError) {
          set((state) => {
            state.uploads.set(uploadId, {
              ...upload,
              status: "canceled",
            })
          })

          return
        }

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
          originalSizeInBytes: file.size,
          uploadSizeInBytes: 0, // You would update this as the upload progresses
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
    }

    return {
      uploads: new Map(),
      addUploads,
      cancelUpload,
    }
  })
)
