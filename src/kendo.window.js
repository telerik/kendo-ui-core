(function ($, window) {
    /**
     * @name kendo.ui.Window.Description
     *
     * @section The window component is used to display modal or non-modal content.
     *
     * @exampleTitle Creating a basic window
     * @example
     * <!-- HTML -->
     * <form id="feedback-form" action="/submit-feedback">
     *     <legend>Submit feedback</legend>
     *
     *     <label for="message">Message:</label>
     *     <textarea name="message"></textarea>
     *
     *     <button type="submit">Send</button>
     * </form>
     *
     * // JavaScript
     * $("#feedback-form").kendoWindow();
     */
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        Draggable = kendo.ui.Draggable,
        fx = kendo.fx,
        template = kendo.template,
        // classNames
        TWINDOW = ".t-window",
        TWINDOWTITLEBAR = ".t-window-titlebar",
        TOVERLAY = ".t-overlay",
        // events
        OPEN = "open",
        ACTIVATE = "activate",
        CLOSE = "close",
        REFRESH = "refresh",
        RESIZE = "resize",
        ERROR = "error",
        MOVE = "move"

    function isLocalUrl(url) {
        return url && !(/^([a-z]+:)?\/\//i).test(url);
    }

    function fixIE6Sizing(wrapper) {
        if ($.browser.msie && $.browser.version < 7) {
            wrapper
                .find(".t-resize-e,.t-resize-w").css("height", wrapper.height()).end()
                .find(".t-resize-n,.t-resize-s").css("width", wrapper.width()).end()
                .find(TOVERLAY).css({ width: wrapper.width(), height: wrapper.height() });
        }
    }

    var Window = Component.extend(/** @lends kendo.ui.Window.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [modal] Specifies whether the window should block interaction with other page elements.
         * @option {Boolean} [visible] Specifies whether the window will be initially visible.
         * @option {Boolean} [draggable] Specifies whether the users may move the window.
         * @option {Boolean} [resizable] Specifies whether the users may to resize the window.
         * @option {Integer} [minWidth] The minimum width that may be achieved by resizing the window.
         * @option {Integer} [minHeight] The minimum height that may be achieved by resizing the window.
         * @option {String} [contentUrl] Specifies a URL that the window should load its content from. For remote URLs, a container iframe element is automatically created.
         * @option {Array<String>} [actions] <"Close"> The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize", "Maximize".
         * @option {String} [title] The text in the window title bar.
         * @option {Object} [animation] A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when the window opens.
         * @option {Animation} [animation.close] The animation that will be used when the window closes.
         */
        init: function(element, options) {
            var that = this,
                windowActions = ".t-window-titlebar .t-window-action",
                titleBar, offset;

            Component.fn.init.call(that, element, options);
            options = that.options;

            if (!that.element.is(".t-content")) {
                that.element.addClass("t-window-content t-content");
                createWindow(that.element, options);
                that.wrapper = that.element.closest(TWINDOW);

                titleBar = that.wrapper.find(TWINDOWTITLEBAR);
                titleBar.css("margin-top", -titleBar.outerHeight());

                that.wrapper.css("padding-top", titleBar.outerHeight());

                if (options.width) {
                    that.wrapper.width(options.width);
                }

                if (options.height) {
                    that.wrapper.height(options.height);
                }

                if (!options.visible) {
                    that.wrapper.hide();
                }
            }

            if (!that.wrapper.parent().is("body")) {
                if (that.wrapper.is(":visible")) {
                    offset = that.wrapper.offset();
                    that.wrapper.css({ top: offset.top, left: offset.left });
                } else {
                    that.wrapper.css({ visibility: "hidden", display: "" });
                    offset = that.wrapper.offset();
                    that.wrapper
                        .css({
                            top: offset.top,
                            left: offset.left,
                            visibility: "visible",
                            display: "none"
                        });
                }

                that.wrapper
                    .toggleClass("t-rtl", that.wrapper.closest(".t-rtl").length > 0)
                    .appendTo(document.body);
            }

            if (options.modal) {
                that._overlay(that.wrapper.is(":visible")).css({ opacity: 0.5 });
            }

            that.wrapper
                .delegate(windowActions, "mouseenter", function () { $(this).addClass('t-state-hover'); })
                .delegate(windowActions, "mouseleave", function () { $(this).removeClass('t-state-hover'); })
                .delegate(windowActions, "click", $.proxy(that._windowActionHandler, that));

            if (options.resizable) {
                that.wrapper
                    .delegate(TWINDOWTITLEBAR, "dblclick", $.proxy(that.toggleMaximization, that))
                    .append(templates.resizeHandles("n e s w se sw ne nw".split(" ")));

                fixIE6Sizing(that.wrapper);

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            that.bind([
                /**
                 * Fires when the window is opened (i.e. the open() method is called).
                 * @name kendo.ui.Window#open
                 * @event
                 * @param {Event} e
                 * @cancellable
                 */
                OPEN,
                /**
                 * Fires when the window has finished its opening animation
                 * @name kendo.ui.Window#activate
                 * @event
                 * @param {Event} e
                 */
                ACTIVATE,
                /**
                 * Fires when the window is being closed (by the user or through the close() method)
                 * @name kendo.ui.Window#close
                 * @event
                 * @param {Event} e
                 * @cancellable
                 */
                CLOSE,
                /**
                 * Fires when the window contents have been refreshed through AJAX.
                 * @name kendo.ui.Window#refresh
                 * @event
                 * @param {Event} e
                 */
                REFRESH,
                /**
                 * Fires when the window has been resized by the user.
                 * @name kendo.ui.Window#resize
                 * @event
                 * @param {Event} e
                 */
                RESIZE,
                /**
                 * Fires when an AJAX request for content fails.
                 * @name kendo.ui.Window#error
                 * @event
                 * @param {Event} e
                 */
                ERROR,
                /**
                 * Fires when the window has been moved by the user.
                 * @name kendo.ui.Window#move
                 * @event
                 * @param {Event} e
                 */
                MOVE
            ], options);

            $(window).resize($.proxy(that._onDocumentResize, that));

            if (isLocalUrl(that.contentUrl)) {
                that._ajaxRequest();
            }

            if (that.wrapper.is(":visible")) {
                that.trigger(OPEN);
                that.trigger(ACTIVATE);
            }
        },

        options: {
            animation: {
                open: {
                    effects: { zoomIn: {}, fadeIn: {} },
                    duration: 350,
                    show: true
                },
                close: {
                    effects: { zoomOut: { properties: { scale: 0.7 } }, fadeOut: {} },
                    duration: 350,
                    hide: true
                }
            },
            title: "",
            actions: ["Close"],
            modal: false,
            resizable: true,
            draggable: true,
            minWidth: 50,
            minHeight: 50,
            visible: true
        },

        _overlay: function (visible) {
            var overlay = $("body > .t-overlay"),
                doc = $(document),
                wrapper = this.wrapper[0];

            if (overlay.length == 0) {
                overlay = $("<div class='t-overlay' />")
                    .toggle(visible)
                    .insertBefore(wrapper);
            } else {
                overlay.insertBefore(wrapper).toggle(visible);
            }

            if ($.browser.msie && $.browser.version < 7) {
                overlay.css({
                    width: doc.width() - 21,
                    height: doc.height(),
                    position: "absolute"
                });
            }

            return overlay;
        },

        _windowActionHandler: function (e) {
            var target = $(e.target).closest(".t-window-action").find(".t-icon"),
                that = this;

            $.each({
                "t-close": that.close,
                "t-maximize": that.maximize,
                "t-restore": that.restore,
                "t-refresh": that.refresh
            }, function (commandName, handler) {
                if (target.hasClass(commandName)) {
                    e.preventDefault();
                    handler.call(that);
                    return false;
                }
            });
        },

        /**
         * Centers the window within the viewport.
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.center();
         */
        center: function () {
            var wrapper = this.wrapper,
                documentWindow = $(window);

            wrapper.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                top: documentWindow.scrollTop() + Math.max(0, (documentWindow.height() - wrapper.height()) / 2)
            });

            return this;
        },

        /**
         * Sets/gets the window title.
         * @param {String} The new window title
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the title
         * var title = wnd.title();
         *
         * // set the title
         * wnd.title("New title");
         */
        title: function (text) {
            var title = $(".t-window-titlebar > .t-window-title", this.wrapper);

            if (!text) {
                return title.text();
            }

            title.text(text);
            return this;
        },

        /**
         * Sets/gets the window content.
         * @param {String} The new window content
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the content
         * var content = wnd.content();
         *
         * // set the content
         * wnd.content("<p>New content</p>");
         */
        content: function (html) {
            var content = $("> .t-window-content", this.wrapper);

            if (!html) {
                return content.html();
            }

            content.html(html);
            return this;
        },

        /**
         * Opens the window
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.open();
         */
        open: function () {
            var that = this,
                wrapper = that.wrapper,
                showOptions = that.options.animation.open;

            if (!that.trigger(OPEN)) {
                if (that.options.modal) {
                    var overlay = that._overlay(false);

                    if (showOptions.duration) {
                        overlay.kendoStop().kendoAnimate({
                            effects: { fadeOut: { properties: { opacity: 0.5 } } },
                            duration: showOptions.duration,
                            show: true
                        });
                    } else {
                        overlay.css("opacity", 0.5).show();
                    }
                }

                if (!wrapper.is(":visible")) {
                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: function() {
                            that.trigger(ACTIVATE);
                        }
                    });
                }
            }

            if (that.options.isMaximized) {
               $("html, body").css("overflow", "hidden");
            }

            return that;
        },

        /**
         * Closes the window
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.close();
         */
        close: function () {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                hideOptions = options.animation.close;

            if (wrapper.is(":visible")) {
                if (!that.trigger(CLOSE)) {
                    function windowObject(element) {
                        return element.find(".t-window-content").data("kendoWindow");
                    }

                    var openedModalWindows = $(TWINDOW).filter(function() {
                        var wnd = $(this);
                        return wnd.is(":visible") && windowObject(wnd).options.modal;
                    });

                    var shouldHideOverlay = options.modal && openedModalWindows.length == 1;

                    var overlay = options.modal ? that._overlay(true) : $(undefined);

                    if (shouldHideOverlay) {
                        if (hideOptions.duration) {
                            overlay.kendoStop().kendoAnimate({
                                 effects: { fadeOut: { properties: { opacity: 0 } } },
                                 duration: hideOptions.duration,
                                 hide: true
                             });
                        } else {
                            overlay.hide();
                        }
                    } else if (openedModalWindows.length > 0) {
                        windowObject(openedModalWindows.eq(openedModalWindows.length - 2))._overlay(true);
                    }

                    wrapper.kendoStop().kendoAnimate({
                        effects: hideOptions.effects,
                        duration: hideOptions.duration,
                        complete: function() {
                            wrapper.hide();
                        }
                    });
                }
            }

            if (that.options.isMaximized) {
                $("html, body").css("overflow", "");
            }

            return that;
        },

        /**
         * Toggles the window between a maximized and restored state.
         */
        toggleMaximization: function (e) {
            if (e && $(e.target).closest(".t-window-action").length > 0) {
                return;
            }

            this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        /**
         * Restores a maximized window to its previous size.
         */
        restore: function () {
            var that = this;

            if (!that.options.isMaximized) {
                return;
            }

            that.wrapper
                .css({
                    position: "absolute",
                    left: that.restorationSettings.left,
                    top: that.restorationSettings.top,
                    width: that.restorationSettings.width,
                    height: that.restorationSettings.height
                })
                .find(".t-resize-handle").show().end()
                .find(".t-window-titlebar .t-restore").addClass("t-maximize").removeClass("t-restore");

            $("html, body").css("overflow", "");

            that.options.isMaximized = false;

            that.trigger(RESIZE);

            return that;
        },

        /**
         * Maximizes a window so that it fills the entire screen.
         */
        maximize: function (e) {
            var that = this;

            if (that.options.isMaximized) {
                return;
            }

            var wrapper = that.wrapper;

            that.restorationSettings = {
                left: wrapper.position().left,
                top: wrapper.position().top,
                width: wrapper.width(),
                height: wrapper.height()
            };

            wrapper
                .css({ left: 0, top: 0, position: "fixed" })
                .find(".t-resize-handle").hide().end()
                .find(".t-window-titlebar .t-maximize").addClass("t-restore").removeClass("t-maximize");

            $("html, body").css("overflow", "hidden");

            that.options.isMaximized = true;

            that._onDocumentResize();

            return that;
        },

        _onDocumentResize: function () {
            if (!this.options.isMaximized) {
                return;
            }

            var wrapper = this.wrapper;

            wrapper
                .css({
                    width: $(window).width(),
                    height: $(window).height()
                });

            fixIE6Sizing(wrapper);

            this.trigger(RESIZE);
        },

        /**
         * Refreshes the window content from a remote url.
         * @param {String} url The URL that the window should be refreshed from. If omitted, the window content is refreshed from the contentUrl that was supplied upon the window creation.
         */
        refresh: function (url) {
            var that = this;

            url = url || that.options.contentUrl;

            if (isLocalUrl(url)) {
                that._ajaxRequest(url);
            }

            return that;
        },

        _ajaxRequest: function (url) {
            var that = this,
                loadingIconTimeout = setTimeout(function () {
                    $(".t-refresh", that.wrapper).addClass("t-loading");
                }, 100),
                data = {};

            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                data: data,
                cache: false,
                error: $.proxy(function (xhr, status) {
                    that.trigger(ERROR);
                }, that),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    $(".t-refresh", that.wrapper).removeClass("t-loading");
                },
                success: $.proxy(function (data, textStatus) {
                    $(".t-window-content", that.wrapper).html(data);

                    that.trigger(REFRESH);
                }, that)
            });
        },

        /**
         * Destroys the window and its modal overlay, if necessary. Useful for removing modal windows.
         */
        destroy: function () {
            var that = this;

            that.wrapper.remove();

            function windowObject(element) {
                return element.find(".t-window-content").data("kendoWindow");
            }

            var openedModalWindows = $(TWINDOW).filter(function() {
                var wnd = $(this);
                return wnd.is(":visible") && windowObject(wnd).options.modal;
            });

            var shouldHideOverlay = that.options.modal && openedModalWindows.length == 0;

            if (shouldHideOverlay) {
                that._overlay(false).remove();
            } else if (openedModalWindows.length > 0) {
                windowObject(openedModalWindows.eq(openedModalWindows.length - 2))._overlay(true);
            }
        }
    });

    var templates = {
        wrapper: template("<div class='t-widget t-window'></div>"),
        titlebar: template(
            "<div class='t-window-titlebar t-header'>&nbsp;" +
                "<span class='t-window-title'><#= title #></span>" +
                "<div class='t-window-actions t-header'>" +
                "<# for (var i = 0; i < actions.length; i++) { #>" +
                    "<a href='#' class='t-window-action t-link'>" +
                        "<span class='t-icon t-<#= actions[i].toLowerCase() #>'><#= actions[i] #></span>" +
                    "</a>" +
                "<# } #>" +
                "</div>" +
            "</div>"
        ),
        iframe: template(
            "<iframe src='<#= contentUrl #>' title='<#= title #>' frameborder='0'" +
                " style='border:0;width:100%;height:100%;'>" +
                    "This page requires frames in order to show content" +
            "</iframe>"
        ),
        resizeHandles: template("<div class='t-resize-handle t-resize-<#= data #>'></div>")
    };

    function createWindow(element, options) {
        var contentHtml = $(element);

        if (typeof (options.scrollable) != "undefined" && options.scrollable === false) {
            contentHtml.attr("style", "overflow:hidden;");
        }

        if (options.contentUrl && !isLocalUrl(options.contentUrl)) {
            contentHtml.html(templates.iframe(options));
        }

        $(templates.wrapper(options))
            .append(templates.titlebar(options))
            .append(contentHtml)
            .appendTo(document.body);
    }

    function WindowResizing(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: ".t-resize-handle",
            group: wnd.wrapper.id + "-resizing",
            dragstart: $.proxy(that.dragstart, that),
            drag: $.proxy(that.drag, that),
            dragend: $.proxy(that.dragend, that)
        });
    }

    WindowResizing.prototype = /** @ignore */ {
        dragstart: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wnd.elementPadding = parseInt(wnd.wrapper.css("padding-top"));
            wnd.initialCursorPosition = wrapper.offset();

            wnd.resizeDirection = e.currentTarget.prop("className").replace("t-resize-handle t-resize-", "").split("");

            wnd.initialSize = {
                width: wnd.wrapper.width(),
                height: wnd.wrapper.height()
            };

            $("<div class='t-overlay' />").appendTo(wnd.wrapper);

            wrapper.find(".t-resize-handle").not(e.currentTarget).hide();

            $(document.body).css("cursor", e.currentTarget.css("cursor"));
        },
        drag: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper,
                resizeHandlers = {
                    "e": function () {
                        var width = e.pageX - wnd.initialCursorPosition.left;

                        wrapper.width((width < wnd.options.minWidth ? wnd.options.minWidth
                                    : (wnd.options.maxWidth && width > wnd.options.maxWidth) ? wnd.options.maxWidth
                                    : width));
                    },
                    "s": function () {
                        var height = e.pageY - wnd.initialCursorPosition.top - wnd.elementPadding;

                        wrapper
                            .height((height < wnd.options.minHeight ? wnd.options.minHeight
                                : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                : height));
                    },
                    "w": function () {
                        var windowRight = wnd.initialCursorPosition.left + wnd.initialSize.width,
                            width = windowRight - e.pageX;

                        /// TODO: use Math.min / Math.max to sort these out
                        wrapper.css({
                            left: e.pageX > (windowRight - wnd.options.minWidth) ? windowRight - wnd.options.minWidth
                                : e.pageX < (windowRight - wnd.options.maxWidth) ? windowRight - wnd.options.maxWidth
                                : e.pageX,
                            width: (width < wnd.options.minWidth ? wnd.options.minWidth
                                   : (wnd.options.maxWidth && width > wnd.options.maxWidth) ? wnd.options.maxWidth
                                   : width)
                        })
                    },
                    "n": function () {
                        var windowBottom = wnd.initialCursorPosition.top + wnd.initialSize.height,
                            height = windowBottom - e.pageY;

                        /// TODO: use Math.min / Math.max to sort these out
                        wrapper.css({
                            top: e.pageY > (windowBottom - wnd.options.minHeight) ? windowBottom - wnd.options.minHeight
                               : e.pageY < (windowBottom - wnd.options.maxHeight) ? windowBottom - wnd.options.maxHeight
                               : e.pageY,
                            height: (height < wnd.options.minHeight ? wnd.options.minHeight
                                  : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                  : height)
                        });
                    }
                };

            $.each(wnd.resizeDirection, function () {
                resizeHandlers[this]();
            });

            fixIE6Sizing(wrapper);

            wnd.trigger(RESIZE);
        },
        dragend: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wrapper
                .find(TOVERLAY).remove().end()
                .find(".t-resize-handle").not(e.currentTarget).show();

            $(document.body).css("cursor", "");

            if (e.keyCode == 27) {
                fixIE6Sizing(wrapper);
                wrapper.css(wnd.initialCursorPosition)
                    .css(wnd.initialSize);
            }

            return false;
        }
    };

    function WindowDragging(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: TWINDOWTITLEBAR,
            group: wnd.wrapper.id + "-moving",
            dragstart: $.proxy(that.dragstart, that),
            drag: $.proxy(that.drag, that),
            dragend: $.proxy(that.dragend, that)
        });
    }

    WindowDragging.prototype = /** @ignore */{
        dragstart: function (e) {
            var wnd = this.owner;

            wnd.initialWindowPosition = wnd.wrapper.position();

            wnd.startPosition = {
                left: e.pageX - wnd.initialWindowPosition.left,
                top: e.pageY - wnd.initialWindowPosition.top
            };

            $(".t-resize-handle", wnd.wrapper).hide();

            $("<div class='t-overlay' />").appendTo(wnd.wrapper);

            $(document.body).css("cursor", e.currentTarget.css("cursor"));
        },
        drag: function (e) {
            var wnd = this.owner, 
                coordinates = {
                    left: e.pageX - wnd.startPosition.left,
                    top: Math.max(e.pageY - wnd.startPosition.top, 0)
                };

            $(wnd.wrapper).css(coordinates);
        },
        dragend: function (e) {
            var wnd = this.owner;

            wnd.wrapper
                .find(".t-resize-handle").show().end()
                .find(TOVERLAY).remove();

            $(document.body).css("cursor", "");

            if (e.keyCode == 27) {
                e.currentTarget.closest(TWINDOW).css(wnd.initialWindowPosition);
            }

            return false;
        }
    };

    kendo.ui.plugin("Window", Window);

})(jQuery, window);
