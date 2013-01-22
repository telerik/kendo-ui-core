kendo_module({
    id: "mobile.application",
    name: "Application",
    category: "mobile",
    description: "The Mobile application provides a framework to build native looking web applications on mobile devices.",
    depends: [ "mobile.pane" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        history = kendo.history,
        support = kendo.support,
        Pane = mobile.ui.Pane,

        DEFAULT_OS = "ios",
        OS = support.mobileOS,
        BERRYPHONEGAP = OS.device == "blackberry" && OS.flatVersion >= 600 && OS.flatVersion < 1000 && OS.appMode,
        VERTICAL = "km-vertical",
        HORIZONTAL = "km-horizontal",

        MOBILE_PLATFORMS = {
            ios: { ios: true, appMode: false, browser: "default", device: "iphone", flatVersion: "500", majorVersion: "5", minorVersion: "0.0", name: "ios", tablet: false },
            android: { android: true, appMode: false, browser: "default", device: "android", flatVersion: "233", majorVersion: "2", minorVersion: "3.3", name: "android", tablet: false },
            blackberry: { blackberry: true, appMode: false, browser: "default", device: "blackberry", flatVersion: "710", majorVersion: "7", minorVersion: "1.0", name: "blackberry", tablet: false },
            meego: { meego: true, appMode: false, browser: "default", device: "meego", flatVersion: "850", majorVersion: "8", minorVersion: "5.0", name: "meego", tablet: false },
            wp: { wp: true, appMode: false, browser: "default", device: "wp", flatVersion: "800", majorVersion: "8", minorVersion: "0.0", name: "wp", tablet: false }
        },

        viewportTemplate = kendo.template('<meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no#=data.height#" name="viewport" />', {usedWithBlock: false}),
        systemMeta = '<meta name="apple-mobile-web-app-capable" content="yes" /> ' +
                     '<meta name="apple-mobile-web-app-status-bar-style" content="black" /> ',
        viewportMeta = viewportTemplate({ height: "" }),

        iconMeta = kendo.template('<link rel="apple-touch-icon' + (OS.android ? '-precomposed' : '') + '" # if(data.size) { # sizes="#=data.size#" #}# href="#=data.icon#" />', {usedWithBlock: false}),

        HIDEBAR = (OS.device == "iphone" || OS.device == "ipod") && OS.browser == "mobilesafari",
        BARCOMPENSATION = 60,

        WINDOW = $(window),
        HEAD = $("head"),
        proxy = $.proxy;

    function osCssClass(os) {
        var classes = [];

        classes.push("km-" + os.name);

        if (OS) {
            classes.push("km-on-" + OS.name);
        }

        classes.push("km-" + os.name + os.majorVersion);
        classes.push("km-" + os.majorVersion);
        classes.push("km-m" + (os.minorVersion ? os.minorVersion[0] : 0));

        if (os.appMode) {
            classes.push("km-app");
        } else {
            classes.push("km-web");
        }

        return classes.join(" ");
    }

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
                        (support.mobileOS.flatVersion >= 600 && support.mobileOS.flatVersion < 700) ?
                            ", height=" + window.innerWidth + "px" :
                            ", height=device-height"
        }));
    }

    var Application = kendo.Observable.extend({
        init: function(element, options) {
            var that = this;

            mobile.application = that; // global reference to current application

            that.options = $.extend({
                hideAddressBar: true,
                transition: "",
                updateDocumentTitle: true
            }, options);
            kendo.Observable.fn.init.call(that, that.options);

            $(function(){
                that.element = $(element ? element : document.body);
                that._setupPlatform();
                that._attachHideBarHandlers();
                that.pane = new Pane(that.element, that.options);
                that._setupElementClass();
                that._attachMeta();

                if (that.options.updateDocumentTitle) {
                    that._setupDocumentTitle();
                }

                that._startHistory();

                if (support.kineticScrollNeeded) {
                    $(document.documentElement).on("touchmove", function(e){
                        if (!$(e.target).is("textarea")) {
                            kendo.preventDefault(e);
                        }
                    });
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
                os = OS || MOBILE_PLATFORMS[DEFAULT_OS];

            if (platform) {
                if (typeof platform === "string") {
                    os = MOBILE_PLATFORMS[platform];
                } else {
                    os = platform;
                }
            }

            that.os = os;

            that.osCssClass = osCssClass(that.os);
            
            if (os.name == "wp") {
                that._setupWP8Theme();
            }
        },

        _setupWP8Theme: function() {

            var element = $(this.element),
                div, bgColor;
            
            div = $("<div />").css({background: "Background", visibility: "hidden", position: "absolute", top: "-3333px" }).appendTo(document.body);
            bgColor = parseInt(div.css("background-color").split(",")[1], 10);
            if (bgColor === 0) {
                element.addClass("km-wp8-dark");
            } else {
                element.addClass("km-wp8-light");
            }
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

            element.parent().addClass("km-root km-" + (that.os.tablet ? "tablet" : "phone"));
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

            if (support.mobileOS.appMode || !that.options.hideAddressBar) {
                return;
            }

            that._initialHeight = {};

            if (HIDEBAR) {
                WINDOW.on("load", hideBar);
                kendo.onResize(hideBar);
                that.element[0].addEventListener("touchstart", hideBar, true);
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
})(window.kendo.jQuery);
