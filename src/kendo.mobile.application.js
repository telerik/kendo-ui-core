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
        TRANSFORM = support.transitions.css + "transform",
        ORIENTATIONEVENT = "onorientationchange" in window ? "orientationchange" : "resize",
        View = mobile.View,
        ViewSwitcher = mobile.ViewSwitcher,
        Layout = mobile.Layout,
        VIEW_INIT = "viewInit",
        VIEW_SHOW = "viewShow",
        roleSelector = kendo.roleSelector,
        scrollTo = window.scrollTo,
        HIDEBAR = os.device == "iphone" || os.device == "ipod",
        BARCOMPENSATION = 60,
        WINDOW = $(window),
        proxy = $.proxy;

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

    function isInternal(link) {
        return link.data(kendo.ns + "rel") != "external";
    }

    function appLinkMouseUp(e) {
        if (e.which > 1) {
            return;
        }

        var link = $(e.currentTarget),
            href = link.attr("href");

        // Prevent iOS address bar progress display for in app navigation
        if (!e.isDefaultPrevented() && isInternal(link)) {
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

    function getOSClass() {
        var osName = "km-" + (!os ? "ios" : os.name);
        return (osName + (os ? " " + osName + os.majorVersion : ""));
    }

    function getOrientationClass() {
        return Math.abs(window.orientation) / 90 ? "km-horizontal" : "km-vertical";
    }

    /**
     * @name kendo.mobile.Application.Description
     * @section
     *
     * <p>The Kendo mobile <strong>Application</strong> provides the necessary tools for building native-looking web based mobile applications.</p>
     *
     * <h3>Getting Started</h3>
     * <p>The simplest mobile <strong>Application</strong> consists of a single mobile <strong>View</strong>. </p>
     *
     * @exampleTitle Hello World mobile Application
     * @example
     * <body>
     *    <div data-role="view">
     *      <div data-role="header">Header</div>
     *      Hello world!
     *      <div data-role="footer">Footer</div>
     *    </div>
     *
     *    <script>
     *    var app = new kendo.mobile.Application(); //document.body is used by default
     *    </script>
     * </body>
     *
     * @section
     * <h3>View Structure</h3>
     *
     * <p>The mobile <strong>Application</strong> consists of a single HTML page with one or more mobile Views, linked with navigational widgets (Buttons, TabStrip, etc.).
     * A mobile <strong>View</strong> is considered each child of the application element (<code>&lt;body&gt;</code> by default) that is decorated with <code>data-role="view"</code>.
     *
     * @exampleTitle Define mobile View
     * @example
     * <div data-role="view">Foo</div>
     *
     * @section
     * <h3>Headers and Footers</h3>
     * <p>By default, the mobile <strong>View</strong> contents stretch to fit the application element. The mobile <strong>View</strong> can also have a header and a footer.
     * In order to mark header and footer elements, add elements with attribute <code>data-role="header"</code> and <code>data-role="footer"</code>. </p>
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
     * <strong>Important:</strong>
     * <p>Because of the OS UI design conventions, the header and the footer switch positions when an Android device is detected. Usually the footer hosts a MobileTabstrip widget, which is located at the bottom of the screen on iOS, and at the top of the screen in Android applications.  </p>
     *
     * @section
     * <h3>Layout</h3>
     * <p>A mobile <strong>Layout</strong> is used to share headers and footers between multiple <strong>Views</strong>. The header and/or footer element of the <strong>Layout</strong> are applied to any <strong>View</strong> that uses it.
     * To define a <strong>Layout</strong> set <code>data-role="layout"</code> to an element. To associate a <strong>View</strong> to a <strong>Layout</strong> set <code>data-layout</code> attribute.
     * A <strong>View</strong> is associated with a <strong>Layout</strong> by setting its <code>data-layout</code> attribute value
     * to the value of the layout's <code>data-id</code> attribute:</p>
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
     * @section
     * <p>A default <strong>Application</strong> layout can be set by passing the layout id in the <code>options</code> parameter of the <strong>Application</strong>'s constructor.
     * A mobile <strong>View</strong> can remove the default application <strong>Layout</strong> by setting <code>data-layout=""</code>.</p>
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
     * <p>When initialized, the mobile <strong>Application</strong> modifies the kendo mobile widgets' behavior so that they navigate between <strong>Views</strong> when pressed.
     * The navigation <strong>Widget</strong>'s <code>href</code> attribute specifies the <strong>View</strong> id to navigate to.</p>
     *
     * @exampleTitle Views linked with mobile Buttons
     * @example
     * <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
     * <div data-role="view" id="bar">Bar <a href="#foo" data-role="button">Go to Foo</a></div>
     *
     * @section
     *
     * <h3>View Transitions</h3>
     * <p><strong>View</strong> transitions are defined by setting a <code>data-transition</code> attribute to the <strong>View</strong> DOM element.
     * A default <strong>View</strong> transition may be set using the <code>transition</code> parameter in the options parameter of the <strong>Application</strong> constructor.
     * The following transitions are supported:</p>
     *
     * <h4>slide</h4>
     * <p> This is the default iOS <strong>View</strong> transition. Old <strong>View</strong> content slides to the left and the new <strong>View</strong> content slides in its place.
     * Headers and footers (if present) use the <strong>fade</strong> transition. </p>
     *
     * <h4>zoom</h4>
     * <p>The new <strong>View</strong> (along with its header and footer) content zooms over the previous <strong>View</strong>. The old <strong>View</strong> content fades out. Suitable for displaying dialogs.</p>
     *
     * <h4>fade</h4>
     * <p>The new <strong>View</strong> (along with its header and footer) content fades from the center of the screen, on top of the previous <strong>View</strong> content.</p>
     *
     * <h4>overlay</h4>
     * <p>The new <strong>View</strong> content slides on top of the previous <strong>View</strong>. Unlike the <code>slide</code> transition,
     * the previous <strong>View</strong> stays "under" the new one, and the headers / footers do not transition separately. </p>
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
     * <p>When a <strong>View</strong> transitions to the <strong>View</strong> displayed before it (foo → bar → foo), this is considered a <strong>back</strong> navigation.
     * In this case, the animation of the current <strong>View</strong> is applied in reverse.
     * For instance, navigating with slide animation from <code>foo</code> to <code>bar</code>, then back to <code>foo</code>
     * would cause the <code>foo</code> <strong>View</strong> to slide from the right side of the screen. </p>
     *
     * @section
     *
     * <h3>Remote Views</h3>
     *
     * <p>The Kendo mobile <strong>Application</strong> can load <strong>Views</strong> remotely by using AJAX. If the navigational widget URL does not start with a hash (#),
     * the application considers the <strong>View</strong> to be remote, and issues an AJAX request to the provided URL.
     * The <strong>View</strong> content (the first element with <code>data-role="view"</code>) are extracted from the AJAX response and appended into the <strong>Application</strong> element.
     * Once the remote <strong>View</strong> is fetched, no additional roundtrips to the server occur when the <strong>View</strong> is displayed. </p>
     *
     * @exampleTitle Remote View
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
     * <p>Navigational widgets can pass additional URL parameters when navigating to <strong>Views</strong>. The parameters will be available in the <code>viewShow</code> <strong>Application</strong> event.</p>
     *
     * @exampleTitle Button with additional URL parameters
     * @example
     * <a data-role="button" href="#foo?bar=baz">Link to FOO <strong>View</strong> with bar parameter set to baz</a>
     */
    var Application = kendo.Observable.extend(/** @lends kendo.mobile.Application.prototype */{
        /**
         * @constructs
         * @extends kendo.Observable
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [layout] <> The id of the default Application layout.
         * @option {Boolean} [hideAddressBar] <true> Whether to hide the browser address bar.
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

            that.layouts = {};
            that.options = $.extend({ hideAddressBar: true }, options);
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
                that._attachHideBarHandlers();
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
                        var element = view.element;

                        views.not(view).hide();
                        view.onShowStart();
                        that._setCurrentView(view);

                        history.navigate(element.attr("id") || element.data("url"), true);
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
            element.addClass(getOSClass() + " " + getOrientationClass());

            WINDOW.bind(ORIENTATIONEVENT, function(e) {
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

        _attachHideBarHandlers: function() {
            var that = this;

            if (os.appMode || !that.options.hideAddressBar) {
                return;
            }

            that._initialHeight = {};
            that._lastOrientation = -1;

            if (HIDEBAR) {
                WINDOW.bind("load " + ORIENTATIONEVENT, proxy(that._hideBar, that));
            }
        },

        _hideBar: function() {
            var that = this,
                element = that.element,
                orientation = window.orientation + "",
                initialHeight = that._initialHeight,
                lastOrientation = that._lastOrientation,
                newHeight;

            if (lastOrientation === orientation) {
                return;
            }

            that._lastOrientation = orientation;

            if (!initialHeight[orientation]) {
                initialHeight[orientation] = WINDOW.height();
            }

            newHeight = initialHeight[orientation] + BARCOMPENSATION;

            if (newHeight != element.height()) {
                element.height(newHeight);
                setTimeout(scrollTo, 0, 0, 1);
            }
        },

        dataOrDefault: function(element, option) {
            return typeof element.data(kendo.ns + option) !== "undefined" ? element.data(option) : this.options[option];
        }
    });

    kendo.mobile.Application = Application;
})(jQuery);
