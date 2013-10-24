(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Observable = kendo.Observable,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        d = dataviz.drawing,
        Group = d.Group,

        map = dataviz.map,
        Location = map.Location;

    // Constants ==============================================================
    var ShapeLayer = Observable.extend({
        init: function(map, options) {
            Observable.fn.init.call(this);

            options = deepExtend({}, options, {
                width: map.element.width(),
                height: map.element.height()
            });

            this._initOptions(options);
            this.bind(this.events, options);

            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            ).css("width", options.width).css("height", options.height);

            this.map = map;
            this.surface = new d.svg.Surface(this.element[0], options); // TODO: Automatic choice
            this.movable = new kendo.ui.Movable(this.element);

            map.bind("reset", proxy(this.reset, this));
            map.bind("drag", proxy(this._drag, this));

            if (this.options.url) {
                $.getJSON(this.options.url, proxy(this.load, this));
            }
        },

        events: [
            "shapeCreated"
        ],

        load: function(data) {
            this._data = data;
            this.surface.clear();

            var group = new Group();
            this._loadItem(data, group);

            if (group.children.length > 0) {
                this.surface.draw(group);
            }
        },

        reset: function() {
            if (this._data) {
                this.load(this._data);
            }
        },

        polygon: function(coords, style) {
            this.surface.draw(this._buildPolygon(coords, style));
        },

        _loadItem: function(item, container) {
            switch(item.type) {
                case "FeatureCollection":
                    for (var i = 0; i < item.features.length; i++) {
                        this._loadItem(item.features[i], container);
                    }
                    break;

                case "Feature":
                    this._loadGeometry(item.geometry, container, item);
                    break;

                default:
                    this._loadGeometry(item, container, item);
                    break;
            }
        },

        _loadGeometry: function(geometry, container, item) {
            var coords = geometry.coordinates;

            switch(geometry.type) {
                case "MultiPolygon":
                    for (var i = 0; i < coords.length; i++) {
                        this._loadPolygon(coords[i], container, item);
                    }
                    break;

                case "Polygon":
                    this._loadPolygon(coords, container, item);
                    break;
            }
        },

        _loadPolygon: function(rings, container, item) {
            var viewport = this.map.viewport(),
                visible = false;

            for (var i = 0; i < rings.length; i++) {
                visible = visible || viewport.containsAny(rings[i]);
            }

            if (visible) {
                var shape = this._buildPolygon(rings);
                this.trigger("shapeCreated", { shape: shape, dataItem: item });
                // TODO: Cancellable?

                container.append(shape);
            }
        },

        _buildPolygon: function(rings, style) {
            style = deepExtend({
                stroke: { width: 1, color: "black" },
                fill: { color: "red", opacity: 0.5 }
            }, style);

            var path = rings.length > 1 ?
                new d.MultiPath(style) : new d.Path(style);

            for (var i = 0; i < rings.length; i++) {
                for (var j = 0; j < rings[i].length; j++) {
                    var point = this.map.layerPoint(
                        Location.fromLngLat(rings[i][j])
                    );

                    if (j === 0) {
                        path.moveTo(point.x, point.y);
                    } else {
                        path.lineTo(point.x, point.y);
                    }
                }
            }

            return path;
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
