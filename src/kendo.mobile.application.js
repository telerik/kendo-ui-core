(function($, undefined){
    var extend = $.extend,
        each = $.each,
        mobile = kendo.mobile = kendo.mobile || {},
        os = kendo.support.mobileOS,
        touch = kendo.support.touch,
        pointers = kendo.support.pointers,
        transitions = kendo.support.transitions,
        titleRegExp = /<title[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/title>/ig,
        bodyRegExp = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/ig,
        buttonSelector = "[data-kendo-ui=button],button,input[type=submit],input[type=reset],input[type=button],input[type=image]";

    $(document.documentElement).addClass("k-" + (!os || (os && os.ios) ? "ios" : os.name));

    if (touch)
        $(document.documentElement).bind("touchstart", function () { return false; });

    if (pointers) {
        each(["touchstart", "touchend", "touchmove", "touchcancel", "gesturestart", "gestureend"], function(m, value) {
            $.fn[value] = function(callback) {
                return this.bind(value, callback)
            }
        });

        function createTouchEvent(e) {
            e.changedTouches = e.getPointerList();

            each(e.changedTouches, function(idx, value) {
                value.identifier = value.pointerId;
                value.pageX = value.clientX;
                value.pageY = value.clientY;
            });

            e.touches = e.changedTouches;

            return e;
        }

        document.documentElement.addEventListener("MSPointerDown", function(e) {
            if (e.pointerType == 2) {
                $(e.target).trigger("touchstart", createTouchEvent(e));
            }
        }, false);
        document.documentElement.addEventListener("MSPointerMove", function(e) {
            if (e.pointerType == 2) {
                $(e.target).trigger("touchmove", createTouchEvent(e));
            }
        }, false);
        document.documentElement.addEventListener("MSPointerUp", function(e) {
            if (e.pointerType == 2) {
                $(e.target).trigger("touchend", createTouchEvent(e));
            }
        }, false);
    }

    $(document).bind("resize, orientationchange", function() {
       window.scrollTo(0, 0);
    });

    $(document).ready(function () {
        if (os) {
            if (!os.ios && !os.blackberry)
                if ($.browser.msie || $.browser.opera) {
                    var layout = $(".k-view");
                    $(".k-footer").prependTo(layout);
                    $(".k-header").appendTo(layout);
                }
        }

        mobile.initForm($(".k-tabStrip"));
        application.run();

        var view = $(".k-view:first");
        if (!view.length)
            view = $("<div class='k-view'/>").appendTo(application.root);

        application
            .addView(view.kendoView({ title: document.title }).data("kendoView"))
            .show();

        $(document).trigger("appinit", { app: application, mobileOS: os });
    });

    extend(mobile, {
        init: function(options) {
            var html = [ "<meta name='apple-mobile-web-app-capable' content='yes' /><meta name='apple-mobile-web-app-status-bar-style' content='black' />" +
                         "<meta content=\"initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width\" name=\"viewport\" />" ];

            options = extend({}, options);

            if (options.icon) {
                html.push("<link rel='apple-touch-icon' href='");
                html.push(options.icon);
                html.push("' />");
            }

            $(html.join("")).prependTo("head");
        },

        isFullPage: function(content) {
            return /^\s*<!doctype[^>]*>/i.test(content);
        },

        encodeScripts: function(content) {
            return content.replace(/<script([^>]*)>/gi, "<kendo:script$1>")
                          .replace(/<\/script>/gi, "</kendo:script>");
        },

        decodeScripts: function(content) {
            return content.replace(/<kendo:script([^>]*)>/gi, "<script$1>")
                          .replace(/<\/kendo:script>/gi, "<\/script>");
        },

        initForm: function(element, previousView) {
            var buttons = element.find(buttonSelector);

            buttons
                .addClass("k-button")
                .find("span:not(.k-message,.k-icon)")
                .addClass("k-text");

            if (!$(".k-tabStrip > .k-tabContainer").length)
                $(".k-tabStrip").contents().wrapAll("<div class='k-tabContainer'>");

            element.delegate(buttonSelector, touch ? "touchend" : "mouseup", function (e) {
                e.preventDefault();
                var target = $(kendo.eventTarget(e));

                if (target.data("kendo-ui") == "back" && previousView) {
                    kendo.mobile.goToView(previousView, true);
                    return;
                }

                target
                    .parents(".k-radiogroup, .k-tabStrip, .k-toolbar")
                    .find(".k-state-active")
                    .removeClass("k-state-active");

                target
                    .closest(".k-button")
                    .addClass("k-state-active");
            });
        },

        goToView: function(view, callback) {
            var back = false;

            if (typeof callback === "boolean")
                back = callback;

            view.show(application.root);
            if (!back) {
                view.element.css(transitions.css + "box-ordinal-group", ++application.depth + "");
            }

            var width = application.root[0].style.width,
                halfWidth = (100 / application.depth) + "%";

            $(document.body)
                .width((100 * application.depth) + "%");

            $(".k-tabContainer")
                .width(halfWidth)
                .css(transitions.css + "box-flex", "0");

            view.element
                .add(view.element.siblings(".k-view"))
                .css({ width: halfWidth });

            back && application.depth--;

            $(application.root)
                .kendoAnimate(extend({ reverse: back, complete: function () {
                                                                } },
                                                                view.options.animation));

            if ($.isFunction(callback)) {
                callback();
            }
        },

        switchView: function(view, initCallback) {
            var loadedView = $(".k-view").filter(function() {
                return $(this).data("url") == view;
            });

            if (loadedView.length > 0) {
                kendo.mobile.goToView(loadedView.data("kendoView"), initCallback);
                return;
            }

            $.ajax({
                url: view,
                cache: false,
                dataType: "html",
                success: function(content) {
                    var viewPage,
                        matches = titleRegExp.exec(content);

                    if (mobile.isFullPage(content)) {
                        var contentMatches = bodyRegExp.exec(content);
                        viewPage = $(contentMatches ? contentMatches[1] : content).appendTo(application.root);
                    } else { // partial content was served
                        viewPage = $("<div class='k-view' />").appendTo(application.root);
                        viewPage[0].innerHTML = content;
                    }

                    viewPage.data("url", view);

                    var currentView = viewPage.kendoView({ previousView: application.currentView, title: matches ? matches[1] : "" }).data("kendoView");
                    application.addView(currentView);
                    kendo.mobile.goToView(currentView, initCallback);
                }
            });
        }
    });

    function Application(options) {
        extend(this.options, options);
        this.views = [];
    }

    Application.prototype = {
        options: {
            
        },

        run: function(callback) {
            var that = this;

            that.root = $(".k-showcase");
            if (!that.root.length)
                that.root = $("<div class='k-slot'><div class='k-showcase'/></div>").appendTo(document.body).find(".k-showcase");

            if (callback)
                callback(that);

            that.depth = 1;

            window.scrollTo(0, 1);

            return that;
        },

        addView: function(view) {
            this.views.push(view);

            return this;
        },

        removeView: function(view) {
            var that = this;

            if ("element" in view)
                view = view.element;
            else
                view = $(view);

            each(that.views, function(idx, value) {
                if (value.element == view) {
                    kendo.mobile.goToView(value.options.previousView, true);
                    
                    value.element.remove();
                    delete that.views[idx];
                    return false;
                }
            });

            return that;
        },

        show: function(viewIndex, options) {
            var that = this;

            that.currentView && that.currentView.hide();

            var view = that.views[viewIndex || 0];
            view.show(that.root);

            that.currentView = view;

            return that;
        }
    };

    // temporary, the class will be removed
    window.application = new Application();
    mobile.init();

})(jQuery);
