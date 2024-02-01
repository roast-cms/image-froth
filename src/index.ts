import { frothConstants, frothOptions } from "./types.d";

/**
Generate `froth` properties object from input options and constants.
*/
export const froth = (
  /**
  Input data for `froth` to create its result object from.
  */
  options: frothOptions = {},
  /**
  Set of values that remains constant throughout the project.
  */
  CONSTANTS: frothConstants
) => {
  if (!CONSTANTS) {
    console.error("Constants required but not provided: froth({}, CONSTANTS)");
    return;
  }
  let src = options.src || CONSTANTS.placeholder;
  let size = options.size || "image-s";
  let type = options.type || "jpg";
  let crop = options.crop || "none";

  // @ts-ignore
  let width = parseInt(CONSTANTS.sizes[size]);
  let height = null;
  let ratio = 0;

  // extension is passed in through id:
  if (/[.]/.exec(src)) {
    type = src.split(".").pop(); // log extension
    src = src.replace(/\.[^/.]+$/, ""); // remove extension from file name
  }

  if (src.indexOf("image-froth") > -1 && src.indexOf("/") === -1) {
    if (crop === "none") {
      src = `${CONSTANTS.server}${CONSTANTS.transformations},w_${width}/${src}.${type}`;
      ratio =
        parseInt(src.split("image-froth_").pop().split("_").shift()) / 1000000;
      height = Math.round(width / ratio);
    } else if (crop === "square") {
      ratio = 1;
      height = width;
      src = `${CONSTANTS.server}c_fill,g_auto,w_${width},h_${height}/${src}.${type}`;
    }
  }
  return {
    src,
    type,
    ratio,
    width,
    height,
  };
};

/**
Get `froth` id from a file pathname.
*/
export const getFroth = (src: string): string => {
  if (src.indexOf("data:image") > -1) return "default";
  let id;
  id = src.split("\\").pop().split("/").pop(); // get rid of domain and pathname
  id = id.replace(/\.[^/.]+$/, ""); // get rid of extension
  return id;
};
