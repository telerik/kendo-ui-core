(function(f, define){
    define([ "../../../kendo.core", "../location" ], f);
})(function(){

(function ($, undefined) {
    // Imports ================================================================
    var proxy = $.proxy,
        noop = $.noop,

        kendo = window.kendo,
        Class = kendo.Class,

        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        defined = dataviz.defined,

        Extent = dataviz.map.Extent,

        util = dataviz.util,
        valueOrDefault = util.valueOrDefault;

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

            this._reset = proxy(this.reset, this);
            this._resize = proxy(this._resize, this);
            this._panEnd = proxy(this._panEnd, this);
            this._activate();

            this._updateAttribution();
        },

        destroy: function() {
            this._deactivate();
        },

        show: function() {
            this.reset();
            this._activate();
            this._applyExtent(true);
        },

        hide: function() {
            this._deactivate();
            this._setVisibility(false);
        },

        reset: function() {
            this._applyExtent();
        },

        _resize: $.noop,

        _panEnd: function() {
            this._applyExtent();
        },

        _applyExtent: function() {
            var options = this.options;

            var zoom = this.map.zoom();
            var matchMinZoom = !defined(options.minZoom) || zoom >= options.minZoom;
            var matchMaxZoom = !defined(options.maxZoom) || zoom <= options.maxZoom;

            var extent = Extent.create(options.extent);
            var inside = !extent || extent.overlaps(this.map.extent());

            this._setVisibility(matchMinZoom && matchMaxZoom && inside);
        },

        _setVisibility: function(visible) {
            this.element.css("display", visible ? "" : "none");
        },

        _activate: function() {
            var map = this.map;
            map.bind("reset", this._reset);
            map.bind("resize", this._resize);
            map.bind("panEnd", this._panEnd);
        },

        _deactivate: function() {
            var map = this.map;
            map.unbind("reset", this._reset);
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
