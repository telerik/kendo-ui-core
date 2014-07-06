(function(f, define){
    define([ "./util" ], f);
})(function(){

(function ($) {

    // Imports =================================================================
    var doc = document,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        util = dataviz.util,
        defined = util.defined;

    // Constants ===============================================================
    var BASELINE_MARKER_SIZE = 1;

    // Text metrics calculations ===============================================
    var LRUCache = Class.extend({
        init: function(size) {
            this._size = size;
            this._length = 0;
            this._map = {};
        },

        put: function(key, value) {
            var lru = this,
                map = lru._map,
                entry = { key: key, value: value };

            map[key] = entry;

            if (!lru._head) {
                lru._head = lru._tail = entry;
            } else {
                lru._tail.newer = entry;
                entry.older = lru._tail;
                lru._tail = entry;
            }

            if (lru._length >= lru._size) {
                map[lru._head.key] = null;
                lru._head = lru._head.newer;
                lru._head.older = null;
            } else {
                lru._length++;
            }
        },

        get: function(key) {
            var lru = this,
                entry = lru._map[key];

            if (entry) {
                if (entry === lru._head && entry !== lru._tail) {
                    lru._head = entry.newer;
                    lru._head.older = null;
                }

                if (entry !== lru._tail) {
                    if (entry.older) {
                        entry.older.newer = entry.newer;
                        entry.newer.older = entry.older;
                    }

                    entry.older = lru._tail;
                    entry.newer = null;

                    lru._tail.newer = entry;
                    lru._tail = entry;
                }

                return entry.value;
            }
        }
    });

    var TextMetrics = Class.extend({
        init: function() {
            this._cache = new LRUCache(1000);
        },

        measure: function(text, style) {
            var styleKey = util.objectKey(style),
                cacheKey = util.hashKey(text + styleKey),
                cachedResult = this._cache.get(cacheKey);

            if (cachedResult) {
                return cachedResult;
            }

            var size = { width: 0, height: 0, baseline: 0 };

            var measureBox = this._measureBox,
                baselineMarker = this._baselineMarker.cloneNode(false);

            for (var key in style) {
                var value = style[key];
                if (defined(value)) {
                    measureBox.style[key] = value;
                }
            }

            measureBox.innerHTML = text;
            measureBox.appendChild(baselineMarker);
            doc.body.appendChild(measureBox);

            if ((text + "").length) {
                size.width = measureBox.offsetWidth - BASELINE_MARKER_SIZE;
                size.height = measureBox.offsetHeight;
                size.baseline = baselineMarker.offsetTop + BASELINE_MARKER_SIZE;
            }

            this._cache.put(cacheKey, size);

            measureBox.parentNode.removeChild(measureBox);

            return size;
        }
    });

    TextMetrics.fn._baselineMarker =
        $("<div class='k-baseline-marker' " +
          "style='display: inline-block; vertical-align: baseline;" +
          "width: " + BASELINE_MARKER_SIZE + "px; height: " + BASELINE_MARKER_SIZE + "px;" +
          "overflow: hidden;' />")[0];

    TextMetrics.fn._measureBox =
        $("<div style='position: absolute; top: -4000px; width: auto; height: auto;" +
                      "line-height: normal; visibility: hidden;' />")[0];

    TextMetrics.current = new TextMetrics();

    function measureText(text, style) {
        return TextMetrics.current.measure(text, style);
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        util: {
            TextMetrics: TextMetrics,
            LRUCache: LRUCache,

            measureText: measureText
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
