/**
 * Type utilities service for runtime type checking.
 * Implements jQuery's deprecated type() function.
 */
/**
 * Service for runtime type checking utilities.
 * Provides type() function that was deprecated in jQuery.
 */
class TypeUtilsService {
    constructor() {
        /**
         * Map of toString results to lowercase type names
         */
        this.class2type = {};
        // Build the class2type map for standard JavaScript types
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ")
            .forEach((name) => {
            this.class2type["[object " + name + "]"] = name.toLowerCase();
        });
    }
    /**
     * Get the class2type mapping object
     */
    getClass2Type() {
        return this.class2type;
    }
    /**
     * Determine the internal JavaScript [[Class]] of an object.
     * This is a replacement for jQuery.type() which was deprecated.
     *
     * @param obj - The object to get the type of
     * @returns The type name as a lowercase string (e.g., "string", "number", "array", "date", "regexp", "object", "null", "undefined")
     *
     * @example
     * ```typescript
     * type(undefined)     // "undefined"
     * type(null)          // "null"
     * type(true)          // "boolean"
     * type(3)             // "number"
     * type("test")        // "string"
     * type(function(){})  // "function"
     * type([])            // "array"
     * type(new Date())    // "date"
     * type(/test/)        // "regexp"
     * type({})            // "object"
     * ```
     */
    type(obj) {
        // eslint-disable-next-line eqeqeq
        if (obj == null) {
            return obj + "";
        }
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            this.class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }
}
export const typeUtilsService = new TypeUtilsService();
