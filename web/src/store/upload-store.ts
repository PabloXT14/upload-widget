import { create } from "zustand"

export type Upload = {
  name: string
  file: File
}

type UploadStoreState = {
  uploads: Map<string, Upload>
  addUploads: (files: File[]) => void
}

export const useUploadStore = create<UploadStoreState>((set, _get) => ({
  uploads: new Map(),
  addUploads: (files) => {
    for (const file of files) {
      const uploadId = crypto.randomUUID()

      const upload: Upload = {
        name: file.name,
        file,
      }

      set((state) => ({
        uploads: new Map(state.uploads).set(uploadId, upload),
      }))
    }
  },
}))
