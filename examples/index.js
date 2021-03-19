"use strict";
exports.__esModule = true;
var index_1 = require("../src/index");
// all constants are required
var FROTH_CONSTANTS = {
    // cloudinary server and subfolder location
    server: "https://res.cloudinary.com/analog-cafe/image/upload/",
    // transformations (array) for images (kept constant)
    transformations: "c_scale,fl_progressive",
    // all sizes are image widths; heights are relative
    sizes: {
        i: "40",
        t: "280",
        s: "520",
        m: "1268",
        l: "1800"
    },
    // placeholder image src (in this case it's a white dot)
    placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
};
console.log("froth object from src string", index_1.froth({ src: "image-froth_1500000_BJ7LbcnLGb" }, FROTH_CONSTANTS));
console.log("froth src string from URL", index_1.getFroth("https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_1268/image-froth_1500000_BJ7LbcnLG.jpg"));
