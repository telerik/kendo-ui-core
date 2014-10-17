(function(f, define){
    define([ "../geometry/main", "./core" ], f);
})(function(){

(function ($, Math) {

    // Imports ================================================================
    var doc = document,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,

        animationFrame = kendo.animationFrame,
        deepExtend = kendo.deepExtend;

    // Base element animation ================================================
    var Animation = Class.extend({
        init: function(element, options) {
            var anim = this;

            anim.options = deepExtend({}, anim.options, options);
            anim.element = element;
        },

        options: {
            duration: 500,
            easing: "swing"
        },

        play: function() {
            var anim = this,
                options = anim.options,
                element = anim.element,
                delay = options.delay || 0,
                start = +new Date() + delay,
                duration = options.duration,
                finish = start + duration,
                easing = $.easing[options.easing],
                wallTime,
                time,
                pos,
                easingPos;

            setTimeout(function() {
                var loop = function() {
                    if (anim._stopped) {
                        return;
                    }

                    wallTime = +new Date();
                    time = Math.min(wallTime - start, duration);
                    pos = time / duration;
                    easingPos = easing(pos, time, 0, 1, duration);

                    anim.step(easingPos);

                    if (wallTime < finish) {
                        animationFrame(loop);
                    } else {
                        anim.destroy();
                    }
                };

                loop();
            }, delay);
        },

        abort: function() {
            this._stopped = true;
        },

        destroy: function() {
            this.abort();
        },

        setup: noop,

        step: noop
    });

    // Animation factory =====================================================
    var AnimationFactory = function() {
        this._items = [];
    };

    AnimationFactory.prototype = {
        register: function(name, type) {
            this._items.push({
                name: name,
                type: type
            });
        },

        create: function(element, options) {
            var items = this._items;
            var match;

            if (options && options.type) {
                var type = options.type.toLowerCase();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name === type) {
                        match = items[i];
                        break;
                    }
                }
            }

            if (match) {
                return new match.type(element, options);
            }
        }
    };

    AnimationFactory.current = new AnimationFactory();

    Animation.create = function(type, element, options) {
        return AnimationFactory.current.create(type, element, options);
    };

    // Exports ================================================================
    deepExtend(kendo.drawing, {
        Animation: Animation,
        AnimationFactory: AnimationFactory
    });

})(window.kendo.jQuery, Math);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
