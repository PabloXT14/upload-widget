/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Collapsible from "@radix-ui/react-collapsible"
import { motion, useCycle } from "motion/react"
import { twMerge } from "tailwind-merge"

import { usePendingUploads } from "../../store/upload-store"

import { Dropzone } from "./components/dropzone"
import { Header } from "./components/header"
import { UploadList } from "./components/upload-list"
import { MinimizedButton } from "./components/minimized-button"

export const UploadWidget = () => {
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  const { isThereAnyPendingUpload } = usePendingUploads()

  const shouldAnimateBorder = !isWidgetOpen && isThereAnyPendingUpload

  return (
    <Collapsible.Root
      open={isWidgetOpen}
      onOpenChange={() => toggleWidgetOpen()}
      asChild
    >
      <motion.div
        data-progress={isThereAnyPendingUpload}
        className={twMerge(
          "mx-auto w-full max-w-100 overflow-hidden rounded-lg border border-transparent bg-zinc-900 data-[state=closed]:data-[progress=false]:shadow-shape data-[state=open]:shadow-shape",
          shouldAnimateBorder && "animated-border"
        )}
        animate={isWidgetOpen ? "open" : "closed"}
        variants={{
          closed: {
            width: "max-content",
            height: 44,
          },
          open: {
            width: "100%",
            height: "auto",
            transition: {
              duration: 0.1,
            },
          },
        }}
      >
        {!isWidgetOpen && <MinimizedButton />}

        <Collapsible.Content className="w-full">
          <Header />

          {/* BODY */}
          <div className="flex flex-col gap-4 py-4">
            <Dropzone />

            <div className="box-content h-px w-full border-black/50 border-t bg-zinc-800" />

            <UploadList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  )
}
