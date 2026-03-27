import { Dropzone } from "./components/dropzone"
import { Header } from "./components/header"
import { UploadList } from "./components/upload-list"

export const UploadWidget = () => {
  return (
    <div className="w-full max-w-100 overflow-hidden rounded-lg bg-zinc-900 shadow-shape">
      <Header />

      {/* BODY */}
      <div className="flex flex-col gap-4 py-4">
        <Dropzone />

        <div className="box-content h-px w-full border-black/50 border-t bg-zinc-800" />

        <UploadList />
      </div>
    </div>
  )
}
