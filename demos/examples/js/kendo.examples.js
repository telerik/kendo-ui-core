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
        initialRelativePath = "";

    window.selectCategory = function(element) {
        $("#categories .selected").removeClass("selected");
        $(element).addClass("selected");

        window.panelBar = $("#nav").empty().kendoPanelBar({
            animation: { open: { effects: 'fadeIn expandVertical' } },
            expandMode: "single",
            dataSource: categories[element.id]
        }).data("kendoPanelBar");

        if (live === false)
            $("#exampleHead, #exampleWrap").toggleClass("nomargin", $(element).attr("href") == "overview/index.html");

        if (!referenceUrl)
            referenceUrl = $("#logo")[0].href;
        $("#nav li a").each(function() {
            var match = $(this).attr("href").match(/[^\/]+\/[^\/]+?$/);
            $(this).attr("href", referenceUrl + (match ? match[0] : ""));
        });
    };

    Application = {
        load: function(href) {
            $.each($(document).find(".t-window-content"), function(index, window) {
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
            var result = /<title>(.*?)<\/title>/i.exec(currentHtml),
                title = result ? $.trim(result[1]) : "";

            if (title)
                document.title = title;

            return title;
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;

                var exampleBody = $("#exampleBody"),
                    exampleName = $(".exampleName"),
                    tools = $("#codeStrip, .skinSelector.t-widget"),
                    title = Application.fetchTitle(),
                    toolsVisible = tools.is(":visible");

                if (title == "Overview" && toolsVisible)
                    tools.kendoStop(true).kendoAnimate(extend({ hide: true }, animation.hide));
                else {
                    Application.fetchDescription();
                }

                if (title == "Overview") {
                    $(".exampleName").empty().html(title);
                    exampleBody.empty().html(Application.body(html));
                } else {
                    exampleName.kendoStop(true).kendoAnimate(extend({}, animation.hide, { complete: function() {
                        var currentControl = $("#nav > .t-state-highlighted > .t-link > .t-sprite")[0].className.match(/\s(\w+Icon)/i)[1];
                        $(".exampleName").empty().html('<span class="exampleIcon '+ currentControl.charAt(0).toLowerCase() + currentControl.substr(1) +'"></span>'+title);

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
                        exampleBody.empty().html(Application.body(html));
                        setTimeout(function() {
                            exampleBody.kendoStop(true).kendoAnimate(animation.show);
                        }, 100);
                    }}));
                }
            }, "html");
        },

        fetchCode: function(html, callback) {
            html = html.replace(new RegExp("\\s*<!-- tools -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- tools -->", "ig"), ""); // Remove tools first to strip description
            html = html.replace(new RegExp("\\s*<!-- \\w+ -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- \\w+ -->", "ig"), "");

            $("#code").empty().text(html);

            prettyPrint();

            if (callback)
                callback();
        },

        populateTools: function(html, href) {
            var title = Application.fetchTitle();

            if (title != "Overview") {
                var currentControl = $("#nav > .t-state-highlighted > .t-link > .t-sprite")[0].className.match(/\s(\w+Icon)/i)[1];
                $(".exampleName").empty().html('<span class="exampleIcon '+ currentControl.charAt(0).toLowerCase() + currentControl.substr(1) +'"></span>'+title);

                $("#codeStrip, .skinSelector.t-widget").show();

                $(".description").empty().html($.trim(Application.description(html)));
            } else {
                $(".exampleName").empty().html(title);

                $("#nav .t-item > .t-link").eq(0).addClass("t-state-selected");

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

        fetchSkin: function(skinName, animate) {
            var kendoLinks = $("link[href*='kendo.']", document.getElementsByTagName("head")[0]),
                commonLink = kendoLinks.filter("[href*='kendo.common']"),
                skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
                currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                url = currentFolder + commonLink.attr("href").replace(/kendo\.\w+\.css/i, "kendo." + skinName + ".css"),
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
            };

            var fadeSkin = function() {
                if (animate) {
                    exampleElement.kendoStop().kendoAnimate(extend({}, animation.hide, { complete: function() {
                        changeSkin();
                        setTimeout(function() {
                            exampleElement.kendoStop().kendoAnimate(animation.show);
                        }, 100);
                    }}));
                } else
                    changeSkin();

                $("#exampleBody").show();
            };

            if ($("#exampleBody").length)
                $.get(url)
                    .complete(function() {
                        fadeSkin();
                    });
            else
                changeSkin();
        },

        helpTabs: function (html) {
            var result = /<!--\s*help-tabs\s*-->(([\r\n]|.)*?)<!--\s*help-tabs\s*-->/im.exec(html);

            return result ? result[1] : "";
        },

        helpData: function (html) {
            var result = /<!--\s*help-data\s*-->(([\r\n]|.)*?)<!--\s*help-data\s*-->/im.exec(html);

            return result ? result[1] : "";
        },

        description: function(html) {
            var result = /<div[^>]*description[^>]*>(([\u000a\u000d\u2028\u2029]|.)*?)<\/\w+>\s*?<!-- description -->/ig.exec(html);

            return result ? result[1] : "";
        },

        body: function(html) {
            var match = /<div id="example([Body]*)"[^>]*?>(([\u000a\u000d\u2028\u2029]|.)*?)<!-- tools -->/ig.exec(html),
                hasBody = match[0].substr(16, 4) != "Body";

            return (match[1] != "") ? match[2] : (hasBody ? "" : "<div id=\"exampleBody\">") + match[0].replace("<!-- tools -->", "") + (hasBody ? "" : "</div>");
        },

        init: function() {

            codeStrip = $("#codeStrip").data("kendoTabStrip");

            var skinSelector = $("#skinSelector");

            $("#exampleBody").show();

            if (kendoSkin) {
                skinSelector.data("kendoDropDownList").value(kendoSkin);
            }

            if (live === false)
                $("#categories li a").live("click", function(e) {
                    e.preventDefault();

                    selectCategory(e.target);
                });

            if (pushState && !local) {
                $("#nav li a")
                    .live("click", function(e) {
                        e.preventDefault();

                        if (!location.href.match($(this).attr("href")) && !$("#exampleBody").data("animating"))
                            Application.load($(this).attr("href"));
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

            $(document).data("kendoSkin", skinSelector.val())
        }

    };

    initialFolder = location.href.match(/\//g).length;
    initialRelativePath = document.getElementsByTagName("head")[0].innerHTML.match(/href=\W([\.\/]*)([\w\/]*?)kendo\.common/)[1];

    try {
        if (sessionStorage && sessionStorage.length) {
            var kendoSkin = sessionStorage.getItem("kendoSkin");

            if (kendoSkin) {
                Application.fetchSkin(kendoSkin);
            }
        }
    } catch(err) {
    }

    $(Application.init);

})(jQuery, window);

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

var categories = {
    overview: {
        text: "Overview",
        item: {
            url: "overview/index.html"
        }
    },
    controls: [
       {
            text: "AutoComplete",
            expanded: true,
            spriteCssClass: "autocompleteIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "autocomplete/index.html"
                },
                {
                    text: "Binding to remote data",
                    url: "autocomplete/remotedatasource.html"
                },
                {
                    text: "Customizing templates",
                    url: "autocomplete/template.html"
                },
                {
                    text: "Events",
                    url: "autocomplete/events.html"
                },
                {
                    text: "API",
                    url: "autocomplete/api.html"
                }
            ]
        },
        {
            text: "Chart",
            spriteCssClass: "chartIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "chart/index.html"
                },
                {
                    text: "Binding to local data",
                    url: "chart/local-data.html"
                },
                {
                    text: "Binding to remote data",
                    url: "chart/remote-data.html"
                },
                {
                    text: "Events",
                    url: "chart/events.html"
                },
                {
                    text: "API",
                    url: "chart/api.html"
                }
            ]
        },
        {
            text: "ComboBox",
            spriteCssClass: "comboBoxIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "combobox/index.html"
                },
                {
                    text: "Binding to remote data",
                    url: "combobox/remotedatasource.html"
                },
                {
                    text: "Customizing templates",
                    url: "combobox/template.html"
                },
                {
                    text: "Events",
                    url: "combobox/events.html"
                },
                {
                    text: "API",
                    url: "combobox/api.html"
                }
            ]
        },
        {
            text: "DropDownList",
            spriteCssClass: "dropDownListIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "dropdownlist/index.html"
                },
                {
                    text: "Binding to remote data",
                    url: "dropdownlist/remotedatasource.html"
                },
                {
                    text: "Customizing templates",
                    url: "dropdownlist/template.html"
                },
                {
                    text: "Events",
                    url: "dropdownlist/events.html"
                },
                {
                    text: "API",
                    url: "dropdownlist/api.html"
                }
            ]
        },
        {
            text: "Grid",
            spriteCssClass: "gridIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "grid/index.html"
                },
                {
                    text: "Initialization from table",
                    url: "grid/from-table.html"
                },
                {
                    text: "Binding to local data",
                    url: "grid/local-data.html"
                },
                {
                    text: "Binding to remote data",
                    url: "grid/remote-data.html"
                },
                {
                    text: "Virtualization of local data",
                    url: "grid/virtualization-local-data.html"
                },
                {
                    text: "Virtualization of remote data",
                    url: "grid/virtualization-remote-data.html"
                },
                {
                    text: "Sorting",
                    url: "grid/sorting.html"
                },
                {
                    text: "Selection",
                    url: "grid/selection.html"
                },
                {
                    text: "Row template",
                    url: "grid/rowtemplate.html"
                },
                {
                    text: "Events",
                    url: "grid/events.html"
                },
                {
                    text: "API",
                    url: "grid/api.html"
                }
            ]
        },
        {
            text: "Menu",
            spriteCssClass: "menuIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "menu/index.html"
                },
                {
                    text: "Animation effects",
                    url: "menu/animation.html"
                },
                {
                    text: "Events",
                    url: "menu/events.html"
                },
                {
                    text: "API",
                    url: "menu/api.html"
                }
        ] },
        {
            text: "PanelBar",
            spriteCssClass: "panelBarIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "panelbar/index.html"
                },
                {
                    text: "Loading content with AJAX",
                    url: "panelbar/ajax.html"
                },
                {
                    text: "Animation effects",
                    url: "panelbar/animation.html"
                },
                {
                    text: "Events",
                    url: "panelbar/events.html"
                },
                {
                    text: "API",
                    url: "panelbar/api.html"
                }
            ]
        },
        {
            text: "Slider",
            spriteCssClass: "sliderIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "slider/index.html"
                },
                {
                    text: "Events",
                    url: "slider/events.html"
                },
                {
                    text: "API",
                    url: "slider/api.html"
                }
            ]
        },
        {
            text: "Splitter",
            spriteCssClass: "splitterIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "splitter/index.html"
                },
                {
                    text: "Loading content with AJAX",
                    url: "splitter/ajax.html"
                },
                {
                    text: "Events",
                    url: "splitter/events.html"
                },
                {
                    text: "API",
                    url: "splitter/api.html"
                }
            ]
        },
        {
            text: "TabStrip",
            spriteCssClass: "tabStripIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "tabstrip/index.html"
                },
                {
                    text: "Loading content with AJAX",
                    url: "tabstrip/ajax.html"
                },
                {
                    text: "Animation effects",
                    url: "tabstrip/animation.html"
                },
                {
                    text: "Events",
                    url: "tabstrip/events.html"
                },
                {
                    text: "API",
                    url: "tabstrip/api.html"
                }
            ]
        },
        {
            text: "TreeView",
            spriteCssClass: "treeViewIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "treeview/index.html"
                },
                {
                    text: "Events",
                    url: "treeview/events.html"
                },
                {
                    text: "API",
                    url: "treeview/api.html"
                }
            ]
        },
        {
            text: "Upload",
            spriteCssClass: "uploadIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "upload/index.html"
                },
                {
                    text: "Asynchronous Upload",
                    url: "upload/async.html"
                },
                {
                    text: "Events",
                    url: "upload/events.html"
                },
                {
                    text: "API",
                    url: "upload/api.html"
                }
            ]
        },
        {
            text: "Window",
            spriteCssClass: "windowIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "window/index.html"
                },
                {
                    text: "Loading content with AJAX",
                    url: "window/ajax.html"
                },
                {
                    text: "Events",
                    url: "window/events.html"
                },
                {
                    text: "API",
                    url: "window/api.html"
                }
            ]
        }
    ],
    framework: [
        {
            text: "DataSource",
            spriteCssClass: "dataSourceIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "datasource/index.html"
                },
                {
                    text: "Binding to remote data",
                    url: "datasource/remote-data.html"
                },
                {
                    text: "Binding to XML",
                    url: "datasource/xml-data.html"
                },
                {
                    text: "Remote data operations",
                    url: "datasource/remote-operations.html"
                },
                {
                    text: "Local data operations",
                    url: "datasource/local-operations.html"
                },
                {
                    text: "Shared DataSource",
                    url: "datasource/shared.html"
                }
            ]
        },
        {
            text: "Templates",
            spriteCssClass: "templatesIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "templates/index.html"
                },
                {
                    text: "Expressions",
                    url: "templates/expressions.html"
                }
            ]
        },
        {
            text: "Drag & Drop",
            spriteCssClass: "dragdropIcon",
            items: [
                {
                    text: "Basic usage",
                    url: "dragdrop/index.html"
                },
                {
                    text: "Events",
                    url: "dragdrop/events.html"
                }
            ]
        }
    ],
    integration: [
        {
            text: "Integration",
            spriteCssClass: "integrationIcon",
            items: [
                {
                    text: "Using KnockoutJS with Kendo",
                    url: "integration/index.html"
                },
                {
                    text: "Using jQuery templates with Kendo",
                    url: "integration/jquery-templates.html"
                }
            ]
        }
    ]
};

(function($){
    var count = 0,
        oldMessage;

    window.kendoConsole = {
        log: function(message, isError) {
            var oldContainer = $(".console div:first"),
                counter = oldContainer.find(".count");

            if (!oldContainer.length || message != oldMessage) {
                oldMessage = message;
                count = 1;

                $("<div" + (isError ? " class='error'" : "") + "/>")
                    .css({
                        marginTop: -24,
                        backgroundColor: isError ? "#ffbbbb" : "#bbddff"
                    })
                    .html(message)
                    .prependTo(".console")
                    .animate({ marginTop: 0 }, 300)
                    .animate({ backgroundColor: isError ? "#ffdddd" : "#ffffff" }, 800);
            } else {
                count++;

                if (counter.length) {
                    counter.html(count);
                } else {
                    oldContainer.html(oldMessage)
                        .append("<span class='count'>" + count + "</span>");
                }
            }
        },

        error: function(message) {
            this.log(message, true);
        }
    };
})(jQuery);

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery) {

    // We override the animation for all of these color styles
    jQuery.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(i, attr) {
        jQuery.fx.step[attr] = function(fx) {
            if (fx.state == 0 || typeof fx.end == typeof "") {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
            }

            fx.elem.style[attr] = ["rgb(", [
                Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
            ].join(","), ")"].join("");
        }
    });

    // Color Conversion functions from highlightFade
    // By Blair Mitchelmore
    // http://jquery.offput.ca/highlightFade/

    // Parse strings looking for color tuples [255,255,255]
    function getRGB(color) {
        var result;

        // Check if we're already dealing with an array of colors
        if (color && color.constructor == Array && color.length == 3)
            return color;

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))

            return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];

        // Otherwise, we're most likely dealing with a named color
        return colors[jQuery.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;

        do {
            color = jQuery.curCSS(elem, attr);

            // Keep going until we find an element that has color, or we hit the body
            if (color != "" && color != "transparent" || jQuery.nodeName(elem, "body"))
                break;

            attr = "backgroundColor";
        } while (elem = elem.parentNode);

        return getRGB(color);
    }

    var href = window.location.href;
    if (href.indexOf("culture") > -1) {
        $("#culture").val(href.replace(/(.*)culture=([^&]*)/, "$2"));
    }

    $("#culture").change(onlocalizationchange);

    function onlocalizationchange() {
        var value = $(this).val();
        var href = window.location.href;
        if (href.indexOf("culture") > -1) {
            href = href.replace(/culture=([^&]*)/, "culture=" + value);
        } else {
            href += href.indexOf("?") > -1 ? "&culture=" + value : "?culture=" + value;
        }
        window.location.href = href;
    }
})(jQuery);

var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
    lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
    cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
    titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
    "Software Developer", "Inside Sales Coordinator", "Chief Techical Officer", "Chief Execute Officer"],
    birthDates = [new Date("1948/12/08"), new Date("1952/02/19"), new Date("1963/08/30"), new Date("1937/09/19"), new Date("1955/03/04"), new Date("1963/07/02"), new Date("1960/05/29"), new Date("1958/01/09"), new Date("1966/01/27"), new Date("1966/03/27")];

function createRandomData(count) {
    var data = [],
        now = new Date();
    for (var i = 0; i < count; i++) {
        var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
            lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
            city = cities[Math.floor(Math.random() * cities.length)],
            title = titles[Math.floor(Math.random() * titles.length)],
            birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
            age = now.getFullYear() - birthDate.getFullYear();

        data.push({
            Id: i + 1,
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Title: title,
            BirthDate: birthDate,
            Age: age
        });
    }
    return data;
}
