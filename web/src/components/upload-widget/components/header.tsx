/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Collapsible from "@radix-ui/react-collapsible"
import { Minimize2 } from "lucide-react"

import { Button } from "../../ui/button"

export const Header = () => {
  return (
    <div className="flex w-full items-center gap-1 border-zinc-800 border-b bg-white/2 px-4 py-2">
      <span className="flex-1 font-medium text-sm">Upload files (66%)</span>

      <Collapsible.Trigger asChild>
        <Button size="icon" className="-mr-2">
          <Minimize2 className="size-4" strokeWidth={1.5} />
        </Button>
      </Collapsible.Trigger>
    </div>
  )
}
