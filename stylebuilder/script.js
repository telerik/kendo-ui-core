// TODO: show a neat message to urge the unsupported browsers to upgrade (instead of the iframe)

(function() {

    // do not initialize twice
    if (typeof kendo != "undefined" && kendo.ThemeBuilder) {
        return;
    }

    function getScript(url, callback) {
        var doc = document,
            script = doc.createElement('script');
        script.onload = callback;
        script.src = url;

        doc.getElementsByTagName("head")[0].appendChild(script);
    }

    // load dependencies
    var queue = [];

    // page without jQuery
    if (typeof jQuery == "undefined") {
        queue.push(function(callback) {
            getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", callback);
        });
    }

    // page without kendo
    if (typeof kendo == "undefined") {
        queue.push(function(callback) {
            $("<link rel='stylesheet' href='http://localhost/kendo/live/styles/kendo.common.css' />").appendTo("head");
            $("<link rel='stylesheet' href='http://localhost/kendo/live/styles/kendo.kendo.css' />").appendTo("head");
            getScript("http://localhost/kendo/deploy/kendoUI/js/kendo.all.min.js", callback);
        });
    }

    queue.push(function(){
        getScript("http://localhost/kendo/stylebuilder/themebuilder.js", function() {
            new kendo.StyleBuilder();
        });
    });

    // resolve queue
    (function() {
        if (queue.length) {
            queue.shift()(arguments.callee);
        }
    })();
})();

