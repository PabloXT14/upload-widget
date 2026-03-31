/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import * as Collapsible from "@radix-ui/react-collapsible"
import { motion, useCycle } from "motion/react"

import { Dropzone } from "./components/dropzone"
import { Header } from "./components/header"
import { UploadList } from "./components/upload-list"
import { MinimizedButton } from "./components/minimized-button"

export const UploadWidget = () => {
  const [isWidgetOpen, toggleWidgetOpen] = useCycle(false, true)

  return (
    <Collapsible.Root
      open={isWidgetOpen}
      onOpenChange={() => toggleWidgetOpen()}
      className="w-full max-w-100"
    >
      <motion.div
        className="mx-auto w-full overflow-hidden rounded-lg bg-zinc-900 shadow-shape"
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
