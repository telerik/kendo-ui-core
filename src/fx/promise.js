import { effectsService } from "../core/services/effects.service.js";
import { EffectSet } from "./animation.js";
import { strip3DTransforms } from "./utils.js";
export function promise(element, options) {
    let effectName;
    const parsedEffects = effectsService.parseEffects(options.effects);
    const effects = [];
    const effectSet = new EffectSet(element, { ...options, effects: parsedEffects });
    let effect;
    options.effects = parsedEffects;
    for (effectName in parsedEffects) {
        const effectDefinition = parsedEffects[effectName];
        effect = effectsService.createEffect(effectName, element, typeof effectDefinition === "string" ? undefined : effectDefinition.direction);
        if (effect) {
            effects.push(effect);
        }
    }
    if (effects[0]) {
        effectSet.run(effects);
    }
    else {
        // Not sure how would an fx promise reach this state - means that you call kendoAnimate with no valid effects? Why?
        if (!element.is(":visible")) {
            element.css({
                display: element.data("olddisplay") || "block"
            }).css("display");
        }
        if (options.init) {
            options.init();
        }
        element.dequeue();
        effectSet.complete();
    }
}
export function animate(elements, properties, options) {
    let useTransition = options.transition !== false;
    delete options.transition;
    const transitionHandler = effectsService.transition;
    if (transitionHandler && useTransition) {
        transitionHandler(elements, properties, options);
    }
    else {
        elements.animate(strip3DTransforms(properties), {
            queue: false,
            show: false,
            hide: false,
            duration: options.duration,
            complete: options.complete
        }); // Stop animate from showing/hiding the element to be able to hide it later on.
    }
}
