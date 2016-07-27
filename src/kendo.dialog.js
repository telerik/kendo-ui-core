(function(f, define) {
    define(["./kendo.core", "./kendo.popup"], f);
})(function() {

    var __meta__ = { // jshint ignore:line
        id: "dialog",
        name: "Dialog",
        category: "web", // suite
        description: "The dialog widget is a modal popup that brings information to the user.",
        depends: ["core", "popup"] // dependencies
    };

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            proxy = $.proxy,
            template = kendo.template,
            keys = kendo.keys,
            isFunction = $.isFunction,
            NS = ".kendoWindow",
            KDIALOG = ".k-dialog",
            KWINDOW = ".k-window",
            KICONCLOSE = ".k-i-close",
            KCONTENTCLASS = "k-content",
            KCONTENT = ".k-content",
            KTITLELESS = "k-dialog-titleless",
            KDIALOGTITLE = ".k-dialog-title",
            KDIALOGTITLEBAR = ".k-window-titlebar",
            KBUTTONGROUP = ".k-dialog-buttongroup",
            KBUTTON = ".k-button",
            KALERT = "k-alert",
            KCONFIRM = "k-confirm",
            KPROMPT = "k-prompt",
            KTEXTBOX = ".k-textbox",
            KOVERLAY = ".k-overlay",
            VISIBLE = ":visible",
            ZINDEX = "zIndex",
            BODY = "body",
            INITOPEN = "initOpen",
            OPEN = "open",
            CLOSE = "close",
            SHOW = "show",
            HIDE = "hide",
            WIDTH = "width",
            HUNDREDPERCENT = 100,
            OK_CANCEL = {
                okText  : "OK",
                cancel : "Cancel"
            },
            ceil = Math.ceil,
            templates;

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
            },

            _init: function(element, options) {
                var that = this,
                    wrapper;

                that.appendTo = $(BODY);
                if (!defined(options.visible) || options.visible === null) {
                    options.visible = element.is(VISIBLE);
                }

                that._createDialog();
                wrapper = that.wrapper = element.closest(KDIALOG);

                that._tabindex(element);
                that._dimensions();

                if (!that.options.visible) {
                    that.wrapper.hide();
                } else if (options.modal) {
                    that.toFront();
                    that._triggerInitOpen();
                    that.trigger(OPEN);
                    that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
                }

                if (options.closable) {
                    wrapper.find(KICONCLOSE)
                        .on("click" + NS, proxy(that._closeClick, that))
                        .on("keydown" + NS, proxy(that._closeKeyHandler, that));
                    wrapper.find(KCONTENT).on("keydown" + NS, proxy(that._keydown, that));
                }
            },

            _dimensions: function() {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    width = options.width,
                    height = options.height,
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
                        wrapper.width(constrain(width, options.minWidth, options.maxWidth));
                    }
                }

                if (height) {
                    if (height.toString().indexOf("%") > 0) {
                        wrapper.height(height);
                    } else {
                        wrapper.height(constrain(height, options.minHeight, options.maxHeight));
                    }

                    this._setElementHeight();
                }
            },

            _setElementMaxHeight: function() {
                var that = this,
                    element = that.element,
                    maxHeight = that.options.maxHeight,
                    paddingBox,
                    elementMaxHeight;

                if (maxHeight != Infinity) {
                    paddingBox = that._paddingBox(element);
                    elementMaxHeight = parseFloat(maxHeight, 10) - that._uiHeight() - paddingBox.vertical;
                    if (elementMaxHeight > 0) {
                        element.css({
                            maxHeight: ceil(elementMaxHeight) + "px",
                            overflow: "hidden"
                        });
                    }
                }

            },

            _paddingBox: function(element) {
                var paddingTop = parseFloat(element.css("padding-top"), 10),
                    paddingLeft = parseFloat(element.css("padding-left"), 10),
                    paddingBottom = parseFloat(element.css("padding-bottom"), 10),
                    paddingRight = parseFloat(element.css("padding-right"), 10);

                return {
                    vertical: paddingTop + paddingBottom,
                    horizontal: paddingLeft + paddingRight
                };
            },

            _setElementHeight: function() {
                var that = this,
                    element = that.element,
                    height = that.options.height,
                    paddingBox = that._paddingBox(element),
                    elementHeight = parseFloat(height, 10) - that._uiHeight() - paddingBox.vertical;

                if (elementHeight > 0) {
                    that.element.css({
                        height: ceil(elementHeight) + "px",
                        overflow: "hidden"
                    });
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
                    overlay = $("<div class='k-overlay' />");
                }

                overlay
                    .insertBefore(wrapper[0])
                    .toggle(visible)
                    .css(ZINDEX, parseInt(wrapper.css(ZINDEX), 10) - 1);

                return overlay;
            },

            _closeClick: function() {
                this.close();
            },

            _closeKeyHandler: function(e) {
                if (buttonKeyTrigger(e) || e.keyCode == keys.ESC) {
                    this.close();
                }
            },

            _keydown: function(e) {
                var that = this,
                    options = that.options,
                    keyCode = e.keyCode;

                if (keyCode == keys.ESC && !that._closing && options.closable) {
                    that.close();
                }
            },

            _createDialog: function() {
                var that = this,
                    content = that.element,
                    options = that.options,
                    titlebar = $(templates.titlebar(options)),
                    wrapper = $(templates.wrapper(options));

                content.addClass(KCONTENTCLASS);
                that.appendTo.append(wrapper);

                if (options.closable !== false) {
                    wrapper.append(templates.close(options));
                }

                if (options.title !== false) {
                    wrapper.append(titlebar);
                } else {
                    wrapper.addClass(KTITLELESS);
                }

                wrapper.append(content);

                if (options.content) {
                    kendo.destroy(content.children());
                    content.html(options.content);
                }

                if (options.actions.length) {
                    that._createActionbar(wrapper);
                }

                wrapper = content = null;
            },

            _createActionbar: function(wrapper) {
                var actionbar = $(templates.actionbar);
                this._addButtons(actionbar);
                this._normalizeButtonSize(actionbar);
                wrapper.append(actionbar);
            },

            _addButtons: function(actionbar) {
                var that = this,
                    actionClick = proxy(that._actionClick, that),
                    actionKeyHandler = proxy(that._actionKeyHandler, that),
                    actions = that.options.actions,
                    length = actions.length,
                    buttonSize = HUNDREDPERCENT / length,
                    action,
                    text;

                for (var i = 0; i < length; i++) {
                    action = actions[i];
                    text = that._mergeTextWithOptions(action);
                    $(templates.action(action))
                        .html(text)
                        .css(WIDTH, buttonSize + "%")
                        .appendTo(actionbar)
                        .data("action", action.action)
                        .on("click", actionClick)
                        .on("keydown", actionKeyHandler);
                }
            },

            _mergeTextWithOptions : function(action) {
                var text = action.text;
                return text ? template(text)(this.options) : "";
            },

            _normalizeButtonSize: function(actionbar) {
                var that = this,
                    options = that.options,
                    lastButton = actionbar.children(KBUTTON + ":last"),
                    currentSize = parseFloat(lastButton[0].style[WIDTH]),
                    difference = HUNDREDPERCENT - (options.actions.length * currentSize);

                if (difference > 0) {
                    lastButton.css(WIDTH, (currentSize + difference) + "%");
                }
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
                this._runActionBtn(e.currentTarget);
            },

            _actionKeyHandler: function(e) {
                if (buttonKeyTrigger(e)) {
                    this._runActionBtn(e.currentTarget);
                } else if (e.keyCode == keys.ESC) {
                    this.close();
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
                    that.close();
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
                        complete: proxy(that._openAnimationEnd, that)
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

                that._center();

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

            close: function() {
                this._close(true);
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
                        complete: proxy(this._closeAnimationEnd, this)
                    });
                }

                return that;
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

            _removeOverlay: function() {
                var modals = this._modals();
                var options = this.options;
                var hideOverlay = options.modal && !modals.length;

                if (hideOverlay) {
                    this._overlay(false).remove();
                } else if (modals.length) {
                    this._object(modals.last())._overlay(true);
                }
            },

            _closeAnimationEnd: function() {
                var that = this;
                that.wrapper.hide().css("opacity", "");
                that.trigger(HIDE);

                if (that.options.modal) {
                    var lastModal = that._object(that._modals().last());
                    if (lastModal) {
                        lastModal.toFront();
                    }
                }
            },

            _modals: function() {
                var that = this;

                var zStack = $(KWINDOW).filter(function() {
                    var dom = $(this);
                    var object = that._object(dom);
                    var options = object && object.options;

                    return options && options.modal && options.visible && dom.is(VISIBLE);
                }).sort(function(a, b) {
                    return +$(a).css("zIndex") - +$(b).css("zIndex");
                });

                that = null;

                return zStack;
            },

            _object: function(element) {
                var content = element.children(KCONTENT);
                var widget = kendo.widgetInstance(content);

                if (widget) {
                    return widget;
                }

                return undefined;
            },

            destroy: function() {
                var that = this;
                that._destroy();
                that.wrapper.remove();
                that.wrapper = that.element = $();
            },

            _destroy: function() {
                var that = this;
                that.element.off(NS);
                that.wrapper.find(KICONCLOSE + "," + KBUTTONGROUP + " > " + KBUTTON).off(NS);
                Widget.fn.destroy.call(that);
            },

            title: function(html) {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    titlebar = wrapper.children(KDIALOGTITLEBAR),
                    title = titlebar.children(KDIALOGTITLE);

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
                    title.html(html);
                }

                that.options.title = html;

                return that;
            },

            content: function(html) {
                var that = this,
                    content = that.wrapper.children(KCONTENT);

                if (!defined(html)) {
                    return content.html();
                }

                kendo.destroy(content.children());
                content.html(html);

                that.options.content = html;

                return that;
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
                actions: [],
                modal: true,
                width: null,
                height: null,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Infinity,
                maxHeight: Infinity,
                content: null,
                visible: null,
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
                DialogBase.fn._init.call(that, element, options);
                that.bind(HIDE, proxy(that.destroy, that));
            },

            options: {
                title: window.location.host,
                closable: false,
                messages: OK_CANCEL
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
                actions: [{
                    text: "#= messages.okText #"
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
                actions: [{
                    text: "#= messages.okText #",
                    primary: true,
                    action: function(e) {
                        e.sender.result.resolve();
                    }
                    }, {
                    text: "#= messages.cancel #",
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
                    promptContainer = $(templates.prompt).insertAfter(this.element);

                if (value) {
                    promptContainer.children(KTEXTBOX).val(value);
                }
            },

            options: {
                name: "Prompt",
                value: "",
                actions: [{
                    text: "#= messages.okText #",
                    primary: true,
                    action: function(e) {
                        var sender = e.sender,
                            value = sender.wrapper.find(KTEXTBOX).val();

                        sender.result.resolve(value);
                    }
                }, {
                    text: "#= messages.cancel #",
                    action: function(e) {
                        var sender = e.sender,
                            value = sender.wrapper.find(KTEXTBOX).val();

                        e.sender.result.reject(value);
                    }
                }]
            }
        });

        kendo.ui.plugin(Prompt);

        var kendoPrompt = function(text, value) {
            var promptDialog = $(templates.promptElement).kendoPrompt({
                content: text,
                value: value
            }).data("kendoPrompt").open();

            return promptDialog.result;
        };

        templates = {
            wrapper: template("<div class='k-widget k-dialog k-window' role='dialog' />"),
            action: template("<li class='k-button# if (data.primary) { # k-primary# } #' role='button'></li>"),
            titlebar: template(
                "<div class='k-window-titlebar k-header'>" +
                    "<span class='k-dialog-title'>#= title #</span>" +
                "</div>"
            ),
            close: template("<span class='k-i-close' role='button'>#= messages.close #</span>"),
            actionbar: "<ul class='k-dialog-buttongroup' role='toolbar' />",
            overlay: "<div class='k-overlay' />",
            alert: "<div style='display: none;' />",
            confirm: "<div style='display: none;' />",
            promptElement: "<div style='display: none;' />",
            prompt: "<div class='k-prompt-container'><input type='text' class='k-textbox' /></div>"
        };

        kendo.alert = kendoAlert;
        kendo.confirm = kendoConfirm;
        kendo.prompt = kendoPrompt;

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) { (a3 || a2)(); });
