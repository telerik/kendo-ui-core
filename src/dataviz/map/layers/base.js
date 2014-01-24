(function(f, define){
    define([ ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend;

    // Implementation =========================================================
    var Layer = Class.extend({
        init: function(map, options) {
            this._initOptions(options);
            this.map = map;

            this.element = $("<div class='k-layer'></div>")
               .css({
                   "zIndex": this.options.zIndex,
                   "opacity": this.options.opacity
               })
               .appendTo(map.scrollElement);

            this.reset = proxy(this.reset, this);
            this._resize = proxy(this._resize, this);
            this._activate();

            this._updateAttribution();
        },

        destroy: function() {
            this._deactivate();
        },

        show: function() {
            this.reset();
            this._activate();
            this.element.css("display", "");
        },

        hide: function() {
            this.element.css("display", "none");
            this._deactivate();
        },

        reset: $.noop,

        _resize: $.noop,

        _activate: function() {
            var map = this.map;
            map.bind("reset", this.reset);
            map.bind("resize", this._resize);
            map.bind("panEnd", this._panEnd);
        },

        _deactivate: function() {
            var map = this.map;
            map.unbind("reset", this.reset);
            map.unbind("resize", this._resize);
            map.unbind("panEnd", this._panEnd);
        },

        _updateAttribution: function() {
            var attr = this.map.attribution;

            if (attr) {
                attr.add(this.options.attribution);
            }
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        map: {
            layers: {
                Layer: Layer
            }
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
