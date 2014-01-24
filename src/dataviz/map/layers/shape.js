(function(f, define){
    define(["./base", "../location",
            "../../geometry", "../../drawing/shapes",
            "../../../kendo.data", "../../../kendo.draganddrop" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        last = dataviz.last,

        g = dataviz.geometry,

        d = dataviz.drawing,
        Group = d.Group,

        map = dataviz.map,
        Location = map.Location,
        Layer = map.layers.Layer;

    // Implementation =========================================================
    var ShapeLayer = Layer.extend({
        init: function(map, options) {
            Layer.fn.init.call(this, map, options);

            this.surface = d.Surface.create(this.element[0], {
                width: map.scrollElement.width(),
                height: map.scrollElement.height()
            });

            this.movable = new kendo.ui.Movable(this.surface.element);
            this._markers = [];

            this._click = this._handler("shapeClick");
            this.surface.bind("click", this._click);

            this._mouseenter = this._handler("shapeMouseEnter");
            this.surface.bind("mouseenter", this._mouseenter);

            this._mouseleave = this._handler("shapeMouseLeave");
            this.surface.bind("mouseleave", this._mouseleave);

            this._loader = new GeoJSONLoader(this.map, this.options.style, this);
            this._initDataSource();
        },

        options: {
            autoBind: true,
            dataSource: {}
        },

        destroy: function() {
            Layer.fn.destroy.call(this);

            this.surface.destroy();
            this.dataSource.unbind("change", this._dataChange);
        },

        reset: function() {
            this._position();
            if (this._data) {
                this._load(this._data);
            }
        },

        polygon: function(coords, style) {
            this.surface.draw(this._buildPolygon(coords, style));
        },

        _resize: function() {
            this.surface.setSize(
                this.map.getSize()
            );
        },

        _activate: function() {
            Layer.fn._activate.call(this);

            if (!this._panEnd) {
                this._panEnd = proxy(this._position, this);
            }

            this.map.bind("panEnd", this._panEnd);
        },

        _deactivate: function() {
            Layer.fn._deactivate.call(this);

            this.map.unbind("panEnd", this._panEnd);
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
            this._clearMarkers();
            this.surface.clear();

            for (var i = 0; i < data.length; i++) {
                var shape = this._loader.parse(data[i]);
                if (shape) {
                    this.surface.draw(shape);
                }
            }
        },

        shapeCreated: function(shape) {
            var cancelled = false;
            if (shape instanceof d.Circle) {
                cancelled = !this._createMarker(shape);
            }

            if (!cancelled) {
                var args = { layer: this, shape: shape };
                cancelled = this.map.trigger("shapeCreated", args);
            }

            return cancelled;
        },

        _createMarker: function(shape) {
            var dataItem = shape.dataItem;
            var marker = map.Marker.create({
               location: shape.location.toArray()
            }, this.map.options.markerDefaults);
            marker.dataItem = dataItem;

            var args = { marker: marker };
            var cancelled = this.map.trigger("markerCreated", args);
            if (!cancelled) {
                this.map.markers.add(marker);
                this._markers.push(marker);
            }

            return cancelled;
        },

        _clearMarkers: function() {
            for (var i = 0; i < this._markers.length; i++) {
                this.map.markers.remove(this._markers[i]);
            }
            this._markers = [];
        },

        _position: function() {
            var map = this.map;
            var nw = map.locationToView(map.extent().nw);

            if (this.surface.translate) {
                this.surface.translate(nw);
                this.movable.moveTo(nw);
            }
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

            if (root.children.length < 2) {
                root = root.children[0];
            }

            return root;
        },

        _shapeCreated: function(shape) {
            var cancelled = false;

            if (this.observer && this.observer.shapeCreated) {
                cancelled = this.observer.shapeCreated(shape);
            }

            return cancelled;
        },

        _loadGeometryTo: function(container, geometry, dataItem) {
            var coords = geometry.coordinates;
            var i;
            var path;

            switch(geometry.type) {
                case "LineString":
                    path = this._loadPolygon(container, [coords], dataItem);
                    this._setLineFill(path);
                    break;

                case "MultiLineString":
                    for (i = 0; i < coords.length; i++) {
                        path = this._loadPolygon(container, [coords[i]], dataItem);
                        this._setLineFill(path);
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
                    this._loadPoint(container, coords, dataItem);
                    break;

                case "MultiPoint":
                    for (i = 0; i < coords.length; i++) {
                        this._loadPoint(container, coords[i], dataItem);
                    }
                    break;
            }
        },

        _setLineFill: function(path) {
            var segments = path.segments;
            if (segments.length < 4 || !segments[0].anchor.equals(last(segments).anchor)) {
                path.options.fill = null;
            }
        },

        _loadShape: function(container, shape) {
            if (!this._shapeCreated(shape)) {
                container.append(shape);
            }

            return shape;
        },

        _loadPolygon: function(container, rings, dataItem) {
            var shape = this._buildPolygon(rings);
            shape.dataItem = dataItem;

            return this._loadShape(container, shape);
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

        _loadPoint: function(container, coords, dataItem) {
            var location = Location.fromLngLat(coords);
            var point = this.locator.locationToView(location);

            var circle = new g.Circle(point, 10);
            var shape = new d.Circle(circle, this.style);
            shape.dataItem = dataItem;
            shape.location = location;

            return this._loadShape(container, shape);
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

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
