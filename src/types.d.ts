export interface frothOptions {
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
}

export interface frothConstants {
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
