export const downloadUrl = async (url: string) => {
  try {
    const response = await fetch(url, {
      mode: "cors",
    })

    const blob = await response.blob()

    const link = document.createElement("a")

    // Extract the filename from the URL
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const segments = pathname.split("/").filter((segment) => segment.length > 0)
    const filename = segments.at(-1) || "downloaded-file"

    link.href = URL.createObjectURL(blob)
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("Error downloading file:", error)
  }
}
