import { defaultBreakpoints, mediaQuery } from './utils/mediaquery.js';
import { fromESClass } from './utils/convert-class.js';
import * as licensing from './kendo.licensing.js';
import {
    cultureService,
    formatterService,
    numberParserService,
    dateParserService,
    intlService,
    templateService,
    htmlService,
    supportService,
    dateUtilsService,
    domUtilsService,
    utilsService,
    effectsService,
    fileUtilsService,
    focusUtilsService,
    propertyAccessService,
    inputService,
    colorService,
    selectorService,
    timezoneService,
    cssPropertiesService,
    typeUtilsService,
    eventMapService,
    defaultsService,
    kendoJQueryService,
    widgetRegistryService,
    widgetUtilsService,
    namespaceService,
    Class,
    Observable,
    Widget,
    DataBoundWidget
} from './core/index.js';

const __meta__ = {
    id: "core",
    name: "Core",
    category: "framework",
    description: "The core of the Kendo framework.",
    depends: ["licensing"],
};

let $ = window.jQuery || window.$ || jQuery;

const kendo = window.kendo = window.kendo || { cultures: {} };
const extend = $.extend;
const each = $.each;
const noop = $.noop;
const slice = [].slice;

kendo.version = licensing.packageMetadata.version;

const EN = "en-US";

const kendoJQuery = kendoJQueryService.getConstructor();
const eventMap = eventMapService.getFullEventMap();

const Template = {
    get paramName() {
        return templateService.paramName;
    },
    set paramName(value) {
        templateService.paramName = value;
    },
    get useWithBlock() {
        return templateService.useWithBlock;
    },
    set useWithBlock(value) {
        templateService.useWithBlock = value;
    },
    render: function(template, data) {
        return templateService.render(template, data);
    },
    compile: function(template, options) {
        return templateService.compile(template, options);
    }
};

kendo.jQuery = kendoJQuery;
kendo.eventMap = eventMap;

kendo.ConvertClass = fromESClass;

kendo.createProxyMember = function(proto, name) {
    return utilsService.createProxyMember(proto, name);
};

kendo.getBaseClass = function(targetClass) {
    return utilsService.getBaseClass(targetClass);
};

kendo.getAllMethods = function(targetClass) {
    return utilsService.getAllMethods(targetClass);
};

kendo.convertPromiseToDeferred = function(promise) {
    return utilsService.convertPromiseToDeferred(promise);
};

kendo.throttle = function(fn, delay) {
    return utilsService.throttle(fn, delay);
};

kendo.trim = function(value) {
    return utilsService.trim(value);
};

kendo.whenAll = function(array) {
    return utilsService.whenAll(array);
};

kendo.days = utilsService.days;

kendo.isPresent = (value) => utilsService.isPresent(value);
kendo.isBlank = (value) => utilsService.isBlank(value);
kendo.isEmpty = (value) => utilsService.isEmpty(value);
kendo.isString = (value) => utilsService.isString(value);
kendo.isInteger = (value) => utilsService.isInteger(value);
kendo.isNumeric = (value) => utilsService.isNumeric(value);
kendo.isDate = (value) => utilsService.isDate(value);
kendo.isFunction = (value) => utilsService.isFunction(value);

function deepExtend(destination) {
    const sources = Array.prototype.slice.call(arguments, 1);
    return utilsService.deepExtend(destination, ...sources);
}

function toHyphens(str) {
    return utilsService.toHyphens(str);
}

function toCamelCase(str) {
    return utilsService.toCamelCase(str);
}

function size(obj) {
    return utilsService.size(obj);
}

function htmlEncode(value, shouldDecode) {
    return htmlService.encode(value, shouldDecode);
}

function sanitizeLink(value) {
    return htmlService.sanitizeLink(value);
}

function unescape(value) {
    return htmlService.unescape(value);
}

function convertTextUrlToLink(text, skipSanitization) {
    return htmlService.convertTextUrlToLink(text, skipSanitization);
}

function findCulture(culture) {
    return cultureService.findCulture(culture);
}

function getCulture(culture) {
    return cultureService.getCulture(culture);
}

kendo.culture = function(cultureName) {
    if (cultureName !== undefined) {
        cultureService.setCulture(cultureName);
    } else {
        return cultureService.culture();
    }
};

kendo.findCulture = findCulture;
kendo.getCulture = getCulture;
kendo.kendoCultureToIntl = function(culture) {
    return intlService.convert(culture);
};

// Set current culture to en-US.
kendo.culture(EN);

const round = function(value, precision, negative) {
    return formatterService.round(value, precision, negative);
};

const toString = function(value, fmt, culture) {
    return formatterService.toString(value, fmt, culture);
};

kendo.format = function(fmt) {
    const values = Array.prototype.slice.call(arguments, 1);
    return formatterService.format(fmt, ...values);
};

kendo._extractFormat = function(format) {
    return formatterService.extractFormat(format);
};

kendo._round = round;

kendo.dimensions = function(element, dimensions) {
    return domUtilsService.dimensions(element, dimensions);
};

kendo.onResize = function(callback) {
    return domUtilsService.onResize(callback);
};

kendo.unbindResize = function(callback) {
    domUtilsService.unbindResize(callback);
};

kendo.attrValue = function(element, key) {
    return domUtilsService.attrValue(element, key);
};

kendo.stripWhitespace = function(element) {
    domUtilsService.stripWhitespace(element);
};

kendo.animationFrame = function(callback) {
    domUtilsService.animationFrame(callback);
};

kendo.queueAnimation = function(callback) {
    domUtilsService.queueAnimation(callback);
};

kendo.runNextAnimation = function() {
    domUtilsService.runNextAnimation();
};

kendo.parseQueryStringParams = function(url) {
    return domUtilsService.parseQueryStringParams(url);
};

kendo.elementUnderCursor = function(e) {
    return domUtilsService.elementUnderCursor(e);
};

kendo.wheelDeltaY = function(jQueryEvent) {
    return domUtilsService.wheelDeltaY(jQueryEvent);
};

kendo.addAttribute = function(element, attribute, value) {
    return domUtilsService.addAttribute(element, attribute, value);
};

kendo.removeAttribute = function(element, attribute) {
    return domUtilsService.removeAttribute(element, attribute);
};

kendo.toggleAttribute = function(element, attribute, value) {
    return domUtilsService.toggleAttribute(element, attribute, value);
};

kendo.applyStylesFromKendoAttributes = function(element, styleProps) {
    return domUtilsService.applyStylesFromKendoAttributes(element, styleProps);
};

kendo.isElement = function(element) {
    return domUtilsService.isElement(element);
};

kendo._outerWidth = function(element, includeMargin, calculateFromHidden) {
    return domUtilsService.outerWidth(element, includeMargin, calculateFromHidden);
};

kendo._outerHeight = function(element, includeMargin, calculateFromHidden) {
    return domUtilsService.outerHeight(element, includeMargin, calculateFromHidden);
};

kendo.getShadows = function(element) {
    return domUtilsService.getShadows(element);
};

kendo.wrap = function(element, autosize, resize, shouldCorrectWidth = true, autowidth) {
    return domUtilsService.wrap(element, autosize, resize, shouldCorrectWidth, autowidth);
};

function getComputedStyles(element, properties) {
    return domUtilsService.getComputedStyles(element, properties);
}

function isScrollable(element) {
    return domUtilsService.isScrollable(element);
}

function scrollLeft(element, value) {
    return domUtilsService.scrollLeft(element, value);
}

function getOffset(element, type, positioned) {
    return domUtilsService.getOffset(element, type, positioned);
}

function parseEffects(input) {
    return domUtilsService.parseEffects(input);
}

kendo.toString = toString;

kendo.parseDate = function(value, formats, culture, shouldUnpadZeros) {
    return dateParserService.parseDate(value, formats, culture, shouldUnpadZeros);
};

kendo.parseExactDate = function(value, formats, culture) {
    return dateParserService.parseExactDate(value, formats, culture);
};

kendo.parseInt = function(value, culture) {
    return numberParserService.parseInt(value, culture);
};

kendo.parseFloat = function(value, culture, format) {
    return numberParserService.parseFloat(value, culture, format);
};

// This is needed because timezone is defined later and there's a circular dependency
(function() {
    let timezoneWired = false;
    let originalTimezone;

    Object.defineProperty(kendo, 'timezone', {
        get: function() {
            return originalTimezone;
        },
        set: function(value) {
            originalTimezone = value;
            if (value && !timezoneWired) {
                dateParserService.setTimezoneService(value);
                timezoneWired = true;
            }
        },
        configurable: true
    });
})();

const directions = effectsService.directions;

function fx(element) {
    return effectsService.fx(element);
}

const effects = effectsService.effects;

function animate(element, options, duration, reverse, complete) {
    return effectsService.animate(element, options, duration, reverse, complete);
}

function toggleClass(element, classes, options, add) {
    return effectsService.toggleClass(element, classes, options, add);
}

if (!("kendoAnimate" in $.fn)) {
    extend($.fn, {
        kendoStop: function(clearQueue, gotoEnd) {
            return this.stop(clearQueue, gotoEnd);
        },

        kendoAnimate: function(options, duration, reverse, complete) {
            return animate(this, options, duration, reverse, complete);
        },

        kendoAddClass: function(classes, options) {
            return kendo.toggleClass(this, classes, options, true);
        },

        kendoRemoveClass: function(classes, options) {
            return kendo.toggleClass(this, classes, options, false);
        },
        kendoToggleClass: function(classes, options, toggle) {
            return kendo.toggleClass(this, classes, options, toggle);
        }
    });
}

const eventTarget = function(e) {
    return domUtilsService.eventTarget(e);
};

if (supportService.touch) {
    each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(m, value) {
        $.fn[value] = function(callback) {
            return this.on(value, callback);
        };
    });
}

extend(kendo, {
    ui: kendo.ui || {},
    fx: kendo.fx || fx,
    effects: kendo.effects || effects,
    mobile: kendo.mobile || {},
    data: kendo.data || {},
    dataviz: kendo.dataviz || {},
    drawing: kendo.drawing || {},
    spreadsheet: { messages: {} },
    keys: utilsService.keys,
    support: kendo.support || supportService,
    animate: kendo.animate || animate,
    attr: function(value) {
        return domUtilsService.attr(value);
    },
    deepExtend: deepExtend,
    getComputedStyles: getComputedStyles,
    isScrollable: isScrollable,
    scrollLeft: scrollLeft,
    size: size,
    toCamelCase: toCamelCase,
    toHyphens: toHyphens,
    getOffset: kendo.getOffset || getOffset,
    parseEffects: kendo.parseEffects || parseEffects,
    toggleClass: kendo.toggleClass || toggleClass,
    directions: kendo.directions || directions,
    Observable: Observable,
    Class: Class,
    Template: Template,
    template: Template.compile.bind(Template),
    render: Template.render.bind(Template),
    stringify: JSON.stringify.bind(JSON),
    eventTarget: eventTarget,
    htmlEncode: htmlEncode,
    sanitizeLink: sanitizeLink,
    convertTextUrlToLink: convertTextUrlToLink,
    unescape: unescape,
    isLocalUrl: function(url) {
        return utilsService.isLocalUrl(url);
    },
    mediaQuery: mediaQuery,
    expr: function(expression, safe, paramName) {
        return propertyAccessService.expr(expression, safe, paramName);
    },

    exprToArray: function(expression, safe) {
        return propertyAccessService.exprToArray(expression, safe);
    },

    getter: function(expression, safe) {
        return propertyAccessService.getter(expression, safe);
    },

    setter: function(expression) {
        return propertyAccessService.setter(expression);
    },

    accessor: function(expression) {
        return propertyAccessService.accessor(expression);
    },

    guid: function() {
        return utilsService.guid();
    },

    roleSelector: function(role) {
        return selectorService.roleSelector(role, namespaceService.ns);
    },

    directiveSelector: function(directives) {
        return selectorService.directiveSelector(directives);
    },

    triggeredByInput: function(e) {
        return domUtilsService.triggeredByInput(e);
    },

    logToConsole: function(message, type) {
        utilsService.logToConsole(message, type);
    }
});

// Make kendo.ns delegate to NamespaceService for backwards compatibility
Object.defineProperty(kendo, "ns", {
    get: function() {
        return namespaceService.ns;
    },
    set: function(value) {
        namespaceService.setNs(value);
    },
    enumerable: true,
    configurable: true
});

kendo.notify = noop;

kendo.initWidget = function(element, options, roles, source) {
    return widgetUtilsService.initWidget(element, options, roles, source);
};

kendo.rolesFromNamespaces = function(namespaces) {
    return widgetRegistryService.rolesFromNamespaces(namespaces, [kendo.ui, kendo.dataviz.ui]);
};

kendo.init = function(element) {
    const namespaces = slice.call(arguments, 1);
    widgetUtilsService.init(element, ...namespaces);
};

kendo.destroy = function(element) {
    widgetUtilsService.destroy(element);
};

kendo.resize = function(element, force) {
    widgetUtilsService.resize(element, force);
};

kendo.parseOptions = function(element, options, source) {
    return widgetUtilsService.parseOptions(element, options, source);
};

const ContainerNullObject = { bind: function() { return this; }, nullObject: true, options: {} };

const MobileWidget = Widget.extend({
    init: function(element, options) {
        Widget.fn.init.call(this, element, options);
        this.element.autoApplyNS();
        this.wrapper = this.element;
        this.element.addClass("km-widget");
    },

    destroy: function() {
        Widget.fn.destroy.call(this);
        this.element.kendoDestroy();
    },

    options: {
        prefix: "Mobile"
    },

    events: [],

    view: function() {
        const viewElement = this.element.closest(kendo.roleSelector("view splitview modalview drawer"));
        return widgetUtilsService.widgetInstance(viewElement, kendo.mobile.ui) || ContainerNullObject;
    },

    viewHasNativeScrolling: function() {
        const view = this.view();
        return view && view.options.useNativeScrolling;
    },

    container: function() {
        const element = this.element.closest(kendo.roleSelector("view layout modalview drawer splitview"));
        return widgetUtilsService.widgetInstance(element.eq(0), kendo.mobile.ui) || ContainerNullObject;
    }
});

// Create the 'ui' registry namespace.
kendo.ui = widgetRegistryService.createNamespace("ui", {
    Widget: Widget,
    DataBoundWidget: DataBoundWidget,
    progress: function(container, toggle, options) {
        return domUtilsService.progress(container, toggle, options);
    },
    plugin: function(widget, register, prefix) {
        widgetRegistryService.registerToNamespace(widget, register || kendo.ui, prefix);
    }
});

kendo.ui.progress.messages = {
    loading: "Loading..."
};

// Create the 'mobile.ui' registry namespace.
kendo.mobile.ui = widgetRegistryService.createNamespace("mobile.ui", {
    Widget: MobileWidget,
    DataBoundWidget: DataBoundWidget.extend(MobileWidget.prototype),
    plugin: function(widget) {
        widgetRegistryService.registerToNamespace(widget, kendo.mobile.ui, "Mobile");
    }
});

extend(kendo.mobile, {
    init: function(element) {
        const defaultNs = widgetRegistryService.getNamespace("ui");
        const mobileNs = widgetRegistryService.getNamespace("mobile.ui");
        const datavizNs = widgetRegistryService.getNamespace("dataviz.ui");
        widgetUtilsService.init(element, mobileNs, defaultNs, datavizNs);
    },
    roles: {}
});

// Create the 'dataviz.ui' registry namespace.
kendo.dataviz.ui = widgetRegistryService.createNamespace("dataviz.ui", {
    themes: {},
    views: [],
    plugin: function(widget) {
        widgetRegistryService.registerToNamespace(widget, kendo.dataviz.ui);
    }
});

deepExtend(kendo.dataviz, {
    init: function(element) {
        widgetUtilsService.init(element, widgetRegistryService.getNamespace("dataviz.ui"));
    },
    roles: {}
});

kendo.touchScroller = function(elements, options) {
    // return the first touch scroller
    if (!options) { options = {}; }

    options.useNative = true;

    return $(elements).map(function(idx, element) {
        element = $(element);
        if (supportService.kineticScrollNeeded && kendo.mobile.ui.Scroller && !element.data("kendoMobileScroller")) {
            element.kendoMobileScroller(options);
            return element.data("kendoMobileScroller");
        } else {
            return false;
        }
    })[0];
};

kendo.preventDefault = function(e) {
    e.preventDefault();
};

kendo.widgetInstance = function(element, suites) {
    return widgetUtilsService.widgetInstance(element, suites);
};

// Event map - delegates to EventMapService
kendo.applyEventMap = function(events, ns) {
    return eventMapService.applyEventMap(events, ns);
};

kendo.keyDownHandler = function(e, widget) {
    return kendoJQueryService.keyDownHandler(e, widget);
};

// The zones and rules are populated externally by kendo.timezones.min.js
kendo.timezone = {
    get zones() { return timezoneService.zones; },
    set zones(value) { timezoneService.zones = value; },
    get rules() { return timezoneService.rules; },
    set rules(value) { timezoneService.rules = value; },
    offset: function(utcTime, timezone) {
        return timezoneService.offset(utcTime, timezone);
    },
    convert: function(date, fromOffset, toOffset) {
        return timezoneService.convert(date, fromOffset, toOffset);
    },
    apply: function(date, timezone) {
        return timezoneService.apply(date, timezone);
    },
    remove: function(date, timezone) {
        return timezoneService.remove(date, timezone);
    },
    abbr: function(utcTime, timezone) {
        return timezoneService.abbr(utcTime, timezone);
    },
    toLocalDate: function(time) {
        return timezoneService.toLocalDate(time);
    }
};

kendo.date = {
    get MS_PER_MINUTE() { return dateUtilsService.MS_PER_MINUTE; },
    get MS_PER_HOUR() { return dateUtilsService.MS_PER_HOUR; },
    get MS_PER_DAY() { return dateUtilsService.MS_PER_DAY; },
    adjustDST: function(date, hours) { return dateUtilsService.adjustDST(date, hours); },
    setDayOfWeek: function(date, day, dir) { return dateUtilsService.setDayOfWeek(date, day, dir); },
    dayOfWeek: function(date, day, dir) { return dateUtilsService.dayOfWeek(date, day, dir); },
    firstDayOfMonth: function(date) { return dateUtilsService.firstDayOfMonth(date); },
    lastDayOfMonth: function(date) { return dateUtilsService.lastDayOfMonth(date); },
    firstDayOfYear: function(date) { return dateUtilsService.firstDayOfYear(date); },
    lastDayOfYear: function(date) { return dateUtilsService.lastDayOfYear(date); },
    weekInYear: function(date, weekStartDay) { return dateUtilsService.weekInYear(date, weekStartDay); },
    getDate: function(date) { return dateUtilsService.getDate(date); },
    toUtcTime: function(date) { return dateUtilsService.toUtcTime(date); },
    getMilliseconds: function(date) { return dateUtilsService.getMilliseconds(date); },
    isInTimeRange: function(value, min, max) { return dateUtilsService.isInTimeRange(value, min, max); },
    isInDateRange: function(value, min, max) { return dateUtilsService.isInDateRange(value, min, max); },
    addDays: function(date, offset) { return dateUtilsService.addDays(date, offset); },
    setTime: function(date, milliseconds, ignoreDST) { return dateUtilsService.setTime(date, milliseconds, ignoreDST); },
    setHours: function(date, time) { return dateUtilsService.setHours(date, time); },
    today: function() { return dateUtilsService.today(); },
    isToday: function(date) { return dateUtilsService.isToday(date); },
    toInvariantTime: function(date) { return dateUtilsService.toInvariantTime(date); },
    nextDay: function(date) { return dateUtilsService.nextDay(date); },
    previousDay: function(date) { return dateUtilsService.previousDay(date); },
    nextYear: function(date) { return dateUtilsService.nextYear(date); },
    previousYear: function(date) { return dateUtilsService.previousYear(date); },
    splitDateFormat: function(format) { return dateUtilsService.splitDateFormat(format); },
    dateFormatNames: function(options) { return dateUtilsService.dateFormatNames(options); },
    dateFieldName: function(options) { return dateUtilsService.dateFieldName(options); }
};

kendo.caret = function(element, start, end) {
    return inputService.caret(element, start, end);
};

kendo.antiForgeryTokens = function() {
    return inputService.antiForgeryTokens();
};

kendo.cycleForm = function(form) {
    return focusUtilsService.cycleForm(form);
};

kendo.focusElement = function(element) {
    return focusUtilsService.focusElement(element);
};

kendo.focusNextElement = function() {
    return focusUtilsService.focusNextElement();
};

kendo.getWidgetFocusableElement = function(element) {
    return focusUtilsService.getWidgetFocusableElement(element);
};

kendo._activeElement = function() {
    return focusUtilsService.activeElement();
};

focusUtilsService.registerFocusableSelector();

kendo.matchesMedia = function(mediaQuery) {
    return supportService.matchesMedia(mediaQuery);
};

kendo._bootstrapToMedia = function(bootstrapMedia) {
    return supportService.bootstrapToMedia(bootstrapMedia);
};

kendo.fileGroupMap = fileUtilsService.fileGroupMap;

kendo.getFileGroup = function(extension, withPrefix) {
    return fileUtilsService.getFileGroup(extension, withPrefix);
};

kendo.getFileSizeMessage = function(size) {
    return fileUtilsService.getFileSizeMessage(size);
};

kendo.saveAs = function(options) {
    return fileUtilsService.saveAs(options);
};

kendo.selectorFromClasses = function(classes) {
    return selectorService.selectorFromClasses(classes);
};

kendo.cssProperties = {
    get positionModeValues() { return cssPropertiesService.positionModeValues; },
    get roundedValues() { return cssPropertiesService.roundedValues; },
    get sizeValues() { return cssPropertiesService.sizeValues; },
    get shapeValues() { return cssPropertiesService.shapeValues; },
    get fillModeValues() { return cssPropertiesService.fillModeValues; },
    get themeColorValues() { return cssPropertiesService.themeColorValues; },
    get resizeValues() { return cssPropertiesService.resizeValues; },
    get overflowValues() { return cssPropertiesService.overflowValues; },
    get layoutFlowValues() { return cssPropertiesService.layoutFlowValues; },

    get defaultValues() { return cssPropertiesService.defaultValues; },
    set defaultValues(value) { cssPropertiesService.defaultValues = value; },
    get propertyDictionary() { return cssPropertiesService.propertyDictionary; },
    set propertyDictionary(value) { cssPropertiesService.propertyDictionary = value; },

    registerValues: function(widget, args) {
        return cssPropertiesService.registerValues(widget, args);
    },
    getValidClass: function(args) {
        return cssPropertiesService.getValidClass(args);
    },
    registerPrefix: function(widget, prefix) {
        return cssPropertiesService.registerPrefix(widget, prefix);
    },

    get propertyToCssClassMap() { return cssPropertiesService.propertyToCssClassMap; },
    registerCssClass: function(propName, value, shorthand) {
        return cssPropertiesService.registerCssClass(propName, value, shorthand);
    },
    registerCssClasses: function(propName, arr) {
        return cssPropertiesService.registerCssClasses(propName, arr);
    },
    getValidCssClass: function(prefix, propName, value) {
        return cssPropertiesService.getValidCssClass(prefix, propName, value);
    }
};

kendo.registerCssClass = function(propName, value, shorthand) {
    return cssPropertiesService.registerCssClass(propName, value, shorthand);
};

kendo.registerCssClasses = function(propName, arr) {
    return cssPropertiesService.registerCssClasses(propName, arr);
};

kendo.getValidCssClass = function(prefix, propName, value) {
    return cssPropertiesService.getValidCssClass(prefix, propName, value);
};

kendo.propertyToCssClassMap = cssPropertiesService.propertyToCssClassMap;

kendo.proxyModelSetters = function proxyModelSetters(data) {
    const observable = {};

    Object.keys(data || {}).forEach(function(property) {
        Object.defineProperty(observable, property, {
            get: function() {
                return data[property];
            },
            set: function(value) {
                data[property] = value;
                data.dirty = true;
            }
        });
    });

    return observable;
};

kendo.getSeriesColors = function() {
    return colorService.getSeriesColors();
};

kendo.defaults = defaultsService.getDefaults();
kendo.setDefaults = function(key, value) {
    defaultsService.setDefaults(key, value);
};

// Use external global flags for templates.
kendo.debugTemplates = window.DEBUG_KENDO_TEMPLATES;

// Setup default mediaQuery breakpoints
kendo.setDefaults('breakpoints', defaultBreakpoints);

kendo.class2type = typeUtilsService.getClass2Type();
kendo.type = function(obj) {
    return typeUtilsService.type(obj);
};

export { fromESClass };
export default kendo;