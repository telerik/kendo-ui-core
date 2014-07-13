(function() {
    function cookie(key, value, end, path, domain, secure) {
        if (arguments.length === 1) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        }

        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return false; }
        var expires = "";
        if (end) {
          switch (end.constructor) {
            case Number:
              expires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
              break;
            case String:
              expires = "; expires=" + end;
              break;
            case Date:
              expires = "; expires=" + end.toUTCString();
              break;
          }
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
        return true;
    }

    $(document).ready(function() {
        ThemeChooser.publishTheme(window.kendoTheme);
    });

    var doc = document,
        extend = $.extend,
        proxy = $.proxy,
        kendo = window.kendo,
        animation = {
            show: {
                effects: "fadeIn",
                duration: 300
            },
            hide: {
                effects: "fadeOut",
                duration: 300
            }
        },
        skinRegex = /kendo\.[\w\-]+(\.min)?\.(less|css)/i,
        dvSkinRegex = /kendo\.dataviz\.(?!min)\w+?(\.css|\.min.css)/gi;

    var Details = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.fn.init.call(this, element, options);

            this._summary = this.element.find(".tc-activator")
                .on("click", proxy(this.toggle, this));

            this._container = kendo.wrap(this._summary.next(), true);

            this._container.css("display", "none");
        },
        options: {
            name: "Details"
        },
        toggle: function() {
            var options = this.options;
            var show = this._container.is(":visible");
            var animation = kendo.fx(this._container).expand("vertical");

            animation.stop()[show ? "reverse" : "play"]();

            this._summary.toggleClass("tc-active", !show);
        }
    });

    kendo.ui.plugin(Details);

    var ThemeChooser = kendo.ui.ListView.extend({
        init: function(element, options) {
            kendo.ui.ListView.fn.init.call(this, element, options);

            this.bind("change", this._changeCss);
        },
        options: {
            name: "ThemeChooser",
            template: "",
            selectable: true,
            value: ""
        },
        dataItem: function(element) {
            var uid = $(element).closest("[data-uid]").attr("data-uid");
            return this.dataSource.getByUid(uid);
        },
        _changeCss: function(e) {
            // make the item available to event listeners
            e.item = this.dataItem(this.select());
        },
        value: function(value) {
            if (!arguments.length) {
                var dataItem = this.dataItem(this.select());
                return dataItem.name;
            }

            var data = this.dataSource.data();

            for (var i = 0; i < data.length; i++) {
                if (data[i].value == value) {
                    this.select(this.element.find("[data-uid='" + data[i].uid + "']"));
                    break;
                }
            }
        }
    });

    var MOBILE_CLASSES = "km-ios km-ios4 km-ios5 km-ios6 km-ios7 km-android km-android-dark km-android-light km-blackberry km-wp km-wp-dark km-wp-light km-flat";

    var ThemeChooserViewModel = kendo.observable({
        themes: [
            { value: "default", name: "Default", colors: [ "#ef6f1c", "#e24b17", "#5a4b43" ]  },
            { value: "blueopal", name: "Blue Opal", colors: [ "#076186", "#7ed3f6", "#94c0d2" ]  },
            { value: "bootstrap", name: "Bootstrap", colors: [ "#3276b1", "#67afe9", "#fff" ]  },
            { value: "silver", name: "Silver", colors: [ "#298bc8", "#515967", "#eaeaec" ]  },
            { value: "uniform", name: "Uniform", colors: [ "#666", "#ccc", "#fff" ]  },
            { value: "metro", name: "Metro", colors: [ "#8ebc00", "#787878", "#fff" ]  },
            { value: "black", name: "Black", colors: [ "#0167cc", "#4698e9", "#272727" ]  },
            { value: "metroblack", name: "Metro Black", colors: [ "#00aba9", "#0e0e0e", "#565656" ]  },
            { value: "highcontrast", name: "High Contrast", colors: [ "#b11e9c", "#880275", "#1b141a" ]  },
            { value: "moonlight", name: "Moonlight", colors: [ "#ee9f05", "#40444f", "#212a33" ]  },
            { value: "flat", name: "Flat", colors: [ "#363940", "#2eb3a6", "#fff" ]  }
        ],
        mobileThemes: [
            { name: "iOS7", value:"ios7", colors: [ "#007aff", "#f5f5f5", "#ffffff" ]  },
            { name: "iOS6", value: "ios", colors: [ "#4a86ec", "#6982a3", "#c3ccd5" ]  },
            { name: "Android Light", value: "android-light", colors: [ "#33b5e5", "#cacaca", "#fcfcfc" ]  },
            { name: "Android Dark", value: "android-dark", colors: [ "#33b5e5", "#000000", "#4c4c4c" ]  },
            { name: "BlackBerry", value: "blackberry", colors: [ "#357fad", "#d9d9d9", "#ffffff" ]  },
            { name: "WP8 Light", value: "wp-light", colors: [ "#01abaa", "#000000", "#ffffff" ]  },
            { name: "WP8 Dark", value: "wp-dark", colors: [ "#01abaa", "#ffffff", "#000000" ]  },
            { name: "Flat Skin", value: "flat", colors: [ "#10c4b2", "#dcdcdc", "#f4f4f4" ]  }
        ],
        sizes: [
            { name: "Standard", value: "common" },
            { name: "Bootstrap", value: "common-bootstrap", relativity: "larger" }
        ],

        selectedTheme: window.kendoTheme,
        selectedMobileTheme: window.kendoMobileTheme,
        selectedSize: window.kendoCommonFile,

        updateMobileTheme: function(e) {
            var that = this;

            setTimeout(function () { that.setMobileTheme(e.item.value) }, 0);
        },

        updateTheme: function(e) {
            var themeName = e.item.value;
            ThemeChooser.changeTheme(themeName, true);
        },

        updateCommon: function(e) {
            ThemeChooser.changeCommon(e.item.value, true);
            cookie("commonFile", e.item.value, Infinity, "/");
        },

        setMobileTheme: function(themeName) {
            var mobileContainer = $("#mobile-application-container");
            mobileContainer.removeClass(MOBILE_CLASSES).addClass("km-" + themeName + (" km-" + themeName.replace(/-.*/, "")));
            $("#device-wrapper").removeClass("ios7 ios wp-dark wp-light android-light android-dark blackberry flat").addClass(themeName);
            cookie("mobileTheme", themeName, Infinity, "/");
            kendo.resize(mobileContainer);
        }
    });

    kendo.ui.plugin(ThemeChooser);
    window.ThemeChooserViewModel = ThemeChooserViewModel;

    $(document).ready(function() {
        kendo.bind($(".themechooser"), ThemeChooserViewModel);
    });

    extend(ThemeChooser, {
        preloadStylesheet: function (file, callback) {
            var element = $("<link rel='stylesheet' media='print' href='" + file + "' />").appendTo("head");

            setTimeout(function () {
                callback();
                element.remove();
            }, 100);
        },

        getCurrentCommonLink: function () {
            return $("head link").filter(function () {
                return (/kendo\.common/gi).test(this.href);
            });
        },

        getCurrentThemeLink: function () {
            return $("head link").filter(function () {
                return (/kendo\./gi).test(this.href) && !(/common|rtl|dataviz|mobile/gi).test(this.href);
            });
        },

        getCurrentMobileThemeLink: function () {
            return $("head link").filter(function () {
                return (/kendo\.[^\.\/]+?\.mobile/gi).test(this.href) && !(/common|rtl|dataviz/gi).test(this.href);
            });
        },

        getCurrentDVThemeLink: function () {
            return $("head link").filter(function () {
                return dvSkinRegex.test(this.href);
            });
        },

        getCommonUrl: function (common) {
            var currentCommonUrl = ThemeChooser.getCurrentCommonLink().attr("href");

            return currentCommonUrl.replace(skinRegex, "kendo." + common + "$1.$2");
        },

        getThemeUrl: function (themeName) {
            var currentThemeUrl = ThemeChooser.getCurrentThemeLink().attr("href");

            return currentThemeUrl.replace(skinRegex, "kendo." + themeName + "$1.$2");
        },

        getDVThemeUrl: function (themeName) {
            var currentThemeUrl = ThemeChooser.getCurrentDVThemeLink().attr("href");
            if (currentThemeUrl) {
                return currentThemeUrl.replace(dvSkinRegex, "kendo.dataviz." + themeName + "$1");
            }
        },

        replaceCommon: function(commonName) {
            var newCommonUrl = ThemeChooser.getCommonUrl(commonName),
                themeLink = ThemeChooser.getCurrentCommonLink();

            ThemeChooser.updateLink(themeLink, newCommonUrl);
        },

        replaceWebTheme: function (themeName) {
            var newThemeUrl = ThemeChooser.getThemeUrl(themeName),
                oldThemeName = $(doc).data("kendoSkin"),
                themeLink = ThemeChooser.getCurrentThemeLink();

            ThemeChooser.updateLink(themeLink, newThemeUrl);
            $(doc.documentElement).removeClass("k-" + oldThemeName).addClass("k-" + themeName);
        },

        replaceWebMobileTheme: function (themeName) {
            var newThemeUrl = ThemeChooser.getThemeUrl(themeName + ".mobile"),
                themeLink = ThemeChooser.getCurrentMobileThemeLink();

            ThemeChooser.updateLink(themeLink, newThemeUrl);
        },

        replaceDVTheme: function (themeName) {
            var newThemeUrl = ThemeChooser.getDVThemeUrl(themeName),
                themeLink = ThemeChooser.getCurrentDVThemeLink();

            if (newThemeUrl) {
                ThemeChooser.updateLink(themeLink, newThemeUrl);
            }
        },

        updateLink: function(link, url) {
            var newLink,
                exampleElement = $("#example"),
                less = window.less,
                isLess = /\.less$/.test(link.attr("href"));

            if (kendo.support.browser.msie && kendo.support.browser.version < 11) {
                newLink = $(doc.createStyleSheet(url));
            } else {
                newLink = link.eq(0).clone().attr("href", url);
                link.eq(0).before(newLink);
            }

            link.remove();

            if (isLess) {
                $("head style[id^='less']").remove();

                less.sheets = $("head link[href$='.less']").map(function () {
                    return this;
                });

                less.refresh(true);
            }

            if (exampleElement.length) {
                exampleElement[0].style.cssText = exampleElement[0].style.cssText;
            }
        },

        replaceTheme: function(themeName) {
            ThemeChooser.replaceWebTheme(themeName);
            ThemeChooser.replaceWebMobileTheme(themeName);
            ThemeChooser.replaceDVTheme(themeName);
            ThemeChooser.publishTheme(themeName);
            cookie("theme", themeName, Infinity, "/");
        },

        publishTheme: function (themeName) {
            var themable = ["Chart", "TreeMap", "Diagram", "StockChart", "Sparkline", "RadialGauge", "LinearGauge"];

            if (kendo.dataviz && themeName) {
                for (var i = 0; i < themable.length; i++) {
                    var widget = kendo.dataviz.ui[themable[i]];

                    if (widget) {
                        widget.fn.options.theme = themeName;
                    }
                }
            }

            if (themeName) {
                $(doc).data("kendoSkin", themeName);
            }

            $("#example").trigger("kendo:skinChange");
        },

        animateCssChange: function(options) {
            options = $.extend({ complete: $.noop, replace: $.noop }, options);

            if (options.prefetch == options.link.attr("href")) {
                return;
            }

            ThemeChooser.preloadStylesheet(options.prefetch, function () {
                var example = $("#example");

                example.kendoStop().kendoAnimate(extend({}, animation.hide, {
                    complete: function (element) {
                        if (element[0] == example[0]) {
                            example.css("visibility", "hidden");

                            options.replace();

                            setTimeout(function () {
                                example
                                    .css("visibility", "visible")
                                    .kendoStop()
                                    .kendoAnimate(animation.show);

                                options.complete();
                            }, 100);
                        }
                    }
                }));
            });
        },

        changeCommon: function(commonName, animate) {
            ThemeChooser.animateCssChange({
                prefetch: ThemeChooser.getCommonUrl(commonName),
                link: ThemeChooser.getCurrentCommonLink(),
                replace: function() {
                    ThemeChooser.replaceCommon(commonName);
                }
            });
        },

        changeTheme: function(themeName, animate, complete) {
            // Set transparent background to the chart area.
            extend(kendo.dataviz.ui.themes[themeName].chart, { chartArea: { background: "transparent"} });

            if (animate) {
                ThemeChooser.animateCssChange({
                    prefetch: ThemeChooser.getThemeUrl(themeName),
                    link: ThemeChooser.getCurrentThemeLink(),
                    replace: function() {
                        ThemeChooser.replaceTheme(themeName);
                    },
                    complete: complete
                });
            } else {
                ThemeChooser.replaceTheme(themeName);
            }
        }
    });

    window.kendoThemeChooser = ThemeChooser;
})();
