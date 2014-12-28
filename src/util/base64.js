(function(f, define) {
    define([
        "./main"
    ], f);
})(function() {

(function ($) {
    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        fromCharCode = String.fromCharCode;

    // Constants
    var KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // Generic utility functions ==============================================
    function encodeBase64(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = encodeUTF8(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) +
                KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);
        }

        return output;
    }

    function encodeUTF8(input) {
        input = input.replace(/\r\n/g,"\n");
        var output = "";

        for (var i = 0; i < input.length; i++) {
            var c = input.charCodeAt(i);

            if (c < 0x80) {
                // One byte
                output += fromCharCode(c);
            }
            else if(c < 0x800) {
                // Two bytes
                output += fromCharCode(0xC0 | (c >>> 6));
                output += fromCharCode(0x80 | (c & 0x3f));
            }
            else if (c < 0x10000) {
                // Three bytes
                output += fromCharCode(0xE0 | (c >>> 12));
                output += fromCharCode(0x80 | (c >>> 6 & 0x3f));
                output += fromCharCode(0x80 | (c & 0x3f));
            }
        }

        return output;
    }

    // Exports ================================================================
    deepExtend(kendo.util, {
        encodeBase64: encodeBase64,
        encodeUTF8: encodeUTF8
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
