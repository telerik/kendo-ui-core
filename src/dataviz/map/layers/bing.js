(function(f, define) {
    define([ "./tile" ], f);
})(function() {

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,

        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        template = kendo.template,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        defined = dataviz.defined,

        Extent = dataviz.map.Extent,
        Location = dataviz.map.Location,
        Layer = dataviz.map.layers.Layer,
        TileLayer = dataviz.map.layers.TileLayer,
        TileView = dataviz.map.layers.TileView;

    // Bing tile layer =============================================================
    var BingLayer = TileLayer.extend({
        init: function(map, options) {
            TileLayer.fn.init.call(this, map, options);
            this._initView();
        },

        options: {
            settingsUrl: "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/#= imagerySet #?output=json&jsonp=bingTileParams&include=ImageryProviders&key=#= key #",
            imagerySet: "road"
        },

        _initView: function() {
            var options = this.options;

            if (!options.settingsUrl) {
                return;
            }

            if (!options.key) {
                throw new Error("Bing tile layer: API key is required");
            }

            var settingsTemplate = template(options.settingsUrl);
            var settingsUrl = settingsTemplate({
                    key: options.key,
                    imagerySet: options.imagerySet
                });

            $.ajax({
                url: settingsUrl,
                type: "get",
                dataType: "jsonp",
                jsonpCallback: "bingTileParams",
                success: proxy(this._success, this)
            });
        },

        _success: function(data) {
            if (data && data.resourceSets.length) {
                var resource = this.resource = data.resourceSets[0].resources[0];

                deepExtend(this._view.options, {
                    urlTemplate: resource.imageUrl
                        .replace("{subdomain}", "#= subdomain #")
                        .replace("{quadkey}", "#= quadkey #")
                        .replace("{culture}", "#= culture #"),
                    subdomains: resource.imageUrlSubdomains
                });

                var options = this.options;
                if (!defined(options.minZoom)) {
                    options.minZoom = resource.zoomMin;
                }
                if (!defined(options.maxZoom)) {
                    options.maxZoom = resource.zoomMax;
                }

                this._addAttribution();
                this.reset();
            }
        },

        _viewType: function() {
            return BingView;
        },

        _addAttribution: function() {
            var attr = this.map.attribution;
            if (attr) {
                var items = this.resource.imageryProviders;
                if (items) {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        for (var y = 0; y < item.coverageAreas.length; y++) {
                            var area = item.coverageAreas[y];
                            attr.add({
                                text: item.attribution,
                                minZoom: area.zoomMin,
                                maxZoom: area.zoomMax,
                                extent: new Extent(
                                    new Location(area.bbox[2], area.bbox[1]),
                                    new Location(area.bbox[0], area.bbox[3])
                                )
                            });
                        }
                    }
                }
            }
        }
    });

    var BingView = TileView.extend({
        options: {
            culture: "en-US"
        },

        tileOptions: function(currentIndex) {
            var options = TileView.fn.tileOptions.call(this, currentIndex);

            options.culture = this.options.culture;
            options.quadkey = this.tileQuadKey(this.wrapIndex(currentIndex));

            return options;
        },

        tileQuadKey: function(index) {
            var quadKey = "",
                digit, mask, i;

            for (i = this._zoom; i > 0; i--) {
                digit = 0;
                mask = 1 << (i - 1);

                if ((index.x & mask) !== 0) {
                    digit++;
                }

                if ((index.y & mask) !== 0) {
                    digit += 2;
                }

                quadKey += digit;
            }

            return quadKey;
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                bing: BingLayer,
                BingLayer: BingLayer,
                BingView: BingView
            }
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
