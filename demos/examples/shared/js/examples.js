(function($, window) {
    var Application,
        extend = $.extend,
        DETAILHANDLE = ".detailHandle",
        runningLocally = location.protocol == "file:",
        pushState = "pushState" in history,
        currentHtml = "",
        category = "",
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
        codeStrip = false,
        referenceUrl = "",
        regexes = {
            description: /<div[^>]*description[^>]*>(([\r\n]|.)*?)<\/\w+>\s*?<!-- description -->/im,
            body: /<div id="example([Wrap]*)"[^>]*?>\s*<script[^>]*?>[^>]*script>(([\r\n]|.)*?)<!-- tools -->/im,
            helpData: /<!--\s*help-data\s*-->(([\r\n]|.)*?)<!--\s*help-data\s*-->/im,
            helpTabs: /<!--\s*help-tabs\s*-->(([\r\n]|.)*?)<!--\s*help-tabs\s*-->/im,
            tools: /\s*<!-- tools -->(([\u000a\u000d\u2028\u2029]|.)*?)<!-- tools -->/ig,
            exceptTools: /\s*<!-- \w+ -->(([\u000a\u000d\u2028\u2029]|.)*?)<!-- \w+ -->/ig,
            nav: /([^\/]+\/[^\/\?\#]+)((\?|\#).*)?$/,
            title: /<title>(.*?)<\/title>/i,
            skin: /kendo\.\w+(\.min)?\.css/i
        };

    function selectCategory() {
        var loc = window.location.href.toLowerCase();

        var navWrap = $("#navWrap").empty();

        function navigationSection(dataSource) {
            return $("<ul class='nav' />")
                .kendoPanelBar({
                    animation: { open: { effects: 'fadeIn expandVertical' } },
                    expandMode: "single",
                    dataSource: dataSource
                });
        }

        var categoriesLength = 0;

        for (var i in categories) {
            if (categories.hasOwnProperty(i)) {
                categoriesLength++;
            }
        }

        for (var i in categories) {
            if (categoriesLength > 1) {
                navWrap.append("<h3>" + i + "</h3>")
            }

            navWrap.append(navigationSection(categories[i]));
        }

        if (!referenceUrl) {
            referenceUrl = $("#referenceUrl")[0].href;

            if (category == "web" || category == "dataviz") {
                referenceUrl += category + "/";
            }
        }

        $("#navWrap li a").each(function() {
            var match = $(this).attr("href").match(regexes.nav);
            $(this).attr("href", referenceUrl + (match ? match[1] : ""));
        });
    };

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
            href = href.toLowerCase();

            $("#navWrap li a").each(function() {
                var currentHref = $(this).attr("href");
                if (currentHref && currentHref.toLowerCase() === href) {
                    Application.fetchExample(href);
                    $("#viewDescription").trigger("click");
                }
            });
        },

        fetchTitle: function () {
            var result = regexes.title.exec(currentHtml),
                title = result ? $.trim(result[1]) : "";

            if (title) {
                document.title = title;
            }

            return title;
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;

                var exampleBody = $("#exampleWrap"),
                    exampleName = $("#exampleTitle"),
                    tools = $("#codeStrip, #examplesThemeChooser"),
                    title = Application.fetchTitle(),
                    toolsVisible = tools.is(":visible");

                if (title == "Overview" && toolsVisible) {
                    tools.toggle(category != "mobile" && category != "themebuilder");
                } else {
                    Application.fetchDescription();
                }

                if (title == "Overview") {
                    exampleBody.empty().html(Application.body(html));
                } else {
                    exampleName.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                        var sprite = $("#navWrap > ul > .k-state-highlighted > .k-link > .k-sprite"), iconElement = "";
                        if (sprite.length) {
                            var currentControl = sprite[0].className.match(/\s(\w+Icon)/i)[1];
                            iconElement = '<span class="exampleIcon '+ currentControl.charAt(0).toLowerCase() + currentControl.substr(1) +'"></span>';
                        }
                        $("#exampleTitle").empty().html(iconElement + title);

                        setTimeout(function() {
                            var newTabs = $($.trim(Application.helpTabs(html)));
                            $(".codeTab").nextAll().remove().end().after(newTabs);
                            $(".codeContainer").nextAll().remove().end().after($($.trim(Application.helpData(html))));
                            codeStrip._updateClasses();
                            prettyPrint();

                            if (!toolsVisible) {
                                tools.kendoStop(true).kendoAnimate(animation.show);
                            }

                            exampleName.kendoStop(true).kendoAnimate(animation.show);
                        }, 100);
                    }}));

                    exampleBody.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                        exampleBody.empty().html(Application.body(html));
                        setTimeout(function() {
                            exampleBody.kendoStop(true).kendoAnimate(animation.show);
                        }, 100);
                    }}));
                }
            }, "html");
        },

        fetchCode: function(html, callback) {
            html = html.replace(regexes.tools, ""); // Remove tools first to strip description
            html = html.replace(regexes.exceptTools, "");

            $("#code").empty().text(html);

            prettyPrint();

            if (callback)
                callback();
        },

        populateTools: function(html, href) {
            var title = Application.fetchTitle();
            var exampleName = $("#exampleTitle");

            if (title != "Overview") {
                var sprite = $("#navWrap > ul > .k-state-highlighted > .k-link > .k-sprite"), iconElement = "";
                if (sprite.length) {
                    var currentControl = sprite[0].className.match(/\s(\w+Icon)/i)[1];
                    iconElement = '<span class="exampleIcon '+ currentControl.charAt(0).toLowerCase() + currentControl.substr(1) +'"></span>'
                }

                exampleName.empty().html(iconElement + title);

                $("#codeStrip,#examplesThemeChooser").toggle(category != "mobile" && category != "themebuilder");

                $(".description").empty().html($.trim(Application.description(html)));
            } else {
                Application.fetchExample(href);
            }
            prettyPrint();
        },

        fetchDescription: function(href) {
            if (href) {
                $.get(href, function(html) {
                    currentHtml = html;

                    Application.populateTools(currentHtml, href);
                }, "html")
                .error(function() {
                    currentHtml = "<!doctype html>\n<html>\n" + $("html").html() + "\n</html>";

                    Application.populateTools(currentHtml, href);
                });
            } else {
                $(".description").empty().html($.trim(Application.description(currentHtml)));
            }
        },

        preloadStylesheet: function (file, callback) {
            var element;

            element = $(["<link rel=\"stylesheet\" media=\"print\" href=\"", file, "\">"].join(''));
            $("head").append(element);

            setTimeout(function () {
                if (callback)
                    callback();

                element.remove();
            }, 100);

            return element;
        },

        fetchSkin: function(skinName, animate) {
            var kendoLinks = $("link[href*='kendo.']", document.getElementsByTagName("head")[0]),
                commonLink = kendoLinks.filter("[href*='kendo.common']"),
                skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
                currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                url = currentFolder + commonLink.attr("href").replace(regexes.skin, "kendo." + skinName + "$1.css"),
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

        helpTabs: function (html) {
            var result = regexes.helpTabs.exec(html);

            return result ? result[1] : "";
        },

        helpData: function (html) {
            var result = regexes.helpData.exec(html);

            return result ? result[1] : "";
        },

        description: function(html) {
            var result = regexes.description.exec(html);

            return result ? result[1] : "";
        },

        body: function(html) {
            var match = regexes.body.exec(html),
                hasBody = match[0].substr(16, 4) != "Wrap";

            return (match[1] != "") ? match[2] : (hasBody ? "" : "<div id=\"exampleWrap\">") + match[0].replace("<!-- tools -->", "") + (hasBody ? "" : "</div>");
        },

        init: function() {

            codeStrip = $("#codeStrip").data("kendoTabStrip");

            $("#exampleWrap").show();

            if (pushState && !runningLocally) {
                $(document)
                    .on("click", "#navWrap li a", function(e) {
                        e.preventDefault();

                        if (!location.href.match($(this).attr("href"))) {
                            var element = $(this);

                            $("#navWrap").find(".chosen").removeClass("chosen");
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

            Application.fetchDescription(normalizedUrl);

            $("#viewCode").click(function(e) {
                e.preventDefault();

                if (pushState) {
                    Application.fetchCode(currentHtml);
                } else {
                    $.get(location.href, function(html) {
                        Application.fetchCode(html);
                    }, "html");
                }
            });


            $(document).data("kendoSkin", kendoSkin);
        }
    };

    initialFolder = location.href.match(/\//g).length;
    initialRelativePath = getInitialStylePath();
    kendoSkin = "default";

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

    function getNormalizedUrl() {
        var href = location.href.toLowerCase(),
            reference = $("#referenceUrl")[0].href.toLowerCase();

        return href == reference ?
                   reference.replace("/index.html", "/") :
                   href.substr(-1) == "/" ?
                       href + "index.html" :
                       href;
    }

    function initializeNavigation() {
        var url = window.normalizedUrl = getNormalizedUrl(), link;

        if (/\/web\//i.test(url)) {
            category = "web";
        } else if (/\/dataviz\//i.test(url)) {
            category = "dataviz";
        } else if (/\/mobile\//i.test(url)) {
            category = "mobile";
        } else if (/\/themebuilder\//i.test(url)) {
            category = "themebuilder";
        }

        $("#topnav .selected").removeClass("selected");
        $("#topnav #" + category).addClass("selected");

        if (typeof categories != "undefined") {
            url = url.match(regexes.nav);

            if (url) {
                url = url[1].toLowerCase();

                selectCategory();

                link = $("#navWrap .k-link[href*='" + url + "']")
                    .addClass("k-state-selected chosen");

                link.closest(".k-panelbar").data("kendoPanelBar")
                    .expand(link.parent().parents(".k-item"), false);
            }
        }

        $(document).ready( function () {
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

            themeChooser.popup.options = $.extend(themeChooser.popup.options, {
                origin: "bottom right",
                position: "top right"
            });
        });
    }

    window.Application = Application;
    window.initializeNavigation = initializeNavigation;
    window.preventFOUC = function() {
        $("#exampleWrap").hide();
    };

})(jQuery, window);
