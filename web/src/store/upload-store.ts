import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { useShallow } from "zustand/shallow"
import { CanceledError } from "axios"
import { enableMapSet } from "immer"

import { compressImage } from "../utils/compress-image"

import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
  name: string
  file: File
  abortController: AbortController
  status: "progress" | "success" | "error" | "canceled"
  originalSizeInBytes: number
  uploadSizeInBytes: number
  compressedSizeInBytes?: number
  remoteUrl?: string
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
    const updateUpload = (uploadId: string, data: Partial<Upload>) => {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      set((state) => {
        state.uploads.set(uploadId, { ...upload, ...data })
      })
    }

    const processUpload = async (uploadId: string) => {
      const upload = get().uploads.get(uploadId)

      if (!upload) {
        return
      }

      try {
        const compressedFile = await compressImage({
          file: upload.file,
          maxWidth: 1000,
          maxHeight: 1000,
          quality: 0.8,
        })

        // Update upload size after compression
        updateUpload(uploadId, { compressedSizeInBytes: compressedFile.size })

        const { url } = await uploadFileToStorage(
          {
            file: compressedFile,
            onProgress: (sizeInBytes) => {
              updateUpload(uploadId, { uploadSizeInBytes: sizeInBytes })
            },
          },
          { signal: upload.abortController?.signal }
        )

        updateUpload(uploadId, { status: "success", remoteUrl: url })
      } catch (error) {
        if (error instanceof CanceledError) {
          updateUpload(uploadId, { status: "canceled" })

          return
        }

        updateUpload(uploadId, { status: "error" })
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

export const usePendingUploads = () => {
  return useUploadStore(
    useShallow((state) => {
      const isThereAnyPendingUpload = Array.from(state.uploads.values()).some(
        (upload) => upload.status === "progress"
      )

      if (!isThereAnyPendingUpload) {
        return {
          isThereAnyPendingUpload,
          globalPercentage: 100,
        }
      }

      const { total, uploaded } = Array.from(state.uploads.values()).reduce(
        (acc, upload) => {
          acc.total +=
            upload.compressedSizeInBytes || upload.originalSizeInBytes
          acc.uploaded += upload.uploadSizeInBytes

          return acc
        },
        {
          total: 0,
          uploaded: 0,
        }
      )

      const globalPercentage = Math.min(
        Math.round((uploaded / total) * 100),
        100
      )

      return {
        isThereAnyPendingUpload,
        globalPercentage,
      }
    })
  )
}
