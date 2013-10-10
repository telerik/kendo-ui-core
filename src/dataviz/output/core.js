(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,

        kendo = window.kendo,
        ObservableObject = kendo.data.ObservableObject,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz;

    // Constants ==============================================================
    var CHANGE = "change";

    // Stage node ============================================================
    var BaseNode = ObservableObject.extend({
        init: function(srcElement) {
            var node = this;

            node.childNodes = [];
            ObservableObject.fn.init.call(node, node);

            node.childNodes.bind(CHANGE, proxy(node._childNodesChange, node));

            if (srcElement) {
                node.srcElement = srcElement;
                srcElement.options.bind(CHANGE, proxy(node._syncOptions, node));

                if (srcElement.children) {
                    srcElement.children.bind(CHANGE, proxy(node._syncChildren, node));
                }
            }
        },

        load: noop,

        _childNodesChange: noop,

        _syncOptions: noop,

        _syncChildren: function(e) {
            var node = this;

            // TODO: Test different scenarios for synchronization
            if (e.action === "add") {
                node.load(e.items);
            } else if (e.action === "remove") {
                node.childNodes.splice(e.index, e.items.length);
            }

            this.trigger(CHANGE);
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        output: {
            BaseNode: BaseNode
        }
    });

})(window.kendo.jQuery);
