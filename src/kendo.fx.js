(function($, window, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        extend = $.extend,
        scaleProperties = { scale: 0, scaleX: 0, scaleY: 0, scale3d: 0 },
        translateProperties = { translate: 0, translateX: 0, translateY: 0, translate3d: 0 },
        matrix3d = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ],
        transformNon3D = { rotate: '', scale: '', translate: '' },
        transformProps = ['perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'matrix', 'matrix3d'];

    if (kendo.support.transitions) {

        var keys = function (obj) {
            var acc = [];
            for (var propertyName in obj)
                acc.push(propertyName);
            return acc;
        };

        var removeTransitionStyles = function (element) {
            var cssPrefix = kendo.support.transitions.css;

            element.css(cssPrefix + 'transition', 'none');

            if (!kendo.support.touch) {
                element.css(cssPrefix + 'backface-visibility', '');
                element.css(cssPrefix + 'backface-visibility');

                element.css(cssPrefix + 'transition');
            }
        };

        var checkTransition = function (transition) {

            if (transition) {
                var element = transition.object,
                    checkStyle = document.defaultView.getComputedStyle(element[0], null);

                if (transition.complete &&
                    $.map(transition.keys, function(item) {
                        return checkStyle.getPropertyValue(item) != transition.startStyle[item] ? null : 1;
                    }).length) {
                        transition.complete.call(element);

                        removeTransitionStyles(element);

                        element.unbind(kendo.support.transitions.event, kendo.fx.deQueue);
                }
            }
        };

        var activateTask = function(currentTransition) {
            var element = currentTransition.object,
                cssPrefix = kendo.support.transitions.css;

            if (!currentTransition) return;

            typeof currentTransition.complete == 'function' && element.one(kendo.support.transitions.event, $.proxy(currentTransition.complete, element));

            var startStyle = document.defaultView.getComputedStyle(element[0], null),
                cssValues = {};

            element.css(currentTransition.setup);
            element.css(cssPrefix + 'transition');

            $.each(currentTransition.keys, function() {
                cssValues[this] = startStyle.getPropertyValue(this);
            });
            currentTransition.startStyle = cssValues;

            setTimeout(function () {
                element.css(currentTransition.CSS);

                element.data('abortId', setTimeout(function () {
                    checkTransition(currentTransition);
                }, currentTransition.duration + 20));
            }, 0);
        };

        extend(kendo.fx, {
            transition: function(element, properties, options) {

                options = extend({
                        duration: 200,
                        ease: 'ease-out',
                        complete: null,
                        exclusive: 'all'
                    },
                    options
                );

                options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;

                var transforms = [],
                    cssValues = {},
                    cssPrefix = kendo.support.transitions.css,
                    key;

                for (key in properties)
                    if (transformProps.indexOf(key) != -1)
                        transforms.push(key + '(' + properties[key] + ')');
                    else
                        cssValues[key] = properties[key];

                if (transforms.length)
                    cssValues[cssPrefix + 'transform'] = transforms.join(' ');

                var currentTask = {
                    keys: keys(cssValues),
                    CSS: cssValues,
                    object: element,
                    setup: {},
                    duration: options.duration,
                    complete: options.complete
                };
                currentTask.setup[cssPrefix + 'transition'] = options.exclusive + ' ' + options.duration + 'ms ' + options.ease;
                if (!kendo.support.touch)
                    currentTask.setup[cssPrefix + 'backface-visibility'] = 'hidden';

                var oldKeys = element.data('keys') || [];
                $.merge(oldKeys, currentTask.keys);
                element.data('keys', $.unique(oldKeys));

                activateTask(currentTask);
            },

            deQueue: function() {
                var element = this.element;

                removeTransitionStyles(element);

                if (++this.eventNo == this.effectCount) {
                    if (element.data('abortId')) {
                        clearTimeout(element.data('abortId'));
                        element.removeData('abortId');
                    }

                    element.dequeue();
                }
            },

            stopQueue: function(element, clearQueue, gotoEnd) {

                var taskKeys = element.data('keys'),
                    retainPosition = (gotoEnd === false && taskKeys);

                if (retainPosition) {
                    var style = document.defaultView.getComputedStyle(element[0], null),
                        cssValues = {},
                        prop = 0;

                    while (prop < taskKeys.length)
                        cssValues[taskKeys[prop]] = style.getPropertyValue(taskKeys[prop++]);
                }

                removeTransitionStyles(element);

                if (retainPosition) {
                    element.css(cssValues);

                    if (this.complete)
                        this.complete.call(element);
                }

                element.removeData('keys');
                if (element.data('abortId')) {
                    clearTimeout(element.data('abortId'));
                    element.removeData('abortId');
                }
                element.stop(clearQueue);
                return element;
            }

        });

    }

    var animate = function (elements, properties, options) {

        if (kendo.support.transitions && 'transition' in kendo.fx) {
            kendo.fx.transition(elements, properties, options);
        } else {
            $.each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                var params = [],
                    currentValue = properties[value]+ ' '; // We need to match

                elements.each(function () {
                    var element = $(this),
                        single = properties;

                    if (value in scaleProperties && properties[value] !== undefined) {
                        !element.data('scale') && element.data('scale', {
                                    top: parseInt(element.css('top'), 10) || 0,
                                    left: parseInt(element.css('left'), 10) || 0,
                                    width: element.width(),
                                    height: element.height()
                                });

                        var originalScale = element.data('scale');

                        params = currentValue.match(/^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i);
                        if (params) {
                            var scaleX = value == 'scaleY' ? +null : +params[1],
                                scaleY = value == 'scaleY' ? +params[1] : +params[2] || +params[1];

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
                            var position = element.css('position'),
                                isFixed = (position == 'absolute' || position == 'fixed');

                            if (!element.data('translate')) {
                                if (isFixed) {
                                    element.data('translate', {
                                        top: parseInt(element.css('top'), 10) || 0,
                                        left: parseInt(element.css('left'), 10) || 0,
                                        bottom: parseInt(element.css('bottom'), 10),
                                        right: parseInt(element.css('right'), 10)
                                    });
                                } else
                                    element.data('translate', {
                                        top: parseInt(element.css('marginTop'), 10) || 0,
                                        left: parseInt(element.css('marginLeft'), 10) || 0
                                    });
                            }

                            var originalPosition = element.data('translate');

                            params = currentValue.match(/^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i);
                            if (params) {

                                var dX = value == 'translateY' ? +null : +params[1],
                                    dY = value == 'translateY' ? +params[1] : +params[2];

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

    var getAnimationProperty = function(element, property) {
        if (kendo.support.transitions) {
            var transform = element.css(kendo.support.transitions.css + 'transform'),
                match = transform.match(new RegExp(property + '\\s*\\(([\\d\\w\\.]+)')),
                computed = 0;

            if (match)
                computed = parseInt(match[1], 10);
            else {
                match = transform.match(/matrix3?d?\s*\(.*,\s*([\d\w\.]+),\s*([\d\w\.]+)/) || [0, 0, 0];
                switch (property.toLowerCase()) {
                    case 'translate':
                    case 'translatex':
                        computed = parseInt(match[1], 10);
                        break;
                    case 'translatey':
                        computed = parseInt(match[2], 10);
                        break;
                }
            }

            return computed;
        } else
            return element.css(property);
    };

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
                animate(element, extend({ scale: 1 }, properties), options);
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
                animate(element, extend({ scale: 1 }, properties), options);
            }
        },
        halfFlip: {
            play: function(element, properties, options) {
                element.parent()
                    .css(kendo.support.transitions.css + 'perspective', 2000)
                    .css(kendo.support.transitions.css + 'transform-style', 'preserve-3d')
                    .css(kendo.support.transitions.css + 'transform-origin', '50% 50%')
                    .css('height');

                var extender = {};
                extender[options.direction == 'vertical' ? 'rotateX' : 'rotateY'] = '90deg';
                animate(element, extend(extender, properties), options);
            },
            reverse: function(element, properties, options) {
                var extender = {};
                extender[options.direction == 'vertical' ? 'rotateX' : 'rotateY'] = 0;
                animate(element, extend(extender, properties), extend(options, {
                    teardown: function () {
                        element.parent()
                            .css(kendo.support.transitions.css + 'perspective', '')
                            .css(kendo.support.transitions.css + 'transform-style', '')
                            .css('height');
                    }
                }));
            }
        },
        slide: {
            play: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                !element.data('origin') && element.data('origin', getAnimationProperty(element, direction.transition));

                extender[direction.transition] = offset + 'px';
                animate(element, extend(extender, properties), options);
            },
            reverse: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    extender = {};

                extender[direction.transition] = (element.data('origin') || 0) + 'px';
                animate(element, extend(extender, properties), options);
            }
        },
        slideIn: {
            play: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                if (kendo.support.transitions) {
                    element.css(kendo.support.transitions.css + 'transform', direction.transition + '(' + offset + 'px)');
                    element.css(direction.property); // Read a style to force Chrome to apply the change.
                    extender[direction.transition] = 0;
                    animate(element, extend(extender, properties), options);
                } else {
                    element.css(direction.property, offset + 'px');
                    extender[direction.property] = 0;
                    animate(element, extend(extender, properties), options);
                }
            },
            reverse: function(element, properties, options) {
                var direction = kendo.directions[options.direction],
                    offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                    extender = {};

                if (kendo.support.transitions) {
                    extender[direction.transition] = offset + 'px';
                    animate(element, extend(extender, properties), options);
                } else {
                    extender[direction.property] = offset + 'px';
                    animate(element, extend(extender, properties), options);
                }
            }
        },
        shrinkVertical: {
            play: function(element, properties, options) {
                if (!element.data('height'))
                    element.data({
                        height: element.outerHeight(),
                        overflow: element.css('overflow')
                    });
                animate(element, extend({ height: 0 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ height: element.data('height') + 'px' }, properties), extend(options, { teardown: function () { element.css('overflow', element.data('overflow')) } }) );
            }
        },
        shrinkHorizontal: {
            play: function(element, properties, options) {
                if (!element.data('width'))
                    element.data({
                        width: element.outerWidth(),
                        overflow: element.css('overflow')
                    });
                animate(element, extend({ width: 0 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ width: element.data('width') + 'px' }, properties), extend(options, { teardown: function () { element.css('overflow', element.data('overflow')) } }) );
            }
        },
        expandVertical: {
            play: function(element, properties, options) {
                if (!element.data('overflow'))
                    element.data('overflow', element.css('overflow'));

                element
                    .css('overflow', 'hidden')
                    .css('overflow');

                var fixedHeight = parseInt(element.data('initialHeight'), 10),
                    height = fixedHeight || Math.round(element.height("auto").height());

                element
                    .css({ height: 0 })
                    .css('height');

                animate(element, extend({ height: height + 'px' }, properties), extend(options, { teardown: function () {
                    element.css('overflow', element.data('overflow'));

                    var height = element.data('initialHeight');
                    if (height == "auto" || height === "") {
                        if ($.browser.webkit)
                            element.css(kendo.support.transitions.css + 'transition', 'none'); // Force WebKit to stop transitions.
                        setTimeout(function () { element.css("height", "auto") }, 0);
                    }
                } }));
            },
            reverse: function(element, properties, options) {
                if (!element.data('overflow'))
                    element.data('overflow', element.css('overflow'));

                element
                    .css('overflow', 'hidden')
                    .css('overflow');

                animate(element, extend({ height: 0 }, properties), extend(options, { teardown: function () {
                    element.css('overflow', element.data('overflow'));

                    var height = element.data('initialHeight');
                    if (height == "auto" || height === "") {
                        if ($.browser.webkit)
                            element.css(kendo.support.transitions.css + 'transition', 'none');
                        setTimeout(function () { element.css("height", "auto") }, 0);
                    }
                } }));
            }
        },
        expandHorizontal: {
            play: function(element, properties, options) {
                if (!element.data('overflow'))
                    element.data('overflow', element.css('overflow'));

                element
                    .css('overflow', 'hidden')
                    .css('overflow');

                var fixedWidth = parseInt(element[0].style.width, 10),
                    width = fixedWidth || Math.round(element.width("auto").width());

                element
                    .css({ width: 0 })
                    .css('width');

                animate(element, extend({ width: width + 'px' }, properties), extend(options, { teardown: function () { element.css('overflow', element.data('overflow')) } }));
            },
            reverse: function(element, properties, options) {
                if (!element.data('overflow'))
                    element.data('overflow', element.css('overflow'));

                element.css('overflow', 'hidden');

                animate(element, extend({ width: 0 }, properties), extend({ teardown: function () { element.css('overflow', element.data('overflow')) } }, options));
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
})(jQuery, window);
