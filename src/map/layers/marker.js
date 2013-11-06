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

            this.element = $("<div class='k-layer'></div>")
                            .css("z-index", 1000)
                            .appendTo(map.scrollElement);

            map.bind("reset", proxy(this._reset, this));

        },

        create: function(options) {
            var marker = new Marker(this.element, options);
            var loc = Location.create(options.location);
            var point = this.map.locationToView(loc);
            marker.moveTo(point.x, point.y)
            this.markers.push(marker);
        },

        _reset: function() {
            this.element.empty();
            this.markers = [];

            var markers = this.options.markers;
            for (var i = 0; i < markers.length; markers++) {
                this.create(markers[i]);
            }
        }
    });

    var Marker = Class.extend({
        init: function(wrapper, options) {
            this._initOptions(options);
            this.element = $(this._template(this)).appendTo(wrapper);
        },

        options: {
            shape: "pinTarget"
        },

        moveTo: function(left, top) {
            this.element.css({
                left: math.round(left),
                top: math.round(top)
            });
        },

        _template: kendo.template(
            "<span class='k-marker k-marker-#= kendo.toHyphens(options.shape) #'></span>"
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
