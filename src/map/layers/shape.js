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
    var ShapeLayer = Class.extend({
        init: function(map, options) {
            options = deepExtend({}, options, {
                width: map.element.width(),
                height: map.element.height()
            });

            this._initOptions(options);

            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            ).css("width", options.width).css("height", options.height);

            this.map = map;
            this.surface = new d.svg.Surface(this.element[0], options); // TODO: Automatic choice
            this.movable = new kendo.ui.Movable(this.element);

            map.bind("reset", proxy(this.reset, this));
            map.bind("dragEnd", proxy(this._dragEnd, this));

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

            var args = { layer: this, shape: shape, dataItem: dataItem };
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

        _dragEnd: function() {
            var map = this.map;
            var nw = map.toScreenPoint(map.viewport().nw);

            this.surface.translate(nw);
            this.movable.moveTo(nw);
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
