(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        history = kendo.history,
        support = kendo.support,
        attr = kendo.attr,
        os = support.mobileOS,
        div = $("<div/>"),
        meta = '<meta name="apple-mobile-web-app-capable" content="yes" /> \
                <meta name="apple-mobile-web-app-status-bar-style" content="black" /> \
                <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport" />',
        iconMeta = kendo.template('<link rel="apple-touch-icon" href="${icon}" />'),
        buttonRolesSelector = toRoleSelector("button listview-link"),
        linkRolesSelector = toRoleSelector("tab"),
        initialHeight = {},
        TRANSFORM = support.transitions.css + "transform",
        View = ui.MobileView,
        ViewSwitcher = ui.MobileViewSwitcher,
        Layout = ui.MobileLayout,
        roleSelector = kendo.roleSelector;

    function toRoleSelector(string) {
        return string.replace(/(\S+)/g, "[" + attr("role") + "*=$1],")
    }

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view")).first();
    }

    function hideBar(element) {
        var compensation = 0, newHeight,
            orientation = window.orientation + "";
        element = $(this);

        if (!initialHeight[orientation])
            initialHeight[orientation] = $(window).height();

        if (os.device == "iphone" || os.device == "ipod" || os.android) {
            if (os.android) {
                compensation = 56;
            } else {
                compensation = 60;
            }

            newHeight = initialHeight[orientation] + compensation;
            if (newHeight != element.height()) {
                element.height(newHeight);

                setTimeout(function () {
                    window.scrollTo(0, 1);
                }, 0);
            }
        }
    }

    function hideAddressBar(element) {
        if (os.appMode) {
            return;
        }

        if (os.android) {
            $(window).scroll(function() {
                element.height(window.innerHeight);
            });
        }

        $(window).load($.proxy(hideBar, element));
        $(window).bind("orientationchange", $.proxy(hideBar, element));
    }

    function isInternal(link) {
        return link.data(kendo.ns + "rel") != "external";
    }

    function appLinkMouseUp(e) {
        var link = $(e.currentTarget),
            href = link.attr("href");

        if (!e.isDefaultPrevented() && isInternal(link)) {
            // Prevent iOS address bar progress display for in app navigation
            if (href) {
                link.attr("href", "#!");
                setTimeout(function() { link.attr("href", href) });
                history.navigate(href);
            }

            e.preventDefault();
        }
    }

    function appLinkClick(e) {
        if(isInternal($(e.currentTarget))) {
            e.preventDefault();
        }
    }

    function getOrientationClass() {
        return Math.abs(window.orientation) / 90 ? "km-horizontal" : "km-vertical";
    }

    /**
     * @section The Kendo Mobile Application allows for building native-looking web based mobile applications.
     *
     *
     * <h3>Getting Started</h3>
     * The simplest mobile application consists of a single MobileView. // TODO
     *
     * @exampleTitle Hello World mobile application
     * @example
     * <body>
     *    <div data-role="view">
     *      <div data-role="header">Header</div>
     *      Hello world!
     *      <div data-role="footer">Footer</div>
     *    </div>
     *
     *    <script>
     *    var app = new kendo.mobile.Application(document.body);
     *    </script>
     * </body>
     *
     * @section
     * <h3>View Structure</h3>
     * The Mobile Application consists of one or more views, linked with navigational widgets (MobileButton, TabStrip, etc.).
     * A view is defined by setting an element <code>role</code> data attribute to <code>view</code>.
     * @exampleTitle Define MobileView
     * @example
     * <div data-role="view">Foo</div>
     *
     * @section
     * <h3>Headers and Footers</h3>
     * <p>By default, the MobileView contents are stretched to fit the Application element (the <code>body</code> element by default). Additionally, the MobileView can contain header and footer elements.
     * To mark header and footer elements, add a <code>role</code> data attribute with <code>header</code> and <code>footer</code> value, respectively.
     *
     * @exampleTitle MobileView with Header and Footer.
     * @example
     * <div data-role="view">
     *   <div data-role="header">Header</div>
     *   Hello world!
     *   <div data-role="footer">Footer</div>
     * </div>
     *
     * @section Due to the OS UI design conventions, The header and footer switch positions when an Android device is detected,
     * as usually the footer hosts a MobileTabstrip widget, which is located at the bottom of the screen on iOS, and at the top of the screen in Android applications.
     */
    var Application = kendo.Observable.extend(/** @lends kendo.ui.Mobi.prototype */{
        /**
        * @constructs
        * @extends kendo.Observable
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            var that = this;

            that.options = options || {};
            kendo.Observable.fn.init.call(that, that.options);
            that.element = element ? $(element) : $(document.body);

            var doc = $(document.documentElement);
            doc.addClass("km-" + (!os ? "ios" : os.name) + " " + getOrientationClass());

            $(document).bind("orientationchange", function(e) {
                doc.removeClass("km-horizontal km-vertical")
                   .addClass(getOrientationClass());

                $(".km-scroll-container:visible").css(TRANSFORM, "none"); // Reset the visible scrollbar, TODO: make a scrollIntoView scroller method.
            });

            $(function(){
                hideAddressBar(that.element);
                that._attachMeta();
                that._setupAppLinks();
                that._setupLayouts();
                that._startHistory();
            });
        },

        navigate: function(url) {
            var that = this;

            that._findView(url, function(view) {
                history.navigate(url, true);

                that.trigger("viewHide", { view: that.view });

                ViewSwitcher.replace(that.view, view);
                that._setCurrentView(view);
            });
        },

        scroller: function() {
            return this.view.content.data("kendoScroller");
        },

        _setupAppLinks: function() {
            this.element
                .delegate(linkRolesSelector, support.mousedown, appLinkMouseUp)
                .delegate(buttonRolesSelector, support.mouseup, appLinkMouseUp)
                .delegate(linkRolesSelector + buttonRolesSelector, "click", appLinkClick);
        },

        _setupLayouts: function () {
            var that = this;
            that.layouts = {};
            that.element.find(kendo.roleSelector("layout")).each(function() {
                var layout = $(this);
                that.layouts[layout.data("id")] = new Layout(layout);
            });
        },

        _startHistory: function() {
            var that = this, views, historyEvents;

            views = that.element.find(roleSelector("view"));
            views.first().attr(attr("url"), "/");

            historyEvents = {
                change: function(e) {
                    that.navigate(e.string);
                },

                ready: function(e) {
                    that._findView(e.string, function(view) {
                        views.not(view.element).hide();
                        view.onShowStart();
                        that._setCurrentView(view);
                    });
                }
            };

            history.start($.extend(that.options, historyEvents));
        },

        _setCurrentView: function(view) {
            var that = this, params = history.url().params;
            that.view = view;
            view.params = params;
            that._updateNavigationControls();
            that.trigger("viewShow", {view: view, params: params});
        },

        _updateNavigationControls: function(argument) {
            var that = this;
            var tabstrip = that.element.find(roleSelector("tabstrip")).data("kendoMobileTabstrip");

            // At the moment of switching, the href of the link is set to "#!"
            if (tabstrip) {
                setTimeout(function() {
                    tabstrip.switchTo(history.url().string);
                })
            }

            var navbar = that.element.find(roleSelector("navbar")).data("kendoMobileNavBar");

            if (navbar) {
                navbar.title(that.view.title);
            }
        },

        _createView: function(element) {
            var that = this,
                layout;
            if (layout = element.data("layout")) {
                layout = that.layouts[layout];
            }

            var view = new View(element, {layout: layout});

            if (kendo.mobile) {
                kendo.mobile.enhance(view.element);
            }

            that.trigger("viewInit", {view: view});

            return view;
        },

        _createRemoteView: function(url, html) {
            var that = this, element;

            element = extractView(html);

            element.hide().attr(attr("url"), url);

            that.element.append(element);

            return that._createView(element);
        },

        _findView: function(url, callback) {
            var that = this,
                view,
                firstChar = url.charAt(0),
                local = firstChar === "#",
                remote = firstChar === "/",
                element;

            element = that.element.find("[" + attr("url") + "='" + url + "']");

            if (!element[0] && !remote) {
                element = that.element.find(local ? url : "#" + url);
            }

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (element[0]) {
                callback(that._createView(element));
            } else {
                $.get(url, function(html) {
                    callback(that._createRemoteView(url, html));
                });
            }
        },

        _attachMeta: function() {
            var icon = this.options.icon;

            $("head").prepend(meta);

            if (icon) {
                $("head").prepend(iconMeta({icon: icon}));
            }
        }
    });

    kendo.mobile.Application = Application;
})(jQuery);
