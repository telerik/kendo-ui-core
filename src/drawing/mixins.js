(function(f, define){
    define([ "./core" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        defined = kendo.util.defined;

    // Mixins =================================================================
    var Paintable = {
        extend: function(proto) {
            proto.fill = this.fill;
            proto.stroke = this.stroke;
        },

        fill: function(color, opacity) {
            if (defined(color)) {
                this.options.set("fill.color", color);

                if (defined(opacity)) {
                    this.options.set("fill.opacity", opacity);
                }

                return this;
            } else {
                return this.options.get("fill");
            }
        },

        stroke: function(color, width, opacity) {
            if (defined(color)) {
                this.options.set("stroke.color", color);

                if (defined(width)) {
                   this.options.set("stroke.width", width);
                }

                if (defined(opacity)) {
                   this.options.set("stroke.opacity", opacity);
                }

                return this;
            } else {
                return this.options.get("stroke");
            }
        }
    };

    var Traversable = {
        extend: function(proto, childrenField) {
            proto.traverse = function(callback) {
                var children = this[childrenField];

                for (var i = 0; i < children.length; i++) {
                    var child = children[i];

                    if (child.traverse) {
                        child.traverse(callback);
                    } else {
                        callback(child);
                    }
                }

                return this;
            };
        }
    };

    // Exports ================================================================
    deepExtend(kendo.drawing, {
        mixins: {
            Paintable: Paintable,
            Traversable: Traversable
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
