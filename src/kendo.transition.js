;(function($, undefined) {

    var TRANSFORM = kendo.support.transitions.css + "transform",
        PX = "px";

    function wrapForAnimation(element, options) {
        options = options || {};
        return kendo.wrap(element).css($.extend({position: "relative"}, options));
    }

    function positionElement(element, direction) {
        if (!direction) {
            return;
        }

        var offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth());

        if (kendo.support.transitions) {
            element.css(TRANSFORM, direction.transition + "(" + offset + PX + ")");
        } else {
            element.css(direction.property, offset + PX);
        }

        // Read a style to force Chrome to apply the change.
        element.css(direction.property);
    }

    function parseTransitionEffects(effects) {
        if (effects === "zoom") {
            effects = "zoomIn fadeIn";
        }
        if (effects === "slide") {
            effects = "slide:left";
        }
        if (effects === "fade") {
            effects = "fadeIn";
        }
        if (effects === "overlay") {
            effects = "slideIn:left";
        }
        if (/^overlay:(.+)$/.test(effects)) {
            effects = "slideIn:" + RegExp.$1;
        }
        return kendo.parseEffects(effects)
    }

    $.fn.kendoAnimateTo = function(element, options) {
        var that = this,
            direction,
            callback,
            container = wrapForAnimation(that),
            transitions = kendo.support.transitions;

        wrapForAnimation(container, {overflow: "hidden"}),

        element.css({position: "absolute", "left": 0, "top": 0});
        container.append(element);

        options.effects = parseTransitionEffects(options.effects);

        $(that).show();

        $.each(options.effects, function(name, definition) {
            direction = direction || definition.direction;
        });

        positionElement(element, kendo.directions[direction]);

        callback = options.complete || $.noop;

        options.complete = function() {
            setTimeout(function() {
                that.hide();
                element.attr("style", "");
                container.attr("style", "position:relative");
                callback();
            });
        }

        if ("slide" in options.effects) {
            container.kendoAnimate(options);
        } else {
            element.kendoAnimate(options);
        }
    };
})(jQuery);

