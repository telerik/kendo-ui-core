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

        load: noop,

        unload: noop,

        empty: function() {
            this.unload(0, this.childNodes.length);
        },

        invalidate: function() {
            if (this.parent) {
                this.parent.invalidate();
            }
        },

        geometryChange: function(e) {
            this.invalidate();
        },

        optionsChange: function(e) {
            this.invalidate();
        },

        childrenChange: function(e) {
            if (e.action === "add") {
                // TODO: Support mid-array inserts
                this.load(e.items);
            } else if (e.action === "remove") {
                this.unload(e.index, e.items.length);
            }

            this.invalidate();
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            BaseNode: BaseNode
        }
    });

})(window.kendo.jQuery);
