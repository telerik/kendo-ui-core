(function ($, window) {
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
     *      <li>Available user Window actions (close/refresh/maximize)</li>
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
	 *      actions: ["Refresh", "Maximize", "Close"]
     *  });
     * @section
     *  <p>
     *      The order of the values in the actions array determines the order in which the action buttons 
     *      will be rendered in the Window title bar. The maximize action serves both as a button for expanding 
     *      the Window to fill the screen and as a button to restore the Window to the previous size.
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
     *  //Initialize Window, center, and configure button click action-->
     *  $(document).ready(function(){
	 *      var window = $("#window").kendoWindow({
	 *		title: "Centered Window",
	 *		width: "200px",
	 *		height: "200px",
	 *		visible: false
	 *	}).data("kendoWindow");
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
     *  //Initialize and configure to load content async -->
     *  $(document).ready(function(){
	 *      $("#window").kendoWindow({
	 *        title: "Async Window Content",
	 *        contentUrl: "html-content-snippet.html"
	 *      });
     *  });
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
        ERROR = "error";

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
         * @option {Boolean} [modal] <false> Specifies whether the window should block interaction with other page elements.
         * @option {Boolean} [visible] <true> Specifies whether the window will be initially visible.
         * @option {Boolean} [draggable] <true> Specifies whether the users may move the window.
         * @option {Boolean} [resizable] <true> Specifies whether the users may to resize the window.
         * @option {Integer} [minWidth] <50> The minimum width that may be achieved by resizing the window.
         * @option {Integer} [minHeight] <50> The minimum height that may be achieved by resizing the window.
         * @option {String} [contentUrl] Specifies a URL that the window should load its content from. For remote URLs, a container iframe element is automatically created.
         * @option {Array<String>} [actions] <"Close"> The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize", "Maximize".
         * @option {String} [title] The text in the window title bar.
         * @option {Object} [animation] A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when the window opens.
         * @option {Animation} [animation.close] The animation that will be used when the window closes.
         */
        init: function(element, options) {
            var that = this,
                wrapper,
                windowActions = ".t-window-titlebar .t-window-action",
                titleBar, offset,
                isVisible = false;

            Component.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            if (!element.parent().is("body")) {
                if (element.is(":visible")) {
                    offset = element.offset();
                    isVisible = true;
                } else {
                    element.css({ visibility: "hidden", display: "" });
                    offset = element.offset();
                }
            }

            wrapper = that.wrapper = element.closest(TWINDOW);

            if (!element.is(".t-content") || !wrapper[0]) {
                element.addClass("t-window-content t-content");
                createWindow(element, options);
                wrapper = that.wrapper = element.closest(TWINDOW);

                titleBar = that.wrapper.find(TWINDOWTITLEBAR);
                titleBar.css("margin-top", -titleBar.outerHeight());

                wrapper.css("padding-top", titleBar.outerHeight());

                if (options.width) {
                    wrapper.width(options.width);
                }

                if (options.height) {
                    wrapper.height(options.height);
                }

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

            wrapper.toggleClass("t-rtl", that.wrapper.closest(".t-rtl").length > 0)
                   .appendTo(document.body);

            if (options.modal) {
                that._overlay(wrapper.is(":visible")).css({ opacity: 0.5 });
            }

            wrapper
                .delegate(windowActions, "mouseenter", function () { $(this).addClass('t-state-hover'); })
                .delegate(windowActions, "mouseleave", function () { $(this).removeClass('t-state-hover'); })
                .delegate(windowActions, "click", $.proxy(that._windowActionHandler, that));

            if (options.resizable) {
                wrapper.delegate(TWINDOWTITLEBAR, "dblclick", $.proxy(that.toggleMaximization, that));

                $.each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

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
                ERROR
            ], options);

            $(window).resize($.proxy(that._onDocumentResize, that));

            if (isLocalUrl(options.contentUrl)) {
                that._ajaxRequest(options.contentUrl);
            }

            if (wrapper.is(":visible")) {
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
        resizeHandle: template("<div class='t-resize-handle t-resize-<#= data #>'></div>")
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
