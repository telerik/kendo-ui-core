(function(f, define){
    define([ "./kendo.draganddrop", "./kendo.popup"], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "window",
        name: "Window",
        category: "web",
        description: "The Window widget displays content in a modal or non-modal HTML window.",
        depends: [ "draganddrop", "popup" ],
        features: [ {
            id: "window-fx",
            name: "Animation",
            description: "Support for animation",
            depends: [ "fx" ]
        } ]
    };

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            TabKeyTrap = kendo.ui.Popup.TabKeyTrap,
            Draggable = kendo.ui.Draggable,
            isPlainObject = $.isPlainObject,
            activeElement = kendo._activeElement,
            outerWidth = kendo._outerWidth,
            outerHeight = kendo._outerHeight,
            proxy = $.proxy,
            extend = $.extend,
            each = $.each,
            template = kendo.template,
            BODY = "body",
            templates,
            NS = ".kendoWindow",
            MODAL_NS = ".kendoWindowModal",
            // classNames
            KWINDOW = ".k-window",
            KWINDOWTITLE = ".k-window-title",
            KWINDOWTITLEBAR = KWINDOWTITLE + "bar",
            KWINDOWCONTENT = ".k-window-content",
            KDIALOGCONTENT = ".k-dialog-content",
            KWINDOWRESIZEHANDLES = ".k-resize-handle",
            KOVERLAY = ".k-overlay",
            KCONTENTFRAME = "k-content-frame",
            LOADING = "k-i-loading",
            KHOVERSTATE = "k-state-hover",
            KFOCUSEDSTATE = "k-state-focused",
            MAXIMIZEDSTATE = "k-window-maximized",
            // constants
            VISIBLE = ":visible",
            HIDDEN = "hidden",
            CURSOR = "cursor",
            // events
            OPEN = "open",
            ACTIVATE = "activate",
            DEACTIVATE = "deactivate",
            CLOSE = "close",
            REFRESH = "refresh",
            MINIMIZE = "minimize",
            MAXIMIZE = "maximize",
            RESIZESTART = "resizeStart",
            RESIZE = "resize",
            RESIZEEND = "resizeEnd",
            DRAGSTART = "dragstart",
            DRAGEND = "dragend",
            ERROR = "error",
            OVERFLOW = "overflow",
            DATADOCOVERFLOWRULE = "original-overflow-rule",
            ZINDEX = "zIndex",
            MINIMIZE_MAXIMIZE = ".k-window-actions .k-i-window-minimize,.k-window-actions .k-i-window-maximize",
            KPIN = ".k-i-pin",
            KUNPIN = ".k-i-unpin",
            PIN_UNPIN = KPIN + "," + KUNPIN,
            TITLEBAR_BUTTONS = ".k-window-titlebar .k-window-action",
            REFRESHICON = ".k-window-titlebar .k-i-refresh",
            WINDOWEVENTSHANDLED = "WindowEventsHandled",
            zero = /^0[a-z]*$/i,
            isLocalUrl = kendo.isLocalUrl;

        function defined(x) {
            return (typeof x != "undefined");
        }

        function constrain(value, low, high) {
            return Math.max(Math.min(parseInt(value, 10), high === Infinity ? high : parseInt(high, 10)), parseInt(low, 10));
        }

        function executableScript() {
            return !this.type || this.type.toLowerCase().indexOf("script") >= 0;
        }

        var Window = Widget.extend({
            init: function(element, options) {
                var that = this,
                    wrapper,
                    offset = {},
                    visibility, display, position,
                    isVisible = false,
                    content,
                    windowContent,
                    windowFrame,
                    globalWindow,
                    suppressActions = options && options.actions && !options.actions.length,
                    id;

                Widget.fn.init.call(that, element, options);
                options = that.options;
                position = options.position;
                element = that.element;
                content = options.content;
                globalWindow = $(window);

                if (suppressActions) {
                    options.actions = [];
                }

                that.appendTo = $(options.appendTo);

                if (content && !isPlainObject(content)) {
                    content = options.content = { url: content };
                }

                // remove script blocks to prevent double-execution
                element.find("script").filter(executableScript).remove();

                if (!element.parent().is(that.appendTo) && (position.top === undefined || position.left === undefined)) {
                    if (element.is(VISIBLE)) {
                        offset = element.offset();
                        isVisible = true;
                    } else {
                        visibility = element.css("visibility");
                        display = element.css("display");

                        element.css({ visibility: HIDDEN, display: "" });
                        offset = element.offset();
                        element.css({ visibility: visibility, display: display });
                    }

                    if (position.top === undefined) {
                        position.top = offset.top;
                    }
                    if (position.left === undefined) {
                        position.left = offset.left;
                    }
                }

                if (!defined(options.visible) || options.visible === null) {
                    options.visible = element.is(VISIBLE);
                }

                wrapper = that.wrapper = element.closest(KWINDOW);

                if (!element.is(".k-content") || !wrapper[0]) {
                    element.addClass("k-window-content k-content");
                    that._createWindow(element, options);
                    wrapper = that.wrapper = element.closest(KWINDOW);

                    that.title(that.options.title);
                    that._dimensions();
                }

                that._position();

                if (content) {
                    that.refresh(content);
                }

                if (options.visible) {
                    that.toFront();
                }

                windowContent = wrapper.children(KWINDOWCONTENT);
                that._tabindex(windowContent);

                if (options.visible && options.modal) {
                    that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
                }

                wrapper
                    .on("mouseenter" + NS, TITLEBAR_BUTTONS, proxy(that._buttonEnter, that))
                    .on("mouseleave" + NS, TITLEBAR_BUTTONS, proxy(that._buttonLeave, that))
                    .on("click" + NS, "> " + TITLEBAR_BUTTONS, proxy(that._windowActionHandler, that))
                    .on("keydown" + NS, proxy(that._keydown, that))
                    .on("focus" + NS, proxy(that._focus, that))
                    .on("blur" + NS, proxy(that._blur, that));

                windowContent
                    .on("keydown" + NS, proxy(that._keydown, that))
                    .on("focus" + NS, proxy(that._focus, that))
                    .on("blur" + NS, proxy(that._blur, that));

                windowFrame = windowContent.find("." + KCONTENTFRAME)[0];

                if(windowFrame && !globalWindow.data(WINDOWEVENTSHANDLED)){

                    globalWindow.on("blur" + NS, function(){
                        var element = $(document.activeElement).parent(KWINDOWCONTENT);
                        if (element.length) {
                            var windowInstance = kendo.widgetInstance(element);
                            windowInstance._focus();
                        }
                    });

                    globalWindow.on("focus" + NS, function(){
                        $(KWINDOWCONTENT).not(KDIALOGCONTENT).each(function(i, element){
                            kendo.widgetInstance($(element))._blur();
                        });
                    });

                    globalWindow.data(WINDOWEVENTSHANDLED, true);
                }

                this._resizable();

                this._draggable();

                if (options.pinned && this.wrapper.is(":visible")) {
                    that.pin();
                }

                id = element.attr("id");
                if (id) {
                    id = id + "_wnd_title";
                    wrapper.children(KWINDOWTITLEBAR)
                        .children(KWINDOWTITLE)
                        .attr("id", id);

                    windowContent
                        .attr({
                            "role": "dialog",
                            "aria-labelledby": id
                        });
                }

                wrapper.add(wrapper.children(".k-resize-handle," + KWINDOWTITLEBAR))
                    .on("mousedown" + NS, proxy(that.toFront, that));

                that.touchScroller = kendo.touchScroller(element);

                that._resizeHandler = proxy(that._onDocumentResize, that);

                that._marker = kendo.guid().substring(0, 8);

                $(window).on("resize" + NS + that._marker, that._resizeHandler);

                if (options.visible) {
                    that.trigger(OPEN);
                    that.trigger(ACTIVATE);
                }

                kendo.notify(that);

                if(this.options.modal) {
                    this._tabKeyTrap = new TabKeyTrap(wrapper);
                    this._tabKeyTrap.trap();
                    this._tabKeyTrap.shouldTrap = function () {
                        return windowContent.data("isFront");
                    };
                }
            },

            _buttonEnter: function(e) {
                $(e.currentTarget).addClass(KHOVERSTATE);
            },

            _buttonLeave: function(e) {
                $(e.currentTarget).removeClass(KHOVERSTATE);
            },

            _focus: function() {
                this.wrapper.addClass(KFOCUSEDSTATE);
            },

            _blur: function() {
                this.wrapper.removeClass(KFOCUSEDSTATE);
            },

            _dimensions: function() {
                var wrapper = this.wrapper;
                var options = this.options;
                var width = options.width;
                var height = options.height;
                var maxHeight = options.maxHeight;
                var dimensions = ["minWidth","minHeight","maxWidth","maxHeight"];

                for (var i = 0; i < dimensions.length; i++) {
                    var value = options[dimensions[i]] || "";
                    if (value != Infinity) {
                        wrapper.css(dimensions[i], value);
                    }
                }

                if (maxHeight != Infinity) {
                    this.element.css("maxHeight", maxHeight);
                }

                if (width) {
                    if (isNaN(width) && width.toString().indexOf("px") < 0) {
                        wrapper.width(width);
                    } else {
                        wrapper.width(constrain(width, options.minWidth, options.maxWidth));
                    }
                }
                else {
                    wrapper.width("");
                }

                if (height) {
                    if (isNaN(height) && height.toString().indexOf("px") < 0) {
                        wrapper.height(height);
                    } else {
                        wrapper.height(constrain(height, options.minHeight, options.maxHeight));
                    }
                }
                else {
                    wrapper.height("");
                }

                if (!options.visible) {
                    wrapper.hide();
                }
            },

            _position: function() {
                var wrapper = this.wrapper,
                    position = this.options.position;

                if (position.top === 0) {
                    position.top = position.top.toString();
                }

                if (position.left === 0) {
                    position.left = position.left.toString();
                }

                wrapper.css({
                    top: position.top || "",
                    left: position.left || ""
                });
            },

            _animationOptions: function(id) {
                var animation = this.options.animation;
                var basicAnimation = {
                    open: { effects: {} },
                    close: { hide: true, effects: {} }
                };

                return animation && animation[id] || basicAnimation[id];
            },

            _resize: function() {
                kendo.resize(this.element.children());
            },

            _resizable: function() {
                var resizable = this.options.resizable;
                var wrapper = this.wrapper;

                if (this.resizing) {
                    wrapper
                        .off("dblclick" + NS)
                        .children(KWINDOWRESIZEHANDLES).remove();

                    this.resizing.destroy();
                    this.resizing = null;
                }

                if (resizable) {
                    wrapper.on("dblclick" + NS, KWINDOWTITLEBAR, proxy(function(e) {
                        if (!$(e.target).closest(".k-window-action").length) {
                            this.toggleMaximization();
                        }
                    }, this));

                    each("n e s w se sw ne nw".split(" "), function(index, handler) {
                        wrapper.append(templates.resizeHandle(handler));
                    });

                    this.resizing = new WindowResizing(this);
                }

                wrapper = null;
            },

            _draggable: function() {
                var draggable = this.options.draggable;

                if (this.dragging) {
                    this.dragging.destroy();
                    this.dragging = null;
                }
                if (draggable) {
                    this.dragging = new WindowDragging(this, draggable.dragHandle || KWINDOWTITLEBAR);
                }
            },

            _actions: function() {
                var options = this.options;
                var actions = options.actions;
                var pinned = options.pinned;
                var titlebar = this.wrapper.children(KWINDOWTITLEBAR);
                var container = titlebar.find(".k-window-actions");
                var windowSpecificCommands = [ "maximize", "minimize" ];

                actions = $.map(actions, function(action) {
                    action = pinned && action.toLowerCase() === "pin" ? "unpin" : action;
                    return { name: (windowSpecificCommands.indexOf(action.toLowerCase()) > - 1) ? "window-" + action : action };
                });

                container.html(kendo.render(templates.action, actions));
            },

            setOptions: function(options) {
                // make a deep extend over options.position telerik/kendo-ui-core#844
                var cachedOptions = JSON.parse(JSON.stringify(options));
                extend(options.position, this.options.position);
                extend(options.position, cachedOptions.position);

                Widget.fn.setOptions.call(this, options);
                var scrollable = this.options.scrollable !== false;

                this.restore();

                this.title($.isPlainObject(options.title) ? options.title.text : options.title);

                this._dimensions();
                this._position();
                this._resizable();
                this._draggable();
                this._actions();
                if (typeof options.modal !== "undefined") {
                    var visible = this.options.visible !== false;

                    this._overlay(options.modal && visible);
                }

                this.element.css(OVERFLOW, scrollable ? "" : "hidden");
            },

            events:[
                OPEN,
                ACTIVATE,
                DEACTIVATE,
                CLOSE,
                MINIMIZE,
                MAXIMIZE,
                REFRESH,
                RESIZESTART,
                RESIZE,
                RESIZEEND,
                DRAGSTART,
                DRAGEND,
                ERROR
            ],

            options: {
                name: "Window",
                animation: {
                    open: {
                        effects: { zoom: { direction: "in" }, fade: { direction: "in" } },
                        duration: 350
                    },
                    close: {
                        effects: { zoom: { direction: "out", properties: { scale: 0.7 } }, fade: { direction: "out" } },
                        duration: 350,
                        hide: true
                    }
                },
                title: "",
                actions: ["Close"],
                autoFocus: true,
                modal: false,
                resizable: true,
                draggable: true,
                minWidth: 90,
                minHeight: 50,
                maxWidth: Infinity,
                maxHeight: Infinity,
                pinned: false,
                scrollable: true,
                position: {},
                content: null,
                visible: null,
                height: null,
                width: null,
                appendTo: "body",
                isMaximized: false,
                isMinimized: false
            },

            _closable: function() {
                return $.inArray("close", $.map(this.options.actions, function(x) { return x.toLowerCase(); })) > -1;
            },

            _keydown: function(e) {
                var that = this,
                    options = that.options,
                    keys = kendo.keys,
                    keyCode = e.keyCode,
                    wrapper = that.wrapper,
                    offset, handled,
                    distance = 10,
                    isMaximized = that.options.isMaximized,
                    isMinimized = that.options.isMinimized,
                    newWidth, newHeight, w, h;

                if (keyCode == keys.ESC && that._closable()) {
                    e.stopPropagation();
                    that._close(false);
                }

                if (e.target != e.currentTarget || that._closing) {
                    return;
                }

                 // Refresh
                if (e.altKey && keyCode == 82) {// Alt + R
                    that.refresh();
                }

                // Pin/Unpin
                if (e.altKey && keyCode == 80) {// Alt + P
                    if(that.options.pinned){
                        that.unpin();
                    } else {
                        that.pin();
                    }
                }

                // Maximize/Restore/Miminimize
                if(e.altKey && keyCode == keys.UP){
                    if (isMinimized) {
                        that.restore();
                        that.element.focus();
                    } else if (!isMaximized) {
                        that.maximize();
                        that.element.focus();
                    }
                } else if (e.altKey && keyCode == keys.DOWN){
                    if (!isMinimized && !isMaximized) {
                        that.minimize();
                        that.wrapper.focus();
                    } else if (isMaximized) {
                        that.restore();
                        that.element.focus();
                    }
                }

                if (options.draggable && !e.ctrlKey && !e.altKey && !isMaximized) {
                    offset = kendo.getOffset(wrapper);

                    if (keyCode == keys.UP) {
                        handled = wrapper.css("top", offset.top - distance);
                    } else if (keyCode == keys.DOWN) {
                        handled = wrapper.css("top", offset.top + distance);
                    } else if (keyCode == keys.LEFT) {
                        handled = wrapper.css("left", offset.left - distance);
                    } else if (keyCode == keys.RIGHT) {
                        handled = wrapper.css("left", offset.left + distance);
                    }
                }

                if (options.resizable && e.ctrlKey && !isMaximized && !isMinimized) {
                    if (keyCode == keys.UP) {
                        handled = true;
                        newHeight = wrapper.height() - distance;
                    } else if (keyCode == keys.DOWN) {
                        handled = true;
                        newHeight = wrapper.height() + distance;
                    } if (keyCode == keys.LEFT) {
                        handled = true;
                        newWidth = wrapper.width() - distance;
                    } else if (keyCode == keys.RIGHT) {
                        handled = true;
                        newWidth = wrapper.width() + distance;
                    }

                    if (handled) {
                        w = constrain(newWidth, options.minWidth, options.maxWidth);
                        h = constrain(newHeight, options.minHeight, options.maxHeight);

                        if (!isNaN(w)) {
                            wrapper.width(w);
                            that.options.width = w + "px";
                        }
                        if (!isNaN(h)) {
                            wrapper.height(h);
                            that.options.height = h + "px";
                        }

                        that.resize();
                    }
                }

                if (handled) {
                    e.preventDefault();
                }
            },

            _overlay: function (visible) {
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

            _actionForIcon: function(icon) {
                var iconClass = /\bk-i(-\w+)+\b/.exec(icon[0].className)[0];
                return {
                    "k-i-close": "_close",
                    "k-i-window-maximize": "maximize",
                    "k-i-window-minimize": "minimize",
                    "k-i-window-restore": "restore",
                    "k-i-refresh": "refresh",
                    "k-i-pin": "pin",
                    "k-i-unpin": "unpin"
                }[iconClass];
            },

            _windowActionHandler: function (e) {
                if (this._closing) {
                    return;
                }
                var icon = $(e.target).closest(".k-window-action").find(".k-icon");
                var action = this._actionForIcon(icon);

                if (action) {
                    e.preventDefault();
                    this[action]();
                    return false;
                }
            },

            _modals: function() {
                var that = this;

                var zStack = $(KWINDOW).filter(function() {
                    var dom = $(this);
                    var object = that._object(dom);
                    var options = object && object.options;

                    return options && options.modal && options.visible && options.appendTo === that.options.appendTo && dom.is(VISIBLE);
                }).sort(function(a, b){
                    return +$(a).css("zIndex") - +$(b).css("zIndex");
                });

                that = null;

                return zStack;
            },

            _object: function(element) {
                var content = element.children(KWINDOWCONTENT);
                var widget = kendo.widgetInstance(content);

                if (widget) {
                    return widget;
                }

                return undefined;
            },

            center: function () {
                var that = this,
                    position = that.options.position,
                    wrapper = that.wrapper,
                    documentWindow = $(window),
                    scrollTop = 0,
                    scrollLeft = 0,
                    newTop, newLeft;

                if (that.options.isMaximized) {
                    return that;
                }

                if(that.options.pinned && !that._isPinned) {
                    that.pin();
                }

                if (!that.options.pinned) {
                    scrollTop = documentWindow.scrollTop();
                    scrollLeft = documentWindow.scrollLeft();
                }

                newLeft = scrollLeft + Math.max(0, (documentWindow.width() - wrapper.width()) / 2);
                newTop = scrollTop + Math.max(0, (documentWindow.height() - wrapper.height() - parseInt(wrapper.css("paddingTop"), 10)) / 2);

                wrapper.css({
                    left: newLeft,
                    top: newTop
                });

                position.top = newTop;
                position.left = newLeft;

                return that;
            },

            title: function (title) {
                var that = this,
                    value,
                    encoded = true,
                    wrapper = that.wrapper,
                    titleBar = wrapper.children(KWINDOWTITLEBAR),
                    titleElement = titleBar.children(KWINDOWTITLE),
                    titleBarHeight;

                if (!arguments.length) {
                    return titleElement.html();
                }

                if ($.isPlainObject(title)) {
                    value = title.text;
                    encoded = title.encoded !== false;
                } else {
                    value = title;
                }

                if (value === false) {
                    wrapper.addClass("k-window-titleless");
                    titleBar.remove();
                } else {
                    if (!titleBar.length) {
                        wrapper.prepend(templates.titlebar({
                            title: encoded ? kendo.htmlEncode(value) : value
                        }));
                        that._actions();
                        titleBar = wrapper.children(KWINDOWTITLEBAR);
                    } else {
                        titleElement.html(encoded ? kendo.htmlEncode(value) : value);
                    }

                    titleBarHeight = parseInt(outerHeight(titleBar), 10);

                    wrapper.css("padding-top", titleBarHeight);
                    titleBar.css("margin-top", -titleBarHeight);
                }

                that.options.title = value;

                return that;
            },

            content: function (html, data) {
                var content = this.wrapper.children(KWINDOWCONTENT),
                    scrollContainer = content.children(".km-scroll-container");

                content = scrollContainer[0] ? scrollContainer : content;

                if (!defined(html)) {
                    return content.html();
                }

                this.angular("cleanup", function(){
                    return { elements: content.children() };
                });

                kendo.destroy(this.element.children());

                content.empty().html(html);

                this.angular("compile", function(){
                    var a = [];
                    for (var i = content.length; --i >= 0;) {
                        a.push({ dataItem: data });
                    }
                    return {
                        elements: content.children(),
                        data: a
                    };
                });

                return this;
            },

            open: function () {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    showOptions = this._animationOptions("open"),
                    contentElement = wrapper.children(KWINDOWCONTENT),
                    overlay, otherModalsVisible,
                    doc = $(document);

                if (!that.trigger(OPEN)) {
                    if (that._closing) {
                        wrapper.kendoStop(true, true);
                    }

                    that._closing = false;

                    that.toFront();

                    if (options.autoFocus) {
                        that.element.focus();
                    }

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

                        $(window).on("focus" + MODAL_NS, function() {
                            if (contentElement.data("isFront") && !$(document.activeElement).closest(contentElement).length) {
                               that.element.focus();
                            }
                        });
                    }

                    if (!wrapper.is(VISIBLE)) {
                        contentElement.css(OVERFLOW, HIDDEN);
                        wrapper.show().kendoStop().kendoAnimate({
                            effects: showOptions.effects,
                            duration: showOptions.duration,
                            complete: proxy(this._activate, this)
                        });
                    }
                }

                if (options.isMaximized) {
                    that._documentScrollTop = doc.scrollTop();
                    that._documentScrollLeft = doc.scrollLeft();
                    that._stopDocumentScrolling();
                }

                if(options.pinned && !that._isPinned){
                    that.pin();
                }

                return that;
            },

            _activate: function() {
                var scrollable = this.options.scrollable !== false;

                if (this.options.autoFocus) {
                    this.element.focus();
                }

                this.element.css(OVERFLOW, scrollable ? "" : "hidden");
                kendo.resize(this.element.children());
                this.trigger(ACTIVATE);
            },

            _removeOverlay: function(suppressAnimation) {
                var modals = this._modals();
                var options = this.options;
                var hideOverlay = options.modal && !modals.length;
                var overlay = options.modal ? this._overlay(true) : $(undefined);
                var hideOptions  = this._animationOptions("close");

                if (hideOverlay) {
                    if (!suppressAnimation && hideOptions.duration && kendo.effects.Fade) {
                        var overlayFx = kendo.fx(overlay).fadeOut();
                        overlayFx.duration(hideOptions.duration || 0);
                        overlayFx.startValue(0.5);
                        overlayFx.play();
                    } else {
                        this._overlay(false).remove();
                    }
                } else if (modals.length) {
                    this._object(modals.last())._overlay(true);
                }
            },

            _close: function(systemTriggered) {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    showOptions = this._animationOptions("open"),
                    hideOptions  = this._animationOptions("close"),
                    doc = $(document),
                    defaultPrevented;

                if (that._closing) {
                    return;
                }

                defaultPrevented = that.trigger(CLOSE, { userTriggered: !systemTriggered });
                that._closing = !defaultPrevented;

                if (wrapper.is(VISIBLE) && !defaultPrevented) {
                    options.visible = false;

                    $(KWINDOW).each(function(i, element) {
                        var contentElement = $(element).children(KWINDOWCONTENT);

                        // Remove overlay set by toFront
                        if (element != wrapper && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                            contentElement.children(KOVERLAY).remove();
                        }
                    });

                    this._removeOverlay();

                    wrapper.kendoStop().kendoAnimate({
                        effects: hideOptions.effects || showOptions.effects,
                        reverse: hideOptions.reverse === true,
                        duration: hideOptions.duration,
                        complete: proxy(this._deactivate, this)
                    });

                    $(window).off(MODAL_NS);
                }

                if (that.options.isMaximized) {
                    that._enableDocumentScrolling();
                    if (that._documentScrollTop && that._documentScrollTop > 0) {
                        doc.scrollTop(that._documentScrollTop);
                    }
                    if (that._documentScrollLeft && that._documentScrollLeft > 0) {
                        doc.scrollLeft(that._documentScrollLeft);
                    }
                }
            },

            _deactivate: function () {
                var that = this;
                that.wrapper.hide().css("opacity", "");
                that.trigger(DEACTIVATE);
                if (that.options.modal) {
                    var lastModal = that._object(that._modals().last());
                    if (lastModal) {
                        lastModal.toFront();
                    }
                }
            },

            close: function () {
                this._close(true);
                return this;
            },

            _actionable: function(element) {
                return $(element).is(TITLEBAR_BUTTONS + "," + TITLEBAR_BUTTONS + " .k-icon,:input,a");
            },

            _shouldFocus: function(target) {
                var active = activeElement(),
                    element = this.element;

                return this.options.autoFocus &&
                    !$(active).is(element) &&
                    !this._actionable(target) &&
                    (!element.find(active).length || !element.find(target).length);
            },

            toFront: function (e) {
                var that = this,
                    wrapper = that.wrapper,
                    currentWindow = wrapper[0],
                    zIndex = +wrapper.css(ZINDEX),
                    originalZIndex = zIndex,
                    target = (e && e.target) || null;

                $(KWINDOW).each(function(i, element) {
                    var windowObject = $(element),
                        zIndexNew = windowObject.css(ZINDEX),
                        contentElement = windowObject.children(KWINDOWCONTENT);

                    if (!isNaN(zIndexNew)) {
                        zIndex = Math.max(+zIndexNew, zIndex);
                    }

                    contentElement.data("isFront", element == currentWindow);
                    // Add overlay to windows with iframes and lower z-index to prevent
                    // trapping of events when resizing / dragging
                    if (element != currentWindow && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                        contentElement.append(templates.overlay);
                    }
                });

                if (!wrapper[0].style.zIndex || originalZIndex < zIndex) {
                    wrapper.css(ZINDEX, zIndex + 2);
                }
                that.element.find("> .k-overlay").remove();

                if (that._shouldFocus(target)) {
                    if (that.isMinimized()) {
                        that.wrapper.focus();
                    } else if ($(target).is(KOVERLAY)) {
                        setTimeout(function(){
                            that.element.focus();
                        });
                    } else {
                        that.element.focus();
                    }

                    var scrollTop = $(window).scrollTop(),
                        windowTop = parseInt(wrapper.position().top, 10);

                    if (!that.options.pinned && windowTop > 0 && windowTop < scrollTop) {
                        if (scrollTop > 0) {
                            $(window).scrollTop(windowTop);
                        } else {
                            wrapper.css("top", scrollTop);
                        }
                    }
                }

                wrapper = null;

                return that;
            },

            toggleMaximization: function () {
                if (this._closing) {
                    return this;
                }

                return this[this.options.isMaximized ? "restore" : "maximize"]();
            },

            restore: function () {
                var that = this;
                var options = that.options;
                var minHeight = options.minHeight;
                var restoreOptions = that.restoreOptions;
                var doc = $(document);

                if (!options.isMaximized && !options.isMinimized) {
                    return that;
                }

                if (minHeight && minHeight != Infinity) {
                    that.wrapper.css("min-height", minHeight);
                }

                that.wrapper
                    .css({
                        position: options.pinned ? "fixed" : "absolute",
                        left: restoreOptions.left,
                        top: restoreOptions.top,
                        width: restoreOptions.width,
                        height: restoreOptions.height
                    })
                    .removeClass(MAXIMIZEDSTATE)
                    .find(".k-window-content,.k-resize-handle").show().end()
                    .find(".k-window-titlebar .k-i-window-restore").parent().remove().end().end()
                    .find(MINIMIZE_MAXIMIZE).parent().show().end().end()
                    .find(PIN_UNPIN).parent().show();

                if (options.isMaximized) {
                    that.wrapper.find(".k-i-window-maximize").parent().focus();
                } else if (options.isMinimized) {
                    that.wrapper.find(".k-i-window-minimize").parent().focus();
                }

                that.options.width = restoreOptions.width;
                that.options.height = restoreOptions.height;

                that._enableDocumentScrolling();

                if (this._documentScrollTop && this._documentScrollTop > 0) {
                    doc.scrollTop(this._documentScrollTop);
                }
                if (this._documentScrollLeft && this._documentScrollLeft > 0) {
                    doc.scrollLeft(this._documentScrollLeft);
                }

                options.isMaximized = options.isMinimized = false;

                this.wrapper.removeAttr("tabindex");
                this.wrapper.removeAttr("aria-labelled-by");

                that.resize();

                return that;
            },

            _sizingAction: function(actionId, callback) {
                var that = this,
                    wrapper = that.wrapper,
                    style = wrapper[0].style,
                    options = that.options;

                if (options.isMaximized || options.isMinimized) {
                    return that;
                }

                that.restoreOptions = {
                    width: style.width,
                    height: style.height
                };

                wrapper
                    .children(KWINDOWRESIZEHANDLES).hide().end()
                    .children(KWINDOWTITLEBAR).find(MINIMIZE_MAXIMIZE).parent().hide()
                    .eq(0).before(templates.action({ name: "window-restore" }));

                callback.call(that);

                that.wrapper.children(KWINDOWTITLEBAR).find(PIN_UNPIN).parent().toggle(actionId !== "maximize");

                that.trigger(actionId);

                wrapper.find(".k-i-window-restore").parent().focus();

                return that;
            },

            maximize: function() {
                this._sizingAction("maximize", function() {
                    var that = this,
                        wrapper = that.wrapper,
                        position = wrapper.position(),
                        doc = $(document);

                    extend(that.restoreOptions, {
                        left: position.left,
                        top: position.top
                    });

                    wrapper.css({
                        left: 0,
                        top: 0,
                        position: "fixed"
                    })
                        .addClass(MAXIMIZEDSTATE);

                    this._documentScrollTop = doc.scrollTop();
                    this._documentScrollLeft = doc.scrollLeft();

                    that._stopDocumentScrolling();

                    that.options.isMaximized = true;

                    that._onDocumentResize();
                });

                return this;
            },

            _stopDocumentScrolling: function(){
                var that = this;

                var $body = $("body");
                that._storeOverflowRule($body);
                $body.css(OVERFLOW, HIDDEN);

                var $html = $("html");
                that._storeOverflowRule($html);
                $html.css(OVERFLOW, HIDDEN);
            },

            _enableDocumentScrolling: function(){
                var that = this;

                that._restoreOverflowRule($(document.body));
                that._restoreOverflowRule($("html"));
            },

            _storeOverflowRule: function($element){
                if(this._isOverflowStored($element)){
                    return;
                }

                var overflowRule = $element.get(0).style.overflow;

                if(typeof overflowRule === "string"){
                    $element.data(DATADOCOVERFLOWRULE, overflowRule);
                }
            },

            _isOverflowStored: function ($element){
                return typeof $element.data(DATADOCOVERFLOWRULE) === "string";
            },

            _restoreOverflowRule: function($element){
                var overflowRule = $element.data(DATADOCOVERFLOWRULE);

                if(overflowRule !== null && overflowRule !== undefined){
                    $element.css(OVERFLOW, overflowRule);
                    $element.removeData(DATADOCOVERFLOWRULE);
                } else {
                    $element.css(OVERFLOW, "");
                }
            },

            isMaximized: function() {
                return this.options.isMaximized;
            },

            minimize: function() {
                this._sizingAction("minimize", function() {
                    var that = this;

                    that.wrapper.css({
                        height: "",
                        minHeight: ""
                    });

                    that.element.hide();

                    that.options.isMinimized = true;
                });

                this.wrapper.attr("tabindex", 0);
                this.wrapper.attr("aria-labelled-by", this.element.attr("aria-labelled-by"));

                return this;
            },

            isMinimized: function() {
                return this.options.isMinimized;
            },

            pin: function() {
                var that = this,
                    win = $(window),
                    wrapper = that.wrapper,
                    top = parseInt(wrapper.css("top"), 10),
                    left = parseInt(wrapper.css("left"), 10);

                if (!that.options.isMaximized) {
                    wrapper.css({position: "fixed", top: top - win.scrollTop(), left: left - win.scrollLeft()});
                    wrapper.children(KWINDOWTITLEBAR).find(KPIN).addClass("k-i-unpin").removeClass("k-i-pin");

                    that._isPinned = true;
                    that.options.pinned = true;
                }
            },

            unpin: function() {
                var that = this,
                    win = $(window),
                    wrapper = that.wrapper,
                    top = parseInt(wrapper.css("top"), 10),
                    left = parseInt(wrapper.css("left"), 10);

                if (!that.options.isMaximized) {
                    wrapper.css({position: "", top: top + win.scrollTop(), left: left + win.scrollLeft()});
                    wrapper.children(KWINDOWTITLEBAR).find(KUNPIN).addClass("k-i-pin").removeClass("k-i-unpin");

                    that._isPinned = false;
                    that.options.pinned = false;
                }
            },

            _onDocumentResize: function () {
                var that = this,
                    wrapper = that.wrapper,
                    wnd = $(window),
                    zoomLevel = kendo.support.zoomLevel(),
                    w, h;

                if (!that.options.isMaximized) {
                    return;
                }

                var lrBorderWidth = parseInt(wrapper.css("border-left-width"), 10 ) +
                                        parseInt(wrapper.css("border-right-width"), 10);
                var tbBorderWidth = parseInt(wrapper.css("border-top-width"), 10 ) +
                                        parseInt(wrapper.css("border-bottom-width"), 10);

                w = wnd.width() / zoomLevel - lrBorderWidth;
                h = wnd.height() / zoomLevel - parseInt(wrapper.css("padding-top"), 10) - tbBorderWidth;

                wrapper.css({
                    width: w,
                    height: h
                });
                that.options.width = w;
                that.options.height = h;

                that.resize();
            },

            refresh: function (options) {
                var that = this,
                    initOptions = that.options,
                    element = $(that.element),
                    iframe,
                    showIframe,
                    url;

                if (!isPlainObject(options)) {
                    options = { url: options };
                }

                options = extend({}, initOptions.content, options);

                showIframe = defined(initOptions.iframe) ? initOptions.iframe : options.iframe;

                url = options.url;

                if (url) {
                    if (!defined(showIframe)) {
                        showIframe = !isLocalUrl(url);
                    }

                    if (!showIframe) {
                        // perform AJAX request
                        that._ajaxRequest(options);
                    } else {
                        iframe = element.find("." + KCONTENTFRAME)[0];

                        if (iframe) {
                            // refresh existing iframe
                            iframe.src = url || iframe.src;
                        } else {
                            // render new iframe
                            element.html(templates.contentFrame(extend({}, initOptions, { content: options })));
                        }

                        element.find("." + KCONTENTFRAME)
                            .unbind("load" + NS)
                            .on("load" + NS, proxy(this._triggerRefresh, this));
                    }
                } else {
                    if (options.template) {
                        // refresh template
                        that.content(template(options.template)({}));
                    }

                    that.trigger(REFRESH);
                }

                element.toggleClass("k-window-iframecontent", !!showIframe);

                return that;
            },

            _triggerRefresh: function() {
                this.trigger(REFRESH);
            },

            _ajaxComplete: function() {
                clearTimeout(this._loadingIconTimeout);
                this.wrapper.find(REFRESHICON).removeClass(LOADING);
            },

            _ajaxError: function (xhr, status) {
                this.trigger(ERROR, { status: status, xhr: xhr });
            },

            _ajaxSuccess: function (contentTemplate) {
                return function (data) {
                    var html = data;
                    if (contentTemplate) {
                        html = template(contentTemplate)(data || {});
                    }

                    this.content(html, data);
                    this.element.prop("scrollTop", 0);

                    this.trigger(REFRESH);
                };
            },

            _showLoading: function() {
                this.wrapper.find(REFRESHICON).addClass(LOADING);
            },

            _ajaxRequest: function (options) {
                this._loadingIconTimeout = setTimeout(proxy(this._showLoading, this), 100);

                $.ajax(extend({
                    type: "GET",
                    dataType: "html",
                    cache: false,
                    error: proxy(this._ajaxError, this),
                    complete: proxy(this._ajaxComplete, this),
                    success: proxy(this._ajaxSuccess(options.template), this)
                }, options));
            },

            _destroy: function() {
                if (this.resizing) {
                    this.resizing.destroy();
                }

                if (this.dragging) {
                    this.dragging.destroy();
                }

                this.wrapper.off(NS)
                    .children(KWINDOWCONTENT).off(NS).end()
                    .find(".k-resize-handle,.k-window-titlebar").off(NS);

                $(window).off("resize" + NS + this._marker);
                $(window).off(MODAL_NS);
                $(window).off(NS);

                clearTimeout(this._loadingIconTimeout);

                Widget.fn.destroy.call(this);

                this.unbind(undefined);

                kendo.destroy(this.wrapper);

                this._removeOverlay(true);
            },

            destroy: function() {
                this._destroy();

                this.wrapper.empty().remove();

                this.wrapper = this.appendTo = this.element = $();
            },

            _createWindow: function() {
                var contentHtml = this.element,
                    options = this.options,
                    iframeSrcAttributes,
                    wrapper,
                    isRtl = kendo.support.isRtl(contentHtml);

                if (options.scrollable === false) {
                    contentHtml.css("overflow", "hidden");
                }

                wrapper = $(templates.wrapper(options));

                // Collect the src attributes of all iframes and then set them to empty string.
                // This seems to fix this IE9 "feature": http://msdn.microsoft.com/en-us/library/gg622929%28v=VS.85%29.aspx?ppud=4
                iframeSrcAttributes = contentHtml.find("iframe:not(.k-content)").map(function() {
                    var src = this.getAttribute("src");
                    this.src = "";
                    return src;
                });

                // Make sure the wrapper is appended to the body only once. IE9+ will throw exceptions if you move iframes in DOM
                wrapper
                    .toggleClass("k-rtl", isRtl)
                    .appendTo(this.appendTo)
                    .append(contentHtml)
                    .find("iframe:not(.k-content)").each(function(index) {
                    // Restore the src attribute of the iframes when they are part of the live DOM tree
                    this.src = iframeSrcAttributes[index];
                });

                wrapper.find(".k-window-title")
                    .css(isRtl ? "left" : "right", outerWidth(wrapper.find(".k-window-actions")) + 10);

                contentHtml.css("visibility", "").show();

                contentHtml.find("[data-role=editor]").each(function() {
                    var editor = $(this).data("kendoEditor");

                    if (editor) {
                        editor.refresh();
                    }
                });

                wrapper = contentHtml = null;
            }
        });

        templates = {
            wrapper: template("<div class='k-widget k-window' />"),
            action: template(
                "<a role='button' href='\\#' class='k-button k-bare k-button-icon k-window-action' aria-label='#= name #'>" +
                "<span class='k-icon k-i-#= name.toLowerCase() #'></span>" +
                "</a>"
            ),
            titlebar: template(
                "<div class='k-window-titlebar k-header'>" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions' />" +
                "</div>"
            ),
            overlay: "<div class='k-overlay' />",
            contentFrame: template(
                "<iframe frameborder='0' title='#= title #' class='" + KCONTENTFRAME + "' " +
                "src='#= content.url #'>" +
                "This page requires frames in order to show content" +
                "</iframe>"
            ),
            resizeHandle: template("<div class='k-resize-handle k-resize-#= data #'></div>")
        };


        function WindowResizing(wnd) {
            var that = this;
            that.owner = wnd;
            that._preventDragging = false;
            that._draggable = new Draggable(wnd.wrapper, {
                filter: ">" + KWINDOWRESIZEHANDLES,
                group: wnd.wrapper.id + "-resizing",
                dragstart: proxy(that.dragstart, that),
                drag: proxy(that.drag, that),
                dragend: proxy(that.dragend, that)
            });

            that._draggable.userEvents.bind("press", proxy(that.addOverlay, that));
            that._draggable.userEvents.bind("release", proxy(that.removeOverlay, that));
        }

        function getPosition(elem) {
            var result = {top: elem.offsetTop, left: elem.offsetLeft},
                parent = elem.offsetParent;

            while (parent) {
                result.top += parent.offsetTop;
                result.left += parent.offsetLeft;

                var parentOverflowX = $(parent).css("overflowX");
                var parentOverflowY = $(parent).css("overflowY");

                if (parentOverflowY === "auto" || parentOverflowY === "scroll") {
                    result.top -= parent.scrollTop;
                }

                if (parentOverflowX === "auto" || parentOverflowX === "scroll") {
                    result.left -= parent.scrollLeft;
                }

                parent = parent.offsetParent;
            }

            return result;
		}

        WindowResizing.prototype = {
            addOverlay: function () {
                this.owner.wrapper.append(templates.overlay);
            },
            removeOverlay: function () {
                this.owner.wrapper.find(KOVERLAY).remove();
            },
            dragstart: function (e) {
                var that = this;
                var wnd = that.owner;
                var wrapper = wnd.wrapper;

                that._preventDragging = wnd.trigger(RESIZESTART);
                if (that._preventDragging) {
                    return;
                }

                that.elementPadding = parseInt(wrapper.css("padding-top"), 10);
                that.initialPosition = kendo.getOffset(wrapper, "position");

                that.resizeDirection = e.currentTarget.prop("className").replace("k-resize-handle k-resize-", "");

                that.initialSize = {
                    width: wrapper.width(),
                    height: wrapper.height()
                };

                that.containerOffset = kendo.getOffset(wnd.appendTo, "position");

                var offsetParent = wrapper.offsetParent();

                if (offsetParent.is("html")) {
                    that.containerOffset.top = that.containerOffset.left = 0;
                } else {
                    var marginTop = offsetParent.css("margin-top");
                    var marginLeft = offsetParent.css("margin-left");
                    var hasMargin = !zero.test(marginTop) || !zero.test(marginLeft);
                    if (hasMargin) {
                        var wrapperPosition = getPosition(wrapper[0]);
                        var relativeElMarginLeft = wrapperPosition.left - that.containerOffset.left - that.initialPosition.left;
                        var relativeElMarginTop = wrapperPosition.top - that.containerOffset.top - that.initialPosition.top;

                        that._relativeElMarginLeft = relativeElMarginLeft > 1 ? relativeElMarginLeft : 0;
                        that._relativeElMarginTop = relativeElMarginTop > 1 ? relativeElMarginTop : 0;

                        that.initialPosition.left += that._relativeElMarginLeft;
                        that.initialPosition.top += that._relativeElMarginTop;
                    }
                }

                wrapper
                    .children(KWINDOWRESIZEHANDLES).not(e.currentTarget).hide();

                $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
            },
            drag: function (e) {
                if (this._preventDragging) {
                    return;
                }
                var that = this,
                    wnd = that.owner,
                    wrapper = wnd.wrapper,
                    options = wnd.options,
                    direction = that.resizeDirection,
                    containerOffset = that.containerOffset,
                    initialPosition = that.initialPosition,
                    initialSize = that.initialSize,
                    newWidth, newHeight,
                    windowBottom, windowRight,
                    x = Math.max(e.x.location, 0),
                    y = Math.max(e.y.location, 0);

                if (direction.indexOf("e") >= 0) {
                    newWidth = x - initialPosition.left - containerOffset.left;

                    wrapper.width(constrain(newWidth, options.minWidth, options.maxWidth));
                } else if (direction.indexOf("w") >= 0) {
                    windowRight = initialPosition.left + initialSize.width + containerOffset.left;
                    newWidth = constrain(windowRight - x, options.minWidth, options.maxWidth);

                    wrapper.css({
                        left: windowRight - newWidth - containerOffset.left - (that._relativeElMarginLeft || 0),
                        width: newWidth
                    });
                }

                var newWindowTop = y;
                if (wnd.options.pinned) {
                    newWindowTop -= $(window).scrollTop();
                }
                if (direction.indexOf("s") >= 0) {
                    newHeight = newWindowTop - initialPosition.top - that.elementPadding - containerOffset.top;

                    wrapper.height(constrain(newHeight, options.minHeight, options.maxHeight));
                } else if (direction.indexOf("n") >= 0) {
                    windowBottom = initialPosition.top + initialSize.height + containerOffset.top;
                    newHeight = constrain(windowBottom - newWindowTop, options.minHeight, options.maxHeight);

                    wrapper.css({
                        top: windowBottom - newHeight - containerOffset.top - (that._relativeElMarginTop || 0),
                        height: newHeight
                    });
                }

                if (newWidth) {
                    wnd.options.width = newWidth + "px";
                }
                if (newHeight) {
                    wnd.options.height = newHeight + "px";
                }

                wnd.resize();
            },
            dragend: function (e) {
                if (this._preventDragging) {
                    return;
                }
                var that = this,
                    wnd = that.owner,
                    wrapper = wnd.wrapper;

                wrapper
                    .children(KWINDOWRESIZEHANDLES).not(e.currentTarget).show();

                $(BODY).css(CURSOR, "");

                if (wnd.touchScroller) {
                    wnd.touchScroller.reset();
                }

                if (e.keyCode == 27) {
                    wrapper.css(that.initialPosition)
                        .css(that.initialSize);
                }

                wnd.trigger(RESIZEEND);

                return false;
            },
            destroy: function() {
                if (this._draggable) {
                    this._draggable.destroy();
                }

                this._draggable = this.owner = null;
            }
        };

        function WindowDragging(wnd, dragHandle) {
            var that = this;
            that.owner = wnd;
            that._preventDragging = false;
            that._draggable = new Draggable(wnd.wrapper, {
                filter: dragHandle,
                group: wnd.wrapper.id + "-moving",
                dragstart: proxy(that.dragstart, that),
                drag: proxy(that.drag, that),
                dragend: proxy(that.dragend, that),
                dragcancel: proxy(that.dragcancel, that)
            });

            that._draggable.userEvents.stopPropagation = false;
        }

        WindowDragging.prototype = {
            dragstart: function (e) {
                var wnd = this.owner,
                    element = wnd.element,
                    actions = element.find(".k-window-actions"),
                    containerOffset = kendo.getOffset(wnd.appendTo);

                this._preventDragging = wnd.trigger(DRAGSTART) || !wnd.options.draggable;
                if (this._preventDragging) {
                    return;
                }

                wnd.initialWindowPosition = kendo.getOffset(wnd.wrapper, "position");

                wnd.initialPointerPosition = {
                    left: e.x.client,
                    top: e.y.client
                };

                wnd.startPosition = {
                    left: e.x.client - wnd.initialWindowPosition.left,
                    top: e.y.client - wnd.initialWindowPosition.top
                };

                if (actions.length > 0) {
                    wnd.minLeftPosition = outerWidth(actions) + parseInt(actions.css("right"), 10) - outerWidth(element);
                } else {
                    wnd.minLeftPosition =  20 - outerWidth(element); // at least 20px remain visible
                }

                wnd.minLeftPosition -= containerOffset.left;
                wnd.minTopPosition = -containerOffset.top;

                wnd.wrapper
                    .append(templates.overlay)
                    .children(KWINDOWRESIZEHANDLES).hide();

                $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
            },

            drag: function (e) {
                if (this._preventDragging) {
                    return;
                }
                var wnd = this.owner;
                var position = wnd.options.position;

                position.top = Math.max(e.y.client - wnd.startPosition.top, wnd.minTopPosition);
                position.left = Math.max(e.x.client - wnd.startPosition.left, wnd.minLeftPosition);

                if (kendo.support.transforms) {
                    $(wnd.wrapper).css(
                        "transform", "translate(" +
                        (e.x.client - wnd.initialPointerPosition.left) + "px, " +
                        (e.y.client - wnd.initialPointerPosition.top) + "px)"
                    );
                } else {
                    $(wnd.wrapper).css(position);
                }

            },

            _finishDrag: function() {
                var wnd = this.owner;

                wnd.wrapper
                    .children(KWINDOWRESIZEHANDLES).toggle(!wnd.options.isMinimized).end()
                    .find(KOVERLAY).remove();

                $(BODY).css(CURSOR, "");
            },

            dragcancel: function (e) {
                if (this._preventDragging) {
                    return;
                }
                this._finishDrag();

                e.currentTarget.closest(KWINDOW).css(this.owner.initialWindowPosition);
            },

            dragend: function () {
                if (this._preventDragging) {
                    return;
                }
                $(this.owner.wrapper)
                    .css(this.owner.options.position)
                    .css("transform", "");

                this._finishDrag();

                this.owner.trigger(DRAGEND);

                return false;
            },
            destroy: function() {
                if (this._draggable) {
                    this._draggable.destroy();
                }

                this._draggable = this.owner = null;
            }
        };

        kendo.ui.plugin(Window);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });