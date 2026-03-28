/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Collapsible from "@radix-ui/react-collapsible"
import { Maximize2 } from "lucide-react"

import { Title } from "./title"

export const MinimizedButton = () => {
  return (
    <Collapsible.Trigger className="group flex w-full items-center justify-between gap-5 rounded-lg border border-zinc-800 bg-white/2 px-4 py-3">
      <Title />

      <Maximize2
        className="size-4 text-zinc-400 group-hover:text-zinc-100"
        strokeWidth={1.5}
      />
    </Collapsible.Trigger>
  )
}
