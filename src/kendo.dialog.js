import "./kendo.core.js";
import "./kendo.popup.js";
import "./kendo.textbox.js";
import "./kendo.icons.js";

    var __meta__ = {
        id: "dialog",
        name: "Dialog",
        category: "web", // suite
        description: "The dialog widget is a modal popup that brings information to the user.",
        depends: ["core", "popup", "textbox", "icons"] // dependencies
    };

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            TabKeyTrap = kendo.ui.Popup.TabKeyTrap,
            template = kendo.template,
            keys = kendo.keys,
            isFunction = kendo.isFunction,
            encode = kendo.htmlEncode,
            NS = "kendoWindow",
            KDIALOG = ".k-dialog",
            KWINDOW = ".k-window",
            KICONCLOSE = ".k-dialog-close",
            KCONTENTCLASS = "k-window-content k-dialog-content",
            KCONTENTSELECTOR = ".k-window-content",
            KSCROLL = "k-scroll",
            KTITLELESS = "k-dialog-titleless",
            KDIALOGTITLE = ".k-dialog-title",
            KDIALOGTITLEBAR = ".k-dialog-titlebar",
            KBUTTONGROUP = ".k-dialog-actions",
            // KACTIONS = ".k-actions",
            KBUTTON = ".k-button",
            KALERT = "k-alert",
            KCONFIRM = "k-confirm",
            KPROMPT = "k-prompt",
            KTEXTBOX = ".k-input-inner",
            KOVERLAY = ".k-overlay",
            VISIBLE = ":visible",
            ZINDEX = "zIndex",
            BODY = "body",
            INITOPEN = "initOpen",
            TOUCHSTART = "touchstart",
            TOUCHMOVE = "touchmove",
            OPEN = "open",
            CLOSE = "close",
            SHOW = "show",
            HIDE = "hide",
            SIZE = {
                small: "k-window-sm",
                medium: "k-window-md",
                large: "k-window-lg"
            },
            HIDDEN = "hidden",
            OVERFLOW = "overflow",
            DATADOCOVERFLOWRULE = "original-overflow-rule",
            DATAHTMLTAPYRULE = "tap-y",
            messages = {
                okText: "OK",
                cancel: "Cancel",
                promptInput: "Input"
            },
            ceil = Math.ceil,
            templates,
            overlaySelector = ":not(link,meta,script,style)";

        function defined(x) {
            return (typeof x != "undefined");
        }

        function constrain(value, low, high) {
            return Math.max(Math.min(parseInt(value, 10), high === Infinity ? high : parseInt(high, 10)), parseInt(low, 10));
        }

        function buttonKeyTrigger(e) {
            return e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR;
        }

        var DialogBase = Widget.extend({
            init: function(element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);
                that._init(that.element, that.options);
                kendo.notify(that);
                if (that._showWatermarkOverlay) {
                    that._showWatermarkOverlay(that.wrapper[0]);
                }
            },

            _init: function(element, options) {
                var that = this,
                    wrapper;

                that._centerCallback = that._center.bind(that);

                that.appendTo = $(BODY);
                if (!defined(options.visible) || options.visible === null) {
                    options.visible = element.is(VISIBLE);
                }

                if (that.wrapperTemplate === undefined) {
                    that.wrapperTemplate = templates.wrapper;
                }

                that._createDialog();
                wrapper = that.wrapper = element.closest(KDIALOG);

                if (options._defaultFocus === undefined) {
                    that._defaultFocus = element[0];
                }

                that._tabindex(element);
                that._dimensions();

                this._tabKeyTrap = new TabKeyTrap(wrapper);

                if (!that.options.visible) {
                    that.wrapper.hide();
                } else {
                    that._triggerOpen();
                }
            },

            setOptions: function(options) {
                var that = this;
                var sizeClass = that.options.size;
                that.wrapper.removeClass(kendo.getValidCssClass("k-dialog-", "themeColor", that.options.themeColor));

                options = $.extend(that.options, options);

                Widget.fn.setOptions.call(that, options);

                if (options.title !== undefined) {
                    that.title(options.title);
                }

                if (options.content) {
                    kendo.destroy(that.element.children());
                    that.element.html(options.content);
                }

                if (options.actions) {
                    that.wrapper.children(KBUTTONGROUP).remove();
                    that._createActionbar(that.wrapper);
                }

                that.wrapper.show();
                that._closable(that.wrapper);

                that.wrapper.removeClass(SIZE[sizeClass]);
                that._dimensions();

                if (!options.visible) {
                    that.wrapper.hide();
                } else {
                    that._triggerOpen();
                }

                if (options.themeColor && options.themeColor !== "none") {
                    that.wrapper.addClass(kendo.getValidCssClass("k-dialog-", "themeColor", that.options.themeColor));
                }

                if (typeof options.modal !== "undefined") {
                    var visible = that.options.visible !== false;
                    that._enableDocumentScrolling();
                    that._overlay(options.modal && visible);
                }
            },

            _dimensions: function() {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    width = options.width,
                    height = options.height,
                    sizeClass = options.size,
                    dimensions = ["minWidth", "minHeight", "maxWidth", "maxHeight"];

                for (var i = 0; i < dimensions.length; i++) {
                    var value = options[dimensions[i]];
                    if (value && value != Infinity) {
                        wrapper.css(dimensions[i], value);
                    }
                }

                this._setElementMaxHeight();

                if (width) {
                    if (width.toString().indexOf("%") > 0) {
                        wrapper.width(width);
                    } else {
                        wrapper.outerWidth(constrain(width, options.minWidth, options.maxWidth));
                    }
                }

                if (height) {
                    if (height.toString().indexOf("%") > 0) {
                        wrapper.height(height);
                    } else {
                        wrapper.outerHeight(constrain(height, options.minHeight, options.maxHeight));
                    }

                    this._setElementHeight();
                }

                if (sizeClass && SIZE[sizeClass]) {
                    wrapper.addClass(SIZE[sizeClass]);
                }
            },

            _setElementMaxHeight: function() {
                var that = this,
                    element = that.element,
                    maxHeight = that.options.maxHeight,
                    elementMaxHeight;

                if (maxHeight != Infinity) {
                    elementMaxHeight = parseFloat(maxHeight, 10) - that._uiHeight();
                    if (elementMaxHeight > 0) {
                        element.css({
                            maxHeight: ceil(elementMaxHeight) + "px"
                        });
                    }
                }

            },

            _setElementHeight: function() {
                var that = this,
                    element = that.element,
                    height = that.wrapper.outerHeight(true),
                    elementHeight = parseFloat(height, 10) - that._uiHeight();

                if (elementHeight < 0) {
                    elementHeight = 0;
                }

                element.css({
                    height: ceil(elementHeight) + "px"
                });

                this._applyScrollClassName(element);

            },

            _applyScrollClassName: function(element) {
                    var hasScroll = element.get(0).scrollHeight > element.outerHeight();

                    if (hasScroll) {
                        element.addClass(KSCROLL);
                    } else {
                        element.removeClass(KSCROLL);
                    }
            },

            _uiHeight: function() {
                var that = this,
                    wrapper = that.wrapper,
                    actionbar = wrapper.children(KBUTTONGROUP),
                    actionbarHeight = actionbar[0] && actionbar[0].offsetHeight || 0,
                    titlebar = wrapper.children(KDIALOGTITLEBAR),
                    titlebarHeight = titlebar[0] && titlebar[0].offsetHeight || 0;

                return actionbarHeight + titlebarHeight;
            },

            _overlay: function(visible) {
                var overlay = this.appendTo.children(KOVERLAY),
                    wrapper = this.wrapper;


                if (!overlay.length) {
                    overlay = $(templates.overlay);
                }

                overlay
                    .insertBefore(wrapper[0])
                    .toggle(visible)
                    .css(ZINDEX, parseInt(wrapper.css(ZINDEX), 10) - 1);

                if (visible) {
                    this._waiAriaOverlay();
                }
                else {
                    this._removeWaiAriaOverlay();
                }

                if (this.options.modal.preventScroll) {
                    this._stopDocumentScrolling();
                }

                return overlay;
            },

            _waiAriaOverlay: function() {
                var node = this.wrapper;

                this._overlayedNodes = node.prevAll(overlaySelector).add(node.nextAll(overlaySelector))
                    .each(function() {
                        var jthis = $(this);
                        jthis.data("ariaHidden", jthis.attr("aria-hidden"));
                        jthis.attr("aria-hidden", "true");
                    });
            },

            _removeWaiAriaOverlay: function() {
                return this._overlayedNodes && this._overlayedNodes.each(function() {
                    var node = $(this);
                    var hiddenValue = node.data("ariaHidden");
                    if (hiddenValue) {
                        node.attr("aria-hidden", hiddenValue);
                    }
                    else {
                        node.removeAttr("aria-hidden");
                    }
                });
            },

            _closeClick: function(e) {
                e.preventDefault();
                this.close(false);
            },

            _closeKeyHandler: function(e) {
                if (buttonKeyTrigger(e) || e.keyCode == keys.ESC) {
                    this.close(false);
                }
            },

            _keydown: function(e) {
                var that = this,
                    options = that.options,
                    keyCode = e.keyCode;

                if (keyCode == keys.ESC && !that._closing && options.closable) {
                    that.close(false);
                }
            },

            _createDialog: function() {
                var that = this,
                    content = that.element,
                    options = that.options,
                    isRtl = kendo.support.isRtl(content),
                    titlebar = $(templates.titlebar(options)),
                    titleId = (content.id || kendo.guid()) + "_title",
                    wrapper = $(that.wrapperTemplate(options));

                wrapper.toggleClass("k-rtl", isRtl);

                content.addClass(KCONTENTCLASS);
                that.appendTo.append(wrapper);

                if (options.title !== false) {
                    wrapper.append(titlebar);
                    titlebar.attr("id", titleId);
                    wrapper.attr("aria-labelledby", titleId);
                } else {
                    wrapper.addClass(KTITLELESS);
                }

                that._closable(wrapper);

                wrapper.append(content);
                if (options.themeColor && options.themeColor !== "none") {
                    wrapper.addClass(wrapper.addClass(kendo.getValidCssClass("k-dialog-", "themeColor", options.themeColor)));
                }

                if (options.content) {
                    kendo.destroy(content.children());
                    content.html(options.content);
                }

                if (options.actions.length) {
                    that._createActionbar(wrapper);
                }
            },

            _closable: function(wrapper) {
                var that = this;
                var options = that.options;
                var titlebar = wrapper.children(KDIALOGTITLEBAR);
                var titlebarActions = titlebar.find(".k-window-titlebar-actions");
                var closeAction = titlebarActions.length ? titlebarActions.find(".k-dialog-close") : wrapper.find(".k-dialog-close");

                closeAction.remove();

                if (options.closable !== false) {
                    if (options.title !== false && titlebarActions.length) {
                        titlebarActions.append(templates.close(options));
                    }
                    else {
                        wrapper.prepend(templates.close(options));
                    }

                    wrapper.autoApplyNS(NS);
                    that.element.autoApplyNS(NS);

                    wrapper.find(KICONCLOSE)
                        .on("click", that._closeClick.bind(that))
                        .on("keydown", that._closeKeyHandler.bind(that));

                    that.element.on("keydown", that._keydown.bind(that));
                }
            },

            _createActionbar: function(wrapper) {
                var isStretchedLayout = (this.options.buttonLayout === "stretched");
                var buttonLayout = isStretchedLayout ? "stretch" : "end";
                var actionbar = $(templates.actionbar({ buttonLayout: buttonLayout }));

                this._addButtons(actionbar);
                wrapper.append(actionbar);
            },

            _addButtons: function(actionbar) {
                var that = this,
                    actionClick = that._actionClick.bind(that),
                    actionKeyHandler = that._actionKeyHandler.bind(that),
                    actions = that.options.actions,
                    length = actions.length,
                    action,
                    text;

                for (var i = 0; i < length; i++) {
                    action = actions[i];
                    text = that._mergeTextWithOptions(action);

                    $(templates.action(action))
                        .autoApplyNS(NS)
                        .html(text)
                        .appendTo(actionbar)
                        .addClass(action.cssClass)
                        .data("action", action.action)
                        .on("click", actionClick)
                        .on("keydown", actionKeyHandler);
                }
            },

            _mergeTextWithOptions: function(action) {
                var text = action.text;

                if (isFunction(text)) {
                    return text(this.options);
                }

                return text ? text : "";
            },

            _tabindex: function(target) {
                var that = this;
                var wrapper = that.wrapper;
                var closeBtn = wrapper.find(KICONCLOSE);
                var actionButtons = wrapper.find(KBUTTONGROUP + " " + KBUTTON);

                Widget.fn._tabindex.call(this, target);

                var tabIndex = target.attr("tabindex");

                closeBtn.attr("tabIndex", tabIndex);
                actionButtons.attr("tabIndex", tabIndex);
            },

            _actionClick: function(e) {
                if (this.wrapper.is(VISIBLE)) {
                    this._runActionBtn(e.currentTarget);
                }
            },

            _actionKeyHandler: function(e) {
                if (buttonKeyTrigger(e)) {
                    e.preventDefault();
                    this._runActionBtn(e.currentTarget);
                } else if (e.keyCode == keys.ESC) {
                    this.close(false);
                }
            },

            _runActionBtn: function(target) {
                var that = this;
                if (that._closing) {
                    return;
                }

                var action = $(target).data("action"),
                    preventClose = (isFunction(action) && action({ sender: that }) === false);

                if (!preventClose) {
                    that.close(false);
                }
            },

            _triggerOpen: function() {
                var that = this;
                var options = that.options;
                var wrapper = that.wrapper;

                that.toFront();
                that._triggerInitOpen();
                that.trigger(OPEN);
                if (options.modal) {
                    that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
                    that._focusDialog();
                }
            },

            open: function() {
                var that = this,
                    wrapper = that.wrapper,
                    showOptions = this._animationOptions(OPEN),
                    options = that.options,
                    overlay, otherModalsVisible;

                this._triggerInitOpen();

                if (!that.trigger(OPEN)) {
                    if (that._closing) {
                        wrapper.kendoStop(true, true);
                    }

                    that._closing = false;

                    that.toFront();
                    options.visible = true;
                    if (options.modal) {
                        otherModalsVisible = !!that._modals().length;
                        overlay = that._overlay(otherModalsVisible);

                        overlay.kendoStop(true, true);

                        if (showOptions.duration && kendo.effects.Fade && !otherModalsVisible) {
                            var overlayFx = kendo.fx(overlay).fadeIn();
                            overlayFx.duration(showOptions.duration || 0);
                            overlayFx.endValue(0.5);
                            overlayFx.play();
                        } else {
                            overlay.css("opacity", 0.5);
                        }

                        overlay.show();
                    }

                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: that._openAnimationEnd.bind(that)
                    });
                    wrapper.show();

                }

                return that;
            },

            _animationOptions: function(id) {
                var animation = this.options.animation;
                var basicAnimation = {
                    open: { effects: {} },
                    close: { hide: true, effects: {} }
                };

                return animation && animation[id] || basicAnimation[id];
            },

            _openAnimationEnd: function() {
                if (this.options.modal) {
                    this._focusDialog();
                }
                this.trigger(SHOW);
            },

            _triggerInitOpen: function() {
                if (!defined(this._initOpenTriggered)) {
                    this._initOpenTriggered = true;
                    this.trigger(INITOPEN);
                }
            },

            toFront: function() {
                var that = this,
                    wrapper = that.wrapper,
                    zIndex = +wrapper.css(ZINDEX),
                    originalZIndex = zIndex;

                that.center();

                $(KWINDOW).each(function(i, element) {
                    var windowObject = $(element),
                        zIndexNew = windowObject.css(ZINDEX);

                    if (!isNaN(zIndexNew)) {
                        zIndex = Math.max(+zIndexNew, zIndex);
                    }
                });

                if (!wrapper[0].style.zIndex || originalZIndex < zIndex) {
                    wrapper.css(ZINDEX, zIndex + 2);
                }

                that.element.find("> .k-overlay").remove();
                wrapper = null;

                return that;
            },

            close: function(systemTriggered) {
                if (!arguments.length) {
                    systemTriggered = true;
                }

                this._close(systemTriggered);
                this._stopCenterOnResize();
                return this;
            },

            _close: function(systemTriggered) {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    showOptions = this._animationOptions("open"),
                    hideOptions = this._animationOptions("close");

                if (wrapper.is(VISIBLE) && !that.trigger(CLOSE, { userTriggered: !systemTriggered })) {
                    if (that._closing) {
                        return;
                    }
                    that._closing = true;

                    options.visible = false;
                    this._removeOverlay();

                    wrapper.kendoStop().kendoAnimate({
                        effects: hideOptions.effects || showOptions.effects,
                        reverse: hideOptions.reverse === true,
                        duration: hideOptions.duration,
                        complete: this._closeAnimationEnd.bind(this)
                    });
                }

                return that;
            },

            center: function() {
                this._center();
                this._centerOnResize();
            },

            _center: function() {
                var that = this,
                    wrapper = that.wrapper,
                    documentWindow = $(window),
                    scrollTop = 0,
                    scrollLeft = 0,
                    newLeft = scrollLeft + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                    newTop = scrollTop + Math.max(0, (documentWindow.height() - wrapper.height() - parseInt(wrapper.css("paddingTop"), 10)) / 2);

                wrapper.css({
                    left: newLeft,
                    top: newTop
                });

                return that;
            },

            _centerOnResize: function() {
                if (this._trackResize) {
                    return;
                }

                kendo.onResize(this._centerCallback);
                this._trackResize = true;
            },

            _stopCenterOnResize: function() {
                kendo.unbindResize(this._centerCallback);
                this._trackResize = false;
            },

            _removeOverlay: function() {
                var modals = this._modals();
                var options = this.options;
                var hideOverlay = options.modal && !modals.length;

                if (hideOverlay) {
                    this._overlay(false).remove();

                    if (options.modal.preventScroll) {
                        this._enableDocumentScrolling();
                    }
                } else if (modals.length) {
                    this._object(modals.last())._overlay(true);

                    if (options.modal.preventScroll) {
                        this._stopDocumentScrolling();
                    }
                }
            },

            _stopDocumentScrolling: function() {
                var that = this;

                var $body = $("body");
                that._storeOverflowRule($body);
                $body.css(OVERFLOW, HIDDEN);

                var $html = $("html");
                var html = $html[0];
                that._storeOverflowRule($html);
                $html.css(OVERFLOW, HIDDEN);

                // prevent touch due to bug in ios
                if (kendo.support.mobileOS.ios) {
                    html.addEventListener(TOUCHSTART, that._touchStart, { passive: false });
                    html.addEventListener(TOUCHMOVE, that._touchMove, { passive: false });
                }
            },

            _touchStart: function(e) {
                $(this).data(DATAHTMLTAPYRULE, e.changedTouches[0].pageY);
            },

            _touchMove: function(e) {
                var target = e.target;
                var $target = $(e.target);
                var upScroll = e.changedTouches[0].pageY - $(this).data(DATAHTMLTAPYRULE) > 0;
                var preventYScroll = $target.is(KCONTENTSELECTOR) &&
                    (upScroll && $target.scrollTop() === 0) ||
                    (!upScroll && $target.scrollTop() === target.scrollHeight - target.clientHeight);
                if (!$target.is(KCONTENTSELECTOR) || preventYScroll) {
                    e.preventDefault();
                }
            },

            _enableDocumentScrolling: function() {
                var that = this;
                var $body = $(document.body);
                var $html = $("html");
                var html = $html[0];

                that._restoreOverflowRule($body);
                that._restoreOverflowRule($html);

                if (kendo.support.mobileOS.ios) {
                    $html.removeData(DATAHTMLTAPYRULE);
                    html.removeEventListener(TOUCHSTART, that._touchStart, { passive: false });
                    html.removeEventListener(TOUCHMOVE, that._touchMove, { passive: false });
                }
            },

            _storeOverflowRule: function($element) {
                if (this._isOverflowStored($element)) {
                    return;
                }

                var overflowRule = $element.get(0).style.overflow;

                if (typeof overflowRule === "string") {
                    $element.data(DATADOCOVERFLOWRULE, overflowRule);
                }
            },

            _isOverflowStored: function($element) {
                return typeof $element.data(DATADOCOVERFLOWRULE) === "string";
            },

            _restoreOverflowRule: function($element) {
                var overflowRule = $element.data(DATADOCOVERFLOWRULE);

                if (overflowRule !== null && overflowRule !== undefined) {
                    $element.css(OVERFLOW, overflowRule);
                    $element.removeData(DATADOCOVERFLOWRULE);
                } else {
                    $element.css(OVERFLOW, "");
                }
            },

            _closeAnimationEnd: function() {
                var that = this,
                    previousFocus = that._previousFocus;

                that._closing = false;
                that.wrapper.hide().css("opacity", "");
                that.trigger(HIDE);

                if (that.options.modal) {
                    var lastModal = that._object(that._modals().last());
                    if (lastModal) {
                        lastModal.toFront();
                    } else if (previousFocus) {
                        that._previousFocus = null;

                        setTimeout(function() {
                            previousFocus.focus();
                        });
                    }
                }
            },

            _modals: function() {
                var that = this;

                var zStack = $(KWINDOW).filter(function() {
                    var modal = that._object($(this));

                    return modal &&
                        modal.options &&
                        modal.options.modal &&
                        modal.options.visible &&
                        modal.options.appendTo === that.options.appendTo &&
                        !modal.containment &&
                        $(modal.element).is(VISIBLE);
                }).sort(function(a, b) {
                    return +$(a).css("zIndex") - +$(b).css("zIndex");
                });

                that = null;

                return zStack;
            },

            _object: function(element) {
                var content = element.children(KCONTENTSELECTOR);
                var widget = kendo.widgetInstance(content);

                if (widget) {
                    return widget;
                }

                return undefined;
            },

            destroy: function() {
                var that = this;
                that._destroy();

                Widget.fn.destroy.call(that);

                kendo.destroy(that.wrapper);

                that.wrapper.remove();
                that.wrapper = that.element = $();
            },

            _destroy: function() {
                var that = this;
                var ns = "." + NS;

                that.wrapper.off(ns);
                that.element.off(ns);
                that.wrapper.find(KICONCLOSE + "," + KBUTTONGROUP + " > " + KBUTTON).off(ns);
                that._stopCenterOnResize();
            },

            title: function(html) {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    titlebar = wrapper.children(KDIALOGTITLEBAR),
                    title = titlebar.children(KDIALOGTITLE),
                    encodedHtml = encode(html);

                if (!arguments.length) {
                    return title.html();
                }

                if (html === false) {
                    titlebar.remove();
                    wrapper.addClass(KTITLELESS);
                } else {
                    if (!titlebar.length) {
                        titlebar = $(templates.titlebar(options)).prependTo(wrapper);
                        title = titlebar.children(KDIALOGTITLE);
                        wrapper.removeClass(KTITLELESS);
                    }
                    title.html(encodedHtml);
                }

                that.options.title = encodedHtml;

                return that;
            },

            content: function(html, data) {
                var that = this,
                    content = that.wrapper.children(KCONTENTSELECTOR);

                if (!defined(html)) {
                    return content.html();
                }

                kendo.destroy(content.children());
                content.html(html);

                that.options.content = html;

                return that;
            },

            _focusDialog: function() {
                var firstModal = this._object(this._modals().first());

                this._previousFocus = firstModal && firstModal._previousFocus ? firstModal._previousFocus : document.activeElement;

                if (this._defaultFocus) {
                    this._focus(this._defaultFocus);
                }
                this._tabKeyTrap.trap();
            },

            _focus: function(node) {
                if (node) {
                    node.focus();
                }
            },

            events: [
                INITOPEN,
                OPEN,
                CLOSE,
                SHOW,
                HIDE
            ],

            options: {
                title: "",
                buttonLayout: "stretched",
                themeColor: "",
                actions: [],
                modal: true,
                size: "auto",
                width: null,
                height: null,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Infinity,
                maxHeight: Infinity,
                content: null,
                visible: null,
                appendTo: BODY,
                closable: true
            }
        });

        var Dialog = DialogBase.extend({
            options: {
                name: "Dialog",
                messages: {
                    close: "Close"
                }
            }
        });

        kendo.ui.plugin(Dialog);

        var PopupBox = DialogBase.extend({
            _init: function(element, options) {
                var that = this;

                that.wrapperTemplate = templates.alertWrapper;
                options._defaultFocus = null;
                that._ensureContentId(element);

                DialogBase.fn._init.call(that, element, options);

                that.bind(HIDE, that.destroy.bind(that));

                that._ariaDescribedBy();
                that._initFocus();
            },

            _ensureContentId: function(element) {
                var node = $(element);
                if (!node.attr("id")) {
                    node.attr("id", kendo.guid() + "_k-popup");
                }
            },

            _ariaDescribedBy: function() {
                this.wrapper.attr("aria-describedby", this.element.attr("id"));
            },

            _initFocus: function() {
                var o = this.options;

                this._defaultFocus = this._chooseEntryFocus();
                if (this._defaultFocus && o.visible && o.modal) {
                    this._focusDialog();
                }
            },

            _chooseEntryFocus: function() {
                return this.wrapper.find(KBUTTONGROUP + " > " + KBUTTON)[0];
            },

            options: {
                title: window.location.host,
                closable: false,
                messages: messages
            }
        });

        var Alert = PopupBox.extend({
            _init: function(element, options) {
                var that = this;
                PopupBox.fn._init.call(that, element, options);
                that.wrapper.addClass(KALERT);
            },

            options: {
                name: "Alert",
                modal: true,
                actions: [{
                    text: ({ messages }) => `${encode(messages.okText)}`
                }]
            }
        });

        kendo.ui.plugin(Alert);

        var kendoAlert = function(text) {
            return $(templates.alert).kendoAlert({ content: text }).data("kendoAlert").open();
        };

        var Confirm = PopupBox.extend({
            _init: function(element, options) {
                var that = this;
                PopupBox.fn._init.call(that, element, options);
                that.wrapper.addClass(KCONFIRM);
                that.result = $.Deferred();
            },

            options: {
                name: "Confirm",
                modal: true,
                actions: [{
                    text: ({ messages }) => `${encode(messages.okText)}`,
                    primary: true,
                    action: function(e) {
                        e.sender.result.resolve();
                    }
                }, {
                    text: ({ messages }) => `${encode(messages.cancel)}`,
                    action: function(e) {
                        e.sender.result.reject();
                    }
                }]
            }
        });

        kendo.ui.plugin(Confirm);

        var kendoConfirm = function(text) {
            var confirmDialog = $(templates.confirm).kendoConfirm({ content: text }).data("kendoConfirm").open();
            return confirmDialog.result;
        };

        var Prompt = PopupBox.extend({
            _init: function(element, options) {
                var that = this;
                PopupBox.fn._init.call(that, element, options);
                that.wrapper.addClass(KPROMPT);
                that._createPrompt();
                that.result = $.Deferred();
            },

            _createPrompt: function() {
                var value = this.options.value,
                    promptContainer = $(templates.promptInputContainer(this.options)).insertAfter(this.element);

                this.input = new kendo.ui.TextBox(promptContainer.find("input"));

                if (value) {
                    this.input.value(value);
                }

                this._defaultFocus = this._chooseEntryFocus();
                this._focusDialog();
            },

            _chooseEntryFocus: function() {
                return this.wrapper.find(KTEXTBOX)[0];
            },

            options: {
                name: "Prompt",
                modal: true,
                value: "",
                actions: [{
                    text: ({ messages }) => `${encode(messages.okText)}`,
                    primary: true,
                    action: function(e) {
                        var sender = e.sender,
                            value = sender.input.value();

                        sender.result.resolve(value);
                    }
                }, {
                    text: ({ messages }) => `${encode(messages.cancel)}`,
                    action: function(e) {
                        var sender = e.sender,
                            value = sender.input.value();

                        e.sender.result.reject(value);
                    }
                }]
            }
        });

        kendo.ui.plugin(Prompt);

        var kendoPrompt = function(text, value) {
            var promptDialog = $(templates.prompt).kendoPrompt({
                content: text,
                value: value
            }).data("kendoPrompt").open();

            return promptDialog.result;
        };

        templates = {
            wrapper: template(() => "<div class='k-window k-dialog' role='dialog'></div>"),
            action: template((data) => `<button type='button' class='k-button k-button-md k-rounded-md k-button-solid ${data.primary ? 'k-button-solid-primary' : 'k-button-solid-base'}'></button>`),
            titlebar: template(({ title }) =>
                "<div class='k-window-titlebar k-dialog-titlebar'>" +
                    `<span class='k-window-title k-dialog-title'>${encode(title)}</span>` +
                    "<div class='k-window-titlebar-actions k-dialog-titlebar-actions k-hstack'></div>" +
                "</div>"
            ),
            close: template(({ messages }) => `<button class="k-window-titlebar-action k-dialog-titlebar-action k-button k-button-md k-button-flat k-button-flat-base k-rounded-md k-icon-button k-dialog-close" title='${encode(messages.close)}' aria-label='${encode(messages.close)}' tabindex='-1'>
                                                    ${kendo.ui.icon({ icon: "x", iconClass: "k-button-icon" })}
                                                </button>`),
            actionbar: template(({ buttonLayout }) => `<div class='k-dialog-actions k-actions k-hstack k-justify-content-${encode(buttonLayout)}'></div>`),
            overlay: "<div class='k-overlay'></div>",
            alertWrapper: template(() => "<div class='k-window k-dialog' role='alertdialog'></div>"),
            alert: "<div></div>",
            confirm: "<div></div>",
            prompt: "<div></div>",
            promptInputContainer: template(({ messages }) => `<div class='k-prompt-container'><input type='text' title='${encode(messages.promptInput)}' aria-label='${encode(messages.promptInput)}' /></div>`)
        };

        kendo.alert = kendoAlert;
        kendo.confirm = kendoConfirm;
        kendo.prompt = kendoPrompt;

    })(window.kendo.jQuery);
export default kendo;

