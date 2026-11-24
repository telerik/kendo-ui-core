import { $ } from "../core/services/kendo-jquery.service.js";
import { domUtilsService } from "../core/services/dom-utils.service.js";
import { ABORT_ID, COMPLETE_CALLBACK, TRANSFORM, TRANSITION, TRANSITIONEND } from "./constants.js";
import { extend, keys, normalizeCSS } from "./utils.js";
export function transition(element, properties, options) {
    let css;
    let delay = 0;
    let oldKeys = element.data("keys") || [];
    let timeoutID = null;
    options = extend({
        duration: 200,
        ease: "ease-out",
        complete: null,
        exclusive: "all"
    }, options);
    let stopTransitionCalled = false;
    let stopTransition = function () {
        if (!stopTransitionCalled) {
            stopTransitionCalled = true;
            if (timeoutID) {
                clearTimeout(timeoutID);
                timeoutID = null;
            }
            element.removeData(ABORT_ID).dequeue().css(TRANSITION, "").css(TRANSITION);
            options.complete.call(element);
        }
    };
    const fxSettings = $.fx;
    options.duration = $.fx ? fxSettings.speeds?.[String(options.duration)] || options.duration || 0 : options.duration || 0;
    css = normalizeCSS(element, properties);
    $.merge(oldKeys, keys(css));
    if ($.hasOwnProperty("uniqueSort")) {
        element.data("keys", $.uniqueSort(oldKeys)).height();
    }
    else {
        element.data("keys", $.unique(oldKeys)).height();
    }
    element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease).css(TRANSITION);
    element.css(css).css(TRANSFORM);
    /**
         * Use transitionEnd event for browsers who support it - but duplicate it with setTimeout, as the transitionEnd event will not be triggered if no CSS properties change.
         * This should be cleaned up at some point (widget by widget), and refactored to widgets not relying on the complete callback if no transition occurs.
         *
         * For IE9 and below, resort to setTimeout.
         */
    element.one(TRANSITIONEND, stopTransition);
    if (options.duration !== 0) {
        delay = 500;
    }
    timeoutID = setTimeout(stopTransition, options.duration + delay);
    element.data(ABORT_ID, timeoutID);
    element.data(COMPLETE_CALLBACK, stopTransition);
}
export function stopQueue(element, clearQueue, gotoEnd) {
    let cssValues;
    const taskKeys = element.data("keys");
    const retainPosition = !gotoEnd && taskKeys;
    const completeCallback = element.data(COMPLETE_CALLBACK);
    if (retainPosition) {
        cssValues = domUtilsService.getComputedStyles(element[0], taskKeys);
    }
    if (completeCallback) {
        completeCallback();
    }
    if (retainPosition) {
        element.css(cssValues || {});
    }
    return element.removeData("keys").stop(clearQueue);
}
