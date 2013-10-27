(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,

        kendo = window.kendo,
        Observable = kendo.Observable,
        DataSource = kendo.data.DataSource,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        d = dataviz.drawing,
        Group = d.Group,

        util = dataviz.util,
        round = util.round,

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
            map.bind("dragEnd", proxy(this._dragEnd, this));

            this._initDataSource();
        },

        events: [
            "shapeCreated"
        ],

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
            this.surface.clear();

            var container = new Group();

            for (var i = 0; i < data.length; i++) {
                var item = data[i];

                switch(item.type) {
                    case "Feature":
                        this._loadGeometryTo(container, item.geometry, item);
                        break;

                    default:
                        this._loadGeometryTo(container, item, item);
                        break;
                }
            }

            this.surface.draw(container);
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
            var viewport = this.map.viewport(),
                visible = false;

            for (var i = 0; i < rings.length; i++) {
                visible = visible || viewport.containsAny(rings[i]);
            }

            var shape = this._buildPolygon(rings);
            shape.visible(visible);

            var args = { shape: shape, dataItem: dataItem };
            if (!this.trigger("shapeCreated", args)) {
                container.append(shape)
            }
        },

        _buildPolygon: function(rings, style) {
            var style = style || this.options.style;

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

        _drag: function() {
            // TODO: Feature detection for surface viewBox
            // If not supported (e.g. canvas), do nothing

            var scroller = this.map.scroller;
            var offset = { x: scroller.scrollLeft, y: scroller.scrollTop };
            var element = this.element;

            // TODO: Viewport info
            var width = this.element.width();
            var height = this.element.height();

            this.movable.moveTo(offset);

            var viewBox = kendo.format("{0} {1} {2} {3}",
                                       round(offset.x, 4), round(offset.y, 4), width, height);

            $("svg", element)[0].setAttribute("viewBox", viewBox);
        },

        _dragEnd: function() {
            //console.log("drag end, reloading");
            //this.reset();
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
