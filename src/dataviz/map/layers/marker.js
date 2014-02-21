(function(f, define){
    define([ "./base", "../location",
             "../../../kendo.data", "../../../kendo.tooltip" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var doc = document,
        math = Math,
        indexOf = $.inArray,
        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        DataSource = kendo.data.DataSource,
        Tooltip = kendo.ui.Tooltip,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        map = dataviz.map,
        Location = map.Location,
        Layer = map.layers.Layer;

    // Implementation =========================================================
    var MarkerLayer = Layer.extend({
        init: function(map, options) {
            Layer.fn.init.call(this, map, options);

            this.items = [];
            this._initDataSource();
        },

        destroy: function() {
            Layer.fn.destroy.call(this);

            this.dataSource.unbind("change", this._dataChange);
            this.clear();
        },

        options: {
            zIndex: 1000,
            autoBind: true,
            dataSource: {},
            locationField: "location",
            titleField: "title"
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
            var loc = marker.location();
            if (loc) {
                marker.showAt(this.map.locationToView(loc));
            }
        },

        reset: function() {
            Layer.fn.reset.call(this);
            var items = this.items;
            for (var i = 0; i < items.length; i++) {
                this.update(items[i]);
            }
        },

        bind: function (options, dataItem) {
            var marker = map.Marker.create(options, this.options);
            marker.dataItem = dataItem;

            var args = { marker: marker };
            var cancelled = this.map.trigger("markerCreated", args);
            if (!cancelled) {
                this.add(marker);
                return marker;
            }
        },

        _addOne: function(arg) {
            var marker = Marker.create(arg, this.options);
            marker.addTo(this);

            return marker;
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
            this.clear();

            var getLocation = kendo.getter(this.options.locationField);
            var getTitle = kendo.getter(this.options.titleField);
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                this.bind({
                    location: getLocation(dataItem),
                    title: getTitle(dataItem)
                }, dataItem);
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

        location: function(value) {
            if (value) {
                this.options.location = Location.create(value).toArray();

                if (this.layer) {
                    this.layer.update(this);
                }

                return this;
            } else {
                return Location.create(this.options.location);
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
                    .attr("title", options.title)
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
                        e.location = marker.location();
                        e.marker = marker;
                        return contentTemplate(e);
                    };
                }

                if (options.title || options.content || options.contentUrl) {
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
