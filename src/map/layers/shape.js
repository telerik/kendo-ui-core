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

            this.element = $("<div class='k-layer'></div>")
                .appendTo(map.scrollElement)
                .css("width", options.width)
                .css("height", options.height);

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

            this._loader = new GeoJSONLoader(this.map, this.options.style, this);
            this._initDataSource();
        },

        options: {
            autoBind: true,
            dataSource: {}
        },

        reset: function() {
            this.surface.translate({ x: 0, y: 0 });
            this.movable.moveTo({ x: 0, y: 0 });

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

        shapeCreated: function(shape) {
            var args = { layer: this, shape: shape };
            return this.map.trigger("shapeCreated", args);
        },

        markerCreated: function(location, dataItem) {
            var marker = new map.Marker(deepExtend(
                { location: location },
                this.map.options.markerDefaults
            ));
            marker.dataItem = dataItem;

            var args = { marker: marker };
            if (!this.map.trigger("markerCreated", args)) {
                this.map.markers.add(marker);
            }
        },

        _load: function(data) {
            this._data = data;
            this.surface.clear();

            for (var i = 0; i < data.length; i++) {
                var shape = this._loader.parse(data[i]);
                if (shape) {
                    this.surface.draw(shape);
                }
            }
        },

        _panEnd: function() {
            var map = this.map;
            var nw = map.locationToView(map.extent().nw);

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

    var GeoJSONLoader = Class.extend({
        init: function(locator, defaultStyle, observer) {
            this.observer = observer;
            this.locator = locator;
            this.style = defaultStyle;
        },

        parse: function(item) {
            var root = new Group();

            if (item.type === "Feature") {
                this._loadGeometryTo(root, item.geometry, item);
            } else {
                this._loadGeometryTo(root, item, item);
            }

            if (root.children.length === 1) {
                root = root.children[0];
            }

            return root;
        },

        _shapeCreated: function(shape) {
            if (this.observer) {
                return this.observer.shapeCreated(shape);
            }

            // Cancelled: false
            return false;
        },

        _markerCreated: function(location, dataItem) {
            if (this.observer) {
                this.observer.markerCreated(location, dataItem);
            }
        },

        _loadGeometryTo: function(container, geometry, dataItem) {
            var coords = geometry.coordinates;
            var i;
            var path;

            switch(geometry.type) {
                case "LineString":
                    path = this._loadPolygon(container, [coords], dataItem);
                    path.options.fill = null;
                    break;

                case "MultiLineString":
                    for (i = 0; i < coords.length; i++) {
                        path = this._loadPolygon(container, [coords[i]], dataItem);
                        path.options.fill = null;
                    }
                    break;

                case "Polygon":
                    this._loadPolygon(container, coords, dataItem);
                    break;

                case "MultiPolygon":
                    for (i = 0; i < coords.length; i++) {
                        this._loadPolygon(container, coords[i], dataItem);
                    }
                    break;

                case "Point":
                    this._loadPoint(coords, dataItem);
                    break;

                case "MultiPoint":
                    for (i = 0; i < coords.length; i++) {
                        this._loadPoint(coords[i], dataItem);
                    }
                    break;
            }
        },

        _loadPolygon: function(container, rings, dataItem) {
            var shape = this._buildPolygon(rings);
            shape.dataItem = dataItem;

            if (!this._shapeCreated(shape)) {
                container.append(shape);
            }

            return shape;
        },

        _buildPolygon: function(rings) {
            var type = rings.length > 1 ? d.MultiPath : d.Path;
            var path = new type(this.style);

            for (var i = 0; i < rings.length; i++) {
                for (var j = 0; j < rings[i].length; j++) {
                    var point = this.locator.locationToView(
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

        _loadPoint: function(coords, dataItem) {
            this._markerCreated(Location.fromLngLat(coords), dataItem);
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

                    if (data.type === "GeometryCollection") {
                        return data.geometries;
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
            },
            GeoJSONLoader: GeoJSONLoader
        }
    });

})(window.kendo.jQuery);
