(function($, undefined) {
    var kendo = window.kendo,
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

        WIDGET_RELS = /popover|actionsheet|modalview/,
        BACK = "#:back",

        attrValue = kendo.attrValue,
        // navigation element roles
        buttonRoles = "button backbutton detailbutton listview-link",
        linkRoles = "tab";

    function appLinkClick(e) {
        if(attrValue($(e.currentTarget), "rel") != EXTERNAL) {
            e.preventDefault();
        }
    }

    function captureGhostClick(e) {
        if (attrValue($(e.currentTarget), "rel") !== EXTERNAL) {
            e.preventDefault();
        }
    }

    var Pane = Widget.extend({
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
            NAVIGATE,
            VIEW_SHOW
        ],

        destroy: function() {
            Widget.fn.destroy.call(this);

            kendo.destroy(this.element);
        },

        navigate: function(url, transition) {
            var that = this,
                history = that.history;

            if (url === BACK) {
                history.pop();
                url = history[history.length - 1];
            } else {
                that.history.push(url);
            }

            that.trigger(NAVIGATE, {url: url});
            that.viewEngine.showView(url, transition);
        },

        hideLoading: function() {
            this.loader.hide();
        },

        showLoading: function() {
            this.loader.show();
        },

        view: function() {
            return this.viewEngine.view();
        },

        _setupAppLinks: function() {
            this.element.handler(this)
                .on("down", roleSelector(linkRoles), "_mouseup")
                .on("up", roleSelector(buttonRoles), "_mouseup")
                .on("click", roleSelector(linkRoles + " " + buttonRoles), appLinkClick)
                .on("touchstart", roleSelector(buttonRoles), captureGhostClick)
                .on("touchstart", ".km-popup .k-item", kendo.preventDefault); // Prevent ghost clicks in DropDownList
        },

        _mouseup: function(e) {
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var link = $(e.currentTarget),
                transition = attrValue(link, "transition"),
                rel = attrValue(link, "rel") || "",
                target = attrValue(link, "target"),
                pane = this,
                href = link.attr(HREF);

            if (rel === EXTERNAL || (typeof href === "undefined") || href === DUMMY_HREF) {
                return;
            }

            // Prevent iOS address bar progress display for in app navigation
            link.attr(HREF, DUMMY_HREF);
            setTimeout(function() { link.attr(HREF, href); });

            if (rel.match(WIDGET_RELS)) {
                kendo.widgetInstance($(href), ui).openFor(link);
                e.stopPropagation();
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
})(window.kendo.jQuery);
