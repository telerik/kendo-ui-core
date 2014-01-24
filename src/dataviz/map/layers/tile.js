(function(f, define) {
    define([ "./base", "../location", "../../geometry" ], f);
})(function() {

(function ($, undefined) {
    // Imports ================================================================
    var math = Math,

        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        template = kendo.template,

        dataviz = kendo.dataviz,
        round = dataviz.round,
        deepExtend = kendo.deepExtend,

        g = dataviz.geometry,
        Point = g.Point,

        Extent = dataviz.map.Extent,
        Location = dataviz.map.Location,
        Layer = dataviz.map.layers.Layer,

        util = dataviz.util,
        renderSize = util.renderSize,
        limit = util.limitValue;

    // Constants ==============================================================
    var DEFAULT_WIDTH = 600,
        DEFAULT_HEIGHT = 400;

    // Image tile layer =============================================================
    var TileLayer = Layer.extend({
        init: function(map, options) {
            Layer.fn.init.call(this, map, options);

            if (typeof this.options.subdomains === "string") {
                this.options.subdomains = this.options.subdomains.split("");
            }

            var viewType = this._viewType();
            this._view = new viewType(this.element, this.options);
        },

        destroy: function() {
            Layer.fn.destroy.call(this);

            this._view.destroy();
            this._view = null;
        },

        reset: function() {
            this._updateView();
            this._view.clear();
            this._view.reset();
        },

        _viewType: function() {
            return TileView;
        },

        _activate: function() {
            Layer.fn._activate.call(this);

            if (!this._panEnd) {
                this._panEnd = proxy(this._render, this);
                this._pan = proxy(this._pan, this);
            }

            if (kendo.support.mobileOS) {
                this.map.bind("panEnd", this._panEnd);
            } else {
                this.map.bind("pan", this._pan);
            }
        },

        _deactivate: function() {
            Layer.fn._deactivate.call(this);

            this.map.unbind("panEnd", this._panEnd);
            this.map.unbind("pan", this._pan);
        },

        _updateView: function() {
            var view = this._view,
                map = this.map,
                extent = map.extent(),
                extentToPoint = {
                    nw: map.locationToLayer(extent.nw).round(),
                    se: map.locationToLayer(extent.se).round()
                };

            view.center(map.locationToLayer(map.center()));
            view.extent(extentToPoint);
            view.zoom(map.zoom());
        },

        _resize: function() {
            this._render();
        },

        _pan: function() {
            var layer = this,
                now = new Date(),
                timestamp = layer._pan.timestamp;

            if (!timestamp || now - timestamp > 100) {
                this._render();
                layer._pan.timestamp = now;
            }
        },

        _render: function() {
            this._updateView();
            this._view.render();
        }
    });

    var BingLayer = TileLayer.extend({
        init: function(map, options) {
            this._initOptions(options);

            var settingsTemplate = template(this.options.settingsUrl),
                settingsUrl = settingsTemplate({
                    key: this.options.key,
                    imagerySet: this.options.imagerySet
                });

            this.map = map;

            $.ajax({
                url: settingsUrl,
                type: "get",
                dataType: "jsonp",
                jsonpCallback: "bingTileParams",
                success: proxy(this._success, this)
            });
        },

        options: {
            settingsUrl: "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/#= imagerySet #?output=json&jsonp=bingTileParams&include=ImageryProviders&key=#= key #",
            imagerySet: "road"
        },

        _success: function(data) {
            if (data && data.resourceSets.length) {
                var resource = this.resource = data.resourceSets[0].resources[0];

                TileLayer.fn.init.call(this, this.map, {
                    urlTemplate: resource.imageUrl
                        .replace("{subdomain}", "#= subdomain #")
                        .replace("{quadkey}", "#= quadkey #")
                        .replace("{culture}", "#= culture #"),
                    subdomains: resource.imageUrlSubdomains,
                    maxZoom: resource.zoomMax,
                    minZoom: resource.zoomMin
                });

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

    var TileView = Class.extend({
        init: function(element, options) {
            this.element = element;
            this._initOptions(options);

            this.pool = new TilePool();
        },

        options: {
            tileSize: 256,
            subdomains: ["a", "b", "c"],
            urlTemplate: ""
        },

        center: function(center) {
            this._center = center;
        },

        extent: function(extent) {
            this._extent = extent;
        },

        zoom: function(zoom) {
            this._zoom = zoom;
        },

        pointToTileIndex: function(point) {
            return new Point(
                math.floor(point.x / this.options.tileSize),
                math.floor(point.y / this.options.tileSize)
            );
        },

        clear: function() {
            this.pool.empty();
        },

        tileCount: function() {
            var size = this.size(),
                firstTileIndex = this.pointToTileIndex(this._extent.nw),
                point = this.indexToPoint(firstTileIndex).subtract(this._extent.nw);

            return {
                x: math.ceil((math.abs(point.x) + size.width) / this.options.tileSize),
                y: math.ceil((math.abs(point.y) + size.height) / this.options.tileSize)
            };
        },

        size: function() {
            var nw = this._extent.nw,
                se = this._extent.se,
                diff = se.clone().subtract(nw);

            return {
                width: diff.x,
                height: diff.y
            };
        },

        indexToPoint: function(index) {
            var x = index.x, y = index.y;

            return new Point(
                x * this.options.tileSize,
                y * this.options.tileSize
            );
        },

        subdomainText: function() {
            var subdomains = this.options.subdomains;

            return subdomains[this.subdomainIndex++ % subdomains.length];
        },

        destroy: function() {
            this.element.empty();
            this.pool.empty();
        },

        reset: function() {
            this.subdomainIndex = 0;
            this.basePoint = this._extent.nw;
            this.render();
        },

        render: function() {
            var size = this.tileCount(),
                firstTileIndex = this.pointToTileIndex(this._extent.nw),
                tile, x, y;

            for (x = 0; x < size.x; x++) {
                for (y = 0; y < size.y; y++) {
                    tile = this.createTile({
                        x: firstTileIndex.x + x,
                        y: firstTileIndex.y + y
                    });

                    if (!tile.options.visible) {
                        this.element.append(tile.element);
                        tile.options.visible = true;
                    }
                }
            }
        },

        createTile: function(currentIndex) {
            var options = this.tileOptions(currentIndex);

            return this.pool.get(this._center, options);
        },

        tileOptions: function(currentIndex) {
            var index = this.wrapIndex(currentIndex),
                point = this.indexToPoint(currentIndex),
                offset = point.clone().subtract(this.basePoint);

            return {
                index: index,
                currentIndex: currentIndex,
                point: point,
                offset: roundPoint(offset),
                zoom: this._zoom,
                subdomain: this.subdomainText(),
                urlTemplate: this.options.urlTemplate,
                errorUrlTemplate: this.options.errorUrlTemplate
            };
        },

        wrapIndex: function(index) {
            var boundary = math.pow(2, this._zoom);
            return {
                x: this.wrapValue(index.x, boundary),
                y: limit(index.y, 0, boundary - 1)
            };
        },

        wrapValue: function(value, boundary) {
            var remainder = (math.abs(value) % boundary);
            if (value >= 0) {
                value = remainder;
            } else {
                value = boundary - (remainder === 0 ? boundary : remainder);
            }

            return value;
        }
    });

    var BingView = TileView.extend({
        options: {
            culture: "en-Us"
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

    var ImageTile = Class.extend({
        init: function(options) {
            this._initOptions(options);
            this.createElement();
            this.load();
            // initially the image should be
            this.options.visible = false;
        },

        options: {
            urlTemplate: "",
            errorUrlTemplate: "",
            visible: false
        },

        createElement: function() {
            this.element = $("<img style='position: absolute; display: block; visibility: visible;' unselectable='on'></img>")
                            .error(proxy(function(e) {
                                e.target.setAttribute("src", this.errorUrl());
                            }, this));
        },

        load: function(options) {
            this.options = deepExtend({}, this.options, options);

            var htmlElement = this.element[0];

            htmlElement.style.visibility = "visible";
            htmlElement.style.display = "block";
            htmlElement.style.top = renderSize(this.options.offset.y);
            htmlElement.style.left = renderSize(this.options.offset.x);
            htmlElement.setAttribute("src", this.url());

            this.options.id = tileId(this.options.currentIndex, this.options.zoom);
            this.options.visible = true;
        },

        url: function() {
            var urlResult = template(this.options.urlTemplate);

            return urlResult(this.urlOptions());
        },

        errorUrl: function() {
            var urlResult = template(this.options.errorUrlTemplate);

            return urlResult(this.urlOptions());
        },

        urlOptions: function() {
            var options = this.options;
            return {
                zoom: options.zoom,
                subdomain: options.subdomain,
                z: options.zoom,
                x: options.index.x,
                y: options.index.y,
                s: options.subdomain,
                quadkey: options.quadkey,
                q: options.quadkey,
                culture: options.culture,
                c: options.culture
            };
        },

        destroy: function() {
            if (this.element) {
                this.element.remove();
                this.element = null;
            }
        }
    });

    var TilePool = Class.extend({
        init: function() {
            // calculate max size automaticaly
            this._items = [];
        },

        options: {
            maxSize: 100
        },

        // should considered to remove the center of the screen
        get: function(center, options) {
            var pool = this,
                item;

            if (pool._items.length >= pool.options.maxSize) {
                item = pool._update(center, options);
            } else {
                item = pool._create(options);
            }

            return item;
        },

        empty: function() {
            var items = this._items,
                i;

            for (i = 0; i < items.length; i++) {
                items[i].destroy();
            }

            this._items = [];
        },

        _create: function(options) {
            var pool = this,
                items = pool._items,
                id = tileId(options.currentIndex, options.zoom),
                oldTile, i, item, tile;

            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item.options.id === id) {
                    oldTile = item;
                    tile = oldTile;
                }
            }

            if (oldTile) {
                oldTile.load(options);
            } else {
                tile = new ImageTile(options);
                this._items.push(tile);
            }

            return tile;
        },

        _update: function(center, options) {
            var pool = this,
                items = pool._items,
                dist = -Number.MAX_VALUE,
                currentDist, index, i, item;

            var id = tileId(options.currentIndex, options.zoom);

            for (i = 0; i < items.length; i++) {
                item = items[i];
                currentDist = item.options.point.clone().distanceTo(center);
                if (item.options.id === id) {
                    return items[i];
                }

                if (dist < currentDist) {
                    index = i;
                    dist = currentDist;
                }
            }

            items[index].load(options);

            return items[index];
        }
    });

    // Methods ================================================================
    function roundPoint(point) {
        return new Point(round(point.x), round(point.y));
    }

    function tileId(index, zoom) {
            return "x:" + index.x + "y:" + index.y + "zoom:" + zoom;
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                tile: TileLayer,
                TileLayer: TileLayer,

                bing: BingLayer,
                BingLayer: BingLayer,

                ImageTile: ImageTile,
                TilePool: TilePool,
                TileView: TileView,
                BingView: BingView
            }
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
