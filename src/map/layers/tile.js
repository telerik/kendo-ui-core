(function ($, undefined) {
    // Imports ================================================================
    var math = Math,

        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        template = kendo.template,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,

        g = dataviz.geometry,
        Point = g.Point,

        map = dataviz.map,
        EPSG3857 = map.crs.EPSG3857;

    // Image tile layer =============================================================
    var TileLayer = Class.extend({
        init: function(map, options) {
            var layer = this;

            layer.map = map;

            this._initOptions(options);
            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap
            );

            map.bind("reset", proxy(layer.reset, layer));
            layer.crs = new EPSG3857();
            layer.pool = new TilePool();
        },

        options: {
            // TODO: Read from map
            zoom: 0,
            tileSize: 256
        },

        destroy: function() {
            this.element.empty();
        },

        reset: function(e) {
            this._render();
        },

        _render: function() {
            var layer = this,
                options = this.options,
                tileSize = options.tileSize,
                map = layer.map,
                zoom = map.options.zoom,
                urlTemplate = template(options.urlTemplate),
                scale = layer.map.scale(),
                nwToPoint = layer.crs.toPoint(map.viewport().nw, scale);

            var tileIndex = layer._getTileIndex(nwToPoint);
            var screenPoint = new Point(tileIndex.x * tileSize, tileIndex.y * tileSize);
            var point = screenPoint.clone().subtract(nwToPoint);
            var size = {
                x: math.ceil((math.abs(point.x) + map.element.width()) / tileSize),
                y: math.ceil((math.abs(point.y) + map.element.height()) / tileSize)
            };

            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y; y++) {
                    var xIndex = tileIndex.x + x;
                    var yIndex = tileIndex.y + y;
                    var screenPoint = new Point(
                        xIndex * tileSize,
                        yIndex * tileSize
                    );
                    var tile = layer._createTile({
                        screenPoint: screenPoint,
                        point: screenPoint.clone().subtract(nwToPoint),
                        index: {
                            x: xIndex,
                            y: yIndex
                        },
                        url: urlTemplate({
                            zoom: zoom, x: xIndex, y: yIndex
                        })
                    });
                    this.element.append(tile.element);
                }
            }
        },

        _getTileIndex: function(point) {
            var layer = this,
                options = layer.options,
                tile = new Point(
                    math.floor(point.x / options.tileSize),
                    math.floor(point.y / options.tileSize)
                );

            return tile;
        },

        _createTile: function(options) {
            var center = this.crs.toPoint(this.map.center(), this.map.scale());
            return this.pool.get(center, options);
        }
    });

    var ImageTile = Class.extend({
        init: function(options) {
            this.element = $("<img class='k-tile' unselectable='on'></img>");
            this.update(options);
        },

        update: function(options) {
            var element = this.element;

            if (element.hide()) {
                element.show();
            }

            element.prop("src", options.url);
            this.url = options.url;

            element.offset({
                top: options.point.y,
                left: options.point.x
            });
            this.point = options.point;

            this.screenPoint = options.screenPoint;
            this.index = options.index;
        },

        clear: function() {
            this.element.hide();
        },

        destroy: function() {
            this.element.remove();
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

            if (pool._items.length > pool.options.maxSize) {
                item = this._update(center, options);
            } else {
                item = this._create(options);
            }

            return item;
        },

        clear: function() {
            var items = this._items,
                i;

            for (i = 0; i < items.length; i++) {
                items[i].clear();
            }
        },

        destroy: function() {
            var items = this._items,
                i;

            for (i = 0; i < items.length; i++) {
                items[i].destroy();
            }
        },

        _create: function(options) {
            var tile = new ImageTile(options);
            this._items.push(tile);
            return tile;
        },

        _update: function(center, options) {
            var pool = this,
                items = pool._items,
                currentDist = -Number.MAV_VALUE,
                dist, index, i, item;

            for (i = 0; i < items.length; i++) {
                item = items[i];
                currentDist = item.screenPoint.distanceTo(center);
                if (dist > currentDist) {
                    index = i;
                    dist = currentDist;
                }
            }

            items[index].update(options);
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                tile: TileLayer,
                TileLayer: TileLayer,

                ImageTile: ImageTile,
                TilePool: TilePool
            }
        }
    });

})(window.kendo.jQuery);
