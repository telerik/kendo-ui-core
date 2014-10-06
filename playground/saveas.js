function saveAs(dataUrl, filename) {
    if (navigator.msSaveBlob) {
        var parts = dataUrl.split(";base64,");
        var contentType = parts[0];
        var base64 = atob(parts[1]);
        var array = new Uint8Array(base64.length);

        for (var idx = 0; idx < base64.length; idx++) {
            array[idx] = base64.charCodeAt(idx);
        }

        navigator.msSaveBlob(new Blob([array.buffer], { type: contentType }), filename);
    } else {
        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
}
