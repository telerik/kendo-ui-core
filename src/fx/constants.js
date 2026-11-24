export let matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i;
export let translateXRegExp = /translatex?$/i;
export let oldEffectsRegExp = /(zoom|fade|expand)(\w+)/;
export let singleEffectRegExp = /(zoom|fade|expand)/;
export let transformProps = [
    "perspective",
    "rotate",
    "rotatex",
    "rotatey",
    "rotatez",
    "rotate3d",
    "scale",
    "scalex",
    "scaley",
    "scalez",
    "scale3d",
    "skew",
    "skewx",
    "skewy",
    "translate",
    "translatex",
    "translatey",
    "translatez",
    "translate3d",
    "matrix",
    "matrix3d"
];
export let transform2d = [
    "rotate",
    "scale",
    "scalex",
    "scaley",
    "skew",
    "skewx",
    "skewy",
    "translate",
    "translatex",
    "translatey",
    "matrix"
];
export let round = Math.round;
export let BLANK = "";
export let PX = "px";
export let NONE = "none";
export let AUTO = "auto";
export let WIDTH = "width";
export let HEIGHT = "height";
export let HIDDEN = "hidden";
export let ORIGIN = "origin";
export let ABORT_ID = "abortId";
export let OVERFLOW = "overflow";
export let POSITION = "position";
export let COMPLETE_CALLBACK = "completeCallback";
export let TRANSITIONEND = "transitionend";
export let TRANSITION = "transition";
export let TRANSFORM = "transform";
export let BACKFACE = "backface-visibility";
export let PERSPECTIVE = "perspective";
export let DEFAULT_PERSPECTIVE = "1500px";
export let TRANSFORM_PERSPECTIVE = "perspective(" + DEFAULT_PERSPECTIVE + ")";
