// Constant for the prefix key in property dictionary
const PREFIX = "prefix";
/**
 * Service for managing CSS class properties for widgets
 * Extracted from kendo.cssProperties in kendo.core.js
 */
export class CssPropertiesService {
    constructor() {
        /**
         * Predefined theme color values
         */
        this.themeColorValues = [
            'base', 'primary', 'secondary', 'tertiary', 'inherit',
            'info', 'success', 'warning', 'error', 'dark', 'light', 'inverse'
        ];
        /**
         * Predefined fill mode values
         */
        this.fillModeValues = ['solid', 'outline', 'flat'];
        /**
         * Predefined shape values
         */
        this.shapeValues = ['rectangle', 'square'];
        /**
         * Predefined size values
         */
        this.sizeValues = [
            ['small', 'sm'], ['medium', 'md'], ['large', 'lg']
        ];
        /**
         * Predefined rounded values
         */
        this.roundedValues = [
            ['small', 'sm'], ['medium', 'md'], ['large', 'lg'], ['full', 'full'], ['none', 'none']
        ];
        /**
         * Predefined position mode values
         */
        this.positionModeValues = [
            'fixed', 'static', 'sticky', 'absolute'
        ];
        /**
         * Predefined resize values
         */
        this.resizeValues = [
            ['both', 'resize'], ['horizontal', 'resize-x'], ['vertical', 'resize-y']
        ];
        /**
         * Predefined overflow values
         */
        this.overflowValues = [
            'auto', 'hidden', 'visible', 'scroll', 'clip'
        ];
        /**
         * Predefined layout flow values
         */
        this.layoutFlowValues = [
            ['vertical', '!k-flex-col'], ['horizontal', '!k-flex-row']
        ];
        /**
         * Default values dictionary
         */
        this.defaultValues = {};
        /**
         * Widget property dictionary
         */
        this.propertyDictionary = {};
        /**
         * Legacy property to CSS class map (for BottomNavigation compatibility)
         * TODO: delete after implementing new styles and classes for BottomNavigation
         */
        this.propertyToCssClassMap = {};
        // Register default CSS classes
        this.registerDefaultCssClasses("themeColor", this.themeColorValues);
        this.registerDefaultCssClasses("fillMode", this.fillModeValues);
        this.registerDefaultCssClasses("shape", this.shapeValues);
        this.registerDefaultCssClasses("size", this.sizeValues);
        this.registerDefaultCssClasses("positionMode", this.positionModeValues);
        this.registerDefaultCssClasses("rounded", this.roundedValues);
        this.registerDefaultCssClasses("resize", this.resizeValues);
        this.registerDefaultCssClasses("overflow", this.overflowValues);
        this.registerDefaultCssClasses("layoutFlow", this.layoutFlowValues);
        // Register legacy CSS classes (for BottomNavigation compatibility)
        this.registerCssClasses("themeColor", this.themeColorValues);
        this.registerCssClasses("fill", this.fillModeValues);
        this.registerCssClasses("shape", this.shapeValues);
        this.registerCssClasses("size", this.sizeValues);
        this.registerCssClasses("positionMode", this.positionModeValues);
    }
    /**
     * Register a CSS prefix for a widget
     */
    registerPrefix(widget, prefix) {
        if (!this.propertyDictionary[widget]) {
            this.propertyDictionary[widget] = {};
        }
        this.propertyDictionary[widget][PREFIX] = prefix;
    }
    /**
     * Register CSS values for a widget
     */
    registerValues(widget, args) {
        let i;
        let j;
        let prop;
        let values;
        let newValues;
        let currentValue;
        if (!this.propertyDictionary[widget]) {
            this.propertyDictionary[widget] = {};
        }
        for (i = 0; i < args.length; i++) {
            prop = args[i].prop;
            newValues = args[i].values;
            if (!this.propertyDictionary[widget][prop]) {
                this.propertyDictionary[widget][prop] = {};
            }
            values = this.propertyDictionary[widget][prop];
            for (j = 0; j < newValues.length; j++) {
                currentValue = newValues[j];
                if (Array.isArray(currentValue)) {
                    values[currentValue[0]] = currentValue[1];
                }
                else {
                    values[currentValue] = currentValue;
                }
            }
        }
    }
    /**
     * Get a valid CSS class for a widget property
     */
    getValidClass(args) {
        const widget = args.widget;
        const propName = args.propName;
        const value = args.value;
        const overridePrefix = args.prefix;
        const defaultVals = this.defaultValues[propName];
        const widgetProperties = this.propertyDictionary[widget];
        if (!widgetProperties) {
            return "";
        }
        const widgetValues = widgetProperties[propName];
        const validValue = widgetValues
            ? (widgetValues[value] || (defaultVals && defaultVals[value]))
            : (defaultVals && defaultVals[value]);
        if (validValue) {
            let prefix;
            if (propName === "themeColor") {
                prefix = widgetProperties[PREFIX];
            }
            else if (propName === "positionMode") {
                prefix = "k-pos-";
            }
            else if (propName === "rounded") {
                prefix = "k-rounded-";
            }
            else if (propName === "resize") {
                prefix = "k-";
            }
            else if (propName === "overflow") {
                prefix = "k-overflow-";
            }
            else if (propName === "layoutFlow") {
                prefix = "";
            }
            else {
                prefix = widgetProperties[PREFIX];
            }
            prefix = overridePrefix || prefix;
            return prefix + validValue;
        }
        else {
            return "";
        }
    }
    /**
     * Register a single CSS class (internal for defaultValues)
     */
    registerDefaultCssClass(propName, value, shorthand) {
        if (!this.defaultValues[propName]) {
            this.defaultValues[propName] = {};
        }
        this.defaultValues[propName][value] = shorthand || value;
    }
    /**
     * Register multiple CSS classes for a property (internal for defaultValues)
     */
    registerDefaultCssClasses(propName, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                const tuple = arr[i];
                this.registerDefaultCssClass(propName, tuple[0], tuple[1]);
            }
            else {
                this.registerDefaultCssClass(propName, arr[i]);
            }
        }
    }
    // Legacy CSS class methods (for BottomNavigation compatibility)
    // TODO: delete after implementing new styles and classes for BottomNavigation
    /**
     * Register a single legacy CSS class
     */
    registerCssClass(propName, value, shorthand) {
        if (!this.propertyToCssClassMap[propName]) {
            this.propertyToCssClassMap[propName] = {};
        }
        this.propertyToCssClassMap[propName][value] = shorthand || value;
    }
    /**
     * Register multiple legacy CSS classes
     */
    registerCssClasses(propName, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                const tuple = arr[i];
                this.registerCssClass(propName, tuple[0], tuple[1]);
            }
            else {
                this.registerCssClass(propName, arr[i]);
            }
        }
    }
    /**
     * Get a valid legacy CSS class
     */
    getValidCssClass(prefix, propName, value) {
        var _a;
        if (value === undefined) {
            return "";
        }
        const validValue = (_a = this.propertyToCssClassMap[propName]) === null || _a === void 0 ? void 0 : _a[value];
        if (validValue) {
            return prefix + validValue;
        }
        return undefined;
    }
}
