(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        ViewFactory = dataviz.ViewFactory.current,
        deepExtend = kendo.deepExtend,

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

            layer.map = map;
            layer.view = ViewFactory.create(
                options, options.renderAs
            );

            this._initOptions(options);
            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            );

            layer.movable = new kendo.ui.Movable(layer.element);

            map.bind("reset", proxy(layer.reset, layer));
            map.bind("drag", proxy(layer._drag, layer));

            if (layer.options.url) {
                $.getJSON(layer.options.url, proxy(layer.load, layer));
            }
        },

        polygon: function(coords, style) {
            for (var i = 0; i < coords.length; i++) {
                var ring = coords[i];
                var ringPoints = [];

                for (var j = 0; j < ring.length; j++) {
                    var point = ring[j];
                    var l = Location.fromLngLat(point);
                    var p = this.map.layerPoint(l);

                    ringPoints.push(p);
                }

                var poly = this.view.createPolyline(ringPoints, true,
                    deepExtend({
                        stroke: "#ff0000",
                        strokeWidth: 1,
                        strokeOpacity: 1,
                        align: false
                }, style));

                this.view.children.push(poly);
            }
        },

        reset: function() {
            if (this._data) {
                this.view.children = [];
                this.load(this._data);
            }
        },

        _render: function() {
            this.view.renderTo(this.element[0]);
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

                this._render();
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

        _drag: function() {
            var scroller = this.map.scroller;
            var offset = { x: scroller.scrollLeft, y: scroller.scrollTop };
            var element = element;

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
