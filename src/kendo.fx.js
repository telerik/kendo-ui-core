(function($, window, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        extend = $.extend,
        scaleProperties = { scale: 0, scaleX: 0, scaleY: 0, scale3d: 0 },
        translateProperties = { translate: 0, translateX: 0, translateY: 0, translate3d: 0 },
        matrix3d = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1 ],
        transformNon3D = { rotate: '0, 0, 0, @@', scale: '@@, 1', translate: '@@, 0' },
        transformProps = ['perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'matrix', 'matrix3d'];

    if (kendo.support.transitions) {

        var keys = function (obj) {
            var acc = [];
            for (var propertyName in obj)
                acc.push(propertyName);
            return acc;
        };

        var stopTransition = function (selection, gotoEnd) {
            if (!selection || !('object' in selection)) return;

            var aObject = selection.object;

            if (!gotoEnd) {

                var animProperties = selection.keys;
                if (!animProperties) return;

                var style = document.defaultView.getComputedStyle(aObject[0], null),
                    cssValues = {},
                    prop;

                for (prop in animProperties)
                    cssValues[animProperties[prop]] = style.getPropertyValue(animProperties[prop]);

                aObject.css(kendo.support.transitions.css + 'transition', 'none');

                aObject.css(cssValues);

            } else
                aObject.css(kendo.support.transitions.css + 'transition', 'none');

            if (selection.complete)
                selection.complete.call(aObject);

            kendo.fx.dequeueTransition(aObject);
        };

        var abortTransitionIfStalled = function (transition) {

            if (transition) {
                var checkStyle = document.defaultView.getComputedStyle(transition.object[0], null);

                if (transition.complete &&
                    $.map(transition.keys, function(item) {
                        return checkStyle.getPropertyValue(item) != transition.startStyle[item] ? null : 1;
                    }).length) {
                        transition.complete.call(transition.object);

                        transition.object.css(kendo.support.transitions.css + 'transition', 'none'); // remove any leftover transitions in advance
                        kendo.fx.dequeueTransition(transition.object);
                }
            }
        };

        var activateTask = function(element, noqueue) {

            noqueue = typeof noqueue === 'boolean' ? noqueue : false;

            if (element.selector in element.timeline && element.timeline[element.selector].length) {
                var currentTransition = element.timeline[element.selector][0];

                if (currentTransition.type == 'delay') {
                    setTimeout(function () {
                        kendo.fx.advanceQueue.call(element);
                    }, currentTransition.duration);

                    return;
                }

                var eventName = kendo.support.transitions.event + 'TransitionEnd';
                if (!kendo.support.transitions.event)
                    eventName = eventName.toLowerCase();

                typeof currentTransition.complete == 'function' && currentTransition.object.one(eventName, $.proxy(currentTransition.complete, element));
                currentTransition.object.one(eventName, $.proxy(kendo.fx.advanceQueue, element));

                currentTransition.object.css(currentTransition.setup);

                var startStyle = document.defaultView.getComputedStyle(currentTransition.object[0], null),
                    cssValues = {};

                $.each(currentTransition.keys, function() {
                    cssValues[this] = startStyle.getPropertyValue(this);
                });
                currentTransition.startStyle = cssValues;

                setTimeout(function () {
                    currentTransition.object.css(currentTransition.CSS);
                    
                    setTimeout(function () {
                        abortTransitionIfStalled(currentTransition);
                    }, 50);
                }, 0);
            }

            if (noqueue)
                kendo.fx.dequeueTransition(currentTransition.object);

        };

        extend(kendo.fx, {
            transition: function(element, properties, options) {

                options = extend({
                        queue: true,
                        duration: 200,
                        ease: '',
                        complete: null,
                        exclusive: 'all'
                    },
                    options
                );

                options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;

                if (!('timeline' in element))
                    element.timeline = {};

                var transforms = [], cssValues = {}, key, animationStep = {};
                for (key in properties)
                    if (transformProps.indexOf(key) != -1)
                        transforms.push(key + '(' + properties[key] + ')');
                    else
                        cssValues[key] = properties[key];

                if (transforms.length)
                    cssValues[kendo.support.transitions.css + 'transform'] = transforms.join(' ');

                animationStep = {
                    type: 'transition',
                    keys: keys(cssValues),
                    CSS: cssValues,
                    object: element,
                    setup: {},
                    duration: options.duration,
                    complete: options.complete
                };
                animationStep.setup[kendo.support.transitions.css + 'transition'] = options.exclusive + ' ' + options.duration + 'ms ' + options.ease;

                if (!options.queue) {
                    kendo.fx.queueTransition(element, animationStep);
                    activateTask(element, !options.queue);
                    return;
                }

                if (kendo.fx.queueTransition(element, animationStep) == 1)
                    activateTask(element);
            },

            clearQueue: function(element) {
                delete element.timeline[element.selector];
            },

            advanceQueue: function() {
                this[0].style[kendo.support.transitions.property + 'Transition'] = 'none';
                kendo.fx.dequeueTransition(this);

                activateTask(this);
            },

            queueTransition: function(element, step) {
                if (!(element.selector in element.timeline))
                    element.timeline[element.selector] = [];

                element.timeline[element.selector].push(step);

                return element.timeline[element.selector].length;
            },

            dequeueTransition: function(element) {
                if (!element.timeline[element.selector]) return;

                element.timeline[element.selector].shift();

                if (element.timeline[element.selector] == [])
                    delete element.timeline[element.selector];
            },

            delay: function(element, timeSpan) {
                var animationStep = {};

                animationStep = {
                    type: 'delay',
                    duration: timeSpan,
                    object: element
                };

                if (kendo.fx.queueTransition(element, animationStep) == 1)
                    activateTask(element);

                return this;
            },

            stop: function(element, clear, gotoEnd) {

                if (element.selector in element.timeline)
                    stopTransition(element.timeline[element.selector][0], gotoEnd);

                if (clear)
                    kendo.fx.clearQueue(element);

                return this;
            },

            stopAll: function(element, clear, gotoEnd) {

                for (var idx in element.timeline) {
                    if (idx in element.timeline)
                        stopTransition(this.timeline[idx][0], gotoEnd);

                    if (clear && element.timeline[idx].length)
                        kendo.fx.clearQueue(element.timeline[idx][0].object);

                    if (!clear && element.timeline[idx].length)
                        activateTask(element.timeline[idx][0].object);
                }

                return this;
            }

        });

    }

    var animate = function (element, properties, options) {

        if (kendo.support.transitions && 'transition' in kendo.fx) {
            kendo.fx.transition(element, properties, extend({ queue: false }, options));
        } else {
            $.each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                var params = [];

                if (value in scaleProperties && properties[value]) {
                    !element.data('scale') && element.data('scale', {
                                top: element[0].offsetTop,
                                left: element[0].offsetLeft,
                                width: element.width(),
                                height: element.height()
                            });

                    var originalScale = element.data('scale');

                    params = properties[value].match(/^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i);
                    if (params) {
                        var scaleX = value == 'scaleY' ? +null : +params[1],
                            scaleY = value == 'scaleY' ? +params[1] : +params[2] || +params[1];

                        !isNaN(scaleX) && extend(properties, {
                                    left: originalScale.left + originalScale.left * (1-scaleX),
                                    width: originalScale.width * scaleX
                        });

                        !isNaN(scaleY) && extend(properties, {
                                    top: originalScale.top + originalScale.top * (1-scaleY),
                                    height: originalScale.height * scaleY
                                });
                    }
                } else
                    if (value in translateProperties && properties[value]) {
                        !element.data('translate') && element.data('translate', {
                                    top: element[0].offsetTop,
                                    left: element[0].offsetLeft
                                });

                        var originalPosition = element.data('translate');

                        params = properties[value].match(/^(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)?[\w\s]*/i);
                        if (params) {

                            var dX = value == 'translateY' ? +null : +params[1],
                                dY = value == 'translateY' ? +params[1] : +params[2];

                            !isNaN(dX) && extend(properties, { left: originalPosition.left + dX });
                            !isNaN(dY) && extend(properties, { top: originalPosition.top + dY });
                        }
                    }

                value in properties && delete properties[value];
            });

            element.animate(properties, extend({ queue: false }, options));
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
                element.css("opacity", 0);
                animate(element, extend({ opacity: 1 }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ opacity: 0 }, properties), options);
            }
        },
        zoomIn: {
            play: function(element, properties, options) {
                animate(element, extend({ scale: '1' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ scale: '0' }, properties), options);
            }
        },
        zoomOut: {
            play: function(element, properties, options) {
                animate(element, extend({ scale: '0' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ scale: '1' }, properties), options);
            }
        },
        slideLeft: {
            play: function(element, properties, options) {
                animate(element, extend({ translateX: -element.width() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translateX: '0' }, properties), options);
        }
        },
        slideRight: {
            play: function(element, properties, options) {
                animate(element, extend({ translateX: element.width() + 'px' }, properties), options);
            },
            reverse: function(element, properties, options) {
                animate(element, extend({ translateX: '0' }, properties), options);
            }
        }
    });
})(jQuery, window);
