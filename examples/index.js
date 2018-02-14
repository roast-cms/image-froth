import { froth, getFroth } from "../src"

// all constants are required
const FROTH_CONSTANTS = {
  // cloudinary server and subfolder location
  server: "https://res.cloudinary.com/analog-cafe/image/upload/",
  // transformations (array) for images (kept constant)
  transformations: "c_scale,fl_progressive",
  // all sizes are image widths; heights are relative
  sizes: {
    i: "40", // icon
    t: "280", // tiny
    s: "520", // small
    m: "1268", // medium
    l: "1800" // large
  },
  // placeholder image src (in this case it's a white dot)
  placeholder:
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
}

console.log(
  "froth object from src string",
  froth(
    { src: "image-froth_1681956_9ad677d272a84ebc9360ad6199372f8b" },
    FROTH_CONSTANTS
  )
)
console.log(
  "froth src string from URL",
  getFroth(
    "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1268/image-froth_1681956_9ad677d272a84ebc9360ad6199372f8b.jpg"
  )
)
