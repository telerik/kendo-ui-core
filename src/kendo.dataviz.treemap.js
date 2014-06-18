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
        MAX_VALUE = Number.MAX_VALUE,
        MIN_VALUE = -Number.MAX_VALUE,
        UNDEFINED = "undefined";

    var TreeMap = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.bind(this.events, this.options);

            this.element.addClass("k-widget k-treemap");

            this.view = new SquarifiedView(element, this.options);

            if (this.options.title.visible) {
                this.options.title._height = this.view._getTitleHeight();
            }

            this.src = new Squarified(this.options);

            this._initDataSource();

            kendo.notify(this, dataviz.ui);
        },

        options: {
            name: "TreeMap",
            autoBind: true,
            title: {
                visible: true
            }
        },

        events: [DATA_BOUND, "itemCreated"],

        _initDataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            that._dataChangeHandler = proxy(that._onDataChange, that);

            that.dataSource = HierarchicalDataSource
                .create(dataSource)
                .bind(CHANGE, that._dataChangeHandler);

            function recursiveRead(data) {
                for (var i = 0; i < data.length; i++) {
                    var node = data[i];
                    node._initChildren();

                    node.children.fetch();

                    recursiveRead(node.children.view());
                }
            }

            if (dataSource) {
                if (that.options.autoBind) {
                    that.dataSource.fetch();

                    recursiveRead(that.dataSource.view());
                }
            }
        },

        _onDataChange: function(e) {
            var node = e.node;
            var items = e.items;
            var options = this.options;
            var item;

            if (!node) {
                this._items = [];
                item = this._wrapItem(items[0]);
                item.coord = {
                    width: this.element.innerWidth(),
                    height: this.element.innerHeight(),
                    top: 0,
                    left: 0
                };
                this._items.push(item);
                // Reference of the root
                this._root = item;
            } else {
                if (items.length) {
                    var root = this._getByUid(node.uid);
                    root.children = [];
                    for (var i = 0; i < items.length; i++) {
                        item = items[i];
                        root.children.push(this._wrapItem(item));
                    }
                    this.src.compute(root, root.coord);
                    this.view.render(root);
                }
            }

            this.trigger(DATA_BOUND);
        },

        _wrapItem: function(item) {
            var wrap = {};

            if (defined(this.options.valueField)) {
                wrap.value = getField(this.options.valueField, item);
            }

            if (defined(this.options.colorField)) {
                wrap.color = getField(this.options.colorField, item);
            }

            if (defined(this.options.titleField)) {
                wrap.title = getField(this.options.titleField, item);
            }

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
        }
    });

    var Squarified = Class.extend({
        init: function(options) {
            this.options = deepExtend({}, this.options, options);
        },

        options: {
            offset: 0
        },

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

        compute: function(data, rootCoord) {
            var options = this.options;

            if (!(rootCoord.width >= rootCoord.height && this.layoutHorizontal())) {
                this.layoutChange();
            }

            var children = data.children;
            if (children && children.length > 0) {
                var newRootCoord = {
                    width: rootCoord.width - options.offset,
                    height: rootCoord.height - options.offset,
                    top: 0,
                    left: 0
                };

                if (options.title.visible) {
                    newRootCoord.height -= options.title._height;
                }
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
        init: function(element, options) {
            this.options = deepExtend({}, this.options, options);
            this.element = $(element);
        },

        _getTitleHeight: function() {
            var leaf = this._createLeaf({
                coord: {}
            });
            leaf.css({
                visibility: "hidden",
                position: "absolute"
            }).append(this._createTitle({
                title: "a"
            }));
            this.element.append(leaf);
            var titleHeight = leaf.children().height();
            this.element.empty();
            return titleHeight;
        },

        _getByUid: function(uid) {
            return this.element.find(".k-treemap-tile[" + kendo.attr("uid") + "=" + uid + "]");
        },

        render: function(root) {
            var rootElement = this._getByUid(root.dataItem.uid);
            if (!rootElement.length) {
                rootElement = this._createLeaf(root);
                this.element.append(rootElement);
            }

            var children = root.children;
            if (children) {
                this._clean(rootElement);
                var rootWrap = this._createWrap(root);

                for (var i = 0; i < children.length; i++) {
                    var leaf = children[i];
                    rootWrap.append(this._createLeaf(leaf));
                }

                rootElement
                    .append(this._createTitle(root))
                    .append(rootWrap);
            }
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
                var rootTemplate = template(this.options.template);
                element.append($(rootTemplate({
                    dataItem: item.dataItem,
                    title: item.title
                })));
            } else {
                element
                    .text(this._getTitleText(item))
                    .css("background-color", valueOrDefault(item.color, getRandomColor()));
            }

            return element;
        },

        _createTile: function(item) {
            var root = $("<div class='k-treemap-tile k-state-default'></div>")
                .width(item.coord.width)
                .height(item.coord.height)
                .offset({
                    left: item.coord.left,
                    top: item.coord.top
                });

            if (defined(item.dataItem) && defined(item.dataItem.uid)) {
                root.attr(kendo.attr("uid"), item.dataItem.uid);
            }

            return root;
        },

        _getTitleText: function(item) {
            var text = item.title;

            if (this.options.titleTemplate) {
                var titleTemplate = template(this.options.title.template);
                text = titleTemplate({
                    dataItem: item.dataItem,
                    title: item.title
                });
            }

            return text;
        },

        _createTitle: function(item) {
            if (this.options.title.visible) {
                return $("<div class='k-treemap-title k-state-default'></div>")
                                .text(this._getTitleText(item));
            }
        },

        _createWrap: function(item) {
            return $("<div class='k-treemap-wrap k-state-default'></div>");
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

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[math.floor(math.random() * 16)];
        }
        return color;
    }

    dataviz.ui.plugin(TreeMap);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
