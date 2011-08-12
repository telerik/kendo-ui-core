(function($, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        each = $.each,
        extend = $.extend,
        browser = $.browser,
        support = kendo.support,
        transitions = kendo.support.transitions,
        scaleProperties = { scale: 0, scaleX: 0, scaleY: 0, scale3d: 0 },
        translateProperties = { translate: 0, translateX: 0, translateY: 0, translate3d: 0 },
        matrix3d = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ],
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\w\.]+),\s*([\d\w\.]+)/,
        cssParamsRegExp = /^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i,
        translateXRegExp = /translatex?\s*\(/i,
        translateYRegExp = /translatey\s*\(/i,
        transformNon3D = { rotate: "", scale: "", translate: "" },
        transformProps = ["perspective", "rotate", "rotateX", "rotateY", "rotateZ", "rotate3d", "scale", "scaleX", "scaleY", "scaleZ", "scale3d", "skew", "skewX", "skewY", "translate", "translateX", "translateY", "translateZ", "translate3d", "matrix", "matrix3d"],
        computedStyle = document.defaultView.getComputedStyle,
        cssPrefix = transitions.css,
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
        TRANSFORM = cssPrefix + "transform",
        INITIAL_HEIGHT = "initialHeight";

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

    function parseCSS (element ,property) {
        return parseInteger(element.css(property));
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
                element.css(TRANSITION);
            }
        }

        function checkTransition (transition) {

            if (transition) {
                var element = transition.object,
                    checkStyle = computedStyle(element[0], null);

                if (transition.complete &&
                    $.map(transition.keys, function(item) {
                        return checkStyle.getPropertyValue(item) != transition.startStyle[item] ? null : 1;
                    }).length) {
                        transition.complete.call(element);

                        removeTransitionStyles(element);

                        element.unbind(transitions.event, fx.deQueue);
                }
            }
        }

        function activateTask (currentTransition) {
            var element = currentTransition.object;

            if (!currentTransition) return;

            typeof currentTransition.complete == "function" && element.one(transitions.event, $.proxy(currentTransition.complete, element));

            var startStyle = computedStyle(element[0], null),
                cssValues = {};

            element.css(currentTransition.setup);
            element.css(TRANSITION);

            each(currentTransition.keys, function() {
                cssValues[this] = startStyle.getPropertyValue(this);
            });
            currentTransition.startStyle = cssValues;

            setTimeout(function () {
                element.css(currentTransition.CSS);

                element.data(ABORT_ID, setTimeout(function () {
                    checkTransition(currentTransition);
                }, currentTransition.duration + 20));
            }, 0);
        }

        function clearAbortCheck (element) {
            if (element.data(ABORT_ID)) {
                clearTimeout(element.data(ABORT_ID));
                element.removeData(ABORT_ID);
            }
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

            deQueue: function() {
                var that = this,
                    element = that.element;

                if (++that.eventNo == that.effectCount) {
                    clearAbortCheck(element);

                    removeTransitionStyles(element);

                    element.dequeue();
                }
            },

            stopQueue: function(element, clearQueue, gotoEnd) {

                clearAbortCheck(element);

                var that = this,
                    taskKeys = element.data("keys"),
                    retainPosition = (gotoEnd === false && taskKeys);

                if (retainPosition) {
                    var style = computedStyle(element[0], null),
                        cssValues = {},
                        prop = 0;

                    while (prop < taskKeys.length)
                        cssValues[taskKeys[prop]] = style.getPropertyValue(taskKeys[prop++]);
                }

                removeTransitionStyles(element);

                if (retainPosition) {
                    element.css(cssValues);

                    if (that.complete)
                        that.complete.call(element);
                }

                element.removeData("keys");

                element.stop(clearQueue);
                return element;
            }

        });

    }

    var animate = function (elements, properties, options) {

        if (transitions && "transition" in fx) {
            fx.transition(elements, properties, options);
        } else {
            each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                var params,
                    currentValue = properties[value]+ " "; // We need to match

                elements.each(function () {
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
                });

            });

        }
    };

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
                    computed = parseInteger(match[1]);
                } else if (translateYRegExp.test(property)) {
                    computed = parseInteger(match[2]);
                }
            }

            return computed;
        } else
            return element.css(property);
    }

    extend(kendo.fx, {
        fadeOut: {
            play: function(element, properties, options) {
                animate(element, extend({ opacity: 0 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ opacity: 1 }, properties), options);
            }
        },
        fadeIn: {
            play: function(element, properties, options) {
                animate(element, extend({ opacity: 1 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ opacity: 0 }, properties), options);
            }
        },
        zoomIn: {
            play: function(element, properties, options) {
                animate(element, extend({ scale: 1 }, properties), extend(options, { teardown: function () { element.css(TRANSITION, NONE); } }));
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ scale: .01 }, properties), options); // Scale 0 is a major mess-up
            }
        },
        zoomOut: {
            play: function(element, properties, options) {
                animate(element, extend({ scale: .01 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ scale: 1 }, properties), extend(options, { teardown: function () { element.css(TRANSITION, NONE); } }));
            }
        },
        slide: {
            play: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                !element.data(ORIGIN) && element.data(ORIGIN, animationProperty(element, direction.transition));

                extender[direction.transition] = offset + PX;
                animate(element, extend(extender, properties), options);
            },
            reverse: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    extender = {};

                extender[direction.transition] = (element.data(ORIGIN) || 0) + PX;
                animate(element, extend(extender, properties), options);
            }
        },
        slideIn: {
            play: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                if (transitions) {
                    element.css(TRANSFORM, direction.transition + "(" + offset + "px)");
                    element.css(direction.property); // Read a style to force Chrome to apply the change.
                    extender[direction.transition] = 0;
                    animate(element, extend(extender, properties), options);
                } else {
                    element.css(direction.property, offset + PX);
                    extender[direction.property] = 0;
                    animate(element, extend(extender, properties), options);
                }
            },
            reverse: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                if (transitions) {
                    extender[direction.transition] = offset + PX;
                    animate(element, extend(extender, properties), options);
                } else {
                    extender[direction.property] = offset + PX;
                    animate(element, extend(extender, properties), options);
                }
            }
        },
        shrinkVertical: {
            play: function(element, properties, options) {
                if (!element.data(HEIGHT))
                    element.data({
                        height: element.outerHeight(),
                        overflow: element.css(OVERFLOW)
                    });
                animate(element, extend({ height: 0 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ height: element.data(HEIGHT) + PX }, properties), extend(options, { teardown: function () { element.css(OVERFLOW, element.data(OVERFLOW)) } }) );
            }
        },
        shrinkHorizontal: {
            play: function(element, properties, options) {
                if (!element.data(WIDTH))
                    element.data({
                        width: element.outerWidth(),
                        overflow: element.css(OVERFLOW)
                    });
                animate(element, extend({ width: 0 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ width: element.data(WIDTH) + PX }, properties), extend(options, { teardown: function () { element.css(OVERFLOW, element.data(OVERFLOW)) } }) );
            }
        },
        expandVertical: {
            play: function(element, properties, options) {
                if (!element.data(OVERFLOW))
                    element.data(OVERFLOW, element.css(OVERFLOW));

                element
                    .css(OVERFLOW, HIDDEN)
                    .css(OVERFLOW);

                var fixedHeight = parseInteger(element.data(INITIAL_HEIGHT)),
                    height = fixedHeight || Math.round(element.height(AUTO).height());

                element
                    .css({ height: 0 })
                    .css(HEIGHT);

                animate(element, extend({ height: height + PX }, properties), extend(options, { teardown: function () {
                    element.css(OVERFLOW, element.data(OVERFLOW));

                    var height = element.data(INITIAL_HEIGHT);
                    if (height == AUTO || height === BLANK) {
                        if (browser.webkit)
                            element.css(TRANSITION, NONE); // Force WebKit to stop transitions.
                        setTimeout(function () { element.css(HEIGHT, AUTO) }, 0);
                    }
                } }));
            },
            reverse: function(element, properties, options) {
                if (!element.data(OVERFLOW))
                    element.data(OVERFLOW, element.css(OVERFLOW));

                element
                    .css(OVERFLOW, HIDDEN)
                    .css(OVERFLOW);

                animate(element, extend({ height: 0 }, properties), extend(options, { teardown: function () {
                    element.css(OVERFLOW, element.data(OVERFLOW));

                    var height = element.data(INITIAL_HEIGHT);
                    if (height == AUTO || height === BLANK) {
                        if (browser.webkit)
                            element.css(TRANSITION, NONE);
                        setTimeout(function () { element.css(HEIGHT, AUTO) }, 0);
                    }
                } }));
            }
        },
        expandHorizontal: {
            play: function(element, properties, options) {
                if (!element.data(OVERFLOW))
                    element.data(OVERFLOW, element.css(OVERFLOW));

                element
                    .css(OVERFLOW, HIDDEN)
                    .css(OVERFLOW);

                var fixedWidth = parseInteger(element[0].style.width),
                    width = fixedWidth || Math.round(element.width(AUTO).width());

                element
                    .css({ width: 0 })
                    .css(WIDTH);

                animate(element, extend({ width: width + PX }, properties), extend(options, { teardown: function () { element.css(OVERFLOW, element.data(OVERFLOW)) } }));
            },
            reverse: function(element, properties, options) {
                if (!element.data(OVERFLOW))
                    element.data(OVERFLOW, element.css(OVERFLOW));

                element.css(OVERFLOW, HIDDEN);

                animate(element, extend({ width: 0 }, properties), extend({ teardown: function () { element.css(OVERFLOW, element.data(OVERFLOW)) } }, options));
            }
        },
        simple: {
            play: function(element, properties, options) {
                animate(element, properties, options);
            },
            reverse: function(element, properties, options) {
                animate(element, properties, options);
            }
        }
    });
})(jQuery);
