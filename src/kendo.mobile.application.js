(function($, undefined) {
    var kendo = window.kendo,

        history = kendo.history,
        support = kendo.support,
        mobile = kendo.mobile,
        roleSelector = kendo.roleSelector,
        attr = kendo.attr,

        View = mobile.View,
        ViewSwitcher = mobile.ViewSwitcher,
        Layout = mobile.Layout,

        OS = support.mobileOS,
        OS_NAME = !OS ? "ios" : OS.name,
        OS_NAME_CLASS = "km-" + OS_NAME,
        OS_CSS_CLASS = (OS_NAME_CLASS + (OS ? " " + OS_NAME_CLASS + OS.majorVersion : "") + (OS.appMode ? " km-app" : "")),

        TRANSFORM = support.transitions.css + "transform",

        div = $("<div/>"),
        meta = '<meta name="apple-mobile-web-app-capable" content="yes" /> \
                <meta name="apple-mobile-web-app-status-bar-style" content="black" /> \
                <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport" />',
        iconMeta = kendo.template('<link rel="apple-touch-icon' + (support.mobileOS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        buttonRolesSelector = toRoleSelector("button backbutton detailbutton listview-link"),
        linkRolesSelector = toRoleSelector("tab"),

        ORIENTATIONEVENT = "onorientationchange" in window ? "orientationchange" : "resize",
        HIDEBAR = OS.device == "iphone" || OS.device == "ipod",
        BARCOMPENSATION = 60,

        HREF = "href",
        DUMMY_HREF = "#!",
        BODY_REGEX = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,

        scrollTo = window.scrollTo,
        WINDOW = $(window),
        HEAD = $("head"),
        CAPTURE_EVENTS = ["touchstart", "touchend", "touchmove", "mousedown", "mousemove", "mouseup"],

        proxy = $.proxy;

    function toRoleSelector(string) {
        return string.replace(/(\S+)/g, "[" + attr("role") + "=$1],");
    }

    function toDom(html) {
        if (BODY_REGEX.test(html)) {
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
            href = link.attr(HREF);

        // Prevent iOS address bar progress display for in app navigation
        if (!e.isDefaultPrevented() && isInternal(link)) {
            if (href && href != DUMMY_HREF) {
                link.attr(HREF, DUMMY_HREF);
                setTimeout(function() { link.attr(HREF, href) });
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
    * <p>The <strong>Application</strong> supports a platform specific layouts. They can be specified using <code>data-platform=""</code></p>
    * @exampleTitle iOS and Android Application Layout
    * @example
    * <div data-role="view">Bar</div>
    *
    * <div data-role="layout" data-id="foo" data-platform="ios">
    *   <div data-role="header">Header</div>
    * </div>
    *
    * <div data-role="layout" data-id="foo" data-platform="android">
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
    * <p>Navigational widgets can pass additional URL parameters when navigating to <strong>Views</strong>. The parameters will be available in the <code>show</code> <strong>View</strong> event.</p>
    *
    * @exampleTitle Button with additional URL parameters
    * @example
    * <a data-role="button" href="#foo?bar=baz">Link to FOO <strong>View</strong> with bar parameter set to baz</a>
    *
    * @section
    *
    * <h3>Web Clip Icons</h3>
    *
    * <p>The mobile devices can create a bookmark with a custom icon, placed on the Home screen. Users can use the shortcut to open that web page later.</p>
    *
    * @exampleTitle Define web clip icon
    * @example
    * <script>
    *      new kendo.mobile.Application($(document.body), {
    *          icon: "URL to a web clip icon"
    *      });
    * </script>
    *
    * @section
    * <p>You can also define web clip icons with different sizes. Check this <a href="https://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html#//apple_ref/doc/uid/TP40006556-CH14-SW11">link</a>
    * for more information.</p>
    *
    * @exampleTitle Define multiple web clip icons
    * @example
    * <script>
    *      new kendo.mobile.Application($(document.body), {
    *          icon: {
    *            "72x72" : "URL to a 72 x 72 pixels web clip icon",
    *            "114x114" : "URL to a 114 x 114 pixels web clip icon"
    *          }
    *      });
    * </script>
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

            $(function(){
                that._attachHideBarHandlers();
                that._setupElementClass();
                that._attachMeta();
                that._loader();
                that._setupAppLinks();
                that._setupLayouts(that.element);
                that._startHistory();
                that._attachCapture();
            });
        },

        navigate: function(url) {
            var that = this;

            that._findView(url, function(view) {
                if (that.view === view) {
                    return;
                }

                history.navigate(url, true);

                new ViewSwitcher(that).replace(that.view, view);
                that.view = view;
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
            var that = this,
                platformAttr = kendo.ns + "platform";

            element.find(roleSelector("layout")).each(function() {
                var layout = $(this),
                    platform = layout.data(platformAttr);

                if (platform === undefined || platform === OS_NAME) {
                    that.layouts[layout.data("id")] = kendo.initWidget(layout, {}, kendo.mobile.ui);
                }
            });
        },

        _startHistory: function() {
            var that = this, views, historyEvents;

            views = that.element.find(roleSelector("view"));
            that.rootView = views.first();

            historyEvents = {
                change: function(e) {
                    that.navigate(e.string);
                },

                ready: function(e) {
                    that._findView(e.string, function(view) {
                        views.not(view).hide();
                        view.onShowStart();
                        that.view = view;
                    });
                }
            };

            history.start($.extend(that.options, historyEvents));
        },

        _createView: function(element) {
            var that = this,
                layout = that.dataOrDefault(element, "layout");

            if (layout) {
                layout = that.layouts[layout];
            }

            var view = kendo.initWidget(element, {layout: layout}, kendo.mobile.ui);


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

            if (!url) {
                element = that.rootView;
            } else {
                element = that.element.find("[" + attr("url") + "='" + url + "']");

                if (!element[0] && !remote) {
                    element = that.element.find(local ? url : "#" + url);
                }
            }

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (element[0]) {
                callback(that._createView(element));
            } else {
                if (that._xhr) {
                    that._xhr.abort();
                }

                that.showLoading();
                that._xhr = $.get(url, function(html) {
                                callback(that._createRemoteView(url, html));
                                that.hideLoading();
                            })
                            .fail(function() {
                                that.hideLoading();
                            });
            }
        },

        _setupElementClass: function() {
            var that = this,
                osCssClass = that.options.platform ? "km-" + that.options.platform : OS_CSS_CLASS;
                element = that.element;

            element.parent().addClass("km-root");
            element.addClass(osCssClass + " " + getOrientationClass());

            WINDOW.bind(ORIENTATIONEVENT, function(e) {
                element.removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass());

                if (that.view) // On desktop resize is fired rather early
                    that.view.scroller.reset();
            });
        },

        _attachMeta: function() {
            var icon = this.options.icon, size;

            HEAD.prepend(meta);

            if (icon) {
                if (typeof icon === "string") {
                    icon = { "" : icon };
                }

                for(size in icon) {
                    HEAD.prepend(iconMeta({ icon: icon[size], size: size }));
                }
            }
        },

        _attachHideBarHandlers: function() {
            var that = this;

            if (OS.appMode || !that.options.hideAddressBar) {
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

        _attachCapture: function() {
            var that = this;
            that.transitioning = false;

            function capture(e) {
                if (that.transitioning) {
                    e.stopPropagation();
                }
            }

            for (var i = 0; i < CAPTURE_EVENTS.length; i ++) {
                that.element[0].addEventListener(CAPTURE_EVENTS[i], capture, true);
            }
        },

        dataOrDefault: function(element, option) {
            return typeof element.data(kendo.ns + option) !== "undefined" ? element.data(option) : this.options[option];
        },

        hideLoading: function() {
            var that = this;
            clearTimeout(that._loading);
            that.loader.hide();
        },

        showLoading: function() {
            var that = this;

            if (that.options.loading === false) {
                return;
            }

            that._loading = setTimeout(function() {
                that.loader.show();
            }, 100);
        },

        _loader: function() {
            var that = this,
                text = that.options.loading;

            if (text === undefined) {
                text = "<h1>Loading...";
            }

            that.loader = $('<div class="km-loader"><span class="km-loading km-spin"></span>' + text + "</div>")
                            .hide()
                            .appendTo(that.element);
        }
    });

    kendo.mobile.Application = Application;
})(jQuery);
