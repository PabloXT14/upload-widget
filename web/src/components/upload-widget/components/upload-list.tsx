import { useUploadStore } from "../../../store/upload-store"

import { UploadItem } from "./upload-item"

export const UploadList = () => {
  const uploads = useUploadStore((state) => state.uploads)

  const isUploadListEmpty = uploads.size === 0

  return (
    <div className="flex flex-col gap-3 px-3">
      <span className="font-medium text-xs">
        Uploaded files <span className="text-zinc-400">({uploads.size})</span>
      </span>

      {isUploadListEmpty ? (
        <span className="text-xs text-zinc-400">
          No uploads added to the queue
        </span>
      ) : (
        <div className="flex flex-col gap-2">
          {Array.from(uploads.entries()).map(([uploadId, upload]) => (
            <UploadItem key={`upload-item-${uploadId}`} upload={upload} />
          ))}
        </div>
      )}
    </div>
  )
}
