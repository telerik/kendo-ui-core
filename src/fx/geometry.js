import { domUtilsService } from "../core/services/dom-utils.service.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { matrix3dRegExp, NONE, translateXRegExp, TRANSFORM } from "./constants.js";
import { parseInteger } from "./utils.js";
export function animationProperty(element, property) {
    let transform = element.css(TRANSFORM);
    if (transform == NONE) {
        return property == "scale" ? 1 : 0;
    }
    let match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)"));
    let computed = 0;
    if (match) {
        computed = parseInteger(match[1]);
    }
    else {
        const matrixMatch = transform.match(matrix3dRegExp) || ["0", "0", "0", "0", "0"];
        property = property.toLowerCase();
        if (translateXRegExp.test(property)) {
            computed = Number(matrixMatch[3]) / Number(matrixMatch[2]);
        }
        else if (property == "translatey") {
            computed = Number(matrixMatch[4]) / Number(matrixMatch[2]);
        }
        else if (property == "scale") {
            computed = Number(matrixMatch[2]);
        }
        else if (property == "rotate") {
            computed = Math.atan2(Number(matrixMatch[2]), Number(matrixMatch[1]));
        }
    }
    return computed;
}
export function box(element) {
    element = $(element);
    const result = (element.offset() || { top: 0, left: 0 });
    result.width = domUtilsService.outerWidth(element);
    result.height = domUtilsService.outerHeight(element);
    return result;
}
export function transformOrigin(inner, outer) {
    const x = ((inner.left - outer.left) * outer.width) / (outer.width - inner.width);
    const y = ((inner.top - outer.top) * outer.height) / (outer.height - inner.height);
    return {
        x: isNaN(x) ? 0 : x,
        y: isNaN(y) ? 0 : y
    };
}
export function fillScale(inner, outer) {
    return Math.min(inner.width / outer.width, inner.height / outer.height);
}
export function fitScale(inner, outer) {
    return Math.max(inner.width / outer.width, inner.height / outer.height);
}
