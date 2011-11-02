(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        div = $("<div/>"),
        roleSelector = kendo.roleSelector;

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view")).first();
    }

    var View = kendo.Class.extend({
        init: function(element) {
            var that = this,
                contentSelector = roleSelector("content");

            that.element = element.data("kendoView", that);

            if (element.has(contentSelector).length === 0) {
              element.wrapInner("<div " + kendo.dataRole + '="content"></div>');
            }

            that.content = element.find(roleSelector("content")).addClass("k-mobile-content");
            that.header = element.find(roleSelector("header")).addClass("k-mobile-header");
            that.footer = element.find(roleSelector("footer")).addClass("k-mobile-footer");

            element.addClass("k-mobile-view").prepend(that.header).append(that.footer);
        },

        replace: function(view) {
            var that = this,
                back = that.nextView === view,
                animationType = (back ? view : that).element.data("kendoTransition");

            this.element.css("display", "");

            if (back) {
              this.element.css("z-index", 0);
              view.element.css("z-index", 1);
            } else {
              this.element.css("z-index", 1);
              view.element.css("z-index", 0);
            }

            if (animationType === "slide") {
                var slidingElements = that.content;
                var slidingSource = view.content;

                if (!that.header.length) {
                    slidingSource = slidingSource.add(view.header);
                }

                if (!that.footer.length) {
                    slidingSource = slidingSource.add(view.footer);
                }

                if (!view.header.length) {
                    slidingElements = slidingElements.add(that.header);
                }

                if (!view.footer.length) {
                    slidingElements = slidingElements.add(that.footer);
                }

                if (that.header.length && view.header.length) {
                    view.header.kendoAnimateTo(that.header, {effects: "fade", reverse: back});
                }

                if (that.footer.length && view.footer.length) {
                    view.footer.kendoAnimateTo(that.footer, {effects: "fade", reverse: back});
                }

                slidingSource.kendoAnimateTo(slidingElements, { effects: "slide", reverse: back, complete: function() { view.element.hide() } });

            } else {
                view.element.kendoAnimateTo(that.element, { effects: animationType, reverse: back, complete: function() { view.element.hide() } });
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
