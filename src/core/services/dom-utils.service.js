// Constants
const PERCENT_REGEXP = /%/;
const BOX_SHADOW_REGEXP = /(\d+(?:\.?)\d*)px\s*(\d+(?:\.?)\d*)px\s*(\d+(?:\.?)\d*)px\s*(\d+)?/i;
/**
 * Service providing DOM utility functions
 */
export class DomUtilsService {
    constructor(supportService, $, namespaceService, utils, kendo // Optional kendo namespace for progress messages
    ) {
        this.supportService = supportService;
        this.$ = $;
        this.namespaceService = namespaceService;
        this.utils = utils;
        this.kendo = kendo;
        this.animationQueue = [];
        // Set up requestAnimationFrame with fallbacks
        const win = window;
        this.animationFrameFn =
            win.requestAnimationFrame ||
                win.webkitRequestAnimationFrame ||
                win.mozRequestAnimationFrame ||
                win.oRequestAnimationFrame ||
                win.msRequestAnimationFrame ||
                ((callback) => { setTimeout(callback, 1000 / 60); });
    }
    isElement(element) {
        return element instanceof Element || element instanceof HTMLDocument;
    }
    /**
     * Get outer width of element
     */
    outerWidth(element, includeMargin, calculateFromHidden) {
        const $element = this.$(element);
        if (calculateFromHidden) {
            return this.getHiddenDimensions($element, includeMargin).width;
        }
        return $element.outerWidth(includeMargin || false) || 0;
    }
    /**
     * Get outer height of element
     */
    outerHeight(element, includeMargin, calculateFromHidden) {
        const $element = this.$(element);
        if (calculateFromHidden) {
            return this.getHiddenDimensions($element, includeMargin).height;
        }
        return $element.outerHeight(includeMargin || false) || 0;
    }
    /**
     * Get computed styles for an element
     */
    getComputedStyles(element, properties) {
        const styles = {};
        let computedStyle;
        if (document.defaultView && document.defaultView.getComputedStyle) {
            computedStyle = document.defaultView.getComputedStyle(element, "");
            if (properties) {
                this.$.each(properties, (_idx, value) => {
                    styles[value] = computedStyle.getPropertyValue(value);
                });
            }
        }
        else {
            // IE fallback
            computedStyle = element.currentStyle;
            if (properties) {
                this.$.each(properties, (_idx, value) => {
                    styles[value] = computedStyle[this.utils.toCamelCase(value)];
                });
            }
        }
        if (!this.utils.size(styles)) {
            return computedStyle;
        }
        return styles;
    }
    /**
     * Check if an element is scrollable
     */
    isScrollable(element) {
        const dataset = element.dataset;
        if (dataset[this.namespaceService.ns + "scrollable"] === "false") {
            return false;
        }
        if (typeof (element === null || element === void 0 ? void 0 : element.className) === "string" &&
            element.className.indexOf("k-auto-scrollable") > -1) {
            return true;
        }
        const overflow = this.getComputedStyles(element, ["overflow"]).overflow || "";
        return overflow.indexOf("auto") > -1 || overflow.indexOf("scroll") > -1;
    }
    /**
     * Get or set scroll left position (RTL-aware)
     */
    scrollLeft(element, value) {
        const webkit = this.supportService.browser.webkit;
        const mozilla = this.supportService.browser.mozilla;
        const browserVersion = this.supportService.browser.version;
        // Handle jQuery collection
        if (element instanceof this.$ && value !== undefined) {
            element.each((_i, e) => {
                this.scrollLeft(e, value);
            });
            return;
        }
        const el = element instanceof this.$ ? element[0] : element;
        if (!el) {
            return;
        }
        const isRtl = this.supportService.isRtl(element);
        if (value !== undefined) {
            if (isRtl && webkit && (browserVersion < 85 || this.supportService.browser.safari)) {
                el.scrollLeft = el.scrollWidth - el.clientWidth - value;
            }
            else if (isRtl && (mozilla || webkit) && value > 0) {
                el.scrollLeft = -value;
            }
            else {
                el.scrollLeft = value;
            }
        }
        else if (isRtl && webkit && (browserVersion < 85 || this.supportService.browser.safari)) {
            return el.scrollWidth - el.clientWidth - el.scrollLeft;
        }
        else {
            return Math.abs(el.scrollLeft);
        }
    }
    /**
     * Get element offset position
     */
    getOffset(element, type = "offset", positioned) {
        const offset = element[type]();
        // Clone ClientRect object to JS object (jQuery3)
        const result = {
            top: offset.top,
            right: offset.right,
            bottom: offset.bottom,
            left: offset.left
        };
        // IE10 touch zoom is living in a separate viewport
        if (this.supportService.browser.msie && (this.supportService.pointers || this.supportService.msPointers) && !positioned) {
            const sign = this.supportService.isRtl(element) ? 1 : -1;
            result.top -= (window.pageYOffset - (document.documentElement.scrollTop));
            result.left -= (window.pageXOffset + (sign * document.documentElement.scrollLeft));
        }
        return result;
    }
    /**
     * Get dimensions of a hidden element by temporarily cloning and showing it
     */
    getHiddenDimensions(element, includeMargin) {
        const clone = element.clone();
        clone.css("display", "");
        clone.css("visibility", "hidden");
        clone.appendTo(this.$("body"));
        const width = clone.outerWidth(includeMargin || false);
        const height = clone.outerHeight(includeMargin || false);
        clone.remove();
        return {
            width: width || 0,
            height: height || 0
        };
    }
    /**
     * Parse effects string into object
     */
    parseEffects(input) {
        const effects = {};
        const items = typeof input === "string" ? input.split(" ") : input;
        this.$.each(items, function (idx) {
            effects[idx] = this;
        });
        return effects;
    }
    /**
     * Remove whitespace text nodes from an element
     */
    stripWhitespace(element) {
        var _a, _b;
        if (document.createNodeIterator) {
            const iterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT, (node) => {
                return node.parentNode === element
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            });
            while (iterator.nextNode()) {
                const refNode = iterator.referenceNode;
                if (refNode && !((_a = refNode.textContent) === null || _a === void 0 ? void 0 : _a.trim())) {
                    (_b = refNode.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(refNode);
                }
            }
        }
    }
    /**
     * Request animation frame wrapper
     */
    animationFrame(callback) {
        this.animationFrameFn.call(window, callback);
    }
    /**
     * Queue an animation callback
     */
    queueAnimation(callback) {
        this.animationQueue.push(callback);
        if (this.animationQueue.length === 1) {
            this.runNextAnimation();
        }
    }
    /**
     * Run the next animation in queue
     */
    runNextAnimation() {
        this.animationFrame(() => {
            if (this.animationQueue[0]) {
                this.animationQueue.shift()();
                if (this.animationQueue[0]) {
                    this.runNextAnimation();
                }
            }
        });
    }
    /**
     * Parse query string parameters from URL
     */
    parseQueryStringParams(url) {
        const queryString = url.split("?")[1] || "";
        const params = {};
        const paramParts = queryString.split(/&|=/);
        const length = paramParts.length;
        for (let idx = 0; idx < length; idx += 2) {
            if (paramParts[idx] !== "") {
                params[decodeURIComponent(paramParts[idx])] = decodeURIComponent(paramParts[idx + 1]);
            }
        }
        return params;
    }
    /**
     * Get element under cursor position
     */
    elementUnderCursor(e) {
        if (typeof e.x.client !== "undefined") {
            return document.elementFromPoint(e.x.client, e.y.client);
        }
        return null;
    }
    /**
     * Get wheel delta Y from jQuery event
     */
    wheelDeltaY(jQueryEvent) {
        const e = jQueryEvent.originalEvent;
        const deltaY = e.wheelDeltaY;
        let delta;
        if (e.wheelDelta) {
            // Webkit and IE
            if (deltaY === undefined || deltaY) {
                // IE does not have deltaY, thus always scroll
                delta = e.wheelDelta;
            }
        }
        else if (e.detail && e.axis === e.VERTICAL_AXIS) {
            // Firefox and Opera
            delta = (-e.detail) * 10;
        }
        return delta;
    }
    /**
     * Get box-shadow dimensions from an element
     */
    getShadows(element) {
        const shadow = element.css("box-shadow");
        const radius = shadow
            ? BOX_SHADOW_REGEXP.exec(shadow) || [0, 0, 0, 0, 0]
            : [0, 0, 0, 0, 0];
        const blur = Math.max(+radius[3], +(radius[4] || 0));
        return {
            left: (-radius[1]) + blur,
            right: (+radius[1]) + blur,
            bottom: (+radius[2]) + blur
        };
    }
    /**
     * Wrap element with animation container
     */
    wrap(element, autosize, resize, shouldCorrectWidth = true, autowidth) {
        let parent = element.parent();
        const windowOuterWidth = this.outerWidth(window);
        parent.parent().removeClass("k-animation-container-sm");
        if (!parent.hasClass("k-child-animation-container")) {
            const width = element[0].style.width;
            const height = element[0].style.height;
            const percentWidth = PERCENT_REGEXP.test(width);
            const percentHeight = PERCENT_REGEXP.test(height);
            const forceDimensions = element.hasClass("k-tooltip") || element.is(".k-menu-horizontal.k-context-menu");
            const calculateFromHidden = element.hasClass("k-tooltip");
            const percentage = percentWidth || percentHeight;
            let computedWidth = width;
            let computedHeight = height;
            if (!percentWidth && (!autosize || (autosize && width) || forceDimensions)) {
                computedWidth = autosize
                    ? this.outerWidth(element, false, calculateFromHidden) + 1
                    : this.outerWidth(element, false, calculateFromHidden);
            }
            if (!percentHeight && (!autosize || (autosize && height)) || forceDimensions) {
                computedHeight = this.outerHeight(element, false, calculateFromHidden);
            }
            element.wrap(this.$("<div/>")
                .addClass("k-child-animation-container")
                .css({
                width: autowidth ? "auto" : computedWidth,
                height: computedHeight
            }));
            parent = element.parent();
            parent.wrap(this.$("<div/>")
                .addClass("k-animation-container")
                .attr("role", "region"));
            if (percentage) {
                element.css({
                    width: "100%",
                    height: "100%"
                });
            }
        }
        else {
            this.wrapResize(element, autosize, shouldCorrectWidth);
        }
        parent = parent.parent();
        if (windowOuterWidth < this.outerWidth(parent)) {
            parent.addClass("k-animation-container-sm");
            resize = true;
        }
        if (resize) {
            this.wrapResize(element, autosize, shouldCorrectWidth);
        }
        return parent;
    }
    /**
     * Resize wrapped element
     */
    wrapResize(element, autosize, shouldCorrectWidth = true) {
        const parent = element.parent();
        const wrapper = element.closest(".k-animation-container");
        const calculateFromHidden = element.hasClass("k-tooltip");
        const visible = element.is(":visible");
        const wrapperStyle = parent[0].style;
        const elementHeight = element[0].style.height;
        if (wrapper.is(":hidden")) {
            wrapper.css({
                display: "",
                position: ""
            });
        }
        const percentage = PERCENT_REGEXP.test(wrapperStyle.width) || PERCENT_REGEXP.test(wrapperStyle.height);
        if (!percentage) {
            if (!visible) {
                element.add(parent).show();
            }
            if (shouldCorrectWidth) {
                parent.css("width", ""); // Needed to get correct width dimensions
            }
            parent.css({
                width: autosize
                    ? this.outerWidth(element, false, calculateFromHidden) + 1
                    : this.outerWidth(element, false, calculateFromHidden),
            });
            if (elementHeight === "auto") {
                element.css({ height: this.outerHeight(parent) });
            }
            else {
                parent.css({
                    height: this.outerHeight(element)
                });
            }
            if (!visible) {
                element.hide();
            }
        }
    }
    /**
     * Scroll element horizontally by a delta
     */
    scrollByDelta(element, delta) {
        const isRtl = this.supportService.isRtl(element);
        const srcOffset = isRtl ? -this.scrollLeft(element) : this.scrollLeft(element);
        const scrollDestination = srcOffset + delta;
        const scrollWidth = element[0].scrollWidth - element[0].clientWidth;
        const animationProps = { "scrollLeft": scrollDestination };
        element.finish().animate(animationProps, "fast", "linear");
        const maxScroll = isRtl ? -scrollWidth : scrollWidth;
        const newScrollLeft = isRtl
            ? Math.max(Math.min(scrollDestination, 0), maxScroll)
            : Math.min(Math.max(scrollDestination, 0), maxScroll);
        return {
            atStart: newScrollLeft === 0,
            atEnd: newScrollLeft === maxScroll
        };
    }
    /**
     * Scroll element vertically by a delta
     */
    scrollVerticalByDelta(element, delta, options = {}) {
        const { duration = 'fast', easing = 'linear' } = options;
        const currentScrollTop = element.scrollTop() || 0;
        const targetScrollTop = currentScrollTop + delta;
        const animationProps = { "scrollTop": targetScrollTop };
        element.finish().animate(animationProps, duration, easing);
        const maxScroll = element[0].scrollHeight - element[0].clientHeight;
        const newScrollTop = Math.min(Math.max(targetScrollTop, 0), maxScroll);
        return {
            atTop: newScrollTop === 0,
            atBottom: newScrollTop >= maxScroll
        };
    }
    /**
     * Smoothly scroll to a specific element within a container
     */
    scrollToElement(container, targetElement, options = {}) {
        if (!container.length || !targetElement.length) {
            return false;
        }
        const { duration = 0, easing = 'linear', position = 'center', offset = 0, onComplete } = options;
        const containerHeight = container.height() || 0;
        const containerScrollTop = container.scrollTop() || 0;
        const containerOffset = container.offset();
        const targetOffset = targetElement.offset();
        const targetHeight = targetElement.outerHeight() || 0;
        const relativeTop = targetOffset.top - containerOffset.top + containerScrollTop;
        let targetScrollTop;
        switch (position) {
            case 'top':
                targetScrollTop = relativeTop + offset;
                break;
            case 'bottom':
                targetScrollTop = relativeTop - containerHeight + targetHeight + offset;
                break;
            case 'center':
            default:
                targetScrollTop = relativeTop - (containerHeight / 2) + (targetHeight / 2) + offset;
                break;
        }
        const maxScroll = container[0].scrollHeight - container[0].clientHeight;
        targetScrollTop = Math.min(Math.max(targetScrollTop, 0), maxScroll);
        container.finish().animate({
            scrollTop: targetScrollTop
        }, duration, easing, onComplete);
        return true;
    }
    /**
     * Add a value to an element's attribute, avoiding duplicates
     * If the value already exists in the attribute, it won't be added again
     */
    addAttribute(element, attribute, value) {
        const current = element.attr(attribute) || "";
        if (current.indexOf(value) < 0) {
            element.attr(attribute, (current + " " + value).trim());
        }
    }
    /**
     * Remove an attribute from an element
     */
    removeAttribute(element, attribute) {
        element.removeAttr(attribute);
    }
    /**
     * Toggle an attribute value on an element
     * For regular attributes: adds if not present, removes if present
     * For disabled/readonly: adds only when value is truthy
     */
    toggleAttribute(element, attribute, value) {
        const doesNotHaveAttribute = (element.attr(attribute) || "").indexOf(value) < 0;
        const disabledReadonly = ["disabled", "readonly"].indexOf(attribute) > -1;
        if (doesNotHaveAttribute && !disabledReadonly) {
            this.addAttribute(element, attribute, value);
        }
        else if (disabledReadonly && value) {
            this.addAttribute(element, attribute, value);
        }
        else {
            this.removeAttribute(element, attribute);
        }
    }
    /**
     * Bind a callback to the window resize event.
     * On Android, the callback is delayed by 600ms to handle orientation changes properly.
     * @param callback - Function to call on resize
     * @returns The handler function (may be wrapped on Android)
     */
    onResize(callback) {
        let handler = callback;
        if (this.supportService.mobileOS && this.supportService.mobileOS.android) {
            handler = function () {
                setTimeout(callback, 600);
            };
        }
        this.$(window).on(this.supportService.resize, handler);
        return handler;
    }
    /**
     * Unbind a resize callback from the window.
     * @param callback - The handler returned from onResize
     */
    unbindResize(callback) {
        this.$(window).off(this.supportService.resize, callback);
    }
    /**
     * Get a data attribute value from an element using kendo namespace.
     * @param element - jQuery element
     * @param key - Attribute key (without kendo namespace prefix)
     * @returns The attribute value
     */
    attrValue(element, key) {
        return element.data(this.namespaceService.ns + key);
    }
    /**
     * Get the kendo data attribute name with namespace prefix.
     * @param value - The attribute name without prefix
     * @returns The full attribute name (e.g., "data-kendo-role" or "data-role")
     */
    attr(value) {
        return "data-" + this.namespaceService.ns + value;
    }
    /**
     * Get or set element dimensions.
     * @param element - jQuery element
     * @param dimensions - Optional dimensions to set
     * @returns Object with width and height
     */
    dimensions(element, dimensions) {
        const domElement = element[0];
        if (dimensions) {
            element.css(dimensions);
        }
        return { width: domElement.offsetWidth, height: domElement.offsetHeight };
    }
    /**
     * Check if an event was triggered by an input element
     * @param e - Event object
     * @returns True if event target is a form input element
     */
    triggeredByInput(e) {
        return (/^(label|input|textarea|select)$/i).test(e.target.tagName);
    }
    /**
     * Apply inline styles from kendo data attributes to elements
     * @param element - Container element to search within
     * @param styleProps - Array of CSS property names to apply
     */
    applyStylesFromKendoAttributes(element, styleProps) {
        const $ = this.$;
        const selector = styleProps.map(styleProp => `[${this.attr(`style-${styleProp}`)}]`).join(",");
        element.find(selector).addBack(selector).each((_, currentElement) => {
            const $currentElement = $(currentElement);
            styleProps.forEach((styleProp) => {
                const kendoAttr = this.attr(`style-${styleProp}`);
                if ($currentElement.attr(kendoAttr)) {
                    $currentElement.css(styleProp, $currentElement.attr(kendoAttr));
                    $currentElement.removeAttr(kendoAttr);
                }
            });
        });
    }
    /**
     * Show or hide a loading mask on a container element
     * @param container - Container element for the mask
     * @param toggle - Whether to show (true) or hide (false) the mask
     * @param options - Optional configuration for the mask
     */
    progress(container, toggle, options) {
        var _a, _b, _c;
        let mask = container.find(".k-loading-mask");
        const browser = this.supportService.browser;
        const opts = this.$.extend({}, {
            width: "100%",
            height: "100%",
            top: container.scrollTop(),
            opacity: false
        }, options);
        const cssClass = opts.opacity ? "k-loading-mask k-opaque" : "k-loading-mask";
        if (toggle) {
            if (!mask.length) {
                const isRtl = this.supportService.isRtl(container);
                const leftRight = isRtl ? "right" : "left";
                const containerScrollLeft = this.scrollLeft(container);
                let webkitCorrection = 0;
                if (browser.webkit && isRtl) {
                    webkitCorrection = container[0].scrollWidth - (container.width() || 0) - 2 * containerScrollLeft;
                }
                // Note: The loading text message is set via kendo.ui.progress.messages.loading
                // which should be accessed from the calling code
                const loadingText = ((_c = (_b = (_a = this.kendo.ui) === null || _a === void 0 ? void 0 : _a.progress) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c.loading) || "Loading...";
                this.$(`<div class='${cssClass}'><span role='alert' aria-live='polite' class='k-loading-text'>${loadingText}</span><div class='k-loading-image'></div><div class='k-loading-color'></div></div>`)
                    .width(opts.width)
                    .height(opts.height)
                    .css("top", opts.top)
                    .css(leftRight, Math.abs(containerScrollLeft) + webkitCorrection)
                    .prependTo(container);
            }
        }
        else if (mask) {
            mask.remove();
        }
    }
    /**
     * Get the actual target element from an event, handling touch events.
     * For touch events, uses document.elementFromPoint with touch coordinates.
     * @param e - Event object (mouse or touch)
     * @returns The target element
     */
    eventTarget(e) {
        if (!this.supportService.touch) {
            return e.target;
        }
        // Handle touch events - get element at touch point
        const originalEvent = e.originalEvent;
        const touches = (originalEvent === null || originalEvent === void 0 ? void 0 : originalEvent.changedTouches) || e.changedTouches;
        if (touches && touches.length > 0) {
            return document.elementFromPoint(touches[0].clientX, touches[0].clientY);
        }
        return e.target;
    }
    /**
     * Create a drag-to-scroll handler for horizontal scrolling via mouse/touch drag.
     * Encapsulates the drag state and event handling for scrollable containers.
     * @param scrollContainer - The element that will be scrolled (or parent for delegation)
     * @param options - Configuration options including namespace, capture element, and delegate selector
     * @returns Handler with attach() and destroy() methods
     */
    createDragToScrollHandler(scrollContainer, options) {
        return new DragToScrollHandlerImpl(this.$, scrollContainer, options);
    }
}
class DragToScrollHandlerImpl {
    constructor($, scrollContainer, options) {
        this.isDragging = false;
        this.hasDragged = false;
        this.dragStartX = 0;
        this.scrollStartLeft = 0;
        this.currentDragTarget = null;
        this.$ = $;
        this.scrollContainer = scrollContainer;
        this.namespace = options.namespace;
        this.captureElement = options.captureElement;
        this.delegateSelector = options.delegateSelector;
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.preventClickOnce = this.preventClickOnce.bind(this);
    }
    attach() {
        if (!this.captureElement) {
            return;
        }
        if (this.delegateSelector) {
            this.scrollContainer
                .on("mousedown" + this.namespace, this.delegateSelector, this.onDragStart)
                .on("touchstart" + this.namespace, this.delegateSelector, this.onDragStart);
        }
        else {
            this.scrollContainer
                .on("mousedown" + this.namespace, this.onDragStart)
                .on("touchstart" + this.namespace, this.onDragStart);
        }
        this.bindCaptureEvents();
    }
    destroy() {
        this.scrollContainer.off(this.namespace);
        if (this.captureElement) {
            this.unbindCaptureEvents();
        }
        this.scrollContainer[0].removeEventListener("click", this.preventClickOnce, true);
    }
    getClientX(e) {
        var _a, _b, _c, _d, _e;
        if (e.type.indexOf("touch") !== -1) {
            const touch = ((_b = (_a = e.originalEvent) === null || _a === void 0 ? void 0 : _a.touches) === null || _b === void 0 ? void 0 : _b[0]) || ((_d = (_c = e.originalEvent) === null || _c === void 0 ? void 0 : _c.changedTouches) === null || _d === void 0 ? void 0 : _d[0]);
            return touch ? touch.clientX : 0;
        }
        return e.clientX || ((_e = e.originalEvent) === null || _e === void 0 ? void 0 : _e.clientX) || 0;
    }
    preventClickOnce(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.scrollContainer[0].removeEventListener("click", this.preventClickOnce, true);
    }
    onDragStart(e) {
        const target = this.$(e.currentTarget);
        if (!target.length) {
            return;
        }
        this.isDragging = true;
        this.hasDragged = false;
        this.currentDragTarget = target[0];
        this.dragStartX = this.getClientX(e);
        this.scrollStartLeft = target[0].scrollLeft;
        target.css("cursor", "grabbing");
        target.css("user-select", "none");
    }
    onDragMove(e) {
        if (!this.isDragging || !this.currentDragTarget) {
            return;
        }
        const clientX = this.getClientX(e);
        const deltaX = this.dragStartX - clientX;
        if (!this.hasDragged && Math.abs(deltaX) >= DragToScrollHandlerImpl.DRAG_THRESHOLD) {
            this.hasDragged = true;
        }
        if (this.hasDragged) {
            e.preventDefault();
            this.currentDragTarget.scrollLeft = this.scrollStartLeft + deltaX;
        }
    }
    onDragEnd() {
        if (!this.isDragging) {
            return;
        }
        if (this.currentDragTarget) {
            const target = this.$(this.currentDragTarget);
            target.css("cursor", "");
            target.css("user-select", "");
        }
        if (this.hasDragged) {
            this.scrollContainer[0].addEventListener("click", this.preventClickOnce, true);
        }
        this.isDragging = false;
        this.hasDragged = false;
        this.currentDragTarget = null;
    }
    bindCaptureEvents() {
        if (!this.captureElement) {
            return;
        }
        // Bind all events to document so dragging continues when cursor leaves component
        this.$(document)
            .on("mousemove" + this.namespace, this.onDragMove)
            .on("touchmove" + this.namespace, this.onDragMove)
            .on("mouseup" + this.namespace, this.onDragEnd)
            .on("touchend" + this.namespace, this.onDragEnd);
    }
    unbindCaptureEvents() {
        this.$(document).off(this.namespace);
    }
}
DragToScrollHandlerImpl.DRAG_THRESHOLD = 5;
