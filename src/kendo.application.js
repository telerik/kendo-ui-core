(function($, undefined) {

    function extractView(html) {
        if (/<body[^>]*>((.|\n)*)<\/body>/im.test(html)) {
            html = RegExp.$1;
        }

        var placeholder = $("<div/>");

        placeholder[0].innerHTML = html;
        return placeholder.find("[data-kendo-role=view]").first();
    }

    kendo.View = kendo.Class.extend({
        init: function(element) {
            this.element = element;
            element.data("kendoView", this);
            this._bindEvents();
        },

        _bindToElement: function(element) {
            return element;
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

        start: function(history) {
            var that = this;
            that.element = that.element ? $(that.element) : $(document.body);

            history = $.extend(history, {silent: true});

            kendo.history.start(history);

            that.element.find("[data-kendo-role=view]").not(":first").hide();
            that._view = new kendo.View(that.element.find("[data-kendo-role=view]").first(), { url: kendo.history._fragment });

            kendo.history.change(function(e) {
                that.changeView(e.location);
            });
        },

        changeView: function(url) {
            var that = this;

            that._findView(url, function(view) {
                kendo.history.navigate(url, true);
                that._view = view.replace(that._view);
                that.trigger("viewChange", {view: view});
            });
        },

        _findView: function(url, callback) {
            var that = this;
            var element = that.element.find(url + ", [data-kendo-url='" + url + "']").first(),
            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (url.charAt(0) === "#") {
                callback(new kendo.View($(url)));
            } else {
                $.ajax({
                    url: url,
                    dataType: "html",
                    success: function(html) {
                        element = extractView(html);

                        element.hide().attr("data-kendo-url", url);
                        that.element.append(element);

                        callback(new kendo.View(element));
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
