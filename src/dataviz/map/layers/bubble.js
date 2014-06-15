(function(f, define){
    define(["./shape" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        getter = kendo.getter,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        defined = dataviz.util.defined,
        isNumber = dataviz.util.isNumber,

        g = dataviz.geometry,
        d = dataviz.drawing,

        map = dataviz.map,
        Location = map.Location,
        ShapeLayer = map.layers.ShapeLayer;

    var PI = Math.PI;

    // Implementation =========================================================
    var BubbleLayer = ShapeLayer.extend({
        options: {
            latField: "lat",
            longField: "lng",
            valueField: "value",
            minSize: 10,
            maxSize: 100
        },

        _load: function(data) {
            var opt = this.options;
            var shape;
            var shapes = [];
            var maxValue = 0;

            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var lat = getter(opt.latField)(dataItem);
                var lng = getter(opt.longField)(dataItem);
                var value = getter(opt.valueField)(dataItem);

                if (defined(lat) && defined(lng) && defined(value)) {
                    var loc = new Location(lat, lng);
                    var point = this.map.locationToView(loc);

                    var circle = new g.Circle(point, 0);
                    shape = new d.Circle(circle, opt.style);
                    shape.dataItem = dataItem;
                    shape.location = loc;
                    shape.value = value;

                    maxValue = Math.max(value, maxValue);
                }

                shapes.push(shape);
            }

            shapes.sort(function(a, b) {
                return b.value - a.value;
            });

            var minR = opt.minSize / 2;
            var maxR = opt.maxSize / 2;
            var minArea = PI * minR * minR;
            var maxArea = PI * maxR * maxR;
            var areaRange = maxArea - minArea;
            var areaRatio = areaRange / maxValue;
            for (i = 0; i < shapes.length; i++) {
                var shape = shapes[i];
                var area = Math.abs(shape.value) * areaRatio;
                var r = Math.sqrt((minArea + area) / PI);

                shape.geometry.radius = r;

                var args = { layer: this, shape: shape };
                cancelled = this.map.trigger("shapeCreated", args);
                if (!cancelled) {
                    this.surface.draw(shape);
                }
            }
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                bubble: BubbleLayer,
                BubbleLayer: BubbleLayer
            }
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
