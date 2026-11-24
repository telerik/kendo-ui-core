/**
 * Kendo UI Base Class
 *
 * This is the foundational class for the entire Kendo UI inheritance system.
 * It's implemented as an actual ES6 class but also provides the legacy extend()
 * static method for backwards compatibility.
 *
 * Supports both patterns:
 * - ES6: class MyClass extends Class { }
 * - Legacy: var MyClass = Class.extend({ init: function() { } })
 *
 
 *
 * @example
 * // ES6 class inheritance
 * class Animal extends Class {
 *     constructor(name) {
 *         super();
 *         this.name = name;
 *     }
 *     speak() {
 *         console.log(this.name + ' makes a sound.');
 *     }
 * }
 *
 * @example
 * // Legacy extend pattern
 * const Animal = Class.extend({
 *     init: function(name) {
 *         this.name = name;
 *     },
 *     speak: function() {
 *         console.log(this.name + ' makes a sound.');
 *     }
 * });
 *
 * const Dog = Animal.extend({
 *     speak: function() {
 *         console.log(this.name + ' barks.');
 *     }
 * });
 *
 * const dog = new Dog('Rex');
 * dog.speak(); // "Rex barks."
 */
import { kendoJQueryService } from "../services/kendo-jquery.service";
/**
 * Base Class for Kendo UI.
 * All Kendo classes inherit from this base class.
 */
export class Class {
    /**
     * Static reference to prototype (jQuery-like pattern used throughout Kendo)
     */
    static fn;
    static prototypeMembers;
    /**
     * Creates a subclass with the given prototype.
     * This is the legacy extend pattern used throughout Kendo UI.
     *
     * This method:
     * 1. Creates a new constructor function that extends the current class
     * 2. Copies all properties from proto to the new prototype
     * 3. For plain object members, performs deep merge with base class members using $.extend
     * 4. Sets up the extend method on the subclass for further inheritance
     *
     * @param proto - Object containing methods and properties for the subclass
     * @returns New constructor function for the subclass
     *
     * @example
     * var MyClass = Class.extend({
     *     init: function(options) {
     *         this.options = options;
     *     },
     *     myMethod: function() {
     *         return this.options;
     *     }
     * });
     *
     * var instance = new MyClass({ foo: 'bar' });
     */
    static extend(proto) {
        const that = this;
        const protoInit = proto?.init;
        // Create a temp base for prototype chain setup (matches original pattern)
        const base = function () { };
        base.prototype = that.prototype;
        // Create the subclass constructor
        // If proto has init, use it; otherwise create a constructor that calls the parent's init when present
        // Note: Original uses `that.apply(this, arguments)` but ES6 classes can't be called with apply.
        // Instead, we call the parent's init method directly from the prototype chain.
        const subclass = (protoInit || function (...args) {
            // Call parent's init if it exists (this mimics `that.apply(this, arguments)`)
            const parentPrototype = that.prototype;
            if (parentPrototype.init) {
                parentPrototype.init.apply(this, args);
            }
        });
        // Set up prototype chain: subclass.prototype inherits from base class prototype
        const fn = subclass.fn = subclass.prototype = new base();
        // Copy all members from proto to the new prototype
        if (proto) {
            for (const member in proto) {
                if (proto[member] != null && proto[member].constructor === Object) {
                    // For plain object members, deep merge with base class member
                    // Uses jQuery's extend(true, ...) - exactly as original
                    fn[member] = kendoJQueryService.getConstructor().extend(true, {}, base.prototype[member], proto[member]);
                }
                else {
                    // For other members (functions, primitives, arrays, etc.), direct assignment
                    fn[member] = proto[member];
                }
            }
        }
        // Set constructor reference for instanceof checks
        fn.constructor = subclass;
        // Allow subclass to be further extended
        subclass.extend = that.extend;
        subclass.applyEnumerablePrototype = that.applyEnumerablePrototype;
        subclass.applyPrototypeMembers = that.applyPrototypeMembers;
        return subclass;
    }
    static applyEnumerablePrototype() {
        const prototype = this.prototype;
        for (const member of Reflect.ownKeys(prototype)) {
            if (member === "constructor") {
                continue;
            }
            const descriptor = Object.getOwnPropertyDescriptor(prototype, member);
            const isAccessor = descriptor && (typeof descriptor.get === "function" || typeof descriptor.set === "function");
            const isMethod = descriptor && "value" in descriptor && typeof descriptor.value === "function";
            if (!descriptor || (!isAccessor && !isMethod) ||
                descriptor.enumerable || descriptor.configurable === false) {
                continue;
            }
            Object.defineProperty(prototype, member, {
                ...descriptor,
                enumerable: true
            });
        }
    }
    static applyPrototypeMembers() {
        const prototype = this.prototype;
        const $ = kendoJQueryService.getConstructor();
        this.fn = prototype;
        if (Object.prototype.hasOwnProperty.call(this, "prototypeMembers") && this.prototypeMembers) {
            for (const member of Reflect.ownKeys(this.prototypeMembers)) {
                const value = this.prototypeMembers[member];
                if (value != null && value.constructor === Object) {
                    prototype[member] = $.extend(true, {}, prototype[member], value);
                }
                else {
                    prototype[member] = value;
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(this, "options")) {
            const superPrototype = Object.getPrototypeOf(prototype);
            const inheritedOptions = superPrototype && typeof superPrototype.options === "object"
                ? superPrototype.options
                : undefined;
            const options = $.extend(true, {}, inheritedOptions, this.options);
            this.options = options;
            prototype.options = options;
        }
    }
    static makePrototypeMethodsEnumerable(ctor = this) {
        Class.applyEnumerablePrototype.call(ctor);
    }
    init(..._args) {
    }
    _initOptions(options) {
        this.options = kendoJQueryService.getConstructor().extend(true, {}, this.options, options);
    }
}
Class.applyEnumerablePrototype();
Class.applyPrototypeMembers();
