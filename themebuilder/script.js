// bootstrapper file for Kendo ThemeBuilder
(function() {
    // do not initialize twice
    if (typeof kendo != "undefined" && kendo.ThemeBuilder) {
        // reopen themebuilder
        $("#kendo-themebuilder-wrapper").data("kendoThemeBuilder").open();
        return;
    }

    var queue = [],
        doc = document,
        UNDEFINED = "undefined"
        head = doc.getElementsByTagName("head")[0],
        applicationRoot = "http://localhost/kendo/themebuilder/";

    function getScript(url, callback) {
        var script = doc.createElement("script");
        script.onload = callback;
        script.src = url;

        head.appendChild(script);
    }

    // page without jQuery
    if (typeof jQuery == UNDEFINED) {
        queue.push(function(callback) {
            getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", callback);
        });
    }

    // page without kendo -- maybe components are loaded asynchronously?
    if (typeof kendo == UNDEFINED) {
        queue.push(function(callback) {
            $(head).append("<link rel='stylesheet' href='http://localhost/kendo/live/styles/kendo.common.css' />");

            // TODO: use CDN when a recent version is uploaded
            getScript("http://localhost/kendo/deploy/kendoUI/js/kendo.all.min.js", callback);
        });
    }

    window.lessLoaded = function(lessTemplate) {
        new kendo.ThemeBuilder(lessTemplate);
    };

    queue.push(function(){
        $("<link rel='stylesheet' href='" + applicationRoot + "styles.css' />").appendTo("head");

        // TODO: these can be merged during build
        getScript(applicationRoot + "less.js", function() {
            getScript(applicationRoot + "themebuilder.js", function() {
                getScript(applicationRoot + "template.js");
            });
        });
    });

    (function resolveQueue() {
        if (queue.length) {
            queue.shift()(resolveQueue);
        }
    })();
})();

