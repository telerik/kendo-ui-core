(function(f, define){
    define([ "./kendo.mobile.pane", "./kendo.router" ], f);
})(function(){

var __meta__ = {
    id: "mobile.application",
    name: "Application",
    category: "mobile",
    description: "The Mobile application provides a framework to build native looking web applications on mobile devices.",
    depends: [ "mobile.pane", "router" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        support = kendo.support,
        Widget = mobile.ui.Widget,
        Pane = mobile.ui.Pane,

        DEFAULT_OS = "ios7",
        OS = support.mobileOS,
        BERRYPHONEGAP = OS.device == "blackberry" && OS.flatVersion >= 600 && OS.flatVersion < 1000 && OS.appMode,
        VERTICAL = "km-vertical",
        CHROME =  OS.browser === "chrome",
        BROKEN_WEBVIEW_RESIZE = OS.ios && OS.flatVersion >= 700 && OS.flatVersion < 800 && (OS.appMode || CHROME),
        INITIALLY_HORIZONTAL = (Math.abs(window.orientation) / 90 == 1),
        HORIZONTAL = "km-horizontal",

        MOBILE_PLATFORMS = {
            ios7: { ios: true, browser: "default", device: "iphone", flatVersion: "700", majorVersion: "7", minorVersion: "0.0", name: "ios", tablet: false },
            ios: { ios: true, browser: "default", device: "iphone", flatVersion: "612", majorVersion: "6", minorVersion: "1.2", name: "ios", tablet: false },
            android: { android: true, browser: "default", device: "android", flatVersion: "442", majorVersion: "4", minorVersion: "4.2", name: "android", tablet: false },
            blackberry: { blackberry: true, browser: "default", device: "blackberry", flatVersion: "710", majorVersion: "7", minorVersion: "1.0", name: "blackberry", tablet: false },
            meego: { meego: true, browser: "default", device: "meego", flatVersion: "850", majorVersion: "8", minorVersion: "5.0", name: "meego", tablet: false },
            wp: { wp: true, browser: "default", device: "wp", flatVersion: "800", majorVersion: "8", minorVersion: "0.0", name: "wp", tablet: false }
        },

        viewportTemplate = kendo.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no#=data.height#" name="viewport" />', {usedWithBlock: false}),
        systemMeta = kendo.template('<meta name="apple-mobile-web-app-capable" content="#= data.webAppCapable === false ? \'no\' : \'yes\' #" /> ' +
                     '<meta name="apple-mobile-web-app-status-bar-style" content="#=data.statusBarStyle#" /> ' +
                     '<meta name="msapplication-tap-highlight" content="no" /> ', {usedWithBlock: false}),
        clipTemplate = kendo.template('<style>.km-view { clip: rect(0 #= data.width #px #= data.height #px 0); }</style>', {usedWithBlock: false}),
        ENABLE_CLIP = OS.android && OS.browser != "chrome" || OS.blackberry,
        viewportMeta = viewportTemplate({ height: "" }),

        iconMeta = kendo.template('<link rel="apple-touch-icon' + (OS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        HIDEBAR = (OS.device == "iphone" || OS.device == "ipod") && OS.majorVersion < 7,
        SUPPORT_SWIPE_TO_GO_BACK = (OS.device == "iphone" || OS.device == "ipod") && OS.majorVersion >= 7,
        HISTORY_TRANSITION = SUPPORT_SWIPE_TO_GO_BACK ? "none" : null,
        BARCOMPENSATION = OS.browser == "mobilesafari" ? 60 : 0,
        STATUS_BAR_HEIGHT = 20,
        WINDOW = $(window),
        SCREEN = window.screen,
        HEAD = $("head"),

        // mobile app events
        INIT = "init",
        proxy = $.proxy;

    function osCssClass(os, options) {
        var classes = [];

        if (OS) {
            classes.push("km-on-" + OS.name);
        }

        if (os.skin) {
            classes.push("km-" + os.skin);
        } else {
            if (os.name == "ios" && os.majorVersion > 6) {
                classes.push("km-ios7");
            } else {
                classes.push("km-" + os.name);
            }
        }
        if ((os.name == "ios" && os.majorVersion < 7) || os.name != "ios") {
            classes.push("km-" + os.name + os.majorVersion);
        }
        classes.push("km-" + os.majorVersion);
        classes.push("km-m" + (os.minorVersion ? os.minorVersion[0] : 0));

        if (os.variant && ((os.skin && os.skin === os.name) || !os.skin || os.setDefaultPlatform === false)) {
            classes.push("km-" + (os.skin ? os.skin : os.name) + "-" + os.variant);
        }

        if (os.cordova) {
            classes.push("km-cordova");
        }
        if (os.appMode) {
            classes.push("km-app");
        } else {
            classes.push("km-web");
        }

        if (options && options.statusBarStyle) {
            classes.push("km-" + options.statusBarStyle + "-status-bar");
        }

        return classes.join(" ");
    }

    function wp8Background(os) {
        return 'km-wp-' + (os.noVariantSet ?
                            (parseInt($("<div style='background: Background' />").css("background-color").split(",")[1], 10) === 0 ? 'dark' : 'light') :
                            os.variant + " km-wp-" + os.variant + "-force");
    }

    function isOrientationHorizontal(element) {
        return OS.wp ? element.css("animation-name") == "-kendo-landscape" : (Math.abs(window.orientation) / 90 == 1);
    }

    function getOrientationClass(element) {
        return isOrientationHorizontal(element) ? HORIZONTAL : VERTICAL;
    }

    function setMinimumHeight(pane) {
        pane.parent().addBack()
               .css("min-height", window.innerHeight);
    }

    function applyViewportHeight() {
        $("meta[name=viewport]").remove();
        HEAD.append(viewportTemplate({
            height: ", width=device-width" +  // width=device-width was removed for iOS6, but this should stay for BB PhoneGap.
                        (isOrientationHorizontal() ?
                            ", height=" + window.innerHeight + "px"  :
                            (support.mobileOS.flatVersion >= 600 && support.mobileOS.flatVersion < 700) ?
                                ", height=" + window.innerWidth + "px" :
                                ", height=device-height")
        }));
    }

    var Application = Widget.extend({
        init: function(element, options) {
            // global reference to current application
            mobile.application = this;
            $($.proxy(this, 'bootstrap', element, options));
        },

        bootstrap: function(element, options) {
            element = $(element);

            if (!element[0]) {
                element = $(document.body);
            }

            Widget.fn.init.call(this, element, options);
            this.element.removeAttr("data-" + kendo.ns + "role");

            this._setupPlatform();
            this._attachMeta();
            this._setupElementClass();
            this._attachHideBarHandlers();
            var paneOptions = $.extend({}, this.options);
            delete paneOptions.name;

            var that = this,
                startHistory = function() {
                    that.pane = new Pane(that.element, paneOptions);
                    that.pane.navigateToInitial();

                    if (that.options.updateDocumentTitle) {
                        that._setupDocumentTitle();
                    }

                    that._startHistory();
                    that.trigger(INIT);
                };

            if (this.options.$angular) {
                setTimeout(startHistory);
            } else {
                startHistory();
            }
        },

        options: {
            name: "Application",
            hideAddressBar: true,
            browserHistory: true,
            historyTransition: HISTORY_TRANSITION,
            modelScope: window,
            statusBarStyle: "black",
            transition: "",
            platform: null,
            skin: null,
            updateDocumentTitle: true,
            useNativeScrolling: false
        },

        events: [
            INIT
        ],

        navigate: function(url, transition) {
            this.pane.navigate(url, transition);
        },

        replace: function(url, transition) {
            this.pane.replace(url, transition);
        },

        scroller: function() {
            return this.view().scroller;
        },

        hideLoading: function() {
            if (this.pane) {
                this.pane.hideLoading();
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider activating loading in the application init event handler.");
            }
        },

        showLoading: function() {
            if (this.pane) {
                this.pane.showLoading();
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider activating loading in the application init event handler.");
            }
        },

        changeLoadingMessage: function(message) {
            if (this.pane) {
                this.pane.changeLoadingMessage(message);
            } else {
                throw new Error("The mobile application instance is not fully instantiated. Please consider changing the message in the application init event handler.");
            }
        },

        view: function() {
            return this.pane.view();
        },

        skin: function(skin) {
            var that = this;

            if (!arguments.length) {
                return that.options.skin;
            }

            that.options.skin = skin || "";
            that.element[0].className = "km-pane";
            that._setupPlatform();
            that._setupElementClass();

            return that.options.skin;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.pane.destroy();
            this.router.destroy();
        },

        _setupPlatform: function() {
            var that = this,
                platform = that.options.platform,
                skin = that.options.skin,
                split = [],
                os = OS || MOBILE_PLATFORMS[DEFAULT_OS];

            if (platform) {
                os.setDefaultPlatform = true;
                if (typeof platform === "string") {
                    split = platform.split("-");
                    os = $.extend({ variant: split[1] }, os, MOBILE_PLATFORMS[split[0]]);
                } else {
                    os = platform;
                }
            }

            if (skin) {
                split = skin.split("-");
                if (!OS) {
                    os.setDefaultPlatform = false;
                }
                os = $.extend({}, os, { skin: split[0], variant: split[1] });
            }

            if (!os.variant) {
                os.noVariantSet = true;
                os.variant = "dark";
            }

            that.os = os;

            that.osCssClass = osCssClass(that.os, that.options);

            if (os.name == "wp") {
                if (!that.refreshBackgroundColorProxy) {
                    that.refreshBackgroundColorProxy = $.proxy(function () {
                        if (that.os.variant && (that.os.skin && that.os.skin === that.os.name) || !that.os.skin) {
                            that.element.removeClass("km-wp-dark km-wp-light km-wp-dark-force km-wp-light-force").addClass(wp8Background(that.os));
                        }
                    }, that);
                }

                $(document).off("visibilitychange", that.refreshBackgroundColorProxy);
                $(document).off("resume", that.refreshBackgroundColorProxy);

                if (!os.skin) {
                    that.element.parent().css("overflow", "hidden");

                    $(document).on("visibilitychange", that.refreshBackgroundColorProxy); // Restore theme on browser focus (using the Visibility API).
                    $(document).on("resume", that.refreshBackgroundColorProxy); // PhoneGap fires resume.

                    that.refreshBackgroundColorProxy();
                }
            }
        },

        _startHistory: function() {
            if (this.options.browserHistory) {
                this.router = new kendo.Router({ pushState: this.options.pushState, root: this.options.root, hashBang: this.options.hashBang });
                this.pane.bindToRouter(this.router);
                this.router.start();
            } else {
                if (!this.options.initial) {
                    this.pane.navigate("");
                }
            }
        },

        _resizeToScreenHeight: function() {
            var includeStatusBar = $("meta[name=apple-mobile-web-app-status-bar-style]").attr("content").match(/black-translucent|hidden/),
                element = this.element,
                height;

            if (CHROME) {
                height = window.innerHeight;
            } else {
                if (isOrientationHorizontal(element)) {
                    if (includeStatusBar) {
                        if (INITIALLY_HORIZONTAL) {
                            height = SCREEN.availWidth + STATUS_BAR_HEIGHT;
                        } else {
                            height = SCREEN.availWidth;
                        }
                    } else {
                        if (INITIALLY_HORIZONTAL) {
                            height = SCREEN.availWidth;
                        } else {
                            height = SCREEN.availWidth - STATUS_BAR_HEIGHT;
                        }
                    }
                } else {
                    if (includeStatusBar) {
                        if (INITIALLY_HORIZONTAL) {
                            height = SCREEN.availHeight;
                        } else {
                            height = SCREEN.availHeight + STATUS_BAR_HEIGHT;
                        }
                    } else {
                        if (INITIALLY_HORIZONTAL) {
                            height = SCREEN.availHeight - STATUS_BAR_HEIGHT;
                        } else {
                            height = SCREEN.availHeight;
                        }
                    }
                }
            }

            element.height(height);
        },

        _setupElementClass: function() {
            var that = this, size,
                element = that.element;

            element.parent().addClass("km-root km-" + (that.os.tablet ? "tablet" : "phone"));
            element.addClass(that.osCssClass + " " + getOrientationClass(element));
            if (this.options.useNativeScrolling) {
                element.parent().addClass("km-native-scrolling");
            }

            if (CHROME) {
                element.addClass("km-ios-chrome");
            }

            if (support.wpDevicePixelRatio) {
                element.parent().css("font-size", support.wpDevicePixelRatio + "em");
            }

            if (BERRYPHONEGAP) {
                applyViewportHeight();
            }
            if (that.options.useNativeScrolling) {
                element.parent().addClass("km-native-scrolling");
            } else if (ENABLE_CLIP) {
                size = (screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight) + 200;
                $(clipTemplate({ width: size, height: size })).appendTo(HEAD);
            }

            if (BROKEN_WEBVIEW_RESIZE) {
                that._resizeToScreenHeight();
            }

            kendo.onResize(function() {
                element
                    .removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass(element));

                if (that.options.useNativeScrolling) {
                    setMinimumHeight(element);
                }

                if (BROKEN_WEBVIEW_RESIZE) {
                    that._resizeToScreenHeight();
                }

                if (BERRYPHONEGAP) {
                    applyViewportHeight();
                }

                kendo.resize(element);
            });
        },

        _clearExistingMeta: function() {
            HEAD.find("meta")
                .filter("[name|='apple-mobile-web-app'],[name|='msapplication-tap'],[name='viewport']")
                .remove();
        },

        _attachMeta: function() {
            var options = this.options,
                icon = options.icon, size;

            this._clearExistingMeta();

            if (!BERRYPHONEGAP) {
                HEAD.prepend(viewportMeta);
            }

            HEAD.prepend(systemMeta(options));

            if (icon) {
                if (typeof icon === "string") {
                    icon = { "" : icon };
                }

                for(size in icon) {
                    HEAD.prepend(iconMeta({ icon: icon[size], size: size }));
                }
            }

            if (options.useNativeScrolling) {
                setMinimumHeight(this.element);
            }
        },

        _attachHideBarHandlers: function() {
            var that = this,
                hideBar = proxy(that, "_hideBar");

            if (support.mobileOS.appMode || !that.options.hideAddressBar || !HIDEBAR || that.options.useNativeScrolling) {
                return;
            }

            that._initialHeight = {};

            WINDOW.on("load", hideBar);

            kendo.onResize(function() {
                setTimeout(window.scrollTo, 0, 0, 1);
            });
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
                element = that.element;

            element.height(kendo.support.transforms.css + "calc(100% + " + BARCOMPENSATION + "px)");
            $(window).trigger(kendo.support.resize);
        }
    });

    kendo.mobile.Application = Application;
    kendo.ui.plugin(Application, kendo.mobile, 'Mobile');
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
