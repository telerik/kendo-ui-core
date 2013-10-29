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
            map.bind("scroll", proxy(layer._scroll, map));
            map.bind("drag", proxy(layer._drag, this));
            map.bind("dragEnd", proxy(layer._dragEnd, this));
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
            this.basePoint = this.crs.toPoint(this.map.viewport().nw, this.map.scale());
            this._render();
        },

        _scroll: function(e) {
            console.log("scroll: ", e);
        },

        _drag: function(e) {
            var layer = this,
                now = new Date(),
                timestamp = layer._drag.timestamp;

            if (!timestamp || now - timestamp > 100) {
                this._loadTiles();
                layer._drag.timestamp = now;
            }
        },

        _dragEnd: function(e) {
            console.log("dragEnd: ", e);
        },

        _render: function() {
            this._loadTiles();
        },

        _loadTiles: function() {
            var layer = this,
                options = this.options,
                tileSize = options.tileSize,
                map = layer.map,
                zoom = map.options.zoom,
                urlTemplate = template(options.urlTemplate),
                nwToPoint = layer.crs.toPoint(map.viewport().nw, map.scale());

            var firstTileIndex = layer._getTileIndex(nwToPoint);
            var screenPoint = layer._indexToScreenPoint(firstTileIndex);
            var point = screenPoint.clone().subtract(layer.basePoint);
            size = layer._getSize(point);

            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y; y++) {
                    var index = {
                        x: firstTileIndex.x + x,
                        y: firstTileIndex.y + y
                    };

                    var screenPoint = layer._indexToScreenPoint(index);
                    var point = screenPoint.clone().subtract(layer.basePoint);
                    var tile = layer._createTile({
                        screenPoint: screenPoint,
                        point: point,
                        index: index,
                        url: urlTemplate({
                            zoom: zoom, x: index.x, y: index.y
                        })
                    });

                    if (!tile.visible) {
                        this.element.append(tile.element);
                        tile.visible = true;
                    }
                }
            }
        },

        _getSize: function(screenPoint) {
            return {
                x: math.ceil((math.abs(screenPoint.x) + this.map.element.width()) / this.options.tileSize),
                y: math.ceil((math.abs(screenPoint.y) + this.map.element.height()) / this.options.tileSize)
            };
        },

        _indexToScreenPoint: function(index, offset) {
            if (!offset) {
                offset = {
                    x: 0,
                    y: 0
                };
            }

            return new Point(
                index.x * this.options.tileSize + offset.x,
                index.y * this.options.tileSize + offset.y)
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
            this.id = "x:" + this.index.x + "y:" + this.index.y;
        },

        clear: function() {
            this.element.hide();
            this.visible = false;
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
            var pool = this,
                items = pool._items,
                oldTile, i, item;

            var tile = new ImageTile(options);

            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item.id === tile.id) {
                    oldTile = item;
                    tile = oldTile;
                }
            }

            if (!oldTile) {
                this._items.push(tile);
            }

            return tile;
        },

        _update: function(center, options) {
            var pool = this,
                items = pool._items,
                dist = Number.MAX_VALUE,
                currentDist, index, i, item;

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
