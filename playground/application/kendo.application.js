(function($, undefined) {
    kendo.View = kendo.Class.extend({
        init: function(element, options) {
            this.options = options;
            this.element = element;

            if (element) {
                element.data("kendoView", this);
                this._bindEvents();
            }
        },

        render: function(success) {
            var that = this;

            success = success || $.noop;

            if (that.element) {
                success(that.element);
            } else {
                $.ajax({
                    url: this.options.url,
                    dataType: "html",
                    success: function(html) {
                        var bodyInnerHTML = /<body[^>]*>((.|\n)*)<\/body>/im.exec(html)[1];

                        var placeholder = $("<div/>");

                        placeholder[0].innerHTML = bodyInnerHTML;
                        that.element = placeholder.find("[data-kendo-role=view]").first();
                        that.element.hide().attr("data-kendo-url", that.options.url).data("kendoView", that);

                        $(document.body).append(that.element);
                        success(that.element);
                        that._bindEvents();
                    }
                });
            }
        },

        replace: function(view) {
            if (view == this) {
                return;
            }
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

            var that = this, view;

            var element = $(url + ", [data-kendo-url='" + url + "']").first();
            view = element.data("kendoView");

            if (!view) {
                if (url.charAt(0) === "#") {
                    view = new kendo.View($(url), { url: url });
                } else {
                    view = new kendo.View(null, { url: url });
                }
            }

            view.render(function(element) {
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
