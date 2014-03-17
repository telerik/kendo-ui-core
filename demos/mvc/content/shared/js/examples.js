(function ($, window) {
    var Application,
        doc = document,
        extend = $.extend,
        kendo = window.kendo,
        DETAILHANDLE = ".detailHandle",
        docsAnimation = {
            show: {
                effects: "expandVertical fadeIn",
                duration: 300
            },
            hide: {
                effects: "expandVertical fadeIn",
                duration: 300,
                reverse: true,
                hide: true
            }
        },
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

    Application = {
        load: function (href) {
            this.unload();

            Application.fetch(href);

            if (supports.pushState) {
                history.pushState({ href: href }, null, href);
            }
        },

        loadWidget: function (href) {
            this.unload();

            this.fetchWidget(href);

            if (supports.pushState) {
                history.pushState({ href: href }, null, href);
            }
        },

        fetch: function (href, forced) {
            var exampleWrap = $("#exampleWrap"),
                currentHref = this.href,
                mainWrap = $("#main");

            if (href === currentHref && !forced) {
                return;
            }

            this.href = href;

            $.get(href, { partial: 1 }, function (html) {

                $("[data-role=themechooser]").kendoThemeChooser("reset");

                exampleWrap.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function () {
                    var items = $("#examples-nav li").removeClass("active"),
                        item = $($.grep(items, function (li) { return href.indexOf($(li).find("a").attr("href")) > -1; })).addClass("active");

                    updateNavLinks(item, $("#nav-pager a"));

                    mainWrap.replaceWith(html);

                    setTimeout(function () {
                        $("#exampleWrap")
                            .css("visibility", "visible")
                            .kendoStop(true)
                            .kendoAnimate(animation.show);

                        Application.initMobile();

                    }, 100);
                }
                }));
            }, "html");
        },

        fetchWidget: function (href) {
            var wrapInner = $("#mainWrapInner");

            if (href.indexOf("?") > 0) {
                href += "&";
            } else {
                href += "?";
            }

            href += "nav=true";

            $.get(href, function (html) {
                var parts = href.split("/"),
                    widget = parts[parts.length - 2],
                    dashboards = $(".dashboards li").removeClass("active"),
                    items = $(".narrowCol:not(.mobile-devices, .dashboards), .wideCol").find("li").removeClass("active"),
                    condition;

                if (widget == "dashboards") {
                    items = dashboards;
                    condition = function (li) {
                        return href == $(li).find("a").attr("href");
                    };
                } else {
                    condition = function (li) {
                        var splits = $(li.children[0]).attr("href").split("/");
                        return splits[splits.length - 2] == widget;
                    };
                }

                $($.grep(items, condition)).addClass("active");

                if (widget == "dashboards" || widget == "overview" || widget == "spa") {
                    $("#themeWrap").hide();
                } else if (href.indexOf("mobile") == -1) {
                    $("#themeWrap").show();
                }

                $("#mainWrap").toggleClass("widgetOverview", href.indexOf("overview") > -1);

                $("[data-role=themechooser]").kendoThemeChooser("reset");

                wrapInner.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function () {
                    kendo.culture("en-US");

                    wrapInner.replaceWith(html);

                    var href = $(".documentation-link").attr("href");

                    if (href) {
                        $("#themeWrap").show().children("a").css("display", "inline-block").attr("href", href);
                    } else {
                        $("#themeWrap").children("a").hide();
                    }


                    setTimeout(function () {
                        $("#exampleWrap")
                            .css("visibility", "visible")
                            .kendoStop(true)
                            .kendoAnimate(animation.show);

                        Application.initMobile();

                    }, 100);
                }
                }));
            }, "html");
        },

        unload: function () {
            kendo.destroy("body > .k-popup");

            $(doc.body)
                .find(".k-window-content")
                .each(function (index, kendoWindow) {
                    kendoWindow = $(kendoWindow).data("kendoWindow");
                    if (kendoWindow) {
                        kendoWindow.setOptions({ deactivate: function () { kendoWindow.destroy(); } });
                        kendoWindow.close();
                    }
                });

            if (!$("#example").find("[data-role=droptargetarea]").length) {
                kendo.destroy("#example");
            }

            $(doc)
                .off(".examples")
                .trigger("kendo:pageUnload");
        },

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
            var currentCommonUrl = Application.getCurrentCommonLink().attr("href");

            return currentCommonUrl.replace(skinRegex, "kendo." + common + "$1.$2");
        },

        getThemeUrl: function (themeName) {
            var currentThemeUrl = Application.getCurrentThemeLink().attr("href");

            return currentThemeUrl.replace(skinRegex, "kendo." + themeName + "$1.$2");
        },

        getDVThemeUrl: function (themeName) {
            var currentThemeUrl = Application.getCurrentDVThemeLink().attr("href");
            if (currentThemeUrl) {
                return currentThemeUrl.replace(dvSkinRegex, "kendo.dataviz." + themeName + "$1");
            }
        },

        replaceWebTheme: function (themeName) {
            var newThemeUrl = Application.getThemeUrl(themeName),
                oldThemeName = $(doc).data("kendoSkin"),
                themeLink = Application.getCurrentThemeLink();

            Application.updateLink(themeLink, newThemeUrl);

            Application.publishTheme(themeName);
            $(doc.documentElement).removeClass("k-" + oldThemeName).addClass("k-" + themeName);
        },

        replaceWebMobileTheme: function (themeName) {
            var newThemeUrl = Application.getThemeUrl(themeName + ".mobile"),
                themeLink = Application.getCurrentMobileThemeLink();

            Application.updateLink(themeLink, newThemeUrl);
        },

        replaceDVTheme: function (themeName) {
            var newThemeUrl = Application.getDVThemeUrl(themeName),
                themeLink = Application.getCurrentDVThemeLink();

            if (newThemeUrl) {
                Application.updateLink(themeLink, newThemeUrl);
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
            Application.replaceWebTheme(themeName);
            Application.replaceWebMobileTheme(themeName);
            Application.replaceDVTheme(themeName);

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

        changeTheme: function (themeName, animate) {
            // Set transparent background to the chart area.
            extend(kendo.dataviz.ui.themes[themeName].chart, { chartArea: { background: "transparent"} });

            if (Application.getThemeUrl(themeName) == Application.getCurrentThemeLink().attr("href")) {
                return;
            }

            if (animate) {
                Application.preloadStylesheet(Application.getThemeUrl(themeName), function () {
                    var example = $("#example");

                    example.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function (element) {
                        if (element[0] == example[0]) {
                            example.css("visibility", "hidden"); // Hide the element with restored opacity.
                            Application.replaceTheme(themeName);
                            setTimeout(function () {
                                example
                                    .css("visibility", "visible")
                                    .kendoStop()
                                    .kendoAnimate(animation.show);
                            }, 100);
                        }
                    }
                    }));
                });
            } else {
                Application.replaceTheme(themeName);
            }
        },

        init: function () {
            $("#exampleWrap").css("visibility", "visible");

            if (supports.pushState) {
                $(doc)
                    .on("click", "#examples-nav li a:not([rel=external])", function (e) {
                        var element = $(this),
                            href = this.href;

                        e.preventDefault();

                        if (!location.href.match(href)) {
                            updateNavLinks(element.parent(), $("#nav-pager a"));
                            Application.load(href);
                        }
                    })
                    .on("click", "#nav-pager a", function (e) {
                        var element = $(this),
                            url = element.attr("href"),
                            sibling = element.siblings(),
                            method = element.hasClass("prev") ? "prev" : "next",
                            currentItem = $("#examples-nav li.active"),
                            nextItem = currentItem[method](),
                            pagerLink = $("#nav-pager a").eq(method == "next" ? 1 : 0),
                            navigateUrl = pagerLink.data("widget");

                        e.preventDefault();

                        if (nextItem[0]) {
                            nextItem.addClass("active");
                            currentItem.removeClass("active");

                            sibling.removeClass("k-state-disabled")
                                   .attr("href", location.href);

                            nextItem = nextItem[method]();

                            if (nextItem[0]) {
                                element.attr("href", nextItem.children("a").attr("href"));
                            } else {
                                element.attr("href", navigateUrl || "#").toggleClass("k-state-disabled", !navigateUrl);
                            }

                            Application.load(url);
                        } else if (navigateUrl) {
                            element.add(sibling).bind("click", stopDefaults);
                            Application.loadWidget(navigateUrl);
                        }
                    })
                    .on('click', '.try-kendo', function () {
                        window.dojo.postSnippet($('#HTML-1').data('html'), window.location.href);
                    });

                $(window).bind("popstate", function (e) {
                    var state = e.originalEvent.state,
                        href;

                    if (state && state.href != window.location.href) {
                        href = state.href.toLowerCase();

                        Application.unload();

                        if (getWidgetPart(href) != getWidgetPart(Application.href) || href.indexOf("overview") > -1) {
                            Application.fetchWidget(href);
                        } else {
                            Application.fetch(href);
                        }
                    }
                });

                Application.href = location.href;

                try {
                    history.replaceState({ href: location.href }, null, location.href);
                } catch (err) { }
            }

            $(doc)
                .on("mouseenter mouseleave", DETAILHANDLE, function (e) {
                    var element = $(this),
                        extender = element.next();

                    if ($.trim(extender.text())) {
                        element.toggleClass("detailHover", e.type == "mouseenter");
                    }
                })
                .on("click", DETAILHANDLE, function () {
                    var element = $(this),
                        extender = element.next(),
                        visible = extender.is(":visible");

                    if ($.trim(extender.text())) {
                        extender
                            .kendoStop(true)
                            .kendoAnimate(
                                !visible ? docsAnimation.show : docsAnimation.hide,
                                visible,
                                function () { $(this).css("height", ""); }
                            );

                        $(".detailExpanded,.detailCollapsed", this)
                            .toggleClass("detailExpanded", !visible)
                            .toggleClass("detailCollapsed", visible);

                        element.toggleClass("detailHandleExpanded", !visible);
                    }
                });

            Application.publishTheme(kendoSkin);

            $("#qr").off().click(function (e) {
                var bigQR = $("#qrBig");
                bigQR.toggle();
                var newText = bigQR.is(":visible") ? "Hide QR Code" : "Show QR Code";
                $(this).children("em").html(newText);
                e.preventDefault();
                e.stopPropagation();
            });

        },

        initMobile: function () {
            $("#qr").off().click(function (e) {
                var bigQR = $("#qrBig");
                bigQR.toggle();
                var newText = bigQR.is(":visible") ? "Hide QR Code" : "Show QR Code";
                $(this).children("em").html(newText);
                e.preventDefault();
                e.stopPropagation();
            });

            applyCurrentMobileOS();
        }
    };

    var kendoSkin = "silver";

    window.kendoMobileOS = "ios7";

    $(Application.init);

    var mobileClasses = "km-ios km-ios4 km-ios5 km-ios6 km-ios7 km-android km-android-dark km-android-light km-blackberry km-wp km-wp-dark km-wp-light km-flat";

    function applyCurrentTheme() {
        if (supports.sessionStorage) {
            kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.changeTheme(kendoSkin);
            }
        }
    }

    function applyCurrentMobileOS() {
        var kendoMobileOS = window.kendoMobileOS;

        if (supports.sessionStorage) {
            window.kendoMobileOS = sessionStorage.getItem("kendoMobileOS") || kendoMobileOS;
        }

        $("#mobile-application-container").removeClass(mobileClasses).addClass("km-" + kendoMobileOS + (" km-" + kendoMobileOS.replace(/-.*/, "")));
        $("#device-wrapper").removeClass("ios7 android blackberry wp flat").addClass(kendoMobileOS);
        $("#deviceList .selectedThumb").removeClass("selectedThumb");
        $("#deviceList ." + kendoMobileOS + "Thumb").parent().addClass("selectedThumb");
    }

    function stopDefaults() {
        return false;
    }

    function getWidgetPart(href) {
        var parts = href.split("/");
        return parts[parts.length - 2];
    }

    function updateNavLinks(li, buttons) {
        var prev = buttons.eq(0),
            next = buttons.eq(1);

        li.siblings().removeClass("active").end().addClass("active");
        prev.attr("href", li.prev().find("a").attr("href") || prev.data("widget"));
        next.attr("href", li.next().find("a").attr("href") || next.data("widget"));
    }

    $(document).ready(function () {
        var dropdown = $("#header a[href=#expand]"),
            submenus = $("#header").find(".submenu-box");

        //sub menu dropdowns functionality
        dropdown.click(function (e) {
            var $this = $(this);
            submenus.fadeOut(); //close all dropdowns
            $this.toggleClass("expanded"); //set active state to dropdown link
            dropdown.not($this).removeClass("expanded"); //for closed dropdown menus - remove active state of their link
            $this.siblings(".submenu-box").not(":animated").fadeToggle(250); //display needed dropdown menu
            e.stopPropagation();
            e.preventDefault();
        });

        //on click outside of dropdowns, they disappear
        $(document).click(function () {
            submenus.fadeOut();
            dropdown.removeClass("expanded");
        });
    });

    var Widget = kendo.ui.Widget,
        ThemeChooser = Widget.extend({
            init: function (element, options) {
                options = options || {};

                options.themes = options.themes || [
                    { text: "Default", value: "default", colors: ["#ef6f1c", "#e24b17", "#5a4b43", "#ededed"] },
                    { text: "Blue Opal", value: "blueopal", colors: ["#076186", "#7ed3f6", "#94c0d2", "#daecf4"] },
                    { text: "Bootstrap", value: "bootstrap", colors: ["#3276b1", "#67afe9", "#ebebeb", "#ffffff"] },
                    { text: "Silver", value: "silver", colors: ["#298bc8", "#515967", "#bfc6d0", "#eaeaec"] },
                    { text: "Uniform", value: "uniform", colors: ["#666666", "#cccccc", "#e7e7e7", "#ffffff"] },
                    { text: "Metro", value: "metro", colors: ["#8ebc00", "#787878", "#e5e5e5", "#ffffff"] },
                    { text: "Black", value: "black", colors: ["#0167cc", "#4698e9", "#272727", "#000000"] },
                    { text: "Metro Black", value: "metroblack", colors: ["#00aba9", "#0e0e0e", "#333333", "#565656"] },
                    { text: "High Contrast", value: "highcontrast", colors: ["#b11e9c", "#880275", "#664e62", "#1b141a"] },
                    { text: "Moonlight", value: "moonlight", colors: ["#ee9f05", "#40444f", "#2f3640", "#212a33"] },
                    { text: "Flat", value: "flat", colors: ["#363940", "#2eb3a6", "#10c4b2", "#ffffff"] }
                ];

                if (supports.sessionStorage) {
                    if (Application.isMobile) {
                        options.theme = sessionStorage.getItem("kendoMobileOS") || options.theme;
                    } else {
                        options.theme = sessionStorage.getItem("kendoSkin");
                    }
                }

                options.theme = options.theme || ThemeChooser.prototype.options.theme;

                Widget.prototype.init.call(this, element, options);

                this._render();

                this.setTheme(options.theme);

                this.element.on("click touchend", ".tc-link", $.proxy(function (e) {
                    e.preventDefault();

                    var icon = $(e.target).closest(".tc-link").find(".k-icon"),
                        expand = icon.hasClass("k-i-arrow-s");

                    icon.toggleClass("k-i-arrow-s", !expand)
                        .toggleClass("k-i-arrow-n", expand);

                    this._getThemeContainer().animate({ height: "toggle", margin: "toggle", paddingBottom: "toggle" }, "fast");
                }, this));
            },

            reset: function () {
                var icon = this.element.find(".tc-link .k-icon");

                icon.removeClass("k-i-arrow-n").addClass("k-i-arrow-s");
            },

            _getThemeContainer: function () {
                var themeChooser = this,
                    options = this.options,
                    container = $(options.listContainer).children(".tc-theme-container");

                if (container.length) {
                    return container;
                }

                container = $("<ul class='tc-theme-container' />").prependTo(options.listContainer);

                container.on("click", ".tc-link", function (e) {
                    e.preventDefault();

                    var link = $(this), theme = link.attr("data-value");

                    if (link.hasClass("active")) {
                        return;
                    }

                    container.find(".tc-link").removeClass("active");

                    link.addClass("active");

                    themeChooser.setTheme(theme);

                    if (Application.isMobile) {
                        Application.fetch(location.href, true);
                        setTimeout(applyCurrentMobileOS, 200);
                    } else {
                        Application.changeTheme(theme, true);
                    }

                });

                container.html(kendo.render(options.itemTemplate, options.themes));

                return container;
            },

            setTheme: function (themeName) {
                var themes = this.options.themes,
                    theme;

                for (var i = 0; i < themes.length; i++) {
                    if (themes[i].value == themeName) {
                        theme = themes[i];
                        theme.selected = true;
                    } else {
                        themes[i].selected = false;
                    }
                }

                this.element.find(".tc-theme-name").text(theme.text);

                if (supports.sessionStorage) {
                    if (Application.isMobile) {
                        sessionStorage.setItem("kendoMobileOS", themeName);
                        window.kendoMobileOS = themeName;
                    } else {
                        sessionStorage.setItem("kendoSkin", themeName);
                    }
                }
            },

            _render: function () {
                var label = this.options.label;

                this.element
                    .addClass("k-theme-chooser")
                    .html(
                        (label ? "<span class='tc-choose-theme'>" + label + "</span>" : "") +
                        "<a class='tc-link k-state-selected' href='#'>" +
                            "<span class='tc-theme-name'></span>" +
                            "<span class='k-icon k-i-arrow-s'></span>" +
                        "</a>"
                    );
            },

            options: {
                name: "ThemeChooser",
                label: "Choose theme:",
                theme: "silver",
                listContainer: "#theme-list-container",
                itemTemplate: kendo.template(
                    "<li class='tc-theme'>" +
                        "<a href='\\#' class='tc-link#= data.selected ? ' active' : '' #' data-value='#= data.value #'>" +
                            "# if (!data.colors) { #" +
                                "<span class='tc-mobile #= 'tc-' + data.value #'></span>" +
                            "#} else { for (var i = 0; i < data.colors.length; i++) { #" +
                                "<span class='tc-color' style='background-color: #= data.colors[i] #'></span>" +
                            "# } } #" +
                            "<span class='tc-theme-name'>#= data.text #</span>" +
                        "</a>" +
                    "</li>",
                { useWithBlock: false }),
                themes: false
            }
        });

    kendo.ui.plugin(ThemeChooser);

    extend(window, {
        Application: Application,
        applyCurrentMobileOS: applyCurrentMobileOS,
        applyCurrentTheme: applyCurrentTheme,
        preventFOUC: function () {
            $("#exampleWrap").css("visibility", "hidden");
        },
        tabToSelect: function () {
            var queryString = location.search.replace("?", "");

            return { "mvc": 1, "jsp": 2, "php": 3}[queryString] || 0;
        },
        addProductToLinks: function () {
            $("#example a").attr("href", function (index, href) {
                return href + location.search;
            });
        }
    });
})(jQuery, window);
