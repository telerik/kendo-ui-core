(function($){
    var mobile = kendo.mobile = kendo.mobile || {};

    $.extend(mobile, {
        init: function(options) {
            var html = [ "<meta name='viewport' content='width=device-width' />" ];

            if (options.icon) {
                html.push("<link rel='apple-touch-icon' href='");
                html.push(options.icon);
                html.push("' />");
            }

            $(html.join("")).appendTo("head");
        },

        history: {
            pushState: function(data, url) {
                window.history.pushState(data, "", url);
            }
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
            view.siblings(".kendo-view").hide("slow").end().show("fast");

            if (callback) {
                callback();
            }
        },

        switchView: function(view, initCallback) {
            var loadedView = $(".kendo-view").filter(function() {
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

                        var viewPageIndex = $(".kendo-view:last").index();

                        document.body.innerHTML += content;

                        viewPage = $(".kendo-view").eq(viewPageIndex + 1);
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
