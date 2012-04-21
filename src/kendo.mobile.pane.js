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

            that.viewEngine = new ViewEngine({
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
            transition = link.data(kendo.ns + "transition"),
            rel = link.data(kendo.ns + "rel"),
            target = link.data(kendo.ns + "target"),
            pane = this;
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
                    if (target === "_top") {
                        pane = mobile.application.pane;
                    }
                    else if (target) {
                        pane = $("#" + target).data("kendoMobilePane");
                    }

                    pane.navigate(href, transition);
                }
            }

            e.preventDefault();
        }
    });

    ui.plugin(Pane);
})(jQuery);
