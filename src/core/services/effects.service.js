import { utilsService } from "./utils.service";
// Constants
const STRING = "string";
const BOOLEAN = "boolean";
/**
 * Effects Service - provides animation effects utilities
 
 */
class EffectsService {
    _directions;
    _effects;
    _parseEffectsImpl;
    _animateImpl;
    _toggleClassImpl;
    _transitionImpl;
    _stopQueueImpl;
    _effectRegistry;
    constructor() {
        this._directions = this.createDirections();
        this._effects = this.createEffects();
        this._parseEffectsImpl = this.defaultParseEffects.bind(this);
        this._animateImpl = this.defaultAnimate.bind(this);
        this._toggleClassImpl = this.defaultToggleClass.bind(this);
        this._stopQueueImpl = this.defaultStopQueue.bind(this);
        this._effectRegistry = new Map();
    }
    /**
     * Create the directions map
     */
    createDirections() {
        return {
            left: {
                reverse: "right",
                property: "left",
                transition: "translatex",
                vertical: false,
                modifier: -1
            },
            right: {
                reverse: "left",
                property: "left",
                transition: "translatex",
                vertical: false,
                modifier: 1
            },
            down: {
                reverse: "up",
                property: "top",
                transition: "translatey",
                vertical: true,
                modifier: 1
            },
            up: {
                reverse: "down",
                property: "top",
                transition: "translatey",
                vertical: true,
                modifier: -1
            },
            top: {
                reverse: "bottom"
            },
            bottom: {
                reverse: "top"
            },
            "in": {
                reverse: "out",
                modifier: -1
            },
            out: {
                reverse: "in",
                modifier: 1
            },
            vertical: {
                reverse: "vertical"
            },
            horizontal: {
                reverse: "horizontal"
            }
        };
    }
    /**
     * Create the effects object
     */
    createEffects() {
        const effects = {
            enabled: true,
            Element: function (element) {
                this.element = $(element);
            },
            promise: function (element, options) {
                if (!element.is(":visible")) {
                    element.css({ display: element.data("olddisplay") || "block" }).css("display");
                }
                if (options.hide) {
                    element.data("olddisplay", element.data("olddisplay") || element.css("display")).hide();
                }
                if (options.init) {
                    options.init();
                }
                if (options.completeCallback) {
                    options.completeCallback(element); // call the external complete callback with the element
                }
                element.dequeue();
            },
            promiseShim: null, // Will be set below
            disable: function () {
                this.enabled = false;
                this.promise = this.promiseShim;
            },
            enable: function () {
                this.enabled = true;
                this.promise = this.animatedPromise;
            }
        };
        // Set promiseShim to be the same as promise initially
        effects.promiseShim = effects.promise;
        return effects;
    }
    /**
     * Get the directions map for animations
     */
    get directions() {
        return this._directions;
    }
    /**
     * Get the effects object
     */
    get effects() {
        return this._effects;
    }
    get transition() {
        return this._transitionImpl;
    }
    register(registration) {
        if (registration.directions) {
            this._directions = registration.directions;
        }
        if (registration.parseEffects) {
            this._parseEffectsImpl = registration.parseEffects;
        }
        if (registration.toggleClass) {
            this._toggleClassImpl = registration.toggleClass;
        }
        if (registration.transition) {
            this._transitionImpl = registration.transition;
        }
        if (registration.stopQueue) {
            this._stopQueueImpl = registration.stopQueue;
        }
    }
    registerEffect(name, effectCtor) {
        this._effectRegistry.set(name, effectCtor);
    }
    getEffect(name) {
        return this._effectRegistry.get(name);
    }
    createEffect(name, element, direction, ...args) {
        const effectCtor = this.getEffect(name);
        if (!effectCtor) {
            return undefined;
        }
        return new effectCtor(element, direction, ...args);
    }
    parseEffects(input, mirror) {
        return this._parseEffectsImpl(input, mirror);
    }
    /**
     * Prepare animation options with defaults
     */
    prepareAnimationOptions(options, duration, reverse, complete) {
        if (typeof options === STRING) {
            // options is the list of effect names separated by space e.g. animate(element, "fadeIn slideDown")
            // only callback is provided e.g. animate(element, options, function() {});
            if (utilsService.isFunction(duration)) {
                complete = duration;
                duration = 400;
                reverse = false;
            }
            if (utilsService.isFunction(reverse)) {
                complete = reverse;
                reverse = false;
            }
            if (typeof duration === BOOLEAN) {
                reverse = duration;
                duration = 400;
            }
            options = {
                effects: options,
                duration: duration,
                reverse: reverse,
                complete: complete
            };
        }
        return $.extend({
            //default options
            effects: {},
            duration: 400, //jQuery default duration
            reverse: false,
            init: $.noop,
            teardown: $.noop,
            hide: false
        }, options, { completeCallback: options.complete, complete: $.noop }); // Move external complete callback, so deferred.resolve can be always executed.
    }
    /**
     * Animate one or more elements
     */
    animate(element, options, duration, reverse, complete) {
        return this._animateImpl(element, options, duration, reverse, complete);
    }
    /**
     * Toggle CSS classes on element
     */
    toggleClass(element, classes, options, add) {
        return this._toggleClassImpl(element, classes, options, add);
    }
    stopQueue(element, clearQueue, gotoEnd) {
        return this._stopQueueImpl(element, clearQueue, gotoEnd);
    }
    /**
     * Create an effects element wrapper
     */
    fx(element) {
        return new this._effects.Element(element);
    }
    defaultParseEffects(input) {
        if (typeof input === "string") {
            const effects = {};
            $.each(input.split(" "), function (idx) {
                effects[idx] = this;
            });
            return effects;
        }
        if (!Array.isArray(input)) {
            return input;
        }
        const effects = {};
        $.each(input, function (idx) {
            effects[idx] = this;
        });
        return effects;
    }
    /**
     * Animate one or more elements
     */
    defaultAnimate(element, options, duration, reverse, complete) {
        const effects = this._effects;
        const preparedOptions = this.prepareAnimationOptions.bind(this);
        let idx = 0;
        const length = element.length;
        let instance;
        for (; idx < length; idx++) {
            instance = $(element[idx]);
            instance.queue(function () {
                effects.promise($(this), preparedOptions(options, duration, reverse, complete));
            });
        }
        return element;
    }
    /**
     * Toggle CSS classes on element
     */
    defaultToggleClass(element, classes, options, add) {
        if (classes) {
            const classArray = classes.split(" ");
            $.each(classArray, (idx, value) => {
                element.toggleClass(value, add);
            });
        }
        return element;
    }
    defaultStopQueue(element, clearQueue, gotoEnd) {
        return element.stop(clearQueue, gotoEnd);
    }
}
export const effectsService = new EffectsService();
