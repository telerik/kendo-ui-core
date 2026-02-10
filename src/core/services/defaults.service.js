/**
 * Defaults Service
 * Manages global Kendo defaults configuration with deep path support.
 *
 * @module core-v2/services/defaults.service
 */
/**
 * Service for managing global Kendo defaults configuration.
 * Supports deep path-based setting with automatic object creation.
 */
export class DefaultsService {
    constructor(utils) {
        this.utils = utils;
        /**
         * The defaults storage object
         */
        this.defaults = {};
    }
    /**
     * Get the current defaults object
     */
    getDefaults() {
        return this.defaults;
    }
    /**
     * Set a default value at a given path.
     * Supports dot-separated paths for nested values.
     * Objects are deep extended, primitives are replaced.
     *
     * @param key - Dot-separated path (e.g., "breakpoints", "grid.pager.pageSize")
     * @param value - The value to set at the path
     *
     * @example
     * ```typescript
     * // Set a simple value
     * setDefaults('pageSize', 10);
     *
     * // Set a nested value
     * setDefaults('grid.pager.pageSize', 20);
     *
     * // Deep extend an object
     * setDefaults('breakpoints', { sm: 576, md: 768 });
     * ```
     */
    setDefaults(key, value) {
        const path = key.split(".");
        let curr = this.defaults;
        key = path.pop();
        path.forEach((part) => {
            if (curr[part] === undefined) {
                curr[part] = {};
            }
            curr = curr[part];
        });
        if (value !== null && typeof value === "object" && value.constructor === Object) {
            curr[key] = this.utils.deepExtend({}, curr[key] || {}, value);
        }
        else {
            curr[key] = value;
        }
    }
    /**
     * Get a default value at a given path.
     *
     * @param key - Dot-separated path (e.g., "breakpoints", "grid.pager.pageSize")
     * @returns The value at the path, or undefined if not found
     */
    getDefault(key) {
        const path = key.split(".");
        let curr = this.defaults;
        for (const part of path) {
            if (curr[part] === undefined) {
                return undefined;
            }
            curr = curr[part];
        }
        return curr;
    }
}
