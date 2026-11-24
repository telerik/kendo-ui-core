import { $ } from "../core/services/kendo-jquery.service.js";
import { supportService } from "../core/services/support.service.js";
import { directions } from "./directions.js";
import { HEIGHT, oldEffectsRegExp, singleEffectRegExp, TRANSFORM, TRANSITION, transform2d, transformProps } from "./constants.js";
export let each = $.each;
export let extend = $.extend;
export let support = supportService;
export function toggleClass(element, classes, options, add) {
    if (classes) {
        const classNames = classes.split(" ");
        options = extend({
            exclusive: "all",
            duration: 400,
            ease: "ease-out"
        }, options);
        element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease);
        setTimeout(function () {
            element.css(TRANSITION, "").css(HEIGHT);
        }, options.duration); // TODO: this should fire a kendoAnimate session instead.
        each(classNames, function (idx, value) {
            element.toggleClass(value, add);
        });
    }
    return element;
}
export function parseEffects(input, mirror) {
    const effects = {};
    const directionMap = directions;
    if (typeof input === "string") {
        each(input.split(" "), function (idx, value) {
            const redirectedEffect = !singleEffectRegExp.test(value);
            const // Support for old zoomIn/fadeOut style, now deprecated.
            resolved = value.replace(oldEffectsRegExp, function (match, $1, $2) {
                return $1 + ":" + $2.toLowerCase();
            });
            const effect = resolved.split(":");
            const direction = effect[1];
            const effectBody = {};
            if (effect.length > 1) {
                effectBody.direction = mirror && redirectedEffect ? directionMap[direction].reverse : direction;
            }
            effects[effect[0]] = effectBody;
        });
    }
    else {
        Object.keys(input).forEach(function (idx) {
            const effect = input[idx];
            const direction = effect.direction;
            if (direction && mirror && !singleEffectRegExp.test(String(idx))) {
                effect.direction = directionMap[direction].reverse;
            }
            effects[String(idx)] = effect;
        });
    }
    return effects;
}
export function parseInteger(value) {
    return parseInt(String(value), 10);
}
export function parseCSS(element, property) {
    return parseInteger(element.css(property));
}
export function keys(obj) {
    let propertyName;
    const acc = [];
    for (propertyName in obj) {
        acc.push(propertyName);
    }
    return acc;
}
export function strip3DTransforms(properties) {
    let key;
    for (key in properties) {
        if (transformProps.indexOf(key) != -1 && transform2d.indexOf(key) == -1) {
            delete properties[key];
        }
    }
    return properties;
}
export function normalizeCSS(_element, properties) {
    const transformation = [];
    const cssValues = {};
    let lowerKey;
    let key;
    let value;
    let isTransformed;
    for (key in properties) {
        lowerKey = key.toLowerCase();
        isTransformed = transformProps.indexOf(lowerKey) != -1;
        if (!support.hasHW3D && isTransformed && transform2d.indexOf(lowerKey) == -1) {
            delete properties[key];
        }
        else {
            value = properties[key];
            if (isTransformed) {
                transformation.push(key + "(" + value + ")");
            }
            else {
                cssValues[key] = value;
            }
        }
    }
    if (transformation.length) {
        cssValues[TRANSFORM] = transformation.join(" ");
    }
    return cssValues;
}
