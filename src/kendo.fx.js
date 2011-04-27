(function($) {

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

            aObject.css(support.transitions.css + 'transition', 'none');

            aObject.css(cssValues);

        } else
            aObject.css(support.transitions.css + 'transition', 'none');

        if (selection.callback)
            selection.callback.call(aObject);

        aObject.dequeueTransform();
    };

    $.fn.extend({
        timeline: {},

        animateTransform: function(properties, duration, ease, callback, exclusive) {
            duration = duration !== undefined ? (duration < 1 ? duration : duration / 1000) : 0.5;
            if (typeof callback !== 'function') {
                exclusive = callback;
                callback = undefined;
            }

            var transforms = [], cssValues = {}, key, animationStep = {},
                transformProps = ['perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY', 'translateZ', 'translate3d', 'matrix', 'matrix3d'];
            for (key in properties)
                if (transformProps.indexOf(key) != -1)
                    transforms.push(key + '(' + properties[key] + ')');
                else
                    cssValues[key] = properties[key];

            animationStep.type = 'transition';
            animationStep.callback = callback;
            animationStep.setup = {};
            animationStep.setup[support.transitions.css + 'transition'] = (exclusive || 'all') + ' ' + duration + 's ' + (ease || '');

            if (transforms.length)
            cssValues[support.transitions.css + 'transform'] = transforms.join(' ');

            animationStep.keys = cssValues.keys;
            animationStep.CSS = cssValues;
            animationStep.object = this;

            if (this.queueTransform(animationStep) == 1)
                this.activateTransformTask();

            return this;
        },

        activateTransformTask: function() {

            if (this.selector in this.timeline && this.timeline[this.selector].length) {
                var currentTransition = this.timeline[this.selector][0];

                if (currentTransition.type == 'delay') {
                    var that = this;

                    setTimeout(function () {
                        that.advanceTransformQueue();
                    }, currentTransition.duration);

                    return;
                }

                var eventName = support.transitions.event + 'TransitionEnd';
                if (!support.transitions.event)
                    eventName = eventName.toLowerCase();

                typeof currentTransition.callback == 'function' && currentTransition.object.one(eventName, $.proxy(currentTransition.callback, this));
                currentTransition.object.one(eventName, $.proxy(this.advanceTransformQueue, this));

                currentTransition.object.css(currentTransition.setup);

                setTimeout(function () {
                    currentTransition.object.css(currentTransition.CSS);
                }, 0);
            }

        },

        advanceTransformQueue: function() {
            this.css(support.transitions.css + 'transition', 'none'); // remove any leftover transitions on advance
            this.dequeueTransform();

            this.activateTransformTask();
        },

        clearTransformQueue: function() {
            delete this.timeline[this.selector];
        },

        queueTransform: function(step) {
            if (!(this.selector in this.timeline))
                this.timeline[this.selector] = [];

            this.timeline[this.selector].push(step);

            return this.timeline[this.selector].length;
        },

        dequeueTransform: function() {
            if (!this.timeline[this.selector]) return;

            this.timeline[this.selector].shift();

            if (this.timeline[this.selector] == [])
                delete this.timeline[this.selector];
        },

        delayTransform: function(timeSpan) {
            var animationStep = {};

            animationStep.type = 'delay';
            animationStep.duration = timeSpan;
            animationStep.object = this;

            if (this.queueTransform(animationStep) == 1)
                this.activateTransformTask();

            return this;
        },

        stopTransform: function(clearQueue, gotoEnd) {

            if (this.selector in this.timeline)
                stopTransition(this.timeline[this.selector][0], gotoEnd);

            if (clearQueue)
                this.clearTransformQueue();

            return this;
        },

        stopAllTransforms: function(clearQueue, gotoEnd) {

            for (var idx in this.timeline) {
                if (idx in this.timeline)
                    stopTransition(this.timeline[idx][0], gotoEnd);

                if (clearQueue && this.timeline[idx].length)
                    this.timeline[idx][0].object.clearTransformQueue();

                if (!clearQueue && this.timeline[idx].length)
                    this.timeline[idx][0].object.activateTransformTask();
            }

            return this;
        },

        fadeTransform: function (duration, opacity) {
            this.animateTransform({ 'opacity': opacity }, duration, 'linear', 'opacity');

            return this;
        }
    });

})(jQuery);

(function($, window, undefined) {
    var kendo = window.kendo,
        extend = $.extend;

    function animate(element, properties, options, complete) {
        element.animate(properties,
            extend({
                    queue: false,
                    duration: "fast",
                    complete: complete
                },
                options
            )
        );
    }

    extend(kendo.fx, {
        fadeOut: {
            play: function(element, options, complete) {
                animate(element, { opacity: 0 }, options, complete);
            },
            reverse: function(element, options, complete) {
                animate(element, { opacity: 1 }, options, complete);
            }
        },
        fadeIn: {
            play: function(element, options, complete) {
                animate(element, { opacity: 1 }, options, complete);
            },
            reverse: function(element, options, complete) {
                animate(element, { opacity: 0 }, options, complete);
            }
        }

    });
})(jQuery, window);
