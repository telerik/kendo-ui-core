// Constants
const OBJECT = "object";
const UNDEFINED = "undefined";
/**
 * Utility service providing general helper functions.
 
 */
export class UtilsService {
    constructor(kendo) {
        this.kendo = kendo;
        /**
         * Keyboard key codes for handling keyboard events.
         * Maps common key names to their numeric key codes.
         */
        this.keys = {
            INSERT: 45,
            DELETE: 46,
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            END: 35,
            HOME: 36,
            SPACEBAR: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            F2: 113,
            F10: 121,
            F12: 123,
            SHIFT: 16,
            NUMPAD_PLUS: 107,
            NUMPAD_MINUS: 109,
            NUMPAD_DOT: 110
        };
        /**
         * Days of the week mapping.
         * Sunday = 0, Saturday = 6 (matches JavaScript Date.getDay())
         */
        this.days = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        };
        // kendo.data is accessed at call time, not construction time,
        // because data types (ObservableArray, DataSource, etc.) are
        // defined later in kendo.data.js
    }
    /**
     * Get kendo.data namespace (accessed at call time for lazy loading)
     */
    get kendoData() {
        return this.kendo.data || {};
    }
    /**
     * Convert camelCase to hyphen-case
     */
    toHyphens(str) {
        return str.replace(/([a-z][A-Z])/g, (g) => {
            return g.charAt(0) + "-" + g.charAt(1).toLowerCase();
        });
    }
    /**
     * Convert hyphen-case to camelCase
     */
    toCamelCase(str) {
        return str.replace(/\-(\w)/g, (_strMatch, g1) => {
            return g1.toUpperCase();
        });
    }
    /**
     * Count properties in an object (excluding toJSON for IE7 compat)
     */
    size(obj) {
        let result = 0;
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "toJSON") {
                result++;
            }
        }
        return result;
    }
    /**
     * Deep extend an object with one or more source objects.
     *
     * IMPORTANT BEHAVIOR NOTES:
     * - Does NOT copy properties with undefined values (matches jQuery.extend behavior)
     * - Handles Date objects by creating new Date instances
     * - Handles objects with clone() method by calling clone()
     * - Skips Kendo special types: ObservableArray, LazyObservableArray, DataSource, HierarchicalDataSource
     * - Skips Array, RegExp, ArrayBuffer, and HTMLElement instances
     * - Protects against prototype pollution (__proto__, constructor, prototype)
     */
    deepExtend(destination, ...sources) {
        for (let i = 0; i < sources.length; i++) {
            this.deepExtendOne(destination, sources[i]);
        }
        return destination;
    }
    /**
     * Deep extend destination with a single source object.
     * This is the core implementation that handles all the special cases.
     */
    deepExtendOne(destination, source) {
        const ObservableArray = this.kendoData.ObservableArray;
        const LazyObservableArray = this.kendoData.LazyObservableArray;
        const DataSource = this.kendoData.DataSource;
        const HierarchicalDataSource = this.kendoData.HierarchicalDataSource;
        for (const property in source) {
            // Protect against prototype pollution
            if (property === "__proto__" || property === "constructor" || property === "prototype") {
                continue;
            }
            const propValue = source[property];
            const propType = typeof propValue;
            let propInit = null;
            if (propType === OBJECT && propValue !== null) {
                propInit = propValue.constructor;
            }
            let isRegExp = (propInit === null || propInit === void 0 ? void 0 : propInit.name) === 'RegExp';
            let isArrayBuffer = (propInit === null || propInit === void 0 ? void 0 : propInit.name) === 'ArrayBuffer';
            let isDate = (propInit === null || propInit === void 0 ? void 0 : propInit.name) === 'Date';
            if (propInit &&
                !Array.isArray(propValue) &&
                propInit !== ObservableArray &&
                propInit !== LazyObservableArray &&
                propInit !== DataSource &&
                propInit !== HierarchicalDataSource &&
                !isRegExp &&
                (!this.isFunction(window.ArrayBuffer) || !isArrayBuffer) &&
                !(propValue instanceof HTMLElement)) {
                if (isDate) {
                    // Clone Date objects
                    destination[property] = new Date(propValue.getTime());
                }
                else if (this.isCloneable(propValue)) {
                    // Use clone() method if available
                    destination[property] = propValue.clone();
                }
                else {
                    // Recursively extend plain objects
                    const destProp = destination[property];
                    if (typeof destProp === OBJECT) {
                        destination[property] = destProp || {};
                    }
                    else {
                        destination[property] = {};
                    }
                    this.deepExtendOne(destination[property], propValue);
                }
            }
            else if (propType !== UNDEFINED) {
                // Only copy if value is not undefined
                // This is critical - it matches jQuery.extend behavior
                // and differs from spread operator which copies undefined
                destination[property] = propValue;
            }
        }
        return destination;
    }
    /**
     * Check if an object has a clone method
     */
    isCloneable(obj) {
        return typeof obj.clone === "function";
    }
    /**
     * Create a throttled version of a function.
     * The throttled function will only execute at most once per delay period.
     * Includes a cancel() method to clear any pending execution.
     *
     * If delay is falsy (0, null, undefined), returns the original function unchanged.
     */
    throttle(fn, delay) {
        if (!delay || delay <= 0) {
            // Return the original function unchanged when delay is falsy
            return fn;
        }
        let timeout;
        let lastExecTime = 0;
        const throttled = function (...args) {
            const that = this;
            const elapsed = +new Date() - lastExecTime;
            function exec() {
                const result = fn.apply(that, args);
                lastExecTime = +new Date();
                return result;
            }
            // First execution
            if (!lastExecTime) {
                return exec();
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            if (elapsed > delay) {
                return exec();
            }
            else {
                timeout = setTimeout(exec, delay - elapsed);
            }
        };
        throttled.cancel = function () {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
        };
        return throttled;
    }
    /**
     * Generate a UUID.
     * Uses crypto.randomUUID() when available (HTTPS only),
     * falls back to crypto.getRandomValues().
     */
    guid() {
        const cryptoObj = window.crypto;
        try {
            // crypto.randomUUID() is available only in secure contexts (HTTPS)
            return cryptoObj.randomUUID();
        }
        catch (e) {
            // Fallback using crypto.getRandomValues()
            const randomValues = cryptoObj.getRandomValues(new Uint8Array(16));
            return randomValues.reduce((acc, curr, i) => {
                if (i === 4 || i === 6 || i === 8 || i === 10) {
                    acc += "-";
                }
                acc += curr.toString(16).padStart(2, "0");
                return acc;
            }, "");
        }
    }
    /**
     * Trim whitespace from a value.
     * Converts to string first, returns empty string for falsy values.
     */
    trim(value) {
        if (value) {
            return value.toString().trim();
        }
        return "";
    }
    /**
     * Check if a value is present (not null and not undefined)
     */
    isPresent(value) {
        return value !== null && value !== undefined;
    }
    /**
     * Check if a value is blank (null or undefined)
     */
    isBlank(value) {
        return value === null || value === undefined;
    }
    /**
     * Check if a value is empty (has length 0)
     */
    isEmpty(value) {
        return value.length === 0;
    }
    /**
     * Check if a value is a string
     */
    isString(value) {
        return typeof value === "string";
    }
    /**
     * Check if a value is an integer
     */
    isInteger(value) {
        return Number.isInteger(value);
    }
    /**
     * Check if a value is numeric
     */
    isNumeric(value) {
        return !isNaN(value - parseFloat(value));
    }
    /**
     * Check if a value is a Date object
     */
    isDate(value) {
        return value && value.getTime;
    }
    /**
     * Check if a value is a function
     */
    isFunction(value) {
        return typeof value === "function";
    }
    /**
     * Check if a value is an object (and not null)
     */
    isObject(value) {
        return value !== null && typeof value === OBJECT;
    }
    /**
     * Log a message to the console.
     * Respects kendo.suppressLog setting.
     * @param message - The message to log
     * @param type - Console method to use ("log", "warn", "error", etc.). Defaults to "log"
     */
    logToConsole(message, type) {
        const console = window.console;
        const kendo = this.kendo;
        if (!kendo.suppressLog && typeof console !== "undefined" && console.log) {
            console[type || "log"](message);
        }
    }
    /**
     * Wait for all promises to resolve, similar to Promise.all but for jQuery Deferreds.
     * Unlike $.when(), this handles failures gracefully and reports all results.
     *
     * Influenced from: https://gist.github.com/fearphage/4341799
     *
     * @param array - Array of deferreds/promises, or multiple arguments
     * @returns A jQuery Promise that resolves when all inputs resolve, or rejects if any fail
     */
    whenAll(array) {
        const $ = window.jQuery;
        const resolveValues = arguments.length === 1 && Array.isArray(array)
            ? array
            : Array.prototype.slice.call(arguments);
        const length = resolveValues.length;
        let remaining = length;
        const deferred = $.Deferred();
        let i = 0;
        let failed = 0;
        const rejectContexts = new Array(length);
        const rejectValues = new Array(length);
        const resolveContexts = new Array(length);
        let value;
        const updateFunc = (index, contexts, values) => {
            return function () {
                if (values !== resolveValues) {
                    failed++;
                }
                deferred.notifyWith(contexts[index] = this, values[index] = Array.prototype.slice.call(arguments));
                if (!(--remaining)) {
                    deferred[(!failed ? "resolve" : "reject") + "With"](contexts, values);
                }
            };
        };
        for (; i < length; i++) {
            value = resolveValues[i];
            if (value && this.isFunction(value.promise)) {
                value.promise()
                    .done(updateFunc(i, resolveContexts, resolveValues))
                    .fail(updateFunc(i, rejectContexts, rejectValues));
            }
            else {
                deferred.notifyWith(this, value);
                --remaining;
            }
        }
        if (!remaining) {
            deferred.resolveWith(resolveContexts, resolveValues);
        }
        return deferred.promise();
    }
    /**
     * Check if a URL is local (doesn't start with a protocol)
     * @param url - URL to check
     * @returns True if the URL is local
     */
    isLocalUrl(url) {
        return url && !/^([a-z]+:)?\/\//i.test(url);
    }
    /**
     * Get all method names (static and instance) from a class
     * @param targetClass - The class to inspect
     * @returns Array of method names
     */
    getAllMethods(targetClass) {
        const allStatic = Object.getOwnPropertyNames(targetClass)
            .filter(prop => typeof targetClass[prop] === "function");
        const allNonStatic = Object.getOwnPropertyNames(Object.getPrototypeOf(new targetClass({})))
            .filter(prop => prop !== "constructor");
        return allStatic.concat(allNonStatic);
    }
    /**
     * Get the base class (parent class) of a given class
     * @param targetClass - The class to get the parent of
     * @returns The parent class or null if none
     */
    getBaseClass(targetClass) {
        if (targetClass instanceof Function) {
            const baseClass = targetClass;
            const newBaseClass = Object.getPrototypeOf(baseClass);
            if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                return newBaseClass;
            }
        }
        return null;
    }
    /**
     * Create a proxy member on a prototype that delegates to an instance
     * @param proto - The prototype object to add the member to
     * @param name - The name of the member to create
     */
    createProxyMember(proto, name) {
        proto.fn[name] = function () {
            const instance = this._instance;
            if (instance) {
                return instance[name].apply(instance, arguments);
            }
        };
    }
    /**
     * Convert a native Promise to a jQuery Deferred
     * @param promise - The native Promise to convert
     * @returns A jQuery Promise
     */
    convertPromiseToDeferred(promise) {
        const deferred = $.Deferred();
        promise.finally(deferred.always).then(deferred.resolve).catch(deferred.reject);
        return deferred.promise();
    }
}
