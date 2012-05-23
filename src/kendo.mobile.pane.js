(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        mobile = kendo.mobile,
        roleSelector = kendo.roleSelector,
        ui = mobile.ui,
        Widget = ui.Widget,
        ViewEngine = mobile.ViewEngine,
        Loader = mobile.ui.Loader,

        EXTERNAL = "external",
        HREF = "href",
        DUMMY_HREF = "#!",

        NAVIGATE = "navigate",
        VIEW_SHOW = "viewShow",

        WIDGET_RELS = /popover|actionsheet/,
        BACK = "#:back",

        data = kendo.data,
        // navigation element roles
        buttonRoles = "button backbutton detailbutton listview-link",
        linkRoles = "tab";

    function appLinkClick(e) {
        if(data($(e.currentTarget), "rel") != EXTERNAL) {
            e.preventDefault();
        }
    }

    /**
     * @name kendo.mobile.ui.Pane.Description
     * @section
     * <h3>Mobile Pane</h3>
     * <p>The mobile Pane widget groups one or more <strong>mobile views</strong> within the main view application. The mobile
     * SplitView widget allows a side by-side display of several panes. The mobile PopOver automatically instantiates a mobile Pane widget for its
     * contents.</p>
     *
     * @section
     * <p>The mobile Pane widget acts like an embedded mobile application, with most of the application
     * features available: support for local/remote views, default layout and transition, lading, etc. with one
     * exception being the browser history support. Navigating within the pane will not update the history state, so
     * deep linking to a pane state is not supported.</p>
     *
     * @section
     * <h3>Navigating across panes</h3>
     *
     * <p>By default, navigational widgets will change views in the containing pane. To target another pane, use
     * <code>target</code> data attribute set to the <strong>id</strong> of the pane. To change views in the mobile
     * application, use <code>data-target="_top"</code>.</p>
     *
     * @exampleTitle Navigating across panes
     * @example
     * <div data-role="splitview" id="main">
     *    <div data-role="pane" id="side-pane">
     *      <div data-role="view">
     *         <a data-role="button" href="#bar" data-target="main-pane">Bar (main pane)</a>
     *         <a data-role="button" href="#baz" data-target="_top">Baz (application)</a>
     *      </div>
     *    </div>
     *
     *    <div data-role="pane" id="main-pane">
     *      <div data-role="view" id="foo">
     *         Foo
     *      </div>
     *      <div data-role="view" id="bar">
     *         Bar
     *      </div>
     *    </div>
     *  </div>
     *
     *  <div data-role="view" id="baz">
     *     <a data-role="button" href="#main">Go back to splitview</a>
     *  </div>
     */
    var Pane = Widget.extend(/** @lends kendo.mobile.ui.Pane.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [layout] <> The id of the default Pane Layout.
         * @option {String} [initial] <> The id of the initial mobilie View to display.
         * @option {String} [loading] <Loading...> The text displayed in the loading popup. Setting this value to false will disable the loading popup.
         * @option {String} [transition] <> The default View transition.
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-pane");

            that.loader = new Loader(element, {
                loading: that.options.loading
            });

            that.viewEngine = new ViewEngine({
                container: element,
                transition: that.options.transition,
                layout: that.options.layout,
                loader: that.loader
            });

            that.viewEngine.bind(VIEW_SHOW, function(e) {
                that.trigger(VIEW_SHOW, e);
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
            /**
             * Fires when pane navigates to a view.
             * @name kendo.mobile.ui.Pane#navigate
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.url The url of the view
             */
            NAVIGATE,
            /**
             * Fires after the pane displays a view.
             * @name kendo.mobile.ui.Pane#viewShow
             * @event
             * @param {Event} e
             * @param {View} e.view The displayed view
             */
            VIEW_SHOW
        ],

        /**
         * Navigate the local or remote view.
         * @param {String} url The id or url of the view.
         * @param {String} transition The transition to apply when navigating. See View Transitions section for more
         * information.
         *
         * @exampleTitle Navigate to a remote view
         * @example
         * <div data-role="pane" id="main-pane">
         * </div>
         *
         * <script>
         * var pane = $("#main-pane").data("kendoMobilePane");
         * pane.navigate("settings.html");
         * </script>
         *
         * @exampleTitle Navigate to a local view
         * @example
         * <div data-role="pane" id="main-pane">
         *   <div data-role="view" id="foo"> ... </div>
         * </div>
         *
         * <script>
         * var pane = $("#main-pane").data("kendoMobilePane");
         * pane.navigate("#foo");
         * </script>
         */
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

            that.viewEngine.showView(url, transition);
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

        /**
         * Get a reference to the current view.
         * @returns {View} the view instance.
         */
        view: function() {
            return this.viewEngine.view();
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
                transition = data(link, "transition"),
                rel = data(link, "rel") || "",
                target = data(link, "target"),
                pane = this,
                href = link.attr(HREF);

            if (rel === EXTERNAL || !href || href === DUMMY_HREF) {
                return;
            }

            // Prevent iOS address bar progress display for in app navigation
            link.attr(HREF, DUMMY_HREF);
            setTimeout(function() { link.attr(HREF, href); });

            if (rel.match(WIDGET_RELS)) {
                kendo.widgetInstance($(href), ui).openFor(link);
            } else {
                if (target === "_top") {
                    pane = mobile.application.pane;
                }
                else if (target) {
                    pane = $("#" + target).data("kendoMobilePane");
                }

                pane.navigate(href, transition);
            }

            e.preventDefault();
        }
    });

    ui.plugin(Pane);
})(jQuery);
