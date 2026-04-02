import { useDropzone } from "react-dropzone"
import { motion } from "motion/react"

import { useUploadStore } from "../../../store/upload-store"

import { CircularProgressBar } from "../../ui/circular-progress-bar"

export const Dropzone = () => {
  const { addUploads } = useUploadStore()

  const isThereAnyPendingUpload = false
  const uploadGlobalPercentage = 64

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles, _rejectedFiles, _event) => {
      addUploads(acceptedFiles)
    },
  })

  return (
    <motion.div
      className="flex flex-col gap-3 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* DROPZONE */}
      <div
        data-active={isDragActive}
        className="flex h-32 cursor-pointer items-center justify-center rounded-lg border border-zinc-700 border-dashed bg-zinc-950 p-5 transition-colors hover:border-zinc-600 data-[active=true]:border-indigo-500 data-[active=true]:border-solid data-[active=true]:bg-indigo-500/10 data-[active=true]:text-red-500"
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        {isThereAnyPendingUpload ? (
          <div className="flex flex-col items-center gap-2.5">
            <CircularProgressBar
              progress={uploadGlobalPercentage}
              size={56}
              strokeWidth={4}
            />

            <span className="text-xs text-zinc-400">Uploading 2 files...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-zinc-400">
              Drag and drop your files here or
            </span>
            <span className="font-medium text-xs text-zinc-300 underline">
              Choose files
            </span>
          </div>
        )}
      </div>

      {/* SUPPORTED FILES */}
      <span className="text-xxs text-zinc-400">
        Only PNG and JPEG are supported
      </span>
    </motion.div>
  )
}
