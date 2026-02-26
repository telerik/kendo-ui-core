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
        // Create a temp base for prototype chain setup (matches original pattern)
        const base = function () { };
        base.prototype = that.prototype;
        // Create the subclass constructor
        // If proto has init, use it; otherwise create a constructor that calls parent's init (if any)
        // Note: Original uses `that.apply(this, arguments)` but ES6 classes can't be called with apply.
        // Instead, we call the parent's init method directly from the prototype chain.
        const subclass = proto && proto.init ? proto.init : function (...args) {
            // Call parent's init if it exists (this mimics `that.apply(this, arguments)`)
            if (that.prototype.init) {
                that.prototype.init.apply(this, args);
            }
        };
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
        return subclass;
    }
}
// Initialize static fn reference
Class.fn = Class.prototype;
/**
 * Define init and _initOptions on the prototype as ENUMERABLE properties.
 *
 * ES6 class methods are non-enumerable by default, which breaks the
 * legacy extend() pattern because when we do:
 *   base.prototype = that.prototype;
 *   fn = new base();
 *
 * The inherited methods from the ES6 class prototype don't appear in
 * for...in loops or when the object is logged/inspected. This causes
 * issues when deepExtend copies class instances - the non-enumerable
 * methods are not properly inherited through the prototype chain.
 *
 * By defining these methods directly on the prototype (like the original
 * Kendo Class did), we ensure they're enumerable and properly inherited.
 */
// Base init method - does nothing by default, override in subclasses
Class.prototype.init = function (..._args) {
    // Base init does nothing - override in subclasses
};
// Initialize options by deep extending with the provided options
Class.prototype._initOptions = function (options) {
    // Use jQuery's extend directly to match original behavior exactly
    this.options = kendoJQueryService.getConstructor().extend(true, {}, this.options, options);
};
