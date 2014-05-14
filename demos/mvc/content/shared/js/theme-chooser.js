(function() {
    var ThemeChooser,
        doc = document,
        extend = $.extend,
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
        dvSkinRegex = /kendo\.dataviz\.(?!min)\w+?(\.css|\.min.css)/gi,
        supports = {
            sessionStorage: (function () {
                // try-catch for obscure cases that do not allow "sessionStorage" in window
                // also for Safari private mode
                try {
                    sessionStorage.setItem("kendo-test", "success!");
                    sessionStorage.removeItem("kendo-test");
                    return !!sessionStorage.getItem;
                } catch (e) {
                    return false;
                }
            })(),
            pushState: ("pushState" in history)
        };

    ThemeChooser = {
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

        replaceWebTheme: function (themeName) {
            var newThemeUrl = ThemeChooser.getThemeUrl(themeName),
                oldThemeName = $(doc).data("kendoSkin"),
                themeLink = ThemeChooser.getCurrentThemeLink();

            ThemeChooser.updateLink(themeLink, newThemeUrl);

            ThemeChooser.publishTheme(themeName);
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

        updateLink: function (link, url) {
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

        replaceTheme: function (themeName) {
            ThemeChooser.replaceWebTheme(themeName);
            ThemeChooser.replaceWebMobileTheme(themeName);
            ThemeChooser.replaceDVTheme(themeName);

            $("#example").trigger("kendo:skinChange");
        },

        publishTheme: function (themeName) {
            var themable = ["Chart", "Diagram", "StockChart", "Sparkline", "RadialGauge", "LinearGauge"];

            if (kendo.dataviz) {
                for (var i = 0; i < themable.length; i++) {
                    var widget = kendo.dataviz.ui[themable[i]];

                    if (widget) {
                        widget.fn.options.theme = themeName;
                    }
                }
            }

            $(doc).data("kendoSkin", themeName);
        },

        changeTheme: function (themeName, animate, complete) {
            // Set transparent background to the chart area.
            extend(kendo.dataviz.ui.themes[themeName].chart, { chartArea: { background: "transparent"} });

            if (ThemeChooser.getThemeUrl(themeName) == ThemeChooser.getCurrentThemeLink().attr("href")) {
                return;
            }

            if (animate) {
                ThemeChooser.preloadStylesheet(ThemeChooser.getThemeUrl(themeName), function () {
                    var example = $("#example");

                    example.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function (element) {
                        if (element[0] == example[0]) {
                            example.css("visibility", "hidden"); // Hide the element with restored opacity.
                            ThemeChooser.replaceTheme(themeName);
                            setTimeout(function () {
                                example
                                    .css("visibility", "visible")
                                    .kendoStop()
                                    .kendoAnimate(animation.show);
                                complete();
                            }, 100);
                        }
                    }
                    }));
                });
            } else {
                ThemeChooser.replaceTheme(themeName);
            }
        },
    };

    window.kendoThemeChooser = ThemeChooser;
})();
