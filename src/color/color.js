import { Color, parseColor as drawingParseColor, resolveElementColor } from "@progress/kendo-drawing";
let colorProbe;
function getColorProbe() {
    if (typeof document === "undefined") {
        return null;
    }
    if (!colorProbe) {
        colorProbe = document.createElement("span");
        colorProbe.setAttribute("aria-hidden", "true");
        colorProbe.style.cssText = "position:absolute;left:-10000px;top:-10000px;visibility:hidden;pointer-events:none;";
        (document.body || document.documentElement).appendChild(colorProbe);
    }
    return colorProbe;
}
function resolveCssColor(value) {
    if (typeof value !== "string") {
        return null;
    }
    const probe = getColorProbe();
    if (!probe) {
        return null;
    }
    const previousColor = probe.style.color;
    probe.style.color = "";
    probe.style.color = value;
    if (!probe.style.color) {
        probe.style.color = previousColor;
        return null;
    }
    const color = drawingParseColor(resolveElementColor(probe, "color"), true);
    probe.style.color = previousColor;
    return color;
}
export function parseColor(value, safe) {
    const color = drawingParseColor(value, true);
    if (color || !value || value === "none" || value instanceof Color) {
        if (color || safe) {
            return color;
        }
        return drawingParseColor(value, safe);
    }
    const resolvedColor = resolveCssColor(value);
    if (resolvedColor || safe) {
        return resolvedColor;
    }
    return drawingParseColor(value, safe);
}
