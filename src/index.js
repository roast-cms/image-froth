"use strict";
exports.__esModule = true;
exports.getFroth = exports.froth = void 0;
/**
Generate `froth` properties object from input options and constants.
*/
var froth = function (
/**
Input data for `froth` to create its result object from.
*/
options, 
/**
Set of values that remains constant throughout the project.
*/
CONSTANTS) {
    if (options === void 0) { options = {}; }
    if (!CONSTANTS) {
        console.error("Constants required but not provided: froth({}, CONSTANTS)");
        return;
    }
    var src = options.src || CONSTANTS.placeholder;
    var size = options.size || "m";
    var type = options.type || "jpg";
    var crop = options.crop || "none";
    // @ts-ignore
    var width = parseInt(CONSTANTS.sizes[size]);
    var height = null;
    var ratio = 0;
    // extension is passed in through id:
    if (/[.]/.exec(src)) {
        type = src.split(".").pop(); // log extension
        src = src.replace(/\.[^/.]+$/, ""); // remove extension from file name
    }
    if (src.indexOf("image-froth") > -1 && src.indexOf("/") === -1) {
        if (crop === "none") {
            src = "" + CONSTANTS.server + CONSTANTS.transformations + ",w_" + width + "/" + src + "." + type;
            ratio =
                parseInt(src.split("image-froth_").pop().split("_").shift()) / 1000000;
            height = Math.round(width / ratio);
        }
        else if (crop === "square") {
            ratio = 1;
            height = width;
            src = CONSTANTS.server + "c_fill,g_auto,w_" + width + ",h_" + height + "/" + src + "." + type;
        }
    }
    return {
        src: src,
        type: type,
        ratio: ratio,
        width: width,
        height: height
    };
};
exports.froth = froth;
/**
Get `froth` id from a file pathname.
*/
var getFroth = function (src) {
    if (src.indexOf("data:image") > -1)
        return "default";
    var id;
    id = src.split("\\").pop().split("/").pop(); // get rid of domain and pathname
    id = id.replace(/\.[^/.]+$/, ""); // get rid of extension
    return id;
};
exports.getFroth = getFroth;
