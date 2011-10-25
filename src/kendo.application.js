(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        div = $("<div/>"),
        VIEW_SELECTOR = "[data-kendo-role=view]",
        HEADER_SELECTOR = "[data-kendo-role=header]",
        FOOTER_SELECTOR = "[data-kendo-role=footer]",
        ANIMATION_CLASS = "k-animation-container",
        SCAFFOLD = kendo.template('<div class="${a} k-mobile-header"><div class="${a}"></div></div> \
                                  <div class="${a} k-mobile-content"><div class="${a}"></div></div> \
                                  <div class="${a} k-mobile-footer"><div class="${a}"></div></div>')({a: ANIMATION_CLASS});

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
            that.header  = element.find(HEADER_SELECTOR);
            that.footer  = element.find(FOOTER_SELECTOR);
        },

        replace: function(view) {
            var that = this,
            back = that.nextView === view;

            view.header.kendoAnimateTo(that.header, {effects: "fade", reverse: back});
            view.element.kendoAnimateTo(that.element, {effects: "slide", reverse: back});
            view.footer.kendoAnimateTo(that.footer, {effects: "fade", reverse: back});

            if (!back) {
                view.nextView = that;
            }
        },
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

            that._view = that._createView(views.first());
            that.buildInitialStructure();
            this.content.append(views);

            history.start($.extend(options, { silent: true }));

            history.change(function(e) {
                that.navigate(e.location);
            });
        },

        buildInitialStructure: function () {
            var that = this,
                view = that._view,
                element = that.element;

            element.append($(SCAFFOLD));

            this.content = element.find(".k-mobile-content > ." + ANIMATION_CLASS);

            element.find(".k-mobile-header > ." + ANIMATION_CLASS).append(view.header);
            element.find(".k-mobile-footer > ." + ANIMATION_CLASS).append(view.footer);
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
