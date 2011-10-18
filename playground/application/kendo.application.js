(function($, undefined) {
    kendo.View = kendo.Class.extend({
        init: function(element, options) {
            this.options = options;
            this.element = element;
        },

        render: function(success) {
            var that = this;

            success = success || $.noop;

            if (that.element) {
                success(that.element);
                this._bindEvents();
            } else {
                $.ajax({
                    url: this.options.url,
                    dataType: "html",
                    success: function(html) {
                        var bodyInnerHTML = /<body[^>]*>((.|\n)*)<\/body>/im.exec(html)[1];

                        var placeholder = $("<div/>");

                        placeholder[0].innerHTML = bodyInnerHTML;
                        that.element = placeholder.find("[data-kendo-role=view]").first();

                        success(that.element);
                        that._bindEvents();
                    }
                });
            }
        },

        replace: function(view) {
            view.element.replaceWith(this.element);
            return this;
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

            that._view = new kendo.View($("[data-kendo-role=view]").first());

            kendo.history.start(history);

            kendo.history.change(function(e) {
                that.loadView(e.location);
            });

            that._view.render(function() {
                that._viewInit(that._view);
            });
        },

        _viewInit: function(view) {
            this.trigger("viewinit", {
                element: view.element
            });
        },

        loadView: function(url) {
            var that = this;

            var view = new kendo.View(null, { url: url });

            view.render(function(element) {
                kendo.history.navigate(url, true);

                that._view = view.replace(that._view);

                that._viewInit(that._view);
            });
        }
    });

    kendo.application = new Application();

    $(function() {
        kendo.application.start({
        });
    });
})(jQuery);
