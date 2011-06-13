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

        var checkTransition = function (transition) {

            if (transition) {
                var checkStyle = document.defaultView.getComputedStyle(transition.object[0], null);

                if (transition.complete &&
                    $.map(transition.keys, function(item) {
                        return checkStyle.getPropertyValue(item) != transition.startStyle[item] ? null : 1;
                    }).length) {
                        transition.complete.call(transition.object);
                        transition.object.css(kendo.support.transitions.css + 'transition', 'none');
                        transition.object.css(kendo.support.transitions.css + 'transition');
                        transition.object.unbind(kendo.support.transitions.event, kendo.fx.deQueue);
                }
            }
        };

        var activateTask = function(currentTransition) {
            var element = currentTransition.object;

            if (!currentTransition) return;

            typeof currentTransition.complete == 'function' && element.one(kendo.support.transitions.event, $.proxy(currentTransition.complete, element));

            var startStyle = document.defaultView.getComputedStyle(element[0], null),
                cssValues = {};

            element.css(currentTransition.setup);
            element.css(kendo.support.transitions.css + 'transition');

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

                var transforms = [], cssValues = {}, key;
                for (key in properties)
                    if (transformProps.indexOf(key) != -1)
                        transforms.push(key + '(' + properties[key] + ')');
                    else
                        cssValues[key] = properties[key];

                if (transforms.length)
                    cssValues[kendo.support.transitions.css + 'transform'] = transforms.join(' ');

                var currentTask = {
                    keys: keys(cssValues),
                    CSS: cssValues,
                    object: element,
                    setup: {},
                    duration: options.duration,
                    complete: options.complete
                };
                currentTask.setup[kendo.support.transitions.css + 'transition'] = options.exclusive + ' ' + options.duration + 'ms ' + options.ease;

                var oldKeys = element.data('keys') || [];
                $.merge(oldKeys, currentTask.keys);
                element.data('keys', $.unique(oldKeys));

                activateTask(currentTask);
            },

            deQueue: function() {
                var element = this.element;

                if (++this.eventNo == this.effectCount) { // ouch :(
                    if (element.data('abortId')) {
                        clearTimeout(element.data('abortId'));
                        element.removeData('abortId');
                    }
                    element.css(kendo.support.transitions.css + 'transition', 'none');
                    element.css(kendo.support.transitions.css + 'transition');
                    element.dequeue();
                }
            },

            stopQueue: function(element, clearQueue, gotoEnd) {

                var taskKeys = element.data('keys');
                if (gotoEnd === false && taskKeys) {
                    var style = document.defaultView.getComputedStyle(element[0], null),
                        cssValues = {},
                        prop = 0;

                    while (prop < taskKeys.length)
                        cssValues[taskKeys[prop]] = style.getPropertyValue(taskKeys[prop++]);

                    element.css(kendo.support.transitions.css + 'transition', 'none');
                    element.css(cssValues);

                    if (this.complete)
                        this.complete.call(element);

                } else
                    element.css(kendo.support.transitions.css + 'transition', 'none');

                element.css(kendo.support.transitions.css + 'transition');
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
        slideLeft: {
            play: function(element, properties, options) {
                animate(element, extend({ translate: -element.width() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translate: 0 }, properties), options);
            }
        },
        slideRight: {
            play: function(element, properties, options) {
                animate(element, extend({ translate: element.width() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translate: 0 }, properties), options);
            }
        },
        slideUp: {
            play: function(element, properties, options) {
                animate(element, extend({ translateY: -element.height() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translateY: 0 }, properties), options);
            }
        },
        slideDown: {
            play: function(element, properties, options) {
                animate(element, extend({ translateY: element.height() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translateY: 0 }, properties), options);
            }
        },
        slideRightIn: {
            play: function(element, properties, options) {
                if (kendo.support.transitions) {
                    element.css(kendo.support.transitions.css + 'transform', 'translate(' + (-element.outerWidth()) + 'px)');
                    element.css('left'); // Read a style to force Chrome to apply the change.
                    animate(element, extend({ translate: 0 }, properties), options);
                } else {
                    element.css('left', -element.outerWidth() + 'px');
                    animate(element, extend({ left: 0 }, properties), options);
                }
            },
            reverse: function(element, properties, options) {
                if (kendo.support.transitions)
                    animate(element, extend({ translate: (-element.outerWidth()) + 'px' }, properties), options);
                else
                    animate(element, extend({ left: -element.outerWidth() + 'px' }, properties), options);
            }
        },
        slideDownIn: {
            play: function(element, properties, options) {
                if (kendo.support.transitions) {
                    element.css(kendo.support.transitions.css + 'transform', 'translateY(' + (-element.outerHeight()) + 'px)');
                    element.css('top');
                    animate(element, extend({ translateY: 0 }, properties), options);
                } else {
                    element.css('top', -element.outerHeight() + 'px');
                    animate(element, extend({ top: 0 }, properties), options);
                }
            },
            reverse: function(element, properties, options) {
                if (kendo.support.transitions)
                    animate(element, extend({ translateY: (-element.outerHeight()) + 'px' }, properties), options);
                else
                    animate(element, extend({ top: -element.outerHeight() + 'px' }, properties), options);
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
                animate(element, extend({ height: element.data('height') + 'px' }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options) );
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
                animate(element, extend({ width: element.data('width') + 'px' }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options) );
            }
        },
        expandVertical: {
            play: function(element, properties, options) {
                var height = element.data('height'),
                    scrollHeight = element[0].scrollHeight + element.height() - element.innerHeight();

                if (!height || scrollHeight != Math.round(height)) {
                    var clone = element.clone(true);
                    element.css({
                        height: 0,
                        overflow: 'hidden'
                    });
                    element.css('height');

                    clone
                        .css({ position: 'absolute', height: 'auto', overflow: 'hidden', visibility: 'hidden', top: '-10000px', width: element.parent().innerWidth() })
                        .appendTo(element.parent());

                    height = clone.height();
                    clone.remove();

                    element.data({
                        height: height,
                        overflow: clone.css('overflow')
                    });
                }

                animate(element, extend({ height: height + 'px' }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options));
            },
            reverse: function(element, properties, options) {
                if (!element.data('height')) {
                    element.data({
                        height: element.height(),
                        overflow: element.css('overflow')
                    });

                    element.css({ overflow: 'hidden' });
                }

                animate(element, extend({ height: 0 }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options));
            }
        },
        expandHorizontal: {
            play: function(element, properties, options) {
                var width = element.data('width'),
                    scrollWidth = element[0].scrollWidth + element.width() - element.innerWidth();
                
                if (!width || scrollWidth != Math.round(width)) {
                    var clone = element.clone(true);
                    element.css({
                        width: 0,
                        overflow: 'hidden'
                    });

                    clone
                        .css({ position: 'absolute', width: '100%', overflow: 'hidden', visibility: 'hidden', top: '-10000px' })
                        .appendTo(element.parent());

                    width = clone.width();
                    clone.remove();

                    element.data({
                        width: width,
                        overflow: clone.css('overflow')
                    });
                }

                animate(element, extend({ width: width + 'px' }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options));
            },
            reverse: function(element, properties, options) {
                if (!element.data('width')) {
                    element.data({
                        width: element.width(),
                        overflow: element.css('overflow')
                    });

                    element.css({ overflow: 'hidden' });
                }

                animate(element, extend({ width: 0 }, properties), extend({ complete: function () { element.css('overflow', element.data('overflow')) } }, options));
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
