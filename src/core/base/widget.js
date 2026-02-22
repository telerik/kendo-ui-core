/**
 * Kendo UI Widget Class
 *
 * Base widget class for all Kendo UI components.
 * Extends Observable to provide event handling and adds:
 * - Element binding and management
 * - Options handling with deep extend
 * - Resize management
 * - CSS class application based on options
 * - ARIA accessibility support
 * - Licensing watermark support
 *
 
 *
 * @example
 * // ES6 class inheritance
 * class MyWidget extends Widget {
 *     init(element, options) {
 *         super.init(element, options);
 *         // widget-specific initialization
 *     }
 * }
 *
 * @example
 * // Legacy extend pattern
 * const MyWidget = Widget.extend({
 *     init: function(element, options) {
 *         Widget.fn.init.call(this, element, options);
 *         // widget-specific initialization
 *     },
 *     options: {
 *         name: "MyWidget"
 *     }
 * });
 */
import { Observable } from "./observable";
import { inject } from "../service-container";
import { KendoJQueryService } from "../services/kendo-jquery.service";
import { DomUtilsService } from "../services/dom-utils.service";
import { UtilsService } from "../services/utils.service";
import { CssPropertiesService } from "../services/css-properties.service";
import * as licensing from "../../kendo.licensing.js";
// CSS property names that can be applied to widgets
const cssPropertiesNames = ["themeColor", "fillMode", "shape", "size", "rounded", "positionMode"];
// ARIA constants
const ARIA_LABELLEDBY = "aria-labelledby";
const ARIA_LABEL = "aria-label";
const LABELIDPART = "_label";
/**
 * Base Widget class for Kendo UI components.
 */
export class Widget extends Observable {
    /**
     * Static call method to support legacy pattern: Widget.call(this, element, options)
     *
     * ES6 classes cannot be invoked with Function.prototype.call(), but some legacy
     * code uses `kendo.ui.Widget.call(this, element, options)` instead of the proper
     * `Widget.fn.init.call(this, element, options)` pattern.
     *
     * By defining a static `call` method, we intercept these calls and route them
     * to the init method, maintaining backward compatibility.
     *
     * @param thisArg - The context (this) to call init on
     * @param element - The DOM element to bind the widget to
     * @param options - Widget configuration options
     */
    static call(thisArg, element, options) {
        Widget.fn.init.call(thisArg, element, options);
    }
    /**
     * Static apply method to support legacy pattern: Widget.apply(this, arguments)
     *
     * Similar to call(), this intercepts Function.prototype.apply() calls.
     *
     * @param thisArg - The context (this) to call init on
     * @param args - Array of arguments [element, options]
     */
    static apply(thisArg, args) {
        Widget.fn.init.apply(thisArg, args);
    }
    /**
     * Constructor - receives element and options and calls init().
     * This mirrors the legacy extend() pattern where the constructor IS the init function.
     *
     * @param element - The DOM element to bind the widget to
     * @param options - Widget configuration options
     */
    constructor(element, options) {
        super();
        // Call init with the provided arguments
        if (element !== undefined) {
            this.init(element, options);
        }
    }
    /**
     * Initialize the widget
     * @param element - The DOM element to bind to
     * @param options - Widget configuration options
     */
    init(element, options) {
        const that = this;
        // Check licensing
        if (!licensing.validatePackage()) {
            that._showWatermarkOverlay = licensing.addWatermarkOverlayAndBanner;
        }
        // Wrap element with KendoJQuery and bind handler
        const kendoJQuery = inject(KendoJQueryService).getConstructor();
        that.element = kendoJQuery(element).handler(that);
        // Initialize Observable
        Observable.fn.init.call(that);
        // Handle dataSource special case - avoid deep cloning
        let dataSource = options ? options.dataSource : null;
        let props;
        if (options) {
            props = (that.componentTypes || {})[options.componentType];
        }
        if (dataSource) {
            // Avoid deep cloning the data source
            options = kendoJQuery.extend({}, options, { dataSource: {} });
        }
        options = that.options = kendoJQuery.extend(true, {}, that.options, that.defaults, props || {}, options);
        // Restore dataSource reference
        if (dataSource) {
            options.dataSource = dataSource;
        }
        // Set data-role attribute if not present
        const roleAttr = inject(DomUtilsService).attr("role");
        if (!that.element.attr(roleAttr)) {
            that.element.attr(roleAttr, (options.name || "").toLowerCase());
        }
        // Store widget instance on element
        that.element.data("kendo" + options.prefix + options.name, that);
        // Bind events from options
        that.bind(that.events, options);
    }
    /**
     * Check if the element has a MVVM binding target
     * @returns true if the element has a bindingTarget
     */
    _hasBindingTarget() {
        return !!this.element[0].kendoBindingTarget;
    }
    /**
     * Set up tabindex on target element
     * @param target - Target element (defaults to wrapper)
     */
    _tabindex(target) {
        target = target || this.wrapper;
        const element = this.element;
        const TABINDEX = "tabindex";
        const tabindex = target.attr(TABINDEX) || element.attr(TABINDEX);
        element.removeAttr(TABINDEX);
        target.attr(TABINDEX, !isNaN(tabindex) ? tabindex : 0);
    }
    /**
     * Update widget options
     * @param options - New options to merge
     */
    setOptions(options) {
        this._clearCssClasses(options);
        this._setEvents(options);
        inject(KendoJQueryService).getConstructor().extend(this.options, options);
        this._applyCssClasses();
    }
    /**
     * Internal method to update event bindings when options change
     * @param options - New options containing event handlers
     */
    _setEvents(options) {
        const that = this;
        let idx = 0;
        const length = that.events.length;
        let e;
        for (; idx < length; idx++) {
            e = that.events[idx];
            if (that.options[e] && options[e]) {
                that.unbind(e, that.options[e]);
                if (that._events && that._events[e]) {
                    delete that._events[e];
                }
            }
        }
        that.bind(that.events, options);
    }
    /**
     * Handle resize events
     * @param force - Force resize even if size hasn't changed
     */
    resize(force) {
        const size = this.getSize();
        const currentSize = this._size;
        if (force || (size.width > 0 || size.height > 0) && (!currentSize || size.width !== currentSize.width || size.height !== currentSize.height)) {
            this._size = size;
            this._resize(size, force);
            this.trigger("resize", size);
        }
    }
    /**
     * Get current widget dimensions
     * @returns Size object with width and height
     */
    getSize() {
        return inject(DomUtilsService).dimensions(this.element);
    }
    /**
     * Get or set widget size
     * @param size - Optional size to set
     * @returns Current size if no argument, undefined if setting
     */
    size(size) {
        if (!size) {
            return this.getSize();
        }
        else {
            this.setSize(size);
        }
    }
    /**
     * Set widget size (override in subclasses)
     * @param size - Size to set
     */
    setSize(_size) {
        // noop - override in subclasses
    }
    /**
     * Internal resize handler (override in subclasses)
     * @param size - New size
     * @param force - Whether resize was forced
     */
    _resize(_size, _force) {
        // noop - override in subclasses
    }
    /**
     * Destroy the widget and clean up resources
     */
    destroy() {
        const that = this;
        that.element.removeData("kendo" + that.options.prefix + that.options.name);
        that.element.removeData("handler");
        that.unbind();
    }
    /**
     * Internal destroy method
     */
    _destroy() {
        this.destroy();
    }
    /**
     * Apply CSS classes based on widget options
     * @param element - Optional element to apply classes to
     */
    _applyCssClasses(element) {
        const protoOptions = this.__proto__.options;
        const options = this.options;
        const el = element || this.wrapper || this.element;
        const classes = [];
        let i;
        let prop;
        let widgetName;
        let widgetProperties;
        const cssProps = inject(CssPropertiesService);
        widgetName = this.options._altname || protoOptions.name;
        widgetProperties = cssProps.propertyDictionary[widgetName];
        if (!cssProps || !widgetProperties) {
            return;
        }
        for (i = 0; i < cssPropertiesNames.length; i++) {
            prop = cssPropertiesNames[i];
            widgetName = this.options._altname || protoOptions.name;
            if ((prop in protoOptions) || (prop in options)) {
                classes.push(cssProps.getValidClass({
                    widget: widgetName,
                    propName: prop,
                    value: options[prop]
                }));
            }
        }
        el.addClass(classes.join(" "));
    }
    /**
     * Set up ARIA label for accessibility
     * @param target - Target element to apply ARIA attributes to
     */
    _ariaLabel(target) {
        const that = this;
        const inputElm = that.element;
        const inputId = inputElm.attr("id");
        const $ = inject(KendoJQueryService).getConstructor();
        const labelElm = $("label[for=\"" + inputId + "\"]");
        const ariaLabel = inputElm.attr(ARIA_LABEL);
        const ariaLabelledBy = inputElm.attr(ARIA_LABELLEDBY);
        let labelId;
        if (target[0] === inputElm[0]) {
            return;
        }
        if (ariaLabel) {
            target.attr(ARIA_LABEL, ariaLabel);
        }
        else if (ariaLabelledBy) {
            target.attr(ARIA_LABELLEDBY, ariaLabelledBy);
        }
        else if (labelElm.length) {
            // Use utils.guid() for generating unique IDs
            const guid = inject(UtilsService).guid();
            labelId = labelElm.attr("id") || that._generateLabelId(labelElm, inputId || guid);
            target.attr(ARIA_LABELLEDBY, labelId);
        }
    }
    /**
     * Clear CSS classes before updating options
     * @param newOptions - New options being applied
     * @param element - Optional element to clear classes from
     */
    _clearCssClasses(newOptions, element) {
        const protoOptions = this.__proto__.options;
        const currentOptions = this.options;
        const el = element || this.wrapper || this.element;
        let i;
        let prop;
        let widgetName;
        let widgetProperties;
        const cssProps = inject(CssPropertiesService);
        widgetName = this.options._altname || protoOptions.name;
        widgetProperties = cssProps.propertyDictionary[widgetName];
        if (!cssProps || !widgetProperties) {
            return;
        }
        for (i = 0; i < cssPropertiesNames.length; i++) {
            prop = cssPropertiesNames[i];
            if (((prop in protoOptions) || (prop in currentOptions)) && newOptions.hasOwnProperty(prop)) {
                if (prop === "themeColor") {
                    el.removeClass(cssProps.getValidClass({
                        widget: widgetName,
                        propName: prop,
                        value: currentOptions[prop],
                        fill: currentOptions.fillMode
                    }));
                }
                else {
                    if (prop === "fillMode") {
                        el.removeClass(cssProps.getValidClass({
                            widget: widgetName,
                            propName: "themeColor",
                            value: currentOptions.themeColor,
                            fill: currentOptions.fillMode
                        }));
                    }
                    el.removeClass(cssProps.getValidClass({
                        widget: widgetName,
                        propName: prop,
                        value: currentOptions[prop]
                    }));
                }
            }
        }
    }
    /**
     * Generate a unique label ID for ARIA
     * @param label - Label element
     * @param inputId - Input element ID
     * @returns Generated label ID
     */
    _generateLabelId(label, inputId) {
        const labelId = inputId + LABELIDPART;
        label.attr("id", labelId);
        return labelId;
    }
}
// Set up static fn reference (jQuery-like pattern)
Widget.fn = Widget.prototype;
// Define options and events on prototype (like original Kendo extend pattern)
// This is critical for the legacy extend() pattern to work correctly
Widget.prototype.options = {
    prefix: ""
};
Widget.prototype.events = [];
