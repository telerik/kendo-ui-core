/**
 * KendoJQuery Service
 *
 * Provides a jQuery wrapper with Kendo-specific functionality:
 * - Event namespacing with automatic cleanup
 * - Handler context binding
 * - Touch/mouse event normalization
 * - Keyboard event handling
 *
 
 *
 * @module core-v2/services/kendo-jquery.service
 */
// Constants
const STRING = "string";
const UNDEFINED = "undefined";
/**
 * KendoJQuery Service
 * Creates and manages the KendoJQuery wrapper around jQuery
 */
export class KendoJQueryService {
    constructor($, support, mouseEventNormalizer, eventMapService, utils, noDeprecateExtend) {
        this.$ = $;
        this.support = support;
        this.mouseEventNormalizer = mouseEventNormalizer;
        this.eventMapService = eventMapService;
        this.utils = utils;
        this.originalOn = $.fn.on;
        this.kendoJQuery = this.createKendoJQuery(noDeprecateExtend);
        this.rootjQuery = this.kendoJQuery(document);
    }
    /**
     * Create the KendoJQuery constructor and prototype
     */
    createKendoJQuery(noDeprecateExtend) {
        const $ = this.$;
        const self = this;
        // Create the kendoJQuery function
        const kendoJQuery = function (selector, context) {
            return new kendoJQuery.fn.init(selector, context);
        };
        // Copy all jQuery static properties/methods (without deprecated warnings)
        noDeprecateExtend(true, kendoJQuery, $);
        // Set up prototype chain - inherit from jQuery
        // TypeScript doesn't like `new $()` but this is valid jQuery pattern
        kendoJQuery.fn = kendoJQuery.prototype = new $();
        kendoJQuery.fn.constructor = kendoJQuery;
        // Override init to use kendoJQuery for context
        kendoJQuery.fn.init = function (selector, context) {
            if (context && context instanceof $ && !(context instanceof kendoJQuery)) {
                context = kendoJQuery(context);
            }
            // $.fn.init exists on jQuery but TypeScript types don't expose it
            return $.fn.init.call(this, selector, context, self.rootjQuery);
        };
        kendoJQuery.fn.init.prototype = kendoJQuery.fn;
        // Add Kendo-specific methods
        $.extend(kendoJQuery.fn, {
            handler: function (handler) {
                this.data("handler", handler);
                return this;
            },
            autoApplyNS: function (ns) {
                this.data("kendoNS", ns || self.utils.guid());
                return this;
            },
            on: function (...args) {
                const that = this;
                const ns = that.data("kendoNS");
                const on = self.originalOn;
                // Support for event map signature (single object argument)
                if (args.length === 1) {
                    return on.call(that, args[0]);
                }
                let context = that;
                const argsCopy = args.slice();
                // Remove trailing undefined arguments
                if (typeof argsCopy[argsCopy.length - 1] === UNDEFINED) {
                    argsCopy.pop();
                }
                const callback = argsCopy[argsCopy.length - 1];
                const events = self.eventMapService.applyEventMap(argsCopy[0], ns);
                // Setup mouse trap for touch/mouse normalization
                if (self.support.mouseAndTouchPresent &&
                    events.search(/mouse|click/) > -1 &&
                    this[0] !== document.documentElement) {
                    self.mouseEventNormalizer.setupMouseMute();
                    const selector = argsCopy.length === 2 ? null : argsCopy[1];
                    const bustClick = events.indexOf("click") > -1 && events.indexOf("touchend") > -1;
                    on.call(this, {
                        touchstart: (e) => self.mouseEventNormalizer.muteMouse(e),
                        touchend: () => self.mouseEventNormalizer.unMuteMouse()
                    }, selector, {
                        bustClick: bustClick
                    });
                }
                // Handle keydown with widget keyboard navigation
                if (argsCopy[0].indexOf("keydown") !== -1 && argsCopy[1] && argsCopy[1].options) {
                    argsCopy[0] = events;
                    const widget = argsCopy[1];
                    const keyDownCallback = argsCopy[argsCopy.length - 1];
                    argsCopy[argsCopy.length - 1] = function (e) {
                        if (self.keyDownHandler(e, widget)) {
                            return keyDownCallback.apply(this, [e]);
                        }
                    };
                    on.apply(that, argsCopy);
                    return that;
                }
                // Handle string callback (method name on handler object)
                if (typeof callback === STRING) {
                    context = that.data("handler");
                    const callbackFn = context[callback];
                    argsCopy[argsCopy.length - 1] = function (e) {
                        callbackFn.call(context, e);
                    };
                }
                argsCopy[0] = events;
                on.apply(that, argsCopy);
                return that;
            },
            kendoDestroy: function (ns) {
                ns = ns || this.data("kendoNS");
                if (ns) {
                    this.off("." + ns);
                }
                return this;
            }
        });
        return kendoJQuery;
    }
    /**
     * Get the KendoJQuery constructor function
     */
    getConstructor() {
        return this.kendoJQuery;
    }
    /**
     * Create a KendoJQuery wrapper
     */
    create(selector, context) {
        return this.kendoJQuery(selector, context);
    }
    /**
     * Handle keydown events for a widget
     * Executes all kendoKeydown handlers and checks if event should be prevented
     */
    keyDownHandler(e, widget) {
        const events = widget._events.kendoKeydown;
        if (!events) {
            return true;
        }
        // Clone the events array to prevent modification during iteration
        const eventsCopy = events.slice();
        e.sender = widget;
        e.preventKendoKeydown = false;
        for (let idx = 0, length = eventsCopy.length; idx < length; idx++) {
            eventsCopy[idx].call(widget, e);
        }
        return !e.preventKendoKeydown;
    }
}
