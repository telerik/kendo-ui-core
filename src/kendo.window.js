(function ($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        Draggable = kendo.ui.Draggable,
        fx = kendo.fx,
        //events
        OPEN = "open",
        ACTIVATED = "activated",
        CLOSE = "close",
        REFRESH = "refresh",
        RESIZE = "resize",
        ERROR = "error",
        LOAD = "load",
        MOVE = "move"

    function isLocalUrl(url) {
        return url && !(/^([a-z]+:)?\/\//i).test(url);
    }

    function fixIE6Sizing(element) {
        if ($.browser.msie && $.browser.version < 7) {
            element
                .find(".t-resize-e,.t-resize-w").css("height", element.height()).end()
                .find(".t-resize-n,.t-resize-s").css("width", element.width()).end()
                .find(".t-overlay").css({ width: element.width(), height: element.height() });
        }
    }

    function Window(element, options) {
        var that = this;
        Component.apply(that, arguments);
        that.options = options = $.extend({}, that.options, options);

        if (!that.element.is(".t-window")) {
            that.element.addClass("t-widget t-window");
            Window.create(that.element, options);
        }

        if (!that.element.parent().is("body")) {
            var offset;

            if (that.element.is(":visible")) {
                offset = that.element.offset();
                that.element.css({ top: offset.top, left: offset.left });
            } else {
                that.element.css({ visibility: "hidden", display: "" });
                offset = that.element.offset();
                that.element.css({ top: offset.top, left: offset.left })
                            .css({ visibility: "visible", display: "none" });
            }

            that.element
                .toggleClass("t-rtl", that.element.closest(".t-rtl").length > 0)
                .appendTo(document.body);
        }

        if (that.options.modal) {
            that.overlay(that.element.is(":visible")).css({ opacity: 0.5 });
        }

        var windowActions = ".t-window-titlebar .t-window-action";

        that.element
            .delegate(windowActions, "mouseenter", function () { $(this).addClass('t-state-hover'); })
            .delegate(windowActions, "mouseleave", function () { $(this).removeClass('t-state-hover'); })
            .delegate(windowActions, "click", $.proxy(this.windowActionHandler, that));

        if (that.options.resizable) {
            that.element
                .delegate(".t-window-titlebar", "dblclick", $.proxy(this.toggleMaximization, that))
                .append(Window.getResizeHandlesHtml());

            fixIE6Sizing(element);

            (function(wnd) {
                function dragstart(e) {
                    var element = wnd.element;

                    wnd.initialCursorPosition = element.offset();

                    wnd.resizeDirection = e.currentTarget.attr("className").replace("t-resize-handle t-resize-", "").split("");

                    wnd.initialSize = {
                        width: wnd.element.width(),
                        height: wnd.element.height()
                    };

                    wnd.outlineSize = {
                        left: wnd.element.outerWidth(),
                        top: wnd.element.outerHeight()
                    }

                    $("<div class='t-overlay' />").appendTo(wnd.element);

                    element.find(".t-resize-handle").not(e.currentTarget).hide();

                    $(document.body).css("cursor", e.currentTarget.css("cursor"));
                }

                function drag(e) {
                    var element = wnd.element;

                    var resizeHandlers = {
                        "e": function () {
                            var width = e.pageX - wnd.initialCursorPosition.left - wnd.outlineSize.left;
                            element.width((width < wnd.options.minWidth
                                                 ? wnd.options.minWidth
                                                 : (wnd.options.maxWidth && width > wnd.options.maxWidth)
                                                 ? wnd.options.maxWidth
                                                 : width));
                        },
                        "s": function () {
                            var height = e.pageY - wnd.initialCursorPosition.top - wnd.outlineSize.top;
                            wnd.element
                               .height((height < wnd.options.minHeight ? wnd.options.minHeight
                                       : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                       : height));
                        },
                        "w": function () {
                            var windowRight = wnd.initialCursorPosition.left + wnd.initialSize.width;

                            element.css("left", e.pageX > (windowRight - wnd.options.minWidth) ? windowRight - wnd.options.minWidth
                                              : e.pageX < (windowRight - wnd.options.maxWidth) ? windowRight - wnd.options.maxWidth
                                              : e.pageX);

                            var width = windowRight - e.pageX;
                            element.width((width < wnd.options.minWidth ? wnd.options.minWidth
                                                    : (wnd.options.maxWidth && width > wnd.options.maxWidth) ? wnd.options.maxWidth
                                                    : width));

                        },
                        "n": function () {
                            var windowBottom = wnd.initialCursorPosition.top + wnd.initialSize.height;

                            element.css("top", e.pageY > (windowBottom - wnd.options.minHeight) ? windowBottom - wnd.options.minHeight
                                             : e.pageY < (windowBottom - wnd.options.maxHeight) ? windowBottom - wnd.options.maxHeight
                                             : e.pageY);

                            var height = windowBottom - e.pageY;
                            element
                               .height((height < wnd.options.minHeight ? wnd.options.minHeight
                                       : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                       : height));
                        }
                    };

                    $.each(wnd.resizeDirection, function () {
                        resizeHandlers[this]();
                    });

                    fixIE6Sizing(element);

                    wnd.trigger(RESIZE);
                }

                function dragend(e) {
                    var element = wnd.element;
                    element
                        .find(".t-overlay").remove().end()
                        .find(".t-resize-handle").not(e.currentTarget).show();

                    $(document.body).css("cursor", "");

                    if (e.keyCode == 27) {
                        fixIE6Sizing(element);
                        element.css(wnd.initialCursorPosition)
                               .css(wnd.initialSize);
                    }

                    return false;
                }

                new Draggable(wnd.element, {
                    filter: ".t-resize-handle",
                    group: wnd.element.id + "-resizing",
                    dragstart: dragstart,
                    drag: drag,
                    dragend: dragend
                });
            })(that);
        }

        if (this.options.draggable) {
            (function(wnd){
                function dragstart(e) {
                    wnd.initialWindowPosition = wnd.element.position();

                    wnd.startPosition = {
                        left: e.pageX - wnd.initialWindowPosition.left,
                        top: e.pageY - wnd.initialWindowPosition.top
                    };

                    $(".t-resize-handle", wnd.element).hide();

                    $("<div class='t-overlay' />").appendTo(wnd.element);

                    $(document.body).css("cursor", e.currentTarget.css("cursor"));
                }

                function drag(e) {
                    var coordinates = {
                        left: e.pageX - wnd.startPosition.left,
                        top: Math.max(e.pageY - wnd.startPosition.top, 0)
                    };

                    $(wnd.element).css(coordinates);
                }

                function dragend(e) {
                    wnd.element.find(".t-resize-handle")
                               .show()
                               .end()
                               .find(".t-overlay")
                               .remove();

                    $(document.body).css("cursor", "");

                    if (e.keyCode == 27) {
                        e.currentTarget.closest(".t-window").css(wnd.initialWindowPosition);
                    }

                    return false;
                }

                new Draggable(wnd.element, {
                    filter: ".t-window-titlebar",
                    group: wnd.element.id + "-moving",
                    dragstart: dragstart,
                    drag: drag,
                    dragend: dragend
                })
            })(that);
        }

        that.bind([OPEN, ACTIVATED, CLOSE, REFRESH, RESIZE, ERROR, LOAD, MOVE], options);

        $(window).resize($.proxy(this.onDocumentResize, this));

        if (isLocalUrl(this.contentUrl)) {
            this.ajaxRequest();
        }
    };

    Window.prototype = {
        options: {
            animation: {
                show: {
                    effects: { zoomIn: {}, fadeIn: {} },
                    duration: 350
                },
                hide: {
                    effects: { zoomOut: { properties: { scale: 0.7 } }, fadeOut: {} },
                    duration: 350
                }
            },
            modal: false,
            resizable: true,
            draggable: true,
            minWidth: 50,
            minHeight: 50
        },

        overlay: function (visible) {
            var overlay = $("body > .t-overlay"),
                doc = $(document);

            if (overlay.length == 0) {
                overlay = $("<div class='t-overlay' />")
                    .toggle(visible)
                    .appendTo(this.element[0].ownerDocument.body);
            } else {
                overlay.toggle(visible);
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

        windowActionHandler: function (e) {
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

        center: function () {
            var element = this.element,
                window = $(window);

            element.css({
                left: window.scrollLeft() + Math.max(0, (window.width() - element.width()) / 2),
                top: window.scrollTop() + Math.max(0, (window.height() - element.height()) / 2)
            });

            return this;
        },

        title: function (text) {
            var title = $(".t-window-titlebar > .t-window-title", this.element);

            if (!text) {
                return title.text();
            }

            title.text(text);
            return this;
        },

        content: function (html) {
            var content = $("> .t-window-content", this.element);

            if (!html) {
                return content.html();
            }

            content.html(html);
            return this;
        },

        open: function (e) {
            var that = this,
                element = that.element,
                showOptions = that.options.animation.show;


            if (!that.trigger(OPEN)) {
                if (that.options.modal) {
                    var overlay = that.overlay(false);

                    if (showOptions.duration) {
                        overlay.css("opacity", 0).show().kendoAnimate({ fadeIn: { properties: { opacity: 0.5 } } }, showOptions.duration);
                    } else {
                        overlay.css("opacity", 0.5).show();
                    }
                }

                //if (!element.is(":visible")) {
                element.kendoAnimate({
                    effects: showOptions.effects,
                    duration: showOptions.duration,
                    complete: function() {
                        that.trigger(ACTIVATED);
                    }
                });
                //}
            }

            if (that.options.isMaximized) {
               $("html, body").css("overflow", "hidden");
            }

            return that;
        },

        close: function () {
            var that = this,
                element = that.element,
                options = that.options,
                hideOptions = options.animation.hide;

            if (element.is(":visible")) {
                if (!that.trigger(CLOSE)) {
                    var openedModalWindows = $(".t-window").filter(function() {
                        var window = $(this);
                        return window.is(":visible") && options.modal;
                    });

                    var shouldHideOverlay = options.modal && openedModalWindows.length == 1;

                    var overlay = options.modal ? that.overlay(true) : $(undefined);

                    if (shouldHideOverlay) {
                        if (hideOptions.duration) {
                            overlay.kendoAnimate({ fadeOut: { properties: { opacity: 0.5 } } }, hideOptions.duration);
                        } else {
                            overlay.hide();
                        }
                    }

                    element.kendoAnimate({
                        effects: hideOptions.effects,
                        duration: hideOptions.duration,
                        complete: function() {
                            //element.hide();

                            if (shouldHideOverlay) {
                                 overlay.hide();
                            }
                        }
                    });
                }
            }

            if (that.options.isMaximized) {
                $("html, body").css("overflow", "");
            }

            return that;
        },

        toggleMaximization: function (e) {
            if (e && $(e.target).closest(".t-window-action").length > 0) {
                return;
            }

            this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        restore: function () {
            var that = this;

            if (!that.options.isMaximized) {
                return;
            }

            that.element
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

        maximize: function (e) {
            var that = this;

            if (that.options.isMaximized) {
                return;
            }

            var element = that.element;

            that.restorationSettings = {
                left: element.position().left,
                top: element.position().top,
                width: element.width(),
                height: element.height()
            };

            element
                .css({ left: 0, top: 0, position: "fixed" })
                .find(".t-resize-handle").hide().end()
                .find(".t-window-titlebar .t-maximize").addClass("t-restore").removeClass("t-maximize");

            $("html, body").css("overflow", "hidden");

            that.options.isMaximized = true;

            that.onDocumentResize();

            return that;
        },

        onDocumentResize: function () {
            if (!this.options.isMaximized) {
                return;
            }

            var element = this.element;

            element
                .css({
                    width: $(window).width(),
                    height: $(window).height()
                });

            fixIE6Sizing(element);

            this.trigger(RESIZE);
        },

        refresh: function () {
            if (isLocalUrl(this.options.contentUrl)) {
                this.ajaxRequest();
            }

            return this;
        },

        ajaxRequest: function (url) {
            var loadingIconTimeout = setTimeout(function () {
                $(".t-refresh", this.element).addClass("t-loading");
            }, 100);

            var data = {};

            $.ajax({
                type: "GET",
                url: url || this.options.contentUrl,
                dataType: "html",
                data: data,
                cache: false,
                error: $.proxy(function (xhr, status) {
                    //fix
                    if ($t.ajaxError(this.element, "error", xhr, status))
                        return;
                }, this),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    $(".t-refresh", this.element).removeClass("t-loading");
                },
                success: $.proxy(function (data, textStatus) {
                    $(".t-window-content", this.element).html(data);

                    this.trigger(REFRESH);
                }, this)
            });
        },

        destroy: function () {
            var that = this;

            that.element.remove();

            var openedModalWindows = $(".t-window")
                .filter(function() {
                    var window = $(this);
                    return window.is(":visible") && that.options.modal;
                });

            var shouldHideOverlay = that.options.modal && openedModalWindows.length == 0;

            if (shouldHideOverlay) {
                that.overlay(false).remove();
            }
        }
    };

    // client-side rendering
    $.extend(Window, {
        create: function () {
            var element, options;

            if ($.isPlainObject(arguments[0])) {
                options = arguments[0];
            } else {
                element = arguments[0];
                options = $.extend({
                    html: element.innerHTML
                }, arguments[1]);
            }

            options = $.extend({
                title: "",
                html: "",
                actions: ["Close"]
            }, options);

            var windowHtml = "";

            if (!element) {
                windowHtml += "<div class='t-widget t-window'>";
            }

            windowHtml += "<div class='t-window-titlebar t-header'>&nbsp;<span class='t-window-title'>" +
                          options.title + "</span><div class='t-window-actions t-header'>";

            $.map(options.actions, function (command) {
                windowHtml += "<a href='#' class='t-window-action t-link'><span class='t-icon t-" +
                              command.toLowerCase() + "'>" + command + "</span></a>";
            });

            windowHtml += "</div></div><div class='t-window-content t-content' style='";

            if (typeof (options.scrollable) != "undefined" && options.scrollable === false) {
                windowHtml += "overflow:hidden;";
            }

            windowHtml += "'>";

            if (!options.contentUrl || (options.contentUrl && isLocalUrl(options.contentUrl))) {
                windowHtml += options.html;
            }

            if (options.contentUrl && !isLocalUrl(options.contentUrl)) {
                windowHtml += "<iframe src='" + options.contentUrl + "' title='" + options.title +
                              "' frameborder='0' style='border:0;width:100%;height:100%;'>This page requires frames in order to show content</iframe>";
            }

            if (element) {
                element.html(windowHtml);
                var titleBar = element.find(".t-window-titlebar");

                element.width(options.width)
                       .height(options.height)
                       .css("padding-top", titleBar.outerHeight());
            } else {
                var window = $(windowHtml).appendTo(document.body).tWindow(options),
                    titleBar = window.find(".t-window-titlebar");

                return window.width(options.width)
                             .height(options.height)
                             .css("padding-top", titleBar.outerHeight());
            }
        },

        getResizeHandlesHtml: function () {
            var html = "";

            $.each("n e s w se sw ne nw".split(" "), function (i, item) {
                html += "<div class='t-resize-handle t-resize-" + item + "'></div>";
            });

            return html;
        }
    });

//    // jQuery extender
//    $.fn.tWindow = function (options) {
//        return $t.create(this, {
//            name: "tWindow",
//            init: function (element, options) {
//                return new $t.window(element, options);
//            },
//            success: function(component) {
//                var element = component.element,
//                    $element = $(element);

//------------------fix---------------

//                if ($element.is(":visible")) {
//                    $t.trigger(element, "open")
//                    $t.trigger(element, "activated");
//                }
//            },
//            options: options
//        });
//    };

    kendo.ui.plugin("Window", Window, Component);

})(jQuery, window);
