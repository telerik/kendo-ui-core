// Constants
const STRING = "string";
const BOOLEAN = "boolean";
/**
 * Effects Service - provides animation effects utilities
 
 */
export class EffectsService {
    constructor($, utilsService) {
        this.$ = $;
        this.utilsService = utilsService;
        this._directions = this.createDirections();
        this._effects = this.createEffects();
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
        const $ = this.$;
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
    /**
     * Prepare animation options with defaults
     */
    prepareAnimationOptions(options, duration, reverse, complete) {
        if (typeof options === STRING) {
            // options is the list of effect names separated by space e.g. animate(element, "fadeIn slideDown")
            // only callback is provided e.g. animate(element, options, function() {});
            if (this.utilsService.isFunction(duration)) {
                complete = duration;
                duration = 400;
                reverse = false;
            }
            if (this.utilsService.isFunction(reverse)) {
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
        return this.$.extend({
            //default options
            effects: {},
            duration: 400, //jQuery default duration
            reverse: false,
            init: this.$.noop,
            teardown: this.$.noop,
            hide: false
        }, options, { completeCallback: options.complete, complete: this.$.noop }); // Move external complete callback, so deferred.resolve can be always executed.
    }
    /**
     * Animate one or more elements
     */
    animate(element, options, duration, reverse, complete) {
        const $ = this.$;
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
    toggleClass(element, classes, options, add) {
        if (classes) {
            const classArray = classes.split(" ");
            this.$.each(classArray, (idx, value) => {
                element.toggleClass(value, add);
            });
        }
        return element;
    }
    /**
     * Create an effects element wrapper
     */
    fx(element) {
        return new this._effects.Element(element);
    }
}
