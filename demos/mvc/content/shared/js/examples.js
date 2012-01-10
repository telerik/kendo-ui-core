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
            $(doc)
                .trigger("kendo:pageUnload")
                .find(".k-window-content")
                    .each(function(index, kendoWindow) {
                        kendoWindow = $(kendoWindow).data("kendoWindow");
                        if (kendoWindow) {
                            kendoWindow.close();
                        }
                    });

            Application.fetch(href);

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
                    }, 100);
                }}));
            }, "html");
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
                url = currentFolder + commonLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1.css"),
                exampleElement = $("#example");

            function replaceTheme() {
                var oldSkinName = $(doc).data("kendoSkin"),
                    newLink;

                if ($.browser.msie) {
                    newLink = doc.createStyleSheet(url);
                } else {
                    newLink = skinLink.eq(0).clone().attr("href", url);
                }

                newLink.insertBefore(skinLink[0]);
                skinLink.remove();

                if (exampleElement.length) {
                    exampleElement[0].style.cssText = exampleElement[0].style.cssText;
                }

                $(doc).data("kendoSkin", skinName).trigger("kendo:skinChange");
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
                    .on("click", "#navWrap li a", function(e) {
                        e.preventDefault();

                        if (!location.href.match($(this).attr("href"))) {
                            var element = $(this);

                            $("#navWrap .chosen").removeClass("chosen");
                            element.addClass("chosen");

                            Application.load(element.attr("href"));
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
        }
    };

    initialRelativePath = getInitialStylePath();
    kendoSkin = "default";
    kendoMobileOS = "ios";

    try {
        if (sessionStorage && sessionStorage.length) {
            kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.changeTheme(kendoSkin);
            }
        }
    } catch(err) {}

    $(Application.init);

    function getInitialStylePath() {
        var head = doc.getElementsByTagName("head")[0];
        return head.innerHTML.match(/href=\W(.*)examples(\.min)?\.css/i)[1];
    }

    var mobileClasses = "km-ios km-android";

    function applyCurrentMobileOS(container) {
        try {
            if (sessionStorage && sessionStorage.length) {
                kendoMobileOS = sessionStorage.getItem("kendoMobileOS") || kendoMobileOS;
            }
        } catch(err) {}

        $(container).removeClass(mobileClasses).addClass("km-" + kendoMobileOS);
    }

    $.fn.mobileOsChooser = function(options) {
        var oses = new kendo.data.DataSource({
            data: [
                { text: "iOS", value: "ios" },
                { text: "Android", value: "android" }
            ]
        });

        applyCurrentMobileOS(options.container);

        return this.each(function() {
            $(this).val(kendoMobileOS).kendoDropDownList({
                dataSource: oses,
                change: function (argument) {
                    var value = this.value();
                    $(options.container).removeClass(mobileClasses).addClass("km-" + value);
                    try {
                        sessionStorage.setItem("kendoMobileOS", value);
                    } catch(err) {}
                }
            });
        });
    };

    $.fn.themeChooser = function(options) {
        options = extend({ largeIcons: true }, options);

        var themes = new kendo.data.DataSource({
                data: [
                    { text: "Black", value: "black" },
                    { text: "Blue Opal", value: "blueopal" },
                    { text: "Default", value: "default" },
                    { text: "Metro", value: "metro" },
                    { text: "Silver", value: "silver" }
                ]
            });

        return this.each(function() {
            var themeChooser  = $(this).val(kendoSkin).kendoDropDownList({
                    dataSource: themes,
                    template: "<span class='thumbLink'>" +
                        "<span class='thumb #= data.text.toLowerCase() #Thumb' " +
                            "style='background-image: url(" + initialRelativePath + "Menu/thumbSprite.png)'>" +
                            "<span class='gloss'></span></span><span class='skinTitle'>#= data.text #</span></span>",
                    change: function(e) {
                        var theme = (this.value() || "default").toLowerCase();

                        Application.changeTheme(theme, true);

                        try {
                            sessionStorage.setItem("kendoSkin", theme);
                        } catch(err) {}
                    }
                }).data("kendoDropDownList");

            if (options.largeIcons) {
                themeChooser.list.width(279).append("<a href='" + $("#themebuilder").attr("href") + "' id='launch-themebuilder'>Launch ThemeBuilder</a>");
                $("#launch-themebuilder").parent().mousedown(function(e) {
                    setTimeout(function() {
                        clearTimeout(themeChooser._bluring);
                    }, 0);
                });

                themeChooser.popup.options = extend(themeChooser.popup.options, {
                    origin: "bottom right",
                    position: "top right"
                });
            }
        });
    };

    extend(window, {
        Application: Application,
        applyCurrentMobileOS: applyCurrentMobileOS,
        preventFOUC: function() {
            $("#exampleWrap").css("visibility", "hidden");
        }
    });
})(jQuery, window);
