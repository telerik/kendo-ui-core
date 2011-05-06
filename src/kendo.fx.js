(function($, window, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        extend = $.extend,
        scaleProperties = { scale: 0, scaleX: 0, scaleY: 0, scale3d: 0 },
        translateProperties = { translate: 0, translateX: 0, translateY: 0, translate3d: 0 },
        matrix3d = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ],
        transformNon3D = { rotate: '', scale: '', translate: '' },
        transformProps = ['perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'matrix', 'matrix3d'],
        transitionEvent = kendo.support.transitions.event + 'TransitionEnd';

        if (!kendo.support.transitions.event)
            transitionEvent = transitionEvent.toLowerCase();

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
                        transition.object.unbind(transitionEvent, kendo.fx.deQueue);
                }
            }
        };

        var activateTask = function(currentTransition) {
            var element = currentTransition.object;

            if (!currentTransition) return;

            typeof currentTransition.complete == 'function' && element.one(transitionEvent, $.proxy(currentTransition.complete, element));

            var startStyle = document.defaultView.getComputedStyle(element[0], null),
                cssValues = {};

            element.css(currentTransition.setup);

            $.each(currentTransition.keys, function() {
                cssValues[this] = startStyle.getPropertyValue(this);
            });
            currentTransition.startStyle = cssValues;

            setTimeout(function () {
                element.css(currentTransition.CSS);

                element.data('abortId', setTimeout(function () {
                    checkTransition(currentTransition);
                }, 50));
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
                    element.css(kendo.support.transitions.css + 'transition', 'none');
                    clearTimeout(element.data('abortId'));
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

                element.removeData('keys');
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
                                    top: element.offset().top,
                                    left: element.offset().left,
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
                            !element.data('translate') && element.data('translate', {
                                        top: element.offset().top,
                                        left: element.offset().left
                                    });

                            var originalPosition = element.data('translate');

                            params = currentValue.match(/^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i);
                            if (params) {

                                var dX = value == 'translateY' ? +null : +params[1],
                                    dY = value == 'translateY' ? +params[1] : +params[2];

                                !isNaN(dX) && extend(single, { left: originalPosition.left + dX });
                                !isNaN(dY) && extend(single, { top: originalPosition.top + dY });
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
        }
    });
})(jQuery, window);
