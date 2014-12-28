(function(f, define){
    define([ "./kendo.data", "./kendo.userevents", "./kendo.dataviz.themes" ], f);
})(function(){

var __meta__ = {
    id: "dataviz.treeMap",
    name: "TreeMap",
    category: "dataviz",
    description: "The Kendo DataViz TreeMap",
    depends: [ "data", "userevents", "dataviz.themes" ]
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
            kendo.destroy(element);
            $(element).empty();

            Widget.fn.init.call(this, element, options);

            this._initTheme(this.options);

            this.element.addClass("k-widget k-treemap");

            this._setLayout();

            this._originalOptions = deepExtend({}, this.options);

            this._initDataSource();

            this._attachEvents();

            kendo.notify(this, dataviz.ui);
        },

        options: {
            name: "TreeMap",
            theme: "default",
            autoBind: true,
            textField: "text",
            valueField: "value",
            colorField: "color"
        },

        events: [DATA_BOUND, ITEM_CREATED],

        _initTheme: function(options) {
            var that = this,
                themes = dataviz.ui.themes || {},
                themeName = ((options || {}).theme || "").toLowerCase(),
                themeOptions = (themes[themeName] || {}).treeMap;

            that.options = deepExtend({}, themeOptions, options);
        },

        _attachEvents: function() {
            this.element
                .on(MOUSEOVER_NS, proxy(this._mouseover, this))
                .on(MOUSELEAVE_NS, proxy(this._mouseleave, this));
        },

        _setLayout: function() {
            if (this.options.type === "horizontal") {
                this._layout = new SliceAndDice(false);
                this._view = new SliceAndDiceView(this, this.options);
            } else if (this.options.type === "vertical") {
                this._layout = new SliceAndDice(true);
                this._view = new SliceAndDiceView(this, this.options);
            } else {
                this._layout = new Squarified();
                this._view = new SquarifiedView(this, this.options);
            }
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

        setDataSource: function(dataSource) {
            var that = this;
            that.dataSource.unbind(CHANGE, that._dataChangeHandler);
            that.dataSource = dataSource
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
                this.element.empty();
                item = this._wrapItem(items[0]);
                this._layout.createRoot(
                    item,
                    this.element.outerWidth(),
                    this.element.outerHeight(),
                    this.options.type === "vertical"
                );
                this._view.createRoot(item);
                // Reference of the root
                this._root = item;
            } else {
                if (items.length) {
                    var root = this._getByUid(node.uid);
                    root.children = [];

                    if (!defined(root.minColor) && !defined(root.maxColor)) {
                        colors = options.colors || [];
                    } else {
                        colors = colorsByLength(root.minColor, root.maxColor, items.length) || [];
                    }

                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        root.children.push(this._wrapItem(item));
                    }

                    var htmlSize = this._view.htmlSize(root);
                    this._layout.compute(root.children, root.coord, htmlSize);

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

                    this._view.render(root);
                }
            }

            for (i = 0; i < items.length; i++) {
                items[i].load();
            }

            if (node) {
                this.trigger(DATA_BOUND, {
                    node: node
                });
            }
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
            var items = [this._root];
            var item;

            while (items.length) {
                item = items.pop();
                if (item.dataItem.uid === uid) {
                    return item;
                }

                if (item.children) {
                    items = items.concat(item.children);
                }
            }
        },

        dataItem: function(node) {
            var uid = $(node).attr(kendo.attr("uid")),
                dataSource = this.dataSource;

            return dataSource && dataSource.getByUid(uid);
        },

        findByUid: function(uid) {
            return this.element.find(".k-treemap-tile[" + kendo.attr("uid") + "='" + uid + "']");
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

            this._root = null;

            kendo.destroy(this.element);
        },

        items: function() {
            return $();
        },

        getSize: function() {
            return kendo.dimensions(this.element);
        },

        _resize: function() {
            this.dataSource.fetch();
        },

        setOptions: function(options) {
            var dataSource = options.dataSource;

            options.dataSource = undefined;
            this._originalOptions = deepExtend(this._originalOptions, options);
            this.options = deepExtend({}, this._originalOptions);
            this._setLayout();
            this._initTheme(this.options);

            Widget.fn._setEvents.call(this, options);

            if (dataSource) {
                this.setDataSource(HierarchicalDataSource.create(dataSource));
            }

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        }
    });

    var Squarified = Class.extend({
        createRoot: function(root, width, height) {
            root.coord = {
                width: width,
                height: height,
                top: 0,
                left: 0
            };
        },

        leaf: function(tree) {
            return !tree.children;
        },

        layoutChildren: function(items, coord) {
            var parentArea = coord.width * coord.height;
            var totalArea = 0,
                itemsArea = [],
                i;

            for (i = 0; i < items.length; i++) {
                itemsArea[i] = parseFloat(items[i].value);
                totalArea += itemsArea[i];
            }

            for (i = 0; i < itemsArea.length; i++) {
                items[i].area = parentArea * itemsArea[i] / totalArea;
            }

            var minimumSideValue = this.layoutHorizontal() ? coord.height : coord.width;

            items = new kendo.data.Query(items)._sortForGrouping("value", "desc");
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
                var area = items[i].area;
                areaSum += area;
                minArea = (minArea < area) ? minArea : area;
                maxArea = (maxArea > area) ? maxArea : area;
            }

            return math.max(
                (width * width * maxArea) / (areaSum * areaSum),
                (areaSum * areaSum) / (width * width * minArea)
            );
        },

        compute: function(children, rootCoord, htmlSize) {
            if (!(rootCoord.width >= rootCoord.height && this.layoutHorizontal())) {
                this.layoutChange();
            }

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

        layoutV: function(items, width, coord) {
            var totalArea = this._totalArea(items),
                top =  0;

            width = round(totalArea / width);

            for (var i = 0; i < items.length; i++) {
                var height = round(items[i].area / width);
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

            var height = round(totalArea / width),
                top = coord.top,
                left = 0;

            for (var i=0; i<items.length; i++) {
                items[i].coord = {
                    height: height,
                    width: round(items[i].area / height),
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
                total += items[i].area;
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
                text: 0
            };

            if (root.children) {
                this._clean(rootElement);

                var text = this._getText(root);
                if (text) {
                    var title = this._createTitle(root);
                    rootElement.append(title);

                    htmlSize.text = title.height();
                }

                rootElement.append(this._createWrap());

                this.offset = (rootElement.outerWidth() - rootElement.innerWidth()) / 2;
            }

            return htmlSize;
        },

        _getByUid: function(uid) {
            return this.element.find(".k-treemap-tile[" + kendo.attr("uid") + "='" + uid + "']");
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
            root.removeClass("k-inverse");
            root.empty();
        },

        _createLeaf: function(item) {
            return this._createTile(item)
                    .css("background-color", item.color)
                    .addClass("k-leaf")
                    .toggleClass(
                        "k-inverse",
                        this._tileColorBrightness(item) > 180
                    )
                    .append($("<div></div>")
                    .html(this._getText(item)));
        },

        _createTile: function(item) {
            var newCoord = {
                width: item.coord.width,
                height: item.coord.height,
                left: item.coord.left,
                top: item.coord.top
            };

            if (newCoord.left && this.offset) {
                newCoord.width += this.offset * 2;
            } else {
                newCoord.width += this.offset;
            }

            if (newCoord.top) {
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
                    .append($("<div></div>").html(this._getText(item)));
        },

        _createWrap: function() {
            return $("<div class='k-treemap-wrap'></div>");
        },

        _tileColorBrightness: function(item) {
            return colorBrightness(item.color);
        }
    });

    var SliceAndDice = Class.extend({
        createRoot: function(root, width, height, vertical) {
            root.coord = {
                width: width,
                height: height,
                top: 0,
                left: 0
            };
            root.vertical = vertical;
        },

        init: function(vertical) {
            this.vertical = vertical;
            this.quotient = vertical ? 1 : 0;
        },

        compute: function(children, rootCoord, htmlSize) {
            if (children.length > 0) {
                var width = rootCoord.width;
                var height = rootCoord.height;

                if (this.vertical) {
                    height -= htmlSize.text;
                } else {
                    width -= htmlSize.text;
                }

                var newRootCoord = {
                    width: width,
                    height: height,
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
            var i;

            for (i = 0; i < items.length; i++) {
                var item = items[i];
                itemsArea[i] = parseFloat(items[i].value);
                totalArea += itemsArea[i];
                item.vertical = this.vertical;
            }

            for (i = 0; i < itemsArea.length; i++) {
                items[i].area = parentArea * itemsArea[i] / totalArea;
            }

            items = new kendo.data.Query(items)._sortForGrouping("value", "desc");

            this.sliceAndDice(items, coord);
        },

        sliceAndDice: function(items, coord) {
            var totalArea = this._totalArea(items);
            if (items[0].level % 2 === this.quotient) {
                this.layoutHorizontal(items, coord, totalArea);
            } else {
                this.layoutVertical(items, coord, totalArea);
            }
        },

        layoutHorizontal: function(items, coord, totalArea) {
            var left = 0;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var width = item.area / (totalArea / coord.width);
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
                var height = item.area / (totalArea / coord.height);
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
                total += items[i].area;
            }

            return total;
        }
    });

    var SliceAndDiceView = SquarifiedView.extend({
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
                    rootElement.append(title);

                    if (root.vertical) {
                        htmlSize.text = title.height();
                    } else {
                        htmlSize.text = title.width();
                    }
                }

                rootElement.append(this._createWrap());

                this.offset = (rootElement.outerWidth() - rootElement.innerWidth()) / 2;
            }

            return htmlSize;
        },

        _createTitle: function(item) {
            var title;
            if (item.vertical) {
                title = $("<div class='k-treemap-title'></div>");
            } else {
                title = $("<div class='k-treemap-title-vertical'></div>");
            }

            return title.append($("<div></div>").html(this._getText(item)));
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
        var isDarker = colorBrightness(min) - colorBrightness(max) < 0;
        var colors = [];

        colors.push(min);

        for (var i = 0; i < length; i++) {
            var rgbColor = {
                r: colorByIndex(minRGBtoDecimal.r, maxRGBtoDecimal.r, i, length, isDarker),
                g: colorByIndex(minRGBtoDecimal.g, maxRGBtoDecimal.g, i, length, isDarker),
                b: colorByIndex(minRGBtoDecimal.b, maxRGBtoDecimal.b, i, length, isDarker)
            };
            colors.push(buildColorFromRGB(rgbColor));
        }

        colors.push(max);

        return colors;
    }

    function colorByIndex(min, max, index, length, isDarker) {
        var minColor = math.min(math.abs(min), math.abs(max));
        var maxColor = math.max(math.abs(min), math.abs(max));
        var step = (maxColor - minColor) / (length + 1);
        var currentStep = step * (index + 1);
        var color;

        if (isDarker) {
            color = minColor + currentStep;
        } else {
            color = maxColor - currentStep;
        }

        return color;
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

    function colorBrightness(color) {
        var brightness = 0;
        if (color) {
            color = rgbToDecimal(color);
            brightness = math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
        }

        return brightness;
    }

    function round(value) {
        var power = math.pow(10, 4);
        return math.round(value * power) / power;
    }

    dataviz.ui.plugin(TreeMap);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
