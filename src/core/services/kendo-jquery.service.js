/**
 * KendoJQuery Service
 *
 * Provides a jQuery wrapper with Kendo-specific functionality:
 * - Event namespacing with automatic cleanup
 * - Handler context binding
 * - Touch/mouse event normalization
 * - Keyboard event handling
 */
import { supportService } from "./support.service";
import { mouseEventNormalizerService } from "./mouse-event-normalizer.service";
import { eventMapService } from "./event-map.service";
import { utilsService } from "./utils.service";
// Constants
const STRING = "string";
const UNDEFINED = "undefined";
/**
 * KendoJQuery Service
 * Creates and manages the KendoJQuery wrapper around jQuery
 */
class KendoJQueryService {
    constructor() {
        this.originalOn = $.fn.on;
        this.kendoJQuery = this.createKendoJQuery();
        this.rootjQuery = this.kendoJQuery(document);
    }
    /**
     * Extend objects while avoiding jQuery deprecated properties
     */
    noDeprecateExtend(deep, target, ...sources) {
        let src, copyIsArray, copy, name, options, clone;
        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && typeof target !== "function") {
            target = {};
        }
        for (const source of sources) {
            // Only deal with non-null/undefined values
            if (source != null) {
                // Extend the base object
                for (name in source) {
                    // filters, concat and : properties are depricated in the jQuery 3.3.0
                    // cssNumber is deprecated in jQuery 4.0.0
                    // accessing these properties throw a warning when jQuery migrate is included
                    if (name === "filters" || name === "concat" || name === ":" || name === "cssNumber") {
                        continue;
                    }
                    src = target[name];
                    copy = source[name];
                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ($.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        }
                        else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = this.noDeprecateExtend(deep, clone, copy);
                        // Don't bring in undefined values
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // Return the modified object
        return target;
    }
    /**
     * Create the KendoJQuery constructor and prototype
     */
    createKendoJQuery() {
        const self = this;
        // Create the kendoJQuery function
        const kendoJQuery = function (selector, context) {
            return new kendoJQuery.fn.init(selector, context);
        };
        // Copy all jQuery static properties/methods (without deprecated warnings)
        this.noDeprecateExtend(true, kendoJQuery, $);
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
                this.data("kendoNS", ns || utilsService.guid());
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
                const events = eventMapService.applyEventMap(argsCopy[0], ns);
                // Setup mouse trap for touch/mouse normalization
                if (supportService.mouseAndTouchPresent &&
                    events.search(/mouse|click/) > -1 &&
                    this[0] !== document.documentElement) {
                    mouseEventNormalizerService.setupMouseMute();
                    const selector = argsCopy.length === 2 ? null : argsCopy[1];
                    const bustClick = events.indexOf("click") > -1 && events.indexOf("touchend") > -1;
                    on.call(this, {
                        touchstart: (e) => mouseEventNormalizerService.muteMouse(e),
                        touchend: () => mouseEventNormalizerService.unMuteMouse()
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
export const kendoJQueryService = new KendoJQueryService();
