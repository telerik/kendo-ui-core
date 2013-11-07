(function ($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        indexOf = $.inArray,
        proxy = $.proxy,

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

            this.items = [];
            this.map = map;
            this.element = $("<div class='k-layer'></div>")
                            .css("zIndex", this.options.zIndex)
                            .appendTo(map.scrollElement);

            this.reset = proxy(this.reset, this);
            map.bind("reset", this.reset);
        },

        dispose: function() {
            // TODO
        },

        options: {
            zIndex: 1000
        },

        add: function(arg) {
            if ($.isArray(arg)) {
                for (var i = 0; i < arg.length; i++) {
                    this._addOne(arg[i]);
                }
            } else {
                return this._addOne(arg);
            }
        },

        _addOne: function(arg) {
            var marker = Marker.create(arg);
            marker.addTo(this);

            return marker;
        },

        remove: function(marker) {
            marker.dispose();

            var index = indexOf(marker, this.items);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },

        clear: function() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].dispose();
            }

            this.items = [];
        },

        update: function(marker) {
            var loc = marker.options.location;
            if (loc) {
                loc = Location.create(loc);
                marker.showAt(this.map.locationToView(loc))
            }
        },

        reset: function() {
            // TODO: Update all markers and set visibility / position
            var items = this.items;
            for (var i = 0; i < items.length; i++) {
                this.update(items[i]);
            }
        }
    });

    var Marker = Class.extend({
        init: function(options) {
            this._initOptions(options);
        },

        options: {
            shape: "pinTarget"
        },

        addTo: function(parent) {
            this.layer = parent.markers || parent;
            this.layer.items.push(this);
            this.layer.update(this);
        },

        setLocation: function(loc) {
            this.options.location = Location.create(loc);

            if (this.layer) {
                this.layer.update(this);
            }
        },

        showAt: function(point) {
            this.render();
            this.element.css({
                left: math.round(point.x),
                top: math.round(point.y)
            });
        },

        hide: function() {
            if (this.element) {
                this.element.remove();
                this.element = null;
            }
        },

        dispose: function() {
            this.layer = null;
            this.hide();
        },

        render: function() {
            if (!this.element) {
                var options = this.options;
                var layer = this.layer;

                this.element = $(doc.createElement("span"))
                    .addClass("k-marker k-marker-" + kendo.toHyphens(options.shape))
                    .attr("alt", options.title)
                    .css("zIndex", options.zIndex);

                if (layer) {
                    layer.element.append(this.element);
                }
            }
        }
    });

    Marker.create = function(arg) {
        if (arg instanceof Marker) {
            return arg;
        }

        return new Marker(arg);
    }

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
