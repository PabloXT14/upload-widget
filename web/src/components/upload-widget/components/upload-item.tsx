/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Progress from "@radix-ui/react-progress"
import { Download, ImageUp, Link2, RefreshCcw, Trash, X } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "../../ui/button"

export const UploadItem = () => {
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
          <span className="font-medium text-xs">screenshot.png</span>
        </div>

        <span className="flex items-center gap-1.5 text-xxs text-zinc-400">
          {/* SIZE */}
          <span className="line-through">3.6 MB</span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {/* COMPRESSION RATIO */}
          <span>
            300KB
            <span className="ml-1 text-green-400">-94%</span>
          </span>

          <div className="size-1 rounded-full bg-zinc-700" />

          {/* PROGRESS */}
          <span>45%</span>
        </span>
      </div>

      {/* PROGRESS BAR */}
      <Progress.Root className="h-1 overflow-hidden rounded-full bg-zinc-800">
        <Progress.Indicator
          className="h-1 bg-indigo-500"
          style={{
            width: "45%",
          }}
        />
      </Progress.Root>

      {/* ACTIONS */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="icon-sm">
          <Download className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Download compressed image</span>
        </Button>

        <Button size="icon-sm">
          <Link2 className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Copy remote URL</span>
        </Button>

        <Button size="icon-sm">
          <RefreshCcw className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Retry upload</span>
        </Button>

        <Button size="icon-sm">
          <X className="size-4" strokeWidth={1.5} />

          <span className="sr-only">Cancel upload</span>
        </Button>

        <Button size="icon-sm">
          <Trash className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Delete image</span>
        </Button>
      </div>
    </motion.div>
  )
}
