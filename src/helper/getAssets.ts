export function getAssetMeta(file: string) {
  const fileNameWithExt = file.substring(file.lastIndexOf('/') + 1)
  const fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.'))

  const fileExt = fileNameWithExt.substring(fileNameWithExt.lastIndexOf('.') + 1)

  return { ext: fileExt, name: fileName }
}
