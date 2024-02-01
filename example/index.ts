import { froth, getFroth } from "../src/index";

// all constants are required
const FROTH_CONSTANTS = {
  // cloudinary server and subfolder location
  server: "https://res.cloudinary.com/analog-cafe/image/upload/",
  // transformations (array) for images (kept constant)
  transformations: "c_scale,fl_progressive",
  // all sizes are image widths; heights are relative
  sizes: {
    "icon-m": "120",
    "icon-l": "280",
    "image-s": "480",
    "image-m": "640",
    "image-l": "880",
    "image-xl": "1268",
    "image-xxl": "1800",
    "image-xxxl": "3000",
  },

  // placeholder image src (in this case it's a white dot)
  placeholder:
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
};

console.log(
  "froth object from src string",
  froth({ src: "image-froth_1503759_f00XmodEz" }, FROTH_CONSTANTS)
);
console.log(
  "froth src string from URL",
  getFroth(
    "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_640/image-froth_1500000_BJ7LbcnLG.jpg"
  )
);
