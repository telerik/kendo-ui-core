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
            this._applyCoverage(true);
        },

        hide: function() {
            this._deactivate();
            this._setVisibility(false);
        },

        reset: function() {
            this._applyCoverage();
        },

        _resize: $.noop,

        _panEnd: function() {
            this._applyCoverage();
        },

        _applyCoverage: function() {
            var coverage = this.options.coverage;
            var inCoverage = true;
            if (coverage) {
                var zoom = this.map.zoom();
                var extent = this.map.extent();

                for (var i = 0; i < coverage.length; i++) {
                    var rule = coverage[i];

                    var below = defined(rule.minZoom) && zoom < rule.minZoom;
                    var above = defined(rule.maxZoom) && zoom > rule.maxZoom;

                    var ruleExtent = Extent.create(rule.extent);
                    var outside = ruleExtent && !ruleExtent.overlaps(extent);

                    if (below || above || outside) {
                        inCoverage = false;
                        break;
                    }
                }
            }

            this._setVisibility(inCoverage);
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
