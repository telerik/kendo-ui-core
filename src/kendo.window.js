(function ($, undefined) {
    /**
     * @name kendo.ui.Window.Description
     *
     * @section
     *  <p>
     *      The Window widget displays content in a modal or non-modal HTML window. By default, Windows can be moved,
     *      resized, and closed by users. Window content can also be defined with either static HTML or loaded dynamically with Ajax.
     *  </p>
     *  <p>
     *      A Window can be initialized from virtually any HTML element. During initialization, the targeted content will
     *      automatically be wrapped in the Window’s HTML div element.
     *  </p>
     *  <h3>Getting Started</h3>
     * @exampleTitle Create a simple HTML element with the Window content
     * @example
     *  <p id="window">
     *      Kendo window content
     *  </p>
     * @exampleTitle Initialize Window using a jQuery selector
     * @example
     * $("#window").kendoWindow();
     * @section
     *  <p>
     *      When a Window is initialized, it will automatically be displayed open near the
     *      location of the HTML element that was used to initialize the content.
     *  </p>
     *  <h3>Configuring Window behaviors</h3>
     *  <p>
     *      Window provides many configuration options that can be easily set during initialization.
     *      Among the properties that can be controlled:
     *  </p>
     *  <ul>
     *      <li>Minimum height/width</li>
     *      <li>Available user Window actions (close/refresh/maximize/minimize)</li>
     *      <li>Window title</li>
     *      <li>Draggable and Resizable behaviors</li>
     *  </ul>
     * @exampleTitle Create modal Window with all user actions enabled
     * @example
     *  $("#window").kendoWindow({
     *      draggable: false,
     *      resizable: false,
     *      width: "500px",
     *      height: "300px",
     *      title: "Modal Window",
     *      modal: true,
     *      actions: ["Refresh", "Maximize", "Minimize", "Close"]
     *  });
     * @section
     *  <p>
     *      The order of the values in the actions array determines the order in which the action buttons
     *      will be rendered in the Window title bar. The maximize action serves both as a button for expanding
     *      the Window to fill the screen and as a button to restore the Window to the previous size. The minimize
     *      action collapses the window to its title.
     *  </p>
     *  <h3>Positioning and Opening the Window</h3>
     *  <p>
     *      In some scenarios, it is preferable to center a Window rather than open it near the HTML element
     *      used to define the content. It’s also common to open a Window as the result of an action rather
     *      than on initial page load. The Window API provides methods for handling this and many more advanced
     *      Window scenarios. Please see the Window demo Methods tab for more details.
     *  </p>
     * @exampleTitle Centering a Window and opening on button click
     * @example
     *  <!-- Create Window HTML and a button to open Window -->
     *  <p id="window">
     *      Centered Kendo UI Window content
     *  </p>
     *  <button id="btnOpen">Open Window</button>
     * @exampleTitle
     * @example
     *  // Initialize Window, center, and configure button click action
     *  $(document).ready(function(){
     *      var window = $("#window").kendoWindow({
     *              title: "Centered Window",
     *              width: "200px",
     *              height: "200px",
     *              visible: false
     *          }).data("kendoWindow");
     *  });
     *
     *  $("#btnOpen").click(function(){
     *      var window = $("#window").data("kendoWindow");
     *      window.center();
     *      window.open();
     *  });
     * @section
     *  <h3>Loading Window content with Ajax</h3>
     *  <p>
     *      While any valid technique for loading Ajax content can be used, Window provides
     *      built-in support for asynchronously loading content from a URL. This URL should
     *      return a HTML fragment that can be loaded in a Window content area.
     *  </p>
     * @exampleTitle Load Window content asynchronously
     * @example
     *  <!-- Define a basic HTML element for the Window -->
     *  <div id="window"></div>
     * @exampleTitle
     * @example
     *  // Initialize window and configure content loading
     *  $(document).ready(function(){
     *      $("#window").kendoWindow({
     *        title: "Async Window Content",
     *        content: "html-content-snippet.html"
     *      });
     *  });
     */
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        fx = kendo.fx,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        each = $.each,
        template = kendo.template,
        body,
        templates,
        // classNames
        KWINDOW = ".k-window",
        KWINDOWTITLEBAR = ".k-window-titlebar",
        KWINDOWCONTENT = ".k-window-content",
        KOVERLAY = ".k-overlay",
        LOADING = "k-loading",
        KHOVERSTATE = "k-state-hover",
        // constants
        VISIBLE = ":visible",
        CURSOR = "cursor",
        // events
        OPEN = "open",
        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",
        CLOSE = "close",
        REFRESH = "refresh",
        RESIZE = "resize",
        DRAGEND = "dragend",
        ERROR = "error",
        OVERFLOW = "overflow",
        isLocalUrl = kendo.isLocalUrl;

    function windowObject(element) {
        return element.children(KWINDOWCONTENT).data("kendoWindow");
    }

    function openedModalWindows() {
        return $(KWINDOW).filter(function() {
            var wnd = $(this);
            return wnd.is(VISIBLE) && windowObject(wnd).options.modal;
        });
    }


    var Window = Widget.extend(/** @lends kendo.ui.Window.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [modal] <false> Specifies whether the window should block interaction with other page elements.
         * @option {Boolean} [visible] <true> Specifies whether the window will be initially visible.
         * @option {Boolean} [draggable] <true> Specifies whether the users may move the window.
         * @option {Boolean} [resizable] <true> Specifies whether the users may to resize the window.
         * @option {Integer} [minWidth] <50> The minimum width that may be achieved by resizing the window.
         * @option {Integer} [minHeight] <50> The minimum height that may be achieved by resizing the window.
         * @option {Object|String} [content] Specifies a URL or request options that the window should load its content from. For remote URLs, a container iframe element is automatically created.
         * @option {Array<String>} [actions] <["Close"]> The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize", "Maximize".
         * @option {String} [title] The text in the window title bar.
         * @option {Object} [animation] A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the widget.
         * @option {Animation} [animation.open] The animation that will be used when the window opens.
         * @option {Animation} [animation.close] The animation that will be used when the window closes.
         */
        init: function(element, options) {
            var that = this,
                wrapper,
                windowActions = ".k-window-titlebar .k-window-action",
                titleBar, offset,
                isVisible = false;

            body = document.body;

            Widget.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
            }

            if (!element.parent().is("body")) {
                if (element.is(VISIBLE)) {
                    offset = element.offset();
                    isVisible = true;
                } else {
                    var visibility = element.css("visibility"),
                        display = element.css("display");

                    element.css({ visibility: "hidden", display: "" });
                    offset = element.offset();

                    element.css({ visibility: visibility, display: display });
                }
            }

            wrapper = that.wrapper = element.closest(KWINDOW);

            if (!element.is(".k-content") || !wrapper[0]) {
                element.addClass("k-window-content k-content");
                createWindow(element, options);
                wrapper = that.wrapper = element.closest(KWINDOW);

                titleBar = that.wrapper.find(KWINDOWTITLEBAR);
                titleBar.css("margin-top", -titleBar.outerHeight());

                wrapper.css("padding-top", titleBar.outerHeight());

                if (options.width) {
                    wrapper.width(options.width);
                }

                if (options.height) {
                    wrapper.height(options.height);
                }

                $.each(["minWidth","minHeight","maxWidth","maxHeight"], function(_, prop) {
                    var value = options[prop];
                    if (value && value != Infinity) {
                        wrapper.css(prop, value);
                    }
                });

                if (!options.visible) {
                    wrapper.hide();
                }
            }

            if (offset) {
                if (isVisible) {
                    wrapper.css({ top: offset.top, left: offset.left });
                } else {
                   wrapper
                    .css({
                        top: offset.top,
                        left: offset.left,
                        visibility: "visible",
                        display: "none"
                    });
                }
            }

            wrapper.toggleClass("k-rtl", that.wrapper.closest(".k-rtl").length)
                   .appendTo(body);

            that.toFront();

            if (options.modal) {
                that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
            }

            wrapper
                .delegate(windowActions, "mouseenter", function () { $(this).addClass(KHOVERSTATE); })
                .delegate(windowActions, "mouseleave", function () { $(this).removeClass(KHOVERSTATE); })
                .delegate(windowActions, "click", proxy(that._windowActionHandler, that));

            if (options.resizable) {
                wrapper.delegate(KWINDOWTITLEBAR, "dblclick", proxy(that.toggleMaximization, that));

                each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            wrapper.add(wrapper.find(".k-resize-handle,.k-window-titlebar"))
                .bind("mousedown", proxy(that.toFront, that));

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
                 * Fires when the window has finished its closing animation
                 * @name kendo.ui.Window#deactivate
                 * @event
                 * @param {Event} e
                 */
                DEACTIVATE,
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
                 * Fires when the window has been moved by the user.
                 * @name kendo.ui.Window#dragend
                 * @event
                 * @param {Event} e
                 */
                DRAGEND,
                /**
                 * Fires when an AJAX request for content fails.
                 * @name kendo.ui.Window#error
                 * @event
                 * @param {Event} e
                 */
                ERROR
            ], options);

            $(window).resize(proxy(that._onDocumentResize, that));

            if (!$.isPlainObject(options.content)) {
                options.content = { url: options.content };
            }

            if (isLocalUrl(options.content.url)) {
                that._ajaxRequest(options.content);
            }

            if (wrapper.is(VISIBLE)) {
                that.trigger(OPEN);
                that.trigger(ACTIVATE);
            }
        },

        options: {
            name: "Window",
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
            maxWidth: Infinity,
            maxHeight: Infinity,
            visible: true
        },

        _overlay: function (visible) {
            var overlay = $("body > .k-overlay"),
                doc = $(document),
                wrapper = this.wrapper[0];

            if (overlay.length == 0) {
                overlay = $("<div class='k-overlay' />")
                    .toggle(visible)
                    .insertBefore(wrapper);
            } else {
                overlay.insertBefore(wrapper).toggle(visible);
            }

            return overlay;
        },

        _windowActionHandler: function (e) {
            var target = $(e.target).closest(".k-window-action").find(".k-icon"),
                that = this;

            each({
                "k-close": that.close,
                "k-maximize": that.maximize,
                "k-minimize": that.minimize,
                "k-restore": that.restore,
                "k-refresh": that.refresh
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
         * @param {String} title The new window title
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
            var title = $(".k-window-titlebar > .k-window-title", this.wrapper);

            if (!text) {
                return title.text();
            }

            title.text(text);
            return this;
        },

        /**
         * Sets/gets the window content.
         * @param {String} content The new window content
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the content
         * var content = wnd.content();
         *
         * // set the content
         * wnd.content("&lt;p&gt;New content&lt;/p&gt;");
         */
        content: function (html) {
            var content = this.wrapper.children(KWINDOWCONTENT);

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
                showOptions = that.options.animation.open,
                contentElement = wrapper.children(KWINDOWCONTENT),
                initialOverflow = contentElement.css(OVERFLOW);

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

                if (!wrapper.is(VISIBLE)) {
                    contentElement.css(OVERFLOW, "hidden");
                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: function() {
                            that.trigger(ACTIVATE);
                            contentElement.css(OVERFLOW, initialOverflow);
                        }
                    });
                }

                that.toFront();
            }

            if (that.options.isMaximized) {
               $("html, body").css(OVERFLOW, "hidden");
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
                hideOptions = options.animation.close,
                modalWindows,
                shouldHideOverlay, overlay;

            if (wrapper.is(VISIBLE) && !that.trigger(CLOSE)) {
                modalWindows = openedModalWindows();

                shouldHideOverlay = options.modal && modalWindows.length == 1;

                overlay = options.modal ? that._overlay(true) : $(undefined);

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
                } else if (modalWindows.length) {
                    windowObject(modalWindows.eq(modalWindows.length - 2))._overlay(true);
                }

                wrapper.kendoStop().kendoAnimate({
                    effects: hideOptions.effects,
                    duration: hideOptions.duration,
                    complete: function() {
                        wrapper.hide();
                        that.trigger(DEACTIVATE);
                    }
                });
            }

            if (that.options.isMaximized) {
                $("html, body").css(OVERFLOW, "");
            }

            return that;
        },

        /**
         * Brings the window on top of other windows.
         */
        toFront: function () {
            var that = this,
                wrapper = that.wrapper,
                currentWindow = wrapper[0],
                zIndex = +wrapper.css("zIndex");

            $(KWINDOW).each(function(i, element) {
                var windowObject = $(element),
                    zIndexNew = windowObject.css("zIndex"),
                    contentElement = windowObject.find(".k-window-content");

                if (!isNaN(zIndexNew)) {
                    zIndex = Math.max(+zIndexNew, zIndex);
                }

                // Add overlay to windows with iframes and lower z-index to prevent
                // trapping of events when resizing / dragging
                if (element != currentWindow && contentElement.find("> .k-content-frame").length > 0) {
                    contentElement.append(templates.overlay);
                }
            });

            wrapper.css("zIndex", zIndex + 2)
            that.element.find("> .k-overlay").remove();

            return that;
        },

        /**
         * Toggles the window between a maximized and restored state.
         */
        toggleMaximization: function () {
            return this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        /**
         * Restores a maximized / minimized window to its previous size.
         */
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
                .find(".k-window-titlebar .k-restore").addClass("k-maximize").removeClass("k-restore");

            $("html, body").css(OVERFLOW, "");

            options.isMaximized = false;

            that.trigger(RESIZE);

            return that;
        },

        /**
         * Maximizes a window so that it fills the entire screen.
         */
        maximize: function () {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                position;

            if (options.isMaximized) {
                return;
            }

            position = wrapper.position();

            that.restoreOptions = {
                left: position.left,
                top: position.top,
                width: wrapper.width(),
                height: wrapper.height()
            };

            wrapper
                .css({ left: 0, top: 0, position: "fixed" })
                .find(".k-resize-handle").hide().end()
                .find(".k-window-titlebar .k-maximize").addClass("k-restore").removeClass("k-maximize");

            $("html, body").css(OVERFLOW, "hidden");

            options.isMaximized = true;

            that._onDocumentResize();

            return that;
        },

        /**
         * Minimizes a window to its title bar.
         */
        minimize: function () {
            var that = this,
                wrapper = that.wrapper,
                position,
                options = that.options;

            if (options.isMinimized) {
                return;
            }

            position = wrapper.position();

            that.restoreOptions = {
                left: position.left,
                top: position.top,
                width: wrapper.width(),
                height: wrapper.height()
            };

            wrapper
                .css("minHeight", 0)
                .find(".k-window-content,.k-resize-handle").hide().end()
                .find(".k-window-titlebar .k-minimize").addClass("k-restore").removeClass("k-minimize");

            options.isMinimized = true;

            return that;
        },

        _onDocumentResize: function () {
            var that = this,
                wrapper = that.wrapper,
                wnd = $(window);

            if (!that.options.isMaximized) {
                return;
            }

            wrapper.css({
                    width: wnd.width(),
                    height: wnd.height()
                });

            that.trigger(RESIZE);
        },

        /**
         * Refreshes the window content from a remote url.
         * @param {Object|String} options Options for requesting data from the server. If omitted, the window uses the <code>content</code> property that was supplied when the window was created. Any options specified here are passed to the jQuery.ajax call.
         * @param {String} options.url The server URL that will be requested.
         * @param {Object} options.data A JSON object containing the data that will be passed to the server.
         * @param {String} options.type The request method ("GET", "POST").
         * @example
         * var windowObject = $("#window").data("kendoWindow");
         * windowObject.refresh("/feedbackForm");
         * windowObject.refresh({
         *     url: "/feedbackForm",
         *     data: { userId: 42 }
         * });
         */
        refresh: function (options) {
            if (!$.isPlainObject(options)) {
                options = { url: options };
            }

            var that = this,
                url = options.url = options.url || that.options.content.url;

            if (isLocalUrl(url)) {
                that._ajaxRequest(options);
            }

            return that;
        },

        _ajaxRequest: function (options) {
            var that = this,
                refreshIcon = that.wrapper.find(".k-window-titlebar .k-refresh"),
                loadingIconTimeout = setTimeout(function () {
                    refreshIcon.addClass(LOADING);
                }, 100);

            $.ajax($.extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: proxy(function (xhr, status) {
                    that.trigger(ERROR);
                }, that),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    refreshIcon.removeClass(LOADING);
                },
                success: proxy(function (data, textStatus) {
                    that.wrapper.children(KWINDOWCONTENT).html(data);

                    that.trigger(REFRESH);
                }, that)
            }, that.options.content, options));
        },

        /**
         * Destroys the window and its modal overlay, if necessary. Useful for removing modal windows.
         */
        destroy: function () {
            var that = this,
                modalWindows,
                shouldHideOverlay;

            that.wrapper.remove();

            modalWindows = openedModalWindows();

            shouldHideOverlay = that.options.modal && !modalWindows.length;

            if (shouldHideOverlay) {
                that._overlay(false).remove();
            } else if (modalWindows.length > 0) {
                windowObject(modalWindows.eq(modalWindows.length - 2))._overlay(true);
            }
        }
    });

    templates = {
        wrapper: template("<div class='k-widget k-window' />"),
        titlebar: template(
            "<div class='k-window-titlebar k-header'>&nbsp;" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions k-header'>" +
                "# for (var i = 0; i < actions.length; i++) { #" +
                    "<a href='\\#' class='k-window-action k-link'>" +
                        "<span class='k-icon k-#= actions[i].toLowerCase() #'>#= actions[i] #</span>" +
                    "</a>" +
                "# } #" +
                "</div>" +
            "</div>"
        ),
        overlay: "<div class='k-overlay' />",
        iframe: template(
            "<iframe src='#= content #' title='#= title #' frameborder='0'" +
                " class='k-content-frame'>" +
                    "This page requires frames in order to show content" +
            "</iframe>"
        ),
        resizeHandle: template("<div class='k-resize-handle k-resize-#= data #'></div>")
    };

    function createWindow(element, options) {
        var contentHtml = $(element);

        if (typeof (options.scrollable) != "undefined" && options.scrollable === false) {
            contentHtml.attr("style", "overflow:hidden;");
        }

        if (options.content && !isLocalUrl(options.content)) {
            contentHtml.html(templates.iframe(options));
        }

        $(templates.wrapper(options))
            .append(templates.titlebar(options))
            .append(contentHtml)
            .appendTo(body);
    }

    function WindowResizing(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: ".k-resize-handle",
            group: wnd.wrapper.id + "-resizing",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    }

    WindowResizing.prototype = /** @ignore */ {
        dragstart: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wnd.elementPadding = parseInt(wnd.wrapper.css("padding-top"));
            wnd.initialCursorPosition = wrapper.offset();

            wnd.resizeDirection = e.currentTarget.prop("className").replace("k-resize-handle k-resize-", "").split("");

            wnd.initialSize = {
                width: wnd.wrapper.width(),
                height: wnd.wrapper.height()
            };

            wrapper
                .append(templates.overlay)
                .find(".k-resize-handle").not(e.currentTarget).hide();

            $(body).css(CURSOR, e.currentTarget.css(CURSOR));
        },
        drag: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper,
                options = wnd.options,
                constrain = function(value, low, high) {
                    return Math.max(Math.min(value, high), low);
                },
                resizeHandlers = {
                    "e": function () {
                        var newWidth = e.pageX - wnd.initialCursorPosition.left;

                        wrapper.width(constrain(newWidth, options.minWidth, options.maxWidth));
                    },
                    "s": function () {
                        var newHeight = e.pageY - wnd.initialCursorPosition.top - wnd.elementPadding;

                        wrapper.height(constrain(newHeight, options.minHeight, options.maxHeight));
                    },
                    "w": function () {
                        var windowRight = wnd.initialCursorPosition.left + wnd.initialSize.width,
                            newWidth = constrain(windowRight - e.pageX, options.minWidth, options.maxWidth);

                        wrapper.css({
                            left: windowRight - newWidth,
                            width: newWidth
                        })
                    },
                    "n": function () {
                        var windowBottom = wnd.initialCursorPosition.top + wnd.initialSize.height,
                            newHeight = constrain(windowBottom - e.pageY, options.minHeight, options.maxHeight);

                        wrapper.css({
                            top: windowBottom - newHeight,
                            height: newHeight
                        });
                    }
                };

            each(wnd.resizeDirection, function () {
                resizeHandlers[this]();
            });

            wnd.trigger(RESIZE);
        },
        dragend: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wrapper
                .find(KOVERLAY).remove().end()
                .find(".k-resize-handle").not(e.currentTarget).show();

            $(body).css(CURSOR, "");

            if (e.keyCode == 27) {
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
            filter: KWINDOWTITLEBAR,
            group: wnd.wrapper.id + "-moving",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    }

    WindowDragging.prototype = /** @ignore */{
        dragstart: function (e) {
            var wnd = this.owner,
                $element = $(wnd.element);

            wnd.initialWindowPosition = wnd.wrapper.position();

            wnd.startPosition = {
                left: e.pageX - wnd.initialWindowPosition.left,
                top: e.pageY - wnd.initialWindowPosition.top
            };

            var actionsElement = $element.find(".k-window-actions");
            if (actionsElement.length > 0) {
                wnd.minLeftPosition = actionsElement.outerWidth() + parseInt(actionsElement.css("right"), 10) - $element.outerWidth();
            } else {
                wnd.minLeftPosition =  20 - $element.outerWidth(); // at least 20px remain visible
            }

            wnd.wrapper
                .append(templates.overlay)
                .find(".k-resize-handle").hide();

            $(body).css(CURSOR, e.currentTarget.css(CURSOR));
        },
        drag: function (e) {
            var wnd = this.owner,
                coordinates = {
                    left: Math.max(e.pageX - wnd.startPosition.left, wnd.minLeftPosition),
                    top: Math.max(e.pageY - wnd.startPosition.top, 0)
                };

            $(wnd.wrapper).css(coordinates);
        },
        dragend: function (e) {
            var wnd = this.owner;

            wnd.wrapper
                .find(".k-resize-handle").show().end()
                .find(KOVERLAY).remove();

            $(body).css(CURSOR, "");

            if (e.keyCode == 27) {
                e.currentTarget.closest(KWINDOW).css(wnd.initialWindowPosition);
            } else {
                wnd.trigger(DRAGEND);
            }

            return false;
        }
    };

    kendo.ui.plugin(Window);

})(jQuery);
