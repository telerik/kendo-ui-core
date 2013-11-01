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

        util = dataviz.util,
        renderSize = util.renderSize;

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

            this.element = $(this._template(this)).appendTo(map.scrollWrap);

            layer._loadView();

            map.bind("reset", proxy(layer.reset, layer));
            if (kendo.support.mobileOS) {
                map.bind("panEnd", proxy(layer._render, layer));
            } else {
                map.bind("pan", proxy(layer._pan, this));
            }
        },

        options: {
            subdomains: ["a", "b", "c"]
        },

        _loadView: function() {
            this._view = new TileView(this.element, map, this.options.submodule);
            this._updateView();
        },

        _updateView: function() {
            this._view.center(this.map.center());
            this._view.extent(this.map.extent());
            this._view.zoom(this.map.zoom());
        },

        destroy: function() {
            this._view.destroy();
            this._view = null;
        },

        reset: function(e) {
            this._view.clear();
            this._view.render();
        },

        _template: kendo.template(
            "<div class='k-layer'" +
                "style='width: #= kendo.dataviz.util.renderSize(options.width) #;" +
                "height: #= kendo.dataviz.util.renderSize(options.height) #;'>" +
            "</div>"
        ),

        _pan: function(e) {
            var layer = this,
                now = new Date(),
                timestamp = layer._pan.timestamp;

            if (!timestamp || now - timestamp > 100) {
                this._view.render();
                layer._pan.timestamp = now;
            }
        },

        _render: function() {
            this._view.render();
        }
    });

    var TileView = Class.extend({
        init: function(element, locator, options) {
            this.pool = new TilePool();
            this.locator = locator;
        },

        options: {
            tileSize: 256
        },

        // remove the getter
        center: function(center) {
            if (center) {
                this.center = center;
            } else {
                return this.center;
            }
        },

        extent: function(extent) {
            if (extent) {
                this.extent = extent;
            } else {
                return this.extent;
            }
        },

        zoom: function(zoom) {
            if (zoom) {
                this.zoom = zoom;
            } else {
                return this.zoom;
            }
        },

        pointToTileIndex: function(point) {
            return new Point(
                math.floor(point.x / this.options.tileSize),
                math.floor(point.y / this.options.tileSize)
            );
        },

        createTile: function(options) {
            return this.pool.get(this.center, options);
        },

        tileCount: function() {
            var size = this.size(),
                firstTileIndex = this.getTileIndex(this.extent.nw),
                screenPoint = layer._indexToScreenPoint(firstTileIndex);

            return {
                x: math.ceil((math.abs(screenPoint.x) + size.width) / this.options.tileSize),
                y: math.ceil((math.abs(screenPoint.y) + size.height) / this.options.tileSize)
            };
        },

        size: function() {
            var nw = this.locator.locationToLayer(this.extent.nw),
                se = this.locator.locationToLayer(this.extent.se),
                diff = se.subtract(nw);

            return {
                width: diff.x,
                height: diff.y
            };
        },

        indexToPoint: function(index, offset) {
            offset = offset || { x: 0, y: 0 };

            return new Point(
                index.x * this.options.tileSize + offset.x,
                index.y * this.options.tileSize + offset.y)
            };
        },

        subdomainText: function() {
            var subdomains = this.options.subdomains;

            return subdomains[this.subdomainIndex++ % subdomains.length];
        },

        clear: function() {
            // rename destroy to empty
            this.pool.destroy();
        },

        destroy: function() {
            this.element.empty();
            this.pool.destroy();
        }

        reset: function() {
            this.subdomainIndex = 0;
            this._basePoint = this.locator.locationToLayer(this.extent.nw);
            this.load();
        },

        render: function() {
            var urlTemplate = template(this.options.urlTemplate),
                nwToPoint = this.locator.locationToLayer(this.extent.nw);

            var firstTileIndex = this.pointToTileIndex(nwToPoint);
            size = this.tileCount();

            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y; y++) {
                    var index = {
                        x: firstTileIndex.x + x,
                        y: firstTileIndex.y + y
                    };

                    var screenPoint = this.indexToPoint(index);
                    // baseOffset
                    var point = screenPoint.clone().subtract(this._basePoint);
                    var tile = this._createTile(this.locator.locationToLayer(this.center), {
                        screenPoint: screenPoint,
                        point: point,
                        index: index,
                        zoom: this.zoom,
                        url: urlTemplate({
                            zoom: this.zoom,
                            x: index.x,
                            y: index.y,
                            subdomain: this.subdomainText()
                        })
                    });

                    if (!tile.visible) {
                        this.element.append(tile.element);
                        tile.visible = true;
                    }
                }
            }
        }

    });

    var ImageTile = Class.extend({
        init: function(options) {
            this.element = $("<img style='position: absolute; display: block; visibility: visible;' unselectable='on'></img>");
            this.update(options);
            this.visible = false;
        },

        // rename this to load
        update: function(options) {
            var element = this.element;
            htmlElement = element[0];

            // consider to remove this
            if (htmlElement.style.visibility === "hidden") {
                htmlElement.style.visibility = "visible";
                htmlElement.style.display = "block";
            }

            htmlElement.setAttribute("src", options.url);
            this.url = options.url;

            htmlElement.style.top = renderSize(options.point.y);
            htmlElement.style.left = renderSize(options.point.x);
            this.point = options.point;

            this.screenPoint = options.screenPoint;
            this.index = options.index;
            this.id = "x:" + this.index.x + "y:" + this.index.y + "zoom:" + options.zoom;
            this.visible = true;
        },

        // rename this to unload
        clear: function() {
            this.element[0].style.visibility = "hidden";
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

        clear: function() {
            var items = this._items,
                i;

            for (i = 0; i < items.length; i++) {
                items[i].clear();
            }
        },

        // rename destroy
        destroy: function() {
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
            return "x:" + options.index.x + "y:" + options.index.y + "zoom:" + options.zoom;
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
