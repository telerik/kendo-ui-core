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
            var that = this,
                back = that.nextView === view;

            view.element.kendoAnimateTo(that.element, {effects: "slide", reverse: back});

            if (!back) {
              view.nextView = that;
            }

            return that;
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

            that._view = that._createView(views.first(), { url: history.current });

            history.start($.extend(options, { silent: true }));

            history.change(function(e) {
                that.changeView(e.location);
            });
        },

        changeView: function(url) {
            var that = this;

            that._findView(url, function(view) {
                history.navigate(url, true);

                that.trigger("viewHide", { view: that._view });

                that._view = view.replace(that._view);

                that.trigger("viewShow", { view: view });
            });
        },

        _createView: function(element, options) {
            var view = new View(element, options);

            this.trigger("viewInit", { view: view });

            if (kendo.mobile) {
                kendo.mobile.enhance(view.element);
            }

            return view;
        },

        _createRemoteView: function(url, html) {
            var that = this, element;

            element = extractView(html);

            element.hide().attr("data-kendo-url", url);

            that.element.append(element);

            return that._createView(element);
        },

        _findView: function(url, callback) {
            var that = this,
                view,
                element;

            element = that.element.find(url + ", [data-kendo-url='" + url + "']").first();

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (url.charAt(0) === "#") {
                callback(that._createView(element));
            } else {
                $.ajax({
                    url: url,
                    dataType: "html",
                    success: function(html) {
                        callback(that._createRemoteView(url, html));
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
