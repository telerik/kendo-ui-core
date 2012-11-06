(function($, window) {
    var Application,
        doc = document,
        extend = $.extend,
        kendo = window.kendo,
        DETAILHANDLE = ".detailHandle",
        docsAnimation = {
            show: {
                effects: "expandVertical fadeIn",
                duration: 300,
                show: true
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
                duration: 300,
                show: true
            },
            hide: {
                effects: "fadeOut",
                duration: 300
            }
        },
        skinRegex = /kendo\.\w+(\.min)?\.(.+)/i,
        supports = {
            sessionStorage: (function() {
                // try-catch for obscure cases that do not allow "sessionStorage" in window
                try {
                    return !!sessionStorage.getItem;
                } catch(e) {
                    return false;
                }
            })(),
            pushState: ("pushState" in history)
        };

    Application = {
        load: function(href) {
            this.unload();

            Application.fetch(href);

            if (supports.pushState) {
                history.pushState({ href: href }, null, href);
            }
        },

        loadWidget: function(href) {
            this.unload();

            this.fetchWidget(href);

            if (supports.pushState) {
                history.pushState({ href: href }, null, href);
            }
        },

        fetch: function(href, forced) {
            var exampleWrap = $("#exampleWrap"),
                currentHref = this.href,
                mainWrap = $("#main");

            if (href === currentHref && !forced) {
                return;
            }

            this.href = href;

            $.get(href, { partial: 1 }, function(html) {
                exampleWrap.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                    var items = $("#examples-nav li").removeClass("active"),
                        item = $($.grep(items, function(li) { return href.indexOf($(li).find("a").attr("href")) > -1; })).addClass("active");

                    updateNavLinks(item, $("#nav-pager a"));

                    mainWrap.replaceWith(html);
                    setTimeout(function() {
                        $("#exampleWrap")
                            .css("visibility", "visible")
                            .kendoStop(true)
                            .kendoAnimate(animation.show);

                        Application.initMobile();

                    }, 100);
                }}));
            }, "html");
        },

        fetchWidget: function(href) {
            var wrapInner = $("#mainWrapInner");

            $.get(href + "?nav=true", function(html) {
                var parts = href.split("/"),
                    widget = parts[parts.length - 2],
                    dashboards = $(".dashboards li").removeClass("active"),
                    items = $(".narrowCol:not(.mobile-devices, .dashboards), .wideCol").find("li").removeClass("active"),
                    condition;

                if (widget == "dashboards") {
                    items = dashboards;
                    condition = function(li) {
                        return href == $(li).find("a").attr("href");
                    };
                } else {
                    condition = function(li) {
                        var splits = $(li.children[0]).attr("href").split("/");
                        return splits[splits.length - 2] == widget;
                    };
                }

                $($.grep(items, condition)).addClass("active");

                if (widget == "dashboards" || widget == "overview") {
                    $("#themeWrap").hide();
                } else if (href.indexOf("mobile") == -1) {
                    $("#themeWrap").show();
                }

                $("#mainWrap").toggleClass("widgetOverview", href.indexOf("overview") > -1);

                wrapInner.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                    wrapInner.replaceWith(html);
                    setTimeout(function() {
                        $("#exampleWrap")
                            .css("visibility", "visible")
                            .kendoStop(true)
                            .kendoAnimate(animation.show);

                        Application.initMobile();

                    }, 100);
                }}));
            }, "html");
        },

        unload: function() {
            if (kendo.ui && kendo.ui.DatePicker) {
                kendo.ui.DatePicker.sharedCalendar = null;
            }

            $(doc)
                .off(".examples")
                .find(".k-animation-container, .k-list-container, .k-calendar-container, .k-calendar")
                .remove()
                .end()
                .find(".k-window-content")
                .each(function(index, kendoWindow) {
                    kendoWindow = $(kendoWindow).data("kendoWindow");
                    if (kendoWindow) {
                        kendoWindow.close();
                    }
                })
                .end()
                .trigger("kendo:pageUnload");
        },

        preloadStylesheet: function (file, callback) {
            var element = $("<link rel='stylesheet' media='print' href='" + file + "' />").appendTo("head");

            setTimeout(function () {
                callback();
                element.remove();
            }, 100);
        },

        getCurrentThemeLink: function() {
            return $("head link").filter(function(x) {
                return (/kendo\./gi).test(this.href) && !(/common|rtl|dataviz/gi).test(this.href);
            });
        },

        getThemeUrl: function(themeName) {
            var currentThemeUrl = Application.getCurrentThemeLink().attr("href");

            return currentThemeUrl.replace(skinRegex, "kendo." + themeName + "$1.$2");
        },

        replaceTheme: function(themeName) {
            var newThemeUrl = Application.getThemeUrl(themeName),
                oldThemeName = $(doc).data("kendoSkin"),
                newLink,
                less = window.less,
                themeLink = Application.getCurrentThemeLink(),
                isLess = /\.less$/.test(themeLink.attr("href")),
                exampleElement = $("#example");

            if (kendo.support.browser.msie) {
                newLink = $(doc.createStyleSheet(newThemeUrl));
            } else {
                newLink = themeLink.eq(0).clone().attr("href", newThemeUrl);
                themeLink.eq(0).before(newLink);
            }

            themeLink.remove();

            if (isLess) {
                $("head style[id^='less']").remove();

                less.sheets = $("head link[href$='.less']").map(function(x) {
                    return this;
                });

                less.refresh(true);
            }

            if (exampleElement.length) {
                exampleElement[0].style.cssText = exampleElement[0].style.cssText;
            }

            $(doc).data("kendoSkin", themeName);
            $("#example").trigger("kendo:skinChange");
            $(doc.documentElement).removeClass("k-" + oldThemeName).addClass("k-" + themeName);
        },

        changeTheme: function(themeName, animate) {
            if (animate) {
                Application.preloadStylesheet(Application.getThemeUrl(themeName), function () {
                    var exampleElement = $("#example"),
                        animated = $("#exampleTitle").add(exampleElement);

                    animated.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function(element) {
                        if (element[0] == exampleElement[0]) {
                            animated.css("visibility", "hidden"); // Hide the element with restored opacity.
                            Application.replaceTheme(themeName);
                            setTimeout(function() {
                                animated
                                    .css("visibility", "visible")
                                    .kendoStop()
                                    .kendoAnimate(animation.show);
                            }, 100);
                        }
                    }}));
                });
            } else {
                Application.replaceTheme(themeName);
            }
        },

        init: function() {
            $("#exampleWrap").css("visibility", "visible");

            if (supports.pushState) {
                $(doc)
                    .on("click", "#examples-nav li a", function(e) {
                        var element = $(this),
                            href = this.href;

                        e.preventDefault();

                        if (!location.href.match(href)) {
                            updateNavLinks(element.parent(), $("#nav-pager a"));
                            Application.load(href);
                        }
                    })
                    .on("click", "#nav-pager a", function(e) {
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
                    });

                $(window).bind("popstate", function(e) {
                    var state = e.originalEvent.state,
                        href;

                    if (state) {
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
                } catch (err) {}
            }

            $(doc)
                .on("mouseenter mouseleave", DETAILHANDLE, function(e) {
                    var element = $(this),
                        extender = element.next();

                    if ($.trim(extender.text())) {
                        element.toggleClass("detailHover", e.type == "mouseenter");
                    }
                })
                .on("click", DETAILHANDLE, function (e) {
                    var element = $(this),
                        extender = element.next(),
                        visible = extender.is(":visible");

                    if ($.trim(extender.text())) {
                        extender
                            .kendoStop(true)
                            .kendoAnimate(
                                !visible ? docsAnimation.show : docsAnimation.hide,
                                visible,
                                function() { $(this).css("height", ""); }
                            );

                        $(".detailExpanded,.detailCollapsed", this)
                            .toggleClass("detailExpanded", !visible)
                            .toggleClass("detailCollapsed", visible);

                        element.toggleClass("detailHandleExpanded", !visible);
                    }
                });

            $(doc).data("kendoSkin", kendoSkin);

            $("#qr").off().click(function(e){
                var bigQR = $("#qrBig");
                bigQR.toggle();
                var newText = bigQR.is(":visible") ? "Hide QR Code" : "Show QR Code";
                $(this).children("em").html(newText);
                e.preventDefault();
                e.stopPropagation();
            });

            $("#deviceChooser").mobileOsChooser({
                container: "#mobile-application-container"
            });
        },

        initMobile: function() {
            $("#qr").off().click(function(e){
                var bigQR = $("#qrBig");
                bigQR.toggle();
                var newText = bigQR.is(":visible") ? "Hide QR Code" : "Show QR Code";
                $(this).children("em").html(newText);
                e.preventDefault();
                e.stopPropagation();
            });

            applyCurrentMobileOS("#mobile-application-container");
        }
    };

    var kendoSkin = "default";

    window.kendoMobileOS = "ios";

    $(Application.init);

    var mobileClasses = "km-ios km-android km-blackberry km-ios4";

    function applyCurrentTheme() {
        if (supports.sessionStorage) {
            kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.changeTheme(kendoSkin);
            }
        }
    }

    function applyCurrentMobileOS(container) {
        var kendoMobileOS = window.kendoMobileOS;

        if (supports.sessionStorage) {
            window.kendoMobileOS = sessionStorage.getItem("kendoMobileOS") || kendoMobileOS;
        }

        $(container).removeClass(mobileClasses).addClass("km-" + kendoMobileOS);
        $("#device-wrapper").removeClass("ios android blackberry").addClass(kendoMobileOS);
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

    $.fn.mobileOsChooser = function(options) {
        var deviceList = $("#deviceList");
        if (deviceList.length != 1) {
            return this;
        }

        var oses = new kendo.data.DataSource({
            data: [
                { text: "iOS", value: "ios" },
                { text: "Android", value: "android" },
                { text: "Blackberry", value: "blackberry" }
            ]
        });

        oses.read();

        applyCurrentMobileOS(options.container);

        var deviceTemplate = kendo.template($("#deviceThumbTemplate").html());
        deviceList.html(kendo.render(deviceTemplate, oses.view()));

        deviceList.find(".osName,.osThumb").click(function () {
            var li = $(this).closest("li");

            if (supports.sessionStorage) {
                if (sessionStorage.getItem("kendoMobileOS") === li.children(".osThumb").text()) {
                    return;
                }

                sessionStorage.setItem("kendoMobileOS", li.children(".osThumb").text());

                li.siblings().removeClass("selectedThumb")
                  .end().addClass("selectedThumb");

                Application.fetch(location.href, true);
            }
        });

       return this;
    };

    $.fn.themeChooser = function(options) {
        options = extend({ largeIcons: true }, options);

        var themes = [
                { text: "Black", value: "black" },
                { text: "Blue Opal", value: "blueopal" },
                { text: "Bootstrap", value: "bootstrap" },
                { text: "Default", value: "default" },
                { text: "High Contrast", value: "highcontrast" },
                { text: "Metro", value: "metro" },
                { text: "Metro Black", value: "metroblack" },
                { text: "Silver", value: "silver" }
            ],
            template = kendo.template("<li data-value='#=value#' class='skin-#=value#'><span>#= text #</span></li>"),
            changeTheme = function(theme) {
                Application.changeTheme(theme, true);

                if (supports.sessionStorage) {
                    sessionStorage.setItem("kendoSkin", theme);
                }
            };

        return this.each(function() {
            var theme;

            if (supports.sessionStorage) {
                theme = sessionStorage.getItem("kendoSkin");
            }

            theme = theme || "default";

            $(this).html(kendo.render(template, themes))
                   .on("click", "li", function() {
                       var li = $(this).children("span").addClass("k-state-selected").end(),
                           theme = themes[li.index()];

                       li.siblings().children("span").removeClass("k-state-selected");

                       changeTheme(theme.value);
                   })
                   .children()
                   .filter(function() {
                       return $(this).data("value") === theme;
                   }).children("span").addClass("k-state-selected");
        });
    };

    extend(window, {
        Application: Application,
        applyCurrentMobileOS: applyCurrentMobileOS,
        applyCurrentTheme: applyCurrentTheme,
        preventFOUC: function() {
            $("#exampleWrap").css("visibility", "hidden");
        }
    });
})(jQuery, window);
