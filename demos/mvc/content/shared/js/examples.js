(function($, window) {
    var Application,
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
        initialFolder = 0,
        referenceUrl = "",
        skinRegex = /kendo\.\w+(\.min)?\.css/i;

    Application = {
        load: function(href) {
            $(document)
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
                mainWrap = $("#main");

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
            var element;

            element = $(["<link rel=\"stylesheet\" media=\"print\" href=\"", file, "\">"].join(''));
            $("head").append(element);

            setTimeout(function () {
                callback();
                element.remove();
            }, 100);
        },

        fetchSkin: function(skinName, animate) {
            var kendoLinks = $("link[href*='kendo.']", document.getElementsByTagName("head")[0]),
                commonLink = kendoLinks.filter("[href*='kendo.common']"),
                skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
                currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                url = currentFolder + commonLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1.css"),
                exampleTitle = $("#exampleTitle"),
                oldSkinName = $(document).data("kendoSkin"),
                exampleElement = $("#example"), newLink;

            if (!$.browser.msie) {
                newLink = skinLink
                    .eq(0)
                    .clone()
                    .attr("href", url);
            }

            function changeSkin() {
                if ($.browser.msie) {
                    newLink = document.createStyleSheet(url);
                }

                skinLink.eq(0).before(newLink);
                skinLink.remove();

                if (exampleElement.length) {
                    exampleElement[0].style.cssText = exampleElement[0].style.cssText;
                }

                $(document).data("kendoSkin", skinName).trigger("kendo:skinChange");
                $(document.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
            }

            if ($("#exampleWrap").length) {
                // fade skin
                Application.preloadStylesheet(url, function () {
                    if (animate) {
                        var animated = exampleElement.add(exampleTitle);
                        animated.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function() {
                            changeSkin();
                            setTimeout(function() {
                                animated.kendoStop().kendoAnimate(animation.show);
                            }, 100);
                        }}));
                    } else {
                        changeSkin();
                    }

                    $("#exampleWrap").show();
                });
            } else {
                changeSkin();
            }
        },

        init: function() {
            $("#exampleWrap").css("visibility", "visible");

            if (pushState) {
                $(document)
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

                try {
                    history.replaceState({ href: location.href }, null, location.href);
                } catch (err) {}
            }

            $(document)
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

            $(document).data("kendoSkin", kendoSkin);
        }
    };

    initialFolder = location.href.match(/\//g).length;
    initialRelativePath = getInitialStylePath();
    kendoSkin = "default";
    kendoMobileOS = "ios";

    try {
        if (sessionStorage && sessionStorage.length) {
            kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.fetchSkin(kendoSkin);
            }
        }
    } catch(err) {}

    $(Application.init);

    function getInitialStylePath() {
        var head = document.getElementsByTagName("head")[0];
        return head.innerHTML.match(/href=\W(.*)examples(\.min)?\.css/i)[1];
    }

    function applyCurrentMobileOS() {
        try {
            if (sessionStorage && sessionStorage.length) {
                kendoMobileOS = sessionStorage.getItem("kendoMobileOS") || kendoMobileOS;
            }
        } catch(err) {}

        $("#exampleWrap").addClass("km-" + kendoMobileOS);
    }

    function initializeMobileOSChooser() {
        applyCurrentMobileOS();

        $(document).ready(function() {
            var oses = new kendo.data.DataSource({
                data: [
                    { text: "iOS", value: "ios" },
                    { text: "Android", value: "android" }
                ]
            });

            var osChooser = $("#deviceChooser").val(kendoMobileOS).kendoDropDownList({
                dataSource: oses,
                change: function (argument) {
                    var value = this.value();
                    $("#exampleWrap").attr("class", "").addClass("km-" + value);
                    try {
                        sessionStorage.setItem("kendoMobileOS", value);
                    } catch(err) {}
                }
            });
        });
    }


    function initializeThemeChooser() {
        if (!$(".themeChooser")[0]) {
            return;
        }

        $(document).ready(function() {
            var themes = new kendo.data.DataSource({
                data: [
                    { text: "Black", value: "black" },
                    { text: "Blue Opal", value: "blueopal" },
                    { text: "Default", value: "default" },
                    { text: "Metro", value: "metro" },
                    { text: "Silver", value: "silver" }
                ]
            });

            var themeChooser = $(".themeChooser").val(kendoSkin).kendoDropDownList({
                dataSource: themes,
                template: '<span class="thumbLink">' +
                    '<span class="thumb #= data.text.toLowerCase() #Thumb" ' +
                        'style="background-image: url(#= initialRelativePath #Menu/thumbSprite.png)">' +
                        '<span class="gloss"></span></span><span class="skinTitle">#= data.text #</span></span>',
                change: function(e) {
                    var theme = (this.value() || "default").toLowerCase();

                    Application.fetchSkin(theme, true);

                    try {
                        sessionStorage.setItem("kendoSkin", theme);
                    } catch(err) {}
                }
            }).data("kendoDropDownList");

            themeChooser.list.width(279).append("<a href='" + $("#themebuilder").attr("href") + "' id='launch-themebuilder'>Launch ThemeBuilder</a>");
            $("#launch-themebuilder").parent().mousedown(function(e) {
                setTimeout(function() {
                    clearTimeout(themeChooser._bluring);
                }, 0);
            });

            themeChooser.popup.options = $.extend(themeChooser.popup.options, {
                origin: "bottom right",
                position: "top right"
            });
        });
    }

    window.Application = Application;
    window.initializeThemeChooser = initializeThemeChooser;
    window.initializeMobileOSChooser = initializeMobileOSChooser;
    window.applyCurrentMobileOS = applyCurrentMobileOS;
    window.preventFOUC = function() {
        $("#exampleWrap").css("visibility", "hidden");
    };

})(jQuery, window);
