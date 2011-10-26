(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        div = $("<div/>"),
        roleSelector = kendo.roleSelector,
        ANIMATION_CLASS = "k-animation-container",
        animationContainer = kendo.template('<div class="k-mobile-${cssClass} ' + ANIMATION_CLASS + '">#= typeof inner === "undefined" ? "" : inner #</div>');

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view")).first();
    }

    var View = kendo.Class.extend({
        init: function(element) {
            var that = this;

            that.element = element.data("kendoView", that);

            element.wrapInner(animationContainer({cssClass: "content", inner: '<div ' + kendo.dataRole + '="content"></div>'}));
            that.content = element.find(roleSelector("content"));

            that.header = element.find(roleSelector("header")).detach();
            that.footer = element.find(roleSelector("footer")).detach();

            element.addClass("k-mobile-view").prepend(that.header).append(that.footer);

            that.header.wrap(animationContainer({cssClass: "header"}));
            that.footer.wrap(animationContainer({cssClass: "footer"}));
        },

        replace: function(view) {
            var that = this,
                back = that.nextView === view,
                animationType = (back ? view : that).element.data("kendoTransition");

            if (animationType === "slide") {
                view.header.kendoAnimateTo(that.header, { effects: "fade", reverse: back });
                view.content.kendoAnimateTo(that.content, { effects: "slide", reverse: back });
                view.footer.kendoAnimateTo(that.footer, { effects: "fade", reverse: back });
            } else {
                view.element.kendoAnimateTo(that.element, { effects: animationType, reverse: back });
            }

            if (!back) {
                view.nextView = that;
            }
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

            that.element.addClass(ANIMATION_CLASS);
            views = that.element.find(roleSelector("view"));

            views.not(":first").hide();

            that._view = that._createView(views.first());

            history.start($.extend(options, { silent: true }));

            history.change(function(e) {
                that.navigate(e.location);
            });
        },

        navigate: function(url) {
            var that = this;

            that._findView(url, function(view) {
                history.navigate(url, true);

                that.trigger("viewHide", { view: that._view });

                view.replace(that._view);

                that._view = view;

                that.trigger("viewShow", { view: view });
            });
        },

        _createView: function(element) {
            var view = new View(element);

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
            local = url.charAt(0) === "#",
            element;

            element = that.element.find("[data-kendo-url='" + url + "']");

            if (!element[0] && local) {
                element = that.element.find(url);
            }

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (local) {
                callback(that._createView(element));
            } else {
                $.get(url, function(html) {
                    callback(that._createRemoteView(url, html));
                });
            }
        }
    });

    kendo.application = new Application;
    kendo.Application = Application;

    $(function() {
        kendo.application.start({});
    });
})(jQuery);
