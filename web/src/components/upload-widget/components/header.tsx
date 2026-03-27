import { Minimize2 } from "lucide-react"

export const Header = () => {
  return (
    <div className="flex w-full items-center gap-1 border-zinc-800 border-b bg-white/2 px-5 py-4">
      <span className="flex-1 font-medium text-sm">Upload files (66%)</span>

      <button type="button" className="">
        <Minimize2 className="size-4 text-zinc-400" strokeWidth={1.5} />
      </button>
    </div>
  )
}
