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

        util = dataviz.util,
        defined = util.defined,
        isNumber = util.isNumber,

        g = dataviz.geometry,
        d = dataviz.drawing,

        map = dataviz.map,
        Location = map.Location,
        ShapeLayer = map.layers.ShapeLayer;

    var PI = Math.PI;

    // Implementation =========================================================
    var BubbleLayer = ShapeLayer.extend({
        options: {
            autoBind: true,
            latField: "lat",
            longField: "lng",
            valueField: "value",
            minSize: 0,
            maxSize: 100,
            scale: "sqrt",
            symbol: "circle"
        },

        _load: function(data) {
            if (data.length === 0) {
                return;
            }

            var opt = this.options;
            var getValue = getter(opt.valueField);

            var data = data.slice(0);
            data.sort(function(a, b) {
                return getValue(b) - getValue(a);
            });

            var maxValue = getValue(data[0]);
            var createSymbol = dataviz.map.symbols[opt.symbol];
            var scaleType = dataviz.map.scales[opt.scale];
            var scale;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var lat = getter(opt.latField)(dataItem);
                var lng = getter(opt.longField)(dataItem);
                var value = getter(opt.valueField)(dataItem);

                if (defined(lat) && defined(lng) && defined(value)) {
                    if (!scale) {
                        scale = new scaleType([0, value], [opt.minSize, opt.maxSize]);
                    }

                    var loc = new Location(lat, lng);
                    var center = this.map.locationToView(loc);
                    var size = scale.map(value);

                    var symbol = createSymbol(center, size, opt.style);
                    symbol.dataItem = dataItem;
                    symbol.location = loc;
                    symbol.value = value;

                    /*
                console.log(kendo.format(
                    "{0:N3} | {1} | {2}",
                    (Math.PI * (size / 2) * (size / 2)) / symbol.value,
                    size,
                    symbol.value
                ));
               */

                    this._drawSymbol(symbol);
                }
            }
        },

        _drawSymbol: function(shape) {
            var args = { layer: this, shape: shape };
            cancelled = this.map.trigger("shapeCreated", args);
            if (!cancelled) {
                this.surface.draw(shape);
            }
        }
    });

    var SqrtScale = kendo.Class.extend({
        init: function(domain, range) {
            this._domain = domain;
            this._range = range;

            var domainRange = Math.sqrt(domain[1]) - Math.sqrt(domain[0]);
            var outputRange = range[1] - range[0];
            this._ratio = outputRange / domainRange;
        },

        map: function(value) {
            var rel = (Math.sqrt(value) - Math.sqrt(this._domain[0])) * this._ratio;
            return this._range[0] + rel;
        }
    });

    var Symbols = {
        circle: function (center, size, style) {
            var geo = new g.Circle(center, size / 2);
            return new d.Circle(geo, style);
        },

        square: function(center, size, style) {
            var path = new d.Path(style);
            var halfSize = size / 2;

            path.moveTo(center.x - halfSize, center.y - halfSize)
                .lineTo(center.x + halfSize, center.y - halfSize)
                .lineTo(center.x + halfSize, center.y + halfSize)
                .lineTo(center.x - halfSize, center.y + halfSize)
                .close();

            return path;
        }
    };

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                bubble: BubbleLayer,
                BubbleLayer: BubbleLayer
            },
            scales: {
                sqrt: SqrtScale
            },
            symbols: Symbols
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
