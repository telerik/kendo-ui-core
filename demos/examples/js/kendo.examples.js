(function() {
    var Application,
        pushState = "pushState" in history,
        currentHtml = "",
        transitionEffects = 'fadeOut',
        initialFolder = 0;

    Application = {
        load: function(href) {
            Application.fetch(href);

            history.pushState({ href: href }, null, href);
        },

        fetch: function(href) {
            $("#nav li a").each(function() {
                var currentHref = $(this).attr("href");
                if (currentHref && currentHref.toLowerCase() === href) {
                    Application.fetchExample(href);
                    $('#viewDescription').trigger('click');
                }
            });
        },

        fetchTitle: function () {
        },

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;
                Application.fetchDescription();

                var exampleBody = $('#exampleBody'),
                    exampleName = $(".exampleName");

                exampleName.kendoAnimate('fadeOut', 300, function() {
                    exampleName.empty().html($.trim(/<title>(.*?)<\/title>/i.exec(html)[1]));
                    exampleName.kendoAnimate('fadeOut', 300, true);
                });

                exampleBody.kendoAnimate(transitionEffects, 300, function() {
                    exampleBody.empty().html(Application.body(html));

                    transitionEffects == 'halfFlip:horizontal' &&
                        exampleBody
                            .css(kendo.support.transitions.css + 'transform', 'rotateY(-90deg)')
                            .css('height');
                    exampleBody.kendoAnimate(transitionEffects, 300, true);
                });
            });
        },

        fetchCode: function(html, callback) {
            html = html.replace(new RegExp('\\s*<!-- tools -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- tools -->', 'ig'), ''); // Remove tools first to strip description
            html = html.replace(new RegExp('\\s*<!-- \\w+ -->(([\\u000a\\u000d\\u2028\\u2029]|.)*?)<!-- \\w+ -->', 'ig'), '');

            $("#code").empty().text(html);

            prettyPrint();

            if (callback)
                callback();
        },

        fetchDescription: function(href) {
            if (href)
                $.get(href, function(html) {
                    currentHtml = html;

                    $(".description").empty().html($.trim(Application.description(html)));
                });
            else
                $(".description").empty().html($.trim(Application.description(currentHtml)));
        },

        description: function(html) {
            return /<div class="description">(([\u000a\u000d\u2028\u2029]|.)*?)<\/\w+>\s*?<!-- description -->/ig.exec(html)[1];
        },

        body: function(html) {
            var match = /<div id="example([Body]*)">(([\u000a\u000d\u2028\u2029]|.)*?)<!-- tools -->/ig.exec(html);

            return (match[1] != "") ? match[2] : "<div id=\"exampleBody\">" + match[0].replace("<!-- tools -->", "") + "</div>";
        },

        init: function() {
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

            initialFolder = location.href.match(/\//g).length;

            Application.fetchDescription(location.href);

            $("#viewCode").click(function(e) {
                e.preventDefault();

                if (pushState)
                    Application.fetchCode(currentHtml);
                else
                    $.get(location.href, function(html) {
                        Application.fetchCode(html);
                    });
            });

            $("#skinSelector").bind('change', function(e) {
                var kendoLinks = $('link[href*="kendo."]', document.getElementsByTagName('head')[0]),
                    commonLink = kendoLinks.filter('[href*="kendo.common"]'),
                    skinLink = kendoLinks.filter(':not([href*="kendo.common"])'),
                    currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                    url = currentFolder + commonLink.attr('href').replace(/kendo\.\w+\.css/i, 'kendo.' + $("#skinSelector")[0].value.toLowerCase() + '.css'),
                    newLink;

                if ($.browser.msie)
                    newLink = document.createStyleSheet(url);
                else
                    newLink = skinLink
                                .eq(0)
                                .clone()
                                .attr('href', url);

                $.get(url, function() {
                            var example = $('#example');

                            example.kendoAnimate(transitionEffects, 300, function() {
                                skinLink.eq(0).before(newLink);
                                skinLink.remove();
                                example[0].style.cssText = example[0].style.cssText;

                                transitionEffects == 'halfFlip:horizontal' &&
                                    example
                                        .css(kendo.support.transitions.css + 'transform', 'rotateY(-90deg)')
                                        .css('height');
                                example.kendoAnimate(transitionEffects, 300, true);
                            });
                        });
            });
        }

    };

    $(Application.init);

})(jQuery);
