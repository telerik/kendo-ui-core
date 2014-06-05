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

        dataviz = kendo.dataviz;

    var NS = ".kendoTreeMap",
        CHANGE = "change",
        DATA_BOUND = "dataBound",
        MAX_VALUE = Number.MAX_Value,
        MIN_VALUE = -Number.MAX_Value,
        math = Math;

    var TreeMap = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.bind(this.events, this.options);

            this._initDataSource();

            kendo.notify(this, dataviz.ui);
        },

        options: {
            name: "TreeMap",
            autoBind: true,
            maxViewDepth: 2
        },

        events: [DATA_BOUND, "itemCreated", "zoom"],

        _initDataSource: function() {
            var options = this.options,
                dataSource = options.dataSource;

            this._items = [];

            this._dataChangeHandler = proxy(this._onDataChange, this);

            this.dataSource = HierarchicalDataSource
                .create(dataSource)
                .bind(CHANGE, this._dataChangeHandler);

            function recursiveRead(data) {
                for (var i = 0; i < data.length; i++) {
                    var node = data[i];
                    if (node.level() < options.maxViewDepth) {
                        node._initChildren();

                        node.children.fetch();

                        recursiveRead(node.children.view());
                    }
                }
            }

            if (dataSource) {
                if (this.options.autoBind) {
                    this.dataSource.fetch();

                    recursiveRead(this.dataSource.view());
                }
            }
        },

        _onDataChange: function(e) {
            var node = e.node;
            var items = e.items;
            var options = this.options;

            this._append(node, items);

            this.trigger(DATA_BOUND);
        },

        _append: function(parent, children) {
            this._addItem(parent);
            for (var i = 0; i < children.length; i++) {
                var node = children[i];
                this._addItem(node);
            }
        },

        _addItem: function(item) {
            if (item) {
                for (var i = 0; i < this._items.length; i++) {
                    var currentItem = this._items[i];
                    if (currentItem.uid === item.uid) {
                        return;
                    }
                };

                this._items.push(item);
            }
        }
    });

    dataviz.ui.plugin(TreeMap);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
