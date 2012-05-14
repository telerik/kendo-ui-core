(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        history = kendo.history,
        support = kendo.support,
        Pane = mobile.ui.Pane,

        DEFAULT_OS = "ios",
        OS = support.mobileOS,
        OS_NAME_TEMPLATE = kendo.template("#=data.name##if(data.version){# #=data.name##=data.version.major# km-m#=data.version.minor# #=data.version.appMode?'km-app':'km-web'##}#", {usedWithBlock: false}),
        BERRYPHONEGAP = OS.device == "blackberry" && OS.flatVersion >= 600 && OS.flatVersion < 1000 && OS.appMode,
        VERTICAL = "km-vertical",
        HORIZONTAL = "km-horizontal",

        MOBILE_UA = {
            ios: "iPhone OS 4_3",
            android: "Android 2.3.3",
            blackberry: "PlayBook Version/7.2.0.0",
            meego: "MeeGo NokiaBrowser/8.5.0"
        },

        viewportTemplate = kendo.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width#=data.height#" name="viewport" />', {usedWithBlock: false}),
        meta = '<meta name="apple-mobile-web-app-capable" content="yes" /> ' +
               '<meta name="apple-mobile-web-app-status-bar-style" content="black" /> ' +
                viewportTemplate({ height: "" }),

        iconMeta = kendo.template('<link rel="apple-touch-icon' + (support.mobileOS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        ORIENTATIONEVENT = "onorientationchange" in window ? "orientationchange" : "resize",
        HIDEBAR = OS.device == "iphone" || OS.device == "ipod",
        BARCOMPENSATION = 60,

        WINDOW = $(window),
        HEAD = $("head"),
        proxy = $.proxy;

    function isOrientationHorizontal() {
        return (Math.abs(window.orientation) / 90 == 1);
    }

    function getOrientationClass() {
        return isOrientationHorizontal() ? HORIZONTAL : VERTICAL;
    }

    function applyViewportHeight() {
        $("meta[name=viewport]").replaceWith(viewportTemplate({ height: isOrientationHorizontal() ? ", height=device-width" : ", height=device-height" }));
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
    * <h3>Mobile Views</h3>
    *
    * <p>The mobile <strong>Application</strong> consists of a single HTML page with one or more mobile Views, linked with navigational widgets (Buttons, TabStrip, etc.).
    * A mobile <strong>View</strong> is considered each child of the application element (<code>&lt;body&gt;</code> by default) that is decorated with <code>data-role="view"</code>.
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
    * <p>By default, all navigational widgets treat the links' hrefs as mobile views. This behavior can be overriden by setting <code>data-rel="external"</code> attribute to the link element.  </p>
    *
    * @exampleTitle External links
    * @example
    * <a href="http://kendoui.com/" data-rel="external">Visit KendoUI</a>
    *
    * @section
    *
    * <h3>View Transitions</h3>
    * <p><strong>View</strong> transitions are defined by setting a <code>data-transition</code> attribute to the <strong>View</strong> DOM element or to the navigational widget <code>A</code> DOM element.
    * If both are present, the navigational widget transition takes precedence.
    * A default <strong>View</strong> transition may be set using the <code>transition</code> parameter in the options parameter of the <strong>Application</strong> constructor.
    * The following transitions are supported:</p>
    *
    * <h4>slide</h4>
    * <p> This is the default iOS <strong>View</strong> transition. Old <strong>View</strong> content slides to the left and the new <strong>View</strong> content slides in its place.
    * Headers and footers (if present) use the <strong>fade</strong> transition. </p>
    * <p>The transition direction can be specified by using <code>slide:(direction)</code>.
    * Supported directions are <code>left</code> and <code>right</code>. By default, the direction is <code>left</code>.</p>
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
    * <p>Each transition may be played in <strong>reverse</strong>. To do so, add <code>" reverse"</code> after the transition definition. For
    * instance, to simulate returning to previous view using slide transition, use <code>"slide:left reverse"</code></p>
    * @exampleTitle Reverse transition
    * @example
    * <div data-role="view" id="foo">Foo <a href="#bar" data-role="button">Go to Bar</a></div>
    * <div data-role="view" id="bar">Bar <a href="#foo" data-role="button" data-transition="slide:left reverse">Go to Foo</a></div>
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
    * <p>The remote view request will also append (but not initialize) any <strong>additional views</strong> found in the AJAX
    * response. <strong>Inline style</strong> elements, <strong>inline script</strong> elements, and <strong>mobile layout</strong> definitions will also be evaluated and appended to the
    * application. The elements must be available in the root of the response, or nested inside the <strong>body</strong> element.
    * Scripts and styles from the <strong>head</strong> element (if present) will <strong>not</strong> be evaluated.</p>
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
    * <h3> Initial View</h3>
    *
    * <p> The <strong>Application</strong> provides a way to specify the initial view to show. The initial view can be set by
    * passing the view id in the options parameter of the Application's constructor:
    * @exampleTitle Define initial view
    * @example
    * <script>
    *      new kendo.mobile.Application($(document.body), {
    *          initial: "ViewID"
    *      });
    * </script>

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
    *
    * @section
    * <h3>Force platform styles</h3>
    *
    * <p> The <strong>Application</strong> provides a way to force a specific platform look on your application upon init by
    * passing the OS name in the options parameter of the Application's constructor:
    * @exampleTitle Force iOS look
    * @example
    * <script>
    *      new kendo.mobile.Application($(document.body), {
    *          platform: "ios"
    *      });
    * </script>
    *
    * Additionally, if you want to specify os version, you can pass the entire kendo.support.mobileOS object that is expected by Kendo UI Mobile.
    * This is more complex, but allows fine grained tuning of the application look and behavior. A sample object initialization is like this:
    * @exampleTitle Force iOS 5 look
    * @example
    * <script>
    *      new kendo.mobile.Application($(document.body), {
    *          platform: {
    *                         device: "ipad",       // Mobile device, can be "ipad", "iphone", "ipod", "android" "fire", "blackberry", "meego"
    *                         name: "ios",          // Mobile OS, can be "ios", "android", "blackberry", "meego"
    *                         ios: true,            // Mobile OS name as a flag
    *                         majorVersion: 5,      // Major OS version
    *                         minorVersion: "0.0",  // Minor OS versions
    *                         flatVersion: "500",   // Flat OS version for easier comparison
    *                         appMode: false        // Whether running in browser or in AppMode/PhoneGap/Titanium.
    *                    }
    *      });
    * </script>
    */
    var Application = kendo.Observable.extend(/** @lends kendo.mobile.Application.prototype */{
        /**
         * @constructs
         * @extends kendo.Observable
         * @param {DomElement} element DOM element. By default, the body element is used.
         * @param {Object} options Configuration options.
         * @option {String} [layout] <> The id of the default Application Layout.
         * @option {String} [initial] <> The id of the initial mobilie View to display.
         * _example
         * <script>
         *      new kendo.mobile.Application($(document.body), {
         *          initial: "ViewID"
         *      });
         * </script>
         * @option {String} [loading] <Loading...> The text displayed in the loading popup. Setting this value to false will disable the loading popup.
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
         * @option {String} [platform] <> Which platform look to force on the application. Can be one of "ios", "android", "blackberry".
         * _example
         * <script>
         *      new kendo.mobile.Application($(document.body), {
         *          platform: "android"
         *      });
         * </script>
         */
        init: function(element, options) {
            var that = this;

            mobile.application = that; // global reference to current application

            that.options = $.extend({ hideAddressBar: true, transition: "" }, options);
            kendo.Observable.fn.init.call(that, that.options);
            that.element = $(element ? element : document.body);

            $(function(){
                that._setupPlatform();
                that._attachHideBarHandlers();
                that.pane = new Pane(that.element, that.options);
                that._setupElementClass();
                that._attachMeta();
                that._setupDocumentTitle();
                that._startHistory();
            });
        },

        /**
         * Navigate the local or remote view.
         * @param {String} url The id or url of the view.
         * @param {String} transition The transition to apply when navigating. See View Transitions section for more
         * information.
         *
         * @exampleTitle Navigate to a remote view
         * @example
         * var app = new kendo.mobile.Application();
         * app.navigate("settings.html");
         *
         * @exampleTitle Navigate to a local view
         * @example
         * <div data-role="view" id="foo"> ... </div>
         *
         * <script>
         * var app = new kendo.mobile.Application();
         * app.navigate("#foo");
         * </script>
         */
        navigate: function(url, transition) {
            this.pane.navigate(url, transition);
        },

        /**
         * Get a reference to the current view's scroller widget instance.
         * @returns {Scroller} the scroller widget instance.
         */
        scroller: function() {
            return this.view().scroller;
        },

        /**
         * Hide the loading animation.
         * @example
         * <script>
         *   var app = new kendo.mobile.Application();
         *   app.hideLoading();
         * </script>
         */
        hideLoading: function() {
            this.pane.hideLoading();
        },

        /**
         * Show the loading animation.
         * @example
         * <script>
         *   var app = new kendo.mobile.Application();
         *   app.showLoading();
         * </script>
         */
        showLoading: function() {
            this.pane.showLoading();
        },

        /**
         * Get a reference to the current view.
         * @returns {View} the view instance.
         */
        view: function() {
            return this.pane.view();
        },

        _setupPlatform: function() {
            var that = this,
                platform = that.options.platform,
                os = OS,
                version;

            if (platform) {
                if (typeof platform === "string") {
                    os = support.detectOS(MOBILE_UA[platform]);
                } else {
                    os = platform;
                }

                support.mobileOS = os;
            }

            if (os) {
                that.os = os.name;
                version = {
                    appMode: os.appMode,
                    major: os.majorVersion,
                    minor: os.minorVersion ? os.minorVersion[0] : 0
                };
            } else {
                that.os = DEFAULT_OS;
                version = false;
            }

            that.osCssClass = OS_NAME_TEMPLATE({ name: "km-" + that.os, version: version });
        },

        _startHistory: function() {
            var that = this,
                historyEvents,
                initial = that.options.initial;

            historyEvents = {
                change: function(e) {
                    that.pane.navigate(e.url);
                },

                ready: function(e) {
                    var url = e.url;

                    if (!url && initial) {
                        url = initial;
                        history.navigate(initial, true);
                    }

                    that.pane.navigate(url);
                }
            };

            that.pane.bind("navigate", function(e) {
                history.navigate(e.url, true);
            });

            history.start($.extend(that.options, historyEvents));
        },

        _setupElementClass: function() {
            var that = this,
                view = that.view(),
                osCssClass = that.options.platform ? "km-" + that.options.platform : that.osCssClass,
                element = that.element;

            element.parent().addClass("km-root");
            element.addClass(osCssClass + " " + getOrientationClass());

            if (BERRYPHONEGAP) {
                applyViewportHeight();
            }

            WINDOW.bind(ORIENTATIONEVENT, function(e) {
                element.removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass());

                if (BERRYPHONEGAP) {
                    applyViewportHeight();
                }

                if (view && view.scroller) { // On desktop resize is fired rather early
                    view.scroller.reset();
                }
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

            that.element[0].addEventListener(support.mousedown, proxy(that._hideBar, that), true);
        },

        _setupDocumentTitle: function() {
            var that = this,
                defaultTitle = document.title;

            that.pane.bind("viewShow", function(e) {
                var title = e.view.title;
                document.title = title !== undefined ? title : defaultTitle;
            });
        },

        _hideBar: function() {
            var that = this,
                element = that.element,
                orientation = window.orientation + "",
                initialHeight = that._initialHeight,
                lastOrientation = that._lastOrientation,
                newHeight;

            that._lastOrientation = orientation;

            if (!initialHeight[orientation]) {
                initialHeight[orientation] = WINDOW.height();
            }

            newHeight = initialHeight[orientation] + BARCOMPENSATION;

            if (newHeight != element.height()) {
                element.height(newHeight);
            }

            setTimeout(window.scrollTo, 0, 0, 1);
        }
    });

    kendo.mobile.Application = Application;
})(jQuery);
