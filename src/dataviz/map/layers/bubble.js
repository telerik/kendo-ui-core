(function(f, define){
    define([ ], f);
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
            locationField: "location",
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

            data = data.slice(0);
            data.sort(function(a, b) {
                return getValue(b) - getValue(a);
            });

            var maxValue = getValue(data[0]);
            var scaleType = this._scaleType();
            var scale;
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var location = getter(opt.locationField)(dataItem);
                var value = getter(opt.valueField)(dataItem);

                if (defined(location) && defined(value)) {
                    if (!scale) {
                        scale = new scaleType([0, value], [opt.minSize, opt.maxSize]);
                    }

                    location = Location.create(location);
                    var center = this.map.locationToView(location);
                    var size = scale.map(value);

                    var symbol = this._createSymbol({
                        center: center,
                        size: size,
                        style: opt.style,
                        dataItem: dataItem,
                        location: location
                    });

                    symbol.dataItem = dataItem;
                    symbol.location = location;
                    symbol.value = value;

                    this._drawSymbol(symbol);
                }
            }
        },

        _scaleType: function() {
            var scale = this.options.scale;

            if (kendo.isFunction(scale)) {
                return scale;
            }

            return dataviz.map.scales[scale];
        },

        _createSymbol: function(args) {
            var symbol = this.options.symbol;
            if (!kendo.isFunction(symbol)) {
                symbol = dataviz.map.symbols[symbol];
            }

            return symbol(args);
        },

        _drawSymbol: function(shape) {
            var args = { layer: this, shape: shape };
            var cancelled = this.map.trigger("shapeCreated", args);
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
        circle: function (args) {
            var geo = new g.Circle(args.center, args.size / 2);
            return new d.Circle(geo, args.style);
        },

        square: function(args) {
            var path = new d.Path(args.style);
            var halfSize = args.size / 2;
            var center = args.center;

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
