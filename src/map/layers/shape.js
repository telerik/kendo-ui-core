(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        d = dataviz.drawing,
        Group = d.Group,

        map = dataviz.map,
        Location = map.Location;

    // Constants ==============================================================
    var DEFAULT_WIDTH = 600,
        DEFAULT_HEIGHT = 400;

    // Implementation =========================================================
    var ShapeLayer = Class.extend({
        init: function(map, options) {
            options = deepExtend({}, options, {
                width: map.element.width() || DEFAULT_WIDTH,
                height: map.element.height() || DEFAULT_HEIGHT
            });

            this._initOptions(options);
            this.map = map;

            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            ).css("width", options.width).css("height", options.height);
            this.movable = new kendo.ui.Movable(this.element);

            this.surface = new d.svg.Surface(this.element[0], options); // TODO: Automatic choice

            this._click = this._handler("shapeClick");
            this.surface.bind("click", this._click);

            this._mouseenter = this._handler("shapeMouseEnter");
            this.surface.bind("mouseenter", this._mouseenter);

            this._mouseleave = this._handler("shapeMouseLeave");
            this.surface.bind("mouseleave", this._mouseleave);

            map.bind("reset", proxy(this.reset, this));
            map.bind("panEnd", proxy(this._panEnd, this));

            this._initDataSource();
        },

        options: {
            autoBind: true,
            dataSource: {}
        },

        reset: function() {
            if (this._data) {
                this._load(this._data);
            }
        },

        polygon: function(coords, style) {
            this.surface.draw(this._buildPolygon(coords, style));
        },

        _initDataSource: function() {
            var dsOptions = this.options.dataSource;
            this._dataChange = proxy(this._dataChange, this);
            this.dataSource = DataSource
                .create(dsOptions)
                .bind("change", this._dataChange);

            if (dsOptions && this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        _dataChange: function(data) {
            this._load(data.items);
        },

        _load: function(data) {
            this._data = data;
            this.root = new Group();
            this.surface.clear();

            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                if (item.type === "Feature") {
                    this._loadGeometryTo(this.root, item.geometry, item);
                } else {
                    this._loadGeometryTo(this.root, item, item);
                }
            }

            this.surface.draw(this.root);
        },

        _loadGeometryTo: function(container, geometry, dataItem) {
            var coords = geometry.coordinates;

            switch(geometry.type) {
                case "MultiPolygon":
                    for (var i = 0; i < coords.length; i++) {
                        this._loadPolygon(container, coords[i], dataItem);
                    }
                    break;

                case "Polygon":
                    this._loadPolygon(container, coords, dataItem);
                    break;
            }
        },

        _loadPolygon: function(container, rings, dataItem) {
            var shape = this._buildPolygon(rings);
            shape.dataItem = dataItem;

            var args = { layer: this, shape: shape };
            if (!this.map.trigger("shapeCreated", args)) {
                container.append(shape);
            }
        },

        _buildPolygon: function(rings, style) {
            style = style || this.options.style;
            var path = rings.length > 1 ?
                new d.MultiPath(style) : new d.Path(style);

            for (var i = 0; i < rings.length; i++) {
                for (var j = 0; j < rings[i].length; j++) {
                    var point = this.map.toScreenPoint(
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

        _panEnd: function() {
            var map = this.map;
            var nw = map.toScreenPoint(map.viewport().nw);

            this.surface.translate(nw);
            this.movable.moveTo(nw);
        },

        _handler: function(event) {
            var layer = this;
            return function(e) {
                if (e.shape) {
                    var args = {
                        layer: layer,
                        shape: e.shape,
                        originalEvent: e.originalEvent
                    };

                    layer.map.trigger(event, args);
                }
            };
        }
    });

    // Exports ================================================================
    deepExtend(kendo.data, {
        schemas: {
            geojson: {
                type: "json",
                data: function(data) {
                    if (data.type === "FeatureCollection") {
                        return data.features;
                    }

                    return data;
                }
            }
        },
        transports: {
            geojson: {
                read: {
                    dataType: "json"
                }
            }
        }
    });

    deepExtend(dataviz, {
        map: {
            layers: {
                shape: ShapeLayer,
                ShapeLayer: ShapeLayer
            }
        }
    });

})(window.kendo.jQuery);
