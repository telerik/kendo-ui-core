(function(f, define){
    define([ "../geometry/main", "./core" ], f);
})(function(){

(function ($, Math) {
    // Imports ================================================================
    var doc = document,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,
        util = kendo.util,

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

        setup: noop,
        step: noop,

        play: function() {
            var anim = this,
                options = anim.options,
                easing = $.easing[options.easing],
                duration = options.duration,
                delay = options.delay || 0,
                start = util.now() + delay,
                finish = start + duration;

            if (duration === 0) {
                anim.step(1);
                anim.abort();
            } else {
                setTimeout(function() {
                    var loop = function() {
                        if (anim._stopped) {
                            return;
                        }

                        var wallTime = util.now();

                        var time = util.limitValue(wallTime - start, 0, duration);
                        var pos = time / duration;
                        var easingPos = easing(pos, time, 0, 1, duration);

                        anim.step(easingPos);

                        if (wallTime < finish) {
                            animationFrame(loop);
                        } else {
                            anim.abort();
                        }
                    };

                    loop();
                }, delay);
            }
        },

        abort: function() {
            this._stopped = true;
        },

        destroy: function() {
            this.abort();
        }
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
                    if (items[i].name.toLowerCase() === type) {
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
