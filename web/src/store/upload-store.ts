import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { enableMapSet } from "immer"

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
  immer((set, _get) => ({
    uploads: new Map(),
    addUploads: (files) => {
      for (const file of files) {
        const uploadId = crypto.randomUUID()

        const upload: Upload = {
          name: file.name,
          file,
        }

        set((state) => {
          state.uploads.set(uploadId, upload)
        })
      }
    },
  }))
)
