export const froth = (options = {}, CONSTANTS) => {
  if(!CONSTANTS){
    console.error("Constants required but not provided: froth({}, CONSTANTS)");
    return
  }
  let src = options.src || CONSTANTS.placeholder
  let size = options.size || "m"
  let type = options.type || "jpg"
  let crop = options.crop || "none"

  let width = CONSTANTS.sizes[size]
  let height = null
  let ratio = 0

  // extension is passed in through id:
  if (/[.]/.exec(src)) {
    type = src.split(".").pop() // log extension
    src = src.replace(/\.[^/.]+$/, "") // remove extension from file name
  }

  if (src.includes("image-froth") && !src.includes("/")) {
    if (crop === "none") {
      src = `${CONSTANTS.server}${CONSTANTS.transformations},w_${width}/${src}.${type}`
      ratio = src.split("image-froth_").pop().split("_").shift() / 1000000
      height = Math.round(width / ratio, 1)
    } else if (crop === "square") {
      ratio = 1
      height = width
      src =
      `${CONSTANTS.server}c_fill,g_auto,w_${width},h_${height}/${src}.${type}`
    }
  }
  return {
    src,
    type,
    ratio,
    width,
    height
  }
}

export const getFroth = (src) => {
  if (src.includes("data:image")) return "default"
  let id
  id = src.split("\\").pop().split("/").pop() // get rid of domain and pathname
  id = id.replace(/\.[^/.]+$/, "") // get rid of extension
  return id
}
