(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        BODY = "body",
        templates,
        NS = ".kendoWindow",
        // classNames
        KWINDOW = ".k-window",
        KWINDOWTITLE = ".k-window-title",
        KWINDOWTITLEBAR = KWINDOWTITLE + "bar",
        KWINDOWCONTENT = ".k-window-content",
        KWINDOWRESIZEHANDLES = ".k-resize-handle",
        KOVERLAY = ".k-overlay",
        KCONTENTFRAME = "k-content-frame",
        LOADING = "k-loading",
        KHOVERSTATE = "k-state-hover",
        KFOCUSEDSTATE = "k-state-focused",
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
        RESIZE = "resize",
        DRAGSTART = "dragstart",
        DRAGEND = "dragend",
        ERROR = "error",
        OVERFLOW = "overflow",
        ZINDEX = "zIndex",
        MINIMIZE_MAXIMIZE = ".k-window-actions .k-i-minimize,.k-window-actions .k-i-maximize",
        TITLEBAR_BUTTONS = ".k-window-titlebar .k-window-action",
        isLocalUrl = kendo.isLocalUrl;

    function defined(x) {
        return (typeof x != "undefined");
    }

    function constrain(value, low, high) {
        return Math.max(Math.min(value, high), low);
    }

    function windowObject(element, name) {
        var contentElement = element.children(KWINDOWCONTENT);

        return contentElement.data("kendoWindow") || contentElement.data("kendo" + name);
    }

    function openedModalWindows(name) {
        return $(KWINDOW).filter(function() {
            var wnd = $(this),
                winObj = windowObject(wnd, name);
            return winObj.options.modal && wnd.is(VISIBLE) && winObj.options.visible;
        }).sort(function(a, b){
            return +$(a).css("zIndex") - +$(b).css("zIndex");
        });
    }

    function sizingAction(actionId, callback) {
        return function() {
            var that = this,
                wrapper = that.wrapper,
                style = wrapper[0].style,
                options = that.options;

            if (options.isMaximized || options.isMinimized) {
                return;
            }

            that.restoreOptions = {
                width: style.width,
                height: style.height
            };

            wrapper
                .find(KWINDOWRESIZEHANDLES).hide().end()
                .find(MINIMIZE_MAXIMIZE).parent().hide()
                    .eq(0).before(templates.action({ name: "Restore" }));

            callback.call(that);

            return that;
        };
    }

    var Window = Widget.extend({
        init: function(element, options) {
            var that = this,
                wrapper,
                offset, visibility, display,
                isVisible = false,
                content,
                windowContent,
                id;

            Widget.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;
            content = options.content;

            that.appendTo = $(options.appendTo || document.body);

            that._animations();

            if (content && !isPlainObject(content)) {
                content = options.content = { url: content };
            }

            if (!element.parent().is(that.appendTo)) {
                // remove script blocks to prevent double-execution
                element.find("script").filter(function() {
                    return !this.type || this.type.toLowerCase().indexOf("script") >= 0;
                }).remove();

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
            }

            if (!defined(options.visible) || options.visible === null) {
                options.visible = element.is(VISIBLE);
            }

            wrapper = that.wrapper = element.closest(KWINDOW);

            if (!element.is(".k-content") || !wrapper[0]) {
                element.addClass("k-window-content k-content");
                that._createWindow(element, options);
                wrapper = that.wrapper = element.closest(KWINDOW);

                that._dimensions();
            }

            if (offset) {
                wrapper.css({
                    top: offset.top,
                    left: offset.left
                });
            }

            if (content) {
                that.refresh(content);
            }

            that.toFront();

            windowContent = wrapper.children(KWINDOWCONTENT);
            that._tabindex(windowContent);

            if (options.visible && options.modal) {
                that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
            }

            wrapper
                .on("mouseenter" + NS, TITLEBAR_BUTTONS, function () { $(this).addClass(KHOVERSTATE); })
                .on("mouseleave" + NS, TITLEBAR_BUTTONS, function () { $(this).removeClass(KHOVERSTATE); })
                .on("touchend" + NS + " click" + NS, TITLEBAR_BUTTONS, proxy(that._windowActionHandler, that));

            windowContent
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("focus" + NS, function() { wrapper.addClass(KFOCUSEDSTATE); })
                .on("blur" + NS, function() { wrapper.removeClass(KFOCUSEDSTATE); });

            if (options.resizable) {
                wrapper.on("dblclick" + NS, KWINDOWTITLEBAR, proxy(that.toggleMaximization, that));

                each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            id = element.attr("id");
            if (id) {
                id = id + "_wnd_title";
                wrapper.find(KWINDOWTITLEBAR)
                       .children(KWINDOWTITLE)
                       .attr("id", id);

                windowContent
                    .attr({
                        "role": "dialog",
                        "aria-labelledby": id
                    });
            }

            wrapper.add(wrapper.find(".k-resize-handle,.k-window-titlebar"))
                    .on("mousedown" + NS, proxy(that.toFront, that));

            that.touchScroller = kendo.touchScroller(element);

            that._resizeHandler = function(e) {
                return that._onDocumentResize(e);
            };

            $(window).on("resize", that._resizeHandler);

            if (options.visible) {
                that.element.focus();
                that.trigger(OPEN);
                that.trigger(ACTIVATE);
            }

            kendo.notify(that);
        },

        _dimensions: function() {
            var that = this,
                wrapper = that.wrapper,
                element = that.element,
                options = that.options;

            that.title(options.title);

            if (options.width) {
                wrapper.width(options.width);
            }

            if (options.height) {
                wrapper.height(options.height);
            }

            each(["minWidth","minHeight","maxWidth","maxHeight"], function(_, prop) {
                var value = options[prop];
                if (value && value != Infinity) {
                    element.css(prop, value);
                }
            });

            if (!options.visible) {
                wrapper.hide();
            }
        },

        _animations: function() {
            var options = this.options;

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
            this._animations();
            this._dimensions();
        },

        events:[
            OPEN,
            ACTIVATE,
            DEACTIVATE,
            CLOSE,
            REFRESH,
            RESIZE,
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
            modal: false,
            resizable: true,
            draggable: true,
            minWidth: 90,
            minHeight: 50,
            maxWidth: Infinity,
            maxHeight: Infinity,
            visible: null
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
                newWidth, newHeight;

            if (e.target != e.currentTarget) {
                return;
            }

            if (keyCode == keys.ESC && that._closable()) {
                that._close(true);
            }

            if (options.draggable && !e.ctrlKey && !isMaximized) {
                offset = wrapper.offset();

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

            if (options.resizable && e.ctrlKey && !isMaximized) {
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
                    wrapper.css({
                        width: constrain(newWidth, options.minWidth, options.maxWidth),
                        height: constrain(newHeight, options.minHeight, options.maxHeight)
                    });

                    that.trigger(RESIZE);
                }
            }

            if (handled) {
                e.preventDefault();
            }
        },

        _overlay: function (visible) {
            var overlay = this.appendTo.children(".k-overlay"),
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

        _windowActionHandler: function (e) {
            var target = $(e.target).closest(".k-window-action").find(".k-icon"),
                that = this;

            each({
                "k-i-close": function() { that._close(true); },
                "k-i-maximize": that.maximize,
                "k-i-minimize": that.minimize,
                "k-i-restore": that.restore,
                "k-i-refresh": that.refresh
            }, function (commandName, handler) {
                if (target.hasClass(commandName)) {
                    e.preventDefault();
                    handler.call(that);
                    return false;
                }
            });
        },

        center: function () {
            var wrapper = this.wrapper,
                documentWindow = $(window);

            wrapper.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                top: documentWindow.scrollTop() + Math.max(0, (documentWindow.height() - wrapper.height()) / 2)
            });

            return this;
        },

        title: function (text) {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                titleBar = wrapper.find(KWINDOWTITLEBAR),
                title = titleBar.children(KWINDOWTITLE),
                titleBarHeight = titleBar.outerHeight();

            if (!arguments.length) {
                return title.text();
            }

            if (text === false) {
                wrapper.addClass("k-window-titleless");
                titleBar.remove();
            } else {
                if (!titleBar.length) {
                    wrapper.prepend(templates.titlebar(extend(templates, options)));
                }

                wrapper.css("padding-top", titleBarHeight);
                titleBar.css("margin-top", -titleBarHeight);
            }

            title.text(text);

            return that;
        },

        content: function (html) {
            var content = this.wrapper.children(KWINDOWCONTENT);

            if (!html) {
                return content.html();
            }

            content.html(html);
            return this;
        },

        open: function () {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                showOptions = options.animation.open,
                contentElement = wrapper.children(KWINDOWCONTENT),
                initialOverflow = contentElement.css(OVERFLOW),
                overlay;

            if (!that.trigger(OPEN)) {
                that.toFront();

                that.element.focus();

                options.visible = true;

                if (options.modal) {
                    overlay = that._overlay(false);

                    if (showOptions.duration) {
                        overlay.kendoStop().kendoAnimate({ effects: "fade:in", duration: showOptions.duration });
                    } else {
                        overlay.css("opacity", 0.5).show();
                    }
                }

                if (!wrapper.is(VISIBLE)) {
                    contentElement.css(OVERFLOW, HIDDEN);
                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: function() {
                            that.element.focus();
                            that.trigger(ACTIVATE);
                            contentElement.css(OVERFLOW, initialOverflow);
                        }
                    });
                }
            }

            if (options.isMaximized) {
                that._documentScrollTop = $(document).scrollTop();
                $("html, body").css(OVERFLOW, HIDDEN);
            }

            return that;
        },

        _close: function(userTriggered) {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                showOptions = options.animation.open,
                hideOptions = options.animation.close,
                modalWindows,
                shouldHideOverlay, overlay;

            if (wrapper.is(VISIBLE) && !that.trigger(CLOSE, { userTriggered: !!userTriggered })) {
                options.visible = false;

                $(KWINDOW).each(function(i, element) {
                    var windowObject = $(element),
                        contentElement = windowObject.find(KWINDOWCONTENT);

                    // Remove overlay set by toFront
                    if (element != wrapper && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                        contentElement.children(".k-overlay").remove();
                    }
                });

                modalWindows = openedModalWindows(options.name);

                shouldHideOverlay = options.modal && !modalWindows.length;

                overlay = options.modal ? that._overlay(true) : $(undefined);

                if (shouldHideOverlay) {
                    if (hideOptions.duration) {
                        overlay.kendoStop().kendoAnimate({
                             effects: "fade:out",
                             duration: hideOptions.duration,
                             hide: true
                         });
                    } else {
                        overlay.hide();
                    }
                } else if (modalWindows.length) {
                    windowObject(modalWindows.eq(modalWindows.length - 1), options.name)._overlay(true);
                }

                wrapper.kendoStop().kendoAnimate({
                    effects: hideOptions.effects || showOptions.effects,
                    reverse: hideOptions.reverse === true,
                    duration: hideOptions.duration,
                    complete: function() {
                        wrapper.hide();
                        that.trigger(DEACTIVATE);
                    }
                });
            }

            if (that.options.isMaximized) {
                $("html, body").css(OVERFLOW, "");
                if (that._documentScrollTop && that._documentScrollTop > 0) {
                    $(document).scrollTop(that._documentScrollTop);
                }
            }
        },

        close: function () {
            this._close(false);
            return this;
        },

        toFront: function (e) {
            var that = this,
                wrapper = that.wrapper,
                currentWindow = wrapper[0],
                zIndex = +wrapper.css(ZINDEX),
                originalZIndex = zIndex,
                activeElement,
                winElement = that.element,
                target = e && e.target ? e.target : null;

            try {
                // IE throws error when Window contains iframe
                activeElement = document.activeElement;
            } catch (e) {}

            $(KWINDOW).each(function(i, element) {
                var windowObject = $(element),
                    zIndexNew = windowObject.css(ZINDEX),
                    contentElement = windowObject.find(KWINDOWCONTENT);

                if (!isNaN(zIndexNew)) {
                    zIndex = Math.max(+zIndexNew, zIndex);
                }

                // Add overlay to windows with iframes and lower z-index to prevent
                // trapping of events when resizing / dragging
                if (element != currentWindow && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                    contentElement.append(templates.overlay);
                }
            });

            if (zIndex == 10001 || originalZIndex < zIndex) {
                wrapper.css(ZINDEX, zIndex + 2);
            }
            that.element.find("> .k-overlay").remove();

            if (!$(activeElement).is(winElement) &&
                !$(target).is(TITLEBAR_BUTTONS + "," + TITLEBAR_BUTTONS + " .k-icon,:input") &&
                (!winElement.find(activeElement).length || !winElement.find(target).length)) {
                winElement.focus();

                var scrollTop = $(window).scrollTop(),
                    windowTop = parseInt(that.wrapper.position().top, 10);
                if (windowTop > 0 && windowTop - scrollTop < 0) {
                    if (scrollTop > 0) {
                        $(window).scrollTop(windowTop);
                    } else {
                        that.wrapper.css("top", scrollTop);
                    }
                }
            }

            return that;
        },

        toggleMaximization: function () {
            return this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        restore: function () {
            var that = this,
                options = that.options,
                restoreOptions = that.restoreOptions;

            if (!options.isMaximized && !options.isMinimized) {
                return;
            }

            that.wrapper
                .css({
                    position: "absolute",
                    left: restoreOptions.left,
                    top: restoreOptions.top,
                    width: restoreOptions.width,
                    height: restoreOptions.height
                })
                .find(".k-window-content,.k-resize-handle").show().end()
                .find(".k-window-titlebar .k-i-restore").parent().remove().end().end()
                .find(MINIMIZE_MAXIMIZE).parent().show();

            $("html, body").css(OVERFLOW, "");
            if (this._documentScrollTop && this._documentScrollTop > 0) {
                $(document).scrollTop(this._documentScrollTop);
            }

            options.isMaximized = options.isMinimized = false;

            that.trigger(RESIZE);

            return that;
        },

        maximize: sizingAction("maximize", function() {
            var that = this,
                wrapper = that.wrapper,
                position = wrapper.position();

            extend(that.restoreOptions, {
                left: position.left,
                top: position.top
            });

            wrapper.css({
                    left: 0,
                    top: 0,
                    position: "fixed"
                });

            this._documentScrollTop = $(document).scrollTop();
            $("html, body").css(OVERFLOW, HIDDEN);

            that.options.isMaximized = true;

            that._onDocumentResize();
        }),

        minimize: sizingAction("minimize", function() {
            var that = this;

            that.wrapper.css("height", "");
            that.element.hide();

            that.options.isMinimized = true;
        }),

        _onDocumentResize: function () {
            var that = this,
                wrapper = that.wrapper,
                wnd = $(window);

            if (!that.options.isMaximized) {
                return;
            }

            wrapper.css({
                    width: wnd.width(),
                    height: wnd.height() - parseInt(wrapper.css("padding-top"), 10)
                });

            that.trigger(RESIZE);
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
                        .on("load" + NS, function(){
                            that.trigger(REFRESH);
                        });
                }
            } else {
                if (options.template) {
                    // refresh template
                    that.content(template(options.template)({}));
                }

                that.trigger(REFRESH);
            }

            return that;
        },

        _ajaxRequest: function (options) {
            var that = this,
                contentTemplate = options.template,
                refreshIcon = that.wrapper.find(".k-window-titlebar .k-i-refresh"),
                loadingIconTimeout = setTimeout(function () {
                    refreshIcon.addClass(LOADING);
                }, 100);

            jQuery.ajax(extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: proxy(function (xhr, status) {
                    that.trigger(ERROR, {
                        status: status,
                        xhr: xhr
                    });
                }, that),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    refreshIcon.removeClass(LOADING);
                },
                success: proxy(function (data, textStatus) {
                    if (contentTemplate) {
                        data = template(contentTemplate)(data || {});
                    }

                    that.element.html(data);

                    that.trigger(REFRESH);
                }, that)
            }, options));
        },

        destroy: function () {
            var that = this,
                modalWindows,
                shouldHideOverlay;

            Widget.fn.destroy.call(that);

            kendo.destroy(that.wrapper);

            if (that.resizing) {
                that.resizing.destroy();
            }

            if (that.dragging) {
                that.dragging.destroy();
            }

            that.wrapper.remove().add(that.wrapper.find(".k-resize-handle,.k-window-titlebar")).off(NS);

            $(window).off("resize", that._resizeHandler);

            modalWindows = openedModalWindows();

            shouldHideOverlay = that.options.modal && !modalWindows.length;

            if (shouldHideOverlay) {
                that._overlay(false).remove();
            } else if (modalWindows.length > 0) {
                windowObject(modalWindows.eq(modalWindows.length - 2), that.options.name)._overlay(true);
            }
        },

        _createWindow: function() {
            var that = this,
                contentHtml = that.element,
                options = that.options,
                iframeSrcAttributes,
                wrapper,
                isRtl = kendo.support.isRtl(contentHtml);

            if (options.scrollable === false) {
                contentHtml.attr("style", "overflow:hidden;");
            }

            if (options.iframe && options.content) {
                contentHtml.html(templates.contentFrame(options));
            }

            wrapper = $(templates.wrapper(options));

            if (options.title !== false) {
                wrapper.append(templates.titlebar(extend(templates, options)));
            }

            // Collect the src attributes of all iframes and then set them to empty string.
            // This seems to fix this IE9 "feature": http://msdn.microsoft.com/en-us/library/gg622929%28v=VS.85%29.aspx?ppud=4
            iframeSrcAttributes = contentHtml.find("iframe:not(.k-content)").map(function(iframe) {
                var src = this.getAttribute("src");
                this.src = "";
                return src;
            });

            // Make sure the wrapper is appended to the body only once. IE9+ will throw exceptions if you move iframes in DOM
            wrapper
                .toggleClass("k-rtl", isRtl)
                .appendTo(that.appendTo)
                .append(contentHtml)
                .find("iframe:not(.k-content)").each(function(index) {
                   // Restore the src attribute of the iframes when they are part of the live DOM tree
                   this.src = iframeSrcAttributes[index];
                });

            wrapper.find(".k-window-title")
                .css(isRtl ? "left" : "right", wrapper.find(".k-window-actions").outerWidth() + 10);

            contentHtml.show();
        }
    });

    templates = {
        wrapper: template("<div class='k-widget k-window' />"),
        action: template(
            "<a role='button' href='\\#' class='k-window-action k-link'>" +
                "<span role='presentation' class='k-icon k-i-#= name.toLowerCase() #'>#= name #</span>" +
            "</a>"
        ),
        titlebar: template(
            "<div class='k-window-titlebar k-header'>&nbsp;" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions'>" +
                "# for (var i = 0; i < actions.length; i++) { #" +
                    "#= action({ name: actions[i] }) #" +
                "# } #" +
                "</div>" +
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
        that._draggable = new Draggable(wnd.wrapper, {
            filter: KWINDOWRESIZEHANDLES,
            group: wnd.wrapper.id + "-resizing",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    }

    WindowResizing.prototype = {
        dragstart: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper;

            that.elementPadding = parseInt(wnd.wrapper.css("padding-top"), 10);
            that.initialCursorPosition = wrapper.offset();

            that.resizeDirection = e.currentTarget.prop("className").replace("k-resize-handle k-resize-", "");

            that.initialSize = {
                width: wrapper.width(),
                height: wrapper.height()
            };

            that.containerOffset = wnd.appendTo.offset(),

            wrapper
                .append(templates.overlay)
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).hide();

            $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
        },
        drag: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper,
                options = wnd.options,
                direction = that.resizeDirection,
                containerOffset = that.containerOffset,
                initialPosition = that.initialCursorPosition,
                initialSize = that.initialSize,
                newWidth, newHeight,
                windowBottom, windowRight,
                x = e.x.location,
                y = e.y.location;

            if (direction.indexOf("e") >= 0) {
                newWidth = x - initialPosition.left;

                wrapper.width(constrain(newWidth, options.minWidth, options.maxWidth));
            } else if (direction.indexOf("w") >= 0) {
                windowRight = initialPosition.left + initialSize.width;
                newWidth = constrain(windowRight - x, options.minWidth, options.maxWidth);

                wrapper.css({
                    left: windowRight - newWidth - containerOffset.left,
                    width: newWidth
                });
            }

            if (direction.indexOf("s") >= 0) {
                newHeight = y - initialPosition.top - that.elementPadding;

                wrapper.height(constrain(newHeight, options.minHeight, options.maxHeight));
            } else if (direction.indexOf("n") >= 0) {
                windowBottom = initialPosition.top + initialSize.height;
                newHeight = constrain(windowBottom - y, options.minHeight, options.maxHeight);

                wrapper.css({
                    top: windowBottom - newHeight - containerOffset.top,
                    height: newHeight
                });
            }

            wnd.trigger(RESIZE);
        },
        dragend: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper;

            wrapper
                .find(KOVERLAY).remove().end()
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).show();

            $(BODY).css(CURSOR, "");

            if (wnd.touchScroller) {
               wnd.touchScroller.reset();
            }
            if (e.keyCode == 27) {
                wrapper.css(that.initialCursorPosition)
                    .css(that.initialSize);
            }

            return false;
        },
        destroy: function() {
            this._draggable.destroy();
        }
    };

    function WindowDragging(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: KWINDOWTITLEBAR,
            group: wnd.wrapper.id + "-moving",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that),
            dragcancel: proxy(that.dragcancel, that)
        });
    }

    WindowDragging.prototype = {
        dragstart: function (e) {
            var wnd = this.owner,
                element = wnd.element,
                actions = element.find(".k-window-actions"),
                containerOffset = wnd.appendTo.offset();

            wnd.trigger(DRAGSTART);

            wnd.initialWindowPosition = wnd.wrapper.position();

            wnd.startPosition = {
                left: e.x.client - wnd.initialWindowPosition.left,
                top: e.y.client - wnd.initialWindowPosition.top
            };

            if (actions.length > 0) {
                wnd.minLeftPosition = actions.outerWidth() + parseInt(actions.css("right"), 10) - element.outerWidth();
            } else {
                wnd.minLeftPosition =  20 - element.outerWidth(); // at least 20px remain visible
            }

            wnd.minLeftPosition -= containerOffset.left;
            wnd.minTopPosition = -containerOffset.top;

            wnd.wrapper
                .append(templates.overlay)
                .find(KWINDOWRESIZEHANDLES).hide();

            $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
        },

        drag: function (e) {
            var wnd = this.owner,
                coordinates = {
                    left: Math.max(e.x.client - wnd.startPosition.left, wnd.minLeftPosition),
                    top: Math.max(e.y.client - wnd.startPosition.top, wnd.minTopPosition)
                };

            $(wnd.wrapper).css(coordinates);
        },

        _finishDrag: function() {
            var wnd = this.owner;

            wnd.wrapper
                .find(KWINDOWRESIZEHANDLES).toggle(!wnd.options.isMinimized).end()
                .find(KOVERLAY).remove();

            $(BODY).css(CURSOR, "");
        },

        dragcancel: function (e) {
            this._finishDrag();

            e.currentTarget.closest(KWINDOW).css(this.owner.initialWindowPosition);
        },

        dragend: function (e) {
            this._finishDrag();

            this.owner.trigger(DRAGEND);

            return false;
        },
        destroy: function() {
            this._draggable.destroy();
        }
    };

    kendo.ui.plugin(Window);

})(window.kendo.jQuery);
