(function($, undefined) {

    function extractView(html) {
        var bodyInnerHTML = /<body[^>]*>((.|\n)*)<\/body>/im.exec(html)[1];

        var placeholder = $("<div/>");

        placeholder[0].innerHTML = bodyInnerHTML;
        return placeholder.find("[data-kendo-role=view]").first();
    }

    function findView(url, callback) {
        var element = $(url + ", [data-kendo-url='" + url + "']").first(),
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
                    $(document.body).append(element);

                    callback(new kendo.View(element));
                }
            });
        }
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
                kendo.application.loadView($(this).attr("href"));
            });
        }
    });

    var Application = kendo.Observable.extend({

        init: function(options) {
            var that = this;
            kendo.Observable.fn.init.call(this, options);
        },

        start: function(history) {
            var that = this;

            kendo.history.start(history);

            $("[data-kendo-role=view]").not(":first").hide();
            that._view = new kendo.View($("[data-kendo-role=view]").first(), { url: kendo.history._fragment });

            kendo.history.change(function(e) {
                that.loadView(e.location);
            });
        },

        loadView: function(url) {
            var that = this;

            findView(url, function(view) {
                kendo.history.navigate(url, true);
                that._view = view.replace(that._view);
            });
        }
    });

    kendo.application = new Application();

    $(function() {
        kendo.application.start({});
    });
})(jQuery);
