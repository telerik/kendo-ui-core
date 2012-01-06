(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
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
        View = mobile.View,
        ViewSwitcher = mobile.ViewSwitcher,
        Layout = mobile.Layout,
        VIEW_INIT = "viewInit",
        VIEW_SHOW = "viewShow",
        roleSelector = kendo.roleSelector;

    function toRoleSelector(string) {
        return string.replace(/(\S+)/g, "[" + attr("role") + "*=$1],")
    }

    function extractScripts(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find("script");
    }

    function extractViews(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view"));
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
     * @name kendo.mobile.Application.Description
     * @section
     *
     * <p>The Kendo Mobile Application allows for building native-looking web based mobile applications.</p>
     *
     * <h3>Getting Started</h3>
     * <p>The simplest mobile application consists of a single mobile View.  </p>
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
     *
     * <p>The Mobile Application consists of one or more views, linked with navigational widgets (MobileButton, TabStrip, etc.).
     * A view is defined by setting an element <code>role</code> data attribute to <code>view</code>.  </p>
     *
     * @exampleTitle Define mobile View
     * @example
     * <div data-role="view">Foo</div>
     *
     * @section
     * <h3>Headers and Footers</h3>
     * <p>By default, the mobile View contents stretch to fit the Application element (the <code>body</code> element by default). Additionally, the mobile View can contain header and footer elements.
     * To mark header and footer elements, add a <code>role</code> data attribute with <code>header</code> and <code>footer</code> value, respectively. Multiple views can be defined in a single page.</p>
     *
     * @exampleTitle Mobile View with Header and Footer
     * @example
     * <div data-role="view">
     *   <div data-role="header">Header</div>
     *   Hello world!
     *   <div data-role="footer">Footer</div>
     * </div>
     *
     * @section
     * <p>Due to the OS UI design conventions, The header and footer switch positions when an Android device is detected, as usually the footer hosts a MobileTabstrip widget, which is located at the bottom of the screen on iOS, and at the top of the screen in Android applications.  </p>
     *
     * @section
     * <h3>Layout</h3>
     * <p>A mobile layout is used to share headers and footers between multiple views. A layout contains header and/or footer element, which are applied to any view that uses it.
     * A view is defined by setting an element <code>role</code> data attribute to <code>layout</code>. A view is associated with a layout by setting its <code>layout</code> data attribute value
     * to the value of the layout's <code>id</code> data attribute.</p>
     *
     * <p>An Application default layout can be set, by passing the layout id in the options parameter of the constructor. A mobile View can remove the default layout by setting its<code>layout</code> data attribute to empty string ("").</p>
     *
     * @exampleTitle Views with Layout
     * @example
     * <div data-role="view" data-layout="foo">Foo</div>
     * <div data-role="view" data-layout="foo">Bar</div>
     *
     * <div data-role="layout" data-id="foo">
     *   <div data-role="header">Header</div>
     *   <div data-role="footer">Footer</div>
     * </div>
     *
     * @exampleTitle Default Application layout
     * <div data-role="view">Bar</div>
     *
     * <div data-role="layout" data-id="foo">
     *   <div data-role="header">Header</div>
     * </div>
     *
     * <script>
     *      new kendo.mobile.Application($(document.body), { layout: "foo" });
     * </script>
     *
     * @section
     *
     * <h3>Navigation</h3>
     * <p>When initialized, the Mobile Application modifies the kendo mobile widgets' behavior, so that they navigate between views on touch. Widgets' href attribute specifies the view id.</p>
     *
     * @exampleTitle Views linked with Kendo MobileButtons
     * @example
     * <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
     * <div data-role="view" id="bar">Bar <a href="#foo" data-role="button">Go to Foo</a></div>
     *
     * @section
     *
     * <h3>View Transitions</h3>
     * <p>View transitions can be customized by setting <code>transition</code> data attribute to the view DOM element.
     * A default view transition may be specified using the <code>transition</code> parameter in the options parameter of the application constructor.
     * The following transitions are supported:</p>
     *
     * <h4>slide</h4>
     * <p> The default iOS view transition. Previous view contents slide to the left, with new view contents sliding in their place. Headers and footers (if present) use the fade transition.  </p>
     *
     * <h4>zoom</h4>
     * <p>The new view contents (along with its header and footer) zoom and fade from the center of the screen on top of the previous view contents. Suitable for displaying dialogs.</p>
     *
     * <h4>fade</h4>
     * <p>The new view contents (along with its header and footer) fade from the center of the screen on top of the previous view contents.</p>
     *
     * <h4>overlay</h4>
     * <p>The new view contents slide on top of the previous view. Unlike the <code>slide</code> transition, The previous view stays "below" the new one, and headers/footers do not transition separately.  </p>
     * <p>The transition direction can be specified by using <code>overlay:(direction)</code>. Supported directions are <code>down</code>, <code>left</code>, <code>up</code> and <code>right</code>. By default, the  direction is <code>left</code>.</p>
     *
     * @exampleTitle Views with Transitions
     * @example
     * <div data-role="view" id="foo" data-transition="slide">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
     * <div data-role="view" id="bar" data-transition="overlay:up">Bar <a href="#foo" data-role="button">Go to Foo</a></div>
     *
     * @section
     *
     * <p>When a view transitions to the view displayed before it (foo → bar → foo), this is considered a <strong>back</strong> navigation. In this case, the animation of the current view is applied in reverse. For instance,
     * navigating with slide animation from foo to bar, then back to foo would cause the foo view to slide from the right side of the screen, creating the effect of "coming back from where it came".  </p>
     *
     * @section
     *
     * <h3>Remote Views</h3>
     *
     * <p>The Kendo Mobile Application can load views remotely, using ajax. If the navigational widget url is does not start with a hash (#),
     * the application considers the view to be remote, and issues an ajax request to the provided url. The view contents are extracted from the response
     * (first element with <code>role</code> data attribute set to <code>view</code>) and appended into the application element.
     * Once fetched, the remote view contents are already present in the current page and no additional roundtrips to the server occur.  </p>
     *
     * @exampleTitle Remote view
     * @example
     * <!-- foo.html -->
     * <div data-role="view">Foo <a href="bar.html" data-role="button">Go to Bar</a></div>
     *
     * <!-- bar.html -->
     * <div data-role="view">Bar</div>
     *
     * @section
     *
     * <h3>View Parameters</h3>
     *
     * <p>Navigational widgets can pass additional URL parameters when showing views. The parameters are defined in the same way as the standard query string. </p>
     * <p>The passed parameters will be available in the viewShow Application event.
     *
     * @exampleTitle Button to view with additional URL parameter
     * @example
     * <a data-role="button" href="#foo?bar=baz">Link to FOO view with bar parameter set to baz</a>
     */
    var Application = kendo.Observable.extend(/** @lends kendo.mobile.Application.prototype */{
        /**
         * @constructs
         * @extends kendo.Observable
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [layout] <> The id of the default application layout.
         * _example
         * <div data-role="view">Bar</div>
         *
         * <div data-role="layout" data-id="foo">
         *   <div data-role="header">Header</div>
         * </div>
         *
         * <script>
         *      new kendo.mobile.Application($(document.body), { layout: "foo" });
         * </script>
         * @option {String} [transition] <> The default view transition type.
         * _example
         * <script>
         *      new kendo.mobile.Application($(document.body), { transition: "slide" });
         * </script>
         */
        init: function(element, options) {
            var that = this;

            that.options = options || {};
            kendo.Observable.fn.init.call(that, that.options);
            that.element = element ? $(element) : $(document.body);

            that.bind([
            /**
             * Fires the first time when view is displayed.
             * @name kendo.mobile.Application#viewInit
             * @event
             * @param {Event} e
             * @param {kendo.mobile.View} e.view The displayed view.
             */
              VIEW_INIT,
            /**
             * Fires when a view is displayed.
             * @name kendo.mobile.Application#viewShow
             * @event
             * @param {Event} e
             * @param {kendo.mobile.View} e.view The displayed view.
             * @param {Object} e.params The URL params passed.
             *
             * @exampleTitle Display view with URL parameters
             * @example
             * <div id="foo" data-role="view"><a href="#bar?baz=qux">Go to bar</a></div>
             * <div id="bar" data-role="view">Bar</div>
             *
             * <script>
             *      // ...
             *      application.bind("viewShow", function(e) {
             *          console.log(e.view); // kendo.mobile.View instance
             *          console.log(e.params); // {"baz": "qux"}
             *      });
             * </script>
             */
              VIEW_SHOW
            ], that.options);

            $(function(){
                hideAddressBar(that.element);
                that._attachOrientationChange();
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

                new ViewSwitcher(that).replace(that.view, view);
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
            that.trigger(VIEW_SHOW, {view: view, params: params});
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
                layout = that.dataOrDefault(element, "layout");

            if (layout) {
                layout = that.layouts[layout];
            }

            var view = new View(element, {layout: layout});

            if (kendo.mobile) {
                kendo.mobile.enhance(view.element);
            }

            that.trigger(VIEW_INIT, {view: view});

            return view;
        },

        _createRemoteView: function(url, html) {
            var that = this,
                views = extractViews(html).hide(),
                scripts = extractScripts(html),
                element = views.first(),
                view;

            element.hide().attr(attr("url"), url);

            that.element.append(views);

            view = that._createView(element);
            that.element.append(scripts)
            return view;
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

        _attachOrientationChange: function() {
            var that = this, element = that.element;
            element.parent().addClass("km-root");
            element.addClass("km-" + (!os ? "ios" : os.name) + " " + getOrientationClass());

            $(document).bind("orientationchange", function(e) {
                element.removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass());

                // Reset the visible scrollbar,
                // TODO: make a scrollIntoView scroller method.
                $(".km-scroll-container:visible").css(TRANSFORM, "none");
            });
        },

        _attachMeta: function() {
            var icon = this.options.icon;

            $("head").prepend(meta);

            if (icon) {
                $("head").prepend(iconMeta({icon: icon}));
            }
        },

        dataOrDefault: function(element, option) {
            return typeof element.data(kendo.ns + option) !== "undefined" ? element.data(option) : this.options[option];
        }
    });

    kendo.mobile.Application = Application;
})(jQuery);
