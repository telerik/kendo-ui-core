/**
 * Widget Utils Service
 *
 * Provides utilities for widget initialization, lifecycle management, and instance retrieval.
 * All methods preserve exact original functionality from kendo.core.js.
 *
 */
// Constants - match original kendo.core.js
const STRING = "string";
const FUNCTION = "function";
// RegExps - match original kendo.core.js exactly
const templateRegExp = /template$/i;
const jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/;
const jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}|^\[[A-Za-z_]+\]$/;
const dashRegExp = /([A-Z])/g;
const numberRegExp = /^(\+|-?)\d+(\.?)\d*$/;
const cssPropertiesNames = ["themeColor", "fillMode", "shape", "size", "rounded", "positionMode"];
/**
 * Widget Utils Service Implementation
 */
export class WidgetUtilsService {
    constructor($, widgetRegistryService, propertyAccessService, templateService, utilsService, Observable, namespaceService) {
        this.$ = $;
        this.widgetRegistryService = widgetRegistryService;
        this.propertyAccessService = propertyAccessService;
        this.templateService = templateService;
        this.utilsService = utilsService;
        this.Observable = Observable;
        this.namespaceService = namespaceService;
    }
    /**
     * Get default namespaces from the registry service
     * Returns [kendo.ui, kendo.dataviz.ui, kendo.mobile.ui]
     */
    getDefaultNamespaces() {
        return [
            this.widgetRegistryService.getNamespace("ui"),
            this.widgetRegistryService.getNamespace("dataviz.ui"),
            this.widgetRegistryService.getNamespace("mobile.ui")
        ].filter(Boolean);
    }
    /**
     * Parse a single option from element's data attribute
     */
    parseOption(element, option, source) {
        const ns = this.namespaceService.ns;
        let value;
        let modelBinded = false;
        if (option.indexOf("data") === 0) {
            option = option.substring(4);
            option = option.charAt(0).toLowerCase() + option.substring(1);
        }
        option = option.replace(dashRegExp, "-$1");
        value = element.getAttribute("data-" + ns + option);
        if (value === null) {
            value = element.getAttribute("bind:data-" + ns + option);
            modelBinded = true;
        }
        if (value === null) {
            value = undefined;
        }
        else if (value === "null") {
            value = null;
        }
        else if (value === "true") {
            value = true;
        }
        else if (value === "false") {
            value = false;
        }
        else if (numberRegExp.test(value) && option != "mask" && option != "format") {
            value = parseFloat(value);
        }
        else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
            try {
                value = JSON.parse(value);
            }
            catch (error) {
                // Fallback to function eval for legacy reason - non CSP compliant
                value = new Function("return (" + value + ")")();
            }
        }
        else if (modelBinded) {
            // This way you can set a config like so bind:data-checkboxes="checkboxesOptions" where checkboxesOptions is an object inside your viewmodel.
            // This is a CSP-safe approach similar to data-checkboxes="{ checkboxes: true }" but you don't need to eval javascript.
            value = source[value];
            if (value instanceof this.Observable) {
                // Pass true as a parameter to allow function serialization. Otherwise, if you have a function in the configuration, it will be ignored.
                value = value.toJSON(true);
            }
        }
        return value;
    }
    /**
     * Parse all options from element's data attributes
     */
    parseOptions(element, options, source) {
        const $ = this.$;
        const ns = this.namespaceService.ns;
        const result = {};
        let option;
        let value;
        const role = element.getAttribute("data-" + ns + "role");
        // Combine options keys with CSS appearance properties to ensure they're always parsed
        // even when their default value is undefined (which gets stripped by $.extend)
        const allOptions = Object.keys(options);
        for (let i = 0; i < cssPropertiesNames.length; i++) {
            if (allOptions.indexOf(cssPropertiesNames[i]) === -1) {
                allOptions.push(cssPropertiesNames[i]);
            }
        }
        for (let i = 0; i < allOptions.length; i++) {
            option = allOptions[i];
            // Pass the source option for MVVM scenarios.
            value = this.parseOption(element, option, source);
            if (value !== undefined) {
                if (templateRegExp.test(option) && role != "drawer") {
                    if (typeof value === "string") {
                        if (this.validateQuerySelectorTemplate(value)) {
                            value = this.templateService.compile($("#" + value).html());
                        }
                        else if (source && source[value]) {
                            value = this.templateService.compile(source[value]);
                        }
                        else {
                            value = this.templateService.compile(value);
                        }
                    }
                    else if (!this.utilsService.isFunction(value)) {
                        value = element.getAttribute(option);
                    }
                }
                result[option] = value;
            }
        }
        return result;
    }
    /**
     * Validate if a value is a valid query selector for a template element
     */
    validateQuerySelectorTemplate(value) {
        try {
            return !!(this.$("#" + value).length);
        }
        catch (e) {
        }
        return false;
    }
    /**
     * Initialize a widget on an element
     */
    initWidget(element, options, roles, source) {
        const $ = this.$;
        const ns = this.namespaceService.ns;
        let result;
        let option;
        let widget;
        let idx;
        let length;
        let role;
        let value;
        let dataSource;
        let fullPath;
        let widgetKeyRegExp;
        // Preserve backwards compatibility with (element, options, namespace) signature, where namespace was kendo.ui
        if (!roles) {
            roles = this.getDefaultNamespaces()[0].roles;
        }
        else if (roles.roles) {
            roles = roles.roles;
        }
        element = element.nodeType ? element : element[0];
        role = element.getAttribute("data-" + ns + "role");
        if (!role) {
            return;
        }
        fullPath = role.indexOf(".") === -1;
        // look for any widget that may be already instantiated based on this role.
        // The prefix used is unknown, hence the regexp
        //
        if (fullPath) {
            widget = roles[role];
        }
        else { // full namespace path - like kendo.ui.Widget
            widget = this.propertyAccessService.getter(role)(window);
        }
        const data = $(element).data();
        const widgetKey = widget ? "kendo" + widget.fn.options.prefix + widget.fn.options.name : "";
        if (fullPath) {
            widgetKeyRegExp = new RegExp("^kendo.*" + role + "$", "i");
        }
        else { // full namespace path - like kendo.ui.Widget
            widgetKeyRegExp = new RegExp("^" + widgetKey + "$", "i");
        }
        for (var key in data) {
            if (key.match(widgetKeyRegExp)) {
                // we have detected a widget of the same kind - save its reference, we will set its options
                if (key === widgetKey) {
                    result = data[key];
                }
                else {
                    return data[key];
                }
            }
        }
        if (!widget) {
            return;
        }
        dataSource = this.parseOption(element, "dataSource");
        options = $.extend({}, this.parseOptions(element, $.extend({}, widget.fn.options, widget.fn.defaults), source), options);
        if (dataSource) {
            if (typeof dataSource === STRING) {
                options.dataSource = this.propertyAccessService.getter(dataSource)(window);
            }
            else {
                options.dataSource = dataSource;
            }
        }
        for (idx = 0, length = widget.fn.events.length; idx < length; idx++) {
            option = widget.fn.events[idx];
            value = this.parseOption(element, option);
            if (value !== undefined) {
                options[option] = this.propertyAccessService.getter(value)(window);
            }
        }
        if (!result) {
            result = new widget(element, options);
        }
        else if (!$.isEmptyObject(options)) {
            result.setOptions(options);
        }
        return result;
    }
    /**
     * Initialize all widgets in an element tree
     */
    init(element, ...namespaces) {
        const $ = this.$;
        const ns = this.namespaceService.ns;
        const roles = this.widgetRegistryService.rolesFromNamespaces(namespaces, this.getDefaultNamespaces());
        const self = this;
        $(element).find("[data-" + ns + "role]").addBack().each(function () {
            self.initWidget(this, {}, roles);
        });
    }
    /**
     * Destroy all widgets in an element tree
     */
    destroy(element) {
        const $ = this.$;
        const ns = this.namespaceService.ns;
        $(element).find("[data-" + ns + "role]").addBack().each(function () {
            const data = $(this).data();
            for (var key in data) {
                if (key.indexOf("kendo") === 0 && typeof data[key].destroy === FUNCTION) {
                    data[key].destroy();
                }
            }
        });
    }
    /**
     * Containment comparer for sorting widgets by DOM hierarchy
     */
    containmentComparer(a, b) {
        return this.$.contains(a, b) ? -1 : 1;
    }
    /**
     * Resize all widgets in an element tree
     */
    resize(element, force) {
        const $ = this.$;
        const ns = this.namespaceService.ns;
        const self = this;
        // Create resizableWidget filter with proper context
        const resizableWidgetFilter = function () {
            const widget = $(this);
            return ($.inArray(widget.attr("data-" + ns + "role"), ["slider", "rangeslider", "breadcrumb"]) > -1) || widget.is(":visible");
        };
        const widgets = $(element).find("[data-" + ns + "role]").addBack().filter(resizableWidgetFilter);
        if (!widgets.length) {
            return;
        }
        // sort widgets based on their parent-child relation
        const widgetsArray = $.makeArray(widgets);
        widgetsArray.sort((a, b) => self.containmentComparer(a, b));
        // resize widgets
        $.each(widgetsArray, function () {
            const widget = self.widgetInstance($(this));
            if (widget) {
                widget.resize(force);
            }
        });
    }
    /**
     * Get widget instance from a DOM element
     */
    widgetInstance(element, suites) {
        const ns = this.namespaceService.ns;
        const defaultNamespaces = this.getDefaultNamespaces();
        let role = element.data(ns + "role");
        let widgets = [];
        let i;
        let length;
        const elementData = element.data("kendoView");
        if (role) {
            // HACK!!! mobile view scroller widgets are instantiated on data-role="content" elements. We need to discover them when resizing.
            if (role === "content") {
                role = "scroller";
            }
            // kendo.View is not a ui plugin
            if (role === "view" && elementData) {
                return elementData;
            }
            if (suites) {
                if (suites[0]) {
                    for (i = 0, length = suites.length; i < length; i++) {
                        widgets.push(suites[i].roles[role]);
                    }
                }
                else {
                    widgets.push(suites.roles[role]);
                }
            }
            else {
                // Use default namespaces: [kendo.ui, kendo.dataviz.ui, kendo.mobile.ui]
                widgets = defaultNamespaces.map(ns => ns.roles[role]);
            }
            if (role.indexOf(".") >= 0) {
                widgets = [this.propertyAccessService.getter(role)(window)];
            }
            for (i = 0, length = widgets.length; i < length; i++) {
                const widget = widgets[i];
                if (widget) {
                    const instance = element.data("kendo" + widget.fn.options.prefix + widget.fn.options.name);
                    if (instance) {
                        return instance;
                    }
                }
            }
        }
    }
}
