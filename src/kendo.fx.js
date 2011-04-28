(function($, window, undefined) {
    var kendo = window.kendo,
        fx = kendo.fx,
        extend = $.extend;

    var animate = function (element, properties, options) {
        element.animate(properties, extend({ queue: false }, options));
    };

    if (kendo.support.transitions) {
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

            dequeue(aObject);
        };

        var transition = function(element, properties, options) {

            options = extend({
                    queue: true,
                    duration: 200,
                    ease: 'linear',
                    complete: null,
                    exclusive: 'all'
                },
                options
            );

            options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;
            options.duration = options.duration / 1000;

            if (!('timeline' in element))
                element.timeline = {};

            var transforms = [], cssValues = {}, key, animationStep = {},
                transformProps = ['perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'matrix', 'matrix3d'];
            for (key in properties)
                if (transformProps.indexOf(key) != -1)
                    transforms.push(key + '(' + properties[key] + ')');
                else
                    cssValues[key] = properties[key];

            animationStep.type = 'transition';
            animationStep.complete = options.complete;
            animationStep.setup = {};
            animationStep.setup[kendo.support.transitions.css + 'transition'] = (options.exclusive || 'all') + ' ' + options.duration + 's ' + (options.ease || '');

            if (transforms.length)
            cssValues[kendo.support.transitions.css + 'transform'] = transforms.join(' ');

            animationStep.keys = cssValues.keys;
            animationStep.CSS = cssValues;
            animationStep.object = element;

            if (!options.queue) {
                queue(element, animationStep);
                activateTask(element, !options.queue);
                return;
            }

            if (queue(element, animationStep) == 1)
                activateTask(element);
        };

        var activateTask = function(element, noqueue) {

            noqueue = typeof noqueue === 'boolean' ? noqueue : false;

            if (element.selector in element.timeline && element.timeline[element.selector].length) {
                var currentTransition = element.timeline[element.selector][0];

                if (currentTransition.type == 'delay') {
                    setTimeout(function () {
                        advanceQueue.call(element);
                    }, currentTransition.duration);

                    return;
                }

                var eventName = kendo.support.transitions.event + 'TransitionEnd';
                if (!kendo.support.transitions.event)
                    eventName = eventName.toLowerCase();

                typeof currentTransition.complete == 'function' && currentTransition.object.one(eventName, $.proxy(currentTransition.complete, element));
                currentTransition.object.one(eventName, $.proxy(advanceQueue, element));

                currentTransition.object.css(currentTransition.setup);

                setTimeout(function () {
                    currentTransition.object.css(currentTransition.CSS);
                }, 0);
            }

            if (noqueue)
                dequeue(element);

        };

        var advanceQueue = function() {
            this.css(kendo.support.transitions.css + 'transition', 'none'); // remove any leftover transitions on advance
            dequeue(this);

            activateTask(this);
        };

        var clearQueue = function(element) {
            delete element.timeline[element.selector];
        };

        var queue = function(element, step) {
            if (!(element.selector in element.timeline))
                element.timeline[element.selector] = [];

            element.timeline[element.selector].push(step);

            return element.timeline[element.selector].length;
        };

        var dequeue = function(element) {
            if (!element.timeline[element.selector]) return;

            element.timeline[element.selector].shift();

            if (element.timeline[element.selector] == [])
                delete element.timeline[element.selector];
        };

        var delay = function(element, timeSpan) {
            var animationStep = {};

            animationStep.type = 'delay';
            animationStep.duration = timeSpan;
            animationStep.object = element;

            if (queue(element, animationStep) == 1)
                activateTask(element);

            return this;
        };

        var stop = function(element, clear, gotoEnd) {

            if (element.selector in element.timeline)
                stopTransition(element.timeline[element.selector][0], gotoEnd);

            if (clear)
                clearQueue(element);

            return this;
        };

        var stopAll = function(element, clear, gotoEnd) {

            for (var idx in element.timeline) {
                if (idx in element.timeline)
                    stopTransition(this.timeline[idx][0], gotoEnd);

                if (clear && element.timeline[idx].length)
                    clearQueue(element.timeline[idx][0].object);

                if (!clear && element.timeline[idx].length)
                    activateTask(element.timeline[idx][0].object);
            }

            return this;
        };

        var fade = function (element, duration, opacity) {
            transition(element, { 'opacity': opacity }, { duration: duration, ease: 'linear', exclusive: 'opacity' });
        };

        animate = function (element, properties, options) {
            transition(element, properties, extend({ queue: false }, options));
        };
    }

    extend(fx, {
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
        }
    });
})(jQuery, window);
