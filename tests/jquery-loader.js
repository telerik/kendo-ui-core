(function(){
    var scripts = document.getElementsByTagName("script");
    var path = "";
    var url = "";

    for (var idx = 0; idx < scripts.length; idx++) {
        if (scripts[idx].src.indexOf("jquery-loader.js") >= 0) {
            path = scripts[idx].src.replace("jquery-loader.js", "");
            break;
        }
    }

    if (/jquery=([^&#]*)/.test(top.location.search)) {
        url = "http://code.jquery.com/jquery-" + RegExp.$1 + ".min.js";
    } else {
        url = path + "../src/jquery.js";
    }

    document.write('<script src="' + url + '"></script>');
})();
