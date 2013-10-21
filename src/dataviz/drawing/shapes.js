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

        util = dataviz.util,
        rad = util.rad;

    // Drawing primitives =====================================================
    var Group = Class.extend({
        init: function() {
            var group = this;

            group.observer = null;
            group.children = [];
        },

        geometryChange: util.mixins.geometryChange,

        childrenChange: function(action, items, index) {
            if (this.observer) {
                this.observer.childrenChange({
                    action: action,
                    items: items,
                    index: index
                });
            }
        },

        append: function() {
            append(this.children, arguments);
            this.childrenChange("add", arguments);
        },

        empty: function() {
            var items = this.children;
            this.children = [];
            this.childrenChange("remove", items, 0);
        }
    });

    var Shape = Class.extend({
        init: function(options) {
            var shape = this;

            shape.observer = null;
            shape.options = new ObservableObject(options || {});
            shape.options.bind(CHANGE, function(e) {
                shape.optionsChange(e);
            });
        },

        geometryChange: util.mixins.geometryChange,

        optionsChange: function(e) {
            if (this.observer) {
                this.observer.optionsChange(e);
            }
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

    var Segment = Class.extend({
        init: function(anchor, controlIn, controlOut) {
            var segment = this;

            segment.anchor = anchor || new Point();
            segment.controlIn = controlIn || new Point();
            segment.controlOut = controlOut || new Point();

            segment.observer = null;
            segment.anchor.observer = this;
            segment.controlIn.observer = this;
            segment.controlOut.observer = this;
        },

        geometryChange: util.mixins.geometryChange,
    });

    var Path = Shape.extend({
        init: function(points, options) {
            var path = this;

            path.segments = [];

            path.observer = null;
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
            var segment = new Segment(new Point(x, y));
            segment.observer = this;

            this.segments.push(segment);
            this.geometryChange();
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
