(function($, undefined){
    var mobile = kendo.mobile = kendo.mobile || {},
        os = kendo.support.mobileOS,
        touch = kendo.support.touch,
        transitions = kendo.support.transitions;

    if (os && !os.ios) {
        $(document.documentElement).removeClass('ios').addClass(os.name);
    }

    $(document).ready(function () {
        $(".k-button").live(touch ? "touchend" : "mouseup", function (e) {
            e.preventDefault();
            var target = kendo.eventTarget(e);

            $(target)
                .parents(".k-buttonStrip, .k-tabStrip, .k-toolbar")
                .find(".k-active")
                .removeClass("k-active");

            $(target)
                .closest(".k-button")
                .addClass("k-active");
        });

        if (os) {
            if (!os.ios && !os.blackberry)
                if (!$.browser.msie && !$.browser.opera)
                    $('.k-view').css(transitions.css + 'box-direction', 'reverse');
                else {
                    var layout = $('.k-view');
                    $(".k-footer").prependTo(layout);
                    $('.k-header').appendTo(layout);
                }
        }
    });

    $.extend(mobile, {
        init: function(options) {
            var html = [ "<meta name='apple-mobile-web-app-capable' content='yes' /><meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />" +
                         "<meta name='viewport' content='minimum-scale=1, width=device-width, maximum-scale=1, user-scalable=no' />" ];

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

        goToView: function(view, callback) {
            /// TODO: add proper animation
            view.siblings(".k-view").hide("slow").end().show("fast");

            if (callback) {
                callback();
            }
        },

        switchView: function(view, initCallback) {
            var loadedView = $(".k-view").filter(function() {
                return $(this).data("url") == view;
            });

            if (loadedView.length > 0) {
                kendo.mobile.goToView(loadedView, initCallback);

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

                        var viewPageIndex = $(".k-view:last").index();

                        document.body.innerHTML += content;

                        viewPage = $(".k-view").eq(viewPageIndex + 1);
                    } else { // partial content was served
                        viewPage = $("<div class='kendo-view' />").appendTo("body");

                        viewPage[0].innerHTML = content;
                    }

                    viewPage.data("url", view);

                    kendo.mobile.goToView(viewPage, initCallback);
                }
            });
        }
    });

    function Application(options) {
        $.extend(this, options);
        this.views = [];
    }

    Application.prototype = {
        run: function(callback) {
            this.root = document.body;

            if (callback)
                callback(this);

            this.show(0);

            window.scrollTo(0, 1);
        },

        addView: function(view) {
            this.views.push(view);
        },

        show: function(viewIndex, options) {
            if (this.currentView) {
                this.currentView.hide();
            }

            var view = this.views[viewIndex];

            view.show(this.root);

            this.currentView = view;
        }
    };

    // temporary, the class will be removed
    window.Application = Application;
})(jQuery);
