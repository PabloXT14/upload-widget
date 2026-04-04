/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Progress from "@radix-ui/react-progress"
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react"
import { motion } from "motion/react"

import { formatBytes } from "../../../utils/format.bytes"
import { useUploadStore, type Upload } from "../../../store/upload-store"

import { Button } from "../../ui/button"

type UploadItemProps = {
  upload: Upload
  uploadId: string
}

export const UploadItem = ({ upload, uploadId }: UploadItemProps) => {
  const cancelUpload = useUploadStore((state) => state.cancelUpload)

  const progressPercentage = Math.min(
    Math.round((upload.uploadSizeInBytes / upload.originalSizeInBytes) * 100),
    100
  )

  return (
    <motion.div
      className="relative flex flex-col gap-3 overflow-hidden rounded-lg bg-white/2 p-3 shadow-shape-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* TEXTS */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span className="font-medium text-xs">{upload.name}</span>
        </div>

        <span className="flex items-center gap-1.5 text-xxs text-zinc-400">
          {/* SIZE */}
          <span className="line-through">
            {formatBytes(upload.originalSizeInBytes)}
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {/* COMPRESSION RATIO */}
          <span>
            300KB
            <span className="ml-1 text-green-400">-94%</span>
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {/* PROGRESS */}
          {upload.status === "progress" && <span>{progressPercentage}%</span>}

          {upload.status === "success" && (
            <span className="text-green-400">Upload finished</span>
          )}

          {upload.status === "error" && (
            <span className="text-red-400">Upload failed</span>
          )}

          {upload.status === "canceled" && (
            <span className="text-yellow-400">Upload canceled</span>
          )}
        </span>
      </div>

      {/* PROGRESS BAR */}
      <Progress.Root
        value={progressPercentage}
        data-status={upload.status}
        className="group h-1 overflow-hidden rounded-full bg-zinc-800"
      >
        <Progress.Indicator
          className="h-1 bg-indigo-500 transition-all group-data-[status=canceled]:bg-yellow-400 group-data-[status=error]:bg-red-400 group-data-[status=success]:bg-green-400"
          style={{
            width:
              upload.status === "progress" ? `${progressPercentage}%` : "100%",
          }}
        />
      </Progress.Root>

      {/* ACTIONS */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button disabled={upload.status !== "success"} size="icon-sm">
          <Download className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button disabled={upload.status !== "success"} size="icon-sm">
          <Link2 className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button
          disabled={!["canceled", "error"].includes(upload.status)}
          size="icon-sm"
        >
          <RefreshCcw className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Retry upload</span>
        </Button>

        <Button
          disabled={upload.status !== "progress"}
          size="icon-sm"
          onClick={() => cancelUpload(uploadId)}
        >
          <X className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Cancel upload</span>
        </Button>
      </div>
    </motion.div>
  )
}
