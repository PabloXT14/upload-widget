import { UploadCloud } from "lucide-react"

export const Title = () => {
  return (
    <div className="flex items-center gap-1.5">
      <UploadCloud className="size-4 text-zinc-400" strokeWidth={1.5} />

      <span className="text-left font-medium text-sm">Upload your file</span>
    </div>
  )
}
