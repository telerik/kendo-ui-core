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
        min = math.min,
        pow = math.pow,

        proxy = $.proxy,

        kendo = window.kendo,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        Compass = dataviz.ui.Compass,
        Attribution = dataviz.ui.Attribution,
        defined = dataviz.defined,

        g = dataviz.geometry,

        map = dataviz.map,
        Extent = map.Extent,
        Location = map.Location,
        EPSG3857 = map.crs.EPSG3857,

        util = dataviz.util,
        limit = util.limitValue,
        valueOrDefault = util.valueOrDefault;

    // Constants ==============================================================
    var CSS_PREFIX = "k-",
        FRICTION = 0.90,
        FRICTION_MOBILE = 0.93,
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

            this._viewOrigin = this._getOrigin();
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
                },
                attribution: {
                    visible: true
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
                level = limit(level, options.minZoom, options.maxZoom);
                if (options.zoom !== level) {
                    options.zoom = level;
                    this._reset();
                }

                return this;
            } else {
                return options.zoom;
            }
        },

        center: function(center) {
            if (center) {
                this.options.center = Location.create(center).toArray();
                this._reset();

                return this;
            } else {
                return Location.create(this.options.center);
            }
        },

        extent: function() {
            var nw = this._getOrigin();
            var bottomRight = this.locationToLayer(nw);
            var size = this.viewSize();

            bottomRight.x += size.width;
            bottomRight.y += size.height;

            var se = this.layerToLocation(bottomRight);
            return new Extent(nw, se);
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
            this._reset();
        },

        locationToLayer: function(location, zoom) {
            var clamp = !this.options.wraparound;
            location = Location.create(location);
            return this.crs.toPoint(location, this._layerSize(zoom), clamp);
        },

        layerToLocation: function(point, zoom) {
            var clamp = !this.options.wraparound;
            return  this.crs.toLocation(point, this._layerSize(zoom), clamp);
        },

        locationToView: function(location) {
            location = Location.create(location);
            var origin = this.locationToLayer(this._viewOrigin);
            var point = this.locationToLayer(location);

            return point.subtract(origin);
        },

        viewToLocation: function(point, zoom) {
            var origin = this.locationToLayer(this._getOrigin(), zoom);
            point = point.clone();
            point.x += origin.x;
            point.y += origin.y;
            return this.layerToLocation(point, zoom);
        },

        eventToView: function(e) {
            // TODO
        },

        eventToLocation: function(e) {
            // TODO
        },

        viewSize: function() {
            var element = this.element;
            var scale = this._layerSize();
            var width = element.width();

            if (!this.options.wraparound) {
                width = min(scale, width);
            }
            return {
                width: width,
                height: min(scale, element.height())
            };
        },

        _setOrigin: function(origin) {
            var size = this.viewSize(),
                topLeft;

            origin = this._origin = Location.create(origin);
            topLeft = this.locationToLayer(origin);
            topLeft.x += size.width / 2;
            topLeft.y += size.height / 2;

            this.options.center = this.layerToLocation(topLeft).toArray();

            return this;
        },

        _getOrigin: function(invalidate) {
            var size = this.viewSize(),
                topLeft;

            if (invalidate || !this._origin) {
                topLeft = this.locationToLayer(this.center());
                topLeft.x -= size.width / 2;
                topLeft.y -= size.height / 2;

                this._origin = this.layerToLocation(topLeft);
            }

            return this._origin;
        },

        _initControls: function() {
            var controls = this.options.controls;

            if (Compass && controls.navigator && !kendo.support.mobileOS) {
                this._createCompass(controls.navigator);
            }

            if (Attribution && controls.attribution) {
                this._createAttribution(controls.attribution);
            }
        },

        _createCompass: function(options) {
            var element = $(doc.createElement("div")).appendTo(this.element);
            var compass = this.compass = new Compass(element, options);

            this._compassPan = proxy(this._compassPan, this);
            compass.bind("pan", this._compassPan);

            this._compassCenter = proxy(this._compassCenter, this);
            compass.bind("center", this._compassCenter);
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

        _createAttribution: function(options) {
            var element = $(doc.createElement("div")).appendTo(this.element);
            this.attribution = new Attribution(element, options);
        },

        _initScroller: function() {
            var friction = kendo.support.mobileOS ? FRICTION_MOBILE : FRICTION;
            var scroller = this.scroller = new kendo.mobile.ui.Scroller(
                this.element.children(0), {
                    friction: friction,
                    velocityMultiplier: VELOCITY_MULTIPLIER,
                    zoom: true
                });

            scroller.bind("scroll", proxy(this._scroll, this));
            scroller.bind("scrollEnd", proxy(this._scrollEnd, this));
            scroller.userEvents.bind("gestureend", proxy(this._scale, this));

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
            var movable = e.sender.movable;

            var offset = new g.Point(movable.x, movable.y).multiply(-1).multiply(1/movable.scale);
            origin.x += offset.x;
            origin.y += offset.y;

            this._setOrigin(this.layerToLocation(origin));
            this.trigger("pan", {
                originalEvent: e,
                origin: this._getOrigin(),
                center: this.center()
            });
        },

        _scrollEnd: function(e) {
            this.trigger("panEnd", {
                originalEvent: e,
                origin: this._getOrigin(),
                center: this.center()
            });
        },

        _scale: function(e) {
            var scale = this.scroller.movable.scale;
            var zoom = this._scaleToZoom(scale);
            var gestureCenter = new g.Point(e.center.x, e.center.y);
            var centerLocation = this.viewToLocation(gestureCenter, zoom);
            var centerPoint = this.locationToLayer(centerLocation, zoom);
            var originPoint = centerPoint.subtract(gestureCenter);

            this._setOrigin(this.layerToLocation(originPoint, zoom));
            this.zoom(zoom);
        },

        _scaleToZoom: function(scaleDelta) {
            var scale = this._layerSize() * scaleDelta;
            var tiles = scale / this.options.minSize;
            var zoom = math.log(tiles) / math.log(2);

            return math.round(zoom);
        },

        _reset: function() {
            if (this._attribution) {
                this._attribution.clear();
            }

            this._viewOrigin = this._getOrigin(true);
            this._resetScroller();
            this.trigger("reset");
        },

        _resetScroller: function() {
            var scroller = this.scroller;
            var x = scroller.dimensions.x;
            var y = scroller.dimensions.y;
            var scale = this._layerSize();
            var maxScale = 20 * scale;
            var nw = this.extent().nw;
            var topLeft = this.locationToLayer(nw).round();

            scroller.reset();
            scroller.userEvents.cancel();

            var maxZoom = this.options.maxZoom - this.zoom();
            scroller.dimensions.maxScale = pow(2, maxZoom);

            scroller.movable.round = true;

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

        _layerSize: function(zoom) {
            zoom = valueOrDefault(zoom, this.options.zoom);
            return this.options.minSize * pow(2, zoom);
        },

        _click: function(e) {
            var cursor = this._mousePoint(e);
            this.trigger("click", {
                originalEvent: e,
                location: this.viewToLocation(cursor)
            });
        },

        // TODO
        _mousePoint: function(e) {
            var offset = this.element.offset();
            var event = e.originalEvent;
            var x = valueOrDefault(event.pageX, event.clientX) - offset.left;
            var y = valueOrDefault(event.pageY, event.clientY) - offset.top;

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
                var postZoom = this.locationToLayer(location, toZoom);
                var origin = postZoom.subtract(cursor);
                this._setOrigin(this.layerToLocation(origin, toZoom));
                this.zoom(toZoom);

                this.trigger("zoomEnd", { originalEvent: e });
            }
        }
    });

    // Exports ================================================================
    dataviz.ui.plugin(Map);

})(window.kendo.jQuery);
