(function($, window) {
    var Application,
        doc = document,
        extend = $.extend,
        DETAILHANDLE = ".detailHandle",
        pushState = "pushState" in history,
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
        initialFolder = location.href.match(/\//g).length,
        referenceUrl = "",
        skinRegex = /kendo\.\w+(\.min)?\.css/i;

    Application = {
        load: function(href) {
            this.unload();

            Application.fetch(href);

            try {
                history.pushState({ href: href }, null, href);
            } catch(err) {}
        },

        loadWidget: function(href) {
            this.unload();

            this.fetchWidget(href);

            try {
                history.pushState({ href: href }, null, href);
            } catch(err) {}
        },

        fetch: function(href) {
            var exampleWrap = $("#exampleWrap"),
                currentHref = this.href,
                mainWrap = $("#main");

            if (href === currentHref) {
                return;
            }

            this.href = href;

            $.get(href, { partial: 1 }, function(html) {
                exampleWrap.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
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
                var items = $(".demos-nav").find("li").removeClass("active"),
                widget = href.split("/");
                widget = widget[widget.length - 2];

                $($.grep(items, function(li) {
                        var splits = $(li.children[0]).attr("href").split("/");
                        return splits[splits.length - 2] == widget;
                }))
                .addClass("active");

                if (href.indexOf("mobile") == -1) {
                    $("#themeWrap").show();
                }

                $("#mainWrap").removeClass("widgetOverview");
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
            $(doc)
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
                .trigger("kendo:pageUnload")
        },

        preloadStylesheet: function (file, callback) {
            var element = $("<link rel='stylesheet' media='print' href='" + file + "'").appendTo("head");

            setTimeout(function () {
                callback();
                element.remove();
            }, 100);
        },

        changeTheme: function(skinName, animate) {
            var kendoLinks = $("link[href*='kendo.']", doc.getElementsByTagName("head")[0]),
                commonLink = kendoLinks.filter("[href*='kendo.common']"),
                skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
                currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                extension = /\.less$/.test(skinLink.attr("href")) ? ".less" : ".css",
                url = currentFolder + commonLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1" + extension),
                exampleElement = $("#example");

            function replaceTheme() {
                var oldSkinName = $(doc).data("kendoSkin"),
                    newLink;

                if ($.browser.msie) {
                    newLink = $(doc.createStyleSheet(url));
                } else {
                    newLink = skinLink.eq(0).clone().attr("href", url);
                    skinLink.eq(0).before(newLink);
                }

                skinLink.remove();

                if (extension === ".less") {
                    $("head style[id^='less']").remove();
                    less.sheets = [newLink[0]];
                    less.refresh(true);
                }

                if (exampleElement.length) {
                    exampleElement[0].style.cssText = exampleElement[0].style.cssText;
                }

                $(doc).data("kendoSkin", skinName);
                $("#example").trigger("kendo:skinChange");
                $(doc.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
            }

            if (animate) {
                Application.preloadStylesheet(url, function () {
                    var animated = $("#exampleTitle").add(exampleElement);

                    animated.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function() {
                        replaceTheme();
                        setTimeout(function() {
                            animated.kendoStop().kendoAnimate(animation.show);
                        }, 100);
                    }}));
                });
            } else {
                replaceTheme();
            }
        },

        init: function() {
            $("#exampleWrap").css("visibility", "visible");

            if (pushState) {
                $(doc)
                    .on("click", "#examples-nav li a", function(e) {
                        var element = $(this),
                            href = this.href,
                            links, li, prev, next;

                        e.preventDefault();

                        if (!location.href.match(href)) {
                            li = element.parent();
                            links = $("#nav-pager a");
                            prev = links.eq(0);
                            next = links.eq(1);

                            li.siblings().removeClass("active")
                              .end().addClass("active");

                            prev.attr("href", li.prev().find("a").attr("href") || prev.data("widget")),
                            next.attr("href", li.next().find("a").attr("href") || next.data("widget"));

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
                    var state = e.originalEvent.state;
                    if (state) {
                        Application.fetch(state.href.toLowerCase());
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

            $("#qr").click(function(e){
                var bigQR = $("#qrBig");
                bigQR.toggle();
                var newText = bigQR.is(":visible") ? "Hide QR Code" : "Show QR Code";
                $(this).children("em").html(newText);
                e.preventDefault();
                e.stopPropagation();
            });
        },

        initMobile: function() {
            $("#qr").click(function(e){
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

            applyCurrentMobileOS("#mobile-application-container");
        }
    };

    var initialRelativePath = getInitialStylePath(),
        kendoSkin = "default";

    window.kendoMobileOS = "ios";

    $(Application.init);

    function getInitialStylePath() {
        var head = doc.getElementsByTagName("head")[0];
        return head.innerHTML.match(/href=\W(.*)examples(\.min)?\.css/i)[1];
    }

    var mobileClasses = "km-ios km-android km-blackberry km-ios4";

    function applyCurrentTheme() {
        try {
            if (sessionStorage && sessionStorage.length) {
                kendoSkin = sessionStorage.getItem("kendoSkin");

                if (kendoSkin) {
                    Application.changeTheme(kendoSkin);
                }
            }
        } catch(err) {}
    }

    function applyCurrentMobileOS(container) {
        try {
            if (sessionStorage && sessionStorage.length) {
                kendoMobileOS = sessionStorage.getItem("kendoMobileOS") || kendoMobileOS;
            }
        } catch(err) {}

        $(container).removeClass(mobileClasses).addClass("km-" + kendoMobileOS);
        $("#device-wrapper").removeClass("ios android blackberry").addClass(kendoMobileOS);
        $("#deviceList .selectedThumb").removeClass("selectedThumb");
        $("#deviceList ." + kendoMobileOS + "Thumb").parent().addClass("selectedThumb");
    }

    function stopDefaults() {
        return false;
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

        deviceList.find(".thumbLink").click(function () {
            var value = $(this).closest(".thumbLink").children(".thumb").text();
            $(options.container).removeClass(mobileClasses).addClass("km-" + value);
            $("#device-wrapper").removeClass(" ios android blackberry").addClass(value);
            try {
                sessionStorage.setItem("kendoMobileOS", value);
                location.reload();
            } catch(err) {}
        });

       return this;
    };

    $.fn.themeChooser = function(options) {
        options = extend({ largeIcons: true }, options);

        var themes = [
                { text: "Black", value: "black" },
                { text: "Blue Opal", value: "blueopal" },
                { text: "Default", value: "default" },
                { text: "Metro", value: "metro" },
                { text: "Silver", value: "silver" }
            ],
            template = kendo.template("<li data-value='#=value#'><span>#= text #</span></li>"),
            changeTheme = function(theme) {
                Application.changeTheme(theme, true);

                try {
                    sessionStorage.setItem("kendoSkin", theme);
                } catch(err) {}
            };

        return this.each(function() {
            var theme = sessionStorage.getItem("kendoSkin") || "default";
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
