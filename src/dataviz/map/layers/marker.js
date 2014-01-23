(function(f, define){
    define([ "../location" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        indexOf = $.inArray,
        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        Tooltip = kendo.ui.Tooltip,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

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

        destroy: function() {
            this.map.unbind("reset", this.reset);
            this.clear();
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
            var marker = Marker.create(arg, this.options.markerDefaults);
            marker.addTo(this);

            return marker;
        },

        remove: function(marker) {
            marker.destroy();

            var index = indexOf(marker, this.items);
            if (index > -1) {
                this.items.splice(index, 1);
            }
        },

        clear: function() {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].destroy();
            }

            this.items = [];
        },

        update: function(marker) {
            // TODO: Do not show markers outside the map extent
            var loc = marker.options.location;
            if (loc) {
                loc = Location.create(loc);
                marker.showAt(this.map.locationToView(loc));
            }
        },

        reset: function() {
            var items = this.items;
            for (var i = 0; i < items.length; i++) {
                this.update(items[i]);
            }
        }
    });

    var Marker = Class.extend({
        init: function(options) {
            this.options = options || {};
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

            if (this.tooltip && this.tooltip.popup) {
                // TODO: Expose popup/tooltip updatePosition? method
                this.tooltip.popup._position();
            }
        },

        hide: function() {
            if (this.element) {
                this.element.remove();
                this.element = null;
            }

            if (this.tooltip) {
                this.tooltip.destroy();
                this.tooltip = null;
            }
        },

        destroy: function() {
            this.layer = null;
            this.hide();
        },

        render: function() {
            if (!this.element) {
                var options = this.options;
                var layer = this.layer;

                this.element = $(doc.createElement("span"))
                    .addClass("k-marker k-marker-" + kendo.toHyphens(options.shape || "pin"))
                    .attr("alt", options.title)
                    .css("zIndex", options.zIndex);

                if (layer) {
                    layer.element.append(this.element);
                }

                this.renderTooltip();
            }
        },

        renderTooltip: function() {
            var marker = this;
            var options = marker.options.tooltip;

            if (options && Tooltip) {
                var template = options.template;
                if (template) {
                    var contentTemplate = kendo.template(template);
                    options.content = function(e) {
                        e.location = Location.create(marker.options.location);
                        e.marker = marker;
                        return contentTemplate(e);
                    };
                }

                if (options.content || options.contentUrl) {
                    this.tooltip = new Tooltip(this.element, options);
                    this.tooltip.marker = this;
                }
            }
        }
    });

    Marker.create = function(arg, defaults) {
        if (arg instanceof Marker) {
            return arg;
        }

        return new Marker(deepExtend({}, defaults, arg));
    };

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

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
