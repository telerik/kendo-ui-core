(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "saveas",
    name: "Save files",
    category: "framework",
    advanced: true,
    depends: [ "core" ]
};

(function(kendo, $) {
    function postToProxy(dataURI, fileName, proxyURL) {
        var form = $("<form>").attr({
            action: proxyURL,
            method: "POST"
        });

        var parts = dataURI.split(";base64,");

        $('<input>').attr({
            value: parts[0].replace("data:", ""),
            name: "contentType",
            type: "hidden"
        }).appendTo(form);

        $('<input>').attr({
            value: parts[1],
            name: "base64",
            type: "hidden"
        }).appendTo(form);

        $('<input>').attr({
            value: fileName,
            name: "fileName",
            type: "hidden"
        }).appendTo(form);

        form.appendTo("body").submit().remove();
    }

    var fileSaver = document.createElement("a");
    var downloadAttribute = "download" in fileSaver;

    if (downloadAttribute) {
        kendo.saveAs = function(dataURI, fileName) {
            if (window.Blob && dataURI instanceof Blob) {
                dataURI = URL.createObjectURL(dataURI);
            }
            fileSaver.download = fileName;
            fileSaver.href = dataURI;

            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);

            fileSaver.dispatchEvent(e);
        };
    } else if (navigator.msSaveBlob) {
        kendo.saveAs = function(dataURI, fileName) {
            var blob = dataURI; // could be a Blob object

            if (typeof dataURI == "string") {
            var parts = dataURI.split(";base64,");
            var contentType = parts[0];
            var base64 = atob(parts[1]);
            var array = new Uint8Array(base64.length);

            for (var idx = 0; idx < base64.length; idx++) {
                array[idx] = base64.charCodeAt(idx);
            }
                blob = new Blob([array.buffer], { type: contentType });
            }

            navigator.msSaveBlob(blob, fileName);
        };
    } else {
        kendo.saveAs = postToProxy;
    }
})(kendo, kendo.jQuery);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
