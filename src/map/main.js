kendo_module({
    id: "dataviz.map",
    name: "Map",
    category: "dataviz",
    description: "The Kendo DataViz Map displays spatial data",
    depends: [ "data", "userevents", "tooltip", "dataviz.core", "dataviz.themes", "mobile.scroller" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        pow = math.pow,

        proxy = $.proxy,

        kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Compass = dataviz.ui.Compass,
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
            kendo.destroy(element);
            Widget.fn.init.call(this, element);

            this._initOptions(options);
            this.bind(this.events, options);

            this.crs = new EPSG3857();

            this.element
                .addClass(CSS_PREFIX + this.options.name.toLowerCase())
                .css("position", "relative")
                .empty()
                .append(doc.createElement("div"));

            this._viewOrigin = this.origin();
            this._initScroller();
            this._initLayers();
            this._initMarkers();
            this._initControls();
            this._reset();

            this._mousewheel = proxy(this._mousewheel, this);
            this.element.bind("click", proxy(this._click, this));
            this.element.bind(MOUSEWHEEL, this._mousewheel);
        },

        options: {
            name: "Map",
            controls: {
                navigator: {
                    panStep: 100
                }
            },
            layers: [],
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
            },
            center: [0, 0],
            zoom: 3,
            minSize: 256,
            minZoom: 1,
            maxZoom: 18,
            markers: [],
            markerDefaults: {
                shape: "pinTarget",
                tooltip: {
                    autoHide: false,
                    position: "top",
                    showOn: "click"
                }
            },
            wraparound: true
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
            if (center) {
                this._center = Location.create(center);
                this._origin = null;
                this._reset();

                return this;
            } else {
                if (!this._center) {
                    this._center = Location.create(this.options.center);
                }

                return this._center;
            }
        },

        origin: function(origin) {
            var size = this._viewportSize(),
                topLeft;

            if (origin) {
                origin = Location.create(origin);
                topLeft = this.locationToLayer(origin);
                topLeft.x += size.width / 2;
                topLeft.y += size.height / 2;

                this._origin = origin;
                this._center = this.layerToLocation(topLeft);

                return this;
            } else {
                if (!this._origin) {
                    topLeft = this.locationToLayer(this.center());
                    topLeft.x -= size.width / 2;
                    topLeft.y -= size.height / 2;

                    this._origin = this.layerToLocation(topLeft);
                }

                return this._origin;
            }
        },

        extent: function() {
            var nw = this.origin();
            var bottomRight = this.locationToLayer(nw);
            var size = this._viewportSize();

            bottomRight.x += size.width;
            bottomRight.y += size.height;

            var se = this.layerToLocation(bottomRight);
            return new Extent(nw, se);
        },

        scale: function(zoom) {
            zoom = valueOrDefault(zoom, this.options.zoom);
            return this.options.minSize * pow(2, zoom);
        },

        locationToLayer: function(location, zoom) {
            var clamp = !this.options.wraparound;
            location = Location.create(location);
            return this.crs.toPoint(location, this.scale(zoom), clamp);
        },

        layerToLocation: function(point, zoom) {
            var clamp = !this.options.wraparound;
            return  this.crs.toLocation(point, this.scale(zoom), clamp);
        },

        locationToView: function(location) {
            location = Location.create(location);
            var origin = this.locationToLayer(this._viewOrigin);
            var point = this.locationToLayer(location);

            return point.subtract(origin);
        },

        viewToLocation: function(point) {
            var origin = this.locationToLayer(this.origin());
            point = point.clone();
            point.x += origin.x;
            point.y += origin.y;
            return this.layerToLocation(point);
        },

        _initControls: function() {
            var controls = this.options.controls;
            if (Compass && controls.navigator && !kendo.support.mobileOS) {
                var element = $(doc.createElement("div")).appendTo(this.element);
                var compass = this.compass = new Compass(element, controls.navigator);

                this._compassPan = proxy(this._compassPan, this);
                compass.bind("pan", this._compassPan);

                this._compassCenter = proxy(this._compassCenter, this);
                compass.bind("center", this._compassCenter);
            }
        },

        _compassPan: function(e) {
            var map = this;
            var scroller = map.scroller;

            var x = scroller.scrollLeft + e.x;
            var y = scroller.scrollTop - e.y;

            var bounds = this._virtualSize;
            var height = this.element.height();
            var width = this.element.width();

            // TODO: Move limits in scroller
            x = limit(x, bounds.x.min, bounds.x.max - width);
            y = limit(y, bounds.y.min, bounds.y.max - height);

            map.scroller.one("scroll", function(e) { map._scrollEnd(e); });
            map.scroller.scrollTo(-x, -y);
        },

        _compassCenter: function() {
            this.center(this.options.center);
        },

        _initScroller: function() {
            var scroller = this.scroller = new kendo.mobile.ui.Scroller(
                this.element.children(0), {
                    friction: FRICTION,
                    velocityMultiplier: VELOCITY_MULTIPLIER,
                    zoom: true
                });

            scroller.bind("scroll", proxy(this._scroll, this));
            scroller.bind("scrollEnd", proxy(this._scrollEnd, this));

            this.scrollElement = scroller.scrollElement;
        },

        _initLayers: function() {
            var defs = this.options.layers,
                layers = this.layers = [];

            for (var i = 0; i < defs.length; i++) {
                var options = defs[i];
                var type = options.type || "shape";
                var defaults = this.options.layerDefaults[type];
                var impl = dataviz.map.layers[type];

                // TODO: Set layer size
                layers.push(new impl(this, deepExtend({}, defaults, options)));
            }
        },

        _initMarkers: function() {
            this.markers = new map.layers.MarkerLayer(this, {
                markerDefaults: this.options.markerDefaults
            });
            this.markers.add(this.options.markers);
        },

        _scroll: function(e) {
            var origin = this.locationToLayer(this._viewOrigin).round();
            origin.x += e.scrollLeft;
            origin.y += e.scrollTop;

            this.origin(this.layerToLocation(origin));
            this.trigger("pan", {
                originalEvent: e,
                origin: this.origin(),
                center: this.center()
            });
        },

        _scrollEnd: function(e) {
            this.trigger("panEnd", {
                originalEvent: e,
                origin: this.origin(),
                center: this.center()
            });
        },

        _reset: function() {
            this._viewOrigin = this.origin();
            this._resetScroller();
            this.trigger("reset");
        },

        _resetScroller: function() {
            var scroller = this.scroller;
            var x = scroller.dimensions.x;
            var y = scroller.dimensions.y;
            var scale = this.scale();
            var maxScale = 20 * scale;
            var nw = this.extent().nw;
            var topLeft = this.locationToLayer(nw).round();

            scroller.reset();

            x.makeVirtual();
            y.makeVirtual();

            var xBounds = { min: -topLeft.x, max: scale - topLeft.x };
            if (this.options.wraparound) {
                xBounds.min = -maxScale;
                xBounds.max = maxScale;
            }
            x.virtualSize(xBounds.min, xBounds.max);

            var yBounds = { min: -topLeft.y, max: scale - topLeft.y };
            y.virtualSize(yBounds.min, yBounds.max);

            this._virtualSize = { x: xBounds, y: yBounds };
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

                layers.push(new impl(this, deepExtend({}, defaults, options)));
            }
        },

        _viewportSize: function() {
            var element = this.element;
            var scale = this.scale();
            var width = element.width();

            if (!this.options.wraparound) {
                width = math.min(scale, width);
            }
            return {
                width: width,
                height: math.min(scale, element.height())
            };
        },

        _click: function(e) {
            var cursor = this._mousePoint(e);
            this.trigger("click", {
                originalEvent: e,
                location: this.viewToLocation(cursor)
            });
        },

        _mousePoint: function(e) {
            var offset = this.element.offset();
            var scroller = this.scroller;
            var x = scroller.scrollLeft + e.originalEvent.pageX - offset.left;
            var y = scroller.scrollTop + e.originalEvent.pageY - offset.top;

            return new g.Point(x, y);
        },

        _mousewheel: function(e) {
            e.preventDefault();
            var delta = dataviz.mwDelta(e) > 0 ? -1 : 1;
            var options = this.options;
            var fromZoom = this.zoom();
            var toZoom = limit(fromZoom + delta, options.minZoom, options.maxZoom);

            if (toZoom !== fromZoom) {
                this.trigger("zoomStart", { originalEvent: e });

                var cursor = this._mousePoint(e);
                var location = this.viewToLocation(cursor);
                var preZoom = this.locationToLayer(location);
                var postZoom = this.locationToLayer(location, toZoom);
                var diff = postZoom.subtract(preZoom);

                var origin = this.locationToLayer(this.origin());
                origin.x += diff.x;
                origin.y += diff.y;
                var toOrigin = this.layerToLocation(origin, toZoom);

                this.origin(toOrigin);
                this.zoom(toZoom);

                this.trigger("zoomEnd", { originalEvent: e });
            }
        }
    });

    // Exports ================================================================
    dataviz.ui.plugin(Map);

})(window.kendo.jQuery);
