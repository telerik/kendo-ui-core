import "../kendo.core.js";
import { drawing } from "@progress/kendo-drawing";

(function($) {

window.kendo.util = window.kendo.util || {};
kendo.deepExtend(kendo.util, {
    LRUCache: drawing.util.LRUCache,
    TextMetrics: drawing.util.TextMetrics,
    measureText: drawing.util.measureText,
    objectKey: drawing.util.objectKey,
    hashKey: drawing.util.hashKey,
    normalizeText: drawing.util.normalizeText,
    encodeBase64: drawing.util.encodeBase64
});

})(window.kendo.jQuery);