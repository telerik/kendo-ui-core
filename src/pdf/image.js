(function(f, define){
    define([ "./core" ], f);
})(function(){(function(global){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true */
    /* jshint loopfunc:true */
    /* jshint newcap:false */

    var PDF = global.kendo.PDF;
    var BinaryStream = PDF.BinaryStream;

    var JPEG_SOF_MARKERS = [
        0xFFC0, 0xFFC1, 0xFFC2, 0xFFC3, 0xFFC5, 0xFFC6, 0xFFC7,
        0xFFC8, 0xFFC9, 0xFFCA, 0xFFCB, 0xFFCC, 0xFFCD, 0xFFCE, 0xFFCF
    ];

    function JPEG(data) {
        if (typeof data == "string") {
            data = BinaryStream(data);
        }

        // sanitize data (make sure we don't have chars with code > 0xFF)
        data.offset(0);
        this.data = data.readString(data.length());

        data.offset(0);
        if (data.readShort() != 0xFFD8) {
            throw new Error("Invalid JPEG");
        }
        OUT: {
            while (!data.eof()) {
                var marker = data.readShort();
                if (JPEG_SOF_MARKERS.indexOf(marker) >= 0) {
                    break OUT;
                }
                data.skip(data.readShort() - 2);
            }
            throw new Error("Invalid JPEG");
        }
        data.skip(2);
        this.bits = data.readByte();
        this.height = data.readShort();
        this.width = data.readShort();
        this.channels = data.readByte();
    }

    PDF.JPEG = JPEG;

})(this);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
