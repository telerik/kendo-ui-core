(function($, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        each = $.each,
        extend = $.extend,
        browser = $.browser,
        support = kendo.support,
        transitions = support.transitions,
        scaleProperties = { scale: 0, scaleX: 0, scaleY: 0, scale3d: 0 },
        translateProperties = { translate: 0, translateX: 0, translateY: 0, translate3d: 0 },
        matrix3d = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ],
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\w\.\-]+),\s*([\d\w\.\-]+),\s*([\d\w\.\-]+)/,
        cssParamsRegExp = /^(-?[\d\.\-]+)?[\w\s]*,?\s*(-?[\d\.\-]+)?[\w\s]*/i,
        translateXRegExp = /translatex?$/i,
        transformNon3D = { rotate: "", scale: "", translate: "" },
        transformProps = ["perspective", "rotate", "rotateX", "rotateY", "rotateZ", "rotate3d", "scale", "scaleX", "scaleY", "scaleZ", "scale3d", "skew", "skewX", "skewY", "translate", "translateX", "translateY", "translateZ", "translate3d", "matrix", "matrix3d"],
        cssPrefix = transitions.css,
        round = Math.round,
        BLANK = "",
        PX = "px",
        NONE = "none",
        AUTO = "auto",
        WIDTH = "width",
        SCALE = "scale",
        HEIGHT = "height",
        HIDDEN = "hidden",
        ORIGIN = "origin",
        ABORT_ID = "abortId",
        OVERFLOW = "overflow",
        TRANSLATE = "translate",
        TRANSITION = cssPrefix + "transition",
        TRANSFORM = cssPrefix + "transform";

    kendo.directions = {
        left: {
            reverse: "right",
            property: "left",
            transition: "translateX",
            vertical: false,
            modifier: -1
        },
        right: {
            reverse: "left",
            property: "left",
            transition: "translateX",
            vertical: false,
            modifier: 1
        },
        down: {
            reverse: "up",
            property: "top",
            transition: "translateY",
            vertical: true,
            modifier: 1
        },
        up: {
            reverse: "down",
            property: "top",
            transition: "translateY",
            vertical: true,
            modifier: -1
        },
        "in": {
            reverse: "out",
            modifier: -1
        },
        out: {
            reverse: "in",
            modifier: 1
        }
    };

    function parseInteger ( value ) {
        return parseInt( value, 10 );
    }

    function parseCSS (element, property) {
        return parseInteger(element.css(property));
    }

    function getComputedStyles(element, properties){
        var styles = {};

        if (properties) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var computedStyle = document.defaultView.getComputedStyle(element, "");

                each(properties, function(idx, value) {
                    styles[value] = computedStyle.getPropertyValue(value);
                });
            } else
                if (element.currentStyle) { // Not really needed
                    var style = element.currentStyle;

                    each(properties, function(idx, value) {
                        styles[value] = style[value.replace(/\-(\w)/g, function (strMatch, g1) { return g1.toUpperCase() })];
                    });
                }
        }

        return styles;
    }

    if (transitions) {

        function keys (obj) {
            var acc = [];
            for (var propertyName in obj)
                acc.push(propertyName);
            return acc;
        }

        function removeTransitionStyles (element) {
            element.css(TRANSITION, NONE);

            if (!browser.safari) {
                element.css(HEIGHT);
            }
        }

        function activateTask (currentTransition) {
            var element = currentTransition.object;

            if (!currentTransition) return;

            element.css(currentTransition.setup);
            element.css(TRANSITION);

            setTimeout(function () {
                element.data(ABORT_ID, setTimeout(function () {

                    removeTransitionStyles(element);
                    element.dequeue();
                    currentTransition.complete.call(element);

                }, currentTransition.duration));

                element.css(currentTransition.CSS);
            }, 0);
        }

        extend(kendo.fx, {
            transition: function(element, properties, options) {

                options = extend({
                        duration: 200,
                        ease: "ease-out",
                        complete: null,
                        exclusive: "all"
                    },
                    options
                );

                options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;

                var transforms = [],
                    cssValues = {},
                    key;

                for (key in properties)
                    if (transformProps.indexOf(key) != -1)
                        transforms.push(key + "(" + properties[key] + ")");
                    else
                        cssValues[key] = properties[key];

                if (transforms.length)
                    cssValues[TRANSFORM] = transforms.join(" ");

                var currentTask = {
                    keys: keys(cssValues),
                    CSS: cssValues,
                    object: element,
                    setup: {},
                    duration: options.duration,
                    complete: options.complete
                };
                currentTask.setup[TRANSITION] = options.exclusive + " " + options.duration + "ms " + options.ease;

                var oldKeys = element.data("keys") || [];
                $.merge(oldKeys, currentTask.keys);
                element.data("keys", $.unique(oldKeys));

                activateTask(currentTask);
            },

            stopQueue: function(element, clearQueue, gotoEnd) {

                if (element.data(ABORT_ID)) {
                    clearTimeout(element.data(ABORT_ID));
                    element.removeData(ABORT_ID);
                }

                var that = this,
                    taskKeys = element.data("keys"),
                    retainPosition = (gotoEnd === false && taskKeys);

                if (retainPosition) {
                    var cssValues = getComputedStyles(element[0], taskKeys);
                }

                removeTransitionStyles(element);

                if (retainPosition) {
                    element.css(cssValues);
                }

                element.removeData("keys");

                if (that.complete) {
                    that.complete.call(element);
                }

                element.stop(clearQueue);
                return element;
            }

        });
    }

    function animationProperty (element, property) {
        if (transitions) {
            var transform = element.css(TRANSFORM),
                match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
                computed = 0;

            if (match)
                computed = parseInteger(match[1]);
            else {
                match = transform.match(matrix3dRegExp) || [0, 0, 0];

                if (translateXRegExp.test(property)) {
                    computed = parseInteger(match[2]);
                } else if (property.toLowerCase() == "translatey") {
                    computed = parseInteger(match[3]);
                } else if (property.toLowerCase() == "scale") {
                    computed = parseFloat(match[1]);
                }
            }

            return computed;
        } else
            return element.css(property);
    }

    extend(kendo.fx, {
        animate: function (elements, properties, options) {

            if (transitions && "transition" in fx) {
                fx.transition(elements, properties, options);
            } else {
                each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                    var params,
                        currentValue = properties ? properties[value]+ " " : null; // We need to match

                    elements.each(function () {
                        if (currentValue) {
                            var element = $(this),
                                single = properties;

                            if (value in scaleProperties && properties[value] !== undefined) {
                                !element.data(SCALE) && element.data(SCALE, {
                                            top: parseCSS(element, "top") || 0,
                                            left: parseCSS(element, "left") || 0,
                                            width: element.width(),
                                            height: element.height()
                                        });

                                var originalScale = element.data(SCALE);

                                params = currentValue.match(cssParamsRegExp);
                                if (params) {
                                    var scaleX = value == SCALE + "Y" ? +null : +params[1],
                                        scaleY = value == SCALE + "Y" ? +params[1] : +params[2] || +params[1];

                                    !isNaN(scaleX) && extend(single, {
                                                left: originalScale.left + originalScale.width * (1-scaleX) / 2,
                                                width: originalScale.width * scaleX
                                    });

                                    !isNaN(scaleY) && extend(single, {
                                                top: originalScale.top + originalScale.height * (1-scaleY) / 2,
                                                height: originalScale.height * scaleY
                                            });
                                }
                            } else
                                if (value in translateProperties && properties[value] !== undefined) {
                                    var position = element.css("position"),
                                        isFixed = (position == "absolute" || position == "fixed");

                                    if (!element.data(TRANSLATE)) {
                                        if (isFixed) {
                                            element.data(TRANSLATE, {
                                                top: parseCSS(element, "top") || 0,
                                                left: parseCSS(element, "left") || 0,
                                                bottom: parseCSS(element, "bottom"),
                                                right: parseCSS(element, "right")
                                            });
                                        } else
                                            element.data(TRANSLATE, {
                                                top: parseCSS(element, "marginTop") || 0,
                                                left: parseCSS(element, "marginLeft") || 0
                                            });
                                    }

                                    var originalPosition = element.data(TRANSLATE);

                                    params = currentValue.match(cssParamsRegExp);
                                    if (params) {

                                        var dX = value == TRANSLATE + "Y" ? +null : +params[1],
                                            dY = value == TRANSLATE + "Y" ? +params[1] : +params[2];

                                        if (isFixed) {
                                            if (!isNaN(originalPosition.right))
                                                !isNaN(dX) && extend(single, { right: originalPosition.right - dX });
                                            else
                                                !isNaN(dX) && extend(single, { left: originalPosition.left + dX });

                                            if (!isNaN(originalPosition.bottom))
                                                !isNaN(dY) && extend(single, { bottom: originalPosition.bottom - dY });
                                            else
                                                !isNaN(dY) && extend(single, { top: originalPosition.top + dY });
                                        } else {
                                            !isNaN(dX) && extend(single, { marginLeft: originalPosition.left + dX });
                                            !isNaN(dY) && extend(single, { marginTop: originalPosition.top + dY });
                                        }
                                    }
                                }

                            value in single && delete single[value];
                            element.animate(single, extend({ queue: false }, options));
                        }
                    });
                });

            }
        },
        fadeOut: {
            css: {
                opacity: function () {
                    var element = $(this);
                    return element.data("reverse") && !this.style.opacity ? 0 : undefined;
                }
            },
            setup: function(element, options) {
                return extend({ opacity: options.reverse ? 1 : 0 }, options.properties)
            }
        },
        fadeIn: {
            css: {
                opacity: function () {
                    var element = $(this);
                    return !element.data("reverse") && !this.style.opacity ? 0 : undefined;
                }
            },
            setup: function(element, options) {
                return extend({ opacity: options.reverse ? 0 : 1 }, options.properties)
            }
        },
        zoomIn: {
            css: {
                transform: function () {
                    var element = $(this);
                    return !element.data("reverse") && transitions ? "scale(.01)" : undefined;
                }
            },
            setup: function(element, options) {
                return extend({ scale: options.reverse ? .01 : 1 }, options.properties)
            }
        },
        zoomOut: {
            css: {
                transform: function () {
                    var element = $(this);
                    return element.data("reverse") && transitions ? "scale(.01)" : undefined;
                }
            },
            setup: function(element, options) {
                return extend({ scale: options.reverse ? 1 : .01 }, options.properties)
            }
        },
        slide: {
            setup: function(element, options) {
                var direction = kendo.directions[options.direction],
                    extender = {}, offset, reverse = options.reverse;

                if (!reverse) {
                    offset = direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth());
                    !element.data(ORIGIN) && element.data(ORIGIN, animationProperty(element, kendo.directions[options.direction].transition));
                }

                extender[direction.transition] = reverse ? (element.data(ORIGIN) || 0) + PX : offset + PX;

                return extend(extender, options.properties);
            }
        },
        slideIn: {
            setup: function(element, options) {
                var direction = kendo.directions[options.direction],
                    offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {}, reverse = options.reverse;

                if (transitions) {
                    element.css(TRANSFORM, direction.transition + "(" + (!reverse ? offset : 0) + "px)");
                    extender[direction.transition] = reverse ? offset + PX : 0;
                } else {
                    !reverse && element.css(direction.property, offset + PX);
                    extender[direction.property] = reverse ? offset + PX : 0;
                }
                element.css(direction.property); // Read a style to force Chrome to apply the change.

                return extend(extender, options.properties);
            }
        },
        expandVertical: {
            keep: [ OVERFLOW ],
            css: { overflow: HIDDEN },
            restore: [ OVERFLOW ],
            setup: function (element, options) {
                var reverse = options.reverse,
                    setHeight = element[0].style.height,
                    oldHeight = element.data(HEIGHT),
                    fixedHeight = parseInteger(oldHeight || setHeight),
                    height = fixedHeight || round(element.css({ height: AUTO }).height());

                element.css(HEIGHT, reverse ? height : 0).css(HEIGHT);
                if (oldHeight === undefined) {
                    element.data(HEIGHT, setHeight);
                }

                return extend({ height: (reverse ? 0 : height) + PX }, options.properties);
            },
            teardown: function (element) {
                var height = element.data(HEIGHT);
                if (height == AUTO || height === BLANK) {
                    element.css(HEIGHT, AUTO).css(HEIGHT);
                }
            }
        },
        simple: {
            setup: function(element, options) {
                return options.properties;
            }
        }
    });
})(jQuery);
