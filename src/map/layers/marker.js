(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        d = dataviz.drawing,
        Group = d.Group,

        map = dataviz.map,
        Location = map.Location;

    // Implementation =========================================================
    var MarkerLayer = Class.extend({
        init: function(map, options) {
            this._initOptions(options);
            this.map = map;

            this.element = $("<div class='k-layer'></div>").appendTo(
                map.overlayContainer
            );

            map.bind("reset", proxy(this._reset, this));

            this.markers = [];
            this._load();
        },

        create: function(options) {
            var marker = new Marker(this.element, options);
            var loc = Location.create(options.location);
            var point = this.map.locationToView(loc);
            marker.moveTo(point.x, point.y)
            this.markers.push(marker);
        },

        _load: function() {
            var markers = this.options.markers;
            for (var i = 0; i < markers.length; markers++) {
                this.create(markers[i]);
            }
        },

        _reset: function() {
            for (var i = 0; i < this.markers.length; i++) {
                var point = this.map.locationToView(this.markers[i].options.location);
                this.markers[i].moveTo(point.x, point.y);
            }
        }
    });

    var Marker = Class.extend({
        init: function(wrapper, options) {
            this._initOptions(options);
            this.element = $(this._template(this)).appendTo(wrapper);
        },

        options: {
            shape: "default"
        },

        moveTo: function(left, top) {
            left -= this.element.width() / 2;
            top -= this.element.height();
            this.element.css({ left: math.round(left), top: math.round(top) });
        },

        _template: kendo.template(
            "<span class='k-marker k-marker-#= options.shape #'></span>"
        )
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                marker: MarkerLayer,
                MarkerLayer: MarkerLayer
            },
            Marker: Marker
        }
    });

})(window.kendo.jQuery);
