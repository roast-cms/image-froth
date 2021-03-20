# image-froth

![GitHub version](https://badge.fury.io/gh/roast-cms%2Fimage-froth.svg)

> 🥛 Prevent jumping content while loading responsive images with Cloudinary

### Why does content jump when images load?

If you don't want your page to jump every time a new image is starting to load you need to let the browser know the height of your images ahead of time. Otherwise it's assumed that the height is 0, which rapidly and unexpectedly changes as the real data about its dimensions comes in. This makes reading and interacting with content a frustrating task for the users.

If you are using a responsive image system (where you have multiple image versions for various screen sizes) along with flexible image dimensions (i.e.: `width: 100%`) things get complicated.

This tool solves this issue by adopting a simple image naming system and generating all the necessary data your browser needs to know to _tame_ your content pages.

### What you will need.

```
# first you'll need the package:
yarn add @roast-cms/image-froth
```

This tool is built to be used with [Cloudinary](https://cloudinary.com) image management service, though you can easily adopt it to work with whatever image storage tool you use.

You will, however, have to change the way you name your image files to:

```
image-froth_1500000_BJ7LbcnLG.jpg
```

...where `_150000_` is the image ratio that you will need to calculate when uploading the image using this formula: `Math.round((width/height)*1000000)`, and `BJ7LbcnLG` is a random alphanumeric string to avoid clashing file names. `image_froth` prefix and image ratio number are mandatory, though you can name your files what you like, random string is just a suggestion.

### How to use.

The simplest use is getting a Cloudinary image URL along with ratio data from the filename:

```javascript
froth(
  {
    // image file without extension
    src: "image-froth_1500000_BJ7LbcnLGb",
  },
  {
    server: "https://res.cloudinary.com/analog-cafe/image/upload/",
    transformations: "",
    sizes: {
      m: "520", // medium (this is required)
      l: "1800", // large
    },
    // placeholder image src (in this case it's a white dot)
    placeholder:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  }
);
// will return:
// {
//   height: 347
//   width: 520
//   ratio: 1.5
//   src: "https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1268/image-froth_1500000_BJ7LbcnLGb.jpg"
//   type: "jpg"
// }
```

**A bit more complicated but a real-world scenario**. Below is an example of how the tool is used on [Analog.Cafe](https://www.analog.cafe) blog using **React**:

```
<picture
  style={{
    // padding-bottom is a CSS trick that's used to set responsive image ratios
    // without distorting the image width as the screen is resized:
    padding-bottom:
      `${
        // extracting the image ratio...
        froth({ src: "image-froth_1500000_BJ7LbcnLG.jpg" }).ratio
        // converting it to CSS-readable percent
        ? Math.round(100 / froth({ src: "image-froth_1500000_BJ7LbcnLG.jpg" }).ratio, 3)
        : 0
      }%`
    }}
>
  <source
    srcSet={
      froth({

        // this is wht we'd store in the database as image URL for this document;
        // instead of full URL address, it'll be simply the image reference
        // in the form described above:
        src: "image-froth_1500000_BJ7LbcnLG.jpg",

        // here you can choose a pre-determined image size (see below):
        size: "s"

        // `froth()` will return the full image URL:
        }).src
      }
    media="(max-width: 480px)"
  />
  <source
    srcSet={froth({ src: "image-froth_1500000_BJ7LbcnLG.jpg", size: "l" }).src}
    media="(min-width: 1201px)"
  />
  <img
    src={froth({ src: "image-froth_1500000_BJ7LbcnLG.jpg", size: "l" }).src}
    style={{
      // going along with the above CSS trick for padding-bottom rule
      height: froth({ src }).ratio ? "100%" : "initial"
    }}
  />
</picture>

// additionally other image formats could be requested within <picture /> element
// using { type: "webp" } option, for example.
```

### Contributing

PRs and issue reports are welcome. Please submit all PRs to `develop` branch. To test, run `yarn dev`
