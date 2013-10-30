kendo_module({
    id: "dataviz.map",
    name: "Map",
    category: "dataviz",
    description: "The Kendo DataViz Map displays spatial data",
    depends: [ "data", "userevents", "dataviz.core", "dataviz.themes", "mobile.scroller" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,
        pow = math.pow,

        proxy = $.proxy,

        kendo = window.kendo,
        ObservableArray = kendo.data.ObservableArray,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        defined = dataviz.defined,

        g = dataviz.geometry,

        map = dataviz.map,
        Extent = map.Extent,
        Location = map.Location,
        EPSG3857 = map.crs.EPSG3857,

        util = dataviz.util,
        valueOrDefault = util.valueOrDefault,
        limit = util.limitValue;

    // Constants ==============================================================
    var CSS_PREFIX = "k-",
        FRICTION = 0.90,
        MOUSEWHEEL = "DOMMouseScroll mousewheel",
        VELOCITY_MULTIPLIER = 5;

    // Map widget =============================================================
    var Map = Widget.extend({
        init: function(element, options) {
            var map = this;

            kendo.destroy(element);
            Widget.fn.init.call(this, element);

            this._initOptions(options);

            this.element
                .addClass(CSS_PREFIX + this.options.name.toLowerCase())
                .css("position", "relative")
                .empty();

            this.bind(this.events, options);

            this.scrollWrap = $("<div />").appendTo(this.element);

            this.crs = new EPSG3857();
            this.layers = new ObservableArray([]);
            this._renderLayers();

            var scroller = this.scroller = new kendo.mobile.ui.Scroller(this.scrollWrap, {
                friction: FRICTION,
                velocityMultiplier: VELOCITY_MULTIPLIER,
                zoom: true
            });

            scroller.bind("scroll", proxy(this._scroll, this));
            scroller.bind("scrollEnd", proxy(this._scrollEnd, this));

            this._mousewheel = proxy(this._mousewheel, this);
            this.element.bind(MOUSEWHEEL, this._mousewheel);

            this._reset();
        },

        options: {
            name: "Map",
            layers: [],
            center: [0, 0],
            zoom: 3,
            minSize: 256,
            minZoom: 2,
            maxZoom: 18,
            layerDefaults: {
                shape: {
                    style: {
                        fill: {
                            color: "#fff"
                        },
                        stroke: {
                            color: "#aaa",
                            width: 0.5
                        }
                    }
                }
            }
        },

        events:[
            "click",
            "reset",
            "pan",
            "panEnd",
            "shapeClick",
            "shapeCreated",
            "shapeMouseEnter",
            "shapeMouseLeave",
            "zoomStart",
            "zoomEnd"
        ],

        destroy: function() {
            this.scroller.destroy();
            Widget.fn.destroy.call(this);
        },

        zoom: function(level) {
            var options = this.options;

            if (defined(level)) {
                options.zoom = limit(level, options.minZoom, options.maxZoom);
                this._reset();
                return this;
            } else {
                return options.zoom;
            }
        },

        center: function(center) {
            // TODO: Accept lat,lng array and Location
            if (center) {
                this._center = center;
                return this;
            } else {
                if (!this._center) {
                    this._center = Location.fromLatLng(this.options.center);
                }

                return this._center;
            }
        },

        origin: function(origin) {
            // TODO: Accept lat,lng array and Location
            if (origin) {
                this._origin = origin;
                return this;
            } else {
                if (!this._origin) {
                    var topLeft = this.toLayerPoint(this.center()).clone();
                    var size = this._viewportSize();

                    topLeft.x -= size.width / 2;
                    topLeft.y -= size.height / 2;

                    this._origin = this.layerPointToLocation(topLeft);
                }

                return this._origin;
            }
        },

        extent: function() {
            var nw = this.origin();
            var bottomRight = this.toLayerPoint(nw).clone();
            var size = this._viewportSize();

            bottomRight.x += size.width;
            bottomRight.y += size.height;

            var se = this.layerPointToLocation(bottomRight);
            return new Extent(nw, se);
        },

        scale: function(zoom) {
            zoom = valueOrDefault(zoom, this.options.zoom);
            return this.options.minSize * pow(2, zoom);
        },

        toLayerPoint: function(location, zoom) {
            return this.crs.toPoint(location, this.scale(zoom));
        },

        toViewPoint: function(location) {
            var origin = this.toLayerPoint(this._viewOrigin);
            var point = this.toLayerPoint(location);

            return point.subtract(origin);
        },

        screenPointToLocation: function(point) {
            var origin = this.toLayerPoint(this.origin());
            point = point.clone();
            point.x += origin.x;
            point.y += origin.y;
            return this.layerPointToLocation(point);
        },

        layerPointToLocation: function(point, zoom) {
            return this.crs.toLocation(point, this.scale(zoom));
        },

        _scroll: function(e) {
            var origin = this.toLayerPoint(this._viewOrigin);
            origin.x += e.scrollLeft;
            origin.y += e.scrollTop;

            this.origin(this.layerPointToLocation(origin));

            this.trigger("pan");
        },

        _scrollEnd: function() {
            this.trigger("panEnd");
        },

        _reset: function() {
            this._viewOrigin = this.origin();
            this._resetScroller();
            this.trigger("reset");
        },

        _resetScroller: function() {
            var scroller = this.scroller;

            scroller.reset();

            scroller.dimensions.y.makeVirtual();
            scroller.dimensions.x.makeVirtual();

            var nw = this.toLayerPoint(this.extent().nw);
            scroller.dimensions.x.virtualSize(-nw.x, this.scale() - nw.x);
            scroller.dimensions.y.virtualSize(-nw.y, this.scale() - nw.y);
        },

        _renderLayers: function() {
            var defs = this.options.layers,
                layers = this.layers = [],
                scrollWrap = this.scrollWrap;

            scrollWrap.empty();

            for (var i = 0; i < defs.length; i++) {
                var options = defs[i];
                var type = options.type || "shape";
                var defaults = this.options.layerDefaults[type];
                var impl = dataviz.map.layers[type];

                // TODO: Set layer size
                layers.push(new impl(this, deepExtend({}, defaults, options)));
            }
        },

        _mousewheel: function(e) {
            e.preventDefault();

            var delta = dataviz.mwDelta(e) > 0 ? -1 : 1;
            var options = this.options;
            var fromZoom = this.zoom();
            var toZoom = limit(fromZoom + delta, options.minZoom, options.maxZoom);

            if (toZoom !== fromZoom) {
                this.trigger("zoomStart");

                var cursor = new g.Point(e.offsetX, e.offsetY);
                var location = this.screenPointToLocation(cursor);
                var preZoom = this.toLayerPoint(location);
                var postZoom = this.toLayerPoint(location, toZoom);
                var diff = postZoom.subtract(preZoom);

                var origin = this.toLayerPoint(this.origin());
                origin.x += diff.x;
                origin.y += diff.y;
                var toOrigin = this.layerPointToLocation(origin, toZoom);

                this.origin(toOrigin);
                this.zoom(toZoom);

                this.trigger("zoomEnd");
            }
        },

        _viewportSize: function() {
            var element = this.element;
            var scale = this.scale();

            return {
                width: math.min(scale, element.width()),
                height: math.min(scale, element.height())
            };
        }
    });

    // Exports ================================================================
    dataviz.ui.plugin(Map);

})(window.kendo.jQuery);
