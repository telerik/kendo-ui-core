/**
 * Widget Registry Service
 *
 * Manages widget registration across different namespaces (ui, mobile.ui, dataviz.ui).
 *
 */
import { formatterService } from "./formatter.service";
// Constants
const STRING = "string";
const FUNCTION = "function";
/**
 * Widget Registry Service implementation
 */
class WidgetRegistryService {
    constructor() {
        /**
         * All registered widgets
         */
        this.widgets = [];
        /**
         * Namespace registers (e.g., { "ui": kendo.ui, "mobile.ui": kendo.mobile.ui })
         */
        this.namespaces = new Map();
    }
    /**
     * Create a new namespace with roles:{} and register it
     * This is the primary way to create namespaces - the service owns them.
     * @param name - Namespace name (e.g., "ui", "mobile.ui", "dataviz.ui")
     * @param properties - Additional properties to add to the namespace
     * @returns The created namespace object
     */
    createNamespace(name, properties) {
        const namespace = Object.assign({ roles: {} }, properties);
        this.namespaces.set(name, namespace);
        return namespace;
    }
    /**
     * Get a namespace register
     * @param name - Namespace name
     * @returns The namespace object or undefined
     */
    getNamespace(name) {
        return this.namespaces.get(name);
    }
    /**
     * Register a widget using options
     */
    register(widget, options = {}) {
        const namespace = options.namespace || "ui";
        const register = this.namespaces.get(namespace);
        if (!register) {
            throw new Error(`Unknown widget namespace: ${namespace}`);
        }
        this.registerToNamespace(widget, register, options.prefix);
    }
    /**
     * Register a widget to a specific namespace register
     * This is the core implementation matching the original kendo.ui.plugin
     */
    registerToNamespace(widget, register, prefix) {
        var _a;
        const name = widget.fn.options.name || ((_a = widget.options) === null || _a === void 0 ? void 0 : _a.name);
        if (!name) {
            throw new Error("Widget must have a name in options");
        }
        prefix = prefix || "";
        // Register to namespace
        register[name] = widget;
        register.roles[name.toLowerCase()] = widget;
        // Create jQuery plugin
        const getter = "getKendo" + prefix + name;
        const pluginName = "kendo" + prefix + name;
        this.createJQueryPlugin(pluginName, widget, getter);
        // Track widget entry
        const widgetEntry = {
            name: pluginName,
            widget: widget,
            prefix: prefix
        };
        this.widgets.push(widgetEntry);
    }
    /**
     * Get a widget by name
     */
    getWidget(name, namespace) {
        if (namespace) {
            const register = this.namespaces.get(namespace);
            return register === null || register === void 0 ? void 0 : register[name];
        }
        // Search all namespaces
        for (const register of this.namespaces.values()) {
            if (register[name]) {
                return register[name];
            }
        }
        return undefined;
    }
    /**
     * Get a widget by role name
     */
    getWidgetByRole(role, namespace) {
        const lowerRole = role.toLowerCase();
        if (namespace) {
            const register = this.namespaces.get(namespace);
            return register === null || register === void 0 ? void 0 : register.roles[lowerRole];
        }
        // Search all namespaces
        for (const register of this.namespaces.values()) {
            if (register.roles[lowerRole]) {
                return register.roles[lowerRole];
            }
        }
        return undefined;
    }
    /**
     * Get all registered widgets
     */
    getAllWidgets() {
        return this.widgets.slice(); // Return a copy
    }
    /**
     * Get widget instance from an element
     */
    getWidgetInstance(element, namespace) {
        var _a, _b, _c, _d;
        const el = $(element);
        let result;
        const searchNamespaces = namespace ? [namespace] : Array.from(this.namespaces.values());
        for (const ns of searchNamespaces) {
            for (const role in ns.roles) {
                const widget = ns.roles[role];
                const prefix = ((_b = (_a = widget.fn) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.prefix) || "";
                const dataKey = "kendo" + prefix + (((_d = (_c = widget.fn) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.name) || "");
                result = el.data(dataKey);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    /**
     * Create jQuery plugin for a widget
     */
    createJQueryPlugin(name, widget, getter) {
        const slice = Array.prototype.slice;
        $.fn[name] = function (options) {
            let value = this;
            let args;
            if (typeof options === STRING) {
                args = slice.call(arguments, 1);
                this.each(function () {
                    const widgetInstance = $.data(this, name);
                    let method;
                    let result;
                    if (!widgetInstance) {
                        throw new Error(formatterService.format("Cannot call method '{0}' of {1} before it is initialized", options, name));
                    }
                    method = widgetInstance[options];
                    if (typeof method !== FUNCTION) {
                        throw new Error(formatterService.format("Cannot find method '{0}' of {1}", options, name));
                    }
                    result = method.apply(widgetInstance, args);
                    if (result !== undefined) {
                        value = result;
                        return false;
                    }
                });
            }
            else {
                this.each(function () {
                    return new widget(this, options);
                });
            }
            return value;
        };
        $.fn[name].widget = widget;
        $.fn[getter] = function () {
            return this.data(name);
        };
    }
    /**
     * Merge roles from multiple namespaces into a single object
     */
    rolesFromNamespaces(namespaces, defaultNamespaces) {
        const roles = [];
        let idx;
        let length;
        // Use default namespaces if none provided or first element is falsy
        if (!namespaces[0] && defaultNamespaces) {
            namespaces = defaultNamespaces;
        }
        for (idx = 0, length = namespaces.length; idx < length; idx++) {
            roles[idx] = namespaces[idx].roles;
        }
        const reversedRoles = [...roles].reverse();
        return $.extend.apply(null, [{}].concat(reversedRoles));
    }
}
export const widgetRegistryService = new WidgetRegistryService();
