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
        ORIENTATIONEVENT = "onorientationchange" in window ? "orientationchange" : "resize",
        View = mobile.View,
        ViewSwitcher = mobile.ViewSwitcher,
        Layout = mobile.Layout,
        VIEW_INIT = "viewInit",
        VIEW_SHOW = "viewShow",
        lastOrientation = -1,
        roleSelector = kendo.roleSelector;

    function toRoleSelector(string) {
        return string.replace(/(\S+)/g, "[" + attr("role") + "*=$1],")
    }

    function toDom(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }
        div[0].innerHTML = html;
        return div;
    }

    function hideBar(element) {
        var compensation = 0, newHeight,
            orientation = window.orientation + "";

        if (lastOrientation != orientation) {
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

            lastOrientation = orientation;
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
        $(window).bind(ORIENTATIONEVENT, $.proxy(hideBar, element));
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
     * <p>The Kendo Mobile Application provides the necessary tools for building native-looking web based mobile applications.</p>
     *
     * <h3>Getting Started</h3>
     * <p>The simplest mobile application consists of a single mobile View. </p>
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
     *    var app = new kendo.mobile.Application();
     *    </script>
     * </body>
     *
     * @section
     * <h3>View Structure</h3>
     *
     * <p>The mobile Application consists of a single HTML page with one or more mobile Views, linked with navigational widgets (Buttons, TabStrip, etc.).
     * Each element within the application element (by default, the <code>body</code>) with <code>role</code> data attribute set to <code>view</code> is considered a mobile view. </p>
     *
     * @exampleTitle Define mobile View
     * @example
     * <div data-role="view">Foo</div>
     *
     * @section
     * <h3>Headers and Footers</h3>
     * <p>By default, the mobile View contents stretch to fit the Application element (the <code>body</code> element by default). Additionally, the mobile View can have header and footer.
     * To mark header and footer elements, add elements with <code>role</code> data attribute set to <code>header</code> and <code>footer</code> value, respectively. </p>
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
     * <p>A mobile Layout is used to share headers and footers between multiple views. A Layout contains header and/or footer element, which are applied to any view that uses it.
     * A view is defined by setting an element's <code>role</code> data attribute to <code>layout</code>. A View is associated with a Layout by setting its <code>layout</code> data attribute value
     * to the value of the layout's <code>id</code> <strong>data attribute</strong>.</p>
     *
     * <p>An Application default layout can be set, by passing the layout id in the <code>options</code> parameter of the Application's constructor.
     * A mobile View can remove the default application Layout by setting its <code>layout</code> data attribute to empty string ("").</p>
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
     * @exampleTitle Default Application Layout
     * @example
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
     * <p>When initialized, the Mobile Application modifies the kendo mobile widgets' behavior, so that they navigate between Views when pressed.
     * The navigation Widget's <code>href</code> attribute specifies the view id to navigate to.</p>
     *
     * @exampleTitle Views linked with mobile Buttons
     * @example
     * <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
     * <div data-role="view" id="bar">Bar <a href="#foo" data-role="button">Go to Foo</a></div>
     *
     * @section
     *
     * <h3>View Transitions</h3>
     * <p>View transitions are defined by by setting a <code>transition</code> data attribute to the View DOM element.
     * A default View transition may be set using the <code>transition</code> parameter in the options parameter of the Application constructor.
     * The following transitions are supported:</p>
     *
     * <h4>slide</h4>
     * <p> The default iOS View transition. Previous view contents slide to the left, with new View contents sliding in their place.
     * Headers and footers (if present) use the <strong>fade</strong> transition. </p>
     *
     * <h4>zoom</h4>
     * <p>The new View contents (along with its header and footer) zoom and fade from the center of the screen on top of the previous View contents. Suitable for displaying dialogs.</p>
     *
     * <h4>fade</h4>
     * <p>The new View contents (along with its header and footer) fade from the center of the screen on top of the previous View contents.</p>
     *
     * <h4>overlay</h4>
     * <p>The new View contents slide on top of the previous View. Unlike the <code>slide</code> transition,
     * the previous view stays "below" the new one, and headers/footers do not transition separately. </p>
     * <p>The transition direction can be specified by using <code>overlay:(direction)</code>.
     * Supported directions are <code>down</code>, <code>left</code>, <code>up</code> and <code>right</code>. By default, the direction is <code>left</code>.</p>
     *
     * @exampleTitle Views with Transitions
     * @example
     * <div data-role="view" id="foo" data-transition="slide">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
     * <div data-role="view" id="bar" data-transition="overlay:up">Bar <a href="#foo" data-role="button">Go to Foo</a></div>
     *
     * @section
     *
     * <p>When a View transitions to the View displayed before it (foo → bar → foo), this is considered a <strong>back</strong> navigation.
     * In this case, the animation of the current view is applied in reverse.
     * For instance, navigating with slide animation from <code>foo</code> to <code>bar</code>, then back to <code>foo</code>
     * would cause the <code>foo</code> View to slide from the right side of the screen, creating the effect of "coming back from where it came". </p>
     *
     * @section
     *
     * <h3>Remote Views</h3>
     *
     * <p>The Kendo mobile Application can load Views remotely, using AJAX. If the navigational widget URL does not start with a hash (#),
     * the application considers the View to be remote, and issues an AJAX request to the provided URL.
     * The View contents (first element with <code>role</code> data attribute set to <code>view</code>) are extracted from the AJAX response and appended into the Application element.
     * Once the remote View is fetched, no additional roundtrips to the server occur when the View is displayed. </p>
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
     * <p>Navigational widgets can pass additional URL parameters when navigating to Views. The parameters will be available in the <code>viewShow</code> Application event.</p>
     *
     * @exampleTitle Button with additional URL parameters
     * @example
     * <a data-role="button" href="#foo?bar=baz">Link to FOO view with bar parameter set to baz</a>
     */
    var Application = kendo.Observable.extend(/** @lends kendo.mobile.Application.prototype */{
        /**
         * @constructs
         * @extends kendo.Observable
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [layout] <> The id of the default Application layout.
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
         * @option {String} [transition] <> The default View transition.
         * _example
         * <script>
         *      new kendo.mobile.Application($(document.body), { transition: "slide" });
         * </script>
         */
        init: function(element, options) {
            var that = this;

            that.options = options || {};
            that.layouts = {};
            kendo.Observable.fn.init.call(that, that.options);
            that.element = element ? $(element) : $(document.body);

            that.bind([
            /**
             * Fires the first time when a View is displayed.
             * @name kendo.mobile.Application#viewInit
             * @event
             * @param {Event} e
             * @param {kendo.mobile.View} e.view The displayed View.
             */
              VIEW_INIT,
            /**
             * Fires when a View is displayed.
             * @name kendo.mobile.Application#viewShow
             * @event
             * @param {Event} e
             * @param {kendo.mobile.View} e.view The displayed View.
             * @param {Object} e.params The URL params passed.
             *
             * @exampleTitle Display View with URL parameters
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
                that._setupLayouts(that.element);
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

        _setupLayouts: function(element) {
            var that = this;
            element.find(kendo.roleSelector("layout")).each(function() {
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
            that.trigger(VIEW_SHOW, {view: view, params: params});
        },

        _createView: function(element) {
            var that = this,
                layout = that.dataOrDefault(element, "layout");

            if (layout) {
                layout = that.layouts[layout];
            }

            var view = new View(element, {layout: layout});

            that.trigger(VIEW_INIT, {view: view});

            return view;
        },

        _createRemoteView: function(url, html) {
            var that = this,
                dom = $(toDom(html)),
                views = dom.find(roleSelector("view")).hide(),
                layouts = dom.find(roleSelector("layout")),
                scriptsAndStyles = dom.find("script, style"),
                element = views.first(),
                view;

            element.hide().attr(attr("url"), url);

            that._setupLayouts(dom);
            that.element.append(layouts);
            that.element.append(scriptsAndStyles);
            that.element.append(views);

            view = that._createView(element);
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

            $(window).bind(ORIENTATIONEVENT, function(e) {
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
