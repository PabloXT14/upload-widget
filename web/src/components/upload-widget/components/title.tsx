import { Loader2, UploadCloud } from "lucide-react"

export const Title = () => {
  const isThereAnyPendingUpload = true
  const uploadGlobalPercentage = 64

  return (
    <div className="flex items-center gap-1.5">
      {isThereAnyPendingUpload ? (
        <Loader2
          className="size-4 animate-spin text-zinc-400"
          strokeWidth={1.5}
        />
      ) : (
        <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />
      )}

      {isThereAnyPendingUpload ? (
        <span className="flex items-baseline gap-1 font-medium text-sm">
          Upload files
          <span className="text-xs text-zinc-400 tabular-nums">
            ({uploadGlobalPercentage}%)
          </span>
        </span>
      ) : (
        <span className="text-left font-medium text-sm">Upload your file</span>
      )}
    </div>
  )
}
