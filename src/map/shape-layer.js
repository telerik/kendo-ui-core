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
        Group = d.Group,

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

        load: function(data) {
            this._data = data;
            this.surface.clear();

            var group = new Group();
            if (data.type === "FeatureCollection") {
                for (var i = 0; i < data.features.length; i++) {
                    group.append(this._feature(data.features[i]));
                }
            }
            this.surface.draw(group);
        },

        reset: function() {
            if (this._data) {
                this.load(this._data);
            }
        },

        polygon: function(coords, style) {
            this.surface.draw(this._buildPolygon(coords, style));
        },

        _buildPolygon: function(coords, style) {
            style = deepExtend({
                stroke: { width: 1, color: "black" },
                fill: { color: "red", opacity: 0.5 }
            }, style);

            var path = coords.length > 1 ?
                new d.MultiPath(style) : new d.Path(style);

            for (var i = 0; i < coords.length; i++) {
                var ring = coords[i];
                var ringPoints = [];

                for (var j = 0; j < ring.length; j++) {
                    var point = ring[j];
                    var l = Location.fromLngLat(point);
                    var p = this.map.layerPoint(l);

                    if (j === 0) {
                        path.moveTo(p.x, p.y);
                    } else {
                        path.lineTo(p.x, p.y);
                    }
                }
            }

            return path;
        },

        _feature: function(feature) {
            var geometry = feature.geometry,
                shape;

            switch(geometry.type) {
                case "Polygon":
                    shape = this._buildPolygon(geometry.coordinates);
                    break;

                case "MultiPolygon":
                    var coords = geometry.coordinates,
                        i;

                    shape = new Group();
                    for (i = 0; i < coords.length; i++) {
                        shape.append(this._buildPolygon(coords[i]));
                    }
                    break;
            }

            return shape;
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
