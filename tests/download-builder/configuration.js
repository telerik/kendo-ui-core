(function() {
    var SOURCE_DIR = "/base/dist/js/";
    var scriptCache = {};

    // ------------------------------------------------------------
    function loadConfig(callback) {
        $.ajax({
            type: 'GET',
            url: '/base/download-builder/config/kendo-config.json',
            dataType: 'json',
            success: function(data) {
                components = data.components;
                resolver = new ScriptResolver(components);

                callback(resolver, components);
            },
            async: false
        });
    }

    function loadScripts(scripts, callback, error, source) {
        scripts = scripts.slice(0);
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

    function dryRun(source, scripts) {
        var iframe = $("<iframe />", { src: "javascript: '<html><body></body></html>';" } )
                     .css("display", "none")
                     .appendTo(document.body)[0];

        var frameWindow = iframe.contentWindow || iframe;
        var frameDocument = frameWindow.frameDocument || iframe.contentDocument;

        var script = frameDocument.createElement("script");
        script.innerHTML =
            "try { " + source + "; " +
                "parent.window.ok(true);" +
            "} catch(e) {" +
                "parent.window.ok(false, 'Loaded: \\n\\t" + scripts.join("\\n\\t") + "\\n\\n' + e.toString());" +
            "} finally { parent.window.start(); }";

        frameDocument.body.appendChild(script);

        $(iframe).remove();
    }

    // ------------------------------------------------------------
    module("Download Builder / Meta /", {
        setup: function() {
            this.timeout = QUnit.config.testTimeout;
            QUnit.config.testTimeout = 10000;
        },
        teardown: function() {
            QUnit.config.testTimeout = this.timeout;
        }
    });

    loadConfig(function(resolver, components) {
        $.each(components, function(i, c) {
            resolver.reset();

            var features = $.map(c.features || [], function(f) { return f.id; });
            resolver.addComponent(c.id, features);

            var scripts = ["jquery.js", "angular.js"].concat(resolver.scripts);
            asyncTest(c.id + " (all features)", function() {
                loadScripts(scripts,
                    function loaded(source) {
                        dryRun(source, scripts);
                    },
                    function error(src) {
                        ok(false, "Unable to load " + src);
                        start();
                    }
                );
            });
        });

        $.each(components, function(i, c) {
            resolver.reset();

            resolver.addComponent(c.id, []);

            var scripts = ["jquery.js", "angular.js"].concat(resolver.scripts);
            asyncTest(c.id + " (no features)", function() {
                loadScripts(scripts,
                    function loaded(source) {
                        dryRun(source, scripts);
                    },
                    function error(src) {
                        ok(false, "Unable to load " + src);
                        start();
                    }
                );
            });
        });

        asyncTest("kendo.dataviz.map doesn't override geometry classes", function() {
            resolver.reset();
            resolver.addComponent("dataviz.map", []);

            var scripts = ["jquery.js", "angular.js"].concat(resolver.scripts);
            loadScripts(scripts,
                function loaded(source) {
                    source += ";" +
                        "var path = new kendo.drawing.Path();" +
                        "path.moveTo(new kendo.geometry.Point());" +
                        "var anchor = path.segments[0].anchor();" +
                        "parent.window.equal(anchor.toString(), '0 0');";
                    dryRun(source, scripts);
                },
                function error(src) {
                    ok(false, "Unable to load " + src);
                    start();
                }
            );
        });
    });
})();
