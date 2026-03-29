import { UploadItem } from "./upload-item"

export const UploadList = () => {
  return (
    <div className="flex flex-col gap-3 px-3">
      <span className="font-medium text-xs">
        Uploaded files <span className="text-zinc-400">(3)</span>
      </span>

      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <UploadItem key={`upload-item-${index + 1}`} />
        ))}
      </div>
    </div>
  )
}
