(function() {
    var SOURCE_DIR = "/base/src/";
    var scriptCache = {};

    // ------------------------------------------------------------
    function loadConfig(callback) {
        $.getJSON("/base/download-builder/config/kendo-config.json", function(data) {
            components = data.components;

            resolver = new ScriptResolver(components);

            callback(resolver, components);
        });
    }

    function loadScripts(scripts, callback, error, source) {
        source = source || "";

        if (scripts.length > 0) {
            var src = SOURCE_DIR + scripts.shift().replace(".min", "");
            $.ajax({ url: src, dataType: "text", headers: { "X-QHint": true }})
                .success(function(data) {
                    loadScripts(scripts, callback, error, source + data);
                })
                .error(function() {
                    error(src);
                });
        } else {
            callback(source);
        }
    }

    function dryRun(component, source) {
        var iframe = $("<iframe />", { src: "javascript: '<html><body></body></html>';" } )
                     .css("display", "none")
                     .appendTo(document.body)[0];

        var frameWindow = iframe.contentWindow || iframe;
        var frameDocument = frameWindow.frameDocument || iframe.contentDocument;

        var script = frameDocument.createElement("script");
        script.innerHTML = "try {" + source + "; parent.window.ok(true, '" + component.id + "' ); } " +
                           "catch(e) { parent.window.ok(false, '" + component.id + ": ' + e.toString()) };";
        frameDocument.body.appendChild(script);

        $(iframe).remove();
    }

    // ------------------------------------------------------------
    module("Kendo configuration", {
        setup: function() {
            this.timeout = QUnit.config.testTimeout;
            QUnit.config.testTimeout = 10000;
        },
        teardown: function() {
            QUnit.config.testTimeout = this.timeout;
        }
    });

    if (!/msie/.test(navigator.userAgent)) {
        asyncTest("component scripts", function() {
            loadConfig(function(resolver, components) {
                $.each(components, function(i, c) {
                    stop(1);
                    resolver.reset();

                    var features = $.map(c.features || [], function(f) { return f.id; });
                    resolver.addComponent(c.id, features);

                    var scripts = ["jquery.js"].concat(resolver.scripts);
                    loadScripts(scripts,
                        function loaded(source) {
                            dryRun(c, source);
                            start();
                        },
                        function error(src) {
                            ok(false, "Unable to load " + src);
                            start();
                        }
                    );
                });

                start();
            });
        });
    }
})();
