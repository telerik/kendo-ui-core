(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        div = $("<div/>"),
        VIEW_SELECTOR = "[data-kendo-role=view]";

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(VIEW_SELECTOR).first();
    }

    var View = kendo.Class.extend({
        init: function(element) {
            var that = this;

            that.element = element.data("kendoView", that);
            that._bindEvents();
        },

        replace: function(view) {
            this.element.show();
            view.hide();
            return this;
        },

        hide: function() {
            this.element.hide();
        },

        _bindEvents: function () {
            this.element.find("a").click(function(e) {
                e.preventDefault();
                kendo.application.changeView($(this).attr("href"));
            });
        }
    });

    var Application = kendo.Observable.extend({

        init: function(element, options) {
            kendo.Observable.fn.init.call(this, options);
            this.element = element;
        },

        start: function(options) {
            var that = this, views;

            that.element = that.element ? $(that.element) : $(document.body);

            views = that.element.find(VIEW_SELECTOR);

            views.not(":first").hide();

            that._view = new View(views.first(), { url: history.current });

            that.trigger("viewInit", { view: that._view });

            history.start($.extend(options, {silent: true}));

            history.change(function(e) {
                that.changeView(e.location);
            });
        },

        changeView: function(url) {
            var that = this;

            that._findView(url, function(view, init) {
                history.navigate(url, true);
                that._view = view.replace(that._view);
                if (init) {
                    that.trigger("viewInit", { view: view });
                }
                that.trigger("viewShow", { view: view });
            });
        },

        _findView: function(url, callback) {
            var that = this,
                view,
                element;

            element = that.element.find(url + ", [data-kendo-url='" + url + "']").first();

            view = element.data("kendoView");

            if (view) {
                callback(view, false);
            } else if (url.charAt(0) === "#") {
                callback(new View(element), true);
            } else {
                $.ajax({
                    url: url,
                    dataType: "html",
                    success: function(html) {
                        element = extractView(html);

                        element.hide().attr("data-kendo-url", url);
                        that.element.append(element);

                        callback(new View(element), true);
                    }
                });
            }
        }
    });

    kendo.application = new Application();
    kendo.Application = Application;

    $(function() {
        kendo.application.start({});
    });
})(jQuery);
