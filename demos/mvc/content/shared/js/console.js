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
            if (!fx.state || typeof fx.end == typeof "") {
                fx.start = getColor(fx.elem, attr);
                fx.end = getRGB(fx.end);
            }

            fx.elem.style[attr] = ["rgb(", [
                Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0),
                Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0)
            ].join(","), ")"].join("");
        };
    });

    // Color Conversion functions from highlightFade
    // By Blair Mitchelmore
    // http://jquery.offput.ca/highlightFade/

    // Parse strings looking for color tuples [255,255,255]
    function getRGB(color) {
        var result;

        // Check if we're already dealing with an array of colors
        if (color && color.constructor == Array && color.length == 3) {
            return color;
        }

        // Look for rgb(num,num,num)
        result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
        if (result) {
            return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
        }

        // Look for #a0b1c2
        result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
        if (result) {
            return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        }

        // Otherwise, we're most likely dealing with a named color
        return jQuery.trim(color).toLowerCase();
    }

    function getColor(elem, attr) {
        var color;

        do {
            color = jQuery.css(elem, attr);

            // Keep going until we find an element that has color, or we hit the body
            if (color && color != "transparent" || jQuery.nodeName(elem, "body")) {
                break;
            }

            attr = "backgroundColor";

            elem = elem.parentNode;
        } while (elem);

        return getRGB(color);
    }

    var href = window.location.href;
    if (href.indexOf("culture") > -1) {
        $("#culture").val(href.replace(/(.*)culture=([^&]*)/, "$2"));
    }

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

    $("#culture").change(onlocalizationchange);
})(jQuery);
