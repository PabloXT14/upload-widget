type CompressImageParams = {
  file: File
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

function convertToWebp(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".")

  if (lastDotIndex === -1) {
    return `${filename}.webp`
  }

  const nameWithoutExtension = filename.substring(0, lastDotIndex)
  return `${nameWithoutExtension}.webp`
}

export function compressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1,
}: CompressImageParams) {
  const allowedFileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
  ]

  if (!allowedFileTypes.includes(file.type)) {
    throw new Error(
      "Unsupported file type. Allowed types are: jpg, jpeg, png, webp."
    )
  }

  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader() // allow us to read the file piece by piece

    reader.onload = (event) => {
      const compressedImage = new Image() // create a new image element

      // when the image is loaded, we can draw it on a canvas and compress it
      compressedImage.onload = () => {
        const canvas = document.createElement("canvas")

        let width = compressedImage.width
        let height = compressedImage.height

        // calculate the new dimensions while maintaining the aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext("2d")

        if (!context) {
          reject(new Error("Could not get canvas context."))
          return
        }

        context.drawImage(compressedImage, 0, 0, width, height) // draw the image on the canvas with the new dimensions

        // Blob = Binary Format of the image data, which can be used to create a new file or upload it
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not compress the image."))
              return
            }

            const compressedFile = new File([blob], convertToWebp(file.name), {
              type: "image/webp",
              lastModified: Date.now(),
            }) // create a new file from the blob

            resolve(compressedFile) // resolve the promise with the compressed file
          },
          "image/webp",
          quality
        ) // specify the output format and quality
      }

      compressedImage.src = event.target?.result as string // set the source of the image to the data URL
    }

    reader.readAsDataURL(file) // read the file as a data URL
  })
}
