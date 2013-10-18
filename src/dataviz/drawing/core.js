(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,
        ObservableObject = kendo.data.ObservableObject,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        append = dataviz.append;

    // Constants ==============================================================
    var CHANGE = "change";

    // Stage node ============================================================
    var BaseNode = Class.extend({
        init: function(srcElement) {
            var node = this;

            node.childNodes = [];

            this.parent = null;

            if (srcElement) {
                node.srcElement = srcElement;
                srcElement.observer = node;
            }
        },

        notify: function(e) {
            if (e.event === "childrenChange") {
                this._syncChildren(e);
            }

            if (e.event === "optionsChange") {
                this._syncOptions(e);
            }

            this.change();
        },

        change: function() {
            if (this.parent) {
                this.parent.change();
            }
        },

        load: noop,

        unload: noop,

        empty: function() {
            this.unload(0, this.childNodes.length);
        },

        _syncOptions: noop,

        _syncChildren: function(e) {
            if (e.action === "add") {
                // TODO: Support mid-array inserts
                this.load(e.items);
            } else if (e.action === "remove") {
                this.unload(e.index, e.items.length);
            }
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            BaseNode: BaseNode
        }
    });

})(window.kendo.jQuery);
