(function() {
    var ThemeChooser,
        doc = document,
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

    ThemeChooser = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.fn.init.call(this, element, options);

            var element = this.element;
            var options = this.options;
            var template = options.template;

            if (typeof template == "string") {
                template = kendo.template(template);
            }

            this._container = element.find(options.container)
                .html(template(options))
                .on("click", ".tc-theme", proxy(this._changeTheme, this))
                .on("click", ".tc-size", proxy(this._changeSize, this));

            this._activator = element.find(options.activator)
                .on("click", proxy(this._toggle, this));

            this.currentTheme = "Silver";
            this.currentSize = "Standard";

            this._updateState();
        },
        changeTheme: function(themeName) {
            this.element.find(".tc-current").text(themeName);
        },
        _change: function (elementClass, value) {
            this._container.find(elementClass)
                .removeClass("tc-active")
                .filter(function() {
                    return $(this).find(".tc-name").text() == value;
                })
                .addClass("tc-active");
        },
        _updateState: function() {
            this._change(".tc-size", this.currentSize);
            this._change(".tc-theme", this.currentTheme);
        },
        _toggle: function(e) {
            e.preventDefault();
            this.toggle();
        },
        _idOf: function(theme) {
            return theme.toLowerCase().replace(/\s/, "");
        },
        _changeTheme: function(e) {
            e.preventDefault();

            var newTheme = $(e.currentTarget).find(".tc-name").text();
            var newThemeId = this._idOf(newTheme);

            this.currentTheme = newTheme;

            this._updateState();

            ThemeChooser.changeTheme(newThemeId, true);
        },
        _changeSize: function(e) {
            e.preventDefault();

            this.currentSize = $(e.currentTarget).find(".tc-name").text();

            this._updateState();

            var commonName = this.currentSize == "Standard" ? "common" : "common-bootstrap";

            ThemeChooser.changeCommon(commonName, true);
        },
        toggle: function(e) {
            var options = this.options;
            var show = this._container.is(":visible");
            var animation = kendo.fx(kendo.wrap(this._container, true)).expand("vertical");

            animation.stop()[show ? "reverse" : "play"]();

            this._activator.toggleClass("tc-active", !show);
        },
        options: {
            name: "ThemeChooser",
            themes: [
                { name: "Default", colors: [ "#ef6f1c", "#e24b17", "#5a4b43" ]  },
                { name: "Blue Opal", colors: [ "#076186", "#7ed3f6", "#94c0d2" ]  },
                { name: "Bootstrap", colors: [ "#3276b1", "#67afe9", "#fff" ]  },
                { name: "Silver", colors: [ "#298bc8", "#515967", "#eaeaec" ]  },
                { name: "Uniform", colors: [ "#666", "#ccc", "#fff" ]  },
                { name: "Metro", colors: [ "#8ebc00", "#787878", "#fff" ]  },
                { name: "Black", colors: [ "#0167cc", "#4698e9", "#272727" ]  },
                { name: "Metro Black", colors: [ "#00aba9", "#0e0e0e", "#565656" ]  },
                { name: "High Contrast", colors: [ "#b11e9c", "#880275", "#1b141a" ]  },
                { name: "Moonlight", colors: [ "#ee9f05", "#40444f", "#212a33" ]  },
                { name: "Flat", colors: [ "#363940", "#2eb3a6", "#fff" ]  }
            ],
            sizes: [
                { name: "Standard" },
                { name: "Bootstrap", relativity: "larger" }
            ]
        }
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

        animateCssChange: function(options) {
            options = $.extend({ complete: $.noop, replace: $.noop }, options);

            ThemeChooser.preloadStylesheet(options.prefetch, function () {
                var example = $("#example");

                example.kendoStop().kendoAnimate(extend({}, animation.hide, {
                    complete: function (element) {
                        if (element[0] == example[0]) {
                            example.css("visibility", "hidden");

                            options.replace()

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
                replace: function() {
                    ThemeChooser.replaceCommon(commonName);
                }
            });
        },

        changeTheme: function (themeName, animate, complete) {
            // Set transparent background to the chart area.
            extend(kendo.dataviz.ui.themes[themeName].chart, { chartArea: { background: "transparent"} });

            if (ThemeChooser.getThemeUrl(themeName) == ThemeChooser.getCurrentThemeLink().attr("href")) {
                return;
            }

            if (animate) {
                ThemeChooser.animateCssChange({
                    prefetch: ThemeChooser.getThemeUrl(themeName),
                    replace: function() {
                        ThemeChooser.replaceTheme(themeName);
                    },
                    complete: complete
                });
            } else {
                ThemeChooser.replaceTheme(themeName);
            }
        },
    });

    kendo.ui.plugin(ThemeChooser);

    window.kendoThemeChooser = ThemeChooser;
})();
