(function ($, undefined) {
    // Imports ================================================================
    var PRECISION = 4;

    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        d = dataviz.drawing,

        util = dataviz.util,
        round = util.round,

        map = dataviz.map,
        Location = map.Location;

    // Constants ==============================================================
    var ShapeLayer = Class.extend({
        init: function(map, options) {
            var layer = this;

            options = deepExtend({}, options, {
                width: map.element.width(),
                height: map.element.height()
            });

            this._initOptions(options);
            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            ).css("width", options.width).css("height", options.height);

            layer.map = map;
            layer.surface = new d.svg.Surface(this.element[0], options); // TODO: Automatic choice
            layer.movable = new kendo.ui.Movable(layer.element);

            map.bind("reset", proxy(layer.reset, layer));
            map.bind("drag", proxy(layer._drag, layer));

            if (layer.options.url) {
                $.getJSON(layer.options.url, proxy(layer.load, layer));
            }
        },

        polygon: function(coords, style) {
            style = deepExtend({
                stroke: { width: 0.1, color: "black" },
                _fill: { color: "red", opacity: 0.5 }
            }, style);

            for (var i = 0; i < coords.length; i++) {
                var ring = coords[i];
                var ringPoints = [];

                var path = new d.Path(style);

                for (var j = 0; j < ring.length; j++) {
                    var point = ring[j];
                    var l = Location.fromLngLat(point);
                    var p = this.map.layerPoint(l);

                    path.lineTo(round(p.x, PRECISION), round(p.y, PRECISION));
                }

                this.surface.draw(path);
            }

            return path;
        },

        load: function(data) {
            this._data = data;

            if (data.type == "FeatureCollection") {
                var items = data.features;

                for (var i = 0; i < items.length; i++) {
                    var feature = items[i];
                    if (feature.geometry) {
                        this._draw(feature.geometry, feature.properties);
                    }
                }
            }
        },

        _draw: function(geometry) {
            var coords = geometry.coordinates;
            if (geometry.type === "Polygon") {
                this.polygon(coords);
            } else if (geometry.type === "MultiPolygon") {
                for (var i = 0; i < coords.length; i++) {
                    this.polygon(coords[i]);
                }
            }
        },

        reset: function() {
            if (this._data) {
                this.surface.clear();
                this.load(this._data);
            }
        },

        _drag: function() {
            var scroller = this.map.scroller;
            var offset = { x: scroller.scrollLeft, y: scroller.scrollTop };
            var element = this.element;

            // TODO: Viewport info
            var width = this.element.width();
            var height = this.element.height();

            this.movable.moveTo(offset);
            var viewBox = kendo.format("{0} {1} {2} {3}",
                                       offset.x, offset.y, width, height);

            $("svg", element)[0].setAttribute("viewBox", viewBox);
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                shape: ShapeLayer,
                ShapeLayer: ShapeLayer
            }
        }
    });

})(window.kendo.jQuery);
