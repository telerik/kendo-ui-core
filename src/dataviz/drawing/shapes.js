(function () {

    // Constants ==============================================================
    var CHANGE = "change";

    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        append = dataviz.append,

        geometry = dataviz.geometry,
        Point = geometry.Point,

        drawing = dataviz.output,

        util = dataviz.util,
        rad = util.rad;

    // Drawing primitives =====================================================
    var Group = Observable.extend({
        init: function() {
            this.children = new ObservableArray([], Observable);
            Observable.fn.init.call(this);
        },

        append: function() {
            append(this.children, arguments);
        }
    });

    var Shape = Observable.extend({
        init: function(options) {
            this.options = new ObservableObject(options || {});
            Observable.fn.init.call(this);
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

    var Segment = Observable.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this,
                bubbleChange = function(e) {
                    segment.trigger("change");
                };

            segment.anchor = anchor || new Point();
            segment.controlIn = controlIn || new Point();
            segment.controlOut = controlOut || new Point();

            segment.anchor.bind("change", bubbleChange);
            segment.controlIn.bind("change", bubbleChange);
            segment.controlOut.bind("change", bubbleChange);

            Observable.fn.init.call(segment);
        }
    });

    var Path = Shape.extend({
        init: function(points, options) {
            var path = this;
            path.segments = new ObservableArray([], Segment);

            if (points) {
                for (var i = 0; i < points.length; i++) {
                    path.lineTo(points[i].x, points[i].y);
                }
            }

            Shape.fn.init.call(path, options);
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
