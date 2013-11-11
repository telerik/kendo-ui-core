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

        util = dataviz.util,
        renderSize = util.renderSize,
        limit = util.limitValue;

    // Constants ==============================================================
    var DEFAULT_WIDTH = 600,
        DEFAULT_HEIGHT = 400;

    // Image tile layer =============================================================
    var TileLayer = Class.extend({
        init: function(map, options) {
            var layer = this;
            options = deepExtend({}, options, {
                width: map.element.width() || DEFAULT_WIDTH,
                height: map.element.height() || DEFAULT_HEIGHT
            });

            layer._initOptions(options);
            layer.map = map;

            this.element = $(this._template(this)).appendTo(map.scrollElement);

            layer._loadView();

            map.bind("reset", proxy(layer.reset, layer));
            if (kendo.support.mobileOS) {
                map.bind("panEnd", proxy(layer._render, layer));
            } else {
                map.bind("pan", proxy(layer._pan, this));
            }
        },

        _loadView: function() {
            this._view = new TileView(this.element, this.options);
            this._updateView();
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

        destroy: function() {
            this._view.destroy();
            this._view = null;
        },

        reset: function() {
            this._updateView();
            this._view.clear();
            this._view.reset();
        },

        _template: kendo.template(
            "<div class='k-layer'" +
                "style='width: #= kendo.dataviz.util.renderSize(options.width) #;" +
                "height: #= kendo.dataviz.util.renderSize(options.height) #;'>" +
            "</div>"
        ),

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
                y * this.options.tileSize);
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

                    if (!tile.visible) {
                        this.element.append(tile.element);
                        tile.visible = true;
                    }
                }
            }
        },

        createTile: function(currentIndex) {
            var index = this.wrapIndex(currentIndex),
                point = this.indexToPoint(currentIndex),
                offset = point.clone().subtract(this.basePoint),
                urlTemplate = template(this.options.urlTemplate),
                tileOptions = {
                    index: index,
                    currentIndex: currentIndex,
                    point: point,
                    offset: roundPoint(offset),
                    zoom: this._zoom,
                    url: urlTemplate({
                        zoom: this._zoom,
                        x: index.x,
                        y: index.y,
                        subdomain: this.subdomainText()
                    }),
                    opacity: this.options.opacity
                };

            return this.pool.get(this._center, tileOptions);
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

    var ImageTile = Class.extend({
        init: function(options) {
            this.element = $("<img style='position: absolute; display: block; visibility: visible;' unselectable='on'></img>");
            this.load(options);
            this.visible = false;
        },

        load: function(options) {
            var htmlElement = this.element[0];

            htmlElement.style.visibility = "visible";
            htmlElement.style.display = "block";

            htmlElement.setAttribute("src", options.url);
            this.url = options.url;

            htmlElement.style.top = renderSize(options.offset.y);
            htmlElement.style.left = renderSize(options.offset.x);
            this.offset = options.offset;

            htmlElement.style.opacity = options.opacity;

            this.point = options.point;
            this.index = options.index;
            this.currentIndex = options.currentIndex;
            this.id = "x:" + this.currentIndex.x + "y:" + this.currentIndex.y + "zoom:" + options.zoom;
            this.visible = true;
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
                tileId = pool._tileId(options),
                oldTile, i, item, tile;

            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item.id === tileId) {
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

        _tileId: function(options) {
            return "x:" + options.currentIndex.x + "y:" + options.currentIndex.y + "zoom:" + options.zoom;
        },

        _update: function(center, options) {
            var pool = this,
                items = pool._items,
                dist = -Number.MAX_VALUE,
                currentDist, index, i, item;

            var tileId = pool._tileId(options);

            for (i = 0; i < items.length; i++) {
                item = items[i];
                currentDist = item.point.clone().distanceTo(center);
                if (item.id === tileId) {
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

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                tile: TileLayer,
                TileLayer: TileLayer,

                ImageTile: ImageTile,
                TilePool: TilePool,
                TileView: TileView
            }
        }
    });

})(window.kendo.jQuery);
