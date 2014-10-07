window.saveAs = function saveAs(url, filename) {
    if (navigator.msSaveBlob) {
        var parts = url.split(";base64,");
        var contentType = parts[0];
        var base64 = atob(parts[1]);
        var array = new Uint8Array(base64.length);

        for (var idx = 0; idx < base64.length; idx++) {
            array[idx] = base64.charCodeAt(idx);
        }

        navigator.msSaveBlob(new Blob([array.buffer], { type: contentType }), filename);
    } else {
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
};

// function saveAs(blob, filename) {
//     if (navigator.msSaveBlob) {
//         navigator.msSaveBlob(blob, filename);
//     } else {
//         var a = document.createElement("a");
//         a.href = URL.createObjectURL(blob);
//         a.download = filename;
//         var e = document.createEvent("MouseEvents");
//         e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//         a.dispatchEvent(e);
//     }
// }
