import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet } from "immer"

import { uploadFileToStorage } from "../http/upload-file-to-storage"

export type Upload = {
  name: string
  file: File
}

type UploadStoreState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
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

      await uploadFileToStorage({ file: upload.file })
    }

    const addUploads = (files: File[]) => {
      for (const file of files) {
        const uploadId = crypto.randomUUID()

        const upload: Upload = {
          name: file.name,
          file,
        }

        set((state) => {
          state.uploads.set(uploadId, upload)
        })

        processUpload(uploadId)
      }
    }

    return {
      uploads: new Map(),
      addUploads,
    }
  })
)
