import "./kendo.core.js";
import { Color, namedColors, parseColor } from "./color";

export const __meta__ = {
    id: "color",
    name: "Color utils",
    category: "framework",
    advanced: true,
    description: "Color utilities used across components",
    depends: ["core"],
};

window.kendo = window.kendo || {};
kendo.parseColor = parseColor;
kendo.namedColors = namedColors;
kendo.Color = Color;
