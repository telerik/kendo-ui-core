(function () {

    // Imports ================================================================
    var math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        deepExtend = kendo.deepExtend

        dataviz = kendo.dataviz,
        append = dataviz.append;

    // Graphical primitives ===================================================
    var Group = ObservableObject.extend({
        init: function() {
            this.children = [];
            this.options = {};
            ObservableObject.fn.init.call(this, this);
        },

        append: function() {
            append(this.children, arguments);
        }
        // traverse
        // etc.
    });

    var Point = ObservableObject.extend({
        init: function(x, y) {
            var point = this;

            point.x = x || 0;
            point.y = y || 0;

            // Intentionally skip ObservableObject init
            // to avoid unnecessary wrapping
            Observable.fn.init.call(point, this);
        },

        rotate: function(center, degrees) {
            var point = this,
                theta = degrees * DEG_TO_RAD,
                cosT = math.cos(theta),
                sinT = math.sin(theta),
                cx = center.x,
                cy = center.y,
                x = point.x,
                y = point.y;

            point.x = cx + (x - cx) * cosT + (y - cy) * sinT;
            point.y = cy + (y - cy) * cosT - (x - cx) * sinT;

            point.trigger("change");

            return point;
        }
    });

    Path = ObservableObject.extend({
        init: function(points, options) {
            var path = this;

            path.points = points || [];
            path.options = options || {};

            ObservableObject.fn.init.call(path, this);
        }
    });


    // Exports ================================================================
    deepExtend(dataviz, {
        Group: Group,
        Path: Path,
        Point: Point
    });

})(window.kendo.jQuery);
