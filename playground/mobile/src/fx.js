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

            aObject.css($.getCssPrefix() + 'transition', 'none');

            aObject.css(cssValues);

        } else
            aObject.css($.getCssPrefix() + 'transition', 'none');

        aObject.dequeue();
    };

    $.fn.extend({
        timeline: {},

        animate: function(properties, duration, ease, callback) {
            duration = duration / 1000;

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
            animationStep.setup[$.getCssPrefix() + 'transition'] = 'all ' + (duration !== undefined ? duration : 0.5) + 's ' + (ease || '');

            cssValues[$.getCssPrefix() + 'transform'] = transforms.join(' ');

            animationStep.keys = this.keys(cssValues);
            animationStep.CSS = cssValues;
            animationStep.object = this;

            if (this.queue(animationStep) == 1)
                this.activateTask();

            return this;
        },

        activateTask: function() {

            if (this.selector in this.timeline && this.timeline[this.selector].length) {
                var currentTransition = this.timeline[this.selector][0];

                if (currentTransition.type == 'delay') {
                    var that = this;

                    setTimeout(function () {
                        that.advanceQueue();
                    }, currentTransition.duration);

                    return;
                }

                var eventName = $.getEventPrefix() + 'TransitionEnd';
                if (!$.getEventPrefix())
                    eventName = eventName.toLowerCase();

                typeof currentTransition.callback == 'function' && currentTransition.object.one(eventName, $.proxy(currentTransition.callback, this));
                currentTransition.object.one(eventName, $.proxy(this.advanceQueue, this));

                currentTransition.object.css(currentTransition.setup);

                setTimeout(function () {
                    currentTransition.object.css(currentTransition.CSS);
                }, 0); // Opera Mobile is one dumb animal
            }

        },

        advanceQueue: function() {
            this.dequeue();

            this.activateTask();
        },

        clearQueue: function() {
            delete this.timeline[this.selector];
        },

        queue: function(step) {
            if (!(this.selector in this.timeline))
                this.timeline[this.selector] = [];

            this.timeline[this.selector].push(step);

            return this.timeline[this.selector].length;
        },

        dequeue: function() {
            if (!this.timeline[this.selector]) return;

            this.timeline[this.selector].shift();

            if (this.timeline[this.selector] == [])
                delete this.timeline[this.selector];
        },

        delay: function(timeSpan) {
            var animationStep = {};

            animationStep.type = 'delay';
            animationStep.duration = timeSpan;
            animationStep.object = this;

            if (this.queue(animationStep) == 1)
                this.activateTask();

            return this;
        },

        stop: function(clearQueue, gotoEnd) {

            if (this.selector in this.timeline)
                stopTransition(this.timeline[this.selector][0], gotoEnd);

            if (clearQueue)
                this.clearQueue();

            return this;
        },

        stopAll: function(clearQueue, gotoEnd) {

            for (var idx in this.timeline) {
                if (idx in this.timeline)
                    stopTransition(this.timeline[idx][0], gotoEnd);

                if (clearQueue && this.timeline[idx].length)
                    this.timeline[idx][0].object.clearQueue();

                if (!clearQueue && this.timeline[idx].length)
                    this.timeline[idx][0].object.activateTask();
            }

            return this;
        },

        fadeTo: function(duration, opacity) {
            this.animate({ 'opacity': opacity }, duration);
        }
    });

})(Zepto);
