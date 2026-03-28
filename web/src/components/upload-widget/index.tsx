/** biome-ignore-all lint/performance/noNamespaceImport: needed */

import { useState } from "react"

import * as Collapsible from "@radix-ui/react-collapsible"

import { Dropzone } from "./components/dropzone"
import { Header } from "./components/header"
import { UploadList } from "./components/upload-list"
import { MinimizedButton } from "./components/minimized-button"

export const UploadWidget = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)

  return (
    <Collapsible.Root
      open={isWidgetOpen}
      onOpenChange={setIsWidgetOpen}
      className="w-full max-w-100 overflow-hidden rounded-lg bg-zinc-900 shadow-shape"
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
    </Collapsible.Root>
  )
}
