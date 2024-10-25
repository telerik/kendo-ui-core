 import "./kendo.core.js";
 import {
    Color,
    namedColors,
    parseColor
} from "@progress/kendo-drawing";

export const __meta__ = {
    id: "color",
    name: "Color utils",
    category: "framework",
    advanced: true,
    description: "Color utilities used across components",
    depends: [ "core" ]
};

window.kendo = window.kendo || {};

kendo.deepExtend(kendo, {
    parseColor: parseColor,
    namedColors: namedColors,
    Color: Color
});

