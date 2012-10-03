(function($, undefined) {
    /**
     * @name kendo.fx
     * @namespace This object contains the fx library that is used by all widgets using animation.
     * If this file is not included, all animations will be disabled but the basic functionality preserved.
     */
    var kendo = window.kendo,
        fx = kendo.fx,
        each = $.each,
        extend = $.extend,
        proxy = $.proxy,
        size = kendo.size,
        support = kendo.support,
        browser = support.browser,
        transforms = support.transforms,
        transitions = support.transitions,
        scaleProperties = { scale: 0, scalex: 0, scaley: 0, scale3d: 0 },
        translateProperties = { translate: 0, translatex: 0, translatey: 0, translate3d: 0 },
        hasZoom = (typeof document.documentElement.style.zoom !== "undefined") && !transforms,
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i,
        cssParamsRegExp = /^(-?[\d\.\-]+)?[\w\s]*,?\s*(-?[\d\.\-]+)?[\w\s]*/i,
        translateXRegExp = /translatex?$/i,
        oldEffectsRegExp = /(zoom|fade|expand)(\w+)/,
        singleEffectRegExp = /(zoom|fade|expand)/,
        unitRegExp = /[xy]$/i,
        transformProps = ["perspective", "rotate", "rotatex", "rotatey", "rotatez", "rotate3d", "scale", "scalex", "scaley", "scalez", "scale3d", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "translatez", "translate3d", "matrix", "matrix3d"],
        transform2d = ["rotate", "scale", "scalex", "scaley", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "matrix"],
        transform2units = { "rotate": "deg", scale: "", skew: "px", translate: "px" },
        cssPrefix = transforms.css,
        Effects = [],
        round = Math.round,
        BLANK = "",
        PX = "px",
        NONE = "none",
        AUTO = "auto",
        WIDTH = "width",
        HEIGHT = "height",
        HIDDEN = "hidden",
        ORIGIN = "origin",
        ABORT_ID = "abortId",
        OVERFLOW = "overflow",
        TRANSLATE = "translate",
        TRANSITION = cssPrefix + "transition",
        TRANSFORM = cssPrefix + "transform",
        PERSPECTIVE = cssPrefix + "perspective",
        BACKFACE = cssPrefix + "backface-visibility";

    kendo.directions = {
        left: {
            reverse: "right",
            property: "left",
            transition: "translatex",
            vertical: false,
            modifier: -1
        },
        right: {
            reverse: "left",
            property: "left",
            transition: "translatex",
            vertical: false,
            modifier: 1
        },
        down: {
            reverse: "up",
            property: "top",
            transition: "translatey",
            vertical: true,
            modifier: 1
        },
        up: {
            reverse: "down",
            property: "top",
            transition: "translatey",
            vertical: true,
            modifier: -1
        },
        top: {
            reverse: "bottom"
        },
        bottom: {
            reverse: "top"
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

    extend($.fn, {
        kendoStop: function(clearQueue, gotoEnd) {
            if (transitions) {
                return kendo.fx.stopQueue(this, clearQueue || false, gotoEnd || false);
            } else {
                return this.stop(clearQueue, gotoEnd);
            }
        }
    });

    /* jQuery support for all transform animations (FF 3.5/3.6, Opera 10.x, IE9 */

    if (transforms && !transitions) {
        each(transform2d, function(idx, value) {
            $.fn[value] = function(val) {
                if (typeof val == "undefined") {
                    return animationProperty(this, value);
                } else {
                    var that = $(this)[0],
                        transformValue = value + "(" + val + transform2units[value.replace(unitRegExp, "")] + ")";

                    if (that.style.cssText.indexOf(TRANSFORM) == -1) {
                        $(this).css(TRANSFORM, transformValue);
                    } else {
                        that.style.cssText = that.style.cssText.replace(new RegExp(value + "\\(.*?\\)", "i"), transformValue);
                    }
                }
                return this;
            };

            $.fx.step[value] = function (fx) {
                $(fx.elem)[value](fx.now);
            };
        });

        var curProxy = $.fx.prototype.cur;
        $.fx.prototype.cur = function () {
            if (transform2d.indexOf(this.prop) != -1) {
                return parseFloat($(this.elem)[this.prop]());
            }

            return curProxy.apply(this, arguments);
        };
    }

    kendo.toggleClass = function(element, classes, options, add) {
        if (classes) {
            classes = classes.split(" ");

            if (transitions) {
                options = extend({
                    exclusive: "all",
                    duration: 400,
                    ease: "ease-out"
                }, options);

                element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease);
                setTimeout(function() {
                    element.css(TRANSITION, "").css(HEIGHT);
                }, options.duration); // TODO: this should fire a kendoAnimate session instead.
            }

            each(classes, function(idx, value) {
                element.toggleClass(value, add);
            });
        }

        return element;
    };

    kendo.parseEffects = function(input, mirror) {
        var effects = {};

        if (typeof input === "string") {
            each(input.split(" "), function(idx, value) {
                var redirectedEffect = !singleEffectRegExp.test(value),
                    resolved = value.replace(oldEffectsRegExp, function(match, $1, $2) {
                        return $1 + ":" + $2.toLowerCase();
                    }), // Support for old zoomIn/fadeOut style, now deprecated.
                    effect = resolved.split(":"),
                    direction = effect[1],
                    effectBody = {};

                if (effect.length > 1) {
                    effectBody.direction = (mirror && redirectedEffect ? kendo.directions[direction].reverse : direction);
                }

                effects[effect[0]] = effectBody;
            });
        } else {
            each(input, function(idx) {
                var direction = this.direction;

                if (direction && mirror && !singleEffectRegExp.test(idx)) {
                    this.direction = kendo.directions[direction].reverse;
                }

                effects[idx] = this;
            });
        }

        return effects;
    };

    function parseInteger(value) {
        return parseInt(value, 10);
    }

    function parseCSS(element, property) {
        return parseInteger(element.css(property));
    }

    function slideToSlideIn(options) {
      options.effects.slideIn = options.effects.slide;
      delete options.effects.slide;
      delete options.complete;
      return options;
    }

    function parseTransitionEffects(options) {
        var effects = options.effects,
            mirror;

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

        mirror = options.reverse && /^(slide:)/.test(effects);

        if (mirror) {
            delete options.reverse;
        }

        options.effects = kendo.parseEffects(effects, mirror);

        return options;
    }

    function keys(obj) {
        var acc = [];
        for (var propertyName in obj) {
            acc.push(propertyName);
        }
        return acc;
    }

    function strip3DTransforms(properties) {
        for (var key in properties) {
            if (transformProps.indexOf(key) != -1 && transform2d.indexOf(key) == -1) {
                delete properties[key];
            }
        }

        return properties;
    }

    function normalizeCSS(element, properties, options) {
        var transformation = [], cssValues = {}, lowerKey, key, value, isTransformed;

        for (key in properties) {
            lowerKey = key.toLowerCase();
            isTransformed = transforms && transformProps.indexOf(lowerKey) != -1;

            if (!support.hasHW3D && isTransformed && transform2d.indexOf(lowerKey) == -1) {
                delete properties[key];
            } else {
                value = properties[key];

                if (isTransformed) {
                    transformation.push(key + "(" + value + ")");
                } else {
                    cssValues[key] = value;
                }
            }
        }

        if (transformation.length) {
            cssValues[TRANSFORM] = transformation.join(" ");
        }

        return cssValues;
    }

    function stopTransition(element, callback) {
        if (element.data(ABORT_ID)) {
            clearTimeout(element.data(ABORT_ID));
            element.removeData(ABORT_ID);
        }

        element.css(TRANSITION, "").css(TRANSITION);
        element.dequeue();
        callback.call(element);
    }

    if (transitions) {

        extend(kendo.fx, {
            transition: function(element, properties, options) {
                var css,
                    delay = 0,
                    oldKeys = element.data("keys") || [];

                options = extend({
                        duration: 200,
                        ease: "ease-out",
                        complete: null,
                        exclusive: "all"
                    },
                    options
                );

                options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;

                css = normalizeCSS(element, properties, options);

                $.merge(oldKeys, keys(css));
                element.data("keys", $.unique(oldKeys));

                element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease).css(TRANSITION);
                element.css(css).css(TRANSFORM);

                if (browser.mozilla) {
                    element.one(transitions.event, function () { stopTransition(element, options.complete); } );
                    delay = 50;
                }

                element.data(ABORT_ID, setTimeout(stopTransition, options.duration + delay, element, options.complete));
            },

            stopQueue: function(element, clearQueue, gotoEnd) {

                if (element.data(ABORT_ID)) {
                    clearTimeout(element.data(ABORT_ID));
                    element.removeData(ABORT_ID);
                }

                var that = this, cssValues,
                    taskKeys = element.data("keys"),
                    retainPosition = (gotoEnd === false && taskKeys);

                if (retainPosition) {
                    cssValues = kendo.getComputedStyles(element[0], taskKeys);
                }

                element.css(TRANSITION, "").css(TRANSITION);

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

    function animationProperty(element, property) {
        if (transforms) {
            var transform = element.css(TRANSFORM);
            if (transform == NONE) {
                return property == "scale" ? 1 : 0;
            }

            var match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
                computed = 0;

            if (match) {
                computed = parseInteger(match[1]);
            } else {
                match = transform.match(matrix3dRegExp) || [0, 0, 0, 0, 0];
                property = property.toLowerCase();

                if (translateXRegExp.test(property)) {
                    computed = parseFloat(match[3] / match[2]);
                } else if (property == "translatey") {
                    computed = parseFloat(match[4] / match[2]);
                } else if (property == "scale") {
                    computed = parseFloat(match[2]);
                } else if (property == "rotate") {
                    computed = parseFloat(Math.atan2(match[2], match[1]));
                }
            }

            return computed;
        } else {
            return parseFloat(element.css(property));
        }
    }

    function initDirection(element, direction, reverse) {
        var real = kendo.directions[direction],
            dir = reverse ? kendo.directions[real.reverse] : real;

        return { direction: dir, offset: -dir.modifier * (dir.vertical ? element.outerHeight() : element.outerWidth()) };
    }

    kendo.fx.promise = function(element, options) {
        var effects = [],
            effect,
            promise,
            startState = {},
            endState = {},
            target;

        options.effects = kendo.parseEffects(options.effects);

        element.data("animating", true);

        // create a promise for each effect
        promise = $.Deferred(function(deferred) {
            if (!size(options.effects)) {
                options.init();
                deferred.resolve();
                return;
            }

            var opts = extend({}, options, { complete: deferred.resolve });

            each(options.effects, function(effectName, settings) {
                var effectClass = Effects[effectName];

                if (effectClass) {
                    var dir = kendo.directions[settings.direction];

                    if (settings.direction && dir) {
                        if (options.reverse) {
                            settings.direction = dir.reverse;
                        }
                    }

                    effect = new effectClass(element, extend(true, opts, settings));
                    effects.push(effect);
                }
            });

            each(effects, function() {
                each(this.restore, function(idx, value) {
                    if (!element.data(value)) {
                        element.data(value, element.css(value));
                    }
                });

                extend(startState, this.startState());
            });

            if (!element.is(":visible")) {
                extend(startState, { display: element.data("olddisplay") || "block" }); // Add show to the set
            }

            if (transforms && !options.reset) {
                target = element.data("targetTransform");

                if (target) {
                    startState = extend(target, startState);
                }
            }

            startState = normalizeCSS(element, startState, opts);

            if (transforms && !transitions) {
                startState = strip3DTransforms(startState);
            }

            element.css(startState)
                   .css(TRANSFORM); // Nudge

            each(effects, function() {
                extend(endState, this.endState());
            });

            if (kendo.fx.animate) {
                options.init();
                element.data("targetTransform", endState);
                kendo.fx.animate(element, endState, opts);
            }
        }).promise();

        //wait for all effects to complete
        $.when(promise).then(function() {
            element
                .removeData("animating")
                .dequeue(); // call next animation from the queue

            if (options.hide) {
                element.data("olddisplay", element.css("display")).hide();
            }

            if (effects.length) {
                var restoreCallback = function() {
                    each(effects, function() {
                        each(this.restore, function(idx, value) {
                            element.css(value, element.data(value));
                        });
                    });
                };

                restoreCallback();
                if (hasZoom && !transforms) {
                    setTimeout(restoreCallback, 0); // Again jQuery callback in IE8-.
                }

                each(effects, function() {
                    this.teardown();
                }); // call the internal completion callbacks
            }

            if (options.completeCallback) {
                options.completeCallback(element); // call the external complete callback with the element
            }
        });
    };

    kendo.fx.transitionPromise = function(element, destination, options) {
        kendo.fx.animateTo(element, destination, options);
        return element;
    };

    extend(kendo.fx, {
        animate: function(elements, properties, options) {
            var useTransition = options.transition !== false;
            delete options.transition;

            if (transitions && "transition" in fx && useTransition) {
                fx.transition(elements, properties, options);
            } else {
                if (transforms) {
                    elements.animate(strip3DTransforms(properties), { queue: false, show: false, hide: false, duration: options.duration, complete: options.complete }); // Stop animate from showing/hiding the element to be able to hide it later on.
                } else {
                    elements.each(function() {
                        var element = $(this),
                            multiple = {};

                        each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                            var params,
                                currentValue = properties ? properties[value]+ " " : null; // We need to match

                            if (currentValue) {
                                var single = properties;

                                if (value in scaleProperties && properties[value] !== undefined) {
                                    params = currentValue.match(cssParamsRegExp);
                                    if (hasZoom) {
                                        var half = (1 - params[1]) / 2;
                                        extend(single, {
                                                           zoom: +params[1],
                                                           marginLeft: element.width() * half,
                                                           marginTop: element.height() * half
                                                       });
                                    } else if (transforms) {
                                        extend(single, {
                                                           scale: +params[0]
                                                       });
                                    }
                                } else {
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
                                            } else {
                                                element.data(TRANSLATE, {
                                                    top: parseCSS(element, "marginTop") || 0,
                                                    left: parseCSS(element, "marginLeft") || 0
                                                });
                                            }
                                        }

                                        var originalPosition = element.data(TRANSLATE);

                                        params = currentValue.match(cssParamsRegExp);
                                        if (params) {

                                            var dX = value == TRANSLATE + "y" ? +null : +params[1],
                                                dY = value == TRANSLATE + "y" ? +params[1] : +params[2];

                                            if (isFixed) {
                                                if (!isNaN(originalPosition.right)) {
                                                    if (!isNaN(dX)) { extend(single, { right: originalPosition.right - dX }); }
                                                } else {
                                                    if (!isNaN(dX)) { extend(single, { left: originalPosition.left + dX }); }
                                                }

                                                if (!isNaN(originalPosition.bottom)) {
                                                    if (!isNaN(dY)) { extend(single, { bottom: originalPosition.bottom - dY }); }
                                                } else {
                                                    if (!isNaN(dY)) { extend(single, { top: originalPosition.top + dY }); }
                                                }
                                            } else {
                                                if (!isNaN(dX)) { extend(single, { marginLeft: originalPosition.left + dX }); }
                                                if (!isNaN(dY)) { extend(single, { marginTop: originalPosition.top + dY }); }
                                            }
                                        }
                                    }
                                }

                                if (!transforms && value != "scale" && value in single) {
                                    delete single[value];
                                }

                                if (single) {
                                    extend(multiple, single);
                                }
                            }
                        });

                        if (browser.msie) {
                            delete multiple.scale;
                        }

                        element.animate(multiple, { queue: false, show: false, hide: false, duration: options.duration, complete: options.complete }); // Stop animate from showing/hiding the element to be able to hide it later on.
                    });
                }
            }
        },

        animateTo: function(element, destination, options) {
            var direction,
                commonParent = element.parents().filter(destination.parents()).first(),
                originalOverflow;

            options = parseTransitionEffects(options);
            if (!support.mobileOS.android) {
                originalOverflow = commonParent.css(OVERFLOW);
                commonParent.css(OVERFLOW, "hidden");
            }

            $.each(options.effects, function(name, definition) {
                direction = direction || definition.direction;
            });

            function complete(animatedElement) {
                destination[0].style.cssText = "";
                element[0].style.cssText = ""; // Removing the whole style attribute breaks Android.
                if (!support.mobileOS.android) {
                    commonParent.css(OVERFLOW, originalOverflow);
                }
                if (options.completeCallback) {
                    options.completeCallback.call(element, animatedElement);
                }
            }

            options.complete = browser.msie ? function() { setTimeout(complete, 0); } : complete;
            options.reset = true; // Reset transforms if there are any.

            if ("slide" in options.effects) {
                element.kendoAnimate(options);
                destination.kendoAnimate(slideToSlideIn(options));
            } else {
                (options.reverse ? element : destination).kendoAnimate(options);
            }
        }
    });

    var Effect = kendo.Class.extend({
        init: function(element, options) {
            this.element = element;
            this.options = options;

            if (!this.restore) {
                this.restore = [];
            }
        },

        startState: $.noop,
        endState: $.noop,
        teardown: $.noop
    });

    function createEffect(name, definition) {
        Effects[name] = Effect.extend(definition);
    }

    createEffect("fade", {
        restore: [ "opacity" ],
        startState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var opacity = element.data("opacity"),
                direction = options.effects.fade.direction,
                result = direction == "out" && isNaN(opacity) || direction == "in" ? 0 : opacity;

            return { opacity: result };
        },

        endState: function() {
            var that = this,
                options = that.options;

            return extend({ opacity: options.effects.fade.direction == "out" ? 0 : 1 }, options.properties);
        }
    });

    createEffect("zoom", {
        startState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var scale = hasZoom ? element[0].style.zoom : animationProperty(element, "scale"),
                zoomIn = options.effects.zoom.direction == "in",
                value = zoomIn ? (scale != 1 ? scale : "0.01") : 1;

            if (hasZoom) {
                return { zoom: value };
            } else {
                return { scale: value };
            }
        },

        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var reverse = options.effects.zoom.direction == "out";

            if (hasZoom) {
                var version = browser.version,
                    style = element[0].currentStyle,
                    width = style.width.indexOf("%") != -1 ? element.parent().width() : element.width(),
                    height = style.height.indexOf("%") != -1 ? element.parent().height() : parseInteger(style.height),
                    half = version < 9 && options.effects.fade ? 0 : (1 - (parseInteger(element.css("zoom")) / 100)) / 2; // Kill margins in IE7/8 if using fade

                element.css({
                    marginLeft: width * (version < 8 ? 0 : half),
                    marginTop: height * half
                });
            }

            return extend({ scale: reverse ? 0.01 : 1 }, options.properties);
        }
    });

    createEffect("slide", {
        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var reverse = options.reverse, extender = {},
                init = initDirection(element, options.effects.slide.direction, reverse),
                property = transforms && options.transition !== false ? init.direction.transition : init.direction.property;

            init.offset /= -(options.divisor || 1);
            if (!reverse) {
                var origin = element.data(ORIGIN);
                if (!origin && origin !== 0) {
                    element.data(ORIGIN, animationProperty(element, property));
                }
            }

            extender[property] = reverse ? (element.data(ORIGIN) || 0) : (element.data(ORIGIN) || 0) + init.offset + PX;

            return extend(extender, options.properties);
        }
    });

    createEffect("slideMargin", {
        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var origin = element.data(ORIGIN),
                offset = options.offset, margin,
                extender = {}, reverse = options.reverse;

            if (!reverse && !origin && origin !== 0) {
                element.data(ORIGIN, parseFloat(element.css("margin-" + options.axis)));
            }

            margin = (element.data(ORIGIN) || 0);
            extender["margin-" + options.axis] = !reverse ? margin + offset : margin;
            return extend(extender, options.properties);
        }
    });

    createEffect("slideTo", {
        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var offset = (options.offset+"").split(","),
                extender = {}, reverse = options.reverse;

            if (transforms && options.transition !== false) {
                extender.translatex = !reverse ? offset[0] : 0;
                extender.translatey = !reverse ? offset[1] : 0;
            } else {
                extender.left = !reverse ? offset[0] : 0;
                extender.top = !reverse ? offset[1] : 0;
            }
            element.css("left");

            return extend(extender, options.properties);
        }
    });


    createEffect("slideIn", {
        startState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var init = initDirection(element, options.effects.slideIn.direction, options.reverse),
                value = (!options.reverse ? init.offset : 0) + PX;

            if (init.direction.transition == "translatex") {
                return { translatex: value };
            } else {
                return { translatey: value };
            }
        },

        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var reverse = options.reverse,
                init = initDirection(element, options.effects.slideIn.direction, reverse),
                extender = {};

            if (transforms && options.transition !== false) {
                extender[init.direction.transition] = (reverse ? init.offset : 0) + PX;
            } else {
                if (!reverse) {
                    element.css(init.direction.property, init.offset + PX);
                }
                extender[init.direction.property] = (reverse ? init.offset : 0) + PX;
                element.css(init.direction.property);
            }

            return extend(extender, options.properties);
        }
    });


    createEffect("expand", {
        startState: function() {
            return { overflow: HIDDEN };
        },

        restore: [ OVERFLOW ],

        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var reverse = options.reverse,
                direction = options.effects.expand.direction,
                property = (direction ? direction == "vertical" : true) ? HEIGHT : WIDTH,
                setLength = element[0].style[property],
                oldLength = element.data(property),
                length = parseFloat(oldLength || setLength),
                realLength = round(element.css(property, AUTO)[property]()),
                completion = {};

            length = options.reset ? realLength || length : length || realLength;

            completion[property] = (reverse ? 0 : length) + PX;
            element.css(property, reverse ? length : 0).css(property);
            if (oldLength === undefined) {
                element.data(property, setLength);
            }

            return extend(completion, options.properties);
        },
        teardown: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var direction = options.effects.expand.direction,
                property = (direction ? direction == "vertical" : true) ? HEIGHT : WIDTH,
                length = element.data(property);
            if (length == AUTO || length === BLANK) {
                setTimeout(function() { element.css(property, AUTO).css(property); }, 0); // jQuery animate complete callback in IE is called before the last animation step!
            }
        }
    });

    createEffect("flip", {
        startState: function () {
            var that = this,
                options = that.options;

            var value = options.reverse ? "180deg" : "0deg";
            if (options.effects.flip.direction == "vertical") {
                return { rotatex: value };
            } else {
                return { rotatey: value };
            }
        },

        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            var rotation = options.effects.flip.direction == "horizontal" ? "rotatey" : "rotatex",
                reverse = options.reverse, parent = element.parent(),
                degree = options.degree, face = options.face, back = options.back,
                faceRotation = rotation + (reverse ? "(180deg)" : "(0deg)"),
                backRotation = rotation + (reverse ? "(0deg)" : "(180deg)"),
                completion = {};

            if (support.hasHW3D) {
                if (parent.css(PERSPECTIVE) == NONE) {
                    parent.css(PERSPECTIVE, 500);
                }

                element.css(cssPrefix + "transform-style", "preserve-3d");
                face.css(BACKFACE, HIDDEN).css(TRANSFORM, faceRotation).css("z-index", reverse ? 0 : -1);
                back.css(BACKFACE, HIDDEN).css(TRANSFORM, backRotation).css("z-index", reverse ? -1 : 0);
                completion[rotation] = (reverse ? "-" : "") + (degree ? degree : 180) + "deg";
            } else {
                if (kendo.size(options.effects) == 1) {
                    options.duration = 0;
                }
            }
            face.show();
            back.show();

            return extend(completion, options.properties);
        },
        teardown: function() {
            var that = this,
                element = that.element,
                options = that.options;

            options[options.reverse ? "back" : "face"].hide();

            if (support.hasHW3D) {
                $().add(options.face).add(options.back).add(element)
                    .css(BACKFACE, "");
            }
        }
    });


    createEffect("transfer", {
        startState: function() {
            return { scale: 1 };
        },

        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;

            /**
             * Intersection point formulas are taken from here - http://zonalandeducation.com/mmts/intersections/intersectionOfTwoLines1/intersectionOfTwoLines1.html
             * Formula for a linear function from two points from here - http://demo.activemath.org/ActiveMath2/search/show.cmd?id=mbase://AC_UK_calculus/functions/ex_linear_equation_two_points
             * The transform origin point is the intersection point of the two lines from the top left corners/top right corners of the element and target.
             * The math and variables below MAY BE SIMPLIFIED (zeroes removed), but this would make the formula too cryptic.
             */
            var target = options.target,
                offset = element.offset(),
                targetOffset = target.offset(),
                scale = target.outerHeight() / element.outerHeight(),

                x1 = 0,
                y1 = 0,

                x2 = targetOffset.left - offset.left,
                y2 = targetOffset.top - offset.top,

                x3 = x1 + element.outerWidth(),
                y3 = y1,

                x4 = x2 + target.outerWidth(),
                y4 = y2,

                Z1 = (y2 - y1) / (x2 - x1),
                Z2 = (y4 - y3) / (x4 - x3),

                X = (y1 - y3 - Z1 * x1 + Z2 * x3) / (Z2 - Z1),
                Y = y1 + Z1 * (X - x1);

            element.css({
                position: "absolute",
                top: offset.top,
                left: offset.left,
                marginLeft: 0,
                marginTop: 0
            }).appendTo(document.body);

            return extend({ scale: scale, transformOrigin: X + PX + " " + Y + PX }, options.properties);
        }
    });


    createEffect("pageturn", {
        endState: function() {
            var that = this,
                element = that.element,
                options = that.options;


            var horizontal = options.effects.pageturn.direction === "horizontal",
                rotation = horizontal ? "rotatey" : "rotatex",
                reverse = options.reverse,
                face = options.face, back = options.back,
                property = horizontal ? WIDTH : HEIGHT,
                size = element[property](),
                leftPageClip = "rect(auto " + (size / 2) + "px auto auto)",
                rightPageClip = "rect(auto auto auto " + (size / 2) + "px)";

            if (!horizontal) {
                leftPageClip = "rect(auto auto " + (size / 2) + "px auto)";
                rightPageClip = "rect(" + (size / 2) + "px auto auto auto)";
            }

            function toRotation(deg) {
                return rotation + "(" + deg + "deg)";
            }

            var faceRotation = toRotation(0),
                flipRotation = toRotation(180),
                backFlipRotation = toRotation(-180),

                faceStart = faceRotation,
                faceEnd = backFlipRotation,
                backStart = flipRotation,
                backEnd = faceRotation;

            if (reverse) {
                faceStart = backFlipRotation;
                faceEnd = faceRotation;
                backStart = faceRotation;
                backEnd = flipRotation;
            }

            if (!horizontal) {
                faceStart = faceRotation;
                faceEnd = flipRotation;
                backStart = backFlipRotation;
                backEnd = faceRotation;

                if (reverse) {
                    faceStart = flipRotation;
                    faceEnd = faceRotation;
                    backStart = faceRotation;
                    backEnd = backFlipRotation;
                }
            }

            face.show();
            back.show();

            if (support.hasHW3D) {
                if (element.css(PERSPECTIVE) == NONE) {
                    element.css(PERSPECTIVE, 1000);
                }

                element.css(cssPrefix + "transform-style", "preserve-3d");

                var faceClone = face.clone(true).removeAttr("id"),
                    backClone = back.clone(true).removeAttr("id"),
                    clones = faceClone.add(backClone).addClass("temp-pages");

                face.css("clip", leftPageClip);
                back.css("clip", rightPageClip);
                element.append(clones);

                faceClone.css(BACKFACE, HIDDEN).css(TRANSFORM, faceStart).css("z-index", 1).css("clip", rightPageClip);
                backClone.css(BACKFACE, HIDDEN).css(TRANSFORM, backStart).css("z-index", 1).css("clip", leftPageClip);

                // hack to refresh CSS.
                clones.css(TRANSFORM);

                clones.css(TRANSITION, "all " + options.duration + "ms linear");

                faceClone.css(TRANSFORM, faceEnd);
                backClone.css(TRANSFORM, backEnd);
            } else {
                if (kendo.size(options.effects) == 1) {
                    options.duration = 0;
                }
            }

            return options.properties;
        },

        teardown: function() {
            var that = this,
                element = that.element,
                options = that.options;

            options[options.reverse ? "back" : "face"].hide();
            options.face.add(options.back).css("clip", "");

            if (support.hasHW3D) {
                element.find(".temp-pages").remove();
            }
        }
    });

    createEffect("simple", {
        endState: function() {
            return this.options.properties;
        }
    });

/////////////////////////////////////////////////////////


    kendo.fx.expandVertical = kendo.fx.expand; // expandVertical is deprecated.

    var animationFrame  = window.requestAnimationFrame       ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame    ||
                          window.oRequestAnimationFrame      ||
                          window.msRequestAnimationFrame     ||
                          function(callback){ setTimeout(callback, 1000 / 60); };

    var Animation = kendo.Class.extend({
        init: function() {
            var that = this;
            that._tickProxy = proxy(that._tick, that);
            that._started = false;
        },

        tick: $.noop,
        done: $.noop,
        onEnd: $.noop,
        onCancel: $.noop,

        start: function() {
            if (!this.done()) {
                this._started = true;
                animationFrame(this._tickProxy);
            }
        },

        cancel: function() {
            this._started = false;
            this.onCancel();
        },

        _tick: function() {
            var that = this;
            if (!that._started) { return; }

            that.tick();

            if (!that.done()) {
                animationFrame(that._tickProxy);
            } else {
                that._started = false;
                that.onEnd();
            }
        }
    });

    var Transition = Animation.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Animation.fn.init.call(that);
        },

        done: function() {
            return this.timePassed() >= this.duration;
        },

        timePassed: function() {
            return Math.min(this.duration, (+new Date()) - this.startDate);
        },

        moveTo: function(options) {
            var that = this,
                movable = that.movable;

            that.initial = movable[that.axis];
            that.delta = options.location - that.initial;

            that.duration = options.duration || 300;

            that.tick = that._easeProxy(options.ease);

            that.startDate = +new Date();
            that.start();
        },

        _easeProxy: function(ease) {
            var that = this;

            return function() {
                that.movable.moveAxis(that.axis, ease(that.timePassed(), that.initial, that.delta, that.duration));
            };
        }
    });

    extend(Transition, {
        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        easeOutBack: function (t, b, c, d, s) {
            s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    });

    fx.Animation = Animation;
    fx.Transition = Transition;
    fx.createEffect = createEffect;
    fx.Effects = Effects;
})(jQuery);
