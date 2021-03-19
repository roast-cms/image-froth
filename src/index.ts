/**
Generate `froth` properties object from input options and constants.
*/
export const froth = (
  /**
  Input data for `froth` to create its result object from.
  */
  options: {
    /**
    Image filename without extension. Defaults to CONSTANTS.placeholder.
    */
    src?: string;
    /**
    Chosen size from CONSTANTS.sizes. Defaults to CONSTANTS.sizes.m.
    */
    size?: string;
    /**
    Image type/extension format. Defaults to 'jpg'.
    */
    type?: string;
    /**
    Can add request to crop the image into a square.
    */
    crop?: "square";
  } = {},
  /**
  Set of values that remains constant throughout the project.
  */
  CONSTANTS: {
    /**
    Domain name + path of the hosting location for the images.
    */
    server?: string;
    /**
    Additional string that can be appended to server path, mainly used by
    Cloudinary for image transformations.
    */
    transformations?: string;
    /**
    Image URI string to show when intended image isn't available.
    */
    placeholder?: string;
    /**
    Map of available sizes to predefined one-letter shortcuts.
    */
    sizes: {
      /**
      Icon-sized images.
      */
      i?: string;
      /**
      Tiny images or avatars.
      */
      t?: string;
      /**
      Small images.
      */
      s?: string;
      /**
      Medium-sized images.
      */
      m?: string;
      /**
      Large images.
      */
      l?: string;
    };
  }
) => {
  if (!CONSTANTS) {
    console.error("Constants required but not provided: froth({}, CONSTANTS)");
    return;
  }
  let src = options.src || CONSTANTS.placeholder;
  let size = options.size || "m";
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
