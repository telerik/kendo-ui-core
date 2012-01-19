(function ($, undefined) {
    /**
     * @name kendo.ui.Window.Description
     *
     * @section
     * <p>
     *  A <strong>Window</strong> displays content in a modal or non-modal HTML window. By default, a
     *  <strong>Window</strong> can be moved, resized, and closed. Its content can also be defined with either as
     *  static HTML or loaded dynamically via AJAX.
     * </p>
     * <p>
     *  A <strong>Window</strong> can be initialized from virtually any DOM element. During initialization, the
     *  targeted content will automatically be wrapped in the div element of the <strong>Window</strong>.
     * </p>
     * <h3>Getting Started</h3>
     *
     * @exampleTitle Create a simple HTML element with the Window content
     * @example
     * <p id="window">
     *     Content of the Window
     * </p>
     *
     * @exampleTitle Initialize the Window using a selector
     * @example
     * $(document).ready(function() {
     *     $("#window").kendoWindow();
     * });
     *
     * @section
     * <p>
     *  When a <strong>Window</strong> is initialized, it will automatically be displayed open near the location of the
     *  DOM element that was used to initialize the content.
     * </p>
     * <h3>Configuring Window Behaviors</h3>
     * <p>
     *  A <strong>Window</strong> provides many configuration options that can be easily set during initialization.
     *  Among the properties that can be controlled:
     * </p>
     * <ul>
     *  <li>Minimum height/width</li>
     *  <li>Available user actions (close/refresh/maximize/minimize)</li>
     *  <li>Title</li>
     *  <li>Draggable and resizable behaviors</li>
     * </ul>
     *
     * @exampleTitle Create a modal Window with all user actions enabled
     * @example
     * $("#window").kendoWindow({
     *     actions: ["Refresh", "Maximize", "Minimize", "Close"],
     *     draggable: false,
     *     height: "300px",
     *     modal: true,
     *     resizable: false,
     *     title: "Modal Window",
     *     width: "500px"
     * });
     *
     * @section
     * <p>
     *  The order of the values in the actions array determines the order in which the action buttons will be rendered
     *  in the title of a <strong>Window</strong>. The maximize action serves both as a button for expanding a
     *  <strong>Window</strong> to fill the screen and as a button to restore a <strong>Window</strong> to its previous
     *  size. The minimize action collapses a <strong>Window</strong> to its title.
     * </p>
     * <h3>Positioning and Opening a Window</h3>
     * <p>
     *  In some scenarios, it is preferable to center a <strong>Window</strong> rather than open it near the HTML
     *  element used to define the content. It is also common to open a <strong>Window</strong> as the result of the
     *  action of a user rather than on the load event of a page. The <strong>Window</strong> API provides methods for
     *  handling these scenarios.
     * </p>
     *
     * @exampleTitle Centering a Window and opening on button click
     * @example
     * <p id="window">
     *     Content of the Window
     * </p>
     * <button id="openButton">Open Window</button>
     *
     * @exampleTitle Initialize Window, center, and configure button click action
     * @example
     * $(document).ready(function(){
     *     var window = $("#window").kendoWindow({
     *         height: "200px",
     *         title: "Centered Window",
     *         visible: false,
     *         width: "200px"
     *     }).data("kendoWindow");
     * });
     *
     * $("#openButton").click(function(){
     *     var window = $("#window").data("kendoWindow");
     *     window.center();
     *     window.open();
     * });
     *
     * @section
     * <h3>Loading Window content with Ajax</h3>
     * <p>
     *  A <strong>Window</strong> provides built-in support for asynchronously loading content from a URL. This URL
     *  should return a HTML fragment that can be loaded in a Window content area.
     * </p>
     *
     * @exampleTitle Load Window content asynchronously
     * @example
     * <div id="window"></div>
     *
     * @exampleTitle Initialize window and configure content loading
     * @example
     * $(document).ready(function(){
     *     $("#window").kendoWindow({
     *         content: "html-content-snippet.html",
     *         title: "Async Window Content"
     *     });
     * });
     *
     * @section
     * <h3>Accessing an Existing Window</h3>
     * <p>
     *  You can reference an existing <b>Window</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>. Once a reference has been established, you can
     *  use the API to control its behavior. 
     * </p>
     *
     * @exampleTitle Accessing an existing Window instance
     * @example
     * var window = $("#window").data("kendoWindow");
     *
     */
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        fx = kendo.fx,
        isPlainObject = $.isPlainObject,
        proxy = $.proxy,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        body,
        templates,
        // classNames
        KWINDOW = ".k-window",
        KWINDOWTITLEBAR = ".k-window-titlebar",
        KWINDOWCONTENT = ".k-window-content",
        KWINDOWRESIZEHANDLES = ".k-resize-handle",
        KOVERLAY = ".k-overlay",
        KCONTENTFRAME = "k-content-frame",
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
        DRAGSTART = "dragstart",
        DRAGEND = "dragend",
        ERROR = "error",
        OVERFLOW = "overflow",
        ZINDEX = "zIndex",
        MINIMIZE_MAXIMIZE = ".k-window-actions .k-minimize,.k-window-actions .k-maximize",
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
         * @option {String} [content.template] Template for the window content.
         * @option {Boolean} [iframe] Explicitly states whether content iframe should be created.
         * @option {Boolean} [resizable] <true> Specifies whether the users may to resize the window.
         * @option {Array<String>} [actions] <["Close"]> The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize", "Maximize".
         * @option {String} [title] The text in the window title bar. If <code>false</code>, the title bar will be hidden.
         * @option {Object} [animation] A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the widget.
         * @option {Animation} [animation.open] The animation that will be used when the window opens.
         * @option {Animation} [animation.close] The animation that will be used when the window closes.
         */
        init: function(element, options) {
            var that = this,
                wrapper,
                titleBar, offset,
                isVisible = false,
                content;

            body = document.body;

            Widget.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;
            content = options.content;

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
            }

            if (!isPlainObject(content)) {
                content = options.content = { url: content };
            }

            if (typeof options.iframe == "undefined") {
                options.iframe = content.url && !isLocalUrl(content.url);
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
            }

            if (offset) {
                if (isVisible) {
                    wrapper.css({
                        top: offset.top,
                        left: offset.left
                    });
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

            wrapper.on({
                mouseenter: function () { $(this).addClass(KHOVERSTATE); },
                mouseleave: function () { $(this).removeClass(KHOVERSTATE); },
                click: proxy(that._windowActionHandler, that)
            }, ".k-window-titlebar .k-window-action");

            if (options.resizable) {
                wrapper.on("dblclick", KWINDOWTITLEBAR, proxy(that.toggleMaximization, that));

                each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            wrapper.add(wrapper.find(".k-resize-handle,.k-window-titlebar"))
                .on("mousedown", proxy(that.toFront, that));

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
                 * Fires when the user starts to move the window.
                 * @name kendo.ui.Window#dragstart
                 * @event
                 * @param {Event} e
                 */
                DRAGSTART,
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

            if (!options.iframe && content.url) {
                that._ajaxRequest(content);
            } else if (content.template) {
                element.html(template(content.template)({}));
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
            minWidth: 90,
            minHeight: 50,
            maxWidth: Infinity,
            maxHeight: Infinity,
            visible: true
        },

        _overlay: function (visible) {
            var overlay = $("body > .k-overlay"),
                doc = $(document),
                wrapper = this.wrapper;

            if (overlay.length == 0) {
                overlay = $("<div class='k-overlay' />");
            }

            overlay
                .insertBefore(wrapper[0])
                .toggle(visible)
                .css(ZINDEX, parseInt(wrapper.css(ZINDEX)) - 1);

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
         * @param {String} title The new window title. If <code>false</code>, the title bar will be hidden.
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the title
         * var title = wnd.title();
         *
         * // set the title
         * wnd.title("New title");
         *
         * // remove the title bar
         * wnd.title(false);
         */
        title: function (text) {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                titleBar = wrapper.find(KWINDOWTITLEBAR),
                title = titleBar.children(".k-window-title"),
                titleBarHeight = titleBar.outerHeight();

            if (arguments.length == 0) {
                return title.text();
            }

            if (text === false) {
                wrapper.addClass("k-window-titleless");
                titleBar.remove();
            } else {
                if (titleBar.length == 0) {
                    wrapper.prepend(templates.titlebar(extend(templates, options)));
                }

                wrapper.css("padding-top", titleBarHeight);
                titleBar.css("margin-top", -titleBarHeight);
            }

            title.text(text);

            return that;
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
                that.toFront();

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
                showOptions = options.animation.open,
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
                zIndex = +wrapper.css(ZINDEX);

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

            wrapper.css(ZINDEX, zIndex + 2);
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
                .find(".k-window-titlebar .k-restore").parent().remove().end().end()
                .find(MINIMIZE_MAXIMIZE).parent().show();

            $("html, body").css(OVERFLOW, "");

            options.isMaximized = options.isMinimized = false;

            that.trigger(RESIZE);

            return that;
        },

        /**
         * Maximizes a window so that it fills the entire screen.
         * @function
         */
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

            $("html, body").css(OVERFLOW, "hidden");

            that.options.isMaximized = true;

            that._onDocumentResize();
        }),

        /**
         * Minimizes a window to its title bar.
         * @function
         */
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
         * @param {String} options.template A template to be used for displaying the requested data
         * @example
         * var windowObject = $("#window").data("kendoWindow");
         * windowObject.refresh("/feedbackForm");
         *
         * windowObject.refresh({
         *     url: "/feedbackForm",
         *     data: { userId: 42 }
         * });
         *
         * windowObject.refresh({
         *     url: "/userInfo",
         *     data: { userId: 42 },
         *     template: "Hello, #= firstName # #= lastName #"
         * });
         */
        refresh: function (options) {
            if (!isPlainObject(options)) {
                options = { url: options };
            }

            var that = this,
                iframe,
                url = options.url = options.url || that.options.content.url;

            if (!that.options.iframe) {
                that._ajaxRequest(options);
            } else {
                iframe = $(that.element).find("." + KCONTENTFRAME)[0];
                if (iframe) {
                    iframe.src = url || iframe.src;
                }
            }

            return that;
        },

        _ajaxRequest: function (options) {
            var that = this,
                contentTemplate = options.template,
                refreshIcon = that.wrapper.find(".k-window-titlebar .k-refresh"),
                loadingIconTimeout = setTimeout(function () {
                    refreshIcon.addClass(LOADING);
                }, 100);

            $.ajax(extend({
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
                    if (contentTemplate) {
                        data = template(contentTemplate)(data || {});
                    }

                    that.element.html(data);

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
        action: template(
            "<a href='\\#' class='k-window-action k-link'>" +
                "<span class='k-icon k-#= name.toLowerCase() #'>#= name #</span>" +
            "</a>"
        ),
        titlebar: template(
            "<div class='k-window-titlebar k-header'>&nbsp;" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions k-header'>" +
                "# for (var i = 0; i < actions.length; i++) { #" +
                    "#= action({ name: actions[i] }) #" +
                "# } #" +
                "</div>" +
            "</div>"
        ),
        overlay: "<div class='k-overlay' />",
        contentFrame: template(
            "<iframe src='#= content.url #' title='#= title #' frameborder='0'" +
                " class='" + KCONTENTFRAME + "'>" +
                    "This page requires frames in order to show content" +
            "</iframe>"
        ),
        resizeHandle: template("<div class='k-resize-handle k-resize-#= data #'></div>")
    };

    function createWindow(element, options) {
        var contentHtml = $(element),
            wrapper;

        if (options.scrollable === false) {
            contentHtml.attr("style", "overflow:hidden;");
        }

        if (options.iframe) {
            contentHtml.html(templates.contentFrame(options));
        }

        wrapper = $(templates.wrapper(options));

        if (options.title !== false) {
            wrapper.append(templates.titlebar(extend(templates, options)))
        }

        wrapper
            .append(contentHtml)
            .appendTo(body);
    }

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
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).hide();

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
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).show();

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
                element = wnd.element,
                actions = element.find(".k-window-actions");

            wnd.trigger(DRAGSTART);

            wnd.initialWindowPosition = wnd.wrapper.position();

            wnd.startPosition = {
                left: e.pageX - wnd.initialWindowPosition.left,
                top: e.pageY - wnd.initialWindowPosition.top
            };

            if (actions.length > 0) {
                wnd.minLeftPosition = actions.outerWidth() + parseInt(actions.css("right"), 10) - element.outerWidth();
            } else {
                wnd.minLeftPosition =  20 - element.outerWidth(); // at least 20px remain visible
            }

            wnd.wrapper
                .append(templates.overlay)
                .find(KWINDOWRESIZEHANDLES).hide();

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
                .find(KWINDOWRESIZEHANDLES).show().end()
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
