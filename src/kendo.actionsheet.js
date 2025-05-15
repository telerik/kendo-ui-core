import "./kendo.core.js";
import "./kendo.popup.js";
import "./kendo.icons.js";
import "./kendo.html.button.js";
import "./kendo.actionsheet.view.js";

export const __meta__ = {
    id: "actionsheet",
    name: "ActionSheet",
    category: "web", // suite
    description: "The ActionSheet widget displays a set of choices related to a task the user initiates.",
    depends: ["core", "popup", "icons", "html.button", "actionsheet.view"] // dependencies
};

(function($, undefined) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var ui = kendo.ui;
    var ns = ".kendoActionSheet";
    var Popup = ui.Popup;
    var keys = kendo.keys;
    var isFunction = kendo.isFunction;
    var TabKeyTrap = Popup.TabKeyTrap;
    var DOCUMENT_ELEMENT = $(document.documentElement);
    var MOUSEDOWN = "down";
    var OPEN = "open";
    var CLOSE = "close";
    var ACTIVATE = "activate";
    var DEACTIVATE = "deactivate";
    var FOCUSABLE = ":kendoFocusable:not([tabindex='-1'])";
    var ACTION_SHEET_CONTAINER = "k-actionsheet-container";
    var OVERLAY = "k-overlay";
    var ACTION_SHEET = "k-actionsheet";
    var ACTION_SHEET_ADAPTIVE = "k-adaptive-actionsheet";
    var ACTION_SHEET_BOTTOM = "k-actionsheet-bottom";
    var ACTION_SHEET_FULLSCREEN = "k-actionsheet-fullscreen";
    var ACTIONABLE_BUTTON_SELECTOR = `.k-actionsheet-item:not(.${STATEDISABLED}),.k-actions .k-button[ref-actionsheet-action-button]:not(.${STATEDISABLED})`;
    var STATEDISABLED = "k-disabled";
    var HIDDEN = "k-hidden";
    var extend = $.extend;
    var CLICK = "click";
    var KEYDOWN = "keydown";

    function contains(container, target) {
        if (!container || !target) {
            return false;
        }
        return container === target || $.contains(container, target);
    }

    var ActionSheet = Widget.extend({
        init: function(element, options) {
            var that = this;
            options = options || {};

            Widget.fn.init.call(that, element, options);

            if (options.appendTo) {
                that.element.appendTo(options.appendTo);
            }

            that._wrapper();

            if (that._hasViews()) {
                that._initMultiViews();
            } else {
                that._initView();
            }

            that._toggleViewAnimationVariable();

            that._popup();
            that._applyAria();

            that._tabKeyTrap = new TabKeyTrap(that.wrapper);

            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());
            that.clickEvent = kendo.applyEventMap(CLICK, kendo.guid());
            that._mousedownProxy = that._mousedown.bind(that);
            that._clickProxy = that._click.bind(that);
            that.wrapper.on(KEYDOWN + ns, that, that._keydown.bind(that));
        },

        events: [
            OPEN,
            CLOSE,
            ACTIVATE,
            DEACTIVATE
        ],

        options: {
            name: "ActionSheet",
            title: null,
            subtitle: null,
            items: [],
            popup: null,
            fullscreen: false,
            footerTemplate: null,
            headerTemplate: null,
            contentTemplate: null,
            actionButtons: [],
            actionButtonsAlignment: "stretched",
            actionButtonsOrientation: "horizontal",
            animation: {
                open: {
                    effects: "slideIn:up",
                    transition: true,
                    duration: 200
                }
            },
            closeButton: false,
            startButton: false,
            adaptive: false,
            focusOnActivate: true,
            closeOnClick: true,
            views: [],
            activeView: 1,
        },

        _addView: function(viewConfig) {
            const that = this;
            const options = that.options;

            const hasOtherViews = that.views && that.views.length + 1 > 1;

            const viewOptions = viewConfig || {
                headerTemplate: options.headerTemplate,
                contentTemplate: options.contentTemplate,
                footerTemplate: options.footerTemplate,
                actionButtons: options.actionButtons,
                actionButtonsAlignment: options.actionButtonsAlignment,
                actionButtonsOrientation: options.actionButtonsOrientation,
                title: options.title,
                items: options.items,
                subtitle: options.subtitle,
                startButton: options.startButton,
                closeButton: options.closeButton,
                ref: options.ref,
            };


            viewOptions.addAnimationClass = hasOtherViews;
            viewOptions.index = that.views.length + 1;

            const view = that._initView(viewOptions);

            that._toggleViewAnimationVariable();
            that._addViewsAnimation();

            return view;
        },

        _setCurrentActiveView: function(index) {
            const that = this;

            if (that.views && that.views.length > 1) {
                that.element.css("--kendo-actionsheet-view-current", index);
            }
        },

        _removeView: function(view) {
            const that = this;
            const index = that.views.indexOf(view);

            if (that.views.length) {
                that.views.splice(index, 1);
                if (view._content) {
                    that._content.splice(index, 1);
                }
                if (view._footer) {
                    that._footer.splice(index, 1);
                }
                if (view._header) {
                    that._header.splice(index, 1);
                }

                view.destroy();

                that.views.forEach((view, i) => {
                    if (that.views.length === 1) {
                        view.wrapper.removeClass("k-actionsheet-view-animated");
                        view.wrapper.css({
                            transitionProperty: "",
                            transitionDuration: "",
                        });
                    }
                    view.index = i + 1;
                });
            }
            that._toggleViewAnimationVariable();
        },

        _toggleViewAnimationVariable: function() {
            const that = this;
            const element = that.element;
            if (that.views && that.views.length > 1) {
                element.css("--kendo-actionsheet-view-current", that.options.activeView);
            } else {
                element.css("--kendo-actionsheet-view-current", "");
            }
        },

        _addViewsAnimation: function() {
            const that = this;
            if (that.views && that.views.length > 1) {
                const views = that.wrapper.find(`.k-actionsheet-view`);
                const animationProps = {
                    duration: 500,
                };

                views.addClass("k-actionsheet-view-animated").css({
                    transitionProperty: "transform",
                    transitionDuration: `${animationProps.duration}ms`,
                });
            }
        },

        _hasViews: function() {
            return this.options.views && this.options.views.length;
        },

        setOptions: function(options) {
            const that = this;
            Widget.fn.setOptions.call(that, options);

            that.views.forEach(view => view.destroy());

            if (that.popup.wrapper.length) {
                that.element.unwrap().unwrap();
            }

            that.popup.destroy();
            that.popup = null;

            that._popup();

            if (options.views && options.views.length) {
                that._initMultiViews();
            } else {
                that._initView();
            }

            that._toggleViewAnimationVariable();
            that._applyAria();
        },

        _wrapper: function() {
            var that = this;
            var element = that.element;
            var wrapper;

            var positionClass = that.options.fullscreen == true ? ACTION_SHEET_FULLSCREEN : ACTION_SHEET_BOTTOM;

            element.addClass(ACTION_SHEET + " " + positionClass + (that.options.adaptive ? " " + ACTION_SHEET_ADAPTIVE : " k-actionsheet-jq"));
            that.wrapper = wrapper = element.wrap("<div class='" + ACTION_SHEET_CONTAINER + " " + HIDDEN + "'></div>").parent();
            wrapper.prepend($('<div></div>').addClass(OVERLAY));
        },

        _wrapInView: function() {
            const that = this;

            that.element.wrapInner("<div class='k-actionsheet-view'></div>");
        },

        _applyAria: function() {
            var that = this;
            var element = that.element;
            var actionsheetTitleId = that.wrapper.find(".k-actionsheet-title").attr("id");

            element.attr({
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": that.options.title ? actionsheetTitleId : null
            });
        },

        _popup: function() {
            const that = this;
            const options = that.options;

            options.open = null;
            options.close = null;
            options.activate = null;
            options.deactivate = null;

            that.popup = new Popup(that.element, extend(options.popup,
                options,
                {
                    name: "Popup",
                    isRtl: kendo.support.isRtl(options.anchor),
                    omitOriginOffsets: true,
                    appendTo: that.wrapper,
                    modal: true,
                    animation: options.adaptive ? options.animation : false,
                    position: "top center",
                    anchor: options.anchor || that.wrapper
                }));

            if (options.focusOnActivate) {
                that.popup.bind(ACTIVATE, that._openHandler.bind(that));
            }

            that.popup.bind(ACTIVATE, (ev) => {
                that.trigger(ACTIVATE, ev);
            });

            that.popup.bind(DEACTIVATE, (ev) => {
                that.wrapper.addClass(HIDDEN);
                DOCUMENT_ELEMENT.off(that.downEvent, that._mousedownProxy);
                DOCUMENT_ELEMENT.off(that.clickEvent, that._clickProxy);
                that.trigger(DEACTIVATE, ev);
            });

            that.popup.bind(OPEN, (ev) => {
                that.trigger(OPEN, ev);
            });

            that.popup.bind(CLOSE, (ev) => {
                var closeButtonPressed = that._closeButtonPressed;
                that._closeButtonPressed = false;
                that.trigger(CLOSE, extend({}, ev, {
                    closeButton: closeButtonPressed
                }));
            });
        },

        _initView: function(viewConfig) {
            const that = this;
            const options = that.options;
            const viewOptions = viewConfig || {
                headerTemplate: options.headerTemplate,
                contentTemplate: options.contentTemplate,
                footerTemplate: options.footerTemplate,
                actionButtons: options.actionButtons,
                actionButtonsAlignment: options.actionButtonsAlignment,
                actionButtonsOrientation: options.actionButtonsOrientation,
                title: options.title,
                items: options.items,
                subtitle: options.subtitle,
                startButton: options.startButton,
                closeButton: options.closeButton,
                addAnimationClass: options.views.length > 1,
                ref: options.ref,
            };

            const view = new kendo.ui.ActionSheetView(that.element, viewOptions);

            if (viewConfig && that.views) {
                that.views.push(view);

                if (view._content) {
                    if (Array.isArray(that._content)) {
                        that._content.push(view._content);
                    } else {
                        that._content = [that._content, view._content];
                    }
                }

                if (view._footer) {
                    if (Array.isArray(that._footer)) {
                        that._footer.push(view._footer);
                    } else {
                        that._footer = [that._footer, view._footer];
                    }
                }

                if (view._header) {
                    if (Array.isArray(that._header)) {
                        that._header.push(view._header);
                    } else {
                        that._header = [that._header, view._header];
                    }
                }

                return view;
            }

            that.views = [view];
            that._content = view._content;
            that._footer = view._footer;
            that._header = view._header;

            return view;
        },

        _initMultiViews: function() {
            const that = this;
            const options = that.options;
            const views = options.views;

            views.forEach((viewConfig) => {
                that._initView(viewConfig);
            });

            that._addViewsAnimation();
            that._toggleViewAnimationVariable();
        },

        destroy: function() {
            var that = this;
            that.close();
            Widget.fn.destroy.call(that);

            while (that.views.length) {
                that._removeView(that.views[0]);
            }

            that._content = null;
            that._footer = null;
            that._header = null;
            that.element.off(ns);
            that.wrapper.off(ns);
            that.popup.destroy();
        },

        open: function(options) {
            var that = this;

            that.altTarget = options && options.altTarget;

            that.wrapper.removeClass(HIDDEN);
            that._elementHeight = that._elementHeight || that.element.outerHeight();

            if (that.options.adaptive) {
                that.wrapper.width("100%");
            }

            that.popup.open("auto", 0);
            that.popup.wrapper.find(">.k-child-animation-container").css({ bottom: 0, width: "100%" });

            DOCUMENT_ELEMENT.off(that.downEvent, that._mousedownProxy)
                .on(that.downEvent, that._mousedownProxy);

            DOCUMENT_ELEMENT.off(that.clickEvent, that._clickProxy)
                .on(that.clickEvent, that._clickProxy);

            that._tabKeyTrap.trap();
        },

        visible: function() {
            return this.popup.visible();
        },

        toggle: function() {
            !this.visible() ? this.open() : this.close();
        },

        fullscreen: function(isFullScreen) {
            var that = this;

            that.element.toggleClass(ACTION_SHEET_FULLSCREEN, isFullScreen === true);
            that.element.toggleClass(ACTION_SHEET_BOTTOM, isFullScreen !== true);
            that.element.closest(".k-child-animation-container").css({ height: isFullScreen ? "100%" : "auto" });
        },

        close: function() {
            var that = this;

            that.popup.close();
        },

        position: $.noop,

        _focusFirstFocusableElement: function() {
            var that = this;
            var focusableElements = that.element.find(FOCUSABLE);
            var firstFocusableElement = focusableElements.first();

            if (firstFocusableElement.length) {
                firstFocusableElement.trigger("focus");
            }
        },

        _focusLastFocusableElement: function() {
            var that = this;
            var focusableElements = that.element.find(FOCUSABLE);
            var lastFocusableElement = focusableElements.last();

            if (lastFocusableElement.length) {
                lastFocusableElement.trigger("focus");
            }
        },

        _hasItems: function() {
            const that = this;

            return that.views.find((view) => view._hasItems);
        },

        _openHandler: function() {
            var that = this;
            const viewWithItems = that._hasItems();

            if (viewWithItems) {
                var firstItem = viewWithItems._content.find(".k-actionsheet-item")[0];
                if (firstItem) {
                    firstItem.focus();
                }
            } else {
                that._focusFirstFocusableElement();
            }
        },

        _isActionableButton: function(target) {
            return $(target).closest(ACTIONABLE_BUTTON_SELECTOR).length > 0;
        },

        _triggerAction: function(e) {
            var that = this;
            var action = $(e.target).closest(ACTIONABLE_BUTTON_SELECTOR).data("action");
            if (isFunction(action)) {
                action(e);
            }

            if (!e.isDefaultPrevented()) {
                that.close();
            }
        },

        _keydown: function(e) {
            var that = this;
            var keys = kendo.keys;
            var keyCode = e.keyCode;
            var target = $(e.target);

            if (keyCode == keys.ESC) {
                e.stopPropagation();
                that.close();
            } else if (that._isActionableButton(target) && isButtonKeyTrigger(e)) {
                that._triggerAction(e);
            } else if (e.keyCode === kendo.keys.TAB) {
                var allFocusables = this.wrapper.find(FOCUSABLE);
                var firstFocusable = allFocusables.first();
                var lastFocusable = allFocusables.last();
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable[0]) {
                        lastFocusable.trigger("focus");
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable[0]) {
                        firstFocusable.trigger("focus");
                        e.preventDefault();
                    }
                }
            }
        },

        _click: function(e) {
            var that = this;
            var target = kendo.eventTarget(e);

            if (that._isActionableButton(target)) {
                that._triggerAction(e);
            }

            if (that.options.startButton && $(target).closest("[data-ref-actionsheet-start-button]").length > 0) {
                that.options.startButton.click.call(this, e);
            }
        },

        _mousedown: function(e) {
            const that = this;
            const container = that.element[0];
            const parentContainer = that.wrapper;
            var target = kendo.eventTarget(e);
            if (that.altTarget && that.altTarget.is($(target))) {
                return;
            }

            const targetHasActionSheetContainer = $(target).closest(`.${ACTION_SHEET_CONTAINER}`);
            const preventCurrentClosing = targetHasActionSheetContainer.length > 0 && !(targetHasActionSheetContainer.is(parentContainer));

            if (!preventCurrentClosing && ((!contains(container, target) && that.options.closeOnClick) || $(target).closest(`[${kendo.attr("ref-actionsheet-close-button")}]`, $(container).find("k-actionsheet-titlebar")).length > 0)) {
                that._closeButtonPressed = true;
                that.close();
            }
        }
    });

    function isButtonKeyTrigger(e) {
        return e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR;
    }

    ui.plugin(ActionSheet);

})(window.kendo.jQuery);
export default kendo;

