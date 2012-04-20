(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        roleSelector = kendo.roleSelector,
        ui = mobile.ui,
        Widget = ui.Widget,
        Loader = mobile.ui.Loader,

        viewRoles = "view splitview",
        attr = kendo.attr,

        BODY_REGEX = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,

        // ViewLoader events
        LOAD_START = "loadStart",
        LOAD_COMPLETE = "loadComplete",
        VIEW_SHOW = "viewShow";

    /**
     * @name kendo.mobile.ui.Pane.Description
     *
     */
    var Pane = Widget.extend(/** @lends kendo.mobile.ui.Pane.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this, loader;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-pane");

            loader = new Loader(element, { loading: that.options.loading });

            that.viewBuilder = new ViewBuilder({
                container: element,
                transition: that.options.transition,
                layout: that.options.layout,
                loader: loader,
                loadStart: function() { loader.show(); },
                loadComplete: function() { loader.hide(); },
                viewShow: function() { loader.transitionDone();  }
            });

            that.loader = loader;
        },

        options: {
            name: "Pane",
            transition: "",
            layout: "",
            loading: undefined
        },

        navigate: function(url, transition) {
            this.loader.transition();
            this.viewBuilder.showView(url, transition);
        },

        /**
         * Hide the loading animation.
         */
        hideLoading: function() {
            this.loader.hide();
        },

        /**
         * Show the loading animation.
         */
        showLoading: function() {
            this.loader.show();
        },

        view: function() {
            return this.viewBuilder.view();
        }
    });

    var ViewBuilder = kendo.Observable.extend({
        init: function(options) {
            var that = this,
                views;

            kendo.Observable.fn.init.call(that);

            that.transition = "";
            $.extend(that, options);
            that.sandbox = $("<div />");

            views = that._hideViews(that.container);
            that.rootView = views.first();
            that._view = null;

            that.layouts = {};
            that._setupLayouts(that.container);
            that.bind([LOAD_START, LOAD_COMPLETE, VIEW_SHOW], options);
        },

        view: function() {
            return this._view;
        },

        showView: function(url, transition) {
            var that = this,
                container = that.container,
                params = kendo.parseURL(url).params,
                firstChar = url.charAt(0),
                local = firstChar === "#",
                remote = firstChar === "/",
                view,
                element;

            if (!url) {
                element = that.rootView;
            } else {
                element = container.find("[" + attr("url") + "='" + url + "']");

                if (!element[0] && !remote) {
                    element = container.find(local ? url : "#" + url);
                }
            }

            view = element.data("kendoView");

            if (element[0]) {
                if (!view) {
                    view = that._createView(element);
                }

                that._show(view, transition, params);
            } else {
                that._loadView(url, function(view) { that._show(view, transition, params); });
            }
        },

        _createView: function(element) {
            var that = this,
                viewOptions,
                layout = element.data(kendo.ns + "layout");

            if (typeof layout === "undefined") {
                layout = that.layout;
            }

            if (layout) {
                layout = that.layouts[layout];
            }

            viewOptions = {
                defaultTransition: that.transition,
                loader: that.loader,
                container: that.container,
                layout: layout
            };

            return kendo.initWidget(element, viewOptions, kendo.mobile.ui);
        },

        _loadView: function(url, callback) {
            var that = this;

            if (that._xhr) {
                that._xhr.abort();
            }

            that.trigger(LOAD_START);

            that._xhr = $.get(url, function(html) {
                            that.trigger(LOAD_COMPLETE);
                            callback(that._createRemoteView(url, html));
                        }, 'html')
                        .fail(function() {
                            that.trigger(LOAD_COMPLETE);
                        });
        },

        _createRemoteView: function(url, html) {
            var that = this,
                sandbox = that.sandbox,
                container = that.container,
                views,
                view;

            if (BODY_REGEX.test(html)) {
                html = RegExp.$1;
            }

            sandbox[0].innerHTML = html;

            views = that._hideViews(sandbox);
            view = views.first();

            view.hide().attr(attr("url"), url);

            that._setupLayouts(sandbox);

            container.append(sandbox.find(roleSelector("layout") + ", script, style"))
                .append(views);

            return that._createView(view);
        },

        _show: function(view, transition, params) {
            var that = this;
            if (that._view !== view) {
                view.switchWith(that._view, transition, params, function() {
                    that._view = view;
                    that.trigger(VIEW_SHOW, {view: view});
                });
            }
        },

        _hideViews: function(container) {
            return container.find(roleSelector(viewRoles)).hide();
        },

        _setupLayouts: function(element) {
            var that = this,
                platformAttr = kendo.ns + "platform";

            element.find(roleSelector("layout")).each(function() {
                var layout = $(this),
                    platform = layout.data(platformAttr);

                if (platform === undefined || platform === mobile.application.os) {
                    that.layouts[layout.data("id")] = kendo.initWidget(layout, {}, kendo.mobile.ui);
                }
            });
        }
    });

    kendo.mobile.ViewBuilder = ViewBuilder;
    ui.plugin(Pane);
})(jQuery);
