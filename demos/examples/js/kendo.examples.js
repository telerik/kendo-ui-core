(function() {
    var Application,
        pushState = "pushState" in history,
        currentHtml = "",
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

        fetchExample: function (href) {
            $.get(href, function(html) {
                currentHtml = html;
                Application.fetchDescription();

                $("#exampleBody").empty().html(Application.body(html));
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

                    $(".description").empty().html(Application.description(html).trim());
                });
            else
                $(".description").empty().html(Application.description(currentHtml).trim());
        },

        description: function(html) {
            return /<div class="description">(([\u000a\u000d\u2028\u2029]|.)*?)<\/\w+>\s*?<!-- description -->/ig.exec(html)[1];
        },

        body: function(html) {
            var match = /<div id="example(\w*)">(([\u000a\u000d\u2028\u2029]|.)*?)<!-- tools -->/ig.exec(html);

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
                var kendoLinks = $('link[href*="kendo."]', document.head),
                    skinLink = kendoLinks.filter(':not([href*="kendo.common"])'),
                    currentFolder = new Array(location.href.match(/\//g).length - initialFolder + 1).join("../"),
                    url = currentFolder + skinLink.attr('href').replace(/kendo\.\w+\.css/i, 'kendo.' + $("#skinSelector")[0].value.toLowerCase() + '.css'),
                    newLink;

                if ($.browser.msie)
                    newLink = document.createStyleSheet(url);
                else
                    newLink = skinLink
                                .eq(0)
                                .clone()
                                .attr('href', url);

                $.get(url, function() {
                            skinLink.eq(0).before(newLink);
                            skinLink.remove();
                        });
            });
        }

    };

    var count = 0,
        oldMessage;

    window.kendoConsole = {
        log: function(message, isError) {
            if (message != oldMessage) {
                oldMessage = message;
                count = 1;

                $('<div' + (isError ? ' class="error"' : '') + '/>')
                        .css({
                            marginTop: -24,
                            backgroundColor: isError ? '#ffbbbb' : '#bbddff'
                        })
                        .html(message)
                        .prependTo('.console')
                        .animate({ marginTop: 0 }, 300)
                        .animate({ backgroundColor: isError ? '#ffdddd' : '#ffffff' }, 800);
            } else {
                count++;
                var oldContainer = $('.console div:first');
                if (oldContainer.find(".count").length) {
                    oldContainer.find(".count").html(count);
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

    $(Application.init);

})(jQuery);

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery) {

    // We override the animation for all of these color styles
    jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i, attr) {
        jQuery.fx.step[attr] = function(fx) {
            if (fx.state == 0 || typeof fx.end == typeof "") {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
            }

            fx.elem.style[attr] = ["rgb(", [
                Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
            ].join(","), ")"].join('');
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
            if (color != '' && color != 'transparent' || jQuery.nodeName(elem, "body"))
                break;

            attr = "backgroundColor";
        } while (elem = elem.parentNode);

        return getRGB(color);
    }

    var href = window.location.href;
    if (href.indexOf('culture') > -1) {
        $('#culture').val(href.replace(/(.*)culture=([^&]*)/, '$2'));
    }

    $('#culture').change(onlocalizationchange);

    function onlocalizationchange() {
        var value = $(this).val();
        var href = window.location.href;
        if (href.indexOf('culture') > -1) {
            href = href.replace(/culture=([^&]*)/, 'culture=' + value);
        } else {
            href += href.indexOf('?') > -1 ? '&culture=' + value : '?culture=' + value;
        }
        window.location.href = href;
    }
})(jQuery);
