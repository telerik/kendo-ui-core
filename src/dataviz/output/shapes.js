(function () {

    // Constants ==============================================================
    var CHANGE = "change";

    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        append = dataviz.append,

        geometry = dataviz.geometry,
        Point = geometry.Point,

        util = dataviz.util,
        rad = util.rad;

    // Drawing primitives =====================================================
    var Group = ObservableObject.extend({
        init: function() {
            this.children = [];
            ObservableObject.fn.init.call(this, this);
        },

        append: function() {
            append(this.children, arguments);
        }
    });

    var Shape = ObservableObject.extend({
        init: function(options) {
            this.options = options || {};
            ObservableObject.fn.init.call(this, this);
        },

        fill: function(color, opacity) {
            this.options.set("fill", {
               color: color,
               opacity: opacity || 1
            });

            return this;
        },

        stroke: function(color, width, opacity) {
            this.options.set("stroke", {
               color: color,
               width: width || 1,
               opacity: opacity || 1
            });

            return this;
        }
    });

    var Text = Shape.extend({
        init: function(content, options) {
            var text = this;
            text.content = content;

            Shape.fn.init.call(text, options);
        }
    });

    var Circle = Shape.extend({
        init: function(geometry, options) {
            var circle = this;
            Shape.fn.init.call(circle, options);

            circle.geometry = geometry || new geometry.Circle();
        }
    });

    var Segment = ObservableObject.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this;

            segment.anchor = anchor || new Point();
            segment.controlIn = controlIn || new Point();
            segment.controlOut = controlOut || new Point();

            ObservableObject.fn.init.call(segment, segment);
        }
    });

    var Path = Shape.extend({
        init: function(options) {
            var path = this;
            path.segments = [];

            Shape.fn.init.call(path, this);
        },

        moveTo: function(x, y) {
            this.segments.empty();
            this.lineTo(x, y);
        },

        lineTo: function(x, y) {
            this.segments.push(
                new Segment(new Point(x, y))
            );
        }
    });

    var MultiPath = Shape.extend({
        init: function(options) {
            this.paths = [];
            Shape.fn.init.call(this, this);
        },

        moveTo: function(x, y) {
            var path = new Path();
            this.paths.push(path);

            path.moveTo(x, y);
        },

        lineTo: function(x, y) {
            dataviz.last(this.paths).lineTo(x, y);
        }
    });

    // Sector
    // Ring

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            Group: Group,
            Shape: Shape,

            Circle: Circle,
            Path: Path,
            MultiPath: MultiPath,
            Segment: Segment,
            Text: Text
        }
    });

})(window.kendo.jQuery);
