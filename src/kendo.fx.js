import "./kendo.core.js";

import { $ } from "./core/services/kendo-jquery.service.js";
import { effectsService } from "./core/services/effects.service.js";
import {
    Animation,
    Transition,
    animate,
    box,
    createEffect,
    directions,
    effects,
    fillScale,
    fitScale,
    fx,
    parseEffects,
    promise,
    stopQueue,
    toggleClass,
    transformOrigin,
    transition
} from "./fx/index.js";

export const __meta__ = {
    id: "fx",
    name: "Effects",
    category: "framework",
    description: "Required for animation effects in all Kendo UI widgets.",
    depends: ["core"],
};

const kendo = window.kendo || (window.kendo = {});

$.extend($.fn, {
    kendoStop: function(clearQueue, gotoEnd) {
        return stopQueue(this, clearQueue || false, gotoEnd || false);
    },
});

effects.promise = promise;
effects.animatedPromise = effects.promise;
effects.animate = animate;
effects.transition = transition;
effects.stopQueue = stopQueue;
effects.Animation = Animation;
effects.Transition = Transition;
effects.createEffect = createEffect;
fx.transition = transition;
fx.stopQueue = stopQueue;
fx.promise = promise;
fx.animatedPromise = effects.animatedPromise;
fx.Animation = Animation;
fx.Transition = Transition;
fx.createEffect = createEffect;
fx.box = box;
fx.transformOrigin = transformOrigin;
fx.fillScale = fillScale;
fx.fitScale = fitScale;
effects.box = box;
effects.transformOrigin = transformOrigin;
effects.fillScale = fillScale;
effects.fitScale = fitScale;

effectsService.register({
    directions: directions,
    parseEffects: parseEffects,
    toggleClass: toggleClass,
    transition: transition,
    stopQueue: stopQueue,
});
kendo.fx = fx;
kendo.effects = effects;
kendo.toggleClass = toggleClass;
kendo.parseEffects = parseEffects;
kendo.directions = directions;
export { Animation, Transition, animate, box, createEffect, directions, effects, fillScale, fitScale, fx, parseEffects, promise, stopQueue, toggleClass, transformOrigin, transition } from "./fx/index.js";
export default kendo;
