(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        mobile = kendo.mobile,
        roleSelector = kendo.roleSelector,
        ui = mobile.ui,
        Widget = ui.Widget,
        Loader = mobile.ui.Loader,

        viewRoles = "view splitview",
        attr = kendo.attr,

        BODY_REGEX = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,

        EXTERNAL = "external",
        HREF = "href",
        DUMMY_HREF = "#!",

        NAVIGATE = "navigate",
        // ViewLoader events
        LOAD_START = "loadStart",
        LOAD_COMPLETE = "loadComplete",
        VIEW_SHOW = "viewShow",

        BACK = "#:back",
        // navigation element roles
        buttonRoles = "button backbutton detailbutton listview-link",
        linkRoles = "tab";


    function appLinkClick(e) {
        var rel = $(e.currentTarget).data(kendo.ns + "rel");

        if(rel != EXTERNAL) {
            e.preventDefault();
        }
    }

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
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-pane");

            that.loader = new Loader(element, {
                loading: that.options.loading
            });

            that.viewBuilder = new ViewBuilder({
                container: element,
                transition: that.options.transition,
                layout: that.options.layout,
                loader: that.loader
            });

            that.history = [];
            that._setupAppLinks();
        },

        options: {
            name: "Pane",
            transition: "",
            layout: "",
            loading: undefined
        },

        events: [
            NAVIGATE
        ],

        navigate: function(url, transition) {
            var that = this,
                history = that.history;

            that.trigger(NAVIGATE, {url: url});

            if (url === BACK) {
                history.pop();
                url = history[history.length - 1];
            } else {
                that.history.push(url);
            }

            that.loader.transition();
            that.viewBuilder.showView(url, transition);
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
        },

        _setupAppLinks: function() {
            var that = this,
                mouseup = $.proxy(that._mouseup, that);

            this.element
                .on(support.mousedown, roleSelector(linkRoles), mouseup)
                .on(support.mouseup, roleSelector(buttonRoles), mouseup)
                .on("click", roleSelector(linkRoles + " " + buttonRoles), appLinkClick);
        },

        _mouseup: function(e) {
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var link = $(e.currentTarget),
            transition = link.data(kendo.ns + "transition"),
            rel = link.data(kendo.ns + "rel"),
            href = link.attr(HREF);

            if (rel === EXTERNAL) {
                return;
            }

            if (href && href != DUMMY_HREF) {
                // Prevent iOS address bar progress display for in app navigation
                link.attr(HREF, DUMMY_HREF);
                setTimeout(function() { link.attr(HREF, href); });

                if (rel === "actionsheet") {
                    $(href).data("kendoMobileActionSheet").openFor(link);
                } else {
                    this.navigate(href, transition);
                }
            }

            e.preventDefault();
        }
    });

    var ViewBuilder = kendo.Observable.extend({
        init: function(options) {
            var that = this,
                views;

            kendo.Observable.fn.init.call(that);

            $.extend(that, options);
            that.sandbox = $("<div />");

            views = that._hideViews(that.container);
            that.rootView = views.first();
            that._view = null;

            that.layouts = {};
            that._setupLayouts(that.container);

            if (that.loader) {
                that.bind(LOAD_START, function() { that.loader.show(); });
                that.bind(LOAD_COMPLETE, function() { that.loader.hide(); });
                that.bind(VIEW_SHOW, function() { that.loader.transitionDone(); });
            }
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
                element = container.children("[" + attr("url") + "='" + url + "']");

                if (!element[0] && !remote) {
                    element = container.children(local ? url : "#" + url);
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
            return container.children(roleSelector(viewRoles)).hide();
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
