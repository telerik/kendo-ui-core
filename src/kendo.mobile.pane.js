(function(f, define){
    define([ "./kendo.mobile.view", "./kendo.mobile.loader" ], f);
})(function(){

var __meta__ = {
    id: "mobile.pane",
    name: "Pane",
    category: "mobile",
    description: "Mobile Pane",
    depends: [ "mobile.view", "mobile.loader" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        roleSelector = kendo.roleSelector,
        ui = mobile.ui,
        Widget = ui.Widget,
        ViewEngine = mobile.ViewEngine,
        View = ui.View,
        Loader = mobile.ui.Loader,

        EXTERNAL = "external",
        HREF = "href",
        DUMMY_HREF = "#!",

        NAVIGATE = "navigate",
        VIEW_SHOW = "viewShow",
        SAME_VIEW_REQUESTED = "sameViewRequested",
        OS = kendo.support.mobileOS,
        SKIP_TRANSITION_ON_BACK_BUTTON = OS.ios && !OS.appMode && OS.flatVersion >= 700,

        WIDGET_RELS = /popover|actionsheet|modalview|drawer/,
        BACK = "#:back",

        attrValue = kendo.attrValue,
        // navigation element roles
        buttonRoles = "button backbutton detailbutton listview-link",
        linkRoles = "tab";

    var Pane = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            element = that.element;

            element.addClass("km-pane");

            if (that.options.collapsible) {
                element.addClass("km-collapsible-pane");
            }

            this.history = [];

            this.historyCallback = function(url, params, backButtonPressed) {
                var transition = that.transition;
                that.transition = null;

                // swiping back in iOS leaves the app in a very broken state if we perform a transition
                if (SKIP_TRANSITION_ON_BACK_BUTTON && backButtonPressed) {
                    transition = "none";
                }

                return that.viewEngine.showView(url, transition, params);
            };

            this._historyNavigate = function(url) {
                if (url === BACK) {
                    if (that.history.length === 1) {
                        return;
                    }

                    that.history.pop();
                    url = that.history[that.history.length - 1];
                } else {
                    that.history.push(url);
                }

                that.historyCallback(url, kendo.parseQueryStringParams(url));
            };

            this._historyReplace = function(url) {
                var params = kendo.parseQueryStringParams(url);
                that.history[that.history.length - 1] = url;
                that.historyCallback(url, params);
            };

            that.loader = new Loader(element, {
                loading: that.options.loading
            });

            that.viewEngine = new ViewEngine({
                container: element,
                transition: options.transition,
                modelScope: options.modelScope,
                rootNeeded: !options.initial,
                serverNavigation: options.serverNavigation,
                remoteViewURLPrefix: options.root || "",
                layout: options.layout,
                $angular: options.$angular,
                loader: that.loader,

                showStart: function() {
                    that.loader.transition();
                    that.closeActiveDialogs();
                },

                after: function(e) {
                    that.loader.transitionDone();
                },

                viewShow: function(e) {
                    that.trigger(VIEW_SHOW, e);
                },

                loadStart: function() {
                    that.loader.show();
                },

                loadComplete: function() {
                    that.loader.hide();
                },

                sameViewRequested: function() {
                    that.trigger(SAME_VIEW_REQUESTED);
                },

                viewTypeDetermined: function(e) {
                    if (!e.remote || !that.options.serverNavigation)  {
                        that.trigger(NAVIGATE, { url: e.url });
                    }
                }
            });


            this._setPortraitWidth();

            kendo.onResize(function() {
                that._setPortraitWidth();
            });

            that._setupAppLinks();
        },

        closeActiveDialogs: function() {
            var dialogs = this.element.find(roleSelector("actionsheet popover modalview")).filter(":visible");
            dialogs.each(function() {
                kendo.widgetInstance($(this), ui).close();
            });
        },

        navigateToInitial: function() {
            var initial = this.options.initial;

            if (initial) {
                this.navigate(initial);
            }
        },

        options: {
            name: "Pane",
            portraitWidth: "",
            transition: "",
            layout: "",
            collapsible: false,
            initial: null,
            modelScope: window,
            loading: "<h1>Loading...</h1>"
        },

        events: [
            NAVIGATE,
            VIEW_SHOW,
            SAME_VIEW_REQUESTED
        ],

        append: function(html) {
            return this.viewEngine.append(html);
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.viewEngine.destroy();
            this.userEvents.destroy();
        },

        navigate: function(url, transition) {
            if (url instanceof View) {
                url = url.id;
            }

            this.transition = transition;

            this._historyNavigate(url);
        },

        replace: function(url, transition) {
            if (url instanceof View) {
                url = url.id;
            }

            this.transition = transition;

            this._historyReplace(url);
        },

        bindToRouter: function(router) {
            var that = this,
                history = this.history,
                viewEngine = this.viewEngine;

            router.bind("init", function(e) {
                var url = e.url,
                    attrUrl = router.pushState ? url : "/";

                viewEngine.rootView.attr(kendo.attr("url"), attrUrl);

                // if current is set, then this means that the pane has navigated to a given view - we need to update the router accordingly.
                var length = history.length;

                if (url === "/" && length) {
                    router.navigate(history[length - 1], true);
                    e.preventDefault(); // prevents from executing routeMissing, by default
                }
            });

            router.bind("routeMissing", function(e) {
                if (!that.historyCallback(e.url, e.params, e.backButtonPressed)) {
                    e.preventDefault();
                }
            });

            router.bind("same", function() {
                that.trigger(SAME_VIEW_REQUESTED);
            });

            that._historyNavigate = function(url) {
                router.navigate(url);
            };

            that._historyReplace = function(url) {
                router.replace(url);
            };
        },

        hideLoading: function() {
            this.loader.hide();
        },

        showLoading: function() {
            this.loader.show();
        },

        changeLoadingMessage: function(message) {
            this.loader.changeMessage(message);
        },

        view: function() {
            return this.viewEngine.view();
        },

        _setPortraitWidth: function() {
            var width,
                portraitWidth = this.options.portraitWidth;

            if (portraitWidth) {
                width = kendo.mobile.application.element.is(".km-vertical") ? portraitWidth : "auto";
                this.element.css("width", width);
            }
        },

        _setupAppLinks: function() {
            var that = this;
            this.element.handler(this)
                .on("down", roleSelector(linkRoles), "_mouseup")
                .on("click", roleSelector(linkRoles + " " + buttonRoles), "_appLinkClick");

            this.userEvents = new kendo.UserEvents(this.element, {
                filter: roleSelector(buttonRoles),
                tap: function(e) {
                    e.event.currentTarget = e.touch.currentTarget;
                    that._mouseup(e.event);
                }
            });

            // remove the ms-touch-action added by the user events, breaks native scrolling in WP8
            this.element.css('-ms-touch-action', '');
        },

        _appLinkClick: function (e) {
            var href = $(e.currentTarget).attr("href");
            var remote = href && href[0] !== "#" && this.options.serverNavigation;

            if(!remote && attrValue($(e.currentTarget), "rel") != EXTERNAL) {
                e.preventDefault();
            }
        },

        _mouseup: function(e) {
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var pane = this,
                link = $(e.currentTarget),
                transition = attrValue(link, "transition"),
                rel = attrValue(link, "rel") || "",
                target = attrValue(link, "target"),
                href = link.attr(HREF),
                delayedTouchEnd = SKIP_TRANSITION_ON_BACK_BUTTON && link[0].offsetHeight === 0,
                remote = href && href[0] !== "#" && this.options.serverNavigation;

            if (delayedTouchEnd || remote || rel === EXTERNAL || (typeof href === "undefined") || href === DUMMY_HREF) {
                return;
            }

            // Prevent iOS address bar progress display for in app navigation
            link.attr(HREF, DUMMY_HREF);
            setTimeout(function() { link.attr(HREF, href); });

            if (rel.match(WIDGET_RELS)) {
                kendo.widgetInstance($(href), ui).openFor(link);
                // if propagation is not stopped and actionsheet is opened from tabstrip,
                // the actionsheet is closed immediately.
                if (rel === "actionsheet" || rel === "drawer") {
                    e.stopPropagation();
                }
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

    Pane.wrap = function(element) {
        if (!element.is(roleSelector("view"))) {
            element = element.wrap('<div data-' + kendo.ns + 'role="view" data-stretch="true"></div>').parent();
        }

        var paneContainer = element.wrap('<div class="km-pane-wrapper"><div></div></div>').parent(),
            pane = new Pane(paneContainer);

        pane.navigate("");

        return pane;
    };
    ui.plugin(Pane);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
