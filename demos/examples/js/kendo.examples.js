(function() {
    var Application,
        pushState = "pushState" in history,
        currentHtml = "",
        transitionEffects = "fadeOut",
        initialFolder = 0;

    Application = {
        load: function(href) {
            Application.fetch(href);

            history.pushState({ href: href }, null, href);
        },

        fetch: function(href) {
            var href = href.toLowerCase();

            $("#nav li a").each(function() {
                var currentHref = $(this).attr("href");
                if (currentHref && currentHref.toLowerCase() === href.toLowerCase()) {
                    Application.fetchExample(href);
                    $("#viewDescription").trigger("click");
                }
            });
        },

        fetchTitle: function () {
            return $.trim(/<title>(.*?)<\/title>/i.exec(currentHtml)[1]);
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;
                Application.fetchDescription();

                var exampleBody = $("#exampleBody"),
                    exampleName = $(".exampleName"),
                    tools = $("#codeStrip, .skinSelector.t-widget"),
                    title = Application.fetchTitle(),
                    toolsVisible = tools.is(":visible");

                if (title == "Overview")
                    tools.kendoAnimate(transitionEffects, 300, function () { tools.hide(); });

                exampleName.kendoAnimate(transitionEffects, 300, function() {
                    $(".exampleName").empty().html(title);

                    setTimeout(function() {
                        if (title != "Overview" && !toolsVisible)
                            tools.show().kendoAnimate(transitionEffects, 300, true);

                        exampleName.kendoAnimate(transitionEffects, 300, true);
                    }, 100);
                });

                exampleBody.kendoAnimate(transitionEffects, 300, function() {
                    exampleBody.empty().html(Application.body(html));
                    setTimeout(function() {
                        exampleBody.kendoAnimate(transitionEffects, 300, true);
                    }, 100);
                });
            });
        },

        fetchCode: function(html, callback) {
            html = html.replace(new RegExp("\\s*<!-- tools -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- tools -->", "ig"), ""); // Remove tools first to strip description
            html = html.replace(new RegExp("\\s*<!-- \\w+ -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- \\w+ -->", "ig"), "");

            $("#code").empty().text(html);

            prettyPrint();

            if (callback)
                callback();
        },

        fetchDescription: function(href) {
            if (href)
                $.get(href, function(html) {
                    currentHtml = html;

                    var title = Application.fetchTitle();

                    $(".exampleName").empty().html(title);

                    if (title != "Overview") {
                        $("#codeStrip, .skinSelector.t-widget").show();

                        var link = $("#nav .t-link[href*='" + /[^\/]+\/[^\/]+?$/.exec(href)[0] + "']")
                                .addClass("t-state-selected");

                        $("#nav").data('kendoPanelBar').expand(link.parent().parents(".t-item"));

                        $(".description").empty().html($.trim(Application.description(html)));
                    } else {
                        $("#nav .t-item > .t-link").eq(0).addClass("t-state-selected");
                    }

                });
            else
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
                exampleElement[0].style.cssText = exampleElement[0].style.cssText;
            };

            $.get(url, function() {
                if (animate) {
                    exampleElement.kendoAnimate(transitionEffects, 300, function() {
                        changeSkin();
                        setTimeout(function() {
                            exampleElement.kendoAnimate(transitionEffects, 300, true);
                        }, 100);
                    });
                } else
                    changeSkin();

                $("#exampleBody").show();
            });
        },

        description: function(html) {
            return /<div class="description">(([\u000a\u000d\u2028\u2029]|.)*?)<\/\w+>\s*?<!-- description -->/ig.exec(html)[1];
        },

        body: function(html) {
            var match = /<div id="example([Body]*)">(([\u000a\u000d\u2028\u2029]|.)*?)<!-- tools -->/ig.exec(html),
                hasBody = match[0].substr(16, 4) != "Body";

            return (match[1] != "") ? match[2] : (hasBody ? "" : "<div id=\"exampleBody\">") + match[0].replace("<!-- tools -->", "") + (hasBody ? "" : "</div>");
        },

        init: function() {

            initialFolder = location.href.match(/\//g).length;

            var skinSelector = $("#skinSelector");

            if (sessionStorage && sessionStorage.length) {
                var kendoSkin = sessionStorage.getItem("kendoSkin");

                if (kendoSkin) {
                    skinSelector.data("kendoDropDownList").value(kendoSkin);
                    Application.fetchSkin(kendoSkin);
                }
            } else
                $("#exampleBody").show();

            if (pushState) {
                $("#nav li a").click(
                        function(e) {
                            e.preventDefault();

                            Application.load($(this).attr("href"));
                        }).each(function() {
                            $(this).attr("href", this.href);
                        });

                $(window).bind("popstate", function(e) {
                    var state = e.originalEvent.state;
                    if (state) {
                        Application.fetch(state.href.toLowerCase());
                    }
                });

                history.replaceState({ href: location.href }, null, location.href);
            }

            Application.fetchDescription(location.href.substr(-1) == "/" ? location.href + "overview/index.html" : location.href);

            $("#viewCode").click(function(e) {
                e.preventDefault();

                if (pushState)
                    Application.fetchCode(currentHtml);
                else
                    $.get(location.href, function(html) {
                        Application.fetchCode(html);
                    });
            });

            skinSelector.bind("change", function(e) {
                var newSkin = $("#skinSelector")[0].value.toLowerCase();

                Application.fetchSkin(newSkin, true);

                sessionStorage.setItem("kendoSkin", newSkin);
            });
        }

    };

    $(Application.init);

})(jQuery);
