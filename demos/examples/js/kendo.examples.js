(function($, window) {
    var Application,
        extend = $.extend,
        live = window.live,
        local = location.protocol == "file:",
        pushState = "pushState" in history,
        currentHtml = "",
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
            nav: /([^\/]+\/[^\/\?]+)(\?.*)?$/,
            title: /<title>(.*?)<\/title>/i,
            skin: /kendo\.\w+(\.min)?\.css/i
        };

    window.selectCategory = function(element) {
        $("#topnav .selected").removeClass("selected");
        $(element).addClass("selected");

        window.panelBar = $("#nav").empty().kendoPanelBar({
            animation: { open: { effects: 'fadeIn expandVertical' } },
            expandMode: "single",
            dataSource: categories[element.id]
        }).data("kendoPanelBar");

        if (live === false)
            $("#navmainWrap").toggleClass("singleColumn", $(element).attr("href") == "overview/index.html");

        if (!referenceUrl)
            referenceUrl = $("#referenceUrl")[0].href;
        $("#nav li a").each(function() {
            var match = $(this).attr("href").match(regexes.nav);
            $(this).attr("href", referenceUrl + (match ? match[1] : ""));
        });
    };

    Application = {
        load: function(href) {
            $.each($(document).find(".k-window-content"), function(index, window) {
                window = $(window).data("kendoWindow");
                if (window) {
                    window.close();
                }
            });

            Application.fetch(href);

            try {
                history.pushState({ href: href }, null, href);
            } catch(err) {}
        },

        fetch: function(href) {
            href = href.toLowerCase();

            $("#nav li a").each(function() {
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

            if (title)
                document.title = title;

            return title;
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;

                var exampleBody = $("#exampleWrap"),
                    exampleName = $("#exampleTitle"),
                    tools = $("#codeStrip, .skinSelector.k-widget"),
                    title = Application.fetchTitle(),
                    toolsVisible = tools.is(":visible");

                if (title == "Overview" && toolsVisible)
                    tools.hide();
                else {
                    Application.fetchDescription();
                }

                if (title == "Overview") {
                    exampleBody.empty().html(Application.body(html));
                } else {
                    exampleName.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                        var sprite = $("#nav > .k-state-highlighted > .k-link > .k-sprite"), iconElement = "";
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

                            if (!toolsVisible)
                                tools.kendoStop(true).kendoAnimate(animation.show);

                            exampleName.kendoStop(true).kendoAnimate(animation.show);
                        }, 100);
                    }}));

                    exampleBody.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                        exampleBody.html(Application.body(html));
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
                var sprite = $("#nav > .k-state-highlighted > .k-link > .k-sprite"), iconElement = "";
                if (sprite.length) {
                    var currentControl = sprite[0].className.match(/\s(\w+Icon)/i)[1];
                    iconElement = '<span class="exampleIcon '+ currentControl.charAt(0).toLowerCase() + currentControl.substr(1) +'"></span>'
                }

                exampleName.empty().html(iconElement + title);

                $("#codeStrip, .skinSelector.k-widget").show();

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
            } else
                $(".description").empty().html($.trim(Application.description(currentHtml)));
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

            var changeSkin = function () {
                if ($.browser.msie) {
                    newLink = document.createStyleSheet(url);
                }

                skinLink.eq(0).before(newLink);
                skinLink.remove();
                if (exampleElement.length)
                    exampleElement[0].style.cssText = exampleElement[0].style.cssText;

                $(document).data("kendoSkin", skinName).trigger("kendo:skinChange");
                $(document.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
            };

            var fadeSkin = function() {
                if (animate) {
                    var animated = exampleElement.add(exampleTitle);
                    animated.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function() {
                        changeSkin();
                        setTimeout(function() {
                            animated.kendoStop().kendoAnimate(animation.show);
                        }, 100);
                    }}));
                } else
                    changeSkin();

                $("#exampleWrap").show();
            };

            if ($("#exampleWrap").length)
                Application.preloadStylesheet(url, fadeSkin);
            else
                changeSkin();
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

            var skinSelector = $("#skinSelector");

            $("#exampleWrap").show();

            if (live === false)
                $("#topnav li a").live("click", function(e) {
                    e.preventDefault();

                    selectCategory(e.target);
                });

            if (pushState && !local) {
                $("#nav li a")
                    .live("click", function(e) {
                        e.preventDefault();

                        if (!location.href.match($(this).attr("href"))) {
                            var element = $(this);

                            $("#nav").find(".chosen").removeClass("chosen");
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

            $(".detailHandle")
                .live("mouseenter mouseleave", function(e) {
                    var element = $(this),
                        extender = element.next();

                    if ($.trim(extender.text()))
                        element.toggleClass("detailHover", e.type == "mouseenter");
                })
                .live("click", function (e) {
                    var element = $(this),
                        extender = element.next(),
                        visible = extender.is(":visible");

                    if ($.trim(extender.text())) {
                        extender.kendoStop(true).kendoAnimate(!visible ? docsAnimation.show : docsAnimation.hide, visible, function() { $(this).css("height", ""); });
                        $(".detailExpanded,.detailCollapsed", this).toggleClass("detailExpanded", !visible).toggleClass("detailCollapsed", visible);
                        element.toggleClass("detailHandleExpanded", !visible);
                    }
                });

            Application.fetchDescription(normalizedUrl);

            $("#viewCode").click(function(e) {
                e.preventDefault();

                if (pushState)
                    Application.fetchCode(currentHtml);
                else
                    $.get(location.href, function(html) {
                        Application.fetchCode(html);
                    }, "html");
            });

            skinSelector.bind("change", function(e) {
                var newSkin = skinSelector.val().toLowerCase();

                Application.fetchSkin(newSkin, true);

                try {
                    sessionStorage.setItem("kendoSkin", newSkin);
                } catch(err) {
                }
            });

            $(document).data("kendoSkin", kendoSkin)
        }

    };

    initialFolder = location.href.match(/\//g).length;
    initialRelativePath = getInitialStylePath();
    kendoSkin = "kendo";

    try {
        if (sessionStorage && sessionStorage.length) {
            kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.fetchSkin(kendoSkin);
            }
        }
    } catch(err) {
    }

    $(Application.init);

})(jQuery, window);

function getInitialStylePath() {
    var result = document.getElementsByTagName("head")[0].innerHTML.match(/href=\W([\.\/]*)([\w\/]*?)kendo\.common/i);
    return result ? result[1] : document.getElementsByTagName("head")[0].innerHTML.match(/href=\W(.*?)styles\/kendo\.common/)[1];
}

function locatePage(url) {
    var category = "",
        iterate = function(item) {
        var result = true;

        $.each(item, function (idx, value) {
            if ($.isPlainObject(value) && "url" in value && value.url === url) {
                result = false;
                return result;
            }

            if ($.isPlainObject(value) || $.isArray(value)) {
                result = iterate(value);

                category = idx;
                return result;
            }
        });
        return result;
    };

    iterate(categories);

    return category;
}

function preventFOUC () {
    $("#exampleWrap").hide();
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

function initializeNavigation (normalizedUrl) {
    var matchedUrl = normalizedUrl.match(/([^\/]+\/[^\/\?]+)(\?.*)?$/);

    if (matchedUrl) {
        var url = matchedUrl[1].toLowerCase(),
            page = locatePage(url);

        $("#navmainWrap").toggleClass("singleColumn", page == "overview");

        selectCategory($("#topnav #" + page)[0]);

        var link = $("#nav .k-link[href*='" + url + "']")
            .addClass("k-state-selected").addClass("chosen");

        panelBar.expand(link.parent().parents(".k-item"), false);
    }

    $(document).ready( function () {
        var skinSelector = $("#skinSelector");

        skinSelector.kendoDropDownList({
            dataSource: [
                            { text: "Kendo", control: "Menu", value: "kendo" },
                            { text: "Blue Opal", control: "Menu", value: "blueopal" },
                            { text: "Black", control: "Menu", value: "black" }
                        ],
            template: '<span class="thumbLink">\
                        <span class="thumb #= data.text.toLowerCase() #Thumb" style="background-image: url(#= initialRelativePath #styles/#= data.control #/thumbSprite.png)">\
                        <span class="gloss"></span></span><span class="skinTitle">#= data.text #</span></span>'
        });

        if (kendoSkin) {
            skinSelector.data("kendoDropDownList").value(kendoSkin);
        }

        $(".skinSelector.k-widget").show();
    });
}

