(function($, undefined){
    var extend = $.extend,
        mobile = kendo.mobile = kendo.mobile || {},
        os = kendo.support.mobileOS,
        touch = kendo.support.touch,
        transitions = kendo.support.transitions,
        buttonSelector = "[data-kendo-ui=button],button,input[type=submit],input[type=reset],input[type=button],input[type=image]";

    if (os && !os.ios) {
        $(document.documentElement).removeClass('k-ios').addClass("k-" + os.name);
    }

    $(document).ready(function () {
        if (os) {
            if (!os.ios && !os.blackberry)
                if (!$.browser.msie && !$.browser.opera)
                    $('.k-view, body').css(transitions.css + 'box-direction', 'reverse');
                else {
                    var layout = $('.k-view');
                    $(".k-footer").prependTo(layout);
                    $('.k-header').appendTo(layout);
                }
        }

        mobile.initForm($(".k-tabStrip"));
        application
            .run()
            .addView($(".k-view:first").kendoView().data("kendoView"))
            .show();

        $(document).trigger("appinit", { app: application, mobileOS: os });
    });

    extend(mobile, {
        init: function(options) {
            var html = [ "<meta name='apple-mobile-web-app-capable' content='yes' /><meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />" +
                         "<meta name='viewport' content='minimum-scale=1, width=device-width, maximum-scale=1, user-scalable=no' />" ];

            options = extend({}, options);

            if (options.icon) {
                html.push("<link rel='apple-touch-icon' href='");
                html.push(options.icon);
                html.push("' />");
            }

            $(html.join("")).appendTo("head");
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
                        .parents(".k-buttonStrip, .k-tabStrip, .k-toolbar")
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
                viewWidth = window.innerWidth;

            $(document.body)
                .width(viewWidth * application.depth);

            $(".k-tabContainer")
                .width(viewWidth)
                .css(transitions.css + "box-flex", "0");

            view.element
                .add(view.element.siblings(".k-view"))
                .css({ width: viewWidth });

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
                    var viewPage;

                    if (mobile.isFullPage(content)) {
                        content = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/ig.exec(content)[1];
                        viewPage = $(content).appendTo(application.root);
                    } else { // partial content was served
                        viewPage = $("<div class='k-view' />").appendTo(application.root);
                        viewPage[0].innerHTML = content;
                    }

                    viewPage.data("url", view);

                    var currentView = viewPage.kendoView({ previousView: application.currentView }).data("kendoView");
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
