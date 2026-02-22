// TAB key code - will be moved to utils service in future refactoring
const TAB_KEY = 9;
/**
 * Focus Utils Service - provides focus-related utilities
 
 */
export class FocusUtilsService {
    constructor($, domUtils, widgetUtilsService) {
        this.$ = $;
        this.domUtils = domUtils;
        this.widgetUtilsService = widgetUtilsService;
    }
    /**
     * Check if an element is focusable
     */
    focusable(element, isTabIndexNotNaN) {
        const nodeName = element.nodeName.toLowerCase();
        return (/input|select|textarea|button|object/.test(nodeName) ?
            !element.disabled :
            nodeName === "a" ?
                element.href || isTabIndexNotNaN :
                isTabIndexNotNaN) &&
            this.visible(element);
    }
    /**
     * Check if an element is visible (not hidden or with visibility:hidden)
     */
    visible(element) {
        const $ = this.$;
        return $.expr.pseudos.visible(element) &&
            !$(element).parents().addBack().filter(function () {
                return $.css(this, "visibility") === "hidden";
            }).length;
    }
    /**
     * Check if an element is kendo-focusable (focusable with positive tabindex)
     */
    kendoFocusable(element) {
        const idx = this.$(element).attr("tabindex");
        const numIdx = idx !== undefined ? parseInt(idx, 10) : NaN;
        return this.focusable(element, !isNaN(numIdx) && numIdx > -1);
    }
    /**
     * Focus an element while preserving scroll positions of parent containers
     */
    focusElement(element) {
        const $ = this.$;
        const domUtils = this.domUtils;
        const scrollTopPositions = [];
        const scrollableParents = element.parentsUntil("body")
            .filter(function (index, el) {
            const computedStyle = domUtils.getComputedStyles(el, ["overflow"]);
            return computedStyle.overflow !== "visible";
        })
            .add(window);
        scrollableParents.each(function (index, parent) {
            scrollTopPositions[index] = $(parent).scrollTop() || 0;
        });
        try {
            //The setActive method does not cause the document to scroll to the active object in the current page
            element[0].setActive();
        }
        catch (e) {
            element.trigger("focus");
        }
        scrollableParents.each(function (index, parent) {
            $(parent).scrollTop(scrollTopPositions[index]);
        });
    }
    /**
     * Focus the next focusable element in the document
     */
    focusNextElement() {
        const $ = this.$;
        if (document.activeElement) {
            const focussable = $(":kendoFocusable");
            const index = focussable.index(document.activeElement);
            if (index > -1) {
                const nextElement = focussable[index + 1] || focussable[0];
                nextElement.focus();
            }
        }
    }
    /**
     * Set up form cycling - when tabbing from last element, cycle to first
     */
    cycleForm(form) {
        const $ = this.$;
        const self = this;
        const firstElement = form.find("input, .k-widget, .k-dropdownlist, .k-combobox").first();
        const lastElement = form.find("button, .k-button").last();
        function focus(el) {
            const widget = self.widgetUtilsService.widgetInstance(el);
            if (widget && widget.focus) {
                widget.focus();
            }
            else {
                el.trigger("focus");
            }
        }
        lastElement.on("keydown", function (e) {
            if (e.keyCode === TAB_KEY && !e.shiftKey) {
                e.preventDefault();
                focus(firstElement);
            }
        });
        firstElement.on("keydown", function (e) {
            if (e.keyCode === TAB_KEY && e.shiftKey) {
                e.preventDefault();
                focus(lastElement);
            }
        });
    }
    /**
     * Get the focusable element for a widget
     */
    getWidgetFocusableElement(element) {
        const $ = this.$;
        const nextFocusable = element.closest(":kendoFocusable");
        const widgetInstance = this.widgetUtilsService.widgetInstance(element);
        let target;
        if (nextFocusable.length) {
            target = nextFocusable;
        }
        else if (widgetInstance) {
            target = widgetInstance.options.name === 'Editor' ?
                $(widgetInstance.body) :
                widgetInstance.wrapper.find(":kendoFocusable").first();
        }
        else {
            target = element;
        }
        return target;
    }
    /**
     * Register the :kendoFocusable pseudo-selector with jQuery
     */
    registerFocusableSelector() {
        const self = this;
        const $ = this.$;
        $.extend($.expr.pseudos, {
            kendoFocusable: function (element) {
                return self.kendoFocusable(element);
            }
        });
    }
    /**
     * Get the currently focused element in the document.
     * Handles exceptions that can occur in some browsers.
     * @returns The active element
     */
    activeElement() {
        try {
            return document.activeElement;
        }
        catch (e) {
            return document.documentElement.activeElement;
        }
    }
}
