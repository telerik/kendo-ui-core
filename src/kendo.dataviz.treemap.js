(function(f, define){
    define([ "./kendo.data", "./kendo.userevents", "./kendo.dataviz.core" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.treeMap",
    name: "TreeMap",
    category: "dataviz",
    description: "",
    depends: [ "data", "userevents", "dataviz.core" ]
};

(function($, undefined) {
    var math = Math,

        proxy = $.proxy,

        kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        template = kendo.template,
        deepExtend = kendo.deepExtend,
        HierarchicalDataSource = kendo.data.HierarchicalDataSource,
        getter = kendo.getter,

        dataviz = kendo.dataviz;

    var NS = ".kendoTreeMap",
        CHANGE = "change",
        DATA_BOUND = "dataBound",
        ITEM_CREATED = "itemCreated",
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        MOUSEOVER_NS = "mouseover" + NS,
        MOUSELEAVE_NS = "mouseleave" + NS,
        UNDEFINED = "undefined";

    var TreeMap = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.bind(this.events, this.options);

            this.element.addClass("k-widget k-treemap");

            if (this.options.type === "horizontal") {
                this.src = new SliceAndDice(false);
            } else if (this.options.type === "vertical") {
                this.src = new SliceAndDice(true);
            } else {
                this.src = new Squarified();
            }

            this.view = new SquarifiedView(this, this.options);

            this._initDataSource();

            this._attachEvents();

            kendo.notify(this, dataviz.ui);
        },

        options: {
            name: "TreeMap",
            autoBind: true,
            colors: []
        },

        events: [DATA_BOUND, ITEM_CREATED],

        _attachEvents: function() {
            this.element
                .on(MOUSEOVER_NS, proxy(this._mouseover, this))
                .on(MOUSELEAVE_NS, proxy(this._mouseleave, this));
        },

        _initDataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            that._dataChangeHandler = proxy(that._onDataChange, that);

            that.dataSource = HierarchicalDataSource
                .create(dataSource)
                .bind(CHANGE, that._dataChangeHandler);

            if (dataSource) {
                if (that.options.autoBind) {
                    that.dataSource.fetch();
                }
            }
        },

        _onDataChange: function(e) {
            var node = e.node;
            var items = e.items;
            var options = this.options;
            var item, i, colors;

            if (!node) {
                this._items = [];
                item = this._wrapItem(items[0]);
                item.coord = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: 0,
                    left: 0
                };
                this._items.push(item);
                this.view.createRoot(item);
                // Reference of the root
                this._root = item;
            } else {
                if (items.length) {
                    var root = this._getByUid(node.uid);
                    root.children = [];

                    if (!defined(root.minColor) && !defined(root.maxColor)) {
                        colors = options.colors;
                    } else {
                        colors = colorsByLength(root.minColor, root.maxColor, items.length);
                    }

                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        root.children.push(this._wrapItem(item));
                    }

                    var htmlSize = this.view.htmlSize(root);
                    this.src.compute(root, root.coord, htmlSize);

                    for (i = 0; i < root.children.length; i++) {
                        item = root.children[i];
                        if (!defined(item.color)) {
                            if (typeof(colors[0]) === "string") {
                                item.color = colors[i % colors.length];
                            } else {
                                var currentColors = colors[i % colors.length];
                                if (currentColors) {
                                    item.color = currentColors[0];
                                    item.minColor = currentColors[0];
                                    item.maxColor = currentColors[1];
                                }
                            }
                        }
                    }

                    this.view.render(root);
                }
            }

            for (i = 0; i < items.length; i++) {
                items[i].load();
            }

            this.trigger(DATA_BOUND);
        },

        _contentSize: function(root) {
            this.view.renderHeight(root);
        },

        _wrapItem: function(item) {
            var wrap = {};

            if (defined(this.options.valueField)) {
                wrap.value = getField(this.options.valueField, item);
            }

            if (defined(this.options.colorField)) {
                wrap.color = getField(this.options.colorField, item);
            }

            if (defined(this.options.textField)) {
                wrap.text = getField(this.options.textField, item);
            }

            wrap.level = item.level();

            wrap.dataItem = item;

            return wrap;
        },

        _getByUid: function(uid) {
            function recursiveGetByUid(root) {
                if (root.dataItem.uid === uid) {
                    return root;
                } else {
                    var children = root.children;
                    if (children) {
                        for (var i = 0; i < children.length; i++) {
                            var item = children[i];
                            if (item.dataItem.uid === uid) {
                                return item;
                            } else {
                                recursiveGetByUid(item);
                            }
                        }
                    }
                }
            }

            return recursiveGetByUid(this._root);
        },

        dataItem: function(node) {
            var uid = $(node).attr(kendo.attr("uid")),
                dataSource = this.dataSource;

            return dataSource && dataSource.getByUid(uid);
        },

        findByUid: function(uid) {
            return this.element.find(".k-treemap-tile[" + kendo.attr("uid") + "=" + uid + "]");
        },

        _mouseover: function(e) {
            var target = $(e.target);
            if (target.hasClass("k-leaf")) {
                this._removeActiveState();
                target
                    .removeClass("k-state-hover")
                    .addClass("k-state-hover");
            }
        },

        _removeActiveState: function() {
            this.element
                .find(".k-state-hover")
                .removeClass("k-state-hover");
        },

        _mouseleave: function() {
            this._removeActiveState();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.element.off(NS);

            if (this.dataSource) {
                this.dataSource.unbind(CHANGE, this._dataChangeHandler);
            }

            kendo.destroy(this.element);
        }
    });

    var Squarified = Class.extend({
        leaf: function(tree) {
            return !tree.children;
        },

        layoutChildren: function(parent, items, coord) {
            var parentArea = coord.width * coord.height;
            var totalArea = 0,
                itemsArea = [],
                i;

            for (i = 0; i < items.length; i++) {
                itemsArea[i] = parseFloat(items[i].value);
                totalArea += itemsArea[i];
            }

            for (i = 0; i < itemsArea.length; i++) {
                items[i]._area = parentArea * itemsArea[i] / totalArea;
            }

            var minimumSideValue = this.layoutHorizontal() ? coord.height : coord.width;
            items.sort(function(a, b) { return (a._area <= b._area) - (a._area >= b._area); });
            var firstElement = [items[0]];
            var tail = items.slice(1);
            this.squarify(tail, firstElement, minimumSideValue, coord);
        },

        squarify: function(tail, initElement, width, coord) {
            this.computeDim(tail, initElement, width, coord);
        },

        computeDim: function(tail, initElement, width, coord) {
            if (tail.length + initElement.length == 1) {
                var element = tail.length == 1 ? tail : initElement;
                this.layoutLast(element, width, coord);
                return;
            }

            if (tail.length >= 2 && initElement.length === 0) {
                initElement = [tail[0]];
                tail = tail.slice(1);
            }

            if (tail.length === 0) {
                if (initElement.length > 0) {
                    this.layoutRow(initElement, width, coord);
                }
                return;
            }

            var firstElement = tail[0];

            if (this.worstAspectRatio(initElement, width) >= this.worstAspectRatio([firstElement].concat(initElement), width)) {
                this.computeDim(tail.slice(1), initElement.concat([firstElement]), width, coord);
            } else {
                var newCoords = this.layoutRow(initElement, width, coord);
                this.computeDim(tail, [], newCoords.dim, newCoords);
            }
        },

        layoutLast: function(items, w, coord) {
            items[0].coord = coord;
        },

        layoutRow: function(items, width, coord) {
            if (this.layoutHorizontal()) {
                return this.layoutV(items, width, coord);
            } else {
                return this.layoutH(items, width, coord);
            }
        },

        orientation: "h",

        layoutVertical: function() {
            return this.orientation === "v";
        },

        layoutHorizontal: function() {
            return this.orientation === "h";
        },

        layoutChange: function() {
            this.orientation = this.layoutVertical() ? "h" : "v";
        },

        worstAspectRatio: function(items, width) {
            if (!items || items.length === 0) {
                return MAX_VALUE;
            }

            var areaSum = 0,
                maxArea = 0,
                minArea = MAX_VALUE;

            for (var i = 0; i < items.length; i++) {
                var area = items[i]._area;
                areaSum += area;
                minArea = (minArea < area) ? minArea : area;
                maxArea = (maxArea > area) ? maxArea : area;
            }

            return math.max(
                (width * width * maxArea) / (areaSum * areaSum),
                (areaSum * areaSum) / (width * width * minArea)
            );
        },

        compute: function(data, rootCoord, htmlSize) {
            if (!(rootCoord.width >= rootCoord.height && this.layoutHorizontal())) {
                this.layoutChange();
            }

            var children = data.children;
            if (children && children.length > 0) {
                var newRootCoord = {
                    width: rootCoord.width,
                    height: rootCoord.height - htmlSize.text,
                    top: 0,
                    left: 0
                };

                this.layoutChildren(data, children, newRootCoord);
            }
        },

        layoutV: function(items, width, coord) {
            var totalArea = this._totalArea(items),
                top =  0;

            width = math.round(totalArea / width);

            for (var i = 0; i < items.length; i++) {
                var height = math.round(items[i]._area / width);
                items[i].coord = {
                    height: height,
                    width: width,
                    top: coord.top + top,
                    left: coord.left
                };

                top += height;
            }

            var ans = {
                height: coord.height,
                width: coord.width - width,
                top: coord.top,
                left: coord.left + width
            };

            ans.dim = math.min(ans.width, ans.height);

            if (ans.dim != ans.height) {
                this.layoutChange();
            }

            return ans;
        },

        layoutH: function(items, width, coord) {
            var totalArea = this._totalArea(items);

            var height = math.round(totalArea / width),
                top = coord.top,
                left = 0;

            for (var i=0; i<items.length; i++) {
                items[i].coord = {
                    height: height,
                    width: math.round(items[i]._area / height),
                    top: top,
                    left: coord.left + left
                };
                left += items[i].coord.width;
            }

            var ans = {
                height: coord.height - height,
                width: coord.width,
                top: coord.top + height,
                left: coord.left
            };

            ans.dim = math.min(ans.width, ans.height);

            if (ans.dim != ans.width) {
                this.layoutChange();
            }

            return ans;
        },

        _totalArea: function(items) {
            var total = 0;

            for (var i = 0; i < items.length; i++) {
                total += items[i]._area;
            }

            return total;
        }
    });

    var SquarifiedView = Class.extend({
        init: function(treeMap, options) {
            this.options = deepExtend({}, this.options, options);
            this.treeMap = treeMap;
            this.element = $(treeMap.element);

            this.offset = 0;
        },

        htmlSize: function(root) {
            var rootElement = this._getByUid(root.dataItem.uid);
            var htmlSize = {
                text: 0,
                offset: 0
            };

            if (root.children) {
                this._clean(rootElement);

                var text = this._getText(root);
                if (text) {
                    var title = this._createTitle(root);
                    rootElement
                        .append(title);

                    htmlSize.text = title.height();
                }

                rootElement.append(this._createWrap());

                this.offset = (rootElement.outerWidth() - rootElement.innerWidth()) / 2;
            }

            return htmlSize;
        },

        _getByUid: function(uid) {
            return this.element.find(".k-treemap-tile[" + kendo.attr("uid") + "=" + uid + "]");
        },

        render: function(root) {
            var rootElement = this._getByUid(root.dataItem.uid);
            var children = root.children;
            if (children) {
                var rootWrap = rootElement.find(".k-treemap-wrap");

                for (var i = 0; i < children.length; i++) {
                    var leaf = children[i];
                    var htmlElement = this._createLeaf(leaf);
                    rootWrap.append(htmlElement);
                    this.treeMap.trigger(ITEM_CREATED, {
                        element: htmlElement
                    });
                }
            }
        },

        createRoot: function(root) {
            var htmlElement = this._createLeaf(root);
            this.element.append(htmlElement);

            this.treeMap.trigger(ITEM_CREATED, {
                element: htmlElement
            });
        },

        _clean: function(root) {
            root.css("background-color", "");
            root.removeClass("k-leaf");
            root.empty();
        },

        _createLeaf: function(item) {
            var element = this._createTile(item);
            element.addClass("k-leaf");

            if (defined(this.options.template)) {
                element.append($(this._renderTemplate(item)));
            } else {
                element
                    .text(this._getText(item))
                    .css("background-color", item.color)
                    .toggleClass(
                        "k-tile-inverse",
                        this._tileColorBrightness(item) > 180
                    );
            }

            return element;
        },

        _createTile: function(item) {
            var newCoord = {
                width: item.coord.width,
                height: item.coord.height,
                left: item.coord.left,
                top: item.coord.top
            };

            if (newCoord.left && this.offset) {
                newCoord.left -= this.offset;
                newCoord.width += this.offset * 2;
            } else {
                newCoord.width += this.offset;
            }

            if (newCoord.top) {
                newCoord.top -= this.offset;
                newCoord.height += this.offset * 2;
            } else {
                newCoord.height += this.offset;
            }

            var tile = $("<div class='k-treemap-tile'></div>")
                .css({
                    width: newCoord.width,
                    height: newCoord.height,
                    left: newCoord.left,
                    top: newCoord.top
                });

            if (defined(item.dataItem) && defined(item.dataItem.uid)) {
                tile.attr(kendo.attr("uid"), item.dataItem.uid);
            }

            return tile;
        },

        _getText: function(item) {
            var text = item.text;

            if (this.options.template) {
                text = this._renderTemplate(item);
            }

            return text;
        },

        _renderTemplate: function(item) {
            var titleTemplate = template(this.options.template);
            return titleTemplate({
                dataItem: item.dataItem,
                text: item.text
            });
        },

        _createTitle: function(item) {
            return $("<div class='k-treemap-title'></div>")
                .text(this._getText(item));
        },

        _createWrap: function() {
            return $("<div class='k-treemap-wrap'></div>");
        },

        _tileColorBrightness: function(item) {
            var brightness = 0;
            if (item.color) {
                var color = rgbToDecimal(item.color);
                brightness = math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
            }

            return brightness;
        }
    });

    var SliceAndDice = Class.extend({
        init: function(isVertical) {
            this.quotient = isVertical ? 1 : 0;
        },

        compute: function(root, rootCoord, htmlSize) {
            var children = root.children;
            if (children && children.length > 0) {
                var newRootCoord = {
                    width: rootCoord.width,
                    height: rootCoord.height - htmlSize.text,
                    top: 0,
                    left: 0
                };

                this.layoutChildren(children, newRootCoord);
            }
        },

        layoutChildren: function(items, coord) {
            var parentArea = coord.width * coord.height;
            var totalArea = 0;
            var itemsArea = [];

            for (i = 0; i < items.length; i++) {
                itemsArea[i] = parseFloat(items[i].value);
                totalArea += itemsArea[i];
            }

            for (i = 0; i < itemsArea.length; i++) {
                items[i]._area = parentArea * itemsArea[i] / totalArea;
            }

            this.sliceAndDice(items, coord);
        },

        sliceAndDice: function(items, coord) {
            var totalArea = this._totalArea(items);
            if (items[0].level % 2 === this.quotient) {
                this.layoutVertical(items, coord, totalArea);
            } else {
                this.layoutHorizontal(items, coord, totalArea);
            }
        },

        layoutHorizontal: function(items, coord, totalArea) {
            var left = 0;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var width = item._area / (totalArea / coord.width);
                item.coord = {
                    height: coord.height,
                    width: width,
                    top: coord.top,
                    left: coord.left + left
                };

                left += width;
            }
        },

        layoutVertical: function(items, coord, totalArea) {
            var top = 0;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var height = item._area / (totalArea / coord.height);
                item.coord = {
                    height: height,
                    width: coord.width,
                    top: coord.top + top,
                    left: coord.left
                };

                top += height;
            }
        },

        _totalArea: function(items) {
            var total = 0;

            for (var i = 0; i < items.length; i++) {
                total += items[i]._area;
            }

            return total;
        }
    });

    function valueOrDefault(value, defaultValue) {
        return defined(value) ? value : defaultValue;
    }

    function getField(field, row) {
        if (row === null) {
            return row;
        }

        var get = getter(field, true);
        return get(row);
    }

    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function colorsByLength(min, max, length) {
        var minRGBtoDecimal = rgbToDecimal(min);
        var maxRGBtoDecimal = rgbToDecimal(max);
        var colors = [];

        colors.push(min);

        for (var i = 0; i < length; i++) {
            var rgbColor = {
                r: colorByIndex(minRGBtoDecimal.r, maxRGBtoDecimal.r, i, length),
                g: colorByIndex(minRGBtoDecimal.g, maxRGBtoDecimal.g, i, length),
                b: colorByIndex(minRGBtoDecimal.b, maxRGBtoDecimal.b, i, length)
            };
            colors.push(buildColorFromRGB(rgbColor));
        }

        colors.push(max);

        return colors;
    }

    function colorByIndex(min, max, index, length) {
        min = math.min(math.abs(min), math.abs(max));
        max = math.max(math.abs(min), math.abs(max));
        var step = (max - min) / (length + 1);
        var currentStep = step * (index + 1);

        return min + currentStep;
    }

    function buildColorFromRGB(color) {
        return "#" + decimalToRgb(color.r) + decimalToRgb(color.g) + decimalToRgb(color.b);
    }

    function rgbToDecimal(color) {
        color = color.replace("#", "");
        var rgbColor = colorToRGB(color);

        return {
            r: rgbToHex(rgbColor.r),
            g: rgbToHex(rgbColor.g),
            b: rgbToHex(rgbColor.b)
        };
    }

    function decimalToRgb(number) {
        var result = math.round(number).toString(16).toUpperCase();

        if (result.length === 1) {
            result = "0" + result;
        }

        return result;
    }

    function colorToRGB(color) {
        var colorLength = color.length;
        var rgbColor = {};
        if (colorLength === 3) {
            rgbColor.r = color[0];
            rgbColor.g = color[1];
            rgbColor.b = color[2];
        } else {
            rgbColor.r = color.substring(0, 2);
            rgbColor.g = color.substring(2, 4);
            rgbColor.b = color.substring(4, 6);
        }

        return rgbColor;
    }

    function rgbToHex(rgb) {
        return parseInt(rgb.toString(16), 16);
    }

    dataviz.ui.plugin(TreeMap);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
