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
            options = deepExtend({}, options, {
                width: map.element.width() || DEFAULT_WIDTH,
                height: map.element.height() || DEFAULT_HEIGHT
            });

            this._initOptions(options);
            layer.map = map;

            this.element = $("<div class='k-layer'></div>").appendTo(
                map.scrollWrap // TODO: API for allocating a scrollable element?
            ).css("width", options.width).css("height", options.height);

            map.bind("reset", proxy(layer.reset, layer));
            map.bind("pan", proxy(layer._pan, this));
            layer.crs = new EPSG3857();
            layer.pool = new TilePool();
        },

        options: {
            tileSize: 256
        },

        destroy: function() {
            this.element.empty();
        },

        reset: function(e) {
            this._basePoint = this.map.locationToLayer(this.map.origin());
            this.pool.clear();
            this._render();
        },

        _pan: function(e) {
            var layer = this,
                now = new Date(),
                timestamp = layer._pan.timestamp;

            if (!timestamp || now - timestamp > 100) {
                this._loadTiles();
                layer._pan.timestamp = now;
            }
        },

        _render: function() {
            this._loadTiles();
        },

        _viewportSize: function() {
            var map = this.map,
                extent = map.extent(),
                nw = map.locationToLayer(extent.nw),
                se = map.locationToLayer(extent.se),
                diff = se.subtract(nw);

            return {
                width: diff.x,
                height: diff.y
            };
        },

        _loadTiles: function() {
            var layer = this,
                options = this.options,
                tileSize = options.tileSize,
                map = layer.map,
                zoom = map.options.zoom,
                urlTemplate = template(options.urlTemplate),
                nwToPoint = map.locationToLayer(map.origin());

            var center = map.locationToLayer(map.center());

            var firstTileIndex = layer._getTileIndex(nwToPoint);
            var screenPoint = layer._indexToScreenPoint(firstTileIndex);
            var point = screenPoint.clone().subtract(nwToPoint);
            size = layer._getSize(point);

            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y; y++) {
                    var index = {
                        x: firstTileIndex.x + x,
                        y: firstTileIndex.y + y
                    };

                    var screenPoint = layer._indexToScreenPoint(index);
                    var point = screenPoint.clone().subtract(layer._basePoint);
                    var tile = layer._createTile(center, {
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
            var viewportSize = this._viewportSize();
            return {
                x: math.ceil((math.abs(screenPoint.x) + viewportSize.width) / this.options.tileSize),
                y: math.ceil((math.abs(screenPoint.y) + viewportSize.height) / this.options.tileSize)
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

        _createTile: function(center, options) {
            return this.pool.get(center, options);
        }
    });

    var ImageTile = Class.extend({
        init: function(options) {
            this.element = $("<img style='position: absolute; display: block; visibility: visible;' unselectable='on'></img>");
            this.update(options);
            this.visible = false;
        },

        update: function(options) {
            var element = this.element;
            htmlElement = element[0];

            if (htmlElement.style.visibility === "hidden") {
                htmlElement.style.visibility = "visible";
                htmlElement.style.display = "block";
            }

            htmlElement.setAttribute("src", options.url);
            this.url = options.url;

            htmlElement.style.top = options.point.y + "px";
            htmlElement.style.left = options.point.x + "px";
            this.point = options.point;

            this.screenPoint = options.screenPoint;
            this.index = options.index;
            this.id = "x:" + this.index.x + "y:" + this.index.y;
            this.visible = true;
        },

        clear: function() {
            this.element[0].style.visibility = "hidden";
        },

        destroy: function() {
            this.element.remove();
            this.element = null;
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

            var tileId = pool._tileId(options);

            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item.id === tileId) {
                    oldTile = item;
                    tile = oldTile;
                }
            }

            if (!oldTile) {
                tile = new ImageTile(options);
                this._items.push(tile);
            }

            return tile;
        },

        _tileId: function(options) {
            return "x:" + options.index.x + "y:" + options.index.y;
        },

        _update: function(center, options) {
            var pool = this,
                items = pool._items,
                dist = -Number.MAX_VALUE,
                currentDist, index, i, item;

            var tileId = pool._tileId(options);

            for (i = 0; i < items.length; i++) {
                item = items[i];
                currentDist = item.screenPoint.clone().distanceTo(center);
                if (item.id === tileId) {
                    return items[i];
                }

                if (dist < currentDist) {
                    index = i;
                    dist = currentDist;
                }
            }

            items[index].update(options);

            return items[index];
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
