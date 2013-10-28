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

        dataviz = kendo.dataviz,
        defined = dataviz.defined,

        map = dataviz.map,
        Extent = map.Extent,
        Location = map.Location,
        EPSG3857 = map.crs.EPSG3857,

        util = dataviz.util,
        limit = util.limitValue;

    // Constants ==============================================================
    var FRICTION = 0.90,
        MAX_ZOOM = 18,
        VELOCITY_MULTIPLIER = 5;

    // Map widget =============================================================
    var Map = Widget.extend({
        init: function(element, options) {
            var map = this;

            Widget.fn.init.call(map, element);

            map._initOptions(options);
            this.bind(this.events, options);

            map.scrollWrap = $("<div />").appendTo(map.element);

            map.crs = new EPSG3857();
            map.layers = new ObservableArray([]);
            map._renderLayers();

            var scroller = map.scroller = new kendo.mobile.ui.Scroller(map.scrollWrap, {
                friction: FRICTION,
                velocityMultiplier: VELOCITY_MULTIPLIER
            });

            scroller.bind("scroll", proxy(map._scroll, map));
            scroller.bind("scrollEnd", proxy(map._scrollEnd, map));

            map._reset();
        },

        options: {
            name: "Map",
            layers: [],
            zoom: 3,
            minSize: 256,
            minZoom: 2
        },

        events:[
            "reset",
            "drag",
            "dragEnd",
            "shapeCreated"
        ],

        zoom: function(level) {
            if (defined(level)) {
                this.options.view.zoom = limit(level, this.options.minZoom, MAX_ZOOM);

                this._reset();
            } else {
                return this.options.view.zoom;
            }
        },

        scale: function() {
            return this.options.minSize * pow(2, this.options.view.zoom);
        },

        toLayerPoint: function(location) {
            return this.crs.toPoint(location, this.scale());
        },

        toScreenPoint: function(location) {
            var origin = this.toLayerPoint(this._screenOrigin);
            var point = this.toLayerPoint(location);

            return point.subtract(origin);
        },

        _scroll: function(e) {
            var center = this.toLayerPoint(this._scrollOrigin);
            center.x += e.scrollLeft;
            center.y += e.scrollTop;
            this.center(this.crs.toLocation(center, this.scale()));

            this.trigger("drag");
        },

        _scrollEnd: function() {
            this.trigger("dragEnd");
        },

        _reset: function() {
            this._scrollOrigin = this.center();
            this._screenOrigin = this.viewport().nw;
            this._resetScroller();
            this.trigger("reset");
        },

        _resetScroller: function() {
            var scroller = this.scroller;
            scroller.dimensions.y.makeVirtual();
            scroller.dimensions.x.makeVirtual();

            var nw = this.toLayerPoint(this.viewport().nw);
            scroller.dimensions.x.virtualSize(-nw.x, this.scale() - nw.x);
            scroller.dimensions.y.virtualSize(-nw.y, this.scale() - nw.y);
        },

        _renderLayers: function() {
            var defs = this.options.layers,
                layers = this.layers = [],
                scrollWrap = this.scrollWrap;

            scrollWrap.empty();

            for (var i = 0; i < defs.length; i++) {
                // TODO: Either pass layer type directly or create from a factory based on type id
                var options = defs[i];
                var type = dataviz.map.layers[options.type];
                if (type) {
                    layers.push(new type(this, options));
                }
            }

            this.trigger("reset");
        },

        // TODO: Rename to extent
        viewport: function() {
            var map = this,
                scale = map.scale(),
                halfWidth = map.element.width() / 2,
                halfHeight = map.element.height() / 2,
                crs = map.crs,
                cp = crs.toPoint(map.center(), scale);

            var p0 = cp.clone();
            p0.x -= halfWidth;
            p0.y -= halfHeight;

            var p1 = cp.clone();
            p1.x += halfWidth;
            p1.y += halfHeight;

            return new Extent(
                crs.toLocation(p0, scale),
                crs.toLocation(p1, scale)
            );
        },

        center: function(center) {
            if (center) {
                this._center = center;
            } else if (!this._center) {
                this._center = new Location(
                    this.options.view.center[0],
                    this.options.view.center[1]
                );
            }

            return this._center;
        }
    });

    // Exports ================================================================
    dataviz.ui.plugin(Map);

})(window.kendo.jQuery);
