(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        history = kendo.history,
        support = kendo.support,
        Pane = mobile.ui.Pane,

        DEFAULT_OS = "ios",
        OS = support.mobileOS,
        OS_NAME_TEMPLATE = kendo.template("km-#=data.name##if(data.device){# km-on-#=data.device##}##if(data.version){# #=data.name##=data.version.major# km-#=data.version.major# km-m#=data.version.minor# #=data.version.appMode?'km-app':'km-web'##}#", {usedWithBlock: false}),
        BERRYPHONEGAP = OS.device == "blackberry" && OS.flatVersion >= 600 && OS.flatVersion < 1000 && OS.appMode,
        VERTICAL = "km-vertical",
        HORIZONTAL = "km-horizontal",

        MOBILE_PLATFORMS = {
            ios: { ios: true, appMode: false, browser: "default", device: "iphone", flatVersion: "430", majorVersion: "4", minorVersion: "3.0", name: "ios", tablet: false },
            android: { android: true, appMode: false, browser: "default", device: "android", flatVersion: "233", majorVersion: "2", minorVersion: "3.3", name: "android", tablet: false },
            blackberry: { blackberry: true, appMode: false, browser: "default", device: "blackberry", flatVersion: "710", majorVersion: "7", minorVersion: "1.0", name: "blackberry", tablet: false },
            meego: { meego: true, appMode: false, browser: "default", device: "meego", flatVersion: "850", majorVersion: "8", minorVersion: "5.0", name: "meego", tablet: false }
        },

        viewportTemplate = kendo.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width#=data.height#" name="viewport" />', {usedWithBlock: false}),
        systemMeta = '<meta name="apple-mobile-web-app-capable" content="yes" /> ' +
                     '<meta name="apple-mobile-web-app-status-bar-style" content="black" /> ',
        viewportMeta = viewportTemplate({ height: "" }),

        iconMeta = kendo.template('<link rel="apple-touch-icon' + (support.mobileOS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        DEVICE = OS.name,
        HIDEBAR = (OS.device == "iphone" || OS.device == "ipod") && OS.browser == "mobilesafari",
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
        $("meta[name=viewport]").remove();
        HEAD.append(viewportTemplate({
            height: isOrientationHorizontal() ?
                        ", height=" + window.innerHeight + "px"  :
                        (OS.flatVersion >= 600 && OS.flatVersion < 700) ?
                            ", height=" + window.innerWidth + "px" :
                            ", height=device-height"
        }));
    }

    var Application = kendo.Observable.extend({
        init: function(element, options) {
            var that = this;

            mobile.application = that; // global reference to current application

            that.options = $.extend({ hideAddressBar: true, updateDocumentTitle: true, transition: "" }, options);
            kendo.Observable.fn.init.call(that, that.options);
            that.element = $(element ? element : document.body);

            $(function(){
                that._setupPlatform();
                that._attachHideBarHandlers();
                that.pane = new Pane(that.element, that.options);
                that._setupElementClass();
                that._attachMeta();

                if (that.options.updateDocumentTitle) {
                    that._setupDocumentTitle();
                }

                that._startHistory();

                if (support.touch) {
                    $(document.documentElement).on("touchmove", false);
                }
            });
        },

        navigate: function(url, transition) {
            this.pane.navigate(url, transition);
        },

        scroller: function() {
            return this.view().scroller;
        },

        hideLoading: function() {
            this.pane.hideLoading();
        },

        showLoading: function() {
            this.pane.showLoading();
        },

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
                    os = MOBILE_PLATFORMS[platform];
                } else {
                    os = platform;
                }

                support.mobileOS = OS = os;
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

            that.osCssClass = OS_NAME_TEMPLATE({ name: that.os, device: DEVICE, version: version });
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
                element = that.element;

            element.parent().addClass("km-root km-" + (OS.tablet ? "tablet" : "phone"));
            element.addClass(that.osCssClass + " " + getOrientationClass());

            if (BERRYPHONEGAP) {
                applyViewportHeight();
            }

            kendo.onResize(function() {
                element.removeClass("km-horizontal km-vertical")
                    .addClass(getOrientationClass());

                if (BERRYPHONEGAP) {
                    applyViewportHeight();
                }
            });
        },

        _attachMeta: function() {
            var icon = this.options.icon, size;

            if (!BERRYPHONEGAP) {
                HEAD.prepend(viewportMeta);
            }

            HEAD.prepend(systemMeta);

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
            var that = this,
                hideBar = proxy(that._hideBar, that);

            if (OS.appMode || !that.options.hideAddressBar) {
                return;
            }

            that._initialHeight = {};

            if (HIDEBAR) {
                WINDOW.on("load", hideBar);
                kendo.onResize(hideBar);
                that.element[0].addEventListener(support.mousedown, hideBar, true);
            }
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
                newHeight;

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
